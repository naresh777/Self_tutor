import "./style.css";
import { GRADES, SUBJECTS, SKILLS, gradeLabel, skillsFor } from "./curriculum.js";
import { isCorrect, normText, localProblems } from "./check.js";
import * as ai from "./ai.js";
import { family, save, exportJson, importJson, resetFamily } from "./store.js";

/* ---------------- helpers ---------------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const uid = () => Math.random().toString(36).slice(2, 10);
const dayKey = (t) => { const d = new Date(t); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
const today = () => dayKey(Date.now());
const COLORS = ["#ef6a3a", "#1c9a8c", "#7a5af5", "#d94f8a", "#2f7de1", "#c98a00"];
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

/* ---------------- progress model ---------------- */
const EMPTY = { recent: [], attempts: 0, correct: 0, last: 0 };
function prog(kidId, skillId) { family.progress[kidId] ??= {}; return (family.progress[kidId][skillId] ??= { ...EMPTY, recent: [] }); }
const peek = (kidId, skillId) => family.progress[kidId]?.[skillId] || EMPTY;
const mastery = (p) => (p.recent.length ? p.recent.reduce((a, b) => a + b, 0) / p.recent.length : 0);
function status(p) {
  if (!p.attempts) return { k: "new", label: "Not started", cls: "" };
  const m = mastery(p);
  if (m >= 0.85 && p.recent.length >= 8) return { k: "mastered", label: "Mastered", cls: "good" };
  if (m >= 0.6) return { k: "practicing", label: "Getting there", cls: "warn" };
  return { k: "learning", label: p.attempts >= 4 ? "Needs help" : "Learning", cls: p.attempts >= 4 ? "bad" : "" };
}
const meterColor = (s) => (s.k === "mastered" ? "var(--good)" : s.k === "practicing" ? "var(--warn)" : s.k === "learning" ? "var(--bad)" : "var(--idle)");
function level(p) { const m = mastery(p); if (p.recent.length < 3) return 1; return m >= 0.85 ? 3 : m >= 0.6 ? 2 : 1; }
function record(kidId, skillId, score) { const p = prog(kidId, skillId); p.recent.push(score); if (p.recent.length > 10) p.recent.shift(); p.attempts++; if (score >= 1) p.correct++; p.last = Date.now(); }
const kidLog = (kidId) => family.log.filter((l) => l.kid === kidId);
const doneToday = (kidId) => kidLog(kidId).filter((l) => dayKey(l.at) === today()).reduce((a, l) => a + l.total, 0);
function streak(kidId) {
  const days = new Set(kidLog(kidId).map((l) => dayKey(l.at)));
  const d = new Date(); let n = 0;
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const getKid = (id) => family.kids.find((k) => k.id === id);

/* ---------------- read aloud ---------------- */
const canSpeak = "speechSynthesis" in window;
function speak(text) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/×/g, " times ").replace(/÷/g, " divided by ").replace(/−/g, " minus "));
  u.rate = 0.9;
  speechSynthesis.speak(u);
}
const speakBtn = (id, label = "Read aloud") => (canSpeak ? `<button class="speak" data-speak="${id}" aria-label="${label}" title="${label}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg></button>` : "");

/* ---------------- views ---------------- */
let view = { name: "home" };
function go(v) { view = v; render(); window.scrollTo({ top: 0 }); }
const owl = (size = 44, cls = "") => `<svg class="pip ${cls}" style="width:${size}px;height:${size}px" viewBox="0 0 64 64" aria-hidden="true"><use href="#owl"/></svg>`;
const avatar = (k, sm) => `<span class="av ${sm ? "sm" : ""}" style="background:${k.color}">${esc((k.name || "?").trim()[0]?.toUpperCase() || "?")}</span>`;
const header = (right = "") => `<div class="top"><button class="brand" data-go="home" aria-label="Pip Tutor home">${owl(46)}<span><b>Pip Tutor</b><small>Math and English for our family</small></span></button><div class="row">${right}</div></div>`;
function aiBanner(parent) {
  if (ai.aiReady()) return "";
  return `<div class="banner">${parent ? "Add your Claude API key in Family settings to turn on Pip's worksheets, hints and reports." : "Pip's smart worksheets are off until a grown-up adds a Claude key in the Parent corner. You can still practice number facts."}</div>`;
}

function render() {
  const app = $("#app");
  const v = view.name;
  app.innerHTML = v === "kid" ? kidView() : v === "practice" ? practiceView() : v === "parent" ? parentView() : v === "setup" ? setupView() : homeView();
  bind();
}

