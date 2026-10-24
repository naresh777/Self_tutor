// Built-in math problems for Grades 4 and 5: big numbers, multi-digit multiplying and dividing,
// fractions, decimals, measurement, angles, volume and the coordinate grid. Same shape as math.js.
import { rnd, pick, shuffle, sample, fmt, num, choice, word, NAMES } from "./util.js";

const who = () => pick(NAMES);
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
// "3/4", "2", or "1 1/2" (mixed) in simplest form.
export function fr(n, d, mixed = false) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1; n /= g; d /= g;
  if (d === 1) return String(n);
  if (mixed && Math.abs(n) > d) return `${Math.trunc(n / d)} ${Math.abs(n % d)}/${d}`;
  return `${n}/${d}`;
}
const dec = (x, p = 3) => String(Number(x.toFixed(p)));
const money = (c) => `$${(c / 100).toFixed(2)}`;
const pl = (n, one, many = one + "s") => `${fmt(n)} ${n === 1 ? one : many}`;

const U = {};

/* ---------------- whole numbers ---------------- */
function colSteps(a, b, op) {
  const A = String(a).split("").reverse(), B = String(b).split("").reverse(), names = ["ones", "tens", "hundreds", "thousands", "ten thousands", "hundred thousands"];
  const steps = []; let carry = 0;
  for (let i = 0; i < A.length; i++) {
    const x = +A[i], y = +(B[i] || 0);
    if (op === "+") { const s = x + y + carry; steps.push(`${cap(names[i])}: ${x} + ${y}${carry ? " + 1" : ""} = ${s}${s > 9 ? `, write ${s % 10} and carry 1` : ""}.`); carry = s > 9 ? 1 : 0; }
    else { const lent = carry, t = x - carry, top = lent ? `${x} − 1 (lent)` : `${x}`; carry = 0; if (t < y) { steps.push(`${cap(names[i])}: ${top} is less than ${y}, so regroup: ${t + 10} − ${y} = ${t + 10 - y}.`); carry = 1; } else if (y || t) steps.push(`${cap(names[i])}: ${lent ? `${top} = ${t}, and ` : ""}${t} − ${y} = ${t - y}.`); }
  }
  if (carry && op === "+") steps.push(`Write the last 1 in front.`);
  return steps.slice(0, 6);
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);
U.addbig = (lvl) => {
  const d = lvl === 1 ? 4 : lvl === 2 ? 5 : 6, a = rnd(10 ** (d - 1), 10 ** d - 1), b = rnd(10 ** (d - 2), 10 ** d - 1);
  if (rnd(0, 3) === 0) { const n = who(), m = pick([["visitors came to the zoo on Saturday", "on Sunday", "visitors"], ["points were scored in round one", "in round two", "points"], ["steps were walked in May", "in June", "steps"]]); return num(`${fmt(a)} ${m[0]}, and ${fmt(b)} ${m[1]}. How many ${m[2]} in all?`, a + b, ["In all means add.", ...colSteps(a, b, "+"), `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}.`]); }
  return num(`${fmt(a)} + ${fmt(b)} = ?`, a + b, ["Line up the place values and add from the ones.", ...colSteps(a, b, "+"), `The sum is ${fmt(a + b)}.`]);
};
U.subbig = (lvl) => {
  const d = lvl === 1 ? 4 : lvl === 2 ? 5 : 6, a = rnd(10 ** (d - 1) * 2, 10 ** d - 1), b = rnd(10 ** (d - 2), a - 1);
  const zeros = lvl === 3 && rnd(0, 1) ? Math.round(a / 1000) * 1000 : a, bb = Math.min(b, zeros - 1);
  return num(`${fmt(zeros)} − ${fmt(bb)} = ?`, zeros - bb, ["Line up the place values and subtract from the ones.", ...colSteps(zeros, bb, "-"), `Check: ${fmt(zeros - bb)} + ${fmt(bb)} = ${fmt(zeros)}.`]);
};
U.mulcmp = (lvl) => {
  const a = rnd(3, 12), t = rnd(2, 9), n = who(), m = pick(NAMES.filter((x) => x !== n)), [thing] = pick([["stickers"], ["books"], ["shells"], ["points"]]);
  if (rnd(0, 1)) return num(`${m} has ${a} ${thing}. ${n} has ${t} times as many. How many ${thing} does ${n} have?`, a * t, ["\"Times as many\" means multiply.", `${a} × ${t} = ${a * t}.`], { visual: { type: "strip", parts: Array(Math.min(t, 5)).fill(a), total: t > 5 ? "?" : a * t } });
  return num(`${n} has ${a * t} ${thing}. That is ${t} times as many as ${m}. How many does ${m} have?`, a, [`${n}'s amount is ${t} groups of ${m}'s amount.`, `Divide: ${a * t} ÷ ${t} = ${a}.`]);
};
U.estmul = (lvl) => {
  const a = rnd(12, lvl > 1 ? 989 : 98), b = rnd(3, lvl > 1 ? 89 : 9), r = (x) => { const p = 10 ** (String(x).length - 1); return Math.round(x / p) * p; };
  const ra = r(a), rb = r(b);
  return num(`Estimate ${a} × ${b} by rounding each number to its greatest place first.`, ra * rb, [`${a} rounds to ${fmt(ra)}.`, `${b} rounds to ${rb}.`, `${fmt(ra)} × ${rb} = ${fmt(ra * rb)}.`], { hint: "Round each factor so it has just one non-zero digit." });
};
U.remctx = (lvl) => {
  const per = rnd(4, 9), q = rnd(3, 12), r = rnd(1, per - 1), total = per * q + r, n = who();
  const k = rnd(0, 2);
  if (k === 0) return num(`${total} students are going on a trip. Each van holds ${per}. How many vans are needed so everyone can go?`, q + 1, [`${total} ÷ ${per} = ${q} R${r}.`, `The ${r} left over still need a van, so round up.`, `${q + 1} vans.`]);
  if (k === 1) return num(`${n} has ${total} beads and makes bracelets with ${per} beads each. How many whole bracelets can ${n} make?`, q, [`${total} ÷ ${per} = ${q} R${r}.`, `The ${r} left over beads aren't enough for another bracelet.`, `${q} bracelets.`]);
  return num(`${total} crayons are shared equally into ${per} boxes. How many crayons are left over?`, r, [`${total} ÷ ${per} = ${q} R${r}.`, `The remainder is what's left over: ${r}.`]);
};
const factorsOf = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
U.factors = (lvl) => {
  const n = rnd(12, lvl > 1 ? 100 : 48), fs = factorsOf(n), k = rnd(0, 3);
  if (k === 0) { const p = pick([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]), c = pick([4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 27, 33, 35, 39, 49, 51, 57, 91]); const isP = rnd(0, 1) === 1, x = isP ? p : c; return choice(`Is ${x} prime or composite?`, isP ? "prime" : "composite", [isP ? "composite" : "prime"], ["A prime number has exactly 2 factors: 1 and itself.", isP ? `${x} has only the factors 1 and ${x}, so it is prime.` : `${x} = ${factorsOf(x)[1]} × ${x / factorsOf(x)[1]}, so it has more than 2 factors: composite.`], { keepOrder: ["prime", "composite"] }); }
  if (k === 1) return num(`How many factors does ${n} have?`, fs.length, ["List factor pairs: 1 × " + n + ", and so on.", `The factors are ${fs.join(", ")}.`, `That's ${fs.length} factors.`]);
  if (k === 2) { const f = pick(fs.slice(1, -1).length ? fs.slice(1, -1) : fs), not = pick(Array.from({ length: 12 }, (_, i) => i + 2).filter((d) => n % d)); return choice(`Which number is a factor of ${n}?`, f, [not, ...sample(Array.from({ length: 12 }, (_, i) => i + 2).filter((d) => n % d && d !== not), 2)], ["A factor divides the number with no remainder.", `${n} ÷ ${f} = ${n / f}, so ${f} is a factor.`]); }
  const m = rnd(3, 12), mult = m * rnd(2, 9);
  return choice(`Which number is a multiple of ${m}?`, mult, [mult + 1, mult - 1, mult + Math.ceil(m / 2)].filter((x) => x % m), [`Multiples of ${m} are what you get when you multiply ${m} by 1, 2, 3 …`, `${m} × ${mult / m} = ${mult}.`]);
};

