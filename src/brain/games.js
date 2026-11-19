// The eight Brain Gym games. Each one draws itself inside `root`, plays a few short rounds,
// and resolves with { score, level, detail }. Difficulty comes in as ctx.level (1 to 10)
// and comes back adjusted (see step / roundMove in logic.js).
import { params, step, roundMove, sameSeq, rhythmOk, SHORT_GAP, LONG_GAP, recipe, recipeText, PANTRY, ACTIONS, PICNIC, PICNIC_NAMES, shuffle, recallScore } from "./logic.js";
import { STORIES } from "./stories.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const rnd = (n) => Math.floor(Math.random() * n);

/* ---------- sound: short tones made on the device (no audio files) ---------- */
let ac = null;
export function tone(freq = 440, ms = 160, type = "sine", vol = 0.18) {
  try {
    ac ||= new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === "suspended") ac.resume();
    const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
    o.connect(g).connect(ac.destination); o.start(t); o.stop(t + ms / 1000 + 0.02);
  } catch {}
}
const NOTES = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047, 1175];
export const good = () => { tone(660, 120); setTimeout(() => tone(880, 160), 110); };
export const oops = () => tone(180, 260, "triangle", 0.15);

/* ---------- shared bits ---------- */
// Waits for one click on any element matching sel inside root; resolves with that element.
const clickOnce = (root, sel) => new Promise((res) => {
  const h = (e) => { const b = e.target.closest(sel); if (b && root.contains(b) && !b.disabled) { root.removeEventListener("click", h); res(b); } };
  root.addEventListener("click", h);
});
const dots = (n, i, res) => `<div class="bg-dots">${Array.from({ length: n }, (_, k) => `<i class="${k < i ? (res[k] ? "win" : "miss") : k === i ? "cur" : ""}"></i>`).join("")}</div>`;
async function intro(root, ctx, how, say = how) {
  root.innerHTML = `<div class="bg-intro"><p class="bg-how">${how}</p><button class="btn primary big" data-go-on>I'm ready!</button></div>`;
  ctx.speak(say.replace(/<[^>]+>/g, ""));
  await clickOnce(root, "[data-go-on]");
  ctx.stopSpeech();
}
const flash = async (root, ok, msg) => {
  const el = document.createElement("div");
  el.className = `bg-flash ${ok ? "good" : "bad"}`; el.textContent = msg || (ok ? "Yes!" : "Not quite");
  root.appendChild(el); ok ? good() : oops();
  await wait(ok ? 750 : 1100); el.remove();
};

/* ---------- 1. Star Catcher: tap gold stars, let the others fall (stop-go control) ---------- */
export async function stars(root, ctx) {
  const p = params.stars(ctx.level);
  await intro(root, ctx, `Tap only the <b>gold stars ⭐</b>. Let the <span class="bg-grey">grey ones</span>${p.lookalike ? " and the sparkly ones 🌟" : ""} fall past!`,
    `Tap only the gold stars. Let the grey ones${p.lookalike ? " and the sparkly ones" : ""} fall past.`);
  root.innerHTML = `<div class="bg-hud"><span>Score <b id="sc">0</b></span><span>⏱ <b id="tm">${p.secs}</b></span></div><div class="bg-field" id="field"></div>`;
  const field = root.querySelector("#field"), sc = root.querySelector("#sc"), tm = root.querySelector("#tm");
  let hits = 0, golds = 0, falses = 0, decoys = 0, running = true;
  const show = () => (sc.textContent = Math.max(0, hits - falses));
  const spawn = () => {
    const decoy = Math.random() < p.decoy, look = decoy && p.lookalike && Math.random() < 0.5;
    const b = document.createElement("button");
    b.className = "bg-fall" + (decoy && !look ? " grey" : "");
    b.textContent = look ? "🌟" : "⭐"; b.setAttribute("aria-label", decoy ? "do not tap" : "gold star");
    b.style.left = 4 + rnd(84) + "%"; b.style.animationDuration = p.fall + "s";
    decoy ? decoys++ : golds++;
    b.onpointerdown = (e) => { e.preventDefault(); if (b.dataset.t) return; b.dataset.t = 1; if (decoy) { falses++; oops(); b.classList.add("wrong"); } else { hits++; tone(880, 90); b.classList.add("got"); } show(); setTimeout(() => b.remove(), 250); };
    b.onanimationend = () => b.remove();
    field.appendChild(b);
  };
  const t0 = Date.now();
  while (running && ctx.alive()) {
    spawn();
    await wait(p.every * (0.75 + Math.random() * 0.5));
    const left = p.secs - Math.floor((Date.now() - t0) / 1000);
    tm.textContent = Math.max(0, left);
    if (left <= 0) running = false;
  }
  await wait(p.fall * 1000);
  const acc = golds ? hits / golds : 1, fr = decoys ? falses / decoys : 0;
  return { score: Math.max(0, hits - falses), level: roundMove(acc >= 0.85 && fr <= 0.2, acc < 0.6 || fr > 0.45, ctx.level, ctx.auto), detail: `${hits} of ${golds} gold stars, ${falses} wrong taps` };
}