function homeView() {
  const kids = family.kids;
  const right = `<button class="btn ghost" data-go="parent">Parent corner</button>`;
  if (!kids.length)
    return header(right) + `<div class="card"><div class="row">${owl(72, "bob")}<div><h1>Hoot! I'm Pip.</h1><p class="muted">I help kids practice math and English with worksheets made just for them, hints when they're stuck, and step-by-step answers.</p></div></div>
    <h2>Set up your family</h2><p>Add each child with their grade (Kindergarten to Grade 8). Then open the Parent corner to add your Claude API key.</p>${addKidForm()}</div>`;
  return header(right) + aiBanner(false) + `<div class="card"><h1>Who's practicing today?</h1>
  <div class="kids">${kids.map((k) => { const d = doneToday(k.id), s = streak(k.id); return `<button class="kid" data-kid="${k.id}">${avatar(k)}<b>${esc(k.name)}</b><span class="muted small">${gradeLabel(k.grade)}</span><span class="row" style="justify-content:center"><span class="pill ${d >= family.goal ? "good" : ""}">${d}/${family.goal} today</span>${s ? `<span class="pill warn">${s}-day streak</span>` : ""}</span></button>`; }).join("")}</div></div>`;
}
const addKidForm = () => `<form id="addkid" class="row" style="align-items:flex-end">
  <label class="f" style="flex:1 1 180px">Child's first name<input type="text" id="kidname" maxlength="24" required placeholder="e.g. Maya" autocomplete="off"></label>
  <label class="f">Grade<select id="kidgrade">${GRADES.map((g) => `<option value="${g}" ${g === "3" ? "selected" : ""}>${gradeLabel(g)}</option>`).join("")}</select></label>
  <button class="btn primary" type="submit">Add child</button></form>`;
const subjectTabs = (cur, attr) => `<div class="subjects" role="tablist">${Object.entries(SUBJECTS).map(([id, s]) => `<button class="subj ${id === cur ? "on" : ""}" ${attr}="${id}" role="tab" aria-selected="${id === cur}">${s.name}</button>`).join("")}</div>`;

function nextSkill(k, subject) {
  const focus = (k.focus || []).filter((id) => SKILLS[id]?.subject === subject);
  if (focus.length) return { skill: SKILLS[focus[0]], focus: true };
  const ranked = [...skillsFor(subject, k.grade)].sort((a, b) => {
    const pa = peek(k.id, a.id), pb = peek(k.id, b.id);
    const sa = status(pa).k === "mastered" ? 2 : pa.attempts ? 0 : 1, sb = status(pb).k === "mastered" ? 2 : pb.attempts ? 0 : 1;
    return sa - sb || mastery(pa) - mastery(pb);
  });
  return { skill: ranked[0], focus: false };
}

function kidView() {
  const k = getKid(view.kid); if (!k) return homeView();
  const subject = (view.subject ||= "math");
  const d = doneToday(k.id), st = streak(k.id), stars = family.stars[k.id] || 0;
  const { skill: next, focus } = nextSkill(k, subject);
  const pct = Math.min(100, Math.round((d / family.goal) * 100));
  return header(`<button class="btn ghost" data-go="home">Switch kid</button>`) + aiBanner(false) + `
  <div class="card"><div class="row spread"><div class="row">${avatar(k)}<div><h1>Hi, ${esc(k.name)}!</h1><p class="muted">${gradeLabel(k.grade)}</p></div></div>
  <div class="row"><span class="stars">★ ${stars} stars</span>${st ? `<span class="pill warn">${st}-day streak</span>` : ""}</div></div>
  <div><div class="row spread small"><b>Today's goal: ${family.goal} problems</b><span class="muted">${d} done${d >= family.goal ? " · Goal reached!" : ""}</span></div><div class="goalbar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>
  ${subjectTabs(subject, "data-subject")}
  <div class="row"><button class="btn primary big" data-start="${next.id}">Start: ${esc(next.name)}</button>${focus ? `<span class="pill focus">Picked by your parent</span>` : ""}</div></div>
  <div class="card"><div class="row spread"><h2>My ${SUBJECTS[subject].name} map</h2><span class="muted small">Tap any skill to practice it</span></div>
  ${mapHtml(k, subject, false)}
  <details><summary class="small">Practice another grade</summary><div class="row" style="margin-top:8px">${GRADES.filter((g) => g !== k.grade).map((g) => `<button class="tab" data-peek="${g}">${g === "K" ? "K" : "Gr " + g}</button>`).join("")}</div><div id="peekmap" style="margin-top:10px"></div></details></div>`;
}

function mapHtml(k, subject, parent, grade) {
  const sk = skillsFor(subject, grade || k.grade);
  return `<div class="strands">${Object.entries(SUBJECTS[subject].strands).map(([sid, s]) => `<div class="strand" style="display:flex;flex-direction:column;gap:8px"><h3><i style="background:${s.color}"></i>${s.name}</h3><div class="skills">${sk.filter((x) => x.strand === sid).map((x) => {
    const p = peek(k.id, x.id), st = status(p), m = Math.round(mastery(p) * 100), f = (k.focus || []).includes(x.id);
    return `<button class="skill st-${st.k}" ${parent ? `data-focus="${x.id}"` : `data-start="${x.id}"`} aria-label="${esc(x.name)}: ${st.label}">
      <span class="nm">${esc(x.name)}</span><span class="row" style="gap:4px">${f ? `<span class="pill focus">Focus</span>` : ""}<span class="pill ${st.cls}">${st.label}</span></span>
      <span class="meter"><i style="width:${p.attempts ? Math.max(m, 4) : 0}%;background:${meterColor(st)}"></i></span>
      ${parent ? `<span class="small muted" style="grid-column:1/-1">${p.attempts ? `${p.correct}/${p.attempts} right overall · last 10: ${m}%` : "No practice yet"} · ${f ? "Tap to remove focus" : "Tap to set as focus"}</span>` : ""}
    </button>`;
  }).join("")}</div></div>`).join("")}</div>`;
}