/* ---------------- fractions ---------------- */
const DEN4 = [2, 3, 4, 5, 6, 8, 10, 12, 100];
U.fraceq4 = (lvl) => {
  const d = pick([2, 3, 4, 5, 6]), n = rnd(1, d - 1), k = rnd(2, lvl > 1 ? 6 : 4), k2 = rnd(0, 2);
  if (k2 === 0) return num(`${n}/${d} = ?/${d * k}`, n * k, [`${d} × ${k} = ${d * k}, so multiply the top by ${k} too.`, `${n} × ${k} = ${n * k}.`, `${n}/${d} = ${n * k}/${d * k}.`], { visual: { type: "fraction", parts: d, shaded: n, shape: "rect" } });
  if (k2 === 1) return word(`Write ${n * k}/${d * k} in simplest form.`, `${n}/${d}`, [`Find a number that divides the top and bottom: ${k}.`, `${n * k} ÷ ${k} = ${n}, ${d * k} ÷ ${k} = ${d}.`, `${n}/${d}.`]);
  return choice(`Which fraction is equivalent to ${n}/${d}?`, `${n * k}/${d * k}`, [`${n + k}/${d + k}`, `${n * k}/${d + k}`, `${n}/${d * k}`], [`Multiply the top and bottom by the same number.`, `${n}/${d} × ${k}/${k} = ${n * k}/${d * k}.`], { visual: { type: "fraction", parts: d, shaded: n, shape: "rect" } });
};
U.fraccmp4 = (lvl) => {
  let a, b, c, d;
  do { b = pick([2, 3, 4, 5, 6, 8, 10, 12]); d = pick([2, 3, 4, 5, 6, 8, 10, 12]); a = rnd(1, b - 1); c = rnd(1, d - 1); } while (a * d === c * b && rnd(0, 3));
  const s = a * d > c * b ? ">" : a * d < c * b ? "<" : "=", L = (b * d) / gcd(b, d);
  return choice(`Which sign makes this true?\n${a}/${b} ___ ${c}/${d}`, s, [">", "<", "="], [b === d ? "Same denominators: compare the numerators." : a === c ? "Same numerators: fewer parts means bigger parts." : `Rename with a common denominator: ${L}.`, b === d || a === c ? `${a}/${b} ${s} ${c}/${d}.` : `${a}/${b} = ${(a * L) / b}/${L} and ${c}/${d} = ${(c * L) / d}/${L}.`, `So ${a}/${b} ${s} ${c}/${d}.`], { keepOrder: [">", "<", "="] });
};
U.fracadd = (lvl, arg) => {
  const like = arg !== "unlike", sub = rnd(0, 1) === 1;
  let b = pick(like ? [3, 4, 5, 6, 8, 10, 12] : [2, 3, 4, 5, 6]), d = like ? b : pick([2, 3, 4, 6, 8, 10, 12].filter((x) => x !== b));
  let a = rnd(1, b - 1), c = rnd(1, d - 1);
  if (sub && a * d === c * b) a = a === 1 ? (b > 2 ? 2 : 1) : a - 1;
  if (sub && a * d === c * b) return U.fracadd(lvl, arg);
  if (sub && a * d < c * b) [a, b, c, d] = [c, d, a, b];
  const L = (b * d) / gcd(b, d), A = (a * L) / b, C = (c * L) / d, R = sub ? A - C : A + C;
  const ans = fr(R, L, true);
  return word(`${a}/${b} ${sub ? "−" : "+"} ${c}/${d} = ? Write it in simplest form.`, ans, [b === d ? "The denominators match, so keep the denominator." : `Find a common denominator: ${L}. ${a}/${b} = ${A}/${L}, ${c}/${d} = ${C}/${L}.`, `${sub ? "Subtract" : "Add"} the numerators: ${A} ${sub ? "−" : "+"} ${C} = ${R}, so ${R}/${L}.`, `In simplest form: ${ans}.`], { visual: b === d && L <= 12 ? { type: "fractionline", parts: L, at: R, wholes: R > L ? 2 : 1 } : null });
};
U.commonden = (lvl) => {
  const b = pick([2, 3, 4, 5, 6]), d = pick([3, 4, 6, 8, 10, 12].filter((x) => x !== b)), L = (b * d) / gcd(b, d);
  if (rnd(0, 1)) return num(`What is the least common denominator of 1/${b} and 1/${d}?`, L, [`List multiples of ${b}: ${[1, 2, 3, 4, 5, 6].map((k) => k * b).join(", ")}.`, `List multiples of ${d}: ${[1, 2, 3, 4].map((k) => k * d).join(", ")}.`, `The smallest one they share is ${L}.`]);
  return U.fracadd(lvl, "unlike");
};
U.mixed = (lvl) => {
  const d = pick([2, 3, 4, 5, 6, 8]), w = rnd(1, 4), n = rnd(1, d - 1), imp = w * d + n, k = rnd(0, 2);
  if (k === 0) return word(`Write ${imp}/${d} as a mixed number.`, fr(imp, d, true), [`How many groups of ${d} fit in ${imp}? ${w}, with ${n} left.`, `${imp}/${d} = ${w} ${n}/${d}${fr(imp, d, true) !== `${w} ${n}/${d}` ? ` = ${fr(imp, d, true)}` : ""}.`], { visual: { type: "fractionline", parts: d, wholes: Math.min(3, w + 1), at: Math.min(imp, d * 3) } });
  if (k === 1) return word(`Write ${w} ${n}/${d} as an improper fraction.`, `${imp}/${d}`, [`${pl(w, "whole")} = ${w * d}/${d}.`, `${w * d}/${d} + ${n}/${d} = ${imp}/${d}.`]);
  const w2 = rnd(1, 3), n2 = rnd(1, d - 1), tot = imp + w2 * d + n2;
  return word(`${w} ${n}/${d} + ${w2} ${n2}/${d} = ? Write it as a mixed number.`, fr(tot, d, true), [`Add the wholes: ${w} + ${w2} = ${w + w2}.`, `Add the fractions: ${n}/${d} + ${n2}/${d} = ${n + n2}/${d}${n + n2 >= d ? ` = 1 ${fr(n + n2 - d, d) === "0" ? "" : fr(n + n2 - d, d)}`.trimEnd() : ""}.`, `Total: ${fr(tot, d, true)}.`]);
};
U.fracwhole = (lvl) => {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = rnd(1, d - 1), w = rnd(2, 9), R = n * w;
  return word(`${w} × ${n}/${d} = ? Write it as a fraction or mixed number in simplest form.`, fr(R, d, true), [`${w} × ${n}/${d} means ${w} groups of ${n}/${d}.`, `Multiply the numerator: ${w} × ${n} = ${R}, so ${R}/${d}.`, `Simplest form: ${fr(R, d, true)}.`], { accept: [`${R}/${d}`, fr(R, d)] });
};
U.fracwp = (lvl, arg) => {
  const n = who(), k = rnd(0, arg === "5" ? 3 : 2);
  if (k === 0) { const d = pick([4, 6, 8, 10, 12]), a = rnd(1, d - 2), b = rnd(1, d - a - 1); return word(`${n} ate ${a}/${d} of a pizza and a friend ate ${b}/${d}. How much of the pizza did they eat together?`, fr(a + b, d), ["Together means add.", `${a}/${d} + ${b}/${d} = ${a + b}/${d}.`, `Simplest form: ${fr(a + b, d)}.`], { accept: [`${a + b}/${d}`] }); }
  if (k === 1) { const d = pick([2, 3, 4, 8]), w = rnd(2, 8), n2 = rnd(1, d - 1); return word(`Each batch of muffins uses ${n2}/${d} cup of sugar. How much sugar for ${w} batches?`, fr(w * n2, d, true), [`Multiply: ${w} × ${n2}/${d} = ${w * n2}/${d}.`, `As a mixed number: ${fr(w * n2, d, true)} cups.`], { accept: [`${w * n2}/${d}`] }); }
  if (k === 2) { const d = pick([4, 6, 8, 10, 12]), a = rnd(3, d - 1), b = rnd(1, a - 1); return word(`A ribbon is ${a}/${d} yard long. ${n} cuts off ${b}/${d} yard. How much is left?`, fr(a - b, d), ["Cutting off means subtract.", `${a}/${d} − ${b}/${d} = ${a - b}/${d}.`, `Simplest form: ${fr(a - b, d)}.`], { accept: [`${a - b}/${d}`] }); }
  const b = pick([2, 3, 4]), d = pick([3, 4, 6, 8].filter((x) => x !== b)), L = (b * d) / gcd(b, d);
  return word(`${n} walked 1/${b} mile in the morning and 1/${d} mile after school. How far in all?`, fr(L / b + L / d, L, true), [`Common denominator: ${L}.`, `1/${b} = ${L / b}/${L} and 1/${d} = ${L / d}/${L}.`, `${L / b} + ${L / d} = ${L / b + L / d}, so ${fr(L / b + L / d, L, true)} mile.`]);
};
U.fracdiv = (lvl) => {
  const a = rnd(1, 9), b = rnd(2, 8), n = who();
  if (rnd(0, 1)) return word(`${a} pizzas are shared equally by ${b} friends. How much pizza does each friend get?`, fr(a, b, true), [`Sharing means divide: ${a} ÷ ${b}.`, `A fraction is a division: ${a} ÷ ${b} = ${a}/${b}.`, `Each gets ${fr(a, b, true)} pizza.`], { accept: [`${a}/${b}`] });
  return word(`Write ${a} ÷ ${b} as a fraction.`, `${a}/${b}`, ["The top number is divided by the bottom number.", `${a} ÷ ${b} = ${a}/${b}.`], { accept: [fr(a, b, true), fr(a, b)] });
};
U.fracmul = (lvl) => {
  const b = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 5, 6, 8]), a = rnd(1, b - 1), c = rnd(1, d - 1);
  if (rnd(0, 2) === 0) { const w = rnd(2, 12) * b; return num(`What is ${a}/${b} of ${w}?`, (a * w) / b, [`Find 1/${b} of ${w}: ${w} ÷ ${b} = ${w / b}.`, `Then ${a} of those: ${a} × ${w / b} = ${(a * w) / b}.`]); }
  return word(`${a}/${b} × ${c}/${d} = ? Write it in simplest form.`, fr(a * c, b * d), ["Multiply the numerators, then multiply the denominators.", `${a} × ${c} = ${a * c} and ${b} × ${d} = ${b * d}: ${a * c}/${b * d}.`, `Simplest form: ${fr(a * c, b * d)}.`], { accept: [`${a * c}/${b * d}`], visual: { type: "area", rows: b, cols: d, grid: true } });
};
U.fracarea = (lvl) => {
  const b = pick([2, 3, 4]), a = rnd(1, b - 1), w = rnd(2, 6);
  return word(`A rectangle is ${w} feet long and ${a}/${b} foot wide. What is its area in square feet?`, fr(w * a, b, true), ["Area = length × width.", `${w} × ${a}/${b} = ${w * a}/${b}.`, `${fr(w * a, b, true)} square feet.`], { accept: [`${w * a}/${b}`] });
};
U.unitdiv = (lvl) => {
  const d = pick([2, 3, 4, 5, 6, 8]), w = rnd(2, 9);
  if (rnd(0, 1)) return num(`${w} ÷ 1/${d} = ?`, w * d, [`How many 1/${d}s fit in ${w}?`, `Each whole holds ${d} of them, so ${w} × ${d} = ${w * d}.`], { visual: { type: "fractionline", parts: d, wholes: Math.min(3, w) } });
  return word(`1/${d} ÷ ${w} = ?`, `1/${d * w}`, [`Split 1/${d} into ${w} equal parts.`, `Each part is 1/${d * w}.`]);
};