/* ---------- 2. Pip's Path: repeat a lit-up path (Simon-style); last rounds are listen-only ---------- */
export async function path(root, ctx) {
  await intro(root, ctx, "Watch the squares light up, then tap them in the <b>same order</b>. In the last two rounds, <b>listen</b> to Pip say numbers and tap them.",
    "Watch the squares light up, then tap them in the same order. In the last two rounds, listen to Pip say numbers and tap them.");
  let st = { level: ctx.level }, best = 0;
  const res = [], N = 6;
  for (let r = 0; r < N && ctx.alive(); r++) {
    const listen = r >= 4;
    const p = listen ? { ...params.digits(st.level), grid: 3 } : params.path(st.level);
    const cells = p.grid * p.grid, seq = [];
    while (seq.length < p.len) { const c = rnd(cells); if (c !== seq.at(-1)) seq.push(c); }
    const want = p.back ? [...seq].reverse() : seq;
    root.innerHTML = `${dots(N, r, res)}<p class="bg-say" id="say">${listen ? "Listen…" : "Watch…"}</p>
      <div class="bg-grid g${p.grid}">${Array.from({ length: cells }, (_, i) => `<button class="bg-cell" data-c="${i}" disabled>${listen ? i + 1 : ""}</button>`).join("")}</div>`;
    const btns = [...root.querySelectorAll(".bg-cell")], say = root.querySelector("#say");
    await wait(700);
    if (listen) {
      const spoken = await ctx.speakAsync(seq.map((c) => c + 1).join(", "), 0.9);
      if (!spoken) { say.textContent = seq.map((c) => c + 1).join("  "); await wait(900 + 600 * seq.length); }
    } else {
      for (const c of seq) { if (!ctx.alive()) return; btns[c].classList.add("lit"); tone(NOTES[c], 380); await wait(520); btns[c].classList.remove("lit"); await wait(180); }
    }
    say.textContent = p.back ? "Now tap them BACKWARDS, last one first!" : "Your turn!";
    if (p.back) ctx.speak("Now backwards!");
    btns.forEach((b) => (b.disabled = false));
    let ok = true;
    for (let i = 0; i < want.length && ok; i++) {
      const b = await clickOnce(root, ".bg-cell"), c = +b.dataset.c;
      b.classList.add("lit"); tone(NOTES[c], 200); setTimeout(() => b.classList.remove("lit"), 220);
      if (c !== want[i]) { ok = false; b.classList.add("wrong"); }
    }
    btns.forEach((b) => (b.disabled = true));
    if (ok) best = Math.max(best, p.len);
    res.push(ok);
    await flash(root, ok, ok ? `${p.len} in a row!` : "Not quite. Next one!");
    st = step(st, ok, ctx.auto);
  }
  return { score: best, level: st.level, detail: `${res.filter(Boolean).length} of ${res.length} paths right` };
}