/* ---------------- practice ---------------- */
async function startPractice(kidId, skillId) {
  const skill = SKILLS[skillId];
  const lvl = level(peek(kidId, skillId));
  view = { name: "practice", kid: kidId, skill: skillId, subject: skill.subject, state: "loading", lvl, i: 0, results: [], started: Date.now(), probs: [], passage: "", tries: [], chat: [], shown: 0, fb: null, sel: null, offline: false };
  render();
  const misses = kidLog(kidId).filter((l) => l.skill === skillId).flatMap((l) => l.misses || []).slice(-3).map((m) => m.q);
  try {
    if (!ai.aiReady()) throw { code: "no_key" };
    const ws = await ai.makeWorksheet(skill, lvl, misses);
    if (view.name !== "practice" || view.skill !== skillId) return;
    Object.assign(view, { probs: ws.problems, passage: ws.passage, state: "q" });
  } catch (e) {
    if (view.name !== "practice") return;
    if (skill.op) Object.assign(view, { probs: localProblems(skill.op, lvl), offline: true, state: "q" });
    else Object.assign(view, { state: "error", err: e?.code });
  }
  render();
}

const ERR = {
  no_key: "This skill needs Pip's AI help. A grown-up can add a Claude API key in the Parent corner.",
  bad_key: "The Claude API key wasn't accepted. A grown-up can check it in Family settings.",
  billing: "The Claude account is out of credit. A grown-up can add credit in the Claude Console.",
  rate_limited: "Pip is a little busy. Wait a minute and try again.",
  offline: "Pip can't reach the internet right now. Check the Wi-Fi and try again.",
};
function practiceView() {
  const k = getKid(view.kid), skill = SKILLS[view.skill];
  const head = header(`<button class="btn ghost" id="quit">End practice</button>`);
  if (view.state === "loading") return head + `<div class="card"><div class="loader">${owl(64, "bob")}<div><h2>Pip is writing your worksheet…</h2><p class="muted">${SUBJECTS[skill.subject].name} · ${esc(skill.name)} · level ${view.lvl} of 3. This can take up to a minute.</p></div></div></div>`;
  if (view.state === "error")
    return head + `<div class="card"><div class="row">${owl(56)}<div><h2>Oops, no worksheet yet</h2><p>${ERR[view.err] || "Pip couldn't write this worksheet. Please try again."}</p></div></div><div class="row"><button class="btn primary" data-start="${skill.id}">Try again</button><button class="btn" data-kid="${k.id}">Back to my map</button></div></div>`;
  if (view.state === "done") return head + doneHtml(k, skill);
  const p = view.probs[view.i], n = view.probs.length;
  const dots = view.probs.map((_, j) => { const r = view.results[j]; return `<span class="${r ? (r.score >= 1 ? "ok" : r.score > 0 ? "on" : "no") : j === view.i ? "on" : ""}"></span>`; }).join("");
  const answered = view.fb && (view.fb.kind === "good" || view.fb.kind === "reveal");
  const input = p.type === "choice"
    ? `<div class="choices" role="group" aria-label="Choices">${p.choices.map((c, j) => `<button class="choice ${view.sel === j ? "sel" : ""}" data-choice="${j}" ${answered || view.checking ? "disabled" : ""}>${esc(c)}</button>`).join("")}</div>`
    : `<form class="ans" id="ansform"><input id="ans" type="text" inputmode="${p.type === "number" ? "decimal" : "text"}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Your answer" ${answered || view.checking ? "disabled" : ""}><button class="btn primary" type="submit" ${answered || view.checking ? "disabled" : ""}>${view.checking ? "Checking…" : "Check"}</button></form>`;
  const steps = view.shown ? `<div><h3>Step by step</h3><ol class="steps">${p.steps.slice(0, view.shown).map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol>${view.shown < p.steps.length ? `<button class="btn" id="morestep" style="margin-top:8px">Show next step</button>` : ""}</div>` : "";
  const fb = view.fb ? `<div class="fb ${view.fb.kind === "good" ? "good" : view.fb.kind === "bad" ? "bad" : "info"}" role="status">${esc(view.fb.text)}</div>` : "";
  const help = answered
    ? `<button class="btn primary big" id="next">${view.i + 1 < n ? "Next problem" : "See my results"}</button>`
    : `<div class="row">${view.tries.length ? `<button class="btn" id="hint">Get a hint</button>` : ""}${view.shown ? "" : `<button class="btn" id="showstep">Show me how</button>`}${view.shown >= p.steps.length ? `<button class="btn ghost" id="reveal">I see it, show the answer</button>` : ""}</div>`;
  const chat = ai.aiReady() && !view.offline
    ? `<div class="card"><div class="row">${owl(36)}<h3>Ask Pip</h3></div>
    <div class="chat" id="chat">${view.chat.length ? "" : `<div class="msg pipm">Stuck? Tell me what you're thinking, or ask me a question about this problem.</div>`}${view.chat.map((m) => `<div class="msg ${m.role === "user" ? "kidm" : "pipm"}">${esc(m.content)}</div>`).join("")}${view.thinking ? `<div class="msg pipm">Pip is thinking…</div>` : ""}</div>
    <form class="chatform" id="chatform"><input type="text" id="chatin" maxlength="300" placeholder="Type to Pip" aria-label="Message to Pip" ${view.thinking ? "disabled" : ""}><button class="btn" type="submit" ${view.thinking ? "disabled" : ""}>Send</button></form></div>`
    : `<div class="card"><div class="row">${owl(36)}<h3>Pip's tips</h3></div><p class="muted">Read the problem out loud. Draw a picture or use your fingers. Then check your answer by doing it a second way.</p></div>`;
  const passage = view.passage ? `<div><div class="row spread"><h3>Read this first</h3>${speakBtn("passage", "Read the passage aloud")}</div><div class="passage">${esc(view.passage)}</div></div>` : "";
  return head + `<div class="prac"><div class="card">
    <div class="row spread"><span class="pill">${SUBJECTS[skill.subject].name} · ${esc(skill.name)} · level ${view.lvl}</span><div class="dots" aria-label="Problem ${view.i + 1} of ${n}">${dots}</div></div>
    ${passage}
    <p class="small muted">Problem ${view.i + 1} of ${n}${view.offline ? " · built-in sheet" : ""}</p>
    <div class="qrow"><div class="q">${esc(p.question)}</div>${speakBtn("question", "Read the question aloud")}</div>${input}${fb}${steps}${help}</div>${chat}</div>`;
}