/* ---------------- decimals ---------------- */
U.dec100 = (lvl) => {
  const k = rnd(0, 2), h = rnd(1, 99);
  if (k === 0) return choice(`Which decimal equals ${h}/100?`, dec(h / 100), [dec(h / 10), String(h), dec(h / 1000)].filter((x) => x !== dec(h / 100)), ["Hundredths have two places after the decimal point.", `${h}/100 = ${dec(h / 100)}.`], { visual: { type: "area", rows: 10, cols: 10, grid: true } });
  if (k === 1) { const t = rnd(1, 9); return word(`Write ${t}/10 as hundredths: ?/100`, String(t * 10), [`1 tenth = 10 hundredths.`, `${t}/10 = ${t * 10}/100.`]); }
  const c = rnd(101, 999), x = c / 100;
  return word(`Write ${dec(x)} as a fraction with a denominator of 100.`, `${c}/100`, ["The last digit is in the hundredths place.", `${dec(x)} = ${c}/100, or ${Math.floor(c / 100)} ${c % 100}/100.`], { accept: [`${Math.floor(c / 100)} ${c % 100}/100`] });
};
U.deccmp = (lvl, arg) => {
  const p = arg === "3" ? 3 : 2, a = rnd(1, 10 ** p * 5) / 10 ** p, b = pick([rnd(1, 10 ** p * 5) / 10 ** p, Math.round(a * 10) / 10, a + 1 / 10 ** p]);
  const s = a > b ? ">" : a < b ? "<" : "=";
  if (rnd(0, 1)) return choice(`Which sign makes this true?\n${dec(a)} ___ ${dec(b)}`, s, [">", "<", "="], ["Line up the decimal points and compare place by place.", `Add zeros so they have the same number of places: ${a.toFixed(p)} and ${b.toFixed(p)}.`, `So ${dec(a)} ${s} ${dec(b)}.`], { keepOrder: [">", "<", "="] });
  const set = [...new Set([a, b, rnd(1, 10 ** p * 5) / 10 ** p, Math.round(a * 10) / 10 + 0.05])].slice(0, 4), asc = [...set].sort((x, y) => x - y).map((x) => dec(x)).join(", ");
  return choice(`Which list is in order from least to greatest?\n${shuffle(set).map((x) => dec(x)).join("   ")}`, asc, [[...set].sort((x, y) => y - x).map((x) => dec(x)).join(", "), [...set].sort((x, y) => String(x).length - String(y).length || x - y).map((x) => dec(x)).join(", "), shuffle(set).map((x) => dec(x)).join(", ")], ["Compare the ones, then tenths, then hundredths.", `In order: ${asc}.`]);
};
U.dec1000 = (lvl) => {
  const x = rnd(1001, 99999) / 1000, digits = x.toFixed(3), k = rnd(0, 2), places = ["tenths", "hundredths", "thousandths"];
  if (k === 0) { const i = rnd(0, 2), d = digits.split(".")[1][i]; return num(`What digit is in the ${places[i]} place of ${digits}?`, d, ["After the decimal point: tenths, hundredths, thousandths.", `The ${places[i]} digit is ${d}.`]); }
  if (k === 1) { const w = Math.floor(x), [t, h, th] = digits.split(".")[1].split(""); return choice(`Which is the expanded form of ${digits}?`, `${w} + ${t}/10 + ${h}/100 + ${th}/1000`.replace(/ \+ 0\/\d+/g, ""), [`${w} + ${t}/100 + ${h}/10 + ${th}/1000`.replace(/ \+ 0\/\d+/g, ""), `${w} + ${t} + ${h} + ${th}`, `${w}/10 + ${t}/100 + ${h}/1000 + ${th}`], ["Each digit times its place value.", `${digits} = ${w} + ${t}/10 + ${h}/100 + ${th}/1000.`]); }
  const th = rnd(1, 999);
  return word(`Write ${th}/1000 as a decimal.`, (th / 1000).toFixed(3).replace(/0+$/, ""), ["Thousandths have three places after the decimal point.", `${th}/1000 = ${(th / 1000).toFixed(3)}.`], { accept: [(th / 1000).toFixed(3)] });
};
U.decround = (lvl) => {
  const x = rnd(1001, 99999) / 1000, to = pick(lvl === 1 ? [0] : [0, 1, 2]), names = ["whole number", "tenth", "hundredth"];
  if (rnd(0, 2) === 0) return U.deccmp(lvl, "3");
  const ans = x.toFixed(to), next = x.toFixed(3)[x.toFixed(3).indexOf(".") + 1 + to];
  return word(`Round ${x.toFixed(3)} to the nearest ${names[to]}.`, String(Number(ans)), [`Look at the digit to the right of the ${names[to]} place: ${next}.`, +next >= 5 ? "It's 5 or more, so round up." : "It's less than 5, so keep the digit the same.", `${x.toFixed(3)} rounds to ${ans}.`], { accept: [ans] });
};
U.decadd = (lvl) => {
  const p = lvl === 1 ? 1 : 2, a = rnd(10, 999) / 10 ** p, b = rnd(10, 999) / 10 ** p, sub = rnd(0, 1) === 1, [x, y] = sub && b > a ? [b, a] : [a, b];
  const ans = dec(sub ? x - y : x + y, 2);
  if (rnd(0, 3) === 0) { const n = who(), c1 = Math.round(x * 100), c2 = Math.round(y * 100); return num(`${n} buys a book for ${money(c1)} and a pen for ${money(c2)}. How much in all, in dollars?`, dec((c1 + c2) / 100, 2), ["Line up the decimal points and add.", `${money(c1)} + ${money(c2)} = ${money(c1 + c2)}.`], { accept: [money(c1 + c2), ((c1 + c2) / 100).toFixed(2)] }); }
  return num(`${dec(x)} ${sub ? "−" : "+"} ${dec(y)} = ?`, ans, ["Line up the decimal points. Fill empty places with zeros.", `${x.toFixed(p)} ${sub ? "−" : "+"} ${y.toFixed(p)} = ${(sub ? x - y : x + y).toFixed(p)}.`]);
};
U.decmul = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const a = rnd(11, 99) / 10, b = rnd(2, 9); return num(`${dec(a)} × ${b} = ?`, dec(a * b), [`Multiply as if there were no decimal: ${Math.round(a * 10)} × ${b} = ${Math.round(a * 10) * b}.`, `${dec(a)} has 1 decimal place, so the answer does too: ${dec(a * b)}.`]); }
  if (k === 1) { const a = rnd(2, 9) / 10, b = rnd(2, 9) / 10; return num(`${dec(a)} × ${dec(b)} = ?`, dec(a * b), [`${Math.round(a * 10)} × ${Math.round(b * 10)} = ${Math.round(a * 10) * Math.round(b * 10)}.`, `Tenths × tenths = hundredths, so 2 decimal places: ${dec(a * b)}.`], { visual: { type: "area", rows: 10, cols: 10 } }); }
  const a = rnd(101, 999) / 100, p = pick([10, 100, 1000]);
  return num(`${dec(a)} × ${fmt(p)} = ?`, dec(a * p), [`Multiplying by ${fmt(p)} moves each digit ${String(p).length - 1} place${p > 10 ? "s" : ""} to the left.`, `${dec(a)} × ${fmt(p)} = ${dec(a * p)}.`]);
};
U.decdiv = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const q = rnd(11, 99) / 10, b = rnd(2, 9), a = dec(q * b); return num(`${a} ÷ ${b} = ?`, dec(q), [`Divide as with whole numbers: ${Math.round(q * b * 10)} ÷ ${b} = ${Math.round(q * 10)}.`, `Put the decimal point right above where it is in ${a}: ${dec(q)}.`]); }
  if (k === 1) { const q = rnd(2, 40), b = pick([0.2, 0.5, 0.4, 0.25]), a = dec(q * b); return num(`${a} ÷ ${b} = ?`, q, [`Make the divisor a whole number: multiply both by ${b === 0.25 ? 100 : 10}.`, `${dec(+a * (b === 0.25 ? 100 : 10))} ÷ ${dec(b * (b === 0.25 ? 100 : 10))} = ${q}.`]); }
  const a = rnd(101, 9999) / 100, p = pick([10, 100]);
  return num(`${dec(a)} ÷ ${p} = ?`, dec(a / p, 4), [`Dividing by ${p} moves each digit ${p === 10 ? "1 place" : "2 places"} to the right.`, `${dec(a)} ÷ ${p} = ${dec(a / p, 4)}.`]);
};
U.decwp = (lvl) => {
  const n = who(), k = rnd(0, 2);
  if (k === 0) { const price = rnd(105, 899), q = rnd(2, 6); return num(`A notebook costs ${money(price)}. How much do ${q} notebooks cost, in dollars?`, dec((price * q) / 100, 2), [`Multiply: ${money(price)} × ${q}.`, `= ${money(price * q)}.`], { accept: [money(price * q), ((price * q) / 100).toFixed(2)] }); }
  if (k === 1) { const each = rnd(105, 499), q = rnd(2, 6); return num(`${n} and ${q - 1} friends share a ${money(each * q)} bill equally. How much does each pay, in dollars?`, dec(each / 100, 2), [`Divide by ${q} people.`, `${money(each * q)} ÷ ${q} = ${money(each)}.`], { accept: [money(each), (each / 100).toFixed(2)] }); }
  const a = rnd(105, 999) / 100, b = rnd(105, 999) / 100;
  return num(`${n} ran ${dec(a)} km on Monday and ${dec(b)} km on Tuesday. How many more km on the longer day?`, dec(Math.abs(a - b), 2), ["How many more means subtract.", `${dec(Math.max(a, b))} − ${dec(Math.min(a, b))} = ${dec(Math.abs(a - b), 2)} km.`]);
};
U.pow10 = (lvl) => {
  const k = rnd(0, 2), e = rnd(1, lvl > 1 ? 5 : 3);
  if (k === 0) return num(`What is 10^${e} (10 to the power of ${e})?`, 10 ** e, [`Multiply ${e} tens: ${Array(e).fill(10).join(" × ")}.`, `= ${fmt(10 ** e)} (a 1 and ${e} zero${e > 1 ? "s" : ""}).`]);
  if (k === 1) { const a = rnd(2, 99); return num(`${a} × 10^${e} = ?`, a * 10 ** e, [`10^${e} = ${fmt(10 ** e)}.`, `Multiplying by ${fmt(10 ** e)} adds ${e} zero${e > 1 ? "s" : ""}: ${fmt(a * 10 ** e)}.`]); }
  const n = pick([3, 4, 5]), d = pick([10, 100]);
  return num(`How many times greater is the 7 in 7${"0".repeat(n)} than the 7 in 7${"0".repeat(n - (d === 10 ? 1 : 2))}?`, d, ["Each place is 10 times the place to its right.", `The first 7 is ${d === 10 ? "1 place" : "2 places"} further left, so it is ${d} times greater.`]);
};
U.div2 = (lvl) => {
  const b = pick(Array.from({ length: lvl > 1 ? 39 : 15 }, (_, i) => i + 11).filter((x) => x % 10)), q = rnd(lvl > 1 ? 12 : 4, lvl > 1 ? 99 : 20), r = lvl === 3 ? rnd(0, b - 1) : 0, a = b * q + r;
  return word(`${fmt(a)} ÷ ${b} = ? ${r ? "Write any remainder like 12 R3." : ""}`.trim(), r ? `${q} R${r}` : String(q), [`Estimate: ${b} is close to ${Math.round(b / 10) * 10}.`, `${b} × ${q} = ${fmt(b * q)}.`, r ? `${fmt(a)} − ${fmt(b * q)} = ${r} left over: ${q} R${r}.` : `So ${fmt(a)} ÷ ${b} = ${q}.`], { accept: r ? [`${q} r${r}`, `${q}r${r}`, `${q} remainder ${r}`] : [] });
};
U.estdiv = (lvl) => {
  const b = pick([12, 19, 21, 29, 31, 39, 41, 48, 52, 61, 68, 72, 79]), rb = Math.round(b / 10) * 10, q = rnd(3, 30), ra = rb * q, a = ra + rnd(-rb / 3, rb / 3) | 0;
  return num(`Estimate ${fmt(a)} ÷ ${b} using compatible numbers.`, q, [`${b} is close to ${rb}.`, `${fmt(a)} is close to ${fmt(ra)}, which divides easily by ${rb}.`, `${fmt(ra)} ÷ ${rb} = ${q}.`], { hint: `Round ${b} to the nearest ten first.` });
};
U.ooo = (lvl) => {
  const a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9), d = rnd(1, 9), k = rnd(0, 3);
  if (k === 0) return num(`${a} + ${b} × ${c} = ?`, a + b * c, ["Multiply before you add.", `${b} × ${c} = ${b * c}.`, `${a} + ${b * c} = ${a + b * c}.`]);
  if (k === 1) return num(`(${a} + ${b}) × ${c} = ?`, (a + b) * c, ["Parentheses first.", `${a} + ${b} = ${a + b}.`, `${a + b} × ${c} = ${(a + b) * c}.`]);
  if (k === 2) return num(`${a * c} ÷ ${c} + ${b} × ${d} = ?`, a + b * d, ["Multiply and divide from left to right, then add.", `${a * c} ÷ ${c} = ${a} and ${b} × ${d} = ${b * d}.`, `${a} + ${b * d} = ${a + b * d}.`]);
  return num(`[${a} + (${b} × ${c})] − ${d} = ?`, a + b * c - d, ["Work from the inside out: parentheses, then brackets.", `${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${a + b * c}.`, `${a + b * c} − ${d} = ${a + b * c - d}.`]);
};
U.expr = (lvl) => {
  const a = rnd(2, 9), b = rnd(2, 20), c = rnd(2, 6), k = rnd(0, 2);
  if (k === 0) return choice(`Which expression means "add ${a} and ${b}, then multiply by ${c}"?`, `(${a} + ${b}) × ${c}`, [`${a} + ${b} × ${c}`, `${c} × ${a} + ${b}`, `${a} × ${b} + ${c}`], ["\"Then\" means the adding happens first, so it needs parentheses.", `(${a} + ${b}) × ${c}.`]);
  if (k === 1) return choice(`Which words describe ${c} × (${b} − ${a})?`, `${c} times the difference of ${b} and ${a}`, [`${c} times ${b}, minus ${a}`, `the sum of ${c} and ${b}, minus ${a}`, `${b} minus ${a} times ${c}`], ["The parentheses group the subtraction.", `So it's ${c} times the difference.`]);
  return choice(`Without solving, how does ${c} × (${b} + ${a}) compare to ${b} + ${a}?`, `It is ${c} times as large.`, [`It is ${c} more.`, "They are equal.", `It is ${c} less.`], [`${c} × (something) is ${c} copies of it.`, `So it is ${c} times as large.`]);
};

