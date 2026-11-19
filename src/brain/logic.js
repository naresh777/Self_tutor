// Brain Gym rules that don't touch the page: which games run on which day, difficulty levels
// (set from the child's age and the parent's Easy/Medium/Hard choice, then adjusted by play),
// game settings for each level, and answer checks. Kept DOM-free so it can be tested in Node.

export const GAMES = {
  stars: { name: "Star Catcher", icon: "⭐", skill: "Focus and self-control", unit: "points" },
  path: { name: "Pip's Path", icon: "🟦", skill: "Remembering what you see and hear", unit: "longest path" },
  pairs: { name: "Pair Match", icon: "🃏", skill: "Visual memory", unit: "stars" },
  rhythm: { name: "Rhythm Copy", icon: "🥁", skill: "Sequences and listening", unit: "longest beat" },
  chef: { name: "Robot Chef", icon: "🤖", skill: "Following steps in order", unit: "most steps" },
  switch: { name: "Switch Sort", icon: "🔀", skill: "Following rules that change", unit: "% right" },
  story: { name: "Story Time", icon: "📖", skill: "Listening and remembering", unit: "of 3 right" },
  picnic: { name: "Picnic Basket", icon: "🧺", skill: "Remembering a list, then later", unit: "items" },
};
export const GAME_IDS = Object.keys(GAMES);
export const MIN_LEVEL = 1, MAX_LEVEL = 10;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

/* ---------- schedule: 5 days a week, 3 games plus Picnic Basket at the start and end ---------- */
// Index by Date.getDay(): 0 Sunday ... 6 Saturday.
const WEEK = [null, ["stars", "path", "chef"], ["story", "switch", "rhythm"], ["pairs", "chef", "stars"], ["story", "path", "switch"], "choice", null];
export function dayPlan(date = new Date()) {
  const d = date.getDay(), w = WEEK[d];
  if (!w) return { rest: true };
  return { rest: false, choice: w === "choice", games: w === "choice" ? [] : w, offscreen: d === 2 || d === 4 ? "says" : "steps" };
}
export const CHOOSABLE = GAME_IDS.filter((g) => g !== "picnic");

/* ---------- difficulty ---------- */
export const AGES = [5, 6, 7, 8, 9, 10, 11, 12];
export const DIFFS = [
  { id: "easy", label: "Easy", shift: -2 },
  { id: "medium", label: "Medium", shift: 0 },
  { id: "hard", label: "Hard", shift: 2 },
];
// Age a child usually is in a grade (K = 5, grade 2 = 8 at the end of the year).
export const ageForGrade = (grade) => clamp(grade === "K" ? 5 : +grade + 6, 5, 12) || 8;
export function defaults(grade) { return { age: ageForGrade(grade), diff: "medium", auto: true }; }
// Medium at age 8 is level 4: paths of 4, recipes of 3 steps, stories about a minute long.
export function startLevel(settings) {
  const age = clamp(+settings.age || 8, 5, 12);
  const shift = (DIFFS.find((d) => d.id === settings.diff) || DIFFS[1]).shift;
  return clamp(age - 4 + shift, MIN_LEVEL, MAX_LEVEL);
}

// Trial-by-trial staircase: 3 wins in a row steps up, 2 misses in a row steps down.
// With auto-adjust off, the level stays where the parent set it.
export function step(state, won, auto = true) {
  const s = { level: state.level, wins: state.wins || 0, misses: state.misses || 0, moved: 0 };
  if (won) { s.wins++; s.misses = 0; } else { s.misses++; s.wins = 0; }
  if (!auto) return s;
  if (s.wins >= 3 && s.level < MAX_LEVEL) { s.level++; s.wins = 0; s.moved = 1; }
  if (s.misses >= 2 && s.level > MIN_LEVEL) { s.level--; s.misses = 0; s.moved = -1; }
  return s;
}
// One-round games (a timed round, one board) move a whole level on a good or poor round.
export const roundMove = (good, poor, level, auto = true) => (!auto ? level : clamp(level + (good ? 1 : poor ? -1 : 0), MIN_LEVEL, MAX_LEVEL));

