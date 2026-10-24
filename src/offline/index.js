// The offline engine: builds whole worksheets, quizzes and tests from the built-in generators, and
// finds the built-in lesson for a topic. Used when there's no Claude key, no internet, or Claude fails.
import { pick, shuffle, choice } from "./util.js";
import { gen as mathGen } from "./math.js";
import { EN } from "./english.js";
import { PASSAGES } from "./passages.js";
import { LESSONS } from "./lessons.js";

const recent = [];
// Questions from passages that practice these skills, sharing as few passages as possible.
function readSet(skills, count, grade) {
  const g = Number(grade) || 2;
  const score = (p) => p.qs.filter((q) => q[0].some((k) => skills.includes(k))).length * 3 + (p.grade === g ? 4 : 0) - (recent.includes(p.title) ? 6 : 0) + Math.random() * 3;
  const pool = PASSAGES.filter((p) => p.qs.some((q) => q[0].some((k) => skills.includes(k)))).sort((a, b) => score(b) - score(a));
  const out = [];
  for (const p of pool.length ? pool : PASSAGES) {
    if (out.length >= count) break;
    recent.push(p.title); if (recent.length > 6) recent.shift();
    const match = shuffle(p.qs.filter((q) => q[0].some((k) => skills.includes(k))));
    const rest = shuffle(p.qs.filter((q) => !match.includes(q)));
    for (const [, q, a, ws, why] of [...match, ...rest].slice(0, count - out.length))
      out.push(choice(q, a, ws, [why, /[.!?]$/.test(a) ? `The answer is: ${a}` : `The answer is "${a}".`], { passage: `${p.title}\n\n${p.text}`, hint: "Look back at the passage and find the part that answers the question." }));
  }
  return out;
}

// One problem for an op like "add3", "e:prefix:3", "w:letter", "read:theme" or "mix:a+b".
export function one(op, lvl, grade) {
  if (op.startsWith("mix:")) return one(pick(op.slice(4).split("+")), lvl, grade);
  if (op.startsWith("read:")) return readSet(op.slice(5).split(","), 1, grade)[0];
  if (op.startsWith("w:")) return EN.write(lvl, op.slice(2));
  if (op.startsWith("e:")) { const [name, arg] = op.slice(2).split(":"); return EN[name](lvl, arg); }
  return mathGen(op, lvl);
}

export const hasOffline = (t) => !!(t && t.op);

// A full sheet: `items` are [{topic, count, level}] from plan.js.
export function offlineSheet(items, grade) {
  const out = [];
  for (const it of items) {
    const op = it.topic.op;
    if (!op) continue;
    const probs = op.startsWith("read:") ? readSet(op.slice(5).split(","), it.count, grade) : [];
    const key = (p) => p.question + (p.passage || "") + p.answer + JSON.stringify(p.picture);
    const seen = new Set(probs.map(key));
    for (let tries = 0; probs.length < it.count && tries < it.count * 15; tries++) {
      const p = one(op, it.level, grade);
      if (p && !seen.has(key(p))) { seen.add(key(p)); probs.push(p); }
    }
    out.push(...probs.map((p) => ({ passage: "", ...p, topicId: it.topic.id })));
  }
  return out;
}

export const offlineLesson = (t) => LESSONS[t.name] || null;