/* ---------------- measurement and geometry ---------------- */
const CONV = [["feet", "inches", 12], ["yards", "feet", 3], ["hours", "minutes", 60], ["minutes", "seconds", 60], ["pounds", "ounces", 16], ["gallons", "quarts", 4], ["meters", "centimeters", 100], ["kilometers", "meters", 1000], ["kilograms", "grams", 1000], ["liters", "milliliters", 1000], ["days", "hours", 24], ["weeks", "days", 7]];
U.convert = (lvl, arg) => {
  const [big, small, f] = pick(CONV), n = rnd(2, lvl > 1 ? 12 : 6);
  if (arg === "5" && rnd(0, 1)) { const m = n * f + rnd(1, f - 1); return word(`Write ${fmt(m)} ${small} as ${big} and ${small}. Example: 3 ${big} 5 ${small}`, `${Math.floor(m / f)} ${big} ${m % f} ${small}`, [`1 ${big.replace(/s$/, "")} = ${f} ${small}.`, `${fmt(m)} ÷ ${f} = ${Math.floor(m / f)} R${m % f}.`, `${Math.floor(m / f)} ${big} ${m % f} ${small}.`], { accept: [`${Math.floor(m / f)} ${m % f}`] }); }
  if (rnd(0, 1)) return num(`${n} ${big} = ? ${small}`, n * f, [`1 ${big.replace(/s$/, "")} = ${f} ${small}.`, `${n} × ${f} = ${fmt(n * f)} ${small}.`], { visual: { type: "table", rows: [[big, "1", "2", "3", String(n)], [small, String(f), String(2 * f), String(3 * f), "?"]] } });
  return num(`${fmt(n * f)} ${small} = ? ${big}`, n, [`1 ${big.replace(/s$/, "")} = ${f} ${small}.`, `Going to a bigger unit, divide: ${fmt(n * f)} ÷ ${f} = ${n}.`]);
};
U.areaperim = (lvl) => {
  const l = rnd(3, lvl > 1 ? 25 : 12), w = rnd(2, l), k = rnd(0, 3), unit = pick(["ft", "m", "cm", "in"]);
  if (k === 0) return num(`A rectangle is ${l} ${unit} long and ${w} ${unit} wide. What is its area in square ${unit}?`, l * w, ["Area = length × width.", `${l} × ${w} = ${l * w} square ${unit}.`], { picture: { type: "area", rows: Math.min(w, 12), cols: Math.min(l, 14), grid: false, labels: true, unit } });
  if (k === 1) return num(`A rectangle is ${l} ${unit} long and ${w} ${unit} wide. What is its perimeter in ${unit}?`, 2 * (l + w), ["Perimeter = 2 × length + 2 × width.", `2 × ${l} + 2 × ${w} = ${2 * l} + ${2 * w} = ${2 * (l + w)} ${unit}.`], { picture: { type: "area", rows: Math.min(w, 12), cols: Math.min(l, 14), grid: false, labels: true, unit } });
  if (k === 2) return num(`A rectangle has an area of ${l * w} square ${unit}. Its length is ${l} ${unit}. What is its width?`, w, ["Area = length × width, so width = area ÷ length.", `${l * w} ÷ ${l} = ${w} ${unit}.`]);
  return num(`A rectangle has a perimeter of ${2 * (l + w)} ${unit}. Its length is ${l} ${unit}. What is its width?`, w, [`Half the perimeter is length + width: ${l + w}.`, `${l + w} − ${l} = ${w} ${unit}.`]);
};
U.lineplot = (lvl) => {
  const d = pick([2, 4, 8]), labels = Array.from({ length: d + 1 }, (_, i) => (i === 0 ? "0" : i === d ? "1" : fr(i, d))).slice(1), vals = labels.map(() => rnd(0, 5));
  if (vals.every((v) => !v)) vals[0] = 2;
  const pic = { type: "graph", kind: "dot", labels, values: vals, title: "Lengths of ribbons (inches)" }, k = rnd(0, 2), i = vals.findIndex((v) => v);
  if (k === 0) return num(`Use the line plot. How many ribbons are ${labels[i]} inch long?`, vals[i], ["Each × is one ribbon.", `Count the × marks above ${labels[i]}: ${vals[i]}.`], { picture: pic });
  if (k === 1) return num("Use the line plot. How many ribbons were measured in all?", vals.reduce((a, b) => a + b, 0), ["Count every ×.", `${vals.filter((v) => v).join(" + ")} = ${vals.reduce((a, b) => a + b, 0)}.`], { picture: pic });
  const big = vals.map((v, j) => (v ? j : -1)).filter((j) => j >= 0), lo = big[0], hi = big[big.length - 1];
  return word("Use the line plot. What is the difference between the longest and shortest ribbon, in inches?", fr(hi - lo, d), [`Longest: ${labels[hi]}. Shortest: ${labels[lo]}.`, `${labels[hi]} − ${labels[lo]} = ${fr(hi - lo, d)}.`], { picture: pic, accept: [`${hi - lo}/${d}`] });
};
U.moneytime = (lvl) => {
  const n = who(), k = rnd(0, 2);
  if (k === 0) { const paid = pick([1000, 2000, 500]), cost = rnd(150, paid - 50); return num(`${n} pays for a ${money(cost)} toy with a ${money(paid)} bill. How much change, in dollars?`, dec((paid - cost) / 100, 2), [`Change = amount paid − cost.`, `${money(paid)} − ${money(cost)} = ${money(paid - cost)}.`], { accept: [money(paid - cost), ((paid - cost) / 100).toFixed(2)] }); }
  if (k === 1) { const h = rnd(1, 10), m = pick([0, 15, 30, 45]), dur = rnd(25, 150), end = h * 60 + m + dur, eh = Math.floor(end / 60), em = end % 60; const t = `${((eh - 1) % 12) + 1}:${String(em).padStart(2, "0")}`; return word(`A movie starts at ${h}:${String(m).padStart(2, "0")} and lasts ${dur} minutes. What time does it end? Write it like 3:45.`, t, [`${dur} minutes = ${Math.floor(dur / 60)} hour${Math.floor(dur / 60) === 1 ? "" : "s"} ${dur % 60} minutes.`, `Count on from ${h}:${String(m).padStart(2, "0")}: it ends at ${t}.`], { visual: { type: "clock", hour: ((eh - 1) % 12) + 1, minute: em } }); }
  const each = rnd(2, 9), q = rnd(3, 8), save = rnd(10, 40);
  return num(`${n} saves $${save} each week. How many weeks to save for a $${save * q} bike?`, q, [`Divide the cost by the amount each week.`, `$${save * q} ÷ $${save} = ${q} weeks.`]);
};
const TERMS = [["a line segment", "part of a line with two endpoints"], ["a ray", "part of a line with one endpoint that goes on forever in one direction"], ["a line", "a straight path that goes on forever in both directions"], ["a point", "an exact location"], ["an acute angle", "an angle less than 90°"], ["a right angle", "an angle of exactly 90°"], ["an obtuse angle", "an angle greater than 90° but less than 180°"], ["a straight angle", "an angle of exactly 180°"]];
U.geoterms = (lvl) => {
  if (rnd(0, 1)) { const d = pick([25, 40, 55, 70, 90, 90, 110, 130, 150, 180]), t = d < 90 ? "acute" : d === 90 ? "right" : d < 180 ? "obtuse" : "straight"; return choice("What kind of angle is this?", t, ["acute", "right", "obtuse", "straight"], ["Compare it to a square corner (90°).", `It measures ${d}°, so it is ${t}.`], { keepOrder: ["acute", "right", "obtuse", "straight"], picture: { type: "angle", deg: d } }); }
  const [t, def] = pick(TERMS);
  return choice(`Which is ${def}?`, t, sample(TERMS.filter((x) => x[0] !== t).map((x) => x[0]), 3), ["Think about endpoints and size.", `${cap(t)} is ${def}.`]);
};
U.angles = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const d = rnd(2, 17) * 10 + pick([0, 5]); return num("What is the measure of this angle in degrees?", d, ["Read the angle from the ray along 0°.", `It measures ${d}°.`], { picture: { type: "angle", deg: d } }); }
  const whole = pick([90, 180, 120, 150]), a = rnd(2, whole / 10 - 2) * 10 + pick([0, 5]);
  if (k === 1) return num(`Two angles together make ${whole}°. One is ${a}°. What is the other angle?`, whole - a, ["Angle measures add.", `${whole} − ${a} = ${whole - a}°.`], { picture: { type: "angle", deg: whole, split: [a, whole - a], ask: 1 } });
  const t = pick([1, 2, 3]), deg = t * 90;
  return num(`How many degrees does a ${t === 1 ? "quarter" : t === 2 ? "half" : "three-quarter"} turn measure?`, deg, ["A full turn is 360°.", `${t === 1 ? "1/4" : t === 2 ? "1/2" : "3/4"} of 360° = ${deg}°.`]);
};
U.lines = (lvl) => {
  const items = [["The two rails of a train track", "parallel"], ["The corner where a wall meets the floor", "perpendicular"], ["The letter T", "perpendicular"], ["The letter H's two tall sides", "parallel"], ["The letter X", "intersecting but not perpendicular"], ["The opposite sides of a rectangle", "parallel"], ["Two sides that meet at a square corner", "perpendicular"], ["The lines on notebook paper", "parallel"]];
  const [s, a] = pick(items);
  if (rnd(0, 2) === 0) { const [shape, n] = pick([["square", "2 pairs"], ["rectangle", "2 pairs"], ["trapezoid", "1 pair"], ["triangle", "0 pairs"], ["parallelogram", "2 pairs"]]); return choice(`How many pairs of parallel sides does a ${shape} have?`, n, ["0 pairs", "1 pair", "2 pairs", "4 pairs"], ["Parallel sides never meet, like train tracks.", `A ${shape} has ${n}.`], { keepOrder: ["0 pairs", "1 pair", "2 pairs", "4 pairs"], picture: { type: "polygon", ...(shape === "triangle" ? { sides: 3 } : { kind: shape }) } }); }
  return choice(`${s}: are these lines parallel, perpendicular, or intersecting but not perpendicular?`, a, ["parallel", "perpendicular", "intersecting but not perpendicular"], ["Parallel lines never meet. Perpendicular lines meet at a right angle.", `${s}: ${a}.`], { keepOrder: ["parallel", "perpendicular", "intersecting but not perpendicular"] });
};
U.symmetry = (lvl) => {
  const k = rnd(0, 1);
  if (k === 0) { const [shape, n, spec] = pick([["square", 4, { kind: "square" }], ["rectangle", 2, { kind: "rectangle" }], ["equilateral triangle", 3, { sides: 3 }], ["regular hexagon", 6, { sides: 6 }], ["regular pentagon", 5, { sides: 5 }], ["regular octagon", 8, { sides: 8 }], ["parallelogram", 0, { kind: "parallelogram" }]]); return num(`How many lines of symmetry does a ${shape} have?`, n, ["A line of symmetry folds the shape into two matching halves.", n ? `A ${shape} has ${n}.` : `A ${shape} has no fold that matches, so 0.`], { picture: { type: "polygon", ...spec } }); }
  const sym = pick(["A", "H", "M", "T", "O", "X", "W", "U"]), not = sample(["F", "G", "J", "L", "N", "P", "R", "S", "Z"], 3);
  return choice("Which letter has a line of symmetry?", sym, not, ["Imagine folding the letter in half.", `${sym} matches on both sides of a fold.`]);
};
U.pattern = (lvl) => {
  const k = rnd(0, 2), s = rnd(1, 20), d = rnd(2, 12);
  if (k === 0) { const seq = [0, 1, 2, 3].map((i) => s + i * d); return num(`What is the next number? ${seq.join(", ")}, ___`, s + 4 * d, [`Each number is ${d} more than the one before.`, `${seq[3]} + ${d} = ${s + 4 * d}.`]); }
  if (k === 1) { const r = pick([2, 3]), a = rnd(1, 5), seq = [0, 1, 2, 3].map((i) => a * r ** i); return num(`What is the next number? ${seq.join(", ")}, ___`, a * r ** 4, [`Each number is ${r} times the one before.`, `${seq[3]} × ${r} = ${a * r ** 4}.`]); }
  const rule = rnd(2, 9);
  return num(`The rule is "add ${rule}". Start at ${s}. What is the 5th number?`, s + 4 * rule, [`List them: ${[0, 1, 2, 3, 4].map((i) => s + i * rule).join(", ")}.`, `The 5th number is ${s + 4 * rule}.`]);
};
U.multistep4 = (lvl) => {
  const n = who(), k = rnd(0, 2);
  if (k === 0) { const packs = rnd(3, 9), per = rnd(12, 48), gave = rnd(5, packs * per - 10); return num(`${n} buys ${packs} packs of ${per} cards and gives away ${gave}. How many cards are left?`, packs * per - gave, [`First multiply: ${packs} × ${per} = ${packs * per}.`, `Then subtract: ${packs * per} − ${gave} = ${packs * per - gave}.`]); }
  if (k === 1) { const rows = rnd(4, 12), seats = rnd(12, 30), people = rnd(20, rows * seats - 5); return num(`A theater has ${rows} rows of ${seats} seats. ${people} people are seated. How many seats are empty?`, rows * seats - people, [`Total seats: ${rows} × ${seats} = ${rows * seats}.`, `Empty: ${rows * seats} − ${people} = ${rows * seats - people}.`]); }
  const a = rnd(120, 480), b = rnd(60, 300), g = rnd(3, 8);
  const tot = a + b - ((a + b) % g);
  return num(`A school collects ${tot - b} cans on Monday and ${b} cans on Tuesday. They pack them equally into ${g} boxes. How many cans in each box?`, tot / g, [`Total: ${tot - b} + ${b} = ${tot}.`, `Divide: ${tot} ÷ ${g} = ${tot / g}.`]);
};