/* ---------- 3. Pair Match: classic memory cards ---------- */
const PAIR_ICONS = ["🦉", "🐸", "🦊", "🐢", "🐙", "🦋", "🐝", "🐬", "🦁", "🐼", "🐧", "🦕", "🚀", "🌈", "🎈", "⚽"];
export async function pairs(root, ctx) {
  const { pairs: n } = params.pairs(ctx.level);
  await intro(root, ctx, `Flip two cards at a time to find <b>matching pairs</b>. Try to remember where each picture is, so you need fewer flips!`,
    "Flip two cards at a time to find matching pairs. Try to remember where each picture is.");
  const deck = shuffle(shuffle(PAIR_ICONS).slice(0, n).flatMap((x) => [x, x]));
  const cols = { 8: 4, 10: 5, 12: 4, 16: 4, 20: 5, 24: 6 }[n * 2] || 4;
  root.innerHTML = `<div class="bg-hud"><span>Pairs <b id="pf">0</b> / ${n}</span><span>Turns <b id="pt">0</b></span></div>
    <div class="bg-cards" style="grid-template-columns:repeat(${cols},1fr)">${deck.map((x, i) => `<button class="bg-card" data-i="${i}" aria-label="card ${i + 1}"><span>${x}</span></button>`).join("")}</div>`;
  const cards = [...root.querySelectorAll(".bg-card")];
  let found = 0, turns = 0;
  while (found < n && ctx.alive()) {
    const a = await clickOnce(root, ".bg-card:not(.up)"); a.classList.add("up"); tone(520, 60);
    const b = await clickOnce(root, ".bg-card:not(.up)"); b.classList.add("up"); tone(620, 60);
    turns++; root.querySelector("#pt").textContent = turns;
    if (deck[a.dataset.i] === deck[b.dataset.i]) { found++; a.classList.add("done"); b.classList.add("done"); good(); root.querySelector("#pf").textContent = found; }
    else { cards.forEach((c) => (c.disabled = true)); await wait(900); a.classList.remove("up"); b.classList.remove("up"); cards.forEach((c) => (c.disabled = false)); }
  }
  const starsWon = turns <= n * 1.75 ? 3 : turns <= n * 2.5 ? 2 : 1;
  await flash(root, true, "★".repeat(starsWon) + ` in ${turns} turns`);
  return { score: starsWon, level: roundMove(starsWon === 3, turns > n * 3, ctx.level, ctx.auto), detail: `${n} pairs in ${turns} turns` };
}

/* ---------- 4. Rhythm Copy: copy a drum beat ---------- */
const DRUMS = [{ icon: "🔴", f: 196, label: "red drum" }, { icon: "🔵", f: 330, label: "blue drum" }];
export async function rhythm(root, ctx) {
  await intro(root, ctx, "Listen to Pip's drum beat, then <b>tap it back</b> the same way. Some gaps are short, some are long. Copy them!",
    "Listen to Pip's drum beat, then tap it back the same way.");
  let st = { level: ctx.level }, best = 0;
  const res = [], N = 6;
  for (let r = 0; r < N && ctx.alive(); r++) {
    const p = params.rhythm(st.level);
    const pattern = Array.from({ length: p.len }, (_, i) => ({ drum: p.drums > 1 ? rnd(2) : 0, long: p.long && i < p.len - 1 && Math.random() < 0.35 }));
    root.innerHTML = `${dots(N, r, res)}<p class="bg-say" id="say">Listen…</p>
      <div class="bg-drums">${DRUMS.slice(0, p.drums).map((d, i) => `<button class="bg-drum" data-d="${i}" disabled aria-label="${d.label}">${d.icon}</button>`).join("")}</div>
      <div class="bg-beat" id="beat"></div>`;
    const pads = [...root.querySelectorAll(".bg-drum")], say = root.querySelector("#say"), beat = root.querySelector("#beat");
    await wait(600);
    for (const b of pattern) { if (!ctx.alive()) return; pads[b.drum].classList.add("lit"); tone(DRUMS[b.drum].f, 150, "triangle", 0.3); await wait(140); pads[b.drum].classList.remove("lit"); await wait((b.long ? LONG_GAP : SHORT_GAP) - 140); }
    say.textContent = "Your turn!";
    pads.forEach((b) => (b.disabled = false));
    const taps = [];
    await new Promise((done) => {
      pads.forEach((pad) => (pad.onpointerdown = (e) => {
        e.preventDefault(); const d = +pad.dataset.d;
        taps.push({ drum: d, t: performance.now() }); tone(DRUMS[d].f, 150, "triangle", 0.3);
        pad.classList.add("lit"); setTimeout(() => pad.classList.remove("lit"), 120);
        beat.textContent = taps.map((x) => DRUMS[x.drum].icon).join(" ");
        if (taps.length >= pattern.length) done();
      }));
    });
    pads.forEach((b) => { b.disabled = true; b.onpointerdown = null; });
    const ok = rhythmOk(pattern, taps);
    if (ok) best = Math.max(best, p.len);
    res.push(ok);
    await flash(root, ok, ok ? "Great rhythm!" : "Close! Next beat.");
    st = step(st, ok, ctx.auto);
  }
  return { score: best, level: st.level, detail: `${res.filter(Boolean).length} of ${res.length} beats right` };
}

