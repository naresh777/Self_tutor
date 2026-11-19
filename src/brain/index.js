// Brain Gym: a 10-minute daily session of short games (Monday to Friday), the Pip Says
// movement game, and My Steps routine checklists. main.js shows the cards and hands this
// module a container to run a session, a movement game or a checklist in.
import "./brain.css";
import { GAMES, CHOOSABLE, dayPlan, defaults, startLevel, AGES, DIFFS, DEFAULT_ROUTINES, parseSteps, SAYS_GAMES, isoDay, weekly, GAME_IDS } from "./logic.js";
import { PLAY, recall, tone, good } from "./games.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const clone = (x) => JSON.parse(JSON.stringify(x));

/* ---------- per-child data, kept in family.brain[kidId] ---------- */
export function data(family, k) {
  family.brain ??= {};
  const b = (family.brain[k.id] ??= {});
  b.settings ??= defaults(k.grade);
  b.levels ??= {}; b.hist ??= {}; b.days ??= {}; b.seen ??= []; b.steps ??= {};
  b.routines ??= clone(DEFAULT_ROUTINES);
  return b;
}
export const levelOf = (b, g) => b.levels[g] ?? startLevel(b.settings);
export const brainDays = (family, kidId) => Object.keys(family.brain?.[kidId]?.days || {}).filter((d) => family.brain[kidId].days[d].done);

/* ---------- kid dashboard card ---------- */
export function kidCard(family, k) {
  const b = data(family, k), t = isoDay(), rec = b.days[t], plan = dayPlan();
  const list = (gs) => gs.map((g) => `<span class="bg-chip">${GAMES[g].icon} ${GAMES[g].name}</span>`).join("");
  let body;
  if (rec?.done) {
    body = `<div class="row"><span class="bg-big">🏅</span><div><h3>Brain Gym done for today!</h3><p class="muted small">${rec.recall != null ? `You remembered ${rec.recall} of ${rec.recallOf} picnic things. ` : ""}See you tomorrow!</p></div></div>
      ${plan.offscreen === "says" && !rec.says ? `<div class="row"><button class="btn" data-bg="says">🕺 Play Pip Says with a grown-up</button></div>` : ""}`;
  } else if (plan.rest) {
    body = `<div class="row"><span class="bg-big">🌳</span><div><h3>Rest day</h3><p class="muted small">No Brain Gym today. Play outside, or play a card or board game with your family!</p></div></div>
      <div class="row"><button class="btn" data-bg="says">🕺 Pip Says movement game</button></div>`;
  } else {
    body = `<p class="muted small">About 10 minutes. Best right after today's work!</p>
      <div class="row">${list(["picnic"])}${plan.choice ? `<span class="bg-chip">🎲 You pick 3 games!</span>` : list(plan.games)}</div>
      <div class="row"><button class="btn primary big" data-bg="session">Start Brain Gym</button>${plan.offscreen === "says" ? `<button class="btn" data-bg="says">🕺 Pip Says</button>` : ""}</div>`;
  }
  const steps = b.routines.map((r) => { const d = b.steps[t]?.[r.id]; return `<button class="bg-routine ${d ? "done" : ""}" data-bg="steps" data-routine="${esc(r.id)}"><span>${esc(r.icon || "✅")}</span><b>${esc(r.name)}</b>${d ? `<span class="pill good">Done</span>` : `<span class="small muted">${r.steps.length} steps</span>`}</button>`; }).join("");
  return `<div class="card"><div class="row spread"><h2>🧠 Brain Gym</h2><span class="muted small">Games for focus and memory</span></div>${body}
    <h3>My Steps</h3><div class="bg-routines">${steps}</div></div>`;
}

/* ---------- running a session, a movement game or a checklist ---------- */
let token = 0;
// ctx from main: { family, kid, save, voice, addStars(n), exit() }
export function mount(root, mode, ctx) {
  const my = ++token, alive = () => my === token && document.body.contains(root);
  const b = data(ctx.family, ctx.kid);
  const g = { alive, speak: (t) => ctx.voice.speak(t, "_bg"), speakAsync: (t, r) => ctx.voice.speakAsync(t, r), stopSpeech: () => ctx.voice.stop() };
  if (mode.name === "steps") return steps(root, b, mode.routine, ctx, g);
  if (mode.name === "says") return says(root, b, ctx, g);
  return session(root, b, ctx, g);
}
export const unmount = () => { token++; };