/* ---------- per-game settings for a level ---------- */
export const params = {
  stars: (l) => ({ secs: 45, every: Math.max(420, 1150 - l * 70), fall: Math.max(1.5, 3.6 - l * 0.2), decoy: Math.min(0.6, 0.3 + l * 0.03), lookalike: l >= 5 }),
  path: (l) => (l <= 7 ? { len: clamp(l, 2, 7), grid: l >= 6 ? 4 : 3, back: false } : { len: l - 5, grid: 3, back: true }),
  digits: (l) => ({ len: clamp(l <= 7 ? l : l - 4, 2, 7), back: l >= 8 }),
  // Pair counts chosen so the cards fill whole rows (8, 10, 12, 16, 20 or 24 cards).
  pairs: (l) => ({ pairs: [4, 5, 6, 6, 8, 8, 10, 10, 12, 12][clamp(l, 1, 10) - 1] }),
  rhythm: (l) => ({ len: Math.min(8, 2 + Math.ceil(l / 2)), drums: l >= 3 ? 2 : 1, long: l >= 5 }),
  chef: (l) => ({ steps: clamp(1 + Math.ceil(l / 2), 2, 5), cond: l >= 8 }),
  switch: (l) => ({ cards: 16, every: Math.max(2, 8 - l), hidden: l >= 8 }),
  story: (l) => ({ band: l <= 3 ? 1 : l <= 6 ? 2 : 3 }),
  picnic: (l) => ({ chain: Math.min(10, l + 2), options: l >= 6 ? 16 : 12 }),
};

/* ---------- checks ---------- */
export const sameSeq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

// Rhythm: the drums must come in the same order; when the beat has long gaps, each gap the
// child taps must be on the same side of the halfway mark between a short and a long gap.
export const SHORT_GAP = 320, LONG_GAP = 700;
export function rhythmOk(pattern, taps) {
  if (taps.length !== pattern.length) return false;
  if (!pattern.every((p, i) => p.drum === taps[i].drum)) return false;
  if (!pattern.some((p) => p.long)) return true;
  const mid = (SHORT_GAP + LONG_GAP) / 2;
  for (let i = 1; i < pattern.length; i++) if ((taps[i].t - taps[i - 1].t > mid) !== !!pattern[i - 1].long) return false;
  return true;
}

/* ---------- Robot Chef recipes ---------- */
export const PANTRY = [
  { id: "apple", icon: "🍎", one: "apple", many: "apples" },
  { id: "egg", icon: "🥚", one: "egg", many: "eggs" },
  { id: "milk", icon: "🥛", one: "cup of milk", many: "cups of milk" },
  { id: "cheese", icon: "🧀", one: "piece of cheese", many: "pieces of cheese" },
  { id: "carrot", icon: "🥕", one: "carrot", many: "carrots" },
  { id: "banana", icon: "🍌", one: "banana", many: "bananas" },
  { id: "salt", icon: "🧂", one: "pinch of salt", many: "pinches of salt" },
  { id: "berry", icon: "🫐", one: "blueberry", many: "blueberries" },
];
export const ACTIONS = [
  { id: "stir", icon: "🥄", say: "stir" },
  { id: "shake", icon: "🫨", say: "shake the bowl" },
  { id: "bake", icon: "🔥", say: "bake it" },
];
const WORDS = ["", "one", "two", "three"];
const pick = (arr, rnd) => arr[Math.floor(rnd() * arr.length)];

// Returns the spoken steps and the exact taps expected, e.g. ["egg","egg","stir"].
export function recipe(level, rnd = Math.random) {
  const p = params.chef(level), steps = [], taps = [];
  let lastAction = false;
  const bowl = rnd() < 0.5 ? "red" : "blue";
  for (let i = 0; i < p.steps; i++) {
    if (i > 0 && !lastAction && !(p.cond && i === p.steps - 1) && rnd() < 0.3) { const a = pick(ACTIONS, rnd); steps.push(a.say); taps.push(a.id); lastAction = true; continue; }
    lastAction = false;
    if (p.cond && i === p.steps - 1) {
      const [x, y] = [pick(PANTRY, rnd), pick(PANTRY, rnd)];
      const yy = y.id === x.id ? PANTRY[(PANTRY.indexOf(x) + 1) % PANTRY.length] : y;
      steps.push(`if the bowl is red, add one ${x.one}; if it is blue, add one ${yy.one}`);
      taps.push(bowl === "red" ? x.id : yy.id);
      continue;
    }
    const item = pick(PANTRY, rnd), n = level <= 2 ? 1 : 1 + Math.floor(rnd() * (level >= 5 ? 3 : 2));
    steps.push(`add ${WORDS[n]} ${n === 1 ? item.one : item.many}`);
    for (let k = 0; k < n; k++) taps.push(item.id);
  }
  return { steps, taps, bowl, cond: p.cond };
}
export const recipeText = (r) => r.steps.map((s, i) => (i === 0 ? "First, " : i === r.steps.length - 1 ? "Last, " : "Then, ") + s).join(". ") + ".";