async function checkAnswer(given) {
  const p = view.probs[view.i], skill = SKILLS[view.skill];
  if (!String(given).trim() || view.checking) return;
  view.tries.push(String(given));
  let ok = isCorrect(given, p);
  // A typed word answer that doesn't match exactly gets a second look from Claude.
  if (!ok && p.type === "text" && ai.aiReady() && !view.offline && normText(given).length > 1) {
    view.checking = true; render();
    const myI = view.i;
    try { ok = await ai.judgeAnswer(skill, p, view.passage, given); } catch { ok = false; }
    view.checking = false;
    if (view.name !== "practice" || view.i !== myI) return;
  }
  if (ok) {
    const score = view.shown ? 0 : view.tries.length === 1 && !view.hinted ? 1 : 0.5;
    view.results[view.i] = { score, given };
    const cheers = ["Hoot hoot! That's right!", "Nailed it!", "Yes! Great thinking.", "Correct! You're on a roll.", "Perfect!"];
    view.fb = { kind: "good", text: (score === 1 ? cheers[rnd(0, cheers.length - 1)] : "Yes, that's right! Nice work sticking with it.") + (score === 1 ? " +2 stars" : score > 0 ? " +1 star" : "") };
  } else {
    view.fb = { kind: "bad", text: view.tries.length === 1 ? "Not quite. Try again, or tap Get a hint." : view.tries.length === 2 ? "Still not it. Try Show me how to see the first step." : "Let's look at the steps together." };
    if (view.tries.length >= 3 && !view.shown) view.shown = 1;
  }
  render();
  if (view.fb.kind === "bad") setTimeout(() => $("#ans")?.focus(), 0);
}

function finishProblem() {
  const p = view.probs[view.i];
  view.results[view.i] ||= { score: 0, given: view.tries.at(-1) || "" };
  const r = view.results[view.i];
  record(view.kid, view.skill, r.score);
  family.stars[view.kid] = (family.stars[view.kid] || 0) + (r.score >= 1 ? 2 : r.score > 0 ? 1 : 0);
  r.q = p.question; r.ans = p.answer;
  save();
  if (view.i + 1 < view.probs.length) {
    Object.assign(view, { i: view.i + 1, tries: [], chat: [], shown: 0, fb: null, sel: null, hinted: false });
    render(); setTimeout(() => $("#ans")?.focus(), 0);
    return;
  }
  const res = view.results;
  family.log.push({ kid: view.kid, skill: view.skill, at: Date.now(), total: res.length, correct: res.filter((x) => x.score >= 1).length, mins: Math.max(1, Math.round((Date.now() - view.started) / 60000)), lvl: view.lvl, misses: res.filter((x) => x.score < 1).map((x) => ({ q: x.q, a: x.ans, g: x.given })) });
  if (family.log.length > 600) family.log = family.log.slice(-600);
  save(); view.state = "done"; render();
}

function doneHtml(k, skill) {
  const res = view.results, c = res.filter((r) => r.score >= 1).length, n = res.length;
  const st = status(peek(k.id, skill.id));
  const earned = res.reduce((a, r) => a + (r.score >= 1 ? 2 : r.score > 0 ? 1 : 0), 0);
  const conf = Array.from({ length: 14 }, (_, i) => `<span style="background:${COLORS[i % COLORS.length]};--r:${rnd(-40, 40)}deg"></span>`).join("");
  return `<div class="card"><div class="confetti" aria-hidden="true">${conf}</div><div class="row">${owl(64, "bob")}<div><h1>${c === n ? "A perfect sheet!" : c >= n - 1 ? "Great work!" : c >= n / 2 ? "Nice effort!" : "You kept going, that's how we learn!"}</h1>
  <p>${esc(k.name)} got <b>${c} of ${n}</b> right on the first go and earned <span class="stars">★ ${earned}</span>.</p></div></div>
  <div class="row"><span class="pill ${st.cls}">${esc(skill.name)}: ${st.label}</span><span class="pill">${doneToday(k.id)}/${family.goal} problems today</span></div>
  ${res.some((r) => r.score < 1) ? `<details><summary>Problems to look at again</summary><ul>${res.filter((r) => r.score < 1).map((r) => `<li>${esc(r.q)} <span class="muted">Answer: ${esc(r.ans)}</span></li>`).join("")}</ul></details>` : ""}
  <div class="row"><button class="btn primary big" data-start="${skill.id}">Another sheet</button><button class="btn" data-kid="${k.id}" data-ksub="${skill.subject}">Back to my map</button></div></div>`;
}

