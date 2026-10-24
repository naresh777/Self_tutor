// Pip's connection to Claude. The parent's API key is kept only on this device.
import Anthropic from "@anthropic-ai/sdk";
import { SUBJECTS, gradeLabel, kidAge, isTeks } from "./course.js";

const KEY = "pip-tutor-ai-v1";
export const MODELS = [
  { id: "claude-opus-5-5", label: "Claude Opus 5.5 (best quality)" },
  { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5 (faster, cheaper)" },
  { id: "claude-haiku-5-5", label: "Claude Haiku 5.5 (fastest, cheapest)" },
];

export function loadAi() {
  try { return { key: "", model: MODELS[0].id, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch { return { key: "", model: MODELS[0].id }; }
}
export function saveAi(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  client = null;
}
export const aiReady = () => !!loadAi().key;

let client = null;
function getClient() {
  const { key } = loadAi();
  if (!key) throw { code: "no_key" };
  // Requests go straight from this device to the Claude API; no server in between.
  client ??= new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true, maxRetries: 2 });
  return client;
}

function toCode(e) {
  if (e && e.code && !(e instanceof Error)) return e.code;
  if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) return "bad_key";
  if (e instanceof Anthropic.RateLimitError) return "rate_limited";
  if (e instanceof Anthropic.APIConnectionError) return "offline";
  if (e instanceof Anthropic.BadRequestError && /credit|billing/i.test(e.message)) return "billing";
  return "error";
}

let fallbackOk = true;
async function ask(opts) {
  try {
    return await askOnce(opts, fallbackOk);
  } catch (e) {
    // If this account or model doesn't take server-side fallbacks, carry on without them.
    if (fallbackOk && e instanceof Anthropic.BadRequestError && /fallback/i.test(e.message)) {
      fallbackOk = false;
      try { return await askOnce(opts, false); } catch (e2) { e = e2; }
    }
    throw { code: toCode(e), message: e?.message };
  }
}

async function askOnce({ system, messages, effort = "low", maxTokens = 16000, onText }, useFallback) {
  const c = getClient();
  const { model } = loadAi();
  const params = { model, max_tokens: maxTokens, messages, output_config: { effort } };
  if (system) params.system = system;
  // Opus 5.5 and Sonnet 5.5 can hand a declined request to a fallback model on the server.
  const betas = useFallback && model !== "claude-haiku-5-5" ? ["server-side-fallback-2026-07-01"] : [];
  if (betas.length) params.fallbacks = "default";
  {
    let msg;
    if (onText) {
      const stream = c.beta.messages.stream({ ...params, betas });
      let text = "";
      stream.on("text", (delta) => { text += delta; onText(text); });
      msg = await stream.finalMessage();
    } else {
      msg = await c.beta.messages.create({ ...params, betas });
    }
    if (msg.stop_reason === "refusal") throw { code: "refused" };
    return msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  }
}

function parseJson(text) {
  const start = text.indexOf("{"), end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw { code: "bad_json" };
  try { return JSON.parse(text.slice(start, end + 1)); } catch { throw { code: "bad_json" }; }
}

export async function testKey() {
  await ask({ messages: [{ role: "user", content: "Reply with the single word: ready" }], maxTokens: 2000 });
}

const SUBJECT_RULES = {
  math: `- "type" is "number" when the answer is a single number or fraction (like 12, 3/4, -5, 2.5), "choice" for multiple choice, or "text" for a short word answer.
- Prefer "number". Use "choice" for shapes, comparisons, true/false, telling time, or anything awkward to type.
- "answer" is the exact final answer only, with no units.`,
  english: `- Use "choice" for most problems (3 or 4 "choices", only one clearly correct). Use "text" only when the answer is one short word (a spelling, a plural, a past-tense verb).
- For reading topics, write a short original passage that fits the grade (about {len} words) in "passages" and point to it with the problem's "passage" number (0 for the first). Several problems can share one passage. Use -1 when a problem has no passage.
- For spelling or sound questions, write the word or sound in the question so the child can see it.
- "answer" is the exact correct choice or word.`,
};