/* ---------- 5. Robot Chef: follow spoken recipe steps in order ---------- */
export async function chef(root, ctx) {
  await intro(root, ctx, "Robo the robot chef needs your help! Listen to the recipe, then tap the food and actions <b>in the same order</b>. Press <b>Done</b> when you finish.",
    "Robo the robot chef needs your help! Listen to the recipe, then tap the food and actions in the same order. Press Done when you finish.");
  let st = { level: ctx.level }, best = 0;
  const res = [], N = 5;
  for (let r = 0; r < N && ctx.alive(); r++) {
    const rec = recipe(st.level), text = recipeText(rec);
    root.innerHTML = `${dots(N, r, res)}<div class="bg-chef"><div class="bg-bowl ${rec.cond ? rec.bowl : ""}" id="bowl">🥣</div>
      <div class="bg-recipe" id="rec"><b>Recipe ${r + 1}</b><ol>${rec.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div>
      <button class="btn primary big" data-go-on>Start cooking</button></div>`;
    const spoken = ctx.speakAsync((rec.cond ? `The bowl is ${rec.bowl}. ` : "") + text);
    await Promise.race([clickOnce(root, "[data-go-on]"), spoken.then(() => wait(rec.steps.length * 400))]);
    ctx.stopSpeech();
    let replays = 1;
    root.innerHTML = `${dots(N, r, res)}<div class="bg-chef"><div class="bg-bowl ${rec.cond ? rec.bowl : ""}">🥣${rec.cond ? `<small>${rec.bowl} bowl</small>` : ""}</div>
      <div class="bg-added" id="added" aria-live="polite"></div>
      <div class="bg-pantry">${PANTRY.map((x) => `<button class="bg-food" data-f="${x.id}" aria-label="${x.one}">${x.icon}</button>`).join("")}</div>
      <div class="bg-pantry">${ACTIONS.map((a) => `<button class="bg-food act" data-f="${a.id}">${a.icon}<small>${a.say.split(" ")[0]}</small></button>`).join("")}</div>
      <div class="row"><button class="btn" data-again>🔊 Hear it again (${replays})</button><button class="btn primary" data-done>Done</button></div></div>`;
    const taps = [], added = root.querySelector("#added");
    const icon = (id) => (PANTRY.find((x) => x.id === id) || ACTIONS.find((x) => x.id === id)).icon;
    await new Promise((done) => {
      root.onclick = (e) => {
        const f = e.target.closest("[data-f]");
        if (f) { taps.push(f.dataset.f); tone(500 + taps.length * 40, 70); added.textContent = taps.map(icon).join(" "); return; }
        const ag = e.target.closest("[data-again]");
        if (ag && replays > 0) { replays--; ag.disabled = true; ag.textContent = "🔊 Hear it again (0)"; ctx.speak((rec.cond ? `The bowl is ${rec.bowl}. ` : "") + text); return; }
        if (e.target.closest("[data-done]")) { root.onclick = null; done(); }
      };
    });
    ctx.stopSpeech();
    const ok = sameSeq(taps, rec.taps);
    if (ok) best = Math.max(best, rec.steps.length);
    res.push(ok);
    await flash(root, ok, ok ? "Yum! Perfect recipe!" : "Oops, the order got mixed up.");
    st = step(st, ok, ctx.auto);
  }
  return { score: best, level: st.level, detail: `${res.filter(Boolean).length} of ${res.length} recipes right` };
}