async function askPip(text) {
  const k = getKid(view.kid), skill = SKILLS[view.skill], p = view.probs[view.i];
  view.chat.push({ role: "user", content: text }); view.thinking = true; view.hinted = true; render(); scrollChat();
  const system = ai.tutorSystem(k, skill, p, view.passage, view.tries);
  const msg = { role: "assistant", content: "" }; let added = false; const myI = view.i;
  const onText = (t) => {
    if (view.i !== myI || view.name !== "practice") return;
    msg.content = t;
    if (!added) { view.chat.push(msg); added = true; view.thinking = false; render(); }
    else { const el = $("#chat"); if (el?.lastElementChild) el.lastElementChild.textContent = t; }
    scrollChat();
  };
  try {
    const t = await ai.tutorReply(system, view.chat.slice(-12).filter((m) => m !== msg), onText);
    msg.content = t; if (!added && view.i === myI) view.chat.push(msg);
  } catch (e) {
    if (view.i === myI) {
      if (added) view.chat.pop();
      view.chat.push({ role: "assistant", content: e.code === "rate_limited" ? "I'm a bit busy. Try again in a minute!" : e.code === "offline" ? "I can't reach the internet right now." : "Hmm, my feathers got ruffled. Try asking again." });
    }
  }
  view.thinking = false;
  if (view.name === "practice" && view.i === myI) { render(); scrollChat(); $("#chatin")?.focus(); }
}
function scrollChat() { const el = $("#chat"); if (el) el.scrollTop = el.scrollHeight; }

/* ---------------- parent corner ---------------- */
function parentView() {
  const back = `<button class="btn ghost" data-go="home">Back to kids</button>`;
  if (!view.unlocked) {
    const hasPin = !!family.pin;
    return header(back) + `<div class="card" style="max-width:460px"><h1>Parent corner</h1>
    <p class="muted">${hasPin ? "Enter your parent PIN." : "Choose a 4-digit PIN to keep this area for grown-ups. It's a light lock to keep kids out, not a password."}</p>
    <form id="pinform" class="row"><input type="password" inputmode="numeric" id="pin" maxlength="8" placeholder="PIN" aria-label="PIN" style="width:140px" required><button class="btn primary" type="submit">${hasPin ? "Open" : "Set PIN"}</button></form>
    ${view.pinErr ? `<div class="fb bad">That PIN doesn't match. Try again.</div>` : ""}</div>`;
  }
  const kids = family.kids;
  const right = `<button class="btn ghost" data-go="setup">Family settings</button><button class="btn ghost" id="lock">Lock</button>${back}`;
  if (!kids.length) return header(right) + aiBanner(true) + `<div class="card"><h1>Parent corner</h1><p>Add a child first.</p>${addKidForm()}</div>`;
  const kid = getKid(view.pk) || kids[0]; view.pk = kid.id;
  const subject = (view.psub ||= "math");
  const week = Date.now() - 7 * 864e5, L = kidLog(kid.id), LW = L.filter((l) => l.at >= week);
  const bySubj = (s) => LW.filter((l) => SKILLS[l.skill]?.subject === s);
  const sum = (arr, f) => arr.reduce((a, l) => a + l[f], 0);
  const probs = sum(LW, "total"), corr = sum(LW, "correct"), mins = sum(LW, "mins");
  const days = new Set(LW.map((l) => dayKey(l.at))).size;
  const all = [...skillsFor("math", kid.grade), ...skillsFor("english", kid.grade)];
  const mastered = all.filter((s) => status(peek(kid.id, s.id)).k === "mastered").length;
  const needs = all.filter((s) => status(peek(kid.id, s.id)).k === "learning" && peek(kid.id, s.id).attempts >= 4);
  const subjLine = Object.keys(SUBJECTS).map((s) => { const a = bySubj(s), t = sum(a, "total"); return `${SUBJECTS[s].name}: ${t} problems${t ? `, ${Math.round((sum(a, "correct") / t) * 100)}% first try` : ""}`; }).join(" · ");
  return header(right) + aiBanner(true) + `
  <div class="tabs" role="tablist">${kids.map((k) => `<button class="tab ${k.id === kid.id ? "on" : ""}" data-pk="${k.id}" role="tab" aria-selected="${k.id === kid.id}">${avatar(k, true)}${esc(k.name)}</button>`).join("")}</div>
  <div class="card"><div class="row spread"><h2>${esc(kid.name)} · last 7 days</h2><span class="muted small">${gradeLabel(kid.grade)} · ${family.stars[kid.id] || 0} stars total</span></div>
  <div class="stats">
    <div class="stat"><div class="n">${probs}</div><div class="l">Problems</div></div>
    <div class="stat"><div class="n">${probs ? Math.round((corr / probs) * 100) + "%" : "–"}</div><div class="l">First-try accuracy</div></div>
    <div class="stat"><div class="n">${days}/7</div><div class="l">Days practiced</div></div>
    <div class="stat"><div class="n">${mins}</div><div class="l">Minutes</div></div>
    <div class="stat"><div class="n">${mastered}/${all.length}</div><div class="l">Skills mastered</div></div>
  </div>
  <p class="small muted">${subjLine}</p>
  ${needs.length ? `<div class="fb info">Needs attention: ${needs.map((s) => esc(s.name)).join(", ")}. Try sitting with ${esc(kid.name)} for one sheet, or set it as a focus skill below.</div>` : ""}
  <div class="row spread"><h3>Progress note from Pip</h3>${ai.aiReady() ? `<button class="btn" id="report" ${view.reporting ? "disabled" : ""}>${view.reporting ? "Writing…" : "Write a progress note"}</button>` : ""}</div>
  ${view.report && view.report.kid === kid.id ? `<div class="note">${esc(view.report.text)}</div>` : `<p class="muted small">${ai.aiReady() ? "Pip reads the practice log and writes a short summary with what to try next." : "Available once your Claude API key is added."}</p>`}
  </div>
  <div class="card"><div class="row spread"><h2>Skill map</h2><span class="muted small">Tap a skill to make it a focus. Focus skills come first on ${esc(kid.name)}'s screen.</span></div>${subjectTabs(subject, "data-psub")}${mapHtml(kid, subject, true)}</div>
  <div class="card"><h2>Recent practice</h2>${L.length ? `<div class="tablewrap"><table><thead><tr><th>When</th><th>Skill</th><th>Score</th><th>Level</th><th>Missed</th></tr></thead><tbody>
  ${L.slice(-30).reverse().map((l) => `<tr><td class="num">${new Date(l.at).toLocaleDateString(undefined, { month: "short", day: "numeric" })} ${new Date(l.at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</td><td>${esc(SKILLS[l.skill] ? SUBJECTS[SKILLS[l.skill].subject].name + ": " + SKILLS[l.skill].name : l.skill)}</td><td class="num">${l.correct}/${l.total}</td><td class="num">${l.lvl}</td><td>${(l.misses || []).length ? `<details><summary class="small">${l.misses.length} problem${l.misses.length > 1 ? "s" : ""}</summary>${l.misses.map((m) => `<p class="small" style="margin-top:6px">${esc(m.q)}<br><span class="muted">Answered ${esc(m.g || "(no answer)")} · correct ${esc(m.a)}</span></p>`).join("")}</details>` : `<span class="muted small">None</span>`}</td></tr>`).join("")}
  </tbody></table></div>` : `<p class="muted">No practice yet. When ${esc(kid.name)} finishes a worksheet it shows up here, with any missed problems.</p>`}</div>`;
}