/* ---------------- Grade 5 geometry ---------------- */
U.volume = (lvl, arg) => {
  const l = rnd(2, 7), w = rnd(2, 4), h = rnd(2, 5);
  if (arg === "cubes" || (!arg && rnd(0, 1))) return num("How many unit cubes make this box? (That is its volume in cubic units.)", l * w * h, [`Each layer has ${l} × ${w} = ${l * w} cubes.`, `There are ${h} layers: ${l * w} × ${h} = ${l * w * h}.`], { picture: { type: "cubes", l, w, h } });
  if (arg === "combo") { const l2 = rnd(2, 5), w2 = rnd(2, 4), h2 = rnd(1, 4); return num(`One box is ${l} × ${w} × ${h} cm. Another is ${l2} × ${w2} × ${h2} cm. What is their total volume in cubic cm?`, l * w * h + l2 * w2 * h2, [`First box: ${l} × ${w} × ${h} = ${l * w * h}.`, `Second box: ${l2} × ${w2} × ${h2} = ${l2 * w2 * h2}.`, `Add: ${l * w * h + l2 * w2 * h2} cubic cm.`], { picture: { type: "cubes", l, w, h, labels: true } }); }
  if (rnd(0, 1)) return num(`A box is ${l} cm long, ${w} cm wide and ${h} cm tall. What is its volume in cubic cm?`, l * w * h, ["V = length × width × height.", `${l} × ${w} × ${h} = ${l * w * h} cubic cm.`], { picture: { type: "cubes", l, w, h, labels: true, unit: "cm" } });
  return num(`A box has a volume of ${l * w * h} cubic cm. It is ${l} cm long and ${w} cm wide. How tall is it?`, h, [`Base area: ${l} × ${w} = ${l * w}.`, `Height = volume ÷ base: ${l * w * h} ÷ ${l * w} = ${h} cm.`], { picture: { type: "cubes", l, w, h, labels: true, hide: "h" } });
};
U.coordpts = (lvl) => {
  const x = rnd(0, 10), y = rnd(0, 10), k = rnd(0, 2);
  if (k === 0) return word("What are the coordinates of point A? Write them like (3, 4).", `(${x}, ${y})`, ["Start at (0, 0). Go across to x first, then up to y.", `Across ${x}, up ${y}: (${x}, ${y}).`], { picture: { type: "coord", points: [{ x, y, label: "A" }] }, accept: [`${x},${y}`, `${x}, ${y}`] });
  if (k === 1) return choice(`Which point is at (${x}, ${y})?`, "A", ["B", "C"], ["x tells how far across; y tells how far up.", `Point A is at (${x}, ${y}).`], { keepOrder: ["A", "B", "C"], picture: { type: "coord", points: shuffle([{ x, y, label: "A" }, { x: y, y: x === y ? (x + 3) % 11 : x, label: "B" }, { x: (x + 2) % 11, y, label: "C" }]) } });
  const x2 = rnd(0, 10);
  return num(`How far apart are (${x}, ${y}) and (${x2 === x ? (x + 4) % 11 : x2}, ${y})?`, Math.abs((x2 === x ? (x + 4) % 11 : x2) - x), ["They have the same y, so count across.", `|${x2 === x ? (x + 4) % 11 : x2} − ${x}| = ${Math.abs((x2 === x ? (x + 4) % 11 : x2) - x)} units.`]);
};
U.coordpattern = (lvl) => {
  const a = rnd(1, 3), b = rnd(2, 4), xs = [0, 1, 2, 3], pts = xs.map((x) => ({ x, y: a * x + (b > 2 ? 0 : 1) }));
  const r = b > 2 ? 0 : 1;
  if (rnd(0, 1)) return num(`The rule is "y = ${a} × x${r ? " + 1" : ""}". What is y when x = 4?`, a * 4 + r, [`Put 4 in for x: ${a} × 4${r ? " + 1" : ""}.`, `= ${a * 4 + r}.`], { visual: { type: "coord", points: pts, line: true } });
  return num("The points follow a pattern. What is the y-value when x = 4?", a * 4 + r, [`Each step right goes up ${a}.`, `At x = 3, y = ${a * 3 + r}, so at x = 4, y = ${a * 4 + r}.`], { picture: { type: "coord", points: pts, line: true } });
};
U.classify = (lvl) => {
  const facts = [["Every square is also a rectangle.", "true"], ["Every rectangle is also a square.", "false"], ["Every square is a rhombus.", "true"], ["A trapezoid has exactly 1 pair of parallel sides.", "true"], ["Every parallelogram is a rectangle.", "false"], ["A rhombus has 4 equal sides.", "true"], ["Every rectangle is a parallelogram.", "true"], ["A triangle can have two right angles.", "false"], ["An equilateral triangle has 3 equal sides.", "true"], ["Every rhombus is a square.", "false"]];
  if (rnd(0, 1)) { const [s, t] = pick(facts); return choice(`True or false? ${s}`, t, [t === "true" ? "false" : "true"], ["Think about what every shape in the group must have.", `${s.replace(/\.$/, "")}: ${t}.`], { keepOrder: ["true", "false"] }); }
  const [desc, name] = pick([["4 equal sides and 4 right angles", "square"], ["4 right angles but not all sides equal", "rectangle"], ["4 equal sides but no right angles", "rhombus"], ["exactly 1 pair of parallel sides", "trapezoid"], ["2 pairs of parallel sides and no right angles", "parallelogram"]]);
  return choice(`Which shape has ${desc}?`, name, ["square", "rectangle", "rhombus", "trapezoid", "parallelogram"].filter((x) => x !== name).slice(0, 3), ["Check sides, angles and parallel pairs.", `That's a ${name}.`], { picture: { type: "polygon", kind: name } });
};