/* ---------- 6. Switch Sort: sort by color or shape; the rule changes ---------- */
const shape = (s, c, size = 64) => `<svg viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">${s === "circle" ? `<circle cx="20" cy="20" r="16" fill="${c}"/>` : `<path d="M20 4 L37 35 L3 35 Z" fill="${c}"/>`}</svg>`;
const COL = { red: "#e5484d", blue: "#2f7de1" };
export async function switchSort(root, ctx) {
  const p = params.switch(ctx.level);
  await intro(root, ctx, p.hidden
    ? "Sort each card to the left or right. Pip won't tell you the rule. <b>Work it out</b> from what Pip says, and watch out, it changes!"
    : "Sort each card by the rule at the top: <b>color</b> or <b>shape</b>. Watch out, the rule will <b>switch</b>!",
    p.hidden ? "Sort each card. Pip won't tell you the rule. Work it out, and watch out, it changes!" : "Sort each card by the rule at the top, color or shape. Watch out, the rule will switch!");
  const targets = [{ s: "triangle", c: "red" }, { s: "circle", c: "blue" }];
  let rule = Math.random() < 0.5 ? "color" : "shape", right = 0;
  for (let i = 0; i < p.cards && ctx.alive(); i++) {
    if (i > 0 && i % p.every === 0) { rule = rule === "color" ? "shape" : "color"; if (!p.hidden) { ctx.speak(`Switch! Now sort by ${rule}.`); root.innerHTML = `<div class="bg-switch">🔀 Switch! Now sort by <b>${rule.toUpperCase()}</b></div>`; await wait(1300); } }
    const card = Math.random() < 0.8 ? (Math.random() < 0.5 ? { s: "circle", c: "red" } : { s: "triangle", c: "blue" }) : { ...targets[rnd(2)] };
    root.innerHTML = `<div class="bg-hud"><span>Card <b>${i + 1}</b> / ${p.cards}</span><span class="bg-rule">${p.hidden ? "Rule: ❓" : rule === "color" ? "Sort by 🎨 COLOR" : "Sort by 🔷 SHAPE"}</span></div>
      <div class="bg-sortcard">${shape(card.s, COL[card.c], 90)}</div>
      <div class="bg-bins">${targets.map((t, k) => `<button class="bg-bin" data-k="${k}">${shape(t.s, COL[t.c])}<small>${t.c} ${t.s}</small></button>`).join("")}</div>`;
    const k = +(await clickOnce(root, ".bg-bin")).dataset.k;
    const want = rule === "color" ? targets.findIndex((t) => t.c === card.c) : targets.findIndex((t) => t.s === card.s);
    const ok = k === want; if (ok) right++;
    await flash(root, ok, ok ? "Yes!" : p.hidden ? "Not that way" : `Remember: ${rule}!`);
  }
  const pc = Math.round((right / p.cards) * 100);
  return { score: pc, level: roundMove(pc >= 90, pc < 70, ctx.level, ctx.auto), detail: `${right} of ${p.cards} sorted right` };
}

/* ---------- 7. Story Time: listen, predict, then answer questions from memory ---------- */
export async function story(root, ctx) {
  const { band } = params.story(ctx.level);
  const pool = STORIES.filter((s) => s.band === band), fresh = pool.filter((s) => !ctx.seen.includes(s.id));
  const s = (fresh.length ? fresh : pool)[rnd((fresh.length ? fresh : pool).length)];
  ctx.markSeen(s.id);
  const read = async (text, btn) => {
    root.innerHTML = `<div class="bg-story"><h3>📖 ${esc(s.title)}</h3><p>${esc(text)}</p><button class="btn primary big" data-go-on>${btn}</button></div>`;
    ctx.speak(text);
    await clickOnce(root, "[data-go-on]"); ctx.stopSpeech();
  };
  await read(s.a, "What happens next?");
  root.innerHTML = `<div class="bg-story"><h3>🤔 ${esc(s.predict[0])}</h3><div class="bg-choices">${s.predict[1].map((c) => `<button class="btn big" data-c>${esc(c)}</button>`).join("")}</div></div>`;
  ctx.speak(s.predict[0]);
  await clickOnce(root, "[data-c]"); ctx.stopSpeech();
  root.innerHTML = `<div class="bg-story"><h3>Good thinking! Let's find out…</h3></div>`; await ctx.speakAsync("Good thinking! Let's find out.");
  await read(s.b, "I'm ready for questions");
  let right = 0;
  for (let i = 0; i < s.qs.length && ctx.alive(); i++) {
    const [q, ch, ans] = s.qs[i];
    root.innerHTML = `${dots(3, i, [])}<div class="bg-story"><h3>${esc(q)}</h3><div class="bg-choices">${ch.map((c, k) => `<button class="btn big" data-c="${k}">${esc(c)}</button>`).join("")}</div></div>`;
    ctx.speak(q + " " + ch.join(". "));
    const k = +(await clickOnce(root, "[data-c]")).dataset.c; ctx.stopSpeech();
    const ok = k === ans; if (ok) right++;
    await flash(root, ok, ok ? "That's right!" : `It was: ${ch[ans]}`);
  }
  return { score: right, level: roundMove(right === 3, right <= 1, ctx.level, ctx.auto), detail: `"${s.title}": ${right} of 3` };
}

