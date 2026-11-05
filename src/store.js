// Family data (kids, progress, practice log) lives in this device's local storage.
const KEY = "pip-tutor-family-v1";

const blank = () => ({ kids: [], pin: "", progress: {}, log: [], stars: {}, done: {}, lessons: {}, updated: 0 });

// Bump when built-in weeks change, so lessons Claude wrote for the old topics are made fresh.
// 2: Grade 2 English and math follow the class order.
const COURSE = 2;
function migrate(f) {
  if ((f.course || 1) < 2) for (const id of Object.keys(f.lessons || {})) if (/^(english|math)-2-/.test(id)) delete f.lessons[id];
  f.course = COURSE;
  return f;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? migrate({ ...blank(), ...JSON.parse(raw) }) : { ...blank(), course: COURSE };
  } catch {
    return blank();
  }
}

// One shared object; views mutate it and call save().
export const family = load();

export function save() {
  family.updated = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(family)); } catch {}
}

function replaceWith(data) {
  for (const k of Object.keys(family)) delete family[k];
  Object.assign(family, blank(), data);
  migrate(family);
  save();
}

export const exportJson = () => JSON.stringify({ app: "pip-tutor", version: 1, family });

export function importJson(text) {
  const parsed = JSON.parse(text);
  const data = parsed && parsed.app === "pip-tutor" ? parsed.family : null;
  if (!data || !Array.isArray(data.kids)) throw new Error("not a Pip Tutor backup");
  replaceWith(data);
}

export const resetFamily = () => replaceWith({});

// Ask the browser not to clear our data when space runs low (matters most on iPad).
navigator.storage?.persist?.().catch(() => {});
