// Tap-to-hear words: every word in questions, passages and lessons can be tapped to hear it,
// see it split into syllables, and hear it sounded out slowly.
import * as voice from "./voice.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Wrap each word in a tappable span. Everything else is escaped as normal text.
export function rd(text) {
  return String(text ?? "").split(/([A-Za-z]+(?:['’][A-Za-z]+)?)/).map((part, i) => (i % 2 ? `<span class="w">${esc(part)}</span>` : esc(part))).join("");
}

// Split a word into syllables with the classroom rules: split between two consonants (rab-bit),
// before a single consonant (ti-ger), keep digraphs together (fa-ther), and keep consonant + le (ta-ble).
const DIGRAPH = /^(ch|sh|th|ph|wh|gh)$/;
export function syllables(word) {
  const w = String(word).toLowerCase();
  if (!/^[a-z]+$/.test(w) || w.length <= 3) return [word];
  // Endings like -ing, -er, -ed, -ful come off whole when the base doesn't end in one vowel + one consonant (read-ing, teach-er, want-ed).
  for (const suf of ["ing", "est", "ful", "less", "ness", "er", "ed"]) {
    const base = w.slice(0, -suf.length);
    if (!w.endsWith(suf) || base.length < 3 || !/[aeiouy]/.test(base)) continue;
    if (suf === "ed" && !/[td]$/.test(base)) continue;
    if (/(th|ph)$/.test(base)) continue; // fa-ther, pan-ther
    if (/[aeiou][^aeiou]$/.test(base) && !/[aeiou]{2}[^aeiou]$/.test(base)) continue;
    if (/(.)\1$/.test(base) && !/(ss|ll|ff|zz)$/.test(base)) continue;
    return [...syllables(word.slice(0, base.length)), word.slice(base.length)];
  }
  const isV = (i) => "aeiou".includes(w[i]) || (w[i] === "y" && i > 0 && !"aeiou".includes(w[i - 1]));
  const nuclei = [];
  for (let i = 0; i < w.length; i++) if (isV(i)) { const s = i; while (i + 1 < w.length && isV(i + 1)) i++; nuclei.push([s, i]); }
  const cle = /[^aeiou]le$/.test(w);
  // Silent e at the end (cake, stone) and -ed that isn't its own beat (jumped) don't make a syllable.
  if (nuclei.length > 1) {
    const [ls, le] = nuclei.at(-1);
    if (!cle && ls === le && ls === w.length - 1 && w[ls] === "e") nuclei.pop();
    else if (/[^td]ed$/.test(w) && ls === w.length - 2 && le === ls) nuclei.pop();
    else if (/[^aeiou]es$/.test(w) && !/(ch|sh|s|x|z|ge|ce)es$/.test(w) && ls === w.length - 2 && le === ls) nuclei.pop();
  }
  if (nuclei.length < 2) return [word];
  const cuts = [];
  for (let n = 0; n < nuclei.length - 1; n++) {
    const a = nuclei[n][1] + 1, b = nuclei[n + 1][0], c = w.slice(a, b);
    let cut;
    if (cle && n === nuclei.length - 2 && c.endsWith("l") && c.length >= 2) cut = b - 2; // ta-ble, lit-tle
    else if (c.length === 0) cut = a;
    else if (c.length === 1) cut = c === "x" || (c === "w" && "oe".includes(w[a - 1])) ? b : a; // ti-ger, tax-i, vow-el
    else if (c.length === 2 && DIGRAPH.test(c)) cut = a; // fa-ther
    else if (c.startsWith("ck") || c.startsWith("ng")) cut = a + 2; // chick-en, sing-er
    else if (c.length >= 3 && DIGRAPH.test(c.slice(1, 3))) cut = a + 1; // pan-ther
    else cut = a + 1; // rab-bit, win-dow
    cuts.push(cut);
  }
  const out = [];
  let prev = 0;
  for (const c of cuts) { if (c > prev && c < word.length) { out.push(word.slice(prev, c)); prev = c; } }
  out.push(word.slice(prev));
  return out.filter(Boolean);
}

let pop = null, cur = null;
export function hideWord() {
  pop?.remove(); pop = null;
  cur?.classList.remove("on"); cur = null;
}

function showWord(el) {
  hideWord();
  const word = el.textContent.replace(/[’']/g, "'");
  const syl = syllables(word);
  cur = el; el.classList.add("on");
  pop = document.createElement("div");
  pop.className = "wordpop";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", `The word ${word}`);
  pop.innerHTML = `<div class="wp-word">${esc(word)}</div>
    ${syl.length > 1 ? `<div class="wp-syl" aria-label="${syl.length} syllables">${syl.map((s) => `<span>${esc(s)}</span>`).join("<i>·</i>")}</div><div class="wp-n">${syl.length} syllables. Clap them!</div>` : `<div class="wp-n">1 syllable</div>`}
    <div class="wp-btns"><button type="button" class="btn" data-wp="say">🔊 Say it</button><button type="button" class="btn" data-wp="slow">🐢 ${syl.length > 1 ? "Sound it out" : "Say it slowly"}</button></div>`;
  document.body.appendChild(pop);
  const r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
  const left = Math.max(8, Math.min(window.innerWidth - pw - 8, r.left + r.width / 2 - pw / 2));
  const above = r.top - ph - 10 > 8;
  pop.style.left = `${left + window.scrollX}px`;
  pop.style.top = `${(above ? r.top - ph - 10 : r.bottom + 10) + window.scrollY}px`;
  pop.querySelector('[data-wp="say"]').onclick = (e) => { e.stopPropagation(); voice.sayList([word], 0.8); };
  pop.querySelector('[data-wp="slow"]').onclick = (e) => { e.stopPropagation(); voice.sayList(syl.length > 1 ? [...syl, word] : [word], 0.55); };
  voice.sayList([word], 0.8);
}

// One listener for the whole app, so it keeps working after every re-render.
document.addEventListener("click", (e) => {
  const w = e.target.closest?.(".w");
  if (w) { e.preventDefault(); if (w === cur) hideWord(); else showWord(w); return; }
  if (pop && !e.target.closest(".wordpop")) hideWord();
});
window.addEventListener("resize", hideWord);