/* ---------- 8. Picnic Basket: a growing list now, and recall of the basket at the end ---------- */
export async function picnic(root, ctx) {
  const p = params.picnic(ctx.level);
  await intro(root, ctx, "Let's pack a picnic! Pip adds one thing at a time. Each time, tap <b>everything in the basket in order</b>. Remember it, because Pip will ask again at the end!",
    "Let's pack a picnic! Pip adds one thing at a time. Each time, tap everything in the basket in order. Remember it, because Pip will ask again at the end!");
  const items = shuffle(PICNIC).slice(0, p.chain);
  const board = shuffle([...items, ...shuffle(PICNIC.filter((x) => !items.includes(x))).slice(0, Math.max(0, (p.chain > 6 ? 12 : 8) - items.length))]);
  let best = 0, packed = [];
  for (let n = 1; n <= items.length && ctx.alive(); n++) {
    packed = items.slice(0, n);
    const it = items[n - 1];
    root.innerHTML = `<div class="bg-hud"><span>🧺 ${n - 1} packed</span></div><div class="bg-new"><span>${it}</span><p>I packed ${n > 1 ? "…and " : ""}a <b>${PICNIC_NAMES[it]}</b>!</p></div>`;
    await ctx.speakAsync(`I packed ${n > 1 ? "and " : ""}a ${PICNIC_NAMES[it]}.`); await wait(500);
    root.innerHTML = `<div class="bg-hud"><span>🧺 Tap all ${n} in order</span></div><div class="bg-added" id="added"></div>
      <div class="bg-pantry big">${board.map((x) => `<button class="bg-food" data-f="${x}" aria-label="${PICNIC_NAMES[x]}">${x}</button>`).join("")}</div>`;
    const added = root.querySelector("#added");
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      const f = (await clickOnce(root, "[data-f]")).dataset.f; tone(500 + i * 50, 70);
      added.textContent += f + " ";
      if (f !== items[i]) ok = false;
    }
    if (!ok) { await flash(root, false, `The basket was: ${packed.join(" ")}`); break; }
    best = n; await flash(root, true, n === items.length ? "Basket full!" : "Yes!");
  }
  return { score: best, level: roundMove(best >= p.chain, best <= p.chain - 3, ctx.level, ctx.auto), basket: packed, detail: `${best} items in a row` };
}

// The end-of-session check: which things went in the basket?
export async function recall(root, ctx, basket) {
  const opts = shuffle([...basket, ...shuffle(PICNIC.filter((x) => !basket.includes(x))).slice(0, Math.max(4, params.picnic(ctx.level).options - basket.length))]);
  root.innerHTML = `<div class="bg-intro"><p class="bg-how">Remember the picnic basket from the start? Tap <b>everything that was in it</b>, then press <b>Done</b>.</p>
    <div class="bg-pantry big">${opts.map((x) => `<button class="bg-food" data-f="${x}" aria-pressed="false" aria-label="${PICNIC_NAMES[x]}">${x}</button>`).join("")}</div>
    <button class="btn primary big" data-done>Done</button></div>`;
  ctx.speak("Remember the picnic basket from the start? Tap everything that was in it, then press Done.");
  const picked = new Set();
  await new Promise((done) => {
    root.onclick = (e) => {
      const f = e.target.closest("[data-f]");
      if (f) { const x = f.dataset.f; picked.has(x) ? picked.delete(x) : picked.add(x); f.classList.toggle("sel", picked.has(x)); f.setAttribute("aria-pressed", String(picked.has(x))); tone(600, 50); return; }
      if (e.target.closest("[data-done]")) { root.onclick = null; done(); }
    };
  });
  ctx.stopSpeech();
  const score = recallScore(basket, [...picked]);
  await flash(root, score >= basket.length - 1, `${score} of ${basket.length} remembered! It was: ${basket.join(" ")}`);
  return { score, of: basket.length };
}

export const PLAY = { stars, path, pairs, rhythm, chef, switch: switchSort, story, picnic };