// The picture specs src/visuals.js can draw. Claude picks one and fills in the numbers.
const VISUALS = `Pictures you can attach (JSON objects; the app draws them):
- {"type":"numberline","start":30,"end":60,"jumps":[{"from":38,"to":48},{"from":48,"to":53}],"marks":[38]}  open number line with hops (up for adding, down for subtracting)
- {"type":"blocks","numbers":[46,27],"op":"+"}  base-ten blocks for both numbers; with "op":"-" it shows the first number, the trade (regrouping) and the taken-away blocks crossed out
- {"type":"placevalue","number":482}  place value chart
- {"type":"tenframe","filled":8,"added":5}  (also "crossed" to take away; 20 slots when needed)
- {"type":"strip","total":"?","parts":[35,18]}  strip diagram (bar model); use "?" for the unknown
- {"type":"array","rows":3,"cols":4} and {"type":"groups","groups":3,"each":4}  for multiplication and division
- {"type":"clock","hour":3,"minute":45}
- {"type":"coins","quarters":2,"dimes":1,"nickels":1,"pennies":3,"dollar":0}
- {"type":"fraction","parts":4,"shaded":3,"shape":"circle" or "rect"}
- {"type":"graph","kind":"bar" or "pictograph","labels":["Cats","Dogs"],"values":[4,6],"key":1,"title":"Favorite pets"}
Any picture can also have a short "caption". Keep numbers small enough to draw (blocks up to about 999, at most 8 jumps, 12 coins of a kind).`;

const KIND = {
  learn: "a first practice sheet right after a new lesson",
  practice: "a daily practice sheet",
  extra: "an extra practice sheet",
  quiz: "a weekly quiz",
  test: "a monthly test on the last four weeks",
};

// Texas (TEKS) grades: Prosper ISD and Frisco ISD teach to these standards, and STAAR tests them.
function teksNote(subject, grade) {
  if (!isTeks(subject, grade)) return "";
  return subject === "math"
    ? `\nThis child goes to school in Texas (Frisco / Prosper ISD), so teach the way Texas classrooms do. Each topic lists its TEKS student expectation; write problems that match it exactly. Use the Texas words and models: strip diagrams, open number lines, base-ten blocks, place value, "compose" and "decompose", and STAAR-style wording. On quizzes and tests, write some problems the way STAAR asks them (pick the number sentence that matches a strip diagram, which statement is true, read the graph).`
    : `\nThis child goes to school in Texas (Frisco / Prosper ISD), so follow the Texas ELAR TEKS. Each topic lists its TEKS student expectation; write problems that match it. On quizzes and tests, ask some questions the way STAAR reading does (main idea, which detail supports, what a word means in the passage).`;
}

const pic = (v) => (v && typeof v === "object" && typeof v.type === "string" ? v : null);