/* ---------- Picnic Basket ---------- */
export const PICNIC = ["🍎", "🍌", "🍇", "🍓", "🥕", "🧀", "🥪", "🍪", "🧃", "🥨", "🍉", "🍊", "🥒", "🍐", "🥐", "🍩", "🌽", "🍋", "🥚", "🍒"];
export const PICNIC_NAMES = { "🍎": "apple", "🍌": "banana", "🍇": "grapes", "🍓": "strawberry", "🥕": "carrot", "🧀": "cheese", "🥪": "sandwich", "🍪": "cookie", "🧃": "juice box", "🥨": "pretzel", "🍉": "watermelon", "🍊": "orange", "🥒": "cucumber", "🍐": "pear", "🥐": "croissant", "🍩": "donut", "🌽": "corn", "🍋": "lemon", "🥚": "egg", "🍒": "cherries" };
export function shuffle(a, rnd = Math.random) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// Delayed recall score: right picks minus wrong picks, never below zero.
export const recallScore = (basket, picked) => Math.max(0, picked.filter((x) => basket.includes(x)).length - picked.filter((x) => !basket.includes(x)).length);

/* ---------- My Steps default routines (parents can edit) ---------- */
export const DEFAULT_ROUTINES = [
  { id: "morning", name: "Morning", icon: "🌅", mins: 20, steps: ["🚽 Use the bathroom", "🪥 Brush teeth", "👕 Get dressed", "🥣 Eat breakfast", "🎒 Pack school bag", "👟 Shoes on"] },
  { id: "homework", name: "Homework", icon: "✏️", mins: 30, steps: ["🧹 Clear the desk", "📵 TV and tablet off", "✏️ Get pencil and books", "🦉 Do Pip's daily work", "📚 Do school homework", "🎒 Put it in the bag"] },
  { id: "bedtime", name: "Bedtime", icon: "🌙", mins: 30, steps: ["🧸 Pick up toys", "🛁 Bath or shower", "🌙 Pajamas on", "🪥 Brush teeth", "📖 Read a book", "💤 Lights out"] },
];
// Parent edits come in as one step per line.
export const parseSteps = (text) => String(text || "").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 12);

/* ---------- Pip Says: an off-screen movement game ---------- */
export const SAYS_GAMES = [
  { id: "says", name: "Pip Says", how: "Do the move only when you hear \"Pip says\". If Pip doesn't say it, stay still!",
    moves: ["touch your nose", "hop on one foot", "clap three times", "touch your toes", "put your hands on your head", "spin around", "flap your wings like an owl", "stand on tiptoe", "wiggle your fingers", "touch your knees", "jump two times", "make a silly face"] },
  { id: "opposite", name: "Opposite Owl", how: "Do the OPPOSITE of what Pip says. If Pip says touch your head, touch your toes!",
    moves: [["touch your head", "touch your toes"], ["stand up tall", "crouch down low"], ["jump", "stay still"], ["look up", "look down"], ["reach to the left", "reach to the right"], ["be loud", "be very quiet"], ["walk fast", "walk slowly"], ["open your arms wide", "hug yourself"]] },
  { id: "freeze", name: "Freeze Dance", how: "Dance while the music plays. When it stops, freeze like a statue until it starts again!", moves: [] },
];

/* ---------- history ---------- */
export const isoDay = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
// Average score per week for the last n weeks (oldest first), from [{d:"YYYY-MM-DD", s}].
export function weekly(hist = [], n = 4, now = new Date()) {
  const out = [];
  for (let w = n - 1; w >= 0; w--) {
    const end = new Date(now); end.setHours(23, 59, 59, 999); end.setDate(end.getDate() - w * 7);
    const start = new Date(end); start.setDate(start.getDate() - 6); start.setHours(0, 0, 0, 0);
    const xs = hist.filter((h) => { const t = new Date(h.d + "T12:00:00"); return t >= start && t <= end; }).map((h) => h.s);
    out.push(xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10 : null);
  }
  return out;
}
