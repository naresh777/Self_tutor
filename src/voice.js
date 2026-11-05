// Read-aloud: a calm, kid-friendly voice that reads a little slowly,
// and a speaker button that stops reading when tapped again.

export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

export const SPEEDS = [
  { id: "slow", label: "Slow", rate: 0.75 },
  { id: "gentle", label: "A little slow", rate: 0.85 },
  { id: "normal", label: "Normal", rate: 1 },
];

// Voices that sound warm and clear for children, best first. Names differ by device:
// iPad/iPhone/Mac, Android/Chrome and Windows/Edge each ship their own.
const FRIENDLY = [
  /Ava.*(Premium|Enhanced)/i, /Samantha.*(Premium|Enhanced)/i, /Zoe.*(Premium|Enhanced)/i, /Allison.*(Premium|Enhanced)/i,
  /Microsoft (Ana|Aria|Jenny|Emma|Ava).*Natural/i,
  /Google US English/i, /en-us-x-(tpf|sfg|iob)/i,
  /^Samantha/i, /^Ava/i, /^Zoe/i, /^Allison/i, /^Karen/i, /^Moira/i, /^Tessa/i,
  /Microsoft (Zira|Ana|Aria|Jenny)/i, /Google UK English Female/i,
];
const NOT_FOR_KIDS = /Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Junior|Ralph|Fred|Grandma|Grandpa|Rocko|Shelley|Flo|Eddy|Reed|Sandy/i;

export const englishVoices = () =>
  canSpeak ? speechSynthesis.getVoices().filter((v) => /^en([-_]|$)/i.test(v.lang) && !NOT_FOR_KIDS.test(v.name)) : [];

export function bestVoice(saved) {
  const vs = englishVoices();
  if (saved) { const v = vs.find((x) => x.name === saved); if (v) return v; }
  for (const re of FRIENDLY) { const v = vs.find((x) => re.test(x.name)); if (v) return v; }
  return vs.find((v) => /en[-_]US/i.test(v.lang) && v.localService) || vs.find((v) => /en[-_]US/i.test(v.lang)) || vs[0] || null;
}

let settings = () => ({});
export const useSettings = (fn) => { settings = fn; };

let current = null; // id of the button that is reading now

const clean = (t) => String(t || "")
  .replace(/×/g, " times ").replace(/÷/g, " divided by ").replace(/−/g, " minus ")
  .replace(/\p{Extended_Pictographic}\uFE0F?/gu, " ").replace(/_+/g, " blank ").replace(/\/([a-z]{1,3})\//gi, " $1 ").replace(/\.(\s*\.)+/g, ".").replace(/\s+/g, " ").trim();

// Short pieces read more smoothly, stop instantly, and dodge Chrome's cut-off on long text.
function chunks(text) {
  const parts = clean(text).split(/(?<=[.!?;:])\s+/); // only at a break followed by a space, so 3.5 and 4:30 stay whole
  const out = [];
  for (const p of parts) { const s = p.trim(); if (!s) continue; if (out.length && out.at(-1).length + s.length < 120) out[out.length - 1] += " " + s; else out.push(s); }
  return out;
}

export function sync() {
  document.querySelectorAll("[data-speak]").forEach((b) => {
    const on = b.dataset.speak === current;
    b.classList.toggle("on", on);
    const label = on ? "Stop reading" : b.dataset.label || "Read aloud";
    b.setAttribute("aria-label", label); b.title = label;
    b.setAttribute("aria-pressed", String(on));
  });
}

export function stop() {
  if (!canSpeak) return;
  current = null;
  speechSynthesis.cancel();
  sync();
}

// Tap to read; tap the same button again to stop.
export function toggle(id, text) {
  if (!canSpeak) return;
  if (current === id) { stop(); return; }
  speak(text, id);
}

export function speak(text, id = "_") {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const s = settings();
  const voice = bestVoice(s.name);
  const rate = (SPEEDS.find((x) => x.id === s.speed) || SPEEDS[1]).rate;
  const list = chunks(text);
  if (!list.length) return;
  current = id;
  list.forEach((t, i) => {
    const u = new SpeechSynthesisUtterance(t);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
    u.rate = rate; u.pitch = 1.1;
    if (i === list.length - 1) u.onend = u.onerror = () => { if (current === id) { current = null; sync(); } };
    speechSynthesis.speak(u);
  });
  sync();
}

// Say a list of pieces one at a time (e.g. the syllables of a word, then the word), slowly.
export function sayList(parts, rate = 0.6, id = "_word") {
  parts = parts.map(clean).filter(Boolean);
  if (!canSpeak || !parts.length) return;
  speechSynthesis.cancel();
  const voice = bestVoice(settings().name);
  current = id;
  parts.forEach((t, i) => {
    const u = new SpeechSynthesisUtterance(t);
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = "en-US";
    u.rate = i === parts.length - 1 && parts.length > 1 ? Math.max(rate, 0.75) : rate; u.pitch = 1.1;
    if (i === parts.length - 1) u.onend = u.onerror = () => { if (current === id) { current = null; sync(); } };
    speechSynthesis.speak(u);
  });
  sync();
}

if (canSpeak) {
  speechSynthesis.getVoices();
  speechSynthesis.addEventListener?.("voiceschanged", () => speechSynthesis.getVoices());
  // Leaving the app or switching tabs stops reading.
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
}