async function writeReport(kid) {
  view.reporting = true; render();
  const L = kidLog(kid.id).filter((l) => l.at >= Date.now() - 14 * 864e5);
  const lines = Object.keys(SUBJECTS).map((subj) => `${SUBJECTS[subj].name}:\n` + skillsFor(subj, kid.grade).map((s) => { const p = peek(kid.id, s.id); return `- ${s.name}: ${p.attempts ? `${status(p).label}, ${Math.round(mastery(p) * 100)}% on last ${p.recent.length}, ${p.attempts} problems total` : "not started"}`; }).join("\n")).join("\n\n");
  const sess = L.slice(-25).map((l) => `- ${new Date(l.at).toDateString()}: ${SKILLS[l.skill] ? SUBJECTS[SKILLS[l.skill].subject].name + ", " + SKILLS[l.skill].name : l.skill}, ${l.correct}/${l.total} first try, level ${l.lvl}, ${l.mins} min${(l.misses || []).length ? "; missed: " + l.misses.map((m) => `"${m.q}" (answered ${m.g || "nothing"}, correct ${m.a})`).join("; ") : ""}`).join("\n");
  const prompt = `Write a short progress note for a parent about their child's math and English practice. Child: ${kid.name}, ${gradeLabel(kid.grade)}. Daily goal: ${family.goal} problems.

Skill status:
${lines}

Practice sessions in the last 14 days:
${sess || "none"}

Write 3 short paragraphs in plain text (no markdown, no headings): 1) how practice went (consistency and accuracy in each subject), 2) strengths and any misconceptions you can see in the missed answers, 3) two or three concrete things the parent can do this week, including which skill to focus on and one quick off-screen activity. Be warm, specific and honest. Under 200 words.`;
  try { view.report = { kid: kid.id, text: await ai.progressNote(prompt) }; }
  catch (e) { view.report = { kid: kid.id, text: ERR[e.code] || "Pip couldn't write the note just now. Try again in a minute." }; }
  view.reporting = false; if (view.name === "parent") render();
}

