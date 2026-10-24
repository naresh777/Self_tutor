import "./style.css";
import { GRADES, SUBJECTS, WEEKS, DAYS, gradeLabel, year, units, topic, isTeks } from "./course.js";
import { dayType, TYPE_LABEL, mastery, sheetPlan, extraPlan, advance, isFinished, pace, monthOf } from "./plan.js";
import { renderVisual } from "./visuals.js";
import { isCorrect, normText } from "./check.js";
import * as ai from "./ai.js";
import { offlineSheet, offlineLesson } from "./offline/index.js";
import { family, save, exportJson, importJson, resetFamily } from "./store.js";

/* ---------------- helpers ---------------- */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const uid = () => Math.random().toString(36).slice(2, 10);
const iso = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dayKey = (t) => iso(new Date(t));
const today = () => iso();
const COLORS = ["#ef6a3a", "#1c9a8c", "#7a5af5", "#d94f8a", "#2f7de1", "#c98a00"];
const SUBJ_IDS = Object.keys(SUBJECTS);
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pct = (c, t) => (t ? Math.round((c / t) * 100) : 0);
const fmtDate = (t) => new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric" });

/* ---------------- kids, course position and progress ---------------- */
const getKid = (id) => family.kids.find((k) => k.id === id);
function course(k) {
  k.course ||= { start: today(), pos: { week: 1, day: 0 } };
  return k.course;
}
const slotKey = (k, pos) => `${k.grade}-${pos.week}-${pos.day}`;
const slotDone = (k, pos) => family.done[k.id]?.[slotKey(k, pos)] || {};
const EMPTY = { recent: [], attempts: 0, correct: 0, last: 0 };
const peekFor = (kidId) => (topicId) => family.progress[kidId]?.[topicId] || EMPTY;
function record(kidId, topicId, score) {
  family.progress[kidId] ??= {};
  const p = (family.progress[kidId][topicId] ??= { ...EMPTY, recent: [] });
  p.recent.push(score); if (p.recent.length > 10) p.recent.shift();
  p.attempts++; if (score >= 1) p.correct++; p.last = Date.now();
}
function status(p) {
  if (!p.attempts) return { k: "new", label: "Not started", cls: "" };
  const m = mastery(p);
  if (m >= 0.85 && p.recent.length >= 8) return { k: "mastered", label: "Mastered", cls: "good" };
  if (m >= 0.6) return { k: "practicing", label: "Getting there", cls: "warn" };
  return { k: "learning", label: p.attempts >= 5 ? "Needs review" : "Learning", cls: p.attempts >= 5 ? "bad" : "" };
}
const kidLog = (kidId) => family.log.filter((l) => l.kid === kidId);
function streak(kidId) {
  const days = new Set(kidLog(kidId).map((l) => dayKey(l.at)));
  const d = new Date(); let n = 0;
  if (!days.has(iso(d))) d.setDate(d.getDate() - 1);
  while (days.has(iso(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
const needsReview = (k) => SUBJ_IDS.flatMap((s) => year(s, k.grade).filter((t) => t.week <= course(k).pos.week && status(peekFor(k.id)(t.id)).k === "learning" && peekFor(k.id)(t.id).attempts >= 5));
const testsFor = (k, kind) => kidLog(k.id).filter((l) => l.kind === kind && l.grade === k.grade);

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

/* ---------------- shell ---------------- */
let view = { name: "home" };
function go(v) { view = v; render(); window.scrollTo({ top: 0 }); }
const owl = (size = 44, cls = "") => `<svg class="pip ${cls}" style="width:${size}px;height:${size}px" viewBox="0 0 64 64" aria-hidden="true"><use href="#owl"/></svg>`;
const avatar = (k, sm) => `<span class="av ${sm ? "sm" : ""}" style="background:${k.color}">${esc((k.name || "?").trim()[0]?.toUpperCase() || "?")}</span>`;
const header = (right = "") => `<div class="top"><button class="brand" data-go="home" aria-label="Pip Tutor home">${owl(46)}<span><b>Pip Tutor</b><small>Math and English for our family</small></span></button><div class="row">${right}</div></div>`;
// A grade whose every weekly topic has built-in lessons and problems works with no key and no internet.
const builtIn = (grade) => SUBJ_IDS.every((s) => year(s, grade).every((t) => t.op));
const aiBanner = (parent, grades = family.kids.map((k) => k.grade)) => {
  if (ai.aiReady() || !grades.length) return "";
  if (grades.every(builtIn)) return parent ? `<div class="banner">The built-in course is on, so everything works offline. Add a Claude API key in Family settings to also turn on the "Ask Pip" tutor chat, progress notes and fresh new problems.</div>` : "";
  return `<div class="banner">${parent ? "Some grades still need a Claude API key for Pip's lessons, worksheets, quizzes and tests. Add one in Family settings." : "Some of Pip's lessons need a grown-up to add a Claude key in the Parent corner. Number-fact practice still works."}</div>`;
};
const subjectTabs = (cur, attr) => `<div class="subjects" role="tablist">${SUBJ_IDS.map((id) => `<button class="subj ${id === cur ? "on" : ""}" ${attr}="${id}" role="tab" aria-selected="${id === cur}">${SUBJECTS[id].name}</button>`).join("")}</div>`;
const typePill = (type) => `<span class="pill type-${type}">${TYPE_LABEL[type]}</span>`;

function render() {
  const v = view.name;
  $("#app").innerHTML = v === "kid" ? kidView() : v === "sheet" ? sheetView() : v === "parent" ? parentView() : v === "setup" ? setupView() : homeView();
  bind();
}

/* ---------------- home ---------------- */
function homeView() {
  const kids = family.kids;
  const right = `<button class="btn ghost" data-go="parent">Parent corner</button>`;
  if (!kids.length)
    return header(right) + `<div class="card"><div class="row">${owl(72, "bob")}<div><h1>Hoot! I'm Pip.</h1><p class="muted">I teach a full school year of math and English: a short lesson or practice every school day, a quiz every Friday and a test at the end of each month.</p></div></div>
    <h2>Set up your family</h2><p>Add each child with their grade this school year. Then open the Parent corner to add your Claude API key and choose where in the year to start.</p>${addKidForm()}</div>`;
  return header(right) + aiBanner(false) + `<div class="card"><h1>Who's learning today?</h1>
  <div class="kids">${kids.map((k) => { const c = course(k), s = streak(k.id), doneToday = c.lastDayDone === today(); return `<button class="kid" data-kid="${k.id}">${avatar(k)}<b>${esc(k.name)}</b><span class="muted small">${gradeLabel(k.grade)} · ${isFinished(c.pos) ? "Year complete" : `Week ${c.pos.week}`}</span><span class="row" style="justify-content:center"><span class="pill ${doneToday ? "good" : ""}">${doneToday ? "Today's work done" : "Today's work ready"}</span>${s ? `<span class="pill warn">${s}-day streak</span>` : ""}</span></button>`; }).join("")}</div></div>`;
}
const addKidForm = () => `<form id="addkid" class="row" style="align-items:flex-end">
  <label class="f" style="flex:1 1 180px">Child's first name<input type="text" id="kidname" maxlength="24" required placeholder="e.g. Maya" autocomplete="off"></label>
  <label class="f">Grade this school year<select id="kidgrade">${GRADES.map((g) => `<option value="${g}" ${g === "2" ? "selected" : ""}>${gradeLabel(g)}</option>`).join("")}</select></label>
  <button class="btn primary" type="submit">Add child</button></form>`;

/* ---------------- kid dashboard ---------------- */
function kidView() {
  const k = getKid(view.kid); if (!k) return homeView();
  const c = course(k), pos = c.pos;
  const subject = (view.subject ||= "math");
  const st = streak(k.id), stars = family.stars[k.id] || 0;
  let today_;
  if (isFinished(pos)) {
    today_ = `<div class="row">${owl(56, "bob")}<div><h2>You finished the whole year!</h2><p class="muted">Amazing work. Keep your skills sharp with extra practice from your course map.</p></div></div>`;
  } else if (c.lastDayDone === today() && !view.ahead) {
    today_ = `<div class="row">${owl(56, "bob")}<div><h2>All done for today!</h2><p class="muted">Great job. Come back tomorrow for ${DAYS[pos.day]}'s work in week ${pos.week}.</p></div></div>
    <div class="row"><button class="btn" id="ahead">Start the next day early</button></div>`;
  } else {
    const done = slotDone(k, pos);
    const type = dayType(pos.week, pos.day);
    today_ = `<div class="row spread"><h2>Week ${pos.week} · ${DAYS[pos.day]}</h2>${typePill(type)}</div>
    <div class="tasks">${SUBJ_IDS.map((s) => {
      const t = year(s, k.grade)[pos.week - 1], d = done[s];
      const what = type === "test" ? `Month ${monthOf(t.week)} test: weeks ${t.week - 3} to ${t.week}` : t.name;
      return `<div class="task ${d ? "done" : ""}"><span class="dot" style="background:${SUBJECTS[s].color}"></span><div class="tmain"><b>${SUBJECTS[s].name}</b><span>${esc(what)}</span></div>${d ? `<span class="pill good">Done · ${d.score}%</span>` : `<button class="btn primary" data-today="${s}">${type === "learn" ? "Learn" : type === "practice" ? "Practice" : "Start " + (type === "test" ? "test" : "quiz")}</button>`}</div>`;
    }).join("")}</div>
    ${type === "quiz" || type === "test" ? `<p class="small muted">${type === "test" ? "Monthly test: show what you learned this unit. No hints this time, just do your best!" : "Friday quiz: a quick check on this week. No hints, just do your best!"}</p>` : ""}`;
  }
  return header(`<button class="btn ghost" data-go="home">Switch kid</button>`) + aiBanner(false, [k.grade]) + `
  <div class="card"><div class="row spread"><div class="row">${avatar(k)}<div><h1>Hi, ${esc(k.name)}!</h1><p class="muted">${gradeLabel(k.grade)} · ${isFinished(pos) ? "year complete" : `week ${pos.week} of ${WEEKS}`}</p></div></div>
  <div class="row"><span class="stars">★ ${stars} stars</span>${st ? `<span class="pill warn">${st}-day streak</span>` : ""}</div></div>
  <div class="goalbar" role="progressbar" aria-label="Year progress" aria-valuenow="${Math.min(100, pct(pos.week - 1, WEEKS))}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.min(100, pct((pos.week - 1) * 5 + pos.day, WEEKS * 5))}%"></i></div>
  ${today_}</div>
  <div class="card"><div class="row spread"><h2>My course map</h2><span class="muted small">Tap a week you've reached for extra practice</span></div>
  ${subjectTabs(subject, "data-subject")}${courseMap(k, subject, false)}</div>`;
}

function courseMap(k, subject, parent) {
  const pos = course(k).pos, peek = peekFor(k.id);
  const tests = testsFor(k, "test").filter((l) => l.subject === subject);
  return `<div class="units">${units(subject, k.grade).map((u) => {
    const test = tests.filter((l) => u.topics.some((t) => t.week === l.week)).at(-1);
    const current = u.topics.some((t) => t.week === pos.week);
    const reached = u.topics[0].week <= pos.week;
    return `<details class="unit ${reached ? "" : "later"}" ${current ? "open" : ""}><summary><span class="ut">Unit ${u.unit}: ${esc(u.title)}</span>${test ? `<span class="pill ${test.correct / test.total >= 0.8 ? "good" : test.correct / test.total >= 0.6 ? "warn" : "bad"}">Test ${pct(test.correct, test.total)}%</span>` : current ? `<span class="pill focus">Now</span>` : ""}</summary>
    <div class="weeks">${u.topics.map((t) => {
      const p = peek(t.id), st = status(p), here = t.week === pos.week, open = t.week <= pos.week;
      const tag = here ? `<span class="pill focus">This week</span>` : p.attempts ? `<span class="pill ${st.cls}">${st.label}${st.k !== "new" ? " · " + Math.round(mastery(p) * 100) + "%" : ""}</span>` : open ? "" : `<span class="pill">Week ${t.week}</span>`;
      const inner = `<span class="wk">W${t.week}</span><span class="nm">${esc(t.name)}${t.bridge ? ` <span class="small muted">(${gradeLabel(t.grade)} preview)</span>` : ""}${parent && t.teks ? ` <span class="small muted">TEKS ${esc(t.teks)}</span>` : ""}</span>${tag}`;
      return open && !parent ? `<button class="week" data-extra="${t.id}">${inner}</button>` : `<div class="week ${open ? "" : "later"}">${inner}${parent && p.attempts ? `<span class="small muted wkd">${p.correct}/${p.attempts} right overall</span>` : ""}</div>`;
    }).join("")}</div></details>`;
  }).join("")}</div>`;
}

/* ---------------- worksheets, quizzes and tests ---------------- */
const isCheck = (kind) => kind === "quiz" || kind === "test";

async function startSheet(kidId, subject, kind, slot, topicId) {
  const k = getKid(kidId), peek = peekFor(kidId);
  const plan = kind === "extra" ? extraPlan(topic(topicId), peek) : sheetPlan(subject, k.grade, slot.week, slot.day, peek);
  const main = plan.items[0].topic;
  view = { name: "sheet", kid: kidId, subject, kind: plan.type, slot, topicId: main.id, unit: main.unit, state: "loading", phase: plan.type === "learn" ? "lesson" : "q", i: 0, results: [], started: Date.now(), probs: [], tries: [], chat: [], shown: 0, fb: null, sel: null, offline: false };
  render();
  const myView = view;
  const misses = kidLog(kidId).filter((l) => plan.items.some((it) => (l.byTopic || {})[it.topic.id])).flatMap((l) => l.misses || []).slice(-4).map((m) => m.q);
  try {
    if (!ai.useClaude()) throw { code: "no_key" };
    const lessonP = plan.type === "learn" ? (family.lessons[main.id] ? Promise.resolve(family.lessons[main.id]) : ai.makeLesson(main)) : null;
    const [probs, lesson] = await Promise.all([ai.makeSheet(subject, k.grade, plan.type, plan.items, misses), lessonP]);
    if (view !== myView) return;
    if (lesson) { family.lessons[main.id] = lesson; save(); }
    Object.assign(view, { probs, lesson, state: "ready" });
  } catch (e) {
    if (view !== myView) return;
    // The built-in course: problems made on the device, and a written lesson (or one Pip wrote earlier).
    const local = offlineSheet(plan.items, k.grade);
    const lesson = plan.type === "learn" ? family.lessons[main.id] || offlineLesson(main) : null;
    if (local.length) Object.assign(view, { probs: local, offline: true, state: "ready", phase: lesson ? "lesson" : "q", lesson });
    else Object.assign(view, { state: "error", err: e?.code });
  }
  render();
}

const ERR = {
  no_key: "This needs Pip's AI help. A grown-up can add a Claude API key in the Parent corner.",
  bad_key: "The Claude API key wasn't accepted. A grown-up can check it in Family settings.",
  billing: "The Claude account is out of credit. A grown-up can add credit in the Claude Console.",
  rate_limited: "Pip is a little busy. Wait a minute and try again.",
  offline: "Pip can't reach the internet right now. Check the Wi-Fi and try again.",
};

function sheetView() {
  const k = getKid(view.kid), main = topic(view.topicId);
  const head = header(`<button class="btn ghost" id="quit">${isCheck(view.kind) ? "Stop for now" : "End practice"}</button>`);
  const title = view.kind === "test" ? `Month ${monthOf(main.week)} test: weeks ${main.week - 3} to ${main.week}` : main.name;
  const label = `${SUBJECTS[view.subject].name} · ${TYPE_LABEL[view.kind]}`;
  if (view.state === "loading")
    return head + `<div class="card"><div class="loader">${owl(64, "bob")}<div><h2>${view.kind === "learn" ? "Pip is getting today's lesson ready…" : view.kind === "test" ? "Pip is writing your test…" : view.kind === "quiz" ? "Pip is writing your quiz…" : "Pip is writing your worksheet…"}</h2><p class="muted">${label} · ${esc(title)}. This can take up to a minute${view.kind === "test" ? " or two" : ""}.</p></div></div></div>`;
  if (view.state === "error")
    return head + `<div class="card"><div class="row">${owl(56)}<div><h2>Oops, not ready yet</h2><p>${ERR[view.err] || "Pip couldn't get this ready. Please try again."}</p></div></div><div class="row"><button class="btn primary" id="retry">Try again</button><button class="btn" data-kid="${k.id}">Back</button></div></div>`;
  if (view.state === "done") return head + doneHtml(k, main);
  if (view.phase === "lesson") return head + lessonHtml(main, view.lesson);

  const p = view.probs[view.i], n = view.probs.length, check = isCheck(view.kind);
  const dots = view.probs.map((_, j) => { const r = view.results[j]; return `<span class="${r ? (check ? "on" : r.score >= 1 ? "ok" : r.score > 0 ? "on" : "no") : j === view.i ? "cur" : ""}"></span>`; }).join("");
  const answered = view.fb && (view.fb.kind === "good" || view.fb.kind === "reveal");
  const lock = answered || view.checking;
  const input = p.type === "choice"
    ? `<div class="choices" role="group" aria-label="Choices">${p.choices.map((c, j) => `<button class="choice ${view.sel === j ? "sel" : ""}" data-choice="${j}" ${lock ? "disabled" : ""}>${esc(c)}</button>`).join("")}</div>`
    : `<form class="ans" id="ansform"><input id="ans" type="text" inputmode="${p.type === "number" ? "decimal" : "text"}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Your answer" ${lock ? "disabled" : ""}><button class="btn primary" type="submit" ${lock ? "disabled" : ""}>${view.checking ? "Checking…" : check ? "Save answer" : "Check"}</button></form>`;
  const steps = view.shown ? `<div><h3>Step by step</h3>${renderVisual(p.visual)}<ol class="steps">${p.steps.slice(0, view.shown).map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol>${view.shown < p.steps.length ? `<button class="btn" id="morestep" style="margin-top:8px">Show next step</button>` : ""}</div>` : "";
  const fb = view.fb ? `<div class="fb ${view.fb.kind === "good" ? "good" : view.fb.kind === "bad" ? "bad" : "info"}" role="status">${esc(view.fb.text)}</div>` : "";
  const help = answered
    ? `<button class="btn primary big" id="next">${view.i + 1 < n ? "Next problem" : "See my results"}</button>`
    : check ? "" : `<div class="row">${view.tries.length ? `<button class="btn" id="hint">Get a hint</button>` : ""}${view.shown ? "" : `<button class="btn" id="showstep">Show me how</button>`}${view.shown >= p.steps.length ? `<button class="btn ghost" id="reveal">I see it, show the answer</button>` : ""}</div>`;
  const side = check
    ? `<div class="card"><div class="row">${owl(36)}<h3>${view.kind === "test" ? "Test time" : "Quiz time"}</h3></div><p class="muted">Read each question carefully and take your time. You'll see what you got right, and how to solve the rest, at the end.</p><p class="small muted">${view.results.filter(Boolean).length} of ${n} answered</p></div>`
    : ai.aiReady()
      ? `<div class="card"><div class="row">${owl(36)}<h3>Ask Pip</h3></div>
    <div class="chat" id="chat">${view.chat.length ? "" : `<div class="msg pipm">Stuck? Tell me what you're thinking, or ask me a question about this problem.</div>`}${view.chat.map((m) => `<div class="msg ${m.role === "user" ? "kidm" : "pipm"}">${esc(m.content)}</div>`).join("")}${view.thinking ? `<div class="msg pipm">Pip is thinking…</div>` : ""}</div>
    <form class="chatform" id="chatform"><input type="text" id="chatin" maxlength="300" placeholder="Type to Pip" aria-label="Message to Pip" ${view.thinking ? "disabled" : ""}><button class="btn" type="submit" ${view.thinking ? "disabled" : ""}>Send</button></form></div>`
      : `<div class="card"><div class="row">${owl(36)}<h3>Pip's tips</h3></div><p class="muted">Read the problem out loud. Draw a picture or use your fingers. Then check your answer by doing it a second way.</p></div>`;
  const passage = p.passage ? `<div><div class="row spread"><h3>Read this first</h3>${speakBtn("passage", "Read the passage aloud")}</div><div class="passage">${esc(p.passage)}</div></div>` : "";
  const t = topic(p.topicId);
  return head + `<div class="prac"><div class="card">
    <div class="row spread"><span class="pill">${label}</span><div class="dots" aria-label="Problem ${view.i + 1} of ${n}">${dots}</div></div>
    ${passage}
    <p class="small muted">Problem ${view.i + 1} of ${n} · ${esc(t?.name || "")}${t && t.id !== view.topicId && !isCheck(view.kind) ? " (review)" : ""}${view.offline ? " · built-in sheet" : ""}</p>
    <div class="qrow"><div class="q">${esc(p.question)}</div>${speakBtn("question", "Read the question aloud")}</div>${renderVisual(p.picture)}${input}${fb}${steps}${help}</div>${side}</div>`;
}

function lessonHtml(t, L) {
  return `<div class="card lesson"><div class="row spread"><span class="pill">${SUBJECTS[t.subject].name} · New lesson · Week ${t.week}${t.teks ? ` · TEKS ${esc(t.teks)}` : ""}</span>${speakBtn("lesson", "Read the lesson aloud")}</div>
  <div class="row">${owl(56)}<h1>${esc(L.title)}</h1></div>
  <p class="lead">${esc(L.intro)}</p>
  <ul class="points">${L.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
  ${L.example ? `<div><h3>Let's try one together</h3><div class="q" style="font-size:1.25rem">${esc(L.example.problem)}</div>${renderVisual(L.example.visual)}<ol class="steps" style="margin-top:10px">${L.example.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>` : ""}
  ${L.tip ? `<div class="fb info">Pip's tip: ${esc(L.tip)}</div>` : ""}
  <div class="row"><button class="btn primary big" id="topractice">I'm ready to practice</button></div></div>`;
}

async function checkAnswer(given) {
  const p = view.probs[view.i];
  if (!String(given).trim() || view.checking) return;
  view.tries.push(String(given));
  let ok = isCorrect(given, p);
  // A typed word answer that doesn't match exactly gets a second look from Claude.
  if (!ok && p.type === "text" && ai.aiReady() && !view.offline && normText(given).length > 1) {
    view.checking = true; render();
    const myView = view, myI = view.i;
    try { ok = await ai.judgeAnswer(topic(p.topicId), p, given); } catch { ok = false; }
    view.checking = false;
    if (view !== myView || view.i !== myI) return;
  }
  if (isCheck(view.kind)) {
    // Quizzes and tests: one try, no feedback until the end.
    view.results[view.i] = { score: ok ? 1 : 0, given };
    finishProblem();
    return;
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
  record(view.kid, p.topicId, r.score);
  family.stars[view.kid] = (family.stars[view.kid] || 0) + (r.score >= 1 ? 2 : r.score > 0 ? 1 : 0);
  save();
  if (view.i + 1 < view.probs.length) {
    Object.assign(view, { i: view.i + 1, tries: [], chat: [], shown: 0, fb: null, sel: null, hinted: false });
    render(); setTimeout(() => $("#ans")?.focus(), 0);
    return;
  }
  finishSheet();
}

function finishSheet() {
  const k = getKid(view.kid), res = view.results;
  const byTopic = {};
  view.probs.forEach((p, j) => { const b = (byTopic[p.topicId] ||= [0, 0]); b[1]++; if (res[j].score >= 1) b[0]++; });
  const correct = res.filter((x) => x.score >= 1).length;
  family.log.push({
    kid: view.kid, grade: k.grade, subject: view.subject, kind: view.kind, topic: view.topicId, unit: view.unit,
    week: view.slot?.week, day: view.slot?.day, month: view.slot ? monthOf(view.slot.week) : undefined, at: Date.now(), total: res.length, correct, byTopic,
    mins: Math.max(1, Math.round((Date.now() - view.started) / 60000)),
    misses: view.probs.map((p, j) => ({ q: p.question, a: p.answer, g: res[j].given, t: p.topicId })).filter((_, j) => res[j].score < 1),
  });
  if (family.log.length > 1500) family.log = family.log.slice(-1500);
  if (view.slot) {
    const c = course(k), key = slotKey(k, view.slot);
    family.done[k.id] ??= {};
    const d = (family.done[k.id][key] ||= {});
    d[view.subject] = { score: pct(correct, res.length), at: Date.now() };
    // Both subjects done: the course day is complete, move to the next one.
    if (SUBJ_IDS.every((s) => d[s]) && c.pos.week === view.slot.week && c.pos.day === view.slot.day) {
      c.pos = advance(c.pos);
      c.lastDayDone = today();
      family.stars[k.id] = (family.stars[k.id] || 0) + 5;
      view.dayComplete = true;
    }
  }
  save();
  view.state = "done"; render();
}

function doneHtml(k, main) {
  const res = view.results, n = res.length, c = res.filter((r) => r.score >= 1).length, score = pct(c, n);
  const check = isCheck(view.kind);
  const conf = Array.from({ length: 14 }, (_, i) => `<span style="background:${COLORS[i % COLORS.length]};--r:${rnd(-40, 40)}deg"></span>`).join("");
  const heading = check
    ? score >= 90 ? "Outstanding!" : score >= 80 ? "Great job!" : score >= 60 ? "Good effort!" : "Thanks for trying your best!"
    : c === n ? "A perfect sheet!" : c >= n - 1 ? "Great work!" : c >= n / 2 ? "Nice effort!" : "You kept going, that's how we learn!";
  const other = SUBJ_IDS.find((s) => s !== view.subject);
  const otherLeft = view.slot && !view.dayComplete && !slotDone(k, view.slot)[other];
  const review = view.probs.map((p, j) => ({ p, r: res[j] })).filter((x) => x.r.score < 1);
  const topics = check ? Object.entries(family.log.at(-1).byTopic).map(([id, [a, b]]) => `<span class="pill ${a / b >= 0.8 ? "good" : a / b >= 0.6 ? "warn" : "bad"}">${esc(topic(id)?.name)}: ${a}/${b}</span>`).join("") : "";
  return `<div class="card"><div class="confetti" aria-hidden="true">${conf}</div><div class="row">${owl(64, "bob")}<div><h1>${heading}</h1>
  <p>${esc(k.name)} got <b>${c} of ${n}</b> right${check ? ` (${score}%) on the ${TYPE_LABEL[view.kind].toLowerCase()}` : " on the first go"}.</p></div></div>
  ${view.dayComplete ? `<div class="fb good">That's all of today's work! +5 bonus stars.</div>` : ""}
  ${topics ? `<div class="row">${topics}</div>` : ""}
  ${review.length ? `<details ${check ? "open" : ""}><summary>${check ? "Let's look at the ones you missed" : "Problems to look at again"}</summary><div class="review">${review.map(({ p, r }) => `<div class="rv"><p><b>${esc(p.question)}</b></p>${renderVisual(p.picture)}<p class="small">You answered: ${esc(r.given || "(no answer)")} · Answer: <b>${esc(p.answer)}</b></p>${renderVisual(p.visual)}<ol class="steps">${p.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>`).join("")}</div></details>` : ""}
  <div class="row">${otherLeft ? `<button class="btn primary big" data-today="${other}">Now ${SUBJECTS[other].name}</button>` : ""}${view.kind === "extra" ? `<button class="btn primary big" data-extra="${view.topicId}">Another sheet</button>` : ""}<button class="btn ${otherLeft || view.kind === "extra" ? "" : "primary big"}" data-kid="${k.id}" data-ksub="${view.subject}">Back to my page</button></div></div>`;
}

async function askPip(text) {
  const k = getKid(view.kid), p = view.probs[view.i];
  view.chat.push({ role: "user", content: text }); view.thinking = true; view.hinted = true; render(); scrollChat();
  const system = ai.tutorSystem(k, topic(p.topicId), p, view.tries);
  const msg = { role: "assistant", content: "" }; let added = false; const myView = view, myI = view.i;
  const here = () => view === myView && view.i === myI;
  const onText = (t) => {
    if (!here()) return;
    msg.content = t;
    if (!added) { view.chat.push(msg); added = true; view.thinking = false; render(); }
    else { const el = $("#chat"); if (el?.lastElementChild) el.lastElementChild.textContent = t; }
    scrollChat();
  };
  try {
    const t = await ai.tutorReply(system, view.chat.slice(-12).filter((m) => m !== msg), onText);
    msg.content = t; if (!added && here()) view.chat.push(msg);
  } catch (e) {
    if (here()) {
      if (added) view.chat.pop();
      view.chat.push({ role: "assistant", content: e.code === "rate_limited" ? "I'm a bit busy. Try again in a minute!" : e.code === "offline" ? "I can't reach the internet right now." : "Hmm, my feathers got ruffled. Try asking again." });
    }
  }
  view.thinking = false;
  if (here()) { render(); scrollChat(); $("#chatin")?.focus(); }
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
  const c = course(kid), pos = c.pos, pc = pace(c);
  const subject = (view.psub ||= "math");
  const week = Date.now() - 7 * 864e5, L = kidLog(kid.id), LW = L.filter((l) => l.at >= week);
  const sum = (arr, f) => arr.reduce((a, l) => a + (l[f] || 0), 0);
  const probs = sum(LW, "total"), corr = sum(LW, "correct"), mins = sum(LW, "mins");
  const days = new Set(LW.map((l) => dayKey(l.at))).size;
  const tests = testsFor(kid, "test"), quizzes = testsFor(kid, "quiz");
  const scoreCell = (l) => (l ? `<span class="pill ${l.correct / l.total >= 0.8 ? "good" : l.correct / l.total >= 0.6 ? "warn" : "bad"}">${pct(l.correct, l.total)}%</span> <span class="small muted">${fmtDate(l.at)}</span>` : `<span class="muted small">–</span>`);
  const testMonths = [...new Set(tests.filter((l) => l.week).map((l) => monthOf(l.week)))].sort((a, b) => a - b);
  const bridge = year("math", kid.grade).filter((t) => t.bridge);
  const quizWeeks = [...new Set(quizzes.map((l) => l.week))].sort((a, b) => b - a).slice(0, 8);
  const review = needsReview(kid);
  return header(right) + aiBanner(true) + `
  <div class="tabs" role="tablist">${kids.map((k) => `<button class="tab ${k.id === kid.id ? "on" : ""}" data-pk="${k.id}" role="tab" aria-selected="${k.id === kid.id}">${avatar(k, true)}${esc(k.name)}</button>`).join("")}</div>
  <div class="card"><div class="row spread"><h2>${esc(kid.name)}'s ${gradeLabel(kid.grade)} year</h2>${isFinished(pos) ? `<span class="pill good">Year complete</span>` : `<span class="pill ${pc.cls}">${pc.label}</span>`}</div>
  <p>${isFinished(pos) ? "Every week of the course is done." : `Now on <b>week ${pos.week} of ${WEEKS}</b>, ${DAYS[pos.day]}: Math "${esc(year("math", kid.grade)[pos.week - 1].name)}" and English "${esc(year("english", kid.grade)[pos.week - 1].name)}".`} Course started ${fmtDate(c.start + "T00:00:00")}. ${kid.grade === "8" ? "The last weeks review the whole year" : bridge.length ? `Weeks ${bridge[0].week} to ${WEEKS} of math get ready for ${gradeLabel(bridge[0].grade)}` : ""}.${isTeks("math", kid.grade) ? ` Math and English follow the Texas TEKS in the order Frisco ISD teaches them.` : ""}</p>
  <div class="goalbar"><i style="width:${Math.min(100, pct((pos.week - 1) * 5 + pos.day, WEEKS * 5))}%"></i></div>
  <div class="stats">
    <div class="stat"><div class="n">${days}/7</div><div class="l">Days practiced this week</div></div>
    <div class="stat"><div class="n">${probs}</div><div class="l">Problems this week</div></div>
    <div class="stat"><div class="n">${probs ? pct(corr, probs) + "%" : "–"}</div><div class="l">First-try accuracy</div></div>
    <div class="stat"><div class="n">${mins}</div><div class="l">Minutes this week</div></div>
  </div>
  ${review.length ? `<div class="fb info">Needs review: ${review.map((t) => `${SUBJECTS[t.subject].name}: ${esc(t.name)}`).join(", ")}. Pip already mixes these into upcoming sheets; sitting with ${esc(kid.name)} for one extra practice can help too.</div>` : ""}
  <div class="row spread"><h3>Progress note from Pip</h3>${ai.aiReady() ? `<button class="btn" id="report" ${view.reporting ? "disabled" : ""}>${view.reporting ? "Writing…" : "Write a progress note"}</button>` : ""}</div>
  ${view.report && view.report.kid === kid.id ? `<div class="note">${esc(view.report.text)}</div>` : `<p class="muted small">${ai.aiReady() ? "Pip reads the course progress, test scores and missed problems, and writes a short summary with what to do next." : "Available once your Claude API key is added."}</p>`}
  </div>
  <div class="card"><h2>Monthly tests</h2>${testMonths.length ? `<div class="tablewrap"><table><thead><tr><th>Month</th>${SUBJ_IDS.map((s) => `<th>${SUBJECTS[s].name}</th>`).join("")}</tr></thead><tbody>${testMonths.map((m) => `<tr><td>Month ${m} <span class="small muted">(weeks ${m * 4 - 3} to ${m * 4})</span></td>${SUBJ_IDS.map((s) => `<td>${scoreCell(tests.filter((l) => l.week && monthOf(l.week) === m && l.subject === s).at(-1))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : `<p class="muted">The first monthly test comes at the end of week 4. Each test covers the last four weeks, and scores for every month show up here.</p>`}
  <h3>Weekly quizzes</h3>${quizWeeks.length ? `<div class="tablewrap"><table><thead><tr><th>Week</th>${SUBJ_IDS.map((s) => `<th>${SUBJECTS[s].name}</th>`).join("")}</tr></thead><tbody>${quizWeeks.map((w) => `<tr><td>Week ${w}</td>${SUBJ_IDS.map((s) => `<td>${scoreCell(quizzes.filter((l) => l.week === w && l.subject === s).at(-1))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : `<p class="muted small">Friday quizzes show up here.</p>`}</div>
  <div class="card"><div class="row spread"><h2>Course map</h2><span class="muted small">How each week's topic is going</span></div>${subjectTabs(subject, "data-psub")}${courseMap(kid, subject, true)}</div>
  <div class="card"><h2>Course settings for ${esc(kid.name)}</h2>
  <p class="muted small">Pace compares finished school days (Monday to Friday) with the days since the course start date. If ${esc(kid.name)} started school before using Pip, set the start date to the first day of school and move to the week that matches what the class is doing now.</p>
  <form id="courseform" class="row" style="align-items:flex-end">
    <label class="f">Course start date<input type="date" id="cstart" value="${esc(c.start)}"></label>
    <label class="f">Current week<select id="cweek">${Array.from({ length: WEEKS }, (_, i) => i + 1).map((w) => `<option value="${w}" ${w === Math.min(pos.week, WEEKS) ? "selected" : ""}>Week ${w}: ${esc(year("math", kid.grade)[w - 1].name)}</option>`).join("")}</select></label>
    <button class="btn" type="submit">Save</button>${view.courseSaved ? `<span class="pill good">Saved</span>` : ""}
  </form>
  <p class="small muted">Changing the week starts that week from Monday. Earlier weeks are treated as already covered, and their topics still come back in review.</p></div>
  <div class="card"><h2>Recent activity</h2>${L.length ? `<div class="tablewrap"><table><thead><tr><th>When</th><th>What</th><th>Score</th><th>Missed</th></tr></thead><tbody>
  ${L.slice(-30).reverse().map((l) => `<tr><td class="num">${fmtDate(l.at)} ${new Date(l.at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</td><td>${SUBJECTS[l.subject]?.name || ""} · ${TYPE_LABEL[l.kind] || ""}${l.week ? ` · W${l.week}` : ""}<br><span class="small muted">${esc(l.kind === "test" ? "Unit " + l.unit : topic(l.topic)?.name || "")}</span></td><td class="num">${l.correct}/${l.total}</td><td>${(l.misses || []).length ? `<details><summary class="small">${l.misses.length} problem${l.misses.length > 1 ? "s" : ""}</summary>${l.misses.map((m) => `<p class="small" style="margin-top:6px">${esc(m.q)}<br><span class="muted">Answered ${esc(m.g || "(no answer)")} · correct ${esc(m.a)}</span></p>`).join("")}</details>` : `<span class="muted small">None</span>`}</td></tr>`).join("")}
  </tbody></table></div>` : `<p class="muted">No work yet. Each lesson, practice sheet, quiz and test shows up here with any missed problems.</p>`}</div>`;
}

async function writeReport(kid) {
  view.reporting = true; render();
  const c = course(kid), pos = c.pos, peek = peekFor(kid.id);
  const lines = SUBJ_IDS.map((s) => `${SUBJECTS[s].name} (weeks so far):\n` + year(s, kid.grade).filter((t) => t.week <= pos.week).map((t) => { const p = peek(t.id); return `- Week ${t.week}, ${t.name}: ${p.attempts ? `${status(p).label}, ${Math.round(mastery(p) * 100)}% on last ${p.recent.length}` : "no practice yet"}`; }).join("\n")).join("\n\n");
  const checks = kidLog(kid.id).filter((l) => isCheck(l.kind)).slice(-12).map((l) => `- ${new Date(l.at).toDateString()}: ${SUBJECTS[l.subject].name} ${TYPE_LABEL[l.kind].toLowerCase()}${l.kind === "test" ? " for unit " + l.unit : " for week " + l.week}: ${l.correct}/${l.total}${(l.misses || []).length ? "; missed: " + l.misses.slice(0, 5).map((m) => `"${m.q}" (answered ${m.g || "nothing"}, correct ${m.a})`).join("; ") : ""}`).join("\n");
  const prompt = `Write a short progress note for a parent about their child's school-year course in math and English. Child: ${kid.name}, ${gradeLabel(kid.grade)}. The course is 36 weeks; the child is on week ${pos.week}, and pacing is: ${pace(c).label}.${isTeks("math", kid.grade) ? " The course follows the Texas TEKS in Frisco ISD's order, so mention TEKS skills where they help." : ""}

Topic progress:
${lines}

Recent weekly quizzes and monthly tests:
${checks || "none yet"}

Write 3 short paragraphs in plain text (no markdown, no headings): 1) how the year is going (pace, consistency, quiz and test results in each subject), 2) strengths and any misconceptions you can see in the missed answers, 3) two or three concrete things the parent can do in the next two weeks, including which topics to revisit and one quick off-screen activity. Be warm, specific and honest. Under 220 words.`;
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
  <p class="small muted">Changing a child's grade starts that grade's course at week 1. Past scores are kept.</p>
  ${addKidForm()}
  </div>
  <div class="card"><h2>Pip's brain (Claude)</h2>
  <p class="muted small">Kindergarten through Grade 3 have a built-in course that works with no key and no internet. With a Claude key, Pip also chats with your child, writes progress notes and makes fresh lessons and problems. Create an API key at <code>console.anthropic.com</code> → API keys, and set a monthly spend limit there. The key is saved only on this device and is sent only to Anthropic.</p>
  <form id="aiform" class="row" style="align-items:flex-end">
    <label class="f" style="flex:1 1 260px">API key<input type="password" id="apikey" autocomplete="off" placeholder="${s.key ? "Saved (" + esc(s.key.slice(0, 10)) + "…). Paste to replace" : "sk-ant-…"}"></label>
    <label class="f">Model<select id="model">${ai.MODELS.map((m) => `<option value="${m.id}" ${m.id === s.model ? "selected" : ""}>${m.label}</option>`).join("")}</select></label>
    <label class="f">Lessons and sheets<select id="source"><option value="claude" ${s.source !== "builtin" ? "selected" : ""}>Fresh from Claude, built-in when offline</option><option value="builtin" ${s.source === "builtin" ? "selected" : ""}>Built-in course only (free; chat still uses Claude)</option></select></label>
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
function startToday(subject) {
  const k = getKid(view.kid), pos = { ...course(k).pos };
  startSheet(k.id, subject, dayType(pos.week, pos.day), pos);
}
function bind() {
  on("[data-go]", "click", (_, b) => { const g = b.dataset.go; go({ name: g, unlocked: (g === "parent" || g === "setup") && view.unlocked, pk: view.pk }); });
  on("[data-kid]", "click", (_, b) => go({ name: "kid", kid: b.dataset.kid, subject: b.dataset.ksub || view.subject }));
  on("[data-subject]", "click", (_, b) => { view.subject = b.dataset.subject; render(); });
  on("[data-today]", "click", (_, b) => startToday(b.dataset.today));
  on("[data-extra]", "click", (_, b) => { const t = topic(b.dataset.extra); startSheet(view.kid, t.subject, "extra", null, t.id); });
  on("#ahead", "click", () => { view.ahead = true; render(); });
  on("#addkid", "submit", (e) => { e.preventDefault(); const name = $("#kidname").value.trim(); if (!name) return; family.kids.push({ id: uid(), name, grade: $("#kidgrade").value, color: COLORS[family.kids.length % COLORS.length], course: { start: today(), pos: { week: 1, day: 0 } } }); save(); render(); });
  on("#quit", "click", () => go({ name: "kid", kid: view.kid, subject: view.subject }));
  on("#retry", "click", () => (view.kind === "extra" ? startSheet(view.kid, view.subject, "extra", null, view.topicId) : startSheet(view.kid, view.subject, view.kind, view.slot)));
  on("#topractice", "click", () => { view.phase = "q"; render(); window.scrollTo({ top: 0 }); });
  on("#ansform", "submit", (e) => { e.preventDefault(); checkAnswer($("#ans").value); });
  const a = $("#ans"); if (a && !a.disabled && !view.chatFocus && window.matchMedia("(pointer:fine)").matches) a.focus();
  on("[data-choice]", "click", (_, b) => { const p = view.probs[view.i]; view.sel = +b.dataset.choice; checkAnswer(p.choices[view.sel]); });
  on("[data-speak]", "click", (_, b) => {
    const w = b.dataset.speak;
    if (w === "lesson") { const L = view.lesson; speak([L.title, L.intro, ...L.points, L.example ? "Let's try one together. " + L.example.problem + ". " + L.example.steps.join(". ") : "", L.tip].join(". ")); return; }
    const p = view.probs[view.i];
    speak(w === "passage" ? p.passage : p.question + (p.type === "choice" ? ". " + p.choices.join(". ") : ""));
  });
  on("#hint", "click", () => { view.hinted = true; view.fb = { kind: "info", text: "Hint: " + view.probs[view.i].hint }; render(); });
  on("#showstep, #morestep", "click", () => { view.shown = Math.min(view.probs[view.i].steps.length, view.shown + 1); render(); });
  on("#reveal", "click", () => { const p = view.probs[view.i]; view.results[view.i] = { score: 0, given: view.tries.at(-1) || "" }; view.fb = { kind: "reveal", text: "The answer is " + p.answer + ". You'll see one like it again soon." }; render(); });
  const nx = $("#next"); if (nx) { nx.addEventListener("click", finishProblem); nx.focus(); }
  on("#chatform", "submit", (e) => { e.preventDefault(); const t = $("#chatin").value.trim(); if (t && !view.thinking) askPip(t); });
  on("#chatin", "focus", () => (view.chatFocus = true));
  on("#chatin", "blur", () => (view.chatFocus = false));
  on("#pinform", "submit", (e) => { e.preventDefault(); const v = $("#pin").value.trim(); if (!v) return; if (!family.pin) { family.pin = v; save(); view.unlocked = true; } else if (v === family.pin) { view.unlocked = true; view.pinErr = false; } else view.pinErr = true; render(); });
  on("#lock", "click", () => go({ name: "home" }));
  on("[data-pk]", "click", (_, b) => { view.pk = b.dataset.pk; view.courseSaved = false; render(); });
  on("[data-psub]", "click", (_, b) => { view.psub = b.dataset.psub; render(); });
  on("#report", "click", () => writeReport(getKid(view.pk)));
  on("#courseform", "submit", (e) => {
    e.preventDefault();
    const k = getKid(view.pk), c = course(k), w = +$("#cweek").value, start = $("#cstart").value;
    if (/^\d{4}-\d{2}-\d{2}$/.test(start)) c.start = start;
    if (w !== c.pos.week) c.pos = { week: w, day: 0 };
    view.courseSaved = true; save(); render();
  });
  on("#toparent", "click", () => go({ name: "parent", unlocked: true, pk: view.pk }));
  on("[data-rename]", "change", (_, i) => { const v = i.value.trim(); if (v) { getKid(i.dataset.rename).name = v; save(); } });
  on("[data-grade]", "change", (_, s) => { const k = getKid(s.dataset.grade); k.grade = s.value; k.course = { start: today(), pos: { week: 1, day: 0 } }; save(); render(); });
  on("[data-askdel]", "click", (_, b) => { view.confirmDel = b.dataset.askdel; render(); });
  on("[data-nodel]", "click", () => { view.confirmDel = null; render(); });
  on("[data-del]", "click", (_, b) => { const id = b.dataset.del; family.kids = family.kids.filter((k) => k.id !== id); delete family.progress[id]; delete family.stars[id]; delete family.done[id]; family.log = family.log.filter((l) => l.kid !== id); view.confirmDel = null; save(); render(); });
  on("#newpin", "submit", (e) => { e.preventDefault(); const v = $("#pin2").value.trim(); if (v) { family.pin = v; view.pinSaved = true; save(); render(); } });
  on("#aiform", "submit", async (e) => {
    e.preventDefault();
    const s = ai.loadAi(), key = $("#apikey").value.trim();
    ai.saveAi({ key: key || s.key, model: $("#model").value, source: $("#source").value });
    if (!ai.aiReady()) { view.aiMsg = { ok: false, text: "Paste an API key first." }; render(); return; }
    view.aiMsg = { wait: true, text: "Testing the key…" }; render();
    try { await ai.testKey(); view.aiMsg = { ok: true, text: "Pip is connected and ready." }; }
    catch (err) { view.aiMsg = { ok: false, text: ERR[err.code] || `That didn't work (${err.message || err.code}).` }; }
    if (view.name === "setup") render();
  });
  on("#forgetkey", "click", () => { ai.saveAi({ ...ai.loadAi(), key: "" }); view.aiMsg = { ok: true, text: "Key removed from this device." }; render(); });
  on("#copybackup", "click", async () => { try { await navigator.clipboard.writeText(exportJson()); view.backupMsg = { ok: true, text: "Copied" }; } catch { view.showBackup = true; view.backupMsg = { ok: false, text: "Couldn't copy. Select the text below instead." }; } render(); });
  on("#showbackup", "click", () => { view.showBackup = !view.showBackup; render(); });
  on("#restore", "click", () => { try { importJson($("#restoretext").value); view.backupMsg = { ok: true, text: "Restored" }; } catch { view.backupMsg = { ok: false, text: "That backup text isn't valid." }; } render(); });
  on("#askreset", "click", () => { view.confirmReset = true; render(); });
  on("#noreset", "click", () => { view.confirmReset = false; render(); });
  on("#doreset", "click", () => { resetFamily(); go({ name: "home" }); });
}

render();
if ("serviceWorker" in navigator && import.meta.env.PROD) navigator.serviceWorker.register("./sw.js").catch(() => {});