// One worksheet, quiz or test. `items` say how many problems to write for each topic, and at what level.
export async function makeSheet(subject, grade, kind, items, misses) {
  const subj = SUBJECTS[subject].name;
  const len = grade === "K" ? 40 : Math.min(250, 60 + 25 * +grade);
  const total = items.reduce((a, it) => a + it.count, 0);
  const list = items.map((it, i) => `${i}. "${it.topic.name}" (${gradeLabel(it.topic.grade)}${it.topic.teks ? ", TEKS " + it.topic.teks : ""}${it.topic.bridge ? ", a preview of next year" : ""}${it.review ? ", review of an earlier week" : ""}): ${it.count} problem${it.count > 1 ? "s" : ""} at level ${it.level} of 3`).join("\n");
  const prompt = `Write ${KIND[kind]} in ${subj} for a child in ${gradeLabel(grade).toLowerCase()} (about ${kidAge(grade)} years old).
It has ${total} problems on these topics (the number before each topic is its "topic" index):
${list}

Levels: 1 = gentle warm-up, 2 = on grade level, 3 = stretch.${teksNote(subject, grade)}${kind === "quiz" || kind === "test" ? " This is a check of what the child knows, so make each problem stand on its own, with clear wording and no tricks." : ""}
${misses.length ? `The child recently missed these, so include similar ideas where they fit:\n${misses.map((m) => "- " + m).join("\n")}\n` : ""}
Use friendly, everyday topics kids enjoy (pets, sports, baking, space, gardens) and vary them. Keep the reading level right for the age. Do not use real brand names or real people. Order the problems from easier to harder within each topic.

Rules for each problem:
${SUBJECT_RULES[subject].replace("{len}", len)}
- "topic" is the index of the topic it practices.
- For "choice", "answer" must exactly equal one of the "choices".
- "accept" lists other ways to write the same correct answer (like "0.5" for "1/2"); it can be empty.
- "steps" is a worked explanation of 2 to 5 short steps a child can follow, ending with the answer.
- "hint" is one nudge that does not give the answer away.
- Double-check every answer before you write it.
${subject === "math" ? `
Pictures help young kids see the math. ${VISUALS}
- "picture" (optional) is shown with the question. Include it whenever the question is about something to look at (coins, a clock, a graph, a fraction model, blocks, a strip diagram). Never write "look at the picture" without one, and never let the picture give the answer away.
- "visual" is shown with the steps in "Show me how": a picture of the solution, like the hops on a number line or the base-ten blocks with the trade. ${grade === "K" || +grade <= 3 ? "Give nearly every problem one, and always one for adding and subtracting." : "Give one whenever a picture makes the idea clearer."}
- Make the picture's numbers match the problem exactly.
- When a one-digit add or subtract crosses 10, always use make-a-ten, never one direct jump: 4 + 7 is 4 + 6 = 10, then 10 + 1 = 11 (two hops on the number line, 4 to 10 to 11), and 13 − 5 is 13 − 3 = 10, then 10 − 2 = 8 (two hops back through 10). Write the steps the same way.
` : ""}
Reply with JSON only, in this shape:
{"passages":[],"problems":[{"topic":0,"passage":-1,"question":"...","type":"choice","choices":["..."],"answer":"...","accept":[],"steps":["..."],"hint":"..."${subject === "math" ? ',"picture":null,"visual":{"type":"numberline","start":0,"end":20,"jumps":[]}' : ""}}]}`;
  // Streamed because a long test can take a while to write.
  const text = await ask({ messages: [{ role: "user", content: prompt }], effort: "medium", maxTokens: 32000, onText: () => {} });
  const r = parseJson(text);
  const passages = Array.isArray(r.passages) ? r.passages.map(String) : [];
  const out = (r.problems || [])
    .filter((p) => p && p.question && p.answer != null && Array.isArray(p.steps))
    .map((p) => {
      const ti = Number.isInteger(p.topic) && items[p.topic] ? p.topic : 0;
      const pi = Number.isInteger(p.passage) && passages[p.passage] ? p.passage : -1;
      return {
        topicId: items[ti].topic.id,
        passage: pi >= 0 ? passages[pi] : "",
        question: String(p.question),
        type: ["number", "choice", "text"].includes(p.type) ? p.type : "text",
        choices: Array.isArray(p.choices) ? p.choices.map(String) : [],
        answer: String(p.answer),
        accept: (p.accept || []).map(String),
        steps: p.steps.map(String),
        hint: String(p.hint || p.steps[0] || ""),
        picture: pic(p.picture),
        visual: pic(p.visual),
      };
    });
  for (const p of out) {
    if (p.type === "choice" && !p.choices.includes(p.answer)) p.choices.push(p.answer);
    if (p.type === "choice" && p.choices.length < 2) p.type = "text";
  }
  if (out.length < Math.min(3, total)) throw { code: "bad_json" };
  return out;
}