/* ---------------- Grade 6 starters: ratios, percents, dividing fractions ---------------- */
U.ratio = (lvl) => {
  const [a1, a2] = pick([["red", "blue"], ["cats", "dogs"], ["boys", "girls"], ["apples", "oranges"]]), x = rnd(2, 9), y = rnd(2, 9), k = rnd(0, 2);
  if (k === 0) return word(`There are ${x} ${a1} and ${y} ${a2}. What is the ratio of ${a1} to ${a2}? Write it like 3:5.`, `${x}:${y}`, ["A ratio compares two amounts in order.", `${a1} to ${a2}: ${x}:${y}.`], { accept: [`${x} to ${y}`, `${x}/${y}`] });
  if (k === 1) return word(`There are ${x} ${a1} and ${y} ${a2}. What is the ratio of ${a2} to all of them? Write it like 3:5.`, `${y}:${x + y}`, [`All of them: ${x} + ${y} = ${x + y}.`, `${a2} to total: ${y}:${x + y}.`], { accept: [`${y} to ${x + y}`, `${y}/${x + y}`] });
  const m = rnd(2, 6);
  return num(`The ratio of ${a1} to ${a2} is ${x}:${y}. If there are ${x * m} ${a1}, how many ${a2} are there?`, y * m, [`${x} × ${m} = ${x * m}, so multiply both parts by ${m}.`, `${y} × ${m} = ${y * m}.`], { visual: { type: "table", rows: [[a1, String(x), String(x * 2), String(x * m)], [a2, String(y), String(y * 2), "?"]] } });
};
U.percent = (lvl) => {
  const p = pick([10, 20, 25, 30, 40, 50, 60, 75, 80, 5, 15, 35]), k = rnd(0, 2);
  if (k === 0) return word(`Write ${p}% as a fraction in simplest form.`, fr(p, 100), ["Percent means per 100.", `${p}% = ${p}/100 = ${fr(p, 100)}.`], { accept: [`${p}/100`] });
  if (k === 1) return num(`Write ${p}% as a decimal.`, dec(p / 100), ["Percent means per 100.", `${p}/100 = ${dec(p / 100)}.`]);
  const h = rnd(1, 99);
  return num(`${h} out of 100 squares are shaded. What percent is shaded?`, h, ["Percent means out of 100.", `${h}/100 = ${h}%.`], { picture: { type: "area", rows: 10, cols: 10 }, accept: [`${h}%`] });
};
U.fracdivide = (lvl) => {
  const b = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 6, 8]), a = rnd(1, b - 1), c = rnd(1, d - 1), k = rnd(0, 1);
  if (k === 0) { const w = rnd(2, 6); return num(`How many 1/${d}-cup servings are in ${w} cups?`, w * d, [`Divide: ${w} ÷ 1/${d}.`, `Multiply by the reciprocal: ${w} × ${d} = ${w * d}.`]); }
  return word(`${a}/${b} ÷ ${c}/${d} = ? Write it in simplest form.`, fr(a * d, b * c, true), [`Keep, change, flip: ${a}/${b} × ${d}/${c}.`, `= ${a * d}/${b * c}.`, `Simplest form: ${fr(a * d, b * c, true)}.`], { accept: [fr(a * d, b * c), `${a * d}/${b * c}`] });
};

export const UPPER = U;