function setupView() {
  if (!view.unlocked) { view = { name: "parent" }; return parentView(); }
  const s = ai.loadAi();
  return header(`<button class="btn ghost" id="toparent">Back to Parent corner</button>`) + `<div class="card"><h1>Family settings</h1>
  <h2>Kids</h2><div class="skills">${family.kids.map((k) => `<div class="row spread" style="border:1px solid var(--line);border-radius:12px;padding:10px 12px">
    <div class="row">${avatar(k, true)}<input type="text" data-rename="${k.id}" value="${esc(k.name)}" maxlength="24" aria-label="Name" style="width:150px"></div>
    <div class="row"><select data-grade="${k.id}" aria-label="Grade for ${esc(k.name)}">${GRADES.map((g) => `<option value="${g}" ${g === k.grade ? "selected" : ""}>${gradeLabel(g)}</option>`).join("")}</select>
    ${view.confirmDel === k.id ? `<span class="small">Delete ${esc(k.name)} and all progress?</span><button class="btn danger" data-del="${k.id}">Yes, delete</button><button class="btn ghost" data-nodel>Cancel</button>` : `<button class="btn ghost" data-askdel="${k.id}">Remove</button>`}</div></div>`).join("")}</div>
  ${addKidForm()}
  <h2>Daily goal</h2><div class="row"><label class="f">Problems per day<input type="number" id="goal" min="5" max="50" step="5" value="${family.goal}" style="width:110px"></label><span class="muted small">Each worksheet is 5 problems, so ${family.goal} is ${Math.ceil(family.goal / 5)} sheet${family.goal > 5 ? "s" : ""} a day.</span></div>
  </div>
  <div class="card"><h2>Pip's brain (Claude)</h2>
  <p class="muted small">Pip writes worksheets, gives hints and writes reports using Claude. Create an API key at <code>console.anthropic.com</code> → API keys, and set a monthly spend limit there. The key is saved only on this device and is sent only to Anthropic.</p>
  <form id="aiform" class="row" style="align-items:flex-end">
    <label class="f" style="flex:1 1 260px">API key<input type="password" id="apikey" autocomplete="off" placeholder="${s.key ? "Saved (" + esc(s.key.slice(0, 10)) + "…). Paste to replace" : "sk-ant-…"}"></label>
    <label class="f">Model<select id="model">${ai.MODELS.map((m) => `<option value="${m.id}" ${m.id === s.model ? "selected" : ""}>${m.label}</option>`).join("")}</select></label>
    <button class="btn primary" type="submit">Save and test</button>
    ${s.key ? `<button class="btn ghost" type="button" id="forgetkey">Remove key</button>` : ""}
  </form>
  ${view.aiMsg ? `<div class="fb ${view.aiMsg.ok ? "good" : view.aiMsg.wait ? "info" : "bad"}">${esc(view.aiMsg.text)}</div>` : ""}
  </div>
  <div class="card"><h2>Parent PIN</h2><form id="newpin" class="row"><input type="password" inputmode="numeric" id="pin2" maxlength="8" placeholder="New PIN" aria-label="New PIN" style="width:140px"><button class="btn" type="submit">Change PIN</button>${view.pinSaved ? `<span class="pill good">Saved</span>` : ""}</form></div>
  <div class="card"><h2>Backup and moving devices</h2>
  <p class="muted small">Progress is saved on this device. To move it to another iPad or phone, copy the backup text below, then paste it into Restore on the other device.</p>
  <div class="row"><button class="btn" id="copybackup">Copy backup</button><button class="btn" id="showbackup">Show backup text</button></div>
  ${view.showBackup ? `<textarea id="backuptext" rows="5" style="width:100%" readonly>${esc(exportJson())}</textarea>` : ""}
  <label class="f">Restore from backup<textarea id="restoretext" rows="3" style="width:100%" placeholder="Paste backup text here"></textarea></label>
  <div class="row"><button class="btn" id="restore">Restore</button>${view.backupMsg ? `<span class="pill ${view.backupMsg.ok ? "good" : "bad"}">${esc(view.backupMsg.text)}</span>` : ""}</div>
  <details><summary class="small">Start over</summary><p class="small muted" style="margin-top:8px">This deletes every child, all progress and the PIN on this device. Your API key stays.</p>${view.confirmReset ? `<div class="row"><button class="btn danger" id="doreset">Yes, delete everything</button><button class="btn ghost" id="noreset">Cancel</button></div>` : `<button class="btn danger" id="askreset">Delete all family data</button>`}</details>
  </div>
  <p class="muted small">Pip Tutor · version ${__APP_VERSION__}</p>`;
}

