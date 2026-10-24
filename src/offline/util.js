// Small helpers shared by the built-in (offline) problem generators.
export const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
// Pick n different items.
export const sample = (arr, n) => shuffle(arr).slice(0, n);
export const fmt = (n) => Number(n).toLocaleString("en-US");
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const NAMES = ["Maya", "Leo", "Ava", "Sam", "Priya", "Noah", "Zoe", "Eli", "Mia", "Omar", "Lily", "Ben", "Sofia", "Jay", "Nora", "Max", "Aria", "Kai", "Ella", "Ravi"];

const base = { accept: [], picture: null, visual: null };

// A typed-number problem.
export function num(question, answer, steps, more = {}) {
  return { ...base, question, type: "number", choices: [], answer: String(answer), steps, hint: more.hint || steps[0], ...more };
}

// A multiple-choice problem. Wrong choices that repeat the answer or each other are dropped.
export function choice(question, answer, wrongs, steps, more = {}) {
  const a = String(answer);
  const ws = [...new Set(wrongs.map(String))].filter((w) => w !== a).slice(0, more.max ? more.max - 1 : 3);
  const choices = more.keepOrder ? [a, ...ws].sort((x, y) => (more.keepOrder.indexOf(x) - more.keepOrder.indexOf(y))) : shuffle([a, ...ws]);
  const { keepOrder, max, ...rest } = more;
  return { ...base, question, type: "choice", choices, answer: a, steps, hint: rest.hint || steps[0], ...rest };
}

// A short typed-word problem.
export function word(question, answer, steps, more = {}) {
  return { ...base, question, type: "text", choices: [], answer: String(answer), steps, hint: more.hint || steps[0], ...more };
}