// A short kid-friendly lesson that introduces the week's topic.
export async function makeLesson(t) {
  const text = await ask({
    effort: "medium",
    messages: [{
      role: "user",
      content: `Write a short lesson that introduces a new ${SUBJECTS[t.subject].name} topic to a child in ${gradeLabel(t.grade).toLowerCase()} (about ${kidAge(t.grade)} years old).
Topic: "${t.name}" (part of the unit "${t.unitTitle}"${t.teks ? `, TEKS ${t.teks}` : ""}).${t.bridge ? " This is a preview of next year's work, so start gently from what they already know." : ""}${teksNote(t.subject, t.grade)}

Speak to the child directly, warmly and simply, as Pip the owl tutor. Keep the reading level right for the age. Plain text only, no markdown.
${t.subject === "math" ? `
When a one-digit add or subtract crosses 10, the example must use make-a-ten, never one direct jump: 4 + 7 is 4 + 6 = 10, then 10 + 1 = 11 (two hops on the number line, 4 to 10 to 11), and 13 − 5 is 13 − 3 = 10, then 10 − 2 = 8 (two hops back through 10). Write the steps the same way. Show the idea with a picture: give the example a "visual" that draws how to solve it (hops on a number line, base-ten blocks with the trade, a strip diagram, an array, and so on). ${VISUALS}
` : ""}
Reply with JSON only, in this shape:
{"title":"...","intro":"1 or 2 sentences on what we'll learn and why it's useful","points":["2 to 4 short key ideas"],"example":{"problem":"one example problem","steps":["2 to 5 steps that solve it"]${t.subject === "math" ? ',"visual":{"type":"..."}' : ""}},"tip":"one memory trick or tip"}`,
    }],
  });
  const r = parseJson(text);
  if (!r.intro || !Array.isArray(r.points)) throw { code: "bad_json" };
  return {
    title: String(r.title || t.name),
    intro: String(r.intro),
    points: r.points.map(String).slice(0, 5),
    example: r.example && r.example.problem ? { problem: String(r.example.problem), steps: (r.example.steps || []).map(String), visual: pic(r.example.visual) } : null,
    tip: String(r.tip || ""),
  };
}

// Second opinion for typed answers that don't match exactly (a synonym, a small spelling slip).
export async function judgeAnswer(t, prob, given) {
  const text = await ask({
    messages: [{
      role: "user",
      content: `A child in ${gradeLabel(t.grade).toLowerCase()} answered a ${SUBJECTS[t.subject].name.toLowerCase()} question about "${t.name}".
${prob.passage ? `Passage:\n${prob.passage}\n` : ""}Question: ${prob.question}
Expected answer: ${prob.answer}${prob.accept.length ? " (also fine: " + prob.accept.join(", ") + ")" : ""}
Child's answer: ${given}

Does the child's answer mean the same thing as the expected answer? Count it correct if it is right but worded differently or has a small typo, unless the topic itself is spelling. Reply with JSON only: {"correct":true or false}`,
    }],
    maxTokens: 2000,
  });
  return !!parseJson(text).correct;
}

export function tutorSystem(kid, t, p, tries) {
  return `You are Pip, a warm, patient owl who tutors kids. You are helping ${kid.name}, who is in ${gradeLabel(kid.grade).toLowerCase()} (about ${kidAge(kid.grade)} years old), with the ${SUBJECTS[t.subject].name} topic "${t.name}".
${p.passage ? `\nThe passage on screen:\n${p.passage}\n` : ""}
The problem on screen:
${p.question}${p.type === "choice" ? "\nChoices: " + p.choices.join(" | ") : ""}${p.picture ? "\nA picture is shown with it, drawn from: " + JSON.stringify(p.picture) : ""}
Correct answer (secret, for you only): ${p.answer}
Worked solution (secret): ${p.steps.join(" / ")}
What ${kid.name} has answered so far: ${tries.length ? tries.join(", ") : "nothing yet"}

How to tutor:
- Ask one small guiding question or give one hint at a time, so the child finds the next step themselves.
- Use 1 to 3 short sentences and words a ${kidAge(kid.grade)} year old knows. No markdown or LaTeX; write math like 3 × 4 or 1/2.
- Don't say the final answer unless the child has tried at least twice and clearly asks you to show it. Even then, walk through it step by step.
- If an answer they share is wrong, say what part is right first, then point at the mistake kindly.
- Celebrate effort. Keep the chat about this problem; if they go off topic, steer back gently.
- For one-digit facts that cross 10, guide with make-a-ten (4 + 7: 4 + 6 makes 10, then 1 more), not counting on all at once.
- Suggest drawing it when that helps: hops on a number line, base-ten blocks (trade a ten for ten ones when you can't take away), or a strip diagram.${isTeks(t.subject, kid.grade) ? "\n- The child learns in Texas (Frisco / Prosper ISD), so use the same words their class does: strip diagram, open number line, compose and decompose, regroup." : ""}
- Never ask for personal details like their full name, school, address or photos.`;
}

export async function tutorReply(system, chat, onText) {
  return ask({ system, messages: chat, onText, maxTokens: 4000 });
}

export async function progressNote(prompt) {
  return ask({ messages: [{ role: "user", content: prompt }], effort: "medium" });
}