/* ---------------- events ---------------- */
function on(sel, ev, fn) { $$(sel).forEach((el) => el.addEventListener(ev, (e) => fn(e, el))); }
function bind() {
  on("[data-go]", "click", (_, b) => { const g = b.dataset.go; go({ name: g, unlocked: (g === "parent" || g === "setup") && view.unlocked, pk: view.pk }); });
  on("[data-kid]", "click", (_, b) => go({ name: "kid", kid: b.dataset.kid, subject: b.dataset.ksub || view.subject }));
  on("[data-subject]", "click", (_, b) => { view.subject = b.dataset.subject; render(); });
  on("[data-start]", "click", (_, b) => startPractice(view.kid, b.dataset.start));
  on("[data-peek]", "click", (_, b) => {
    const k = getKid(view.kid), box = $("#peekmap");
    box.innerHTML = `<h3 style="margin-bottom:8px">${gradeLabel(b.dataset.peek)}</h3>` + mapHtml(k, view.subject, false, b.dataset.peek);
    box.querySelectorAll("[data-start]").forEach((x) => x.addEventListener("click", () => startPractice(view.kid, x.dataset.start)));
  });
  on("#addkid", "submit", (e) => { e.preventDefault(); const name = $("#kidname").value.trim(); if (!name) return; family.kids.push({ id: uid(), name, grade: $("#kidgrade").value, color: COLORS[family.kids.length % COLORS.length], focus: [] }); save(); render(); });
  on("#quit", "click", () => go({ name: "kid", kid: view.kid, subject: view.subject }));
  on("#ansform", "submit", (e) => { e.preventDefault(); checkAnswer($("#ans").value); });
  const a = $("#ans"); if (a && !a.disabled && !view.chatFocus && window.matchMedia("(pointer:fine)").matches) a.focus();
  on("[data-choice]", "click", (_, b) => { const p = view.probs[view.i]; view.sel = +b.dataset.choice; checkAnswer(p.choices[view.sel]); });
  on("[data-speak]", "click", (_, b) => { const p = view.probs[view.i]; speak(b.dataset.speak === "passage" ? view.passage : p.question + (p.type === "choice" ? ". " + p.choices.join(". ") : "")); });
  on("#hint", "click", () => { view.hinted = true; view.fb = { kind: "info", text: "Hint: " + view.probs[view.i].hint }; render(); });
  on("#showstep, #morestep", "click", () => { view.shown = Math.min(view.probs[view.i].steps.length, view.shown + 1); render(); });
  on("#reveal", "click", () => { const p = view.probs[view.i]; view.results[view.i] = { score: 0, given: view.tries.at(-1) || "" }; view.fb = { kind: "reveal", text: "The answer is " + p.answer + ". You'll see one like it again soon." }; render(); });
  const nx = $("#next"); if (nx) { nx.addEventListener("click", finishProblem); nx.focus(); }
  on("#chatform", "submit", (e) => { e.preventDefault(); const t = $("#chatin").value.trim(); if (t && !view.thinking) askPip(t); });
  on("#chatin", "focus", () => (view.chatFocus = true));
  on("#chatin", "blur", () => (view.chatFocus = false));
  on("#pinform", "submit", (e) => { e.preventDefault(); const v = $("#pin").value.trim(); if (!v) return; if (!family.pin) { family.pin = v; save(); view.unlocked = true; } else if (v === family.pin) { view.unlocked = true; view.pinErr = false; } else view.pinErr = true; render(); });
  on("#lock", "click", () => go({ name: "home" }));
  on("[data-pk]", "click", (_, b) => { view.pk = b.dataset.pk; render(); });
  on("[data-psub]", "click", (_, b) => { view.psub = b.dataset.psub; render(); });
  on("[data-focus]", "click", (_, b) => { const k = getKid(view.pk), id = b.dataset.focus; k.focus = (k.focus || []).includes(id) ? k.focus.filter((x) => x !== id) : [...(k.focus || []), id]; save(); render(); });
  on("#report", "click", () => writeReport(getKid(view.pk)));
  on("#toparent", "click", () => go({ name: "parent", unlocked: true, pk: view.pk }));
  on("[data-rename]", "change", (_, i) => { const v = i.value.trim(); if (v) { getKid(i.dataset.rename).name = v; save(); } });
  on("[data-grade]", "change", (_, s) => { const k = getKid(s.dataset.grade); k.grade = s.value; k.focus = []; save(); render(); });
  on("[data-askdel]", "click", (_, b) => { view.confirmDel = b.dataset.askdel; render(); });
  on("[data-nodel]", "click", () => { view.confirmDel = null; render(); });
  on("[data-del]", "click", (_, b) => { const id = b.dataset.del; family.kids = family.kids.filter((k) => k.id !== id); delete family.progress[id]; delete family.stars[id]; family.log = family.log.filter((l) => l.kid !== id); view.confirmDel = null; save(); render(); });
  on("#goal", "change", (_, gl) => { family.goal = Math.max(5, Math.min(50, +gl.value || 10)); save(); render(); });
  on("#newpin", "submit", (e) => { e.preventDefault(); const v = $("#pin2").value.trim(); if (v) { family.pin = v; view.pinSaved = true; save(); render(); } });
  on("#aiform", "submit", async (e) => {
    e.preventDefault();
    const s = ai.loadAi(), key = $("#apikey").value.trim();
    ai.saveAi({ key: key || s.key, model: $("#model").value });
    if (!ai.aiReady()) { view.aiMsg = { ok: false, text: "Paste an API key first." }; render(); return; }
    view.aiMsg = { wait: true, text: "Testing the key…" }; render();
    try { await ai.testKey(); view.aiMsg = { ok: true, text: "Pip is connected and ready." }; }
    catch (err) { view.aiMsg = { ok: false, text: ERR[err.code] || `That didn't work (${err.message || err.code}).` }; }
    if (view.name === "setup") render();
  });
  on("#forgetkey", "click", () => { ai.saveAi({ key: "", model: ai.loadAi().model }); view.aiMsg = { ok: true, text: "Key removed from this device." }; render(); });
  on("#copybackup", "click", async () => { try { await navigator.clipboard.writeText(exportJson()); view.backupMsg = { ok: true, text: "Copied" }; } catch { view.showBackup = true; view.backupMsg = { ok: false, text: "Couldn't copy. Select the text below instead." }; } render(); });
  on("#showbackup", "click", () => { view.showBackup = !view.showBackup; render(); });
  on("#restore", "click", () => { try { importJson($("#restoretext").value); view.backupMsg = { ok: true, text: "Restored" }; } catch { view.backupMsg = { ok: false, text: "That backup text isn't valid." }; } render(); });
  on("#askreset", "click", () => { view.confirmReset = true; render(); });
  on("#noreset", "click", () => { view.confirmReset = false; render(); });
  on("#doreset", "click", () => { resetFamily(); go({ name: "home" }); });
}

render();
if ("serviceWorker" in navigator && import.meta.env.PROD) navigator.serviceWorker.register("./sw.js").catch(() => {});
