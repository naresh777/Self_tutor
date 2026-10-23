// Pip's connection to Claude. The parent's API key is kept only on this device.
import Anthropic from "@anthropic-ai/sdk";
import { SUBJECTS, gradeLabel, kidAge } from "./curriculum.js";

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
  english: `- Use "choice" for most problems (3 or 4 "choices", only one clearly correct). Use "text" only when the answer is one short word or phrase (a spelling, a plural, a past-tense verb).
- For reading skills, write one short original passage that fits the grade (about ${"{len}"} words) in "passage", and ask about it. For other skills leave "passage" empty.
- For spelling or sound questions, write the word or sound in the question so the child can see it.
- "answer" is the exact correct choice or word.`,
};

export async function makeWorksheet(skill, lvl, misses) {
  const subj = SUBJECTS[skill.subject];
  const len = skill.grade === "K" ? 40 : Math.min(250, 60 + 25 * +skill.grade);
  const prompt = `Write a short ${subj.name.toLowerCase()} practice worksheet for a child.
Child: ${skill.grade === "K" ? "kindergarten" : "grade " + skill.grade} (about ${kidAge(skill.grade)} years old).
Skill: "${skill.name}" (${subj.strands[skill.strand].name}).
Difficulty: level ${lvl} of 3 (1 = gentle warm-up, 2 = on grade level, 3 = stretch).
${misses.length ? `Recently the child missed these, so include similar ideas:\n${misses.map((m) => "- " + m).join("\n")}\n` : ""}
Write exactly 5 problems that go from easier to harder. Use friendly, everyday topics kids enjoy (pets, sports, baking, space, gardens) and vary them. Keep the reading level right for the age. Do not use real brand names or real people.

Rules for each problem:
${SUBJECT_RULES[skill.subject].replace("{len}", len)}
- For "choice", "answer" must exactly equal one of the "choices".
- "accept" lists other ways to write the same correct answer (like "0.5" for "1/2"); it can be empty.
- "steps" is a worked explanation of 2 to 5 short steps a child can follow, ending with the answer.
- "hint" is one nudge that does not give the answer away.
- Double-check every answer before you write it.

Reply with JSON only, in this shape:
{"passage":"","problems":[{"question":"...","type":"choice","choices":["..."],"answer":"...","accept":[],"steps":["..."],"hint":"..."}]}`;
  const text = await ask({ messages: [{ role: "user", content: prompt }], effort: "medium" });
  const r = parseJson(text);
  const list = (r.problems || [])
    .filter((p) => p && p.question && p.answer != null && Array.isArray(p.steps))
    .slice(0, 5)
    .map((p) => ({
      question: String(p.question),
      type: ["number", "choice", "text"].includes(p.type) ? p.type : "text",
      choices: Array.isArray(p.choices) ? p.choices.map(String) : [],
      answer: String(p.answer),
      accept: (p.accept || []).map(String),
      steps: p.steps.map(String),
      hint: String(p.hint || p.steps[0] || ""),
    }));
  for (const p of list) {
    if (p.type === "choice" && !p.choices.includes(p.answer)) p.choices.push(p.answer);
    if (p.type === "choice" && p.choices.length < 2) p.type = "text";
  }
  if (!list.length) throw { code: "bad_json" };
  return { passage: String(r.passage || ""), problems: list };
}

// Second opinion for typed answers that don't match exactly (a synonym, a small spelling slip).
export async function judgeAnswer(skill, prob, passage, given) {
  const text = await ask({
    messages: [{
      role: "user",
      content: `A child in ${gradeLabel(skill.grade).toLowerCase()} answered a ${SUBJECTS[skill.subject].name.toLowerCase()} question.
${passage ? `Passage:\n${passage}\n` : ""}Question: ${prob.question}
Expected answer: ${prob.answer}${prob.accept.length ? " (also fine: " + prob.accept.join(", ") + ")" : ""}
Child's answer: ${given}

Does the child's answer mean the same thing as the expected answer? Count it correct if it is right but worded differently or has a small typo, unless the skill itself is spelling. Reply with JSON only: {"correct":true or false}`,
    }],
    maxTokens: 2000,
  });
  return !!parseJson(text).correct;
}

export function tutorSystem(kid, skill, p, passage, tries) {
  return `You are Pip, a warm, patient owl who tutors kids. You are helping ${kid.name}, who is in ${gradeLabel(skill.grade).toLowerCase()} (about ${kidAge(skill.grade)} years old), with the ${SUBJECTS[skill.subject].name} skill "${skill.name}".
${passage ? `\nThe passage on screen:\n${passage}\n` : ""}
The problem on screen:
${p.question}${p.type === "choice" ? "\nChoices: " + p.choices.join(" | ") : ""}
Correct answer (secret, for you only): ${p.answer}
Worked solution (secret): ${p.steps.join(" / ")}
What ${kid.name} has answered so far: ${tries.length ? tries.join(", ") : "nothing yet"}

How to tutor:
- Ask one small guiding question or give one hint at a time, so the child finds the next step themselves.
- Use 1 to 3 short sentences and words a ${kidAge(skill.grade)} year old knows. No markdown or LaTeX; write math like 3 × 4 or 1/2.
- Don't say the final answer unless the child has tried at least twice and clearly asks you to show it. Even then, walk through it step by step.
- If an answer they share is wrong, say what part is right first, then point at the mistake kindly.
- Celebrate effort. Keep the chat about this problem; if they go off topic, steer back gently.
- Never ask for personal details like their full name, school, address or photos.`;
}

export async function tutorReply(system, chat, onText) {
  return ask({ system, messages: chat, onText, maxTokens: 4000 });
}

export async function progressNote(prompt) {
  return ask({ messages: [{ role: "user", content: prompt }], effort: "medium" });
}