async function session(root, b, ctx, g) {
  const t = isoDay(), plan = dayPlan();
  if (b.days[t]?.done) { root.innerHTML = `<h2>All done for today!</h2><p class="muted">Brain Gym comes back tomorrow.</p><button class="btn primary" data-exit>Back</button>`; root.querySelector("[data-exit]").onclick = ctx.exit; return; }
  let games = plan.games || [];
  if (plan.rest) { root.innerHTML = `<h2>Rest day</h2><p class="muted">Brain Gym is Monday to Friday. Today, play outside or play a family card game!</p><button class="btn primary" data-exit>Back</button>`; root.querySelector("[data-exit]").onclick = ctx.exit; return; }
  const frame = (inner) => `<div class="row spread bg-top"><h2>🧠 Brain Gym</h2><button class="btn ghost" data-exit>Stop</button></div><div id="bgprog"></div><div id="bgstage" class="bg-stage">${inner || ""}</div>`;
  root.innerHTML = frame();
  root.querySelector("[data-exit]").onclick = () => { unmount(); ctx.voice.stop(); ctx.exit(); };
  const stage = root.querySelector("#bgstage"), prog = root.querySelector("#bgprog");
  if (plan.choice) {
    const chosen = [];
    stage.innerHTML = `<h3>It's Friday! Pick 3 games.</h3><div class="bg-pick">${CHOOSABLE.map((id) => `<button class="bg-pickbtn" data-g="${id}" aria-pressed="false"><span>${GAMES[id].icon}</span><b>${GAMES[id].name}</b><small>${GAMES[id].skill}</small></button>`).join("")}</div><button class="btn primary big" data-start disabled>Start</button>`;
    g.speak("It's Friday! Pick three games.");
    await new Promise((done) => {
      stage.onclick = (e) => {
        const p = e.target.closest("[data-g]");
        if (p) { const id = p.dataset.g, i = chosen.indexOf(id); if (i >= 0) chosen.splice(i, 1); else if (chosen.length < 3) chosen.push(id); stage.querySelectorAll("[data-g]").forEach((x) => { const on = chosen.includes(x.dataset.g); x.classList.toggle("sel", on); x.setAttribute("aria-pressed", String(on)); }); stage.querySelector("[data-start]").disabled = chosen.length !== 3; return; }
        if (e.target.closest("[data-start]") && chosen.length === 3) { stage.onclick = null; done(); }
      };
    });
    games = chosen;
  }
  const order = ["picnic", ...games, "recall"];
  const showProg = (i) => (prog.innerHTML = `<div class="bg-steps">${order.map((id, k) => `<span class="${k < i ? "done" : k === i ? "cur" : ""}" title="${id === "recall" ? "Picnic check" : GAMES[id].name}">${id === "recall" ? "🧺" : GAMES[id].icon}</span>`).join("")}</div>`);
  const scores = {}, details = {};
  let basket = [], rec = null;
  for (let i = 0; i < order.length; i++) {
    if (!g.alive()) return;
    const id = order[i]; showProg(i);
    if (id === "recall") { rec = await recall(stage, { ...g, level: levelOf(b, "picnic") }, basket); continue; }
    stage.innerHTML = `<div class="bg-title"><span>${GAMES[id].icon}</span><h3>${GAMES[id].name}</h3><p class="muted">${GAMES[id].skill}</p></div>`;
    await wait(1100);
    const res = await PLAY[id](stage, { ...g, level: levelOf(b, id), auto: b.settings.auto, seen: b.seen, markSeen: (s) => { b.seen = [...b.seen.filter((x) => x !== s), s].slice(-12); } });
    if (!g.alive() || !res) return;
    b.levels[id] = res.level; scores[id] = res.score; details[id] = res.detail;
    if (res.basket) basket = res.basket;
    (b.hist[id] ??= []).push({ d: t, s: res.score, l: res.level }); if (b.hist[id].length > 80) b.hist[id].shift();
    ctx.save();
  }
  if (!g.alive()) return;
  (b.hist.recall ??= []).push({ d: t, s: rec.score, l: levelOf(b, "picnic") });
  b.days[t] = { ...(b.days[t] || {}), done: true, at: Date.now(), scores, details, recall: rec.score, recallOf: rec.of };
  ctx.addStars(3); ctx.save();
  showProg(order.length);
  stage.innerHTML = `<div class="bg-title"><span>🏅</span><h3>Brain Gym done! +3 stars</h3>
    <ul class="bg-results">${Object.keys(scores).map((id) => `<li>${GAMES[id].icon} <b>${GAMES[id].name}</b>: ${esc(details[id])}</li>`).join("")}<li>🧺 <b>Picnic check</b>: ${rec.score} of ${rec.of} remembered</li></ul>
    ${plan.offscreen === "says" ? `<p>Today's off-screen game: <b>Pip Says</b> with a grown-up!</p><button class="btn" data-says>🕺 Play Pip Says</button>` : `<p>Tonight: use <b>My Steps</b> for bedtime!</p>`}
    <button class="btn primary big" data-exit2>Finish</button></div>`;
  good(); g.speak("Brain Gym done! Great focus today.");
  stage.querySelector("[data-exit2]").onclick = ctx.exit;
  const sb = stage.querySelector("[data-says]"); if (sb) sb.onclick = () => ctx.open({ name: "says" });
}

/* ---------- Pip Says (off-screen movement) ---------- */
async function says(root, b, ctx, g) {
  root.innerHTML = `<div class="row spread bg-top"><h2>🕺 Movement games</h2><button class="btn ghost" data-exit>Back</button></div>
    <p class="muted">Play together for 3 minutes. Stand up and make some space! Pip calls out the moves.</p>
    <div class="bg-pick">${SAYS_GAMES.map((s) => `<button class="bg-pickbtn" data-s="${s.id}"><b>${s.name}</b><small>${esc(s.how)}</small></button>`).join("")}</div>`;
  root.querySelector("[data-exit]").onclick = () => { unmount(); ctx.voice.stop(); ctx.exit(); };
  const pick = await new Promise((res) => (root.onclick = (e) => { const x = e.target.closest("[data-s]"); if (x) { root.onclick = null; res(SAYS_GAMES.find((y) => y.id === x.dataset.s)); } }));
  const SECS = 180, t0 = Date.now();
  root.innerHTML = `<div class="row spread bg-top"><h2>🕺 ${pick.name}</h2><button class="btn ghost" data-exit>Stop</button></div>
    <p class="muted small">${esc(pick.how)}</p><div class="bg-call" id="call">Get ready…</div><p class="bg-sub" id="sub"></p><div class="bg-hud"><span>⏱ <b id="tm">3:00</b></span></div>`;
  root.querySelector("[data-exit]").onclick = () => { unmount(); ctx.voice.stop(); ctx.exit(); };
  const call = root.querySelector("#call"), sub = root.querySelector("#sub"), tm = root.querySelector("#tm");
  const left = () => SECS - (Date.now() - t0) / 1000;
  const tick = setInterval(() => { if (!g.alive()) return clearInterval(tick); const l = Math.max(0, Math.ceil(left())); tm.textContent = `${Math.floor(l / 60)}:${String(l % 60).padStart(2, "0")}`; }, 500);
  await g.speakAsync(pick.how);
  let last = "";
  while (g.alive() && left() > 0) {
    if (pick.id === "freeze") {
      call.textContent = "💃 Dance!"; sub.textContent = "";
      const until = Date.now() + 4000 + Math.random() * 5000;
      let n = 0;
      while (g.alive() && Date.now() < until) { tone([392, 440, 494, 523, 587, 523, 494, 440][n++ % 8], 220, "square", 0.08); await wait(260); }
      if (!g.alive()) break;
      call.textContent = "🧊 FREEZE!"; g.speak("Freeze!"); await wait(3000 + Math.random() * 1500);
      continue;
    }
    let m = pick.moves[Math.floor(Math.random() * pick.moves.length)];
    if (String(m) === last) continue;
    last = String(m);
    if (pick.id === "says") {
      const real = Math.random() < 0.7, text = (real ? "Pip says, " : "") + m;
      call.textContent = real ? `🦉 Pip says: ${m}!` : `${m}!`; sub.textContent = "";
      await g.speakAsync(text);
      await wait(2200);
      if (!g.alive()) break;
      sub.textContent = real ? "✅ Pip said it, so you move!" : "🙊 Pip didn't say it. Did you stay still?";
      await wait(1500);
    } else {
      call.textContent = `🦉 ${m[0]}!`; sub.textContent = "";
      await g.speakAsync(m[0]);
      await wait(2200);
      if (!g.alive()) break;
      sub.textContent = `Opposite: ${m[1]}`;
      await wait(1500);
    }
  }
  clearInterval(tick);
  if (!g.alive()) return;
  const t = isoDay(); b.days[t] = { ...(b.days[t] || {}), says: true }; ctx.addStars(1); ctx.save();
  call.textContent = "🎉 Great moving! +1 star"; sub.textContent = ""; good(); g.speak("Great moving!");
  root.querySelector("[data-exit]").textContent = "Finish";
}

/* ---------- My Steps checklist ---------- */
function steps(root, b, routineId, ctx, g) {
  const r = b.routines.find((x) => x.id === routineId) || b.routines[0];
  if (!r) return ctx.exit();
  const t = isoDay();
  let done = 0, start = 0, tick = null;
  const draw = () => {
    const finished = done >= r.steps.length;
    const el = start ? Math.floor((Date.now() - start) / 1000) : 0;
    root.innerHTML = `<div class="row spread bg-top"><h2>${esc(r.icon || "✅")} ${esc(r.name)} steps</h2><button class="btn ghost" data-exit>Back</button></div>
      <p class="muted small">Do each step, then tap it. ${r.mins ? `Try to finish in ${r.mins} minutes.` : ""}</p>
      ${r.mins ? `<div class="bg-hud"><span>⏱ <b id="tm">${Math.floor(el / 60)}:${String(el % 60).padStart(2, "0")}</b> of ${r.mins}:00</span></div>` : ""}
      <ol class="bg-checklist">${r.steps.map((s, i) => `<li><button class="bg-check ${i < done ? "done" : i === done ? "next" : ""}" data-i="${i}" ${i !== done ? "disabled" : ""}><span class="bx">${i < done ? "✓" : i + 1}</span>${esc(s)}</button></li>`).join("")}</ol>
      ${finished ? `<div class="bg-title"><span>🌟</span><h3>All ${r.steps.length} steps done! +1 star</h3><button class="btn primary big" data-exit2>Finish</button></div>` : ""}`;
    root.querySelector("[data-exit]").onclick = () => { clearInterval(tick); ctx.exit(); };
    const f = root.querySelector("[data-exit2]"); if (f) f.onclick = () => { clearInterval(tick); ctx.exit(); };
    const next = root.querySelector(".bg-check.next");
    if (next) next.onclick = () => {
      if (!start) { start = Date.now(); if (r.mins) tick = setInterval(() => { const e = root.querySelector("#tm"); if (!g.alive() || !e) return clearInterval(tick); const s = Math.floor((Date.now() - start) / 1000); e.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }, 1000); }
      done++; tone(600 + done * 40, 90);
      if (done >= r.steps.length) {
        clearInterval(tick);
        const first = !b.steps[t]?.[r.id];
        (b.steps[t] ??= {})[r.id] = { at: Date.now(), secs: Math.round((Date.now() - start) / 1000) };
        for (const d of Object.keys(b.steps)) if (d < isoDay(new Date(Date.now() - 60 * 864e5))) delete b.steps[d];
        if (first) ctx.addStars(1);
        ctx.save(); good(); g.speak(`All done! Great job following your ${r.name} steps.`);
      }
      draw();
    };
  };
  draw();
}

/* ---------- Parent corner section ---------- */
export function parentCard(family, k, msg) {
  const b = data(family, k), s = b.settings;
  const weekAgo = isoDay(new Date(Date.now() - 6 * 864e5));
  const days = Object.keys(b.days).filter((d) => d >= weekAgo && b.days[d].done).length;
  const fmt = (x) => (x == null ? "–" : x);
  const rows = [...GAME_IDS, "recall"].map((id) => {
    const h = b.hist[id] || [], w = weekly(h), meta = id === "recall" ? { name: "Picnic check (memory after 10 minutes)", icon: "🧺", unit: "remembered" } : GAMES[id];
    return `<tr><td>${meta.icon} ${meta.name}<br><span class="small muted">${id === "recall" ? "Remembering later" : meta.skill}</span></td><td class="num">${id === "recall" ? "" : levelOf(b, id)}</td><td class="num">${h.length ? Math.max(...h.map((x) => x.s)) : "–"}</td><td class="num">${w.map(fmt).join(" · ")}</td><td class="small muted">${meta.unit}</td></tr>`;
  }).join("");
  const ageOpts = AGES.map((a) => `<option value="${a}" ${a === +s.age ? "selected" : ""}>${a} years</option>`).join("");
  return `<div class="card"><div class="row spread"><h2>🧠 Brain Gym</h2><span class="pill ${days >= 4 ? "good" : days >= 2 ? "warn" : ""}">${days}/5 days this week</span></div>
  <p class="muted small">Ten minutes of games, Monday to Friday. Expect slow, steady gains over weeks, and look for the same skills in homework and routines. Sleep (9 to 12 hours), a fixed routine and small steps matter more than any game.</p>
  <form id="bgsettings" class="row" style="align-items:flex-end">
    <label class="f">Age<select id="bgage">${ageOpts}</select></label>
    <label class="f">Difficulty<select id="bgdiff">${DIFFS.map((d) => `<option value="${d.id}" ${d.id === s.diff ? "selected" : ""}>${d.label}</option>`).join("")}</select></label>
    <label class="row small" style="font-weight:700"><input type="checkbox" id="bgauto" ${s.auto ? "checked" : ""}> Adjust automatically as ${esc(k.name)} plays</label>
    <button class="btn" type="submit">Save</button>${msg === "settings" ? `<span class="pill good">Saved. Games restart at the new level.</span>` : ""}
  </form>
  <p class="small muted">Age and difficulty set where each game starts (Medium at age ${esc(s.age)} is level ${startLevel({ ...s, diff: "medium" })} of 10). With automatic adjusting on, a game gets harder after 3 wins in a row and easier after 2 misses. Saving resets every game to the new starting level.</p>
  <div class="tablewrap"><table><thead><tr><th>Game</th><th>Level</th><th>Best</th><th>Last 4 weeks (avg)</th><th>Score is</th></tr></thead><tbody>${rows}</tbody></table></div>
  <h3>My Steps routines</h3><p class="small muted">One step per line. Start a line with an emoji to give the step a picture. ${esc(k.name)} taps each step as it's done and earns a star per routine each day.</p>
  <form id="bgroutines" class="bg-redit">${b.routines.map((r, i) => `<label class="f">${esc(r.icon)} ${esc(r.name)} <span class="small muted">(target minutes <input type="number" min="0" max="120" data-rmins="${i}" value="${r.mins || 0}" style="width:70px">)</span><textarea rows="6" data-rsteps="${i}">${esc(r.steps.join("\n"))}</textarea></label>`).join("")}
  <div class="row"><button class="btn" type="submit">Save routines</button><button class="btn ghost" type="button" id="bgrdefault">Reset to defaults</button>${msg === "routines" ? `<span class="pill good">Saved</span>` : ""}</div></form></div>`;
}

// Called from main's bind() while the Parent corner is open.
export function bindParent(family, k, $, save, rerender) {
  const b = data(family, k);
  $("#bgsettings")?.addEventListener("submit", (e) => {
    e.preventDefault();
    b.settings = { age: +$("#bgage").value, diff: $("#bgdiff").value, auto: $("#bgauto").checked };
    b.levels = {}; save(); rerender("settings");
  });
  $("#bgroutines")?.addEventListener("submit", (e) => {
    e.preventDefault();
    b.routines.forEach((r, i) => {
      const st = parseSteps(document.querySelector(`[data-rsteps="${i}"]`).value);
      if (st.length) r.steps = st;
      r.mins = Math.max(0, Math.min(120, +document.querySelector(`[data-rmins="${i}"]`).value || 0));
    });
    save(); rerender("routines");
  });
  $("#bgrdefault")?.addEventListener("click", () => { b.routines = clone(DEFAULT_ROUTINES); save(); rerender("routines"); });
}
