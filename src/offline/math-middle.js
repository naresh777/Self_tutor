// Built-in math problems for Grades 6 to 8: ratios and percents, integers and rational numbers,
// expressions and equations, geometry, statistics and probability, functions, systems,
// transformations, the Pythagorean theorem and volume. Same shape as math.js.
import { rnd, pick, shuffle, sample, fmt, num, choice, word, NAMES } from "./util.js";
import { fr, gcd } from "./math-upper.js";

const who = () => pick(NAMES);
const dec = (x, p = 4) => String(Number(x.toFixed(p)));
const money = (x) => `$${x.toFixed(2)}`;
const sgn = (n) => (n < 0 ? `− ${-n}` : `+ ${n}`);
// "3x + 5", "x − 2", "−x", "4"
const lin = (m, b, v = "x") => {
  const t = m === 0 ? "" : m === 1 ? v : m === -1 ? `−${v}` : `${m < 0 ? "−" : ""}${Math.abs(m)}${v}`;
  if (!t) return String(b).replace("-", "−");
  return b ? `${t} ${sgn(b)}` : t;
};
const neg = (n) => String(n).replace("-", "−");
const pt = (x, y) => `(${neg(x)}, ${neg(y)})`;
const pi = (k) => Math.round(314 * k) / 100; // 3.14 × k, exact to the hundredth
const lcm = (a, b) => (a * b) / gcd(a, b);
const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
const median = (xs) => { const s = [...xs].sort((a, b) => a - b), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
// A list of n whole numbers whose mean is a whole number.
function niceList(n, lo, hi) {
  for (;;) { const xs = Array.from({ length: n }, () => rnd(lo, hi)); if (xs.reduce((s, x) => s + x, 0) % n === 0) return xs; }
}
const TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [15, 20, 25], [20, 21, 29]];

const M = {};

/* ---------------- Grade 6: ratios, rates and percents ---------------- */
M.eqratio = (lvl) => {
  const a = rnd(2, 9), b = pick([2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== a)), k = rnd(2, lvl > 1 ? 9 : 5), [x, y] = pick([["cups of flour", "cups of sugar"], ["red tiles", "blue tiles"], ["laps", "minutes"], ["boys", "girls"]]);
  if (rnd(0, 1)) return num(`The ratio of ${x} to ${y} is ${a}:${b}. Fill in the table: ${a * k} ${x} go with ? ${y}.`, b * k, [`${a} × ${k} = ${a * k}, so the ratio was scaled by ${k}.`, `Scale the other part too: ${b} × ${k} = ${b * k}.`], { visual: { type: "table", rows: [[x, String(a), String(a * 2), String(a * k)], [y, String(b), String(b * 2), "?"]] } });
  const good = `${a * k}:${b * k}`;
  return choice(`Which ratio is equivalent to ${a}:${b}?`, good, [`${a * k}:${b + k}`, `${a + k}:${b + k}`, `${b * k}:${a * k}`], ["Equivalent ratios multiply both parts by the same number.", `${a} × ${k} = ${a * k} and ${b} × ${k} = ${b * k}, so ${good}.`]);
};
M.unitrate = (lvl) => {
  const n = rnd(2, lvl > 1 ? 12 : 6), each = rnd(25, 400) / 100 * (lvl > 2 ? 2 : 1), tot = Math.round(n * each * 100) / 100, item = pick(["notebooks", "pens", "apples", "stickers", "cans of juice"]);
  if (rnd(0, 2) === 0) { const m = rnd(2, 5) * 30, h = rnd(2, 5); return num(`A car travels ${m * h} miles in ${h} hours. How many miles per hour is that?`, m, ["A unit rate is the amount for 1 unit.", `${m * h} ÷ ${h} = ${m}.`, `${m} miles per hour.`]); }
  const c = Math.round((tot / n) * 100) / 100;
  return num(`${n} ${item} cost ${money(n * c)}. What is the cost of 1? (in dollars)`, c.toFixed(2), [`Divide the total by the number of ${item}.`, `${money(n * c)} ÷ ${n} = ${money(c)}.`], { accept: [money(c)] });
};
M.ratewp = (lvl) => {
  const n = who(), k = rnd(0, 2);
  if (k === 0) { const r = rnd(3, 9) * 5, t = rnd(2, 6); return num(`${n} bikes at ${r} km per hour. How far does ${n} go in ${t} hours?`, r * t, ["distance = rate × time.", `${r} × ${t} = ${r * t} km.`]); }
  if (k === 1) { const r = rnd(4, 12), d = r * rnd(3, 10); return num(`A printer prints ${r} pages per minute. How many minutes does it take to print ${d} pages?`, d / r, ["time = amount ÷ rate.", `${d} ÷ ${r} = ${d / r} minutes.`]); }
  const a = rnd(2, 5), p = rnd(2, 8), q = rnd(3, 9);
  return num(`${a} tickets cost $${a * p}. At the same rate, how much do ${q} tickets cost? (in dollars)`, p * q, [`Unit rate: $${a * p} ÷ ${a} = $${p} per ticket.`, `${q} × $${p} = $${p * q}.`]);
};
M.pctof = (lvl) => {
  const p = pick(lvl > 1 ? [5, 12, 15, 30, 35, 45, 60, 85, 120, 150] : [10, 20, 25, 50, 75]), n = pick([20, 40, 60, 80, 120, 200, 360, 500]);
  const ans = (p * n) / 100;
  return num(`What is ${p}% of ${n}?`, dec(ans), [`${p}% = ${p}/100 = ${dec(p / 100)}.`, `${dec(p / 100)} × ${n} = ${dec(ans)}.`], { picture: p < 100 ? { type: "strip", parts: [p, 100 - p], total: 100 } : null });
};
M.pctwhole = (lvl) => {
  const p = pick([10, 20, 25, 40, 50, 75, 5]), whole = pick([40, 60, 80, 120, 200, 300]), part = (p * whole) / 100;
  if (!Number.isInteger(part)) return M.pctwhole(lvl);
  if (rnd(0, 1)) return num(`${part} is ${p}% of what number?`, whole, [`${p}% of the whole is ${part}.`, `Divide: ${part} ÷ ${dec(p / 100)} = ${whole}.`, `Check: ${p}% of ${whole} = ${part}.`]);
  return num(`${who()} has read ${part} pages, which is ${p}% of the book. How many pages are in the book?`, whole, [`${p}% → ${part} pages.`, `1% → ${dec(part / p)} pages, so 100% → ${whole} pages.`]);
};
const ONE = { yards: "yard", feet: "foot", meters: "meter", kilometers: "kilometer", gallons: "gallon", pounds: "pound", hours: "hour" };
M.unitconv = (lvl) => {
  const [big, small, f] = pick([["yards", "feet", 3], ["feet", "inches", 12], ["meters", "centimeters", 100], ["kilometers", "meters", 1000], ["gallons", "quarts", 4], ["pounds", "ounces", 16], ["hours", "minutes", 60]]), n = rnd(2, 12);
  if (rnd(0, 1)) return num(`How many ${small} are in ${n} ${big}?`, n * f, [`The ratio is 1 ${ONE[big]} : ${f} ${small}.`, `${n} × ${f} = ${fmt(n * f)} ${small}.`]);
  return num(`How many ${big} are in ${fmt(n * f)} ${small}?`, n, [`The ratio is ${f} ${small} : 1 ${ONE[big]}.`, `${fmt(n * f)} ÷ ${f} = ${n} ${big}.`]);
};
M.mdiv = (lvl) => {
  const d = rnd(12, lvl > 1 ? 48 : 25), q = rnd(lvl > 2 ? 101 : 21, lvl > 1 ? 399 : 99), a = d * q;
  return num(`${fmt(a)} ÷ ${d} = ?`, q, [`Estimate first: about ${fmt(Math.round(a / 10) * 10)} ÷ ${Math.round(d / 10) * 10}.`, `Divide, multiply, subtract and bring down, one digit at a time.`, `${fmt(a)} ÷ ${d} = ${q}. Check: ${q} × ${d} = ${fmt(a)}.`]);
};
M.decops = (lvl) => {
  const k = rnd(0, 3), a = rnd(11, 999) / 100, b = rnd(11, 99) / 10;
  if (k === 0) return num(`${a} + ${b} = ?`, dec(a + b), ["Line up the decimal points.", `${a} + ${b} = ${dec(a + b)}.`]);
  if (k === 1) { const [x, y] = a > b ? [a, b] : [b, a]; return num(`${x} − ${y} = ?`, dec(x - y), ["Line up the decimal points; add zeros if needed.", `${x} − ${y} = ${dec(x - y)}.`]); }
  if (k === 2) { const c = rnd(12, 95) / 10, e = rnd(2, 9) / 10; return num(`${c} × ${e} = ?`, dec(c * e), [`Multiply as whole numbers: ${Math.round(c * 10)} × ${Math.round(e * 10)} = ${Math.round(c * 10) * Math.round(e * 10)}.`, "Count decimal places: 1 + 1 = 2.", `${dec(c * e)}.`]); }
  const q = rnd(12, 99) / 10, dv = pick([0.2, 0.4, 0.5, 0.25, 1.5]), dd = Number((q * dv).toFixed(3));
  return num(`${dd} ÷ ${dv} = ?`, dec(q), [`Make the divisor whole: multiply both by ${dv === 0.25 ? 100 : 10}.`, `${dec(dd * (dv === 0.25 ? 100 : 10))} ÷ ${dec(dv * (dv === 0.25 ? 100 : 10))} = ${dec(q)}.`]);
};
M.gcflcm = (lvl) => {
  const g = rnd(2, lvl > 1 ? 12 : 6); let a = g * rnd(1, 6), b = g * rnd(2, 7);
  if (a === b || gcd(a / g, b / g) !== 1) return M.gcflcm(lvl);
  if (rnd(0, 2) === 0) { const x = rnd(2, 9), y = rnd(2, 9); if (x === y) return M.gcflcm(lvl); return num(`Find the least common multiple (LCM) of ${x} and ${y}.`, lcm(x, y), [`List multiples of ${Math.max(x, y)}: ${[1, 2, 3, 4].map((i) => i * Math.max(x, y)).join(", ")}…`, `The first one that ${Math.min(x, y)} also divides is ${lcm(x, y)}.`]); }
  if (rnd(0, 1)) return num(`Find the greatest common factor (GCF) of ${a} and ${b}.`, g, [`Factors of ${a} and ${b} both include ${g}.`, `No bigger number divides both, so the GCF is ${g}.`]);
  return word(`Use the GCF to rewrite ${a} + ${b} as a product, like 4(2 + 3).`, `${g}(${a / g} + ${b / g})`, [`The GCF of ${a} and ${b} is ${g}.`, `${a} = ${g} × ${a / g} and ${b} = ${g} × ${b / g}.`, `${a} + ${b} = ${g}(${a / g} + ${b / g}).`], { accept: [`${g}(${a / g}+${b / g})`, `${g} × (${a / g} + ${b / g})`] });
};

/* ---------------- Grade 6: integers and the coordinate plane ---------------- */
M.absval = (lvl) => {
  const a = rnd(-30, 30) || 7, b = rnd(-20, 20) || -4, k = rnd(0, 2);
  if (k === 0) return num(`|${neg(a)}| = ?`, Math.abs(a), ["Absolute value is the distance from 0.", `${neg(a)} is ${Math.abs(a)} steps from 0.`]);
  if (k === 1) { const t = -rnd(5, 40); return choice(`Which is a bigger debt: owing $${-t} or having a balance of −$${-t + 5}?`, `−$${-t + 5}`, [`$${-t}`, "They are the same"], [`|−${-t + 5}| = ${-t + 5} and |−${-t}| = ${-t}.`, `${-t + 5} is more, so −$${-t + 5} is the bigger debt.`]); }
  return choice(`Which is greater: |${neg(a)}| or |${neg(b)}|?`, Math.abs(a) === Math.abs(b) ? "They are equal" : Math.abs(a) > Math.abs(b) ? `|${neg(a)}|` : `|${neg(b)}|`, [`|${neg(a)}|`, `|${neg(b)}|`, "They are equal"], [`|${neg(a)}| = ${Math.abs(a)} and |${neg(b)}| = ${Math.abs(b)}.`]);
};
M.coord4 = (lvl) => {
  const x = (rnd(1, 5)) * pick([1, -1]), y = rnd(1, 5) * pick([1, -1]), q = x > 0 ? (y > 0 ? "I" : "IV") : y > 0 ? "II" : "III", k = rnd(0, 2);
  const visual = { type: "coord", min: -6, max: 6, points: [{ x, y, label: "P" }] };
  if (k === 0) return choice(`Which quadrant is point P in?`, `Quadrant ${q}`, ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"], [`P is at ${pt(x, y)}.`, `x is ${x > 0 ? "positive" : "negative"} and y is ${y > 0 ? "positive" : "negative"}, so Quadrant ${q}.`], { picture: visual, keepOrder: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"] });
  if (k === 1) return word("What are the coordinates of point P? Write them like (2, −3).", pt(x, y), ["Read across first (x), then up or down (y).", `P is at ${pt(x, y)}.`], { picture: visual, accept: [`(${x},${y})`, `(${x}, ${y})`] });
  return word(`Reflect ${pt(x, y)} across the ${pick(["x"])}-axis. What are the new coordinates?`, pt(x, -y), ["Reflecting across the x-axis flips the sign of y.", `${pt(x, y)} → ${pt(x, -y)}.`], { accept: [`(${x},${-y})`, `(${x}, ${-y})`] });
};

/* ---------------- Grade 6: expressions and equations ---------------- */
M.exponents = (lvl) => {
  const b = rnd(2, lvl > 1 ? 10 : 5), e = b > 5 ? rnd(2, 3) : rnd(2, 4);
  if (rnd(0, 2) === 0) { const x = rnd(2, 5), y = rnd(1, 4); return num(`${x}² + ${y} × 2 = ?`, x * x + 2 * y, [`Exponents first: ${x}² = ${x * x}.`, `Then multiply: ${y} × 2 = ${2 * y}.`, `Add: ${x * x + 2 * y}.`]); }
  return num(`${b}${["", "", "²", "³", "⁴"][e]} = ?`, b ** e, [`${b}${["", "", "²", "³", "⁴"][e]} means ${Array(e).fill(b).join(" × ")}.`, `= ${fmt(b ** e)}.`]);
};
M.writeexpr = (lvl) => {
  const n = rnd(2, 12), v = pick(["x", "n", "y"]);
  const items = [[`${n} more than ${v}`, `${v} + ${n}`, [`${n} − ${v}`, `${n}${v}`, `${v} − ${n}`]], [`${n} less than ${v}`, `${v} − ${n}`, [`${n} − ${v}`, `${v} + ${n}`, `${n}${v}`]], [`${n} times ${v}`, `${n}${v}`, [`${v} + ${n}`, `${v} ÷ ${n}`, `${n} − ${v}`]], [`${v} divided by ${n}`, `${v} ÷ ${n}`, [`${n} ÷ ${v}`, `${n}${v}`, `${v} − ${n}`]], [`twice ${v}, plus ${n}`, `2${v} + ${n}`, [`2(${v} + ${n})`, `${v} + 2 + ${n}`, `${n}${v} + 2`]], [`${n} times the sum of ${v} and 3`, `${n}(${v} + 3)`, [`${n}${v} + 3`, `${n} + ${v} + 3`, `3${v} + ${n}`]]];
  const [w, a, ws] = pick(items);
  return choice(`Which expression means "${w}"?`, a, ws, ["Turn each word into a symbol, in order.", `"${w}" is ${a}.`]);
};
M.evalexpr = (lvl) => {
  const x = rnd(2, 9), m = rnd(2, 9), b = rnd(1, 15), k = rnd(0, 2);
  if (k === 0) return num(`Evaluate ${m}x + ${b} when x = ${x}.`, m * x + b, [`Replace x with ${x}: ${m} × ${x} + ${b}.`, `${m * x} + ${b} = ${m * x + b}.`]);
  if (k === 1) return num(`Evaluate x² − ${b} when x = ${x}.`, x * x - b, [`Replace x with ${x}: ${x}² − ${b}.`, `${x * x} − ${b} = ${neg(x * x - b)}.`]);
  const y = rnd(2, 6);
  return num(`Evaluate ${m}(x + y) when x = ${x} and y = ${y}.`, m * (x + y), [`Parentheses first: ${x} + ${y} = ${x + y}.`, `${m} × ${x + y} = ${m * (x + y)}.`]);
};
M.equivexpr = (lvl) => {
  const a = rnd(2, 9), b = rnd(1, 9), c = rnd(2, 7), k = rnd(0, 2);
  if (k === 0) return choice(`Which expression is equivalent to ${a}(x + ${b})?`, `${a}x + ${a * b}`, [`${a}x + ${b}`, `x + ${a * b}`, `${a + b}x`], ["Distribute: multiply each term inside by the number outside.", `${a} × x + ${a} × ${b} = ${a}x + ${a * b}.`]);
  if (k === 1) return choice(`Which expression is equivalent to ${a}x + ${c}x?`, `${a + c}x`, [`${a * c}x`, `${a + c}x²`, `${a}x${c}`], ["Combine like terms: add the coefficients.", `${a} + ${c} = ${a + c}, so ${a + c}x.`]);
  return choice(`Which expression is equivalent to ${a * c}x + ${a * b}?`, `${a}(${c}x + ${b})`, [`${a}(${c}x + ${a * b})`, `${a * c}(x + ${b})`, `${c}(${a}x + ${b})`], [`Find a common factor: ${a}.`, `${a * c}x = ${a} × ${c}x and ${a * b} = ${a} × ${b}.`]);
};
M.onestep = (lvl) => {
  const x = rnd(lvl > 2 ? -12 : 2, 20) || 5, a = rnd(2, 12), k = rnd(0, 3);
  if (k === 0) return num(`Solve: x + ${a} = ${x + a}`, x, [`Subtract ${a} from both sides.`, `x = ${x + a} − ${a} = ${neg(x)}.`]);
  if (k === 1) return num(`Solve: x − ${a} = ${neg(x - a)}`, x, [`Add ${a} to both sides.`, `x = ${neg(x - a)} + ${a} = ${neg(x)}.`]);
  if (k === 2) return num(`Solve: ${a}x = ${neg(a * x)}`, x, [`Divide both sides by ${a}.`, `x = ${neg(a * x)} ÷ ${a} = ${neg(x)}.`]);
  return num(`Solve: x ÷ ${a} = ${neg(x)}`, a * x, [`Multiply both sides by ${a}.`, `x = ${neg(x)} × ${a} = ${neg(a * x)}.`]);
};
M.writeeq = (lvl) => {
  const n = who(), a = rnd(3, 15), x = rnd(4, 30), k = rnd(0, 2);
  if (k === 0) return choice(`${n} had some cards and got ${a} more. Now ${n} has ${x + a}. Which equation finds c, the starting number of cards?`, `c + ${a} = ${x + a}`, [`c − ${a} = ${x + a}`, `${a}c = ${x + a}`, `c = ${a} + ${x + a}`], ["\"Got more\" means add.", `Start + ${a} = ${x + a}, so c + ${a} = ${x + a}.`]);
  if (k === 1) return num(`${n} buys ${a} pens for $${a * 2} in all. Write p × ${a} = ${a * 2} and solve for p, the cost of one pen.`, 2, [`p × ${a} = ${a * 2}.`, `p = ${a * 2} ÷ ${a} = 2.`]);
  const g = rnd(3, 8);
  return num(`A class of students splits into ${g} equal teams of ${a}. Solve s ÷ ${g} = ${a} to find s, the number of students.`, g * a, [`s ÷ ${g} = ${a}.`, `Multiply: s = ${a} × ${g} = ${g * a}.`]);
};
M.ineq = (lvl) => {
  const c = rnd(-5, 12), op = pick([">", "<", "≥", "≤"]), k = rnd(0, 2);
  const ok = (v) => (op === ">" ? v > c : op === "<" ? v < c : op === "≥" ? v >= c : v <= c);
  if (k === 0) { const vals = shuffle([c - 2, c, c + 1, c + 3, c - 4]).slice(0, 4); const good = vals.filter(ok); if (good.length !== 1) return M.ineq(lvl); return choice(`Which value is a solution of x ${op} ${neg(c)}?`, neg(good[0]), vals.filter((v) => !ok(v)).map(neg), [`Test each value in x ${op} ${neg(c)}.`, `${neg(good[0])} ${op} ${neg(c)} is true.`]); }
  if (k === 1) { const a = rnd(2, 9); return choice(`Solve: x + ${a} ${op} ${neg(c + a)}`, `x ${op} ${neg(c)}`, [`x ${op} ${neg(c + 2 * a)}`, `x ${op === ">" ? "<" : op === "<" ? ">" : op === "≥" ? "≤" : "≥"} ${neg(c)}`, `x = ${neg(c)}`], [`Subtract ${a} from both sides.`, `x ${op} ${neg(c)}.`]); }
  const age = rnd(8, 16);
  return choice(`You must be at least ${age} years old to ride. Which inequality shows the ages a that can ride?`, `a ≥ ${age}`, [`a > ${age}`, `a ≤ ${age}`, `a < ${age}`], ["\"At least\" means that number or more.", `a ≥ ${age}.`]);
};
M.depvar = (lvl) => {
  const m = rnd(2, 12), k = rnd(0, 2), items = [["the hours you work", "the money you earn"], ["the number of tickets bought", "the total cost"], ["the minutes a candle burns", "the candle's height"], ["the miles driven", "the gas used"], ["the number of plants watered", "the water used"]];
  if (k === 0) { const [i, d] = pick(items); return choice(`Which is the dependent variable: ${i} or ${d}?`, d, [i, "Neither"], ["The dependent variable changes because of the other one.", `${d.charAt(0).toUpperCase() + d.slice(1)} depends on ${i}.`]); }
  const x = rnd(4, 9);
  if (k === 1) return num(`The table shows y = ${m}x. What is y when x is ${x}?`, m * x, [`Every y is ${m} times x.`, `${m} × ${x} = ${m * x}.`], { visual: { type: "table", rows: [["x", "1", "2", "3", String(x)], ["y", String(m), String(2 * m), String(3 * m), "?"]] } });
  return choice(`A table shows x: 1, 2, 3 and y: ${m + 1}, ${2 * m + 1}, ${3 * m + 1}. Which equation fits?`, `y = ${m}x + 1`, [`y = ${m + 1}x`, `y = x + ${m}`, `y = ${m}x`], [`y goes up by ${m} each time x goes up by 1.`, `When x = 1, y = ${m} + 1, so y = ${m}x + 1.`]);
};

/* ---------------- Grade 6: geometry ---------------- */
M.areatri = (lvl) => {
  const b = rnd(3, 16), h = rnd(2, 12) * 2, k = rnd(0, 2);
  if (k === 0) return num(`A triangle has a base of ${b} cm and a height of ${h} cm. What is its area in square cm?`, (b * h) / 2, ["Area of a triangle = ½ × base × height.", `½ × ${b} × ${h} = ${(b * h) / 2} cm².`]);
  if (k === 1) return num(`A parallelogram has a base of ${b} m and a height of ${h / 2} m. What is its area in square meters?`, (b * h) / 2, ["Area of a parallelogram = base × height.", `${b} × ${h / 2} = ${(b * h) / 2} m².`], { picture: { type: "polygon", kind: "parallelogram" } });
  const t = b + rnd(2, 6);
  return num(`A trapezoid has bases ${b} in and ${t} in, and a height of ${h} in. What is its area in square inches?`, ((b + t) * h) / 2, ["Area of a trapezoid = ½ × (base 1 + base 2) × height.", `½ × (${b} + ${t}) × ${h} = ½ × ${b + t} × ${h} = ${((b + t) * h) / 2} in².`], { picture: { type: "polygon", kind: "trapezoid" } });
};
M.surfarea = (lvl) => {
  const l = rnd(2, 9), w = rnd(2, 7), h = rnd(2, 8);
  if (rnd(0, 2) === 0) { const s = rnd(2, 9); return num(`What is the surface area of a cube with edges of ${s} cm? (square cm)`, 6 * s * s, ["A cube's net has 6 equal squares.", `One face: ${s} × ${s} = ${s * s}.`, `6 × ${s * s} = ${6 * s * s} cm².`], { picture: { type: "cubes", l: Math.min(s, 6), w: Math.min(s, 6), h: Math.min(s, 6) } }); }
  const sa = 2 * (l * w + l * h + w * h);
  return num(`A box is ${l} in long, ${w} in wide and ${h} in tall. What is its surface area? (square in)`, sa, ["Unfold the box into a net of 6 rectangles: 3 matching pairs.", `Top and bottom: 2 × ${l} × ${w} = ${2 * l * w}.`, `Front and back: 2 × ${l} × ${h} = ${2 * l * h}.`, `Sides: 2 × ${w} × ${h} = ${2 * w * h}.`, `Total: ${sa} in².`], { picture: { type: "cubes", l, w: Math.min(w, 6), h, labels: true, unit: "in" } });
};
M.volfrac = (lvl) => {
  const l = rnd(2, 6), w = rnd(1, 4), h2 = rnd(1, 5) * 2 + 1; // height = h2/2
  const v = fr(l * w * h2, 2, true);
  return word(`A box is ${l} ft by ${w} ft by ${fr(h2, 2, true)} ft. What is its volume in cubic feet?`, v, ["Volume = length × width × height.", `${l} × ${w} = ${l * w}.`, `${l * w} × ${fr(h2, 2, true)} = ${l * w} × ${h2}/2 = ${l * w * h2}/2 = ${v}.`], { accept: [dec((l * w * h2) / 2), `${l * w * h2}/2`] });
};
M.polycoord = (lvl) => {
  const x1 = rnd(-5, 0), x2 = rnd(1, 5), y1 = rnd(-5, 0), y2 = rnd(1, 5);
  if (rnd(0, 1)) return num(`How far apart are ${pt(x1, y2)} and ${pt(x2, y2)}?`, x2 - x1, ["The y-values match, so count across.", `|${x2} − (${neg(x1)})| = ${x2 - x1} units.`], { visual: { type: "coord", min: -6, max: 6, points: [{ x: x1, y: y2, label: "A" }, { x: x2, y: y2, label: "B" }], line: true } });
  return num(`A rectangle has corners ${pt(x1, y1)}, ${pt(x2, y1)}, ${pt(x2, y2)} and ${pt(x1, y2)}. What is its area?`, (x2 - x1) * (y2 - y1), [`Width: ${x2} − (${neg(x1)}) = ${x2 - x1}.`, `Height: ${y2} − (${neg(y1)}) = ${y2 - y1}.`, `Area: ${x2 - x1} × ${y2 - y1} = ${(x2 - x1) * (y2 - y1)} square units.`], { visual: { type: "coord", min: -6, max: 6, points: [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }], shape: true } });
};

/* ---------------- Grade 6: statistics ---------------- */
const STATQ = [["How tall are the students in my class?", ["How tall is Maya?", "Is the door 7 feet tall?", "What is 4 × 5?"]], ["How many hours do sixth graders sleep on school nights?", ["How many hours did I sleep last night?", "What time is it?", "How many days are in May?"]], ["What are the favorite sports of students at our school?", ["What is my favorite sport?", "Who won the game last night?", "Is soccer a sport?"]], ["How many pets do families on our street have?", ["How many pets does Leo have?", "Is a cat a pet?", "What is our street's name?"]], ["How long does it take students to get to school?", ["How long did it take me today?", "What time does school start?", "How far is the school?"]], ["How many books did each student read this summer?", ["How many books did Ava read?", "What is the title of this book?", "Is the library open?"]], ["What are the prices of apples at different stores?", ["What does this apple cost?", "Is an apple a fruit?", "Where is the store?"]], ["How many text messages do teens send in a day?", ["How many texts did I send today?", "What is a text message?", "Who sent me a text?"]]];
M.statq = (lvl) => {
  if (rnd(0, 2) === 0) { const xs = niceList(5, 1, 20); return num(`Find the mean of ${xs.join(", ")}.`, mean(xs), [`Add them: ${xs.join(" + ")} = ${xs.reduce((s, x) => s + x, 0)}.`, `Divide by ${xs.length}: ${mean(xs)}.`]); }
  const [q, ws] = pick(STATQ);
  return choice("Which is a statistical question?", q, ws, ["A statistical question expects answers that vary.", `"${q}" gets many different answers.`]);
};
M.mmm = (lvl) => {
  const n = pick([5, 6, 7]), xs = niceList(n, 2, 30), k = rnd(0, 2), s = [...xs].sort((a, b) => a - b);
  if (k === 0) return num(`Find the mean of ${xs.join(", ")}.`, mean(xs), [`Sum: ${xs.reduce((a, b) => a + b, 0)}.`, `Divide by ${n}: ${mean(xs)}.`]);
  if (k === 1) return num(`Find the median of ${xs.join(", ")}.`, dec(median(xs)), [`Order them: ${s.join(", ")}.`, n % 2 ? `The middle number is ${median(xs)}.` : `The middle two are ${s[n / 2 - 1]} and ${s[n / 2]}; their average is ${dec(median(xs))}.`]);
  const m = pick(xs), ys = shuffle([...xs.filter((x) => x !== m).slice(0, 4), m, m]);
  if (new Set(ys).size !== ys.length - 1) return M.mmm(lvl);
  return num(`Find the mode of ${ys.join(", ")}.`, m, ["The mode is the number that appears most often.", `${m} appears twice.`]);
};
M.rangeiqr = (lvl) => {
  const xs = Array.from({ length: 8 }, () => rnd(1, 40)), s = [...xs].sort((a, b) => a - b);
  if (rnd(0, 1)) return num(`Find the range of ${xs.join(", ")}.`, s[7] - s[0], [`Biggest: ${s[7]}. Smallest: ${s[0]}.`, `Range: ${s[7]} − ${s[0]} = ${s[7] - s[0]}.`]);
  const q1 = (s[1] + s[2]) / 2, q3 = (s[5] + s[6]) / 2;
  return num(`Find the interquartile range (IQR) of ${xs.join(", ")}.`, dec(q3 - q1), [`Order: ${s.join(", ")}.`, `Lower half ${s.slice(0, 4).join(", ")}: Q1 = ${dec(q1)}.`, `Upper half ${s.slice(4).join(", ")}: Q3 = ${dec(q3)}.`, `IQR = ${dec(q3)} − ${dec(q1)} = ${dec(q3 - q1)}.`]);
};
M.plots = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const labels = ["1", "2", "3", "4", "5"], vals = labels.map(() => rnd(0, 6)), t = rnd(1, 5); return num(`The dot plot shows how many pets students have. How many students have ${t} pet${t > 1 ? "s" : ""}?`, vals[t - 1], [`Find ${t} on the line.`, `Count the dots above it: ${vals[t - 1]}.`], { picture: { type: "graph", kind: "dot", labels, values: vals, title: "Pets per student" } }); }
  if (k === 1) { const labels = ["0–9", "10–19", "20–29", "30–39"], vals = labels.map(() => rnd(1, 9)); return num("The histogram shows minutes spent reading. How many students read 20 minutes or more?", vals[2] + vals[3], ["Add the bars for 20–29 and 30–39.", `${vals[2]} + ${vals[3]} = ${vals[2] + vals[3]}.`], { picture: { type: "graph", kind: "bar", labels, values: vals, title: "Minutes reading" } }); }
  const mn = rnd(1, 10), q1 = mn + rnd(2, 6), md = q1 + rnd(1, 6), q3 = md + rnd(1, 6), mx = q3 + rnd(2, 8), ask = rnd(0, 2);
  const steps = [`Box plot: minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3}, maximum ${mx}.`];
  if (ask === 0) return num(`A box plot has minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3} and maximum ${mx}. What is the IQR?`, q3 - q1, [...steps, `IQR = Q3 − Q1 = ${q3} − ${q1} = ${q3 - q1}.`]);
  if (ask === 1) return num(`A box plot has minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3} and maximum ${mx}. What is the range?`, mx - mn, [...steps, `Range = max − min = ${mx} − ${mn} = ${mx - mn}.`]);
  return num(`A box plot has minimum ${mn}, Q1 ${q1}, median ${md}, Q3 ${q3} and maximum ${mx}. What is the median?`, md, [...steps, `The line inside the box is the median: ${md}.`]);
};
M.liketerms = (lvl) => {
  const a = rnd(2, 9), b = rnd(-6, 9) || 3, c = rnd(1, 9), d = rnd(1, 9), k = rnd(0, 1);
  if (k === 0) return choice(`Simplify: ${a}x + ${c} + ${lin(b, d)}`, lin(a + b, c + d), [lin(a + b + c + d, 0), lin(a + b, c - d), lin(a * b, c + d)], ["Group the x terms and the number terms.", `x terms: ${a}x ${sgn(b)}x = ${lin(a + b, 0)}.`, `Numbers: ${c} + ${d} = ${c + d}.`, `${lin(a + b, c + d)}.`]);
  return num(`Simplify ${a}y + ${c}y − ${d}y. What is the coefficient of y?`, a + c - d, ["Like terms all have y, so combine the numbers.", `${a} + ${c} − ${d} = ${a + c - d}.`]);
};
M.pctchange = (lvl) => {
  const o = pick([20, 40, 50, 80, 120, 200, 250, 400]), p = pick([10, 20, 25, 50, 75, 5, 15, 30]), up = rnd(0, 1), nw = up ? o + (o * p) / 100 : o - (o * p) / 100;
  if (!Number.isInteger(nw)) return M.pctchange(lvl);
  if (rnd(0, 1)) return num(`A price changes from $${o} to $${nw}. What is the percent ${up ? "increase" : "decrease"}?`, p, [`Change: ${Math.abs(nw - o)}.`, `Divide by the original: ${Math.abs(nw - o)} ÷ ${o} = ${dec(p / 100)}.`, `${p}% ${up ? "increase" : "decrease"}.`], { accept: [`${p}%`] });
  return num(`A ${pick(["game", "bike", "jacket", "lamp"])} costs $${o}. The price ${up ? "goes up" : "goes down"} ${p}%. What is the new price? (in dollars)`, nw, [`${p}% of ${o} is ${(o * p) / 100}.`, `${o} ${up ? "+" : "−"} ${(o * p) / 100} = ${nw}.`]);
};

/* ---------------- Grade 7: proportional relationships and percents ---------------- */
M.ratefrac = (lvl) => {
  const [a, b] = pick([[1, 2], [1, 3], [3, 4], [2, 3], [1, 4]]), [c, d] = pick([[1, 4], [1, 2], [1, 3], [2, 3], [1, 6]]);
  const r = fr(a * d, b * c, true);
  return word(`${who()} walks ${a}/${b} mile in ${c}/${d} hour. What is the speed in miles per hour?`, r, ["Unit rate = miles ÷ hours.", `${a}/${b} ÷ ${c}/${d} = ${a}/${b} × ${d}/${c} = ${a * d}/${b * c}.`, `${r} miles per hour.`], { accept: [fr(a * d, b * c), `${a * d}/${b * c}`, dec((a * d) / (b * c), 4)] });
};
M.propq = (lvl) => {
  const k = rnd(2, 9), xs = [1, 2, 3, 4].map((i) => i * rnd(1, 2) + i), yes = rnd(0, 1), bump = rnd(1, 3);
  const ys = xs.map((x, i) => k * x + (yes ? 0 : i === 0 ? 0 : bump));
  if (rnd(0, 2) === 0) return choice(`Which equation shows a proportional relationship?`, `y = ${k}x`, [`y = ${k}x + ${bump}`, `y = x + ${k}`, `y = ${k}x − ${bump}`], ["Proportional means y = kx: no number added.", `y = ${k}x goes through (0, 0).`]);
  return choice(`Is this table proportional? x: ${xs.join(", ")}; y: ${ys.join(", ")}`, yes ? "Yes" : "No", ["Yes", "No"], ["Check y ÷ x for each pair.", yes ? `Every y ÷ x is ${k}, so yes.` : `${ys[0]} ÷ ${xs[0]} = ${dec(ys[0] / xs[0])} but ${ys[1]} ÷ ${xs[1]} = ${dec(ys[1] / xs[1])}, so no.`], { keepOrder: ["Yes", "No"] });
};
M.kconst = (lvl) => {
  const k = lvl > 1 ? pick([1.5, 2.5, 0.5, 3, 4, 6, 0.75]) : rnd(2, 9), xs = [2, 4, 6, 8];
  if (rnd(0, 1)) return num(`The table is proportional. x: ${xs.join(", ")}; y: ${xs.map((x) => dec(k * x)).join(", ")}. What is the constant of proportionality?`, dec(k), ["k = y ÷ x.", `${dec(k * 2)} ÷ 2 = ${dec(k)}.`]);
  const c = rnd(3, 12), n = rnd(2, 9);
  return num(`${n} pounds of apples cost $${dec(c * n)}. What is k in y = kx, where y is the cost and x is the pounds?`, c, ["k = cost ÷ pounds.", `${dec(c * n)} ÷ ${n} = ${c}.`]);
};
M.propgraph = (lvl) => {
  const k = rnd(1, 3), x = rnd(1, 3), visual = { type: "coord", min: 0, max: 10, points: [{ x: 0, y: 0 }, { x, y: k * x, label: "P" }, { x: x + 1, y: k * (x + 1) }], line: true };
  if (rnd(0, 1)) return num(`The line shows a proportional relationship. Point P is at ${pt(x, k * x)}. What is the unit rate (the y-value when x = 1)?`, k, ["The point (1, r) shows the unit rate r.", `k = y ÷ x = ${k * x} ÷ ${x} = ${k}.`], { picture: visual });
  return choice(`What does the point (0, 0) mean on a graph of cost vs. pounds bought?`, "Buying 0 pounds costs $0.", ["The price is $0 per pound.", "You bought 1 pound.", "The graph starts at the unit rate."], ["(0, 0) means x = 0 and y = 0.", "Zero pounds cost zero dollars."], { picture: visual });
};
M.discount = (lvl) => {
  const p = pick([20, 40, 50, 60, 80, 120, 150]), r = pick([10, 15, 20, 25, 30, 40]), k = rnd(0, 2);
  if (k === 0) return num(`A $${p} jacket is ${r}% off. What is the sale price? (in dollars)`, dec(p - (p * r) / 100), [`Discount: ${r}% of $${p} = $${dec((p * r) / 100)}.`, `$${p} − $${dec((p * r) / 100)} = $${dec(p - (p * r) / 100)}.`]);
  if (k === 1) { const t = pick([5, 6, 8, 10]); return num(`A $${p} game has ${t}% sales tax. What is the total cost? (in dollars)`, (p + (p * t) / 100).toFixed(2), [`Tax: ${t}% of $${p} = $${((p * t) / 100).toFixed(2)}.`, `$${p} + $${((p * t) / 100).toFixed(2)} = $${(p + (p * t) / 100).toFixed(2)}.`], { accept: [dec(p + (p * t) / 100)] }); }
  return num(`A store buys a lamp for $${p} and marks it up ${r}%. What is the selling price? (in dollars)`, dec(p + (p * r) / 100), [`Markup: ${r}% of $${p} = $${dec((p * r) / 100)}.`, `$${p} + $${dec((p * r) / 100)} = $${dec(p + (p * r) / 100)}.`]);
};
M.simpint = (lvl) => {
  const P = pick([100, 200, 500, 800, 1000, 1500, 2000]), r = pick([2, 3, 4, 5, 6]), t = rnd(1, 5), I = (P * r * t) / 100;
  if (rnd(0, 1)) return num(`You put $${fmt(P)} in a savings account at ${r}% simple interest per year. How much interest do you earn in ${t} year${t > 1 ? "s" : ""}?`, dec(I), ["I = P × r × t.", `${fmt(P)} × ${dec(r / 100)} × ${t} = ${dec(I)}.`]);
  return num(`$${fmt(P)} earns ${r}% simple interest per year for ${t} year${t > 1 ? "s" : ""}. What is the total balance?`, dec(P + I), [`Interest: ${fmt(P)} × ${dec(r / 100)} × ${t} = ${dec(I)}.`, `Total: ${fmt(P)} + ${dec(I)} = ${dec(P + I)}.`]);
};
M.pcterr = (lvl) => {
  const a = pick([20, 25, 40, 50, 80, 100, 200]), e = pick([5, 10, 20, 25, 50]), est = a + ((a * e) / 100) * pick([1, -1]);
  if (!Number.isInteger(est)) return M.pcterr(lvl);
  return num(`${who()} guessed ${est} jelly beans. The actual number was ${a}. What is the percent error?`, e, ["Percent error = |guess − actual| ÷ actual × 100.", `|${est} − ${a}| = ${Math.abs(est - a)}.`, `${Math.abs(est - a)} ÷ ${a} = ${dec(e / 100)} → ${e}%.`], { accept: [`${e}%`] });
};

/* ---------------- Grade 7: rational numbers ---------------- */
M.intmuldiv = (lvl) => {
  const a = rnd(-12, 12) || -3, b = (rnd(1, 12)) * (a > 0 || rnd(0, 1) ? -1 : 1);
  const rule = (p) => (p < 0 ? "Different signs give a negative answer." : "Same signs give a positive answer.");
  if (rnd(0, 1)) return num(`${neg(a)} × ${b < 0 ? `(${neg(b)})` : b} = ?`, a * b, [rule(a * b || 1), `${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}, so ${neg(a * b)}.`]);
  return num(`${neg(a * b)} ÷ ${b < 0 ? `(${neg(b)})` : b} = ?`, a, [rule(a || 1), `${Math.abs(a * b)} ÷ ${Math.abs(b)} = ${Math.abs(a)}, so ${neg(a)}.`]);
};
M.ratops = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const a = rnd(-90, 90) / 10, b = rnd(-90, 90) / 10; return num(`${neg(a)} + (${neg(b)}) = ?`, dec(a + b), ["Use integer rules with decimals.", `${neg(a)} + (${neg(b)}) = ${neg(dec(a + b))}.`]); }
  if (k === 1) { const d = pick([2, 3, 4, 6]), a = rnd(1, d - 1), b = rnd(1, d - 1); return word(`−${a}/${d} − ${b}/${d} = ? (simplest form)`, `−${fr(a + b, d, true)}`, ["Same denominator: subtract the numerators.", `−${a} − ${b} = −${a + b}.`, `−${a + b}/${d} = −${fr(a + b, d, true)}.`], { accept: [`-${fr(a + b, d, true)}`, `-${a + b}/${d}`, `−${a + b}/${d}`, dec(-(a + b) / d)] }); }
  const a = rnd(2, 9) / 2, b = -rnd(2, 8);
  return num(`${a} × (${neg(b)}) = ?`, dec(a * b), ["Different signs give a negative answer.", `${a} × ${-b} = ${dec(-a * b)}, so ${neg(dec(a * b))}.`]);
};
M.distrib = (lvl) => {
  const a = rnd(2, 9) * (lvl > 1 && rnd(0, 1) ? -1 : 1), b = rnd(1, 9) * pick([1, -1]);
  return choice(`Expand: ${neg(a)}(x ${sgn(b)})`, lin(a, a * b), [lin(a, b), lin(a, -a * b), lin(1, a * b)], ["Multiply each term inside by the number outside.", `${neg(a)} × x = ${lin(a, 0)}; ${neg(a)} × ${neg(b)} = ${neg(a * b)}.`, `${lin(a, a * b)}.`]);
};
M.factorexpr = (lvl) => {
  const g = rnd(2, 9), a = rnd(2, 7), b = rnd(1, 9) * pick([1, -1]);
  if (gcd(a, Math.abs(b)) !== 1) return M.factorexpr(lvl);
  return choice(`Factor: ${lin(g * a, g * b)}`, `${g}(${lin(a, b)})`, [`${g}(${lin(a * g, b)})`, `${a}(${lin(g, b)})`, `${g * a}(x ${sgn(b)})`], [`The GCF of ${g * a} and ${Math.abs(g * b)} is ${g}.`, `${lin(g * a, g * b)} = ${g}(${lin(a, b)}).`]);
};
M.rewrite = (lvl) => {
  const p = pick([5, 6, 8, 10, 15, 20, 25]), k = rnd(0, 1);
  if (k === 0) return choice(`A price p goes up ${p}%. Which expression shows the new price?`, `${dec(1 + p / 100)}p`, [`p + ${p}`, `${dec(p / 100)}p`, `${p}p`], [`p + ${dec(p / 100)}p.`, `= ${dec(1 + p / 100)}p.`]);
  return choice(`A price p is ${p}% off. Which expression shows the sale price?`, `${dec(1 - p / 100)}p`, [`p − ${p}`, `${dec(p / 100)}p`, `${dec(1 + p / 100)}p`], [`p − ${dec(p / 100)}p.`, `= ${dec(1 - p / 100)}p.`]);
};

/* ---------------- Grade 7: equations and inequalities ---------------- */
M.twostep = (lvl) => {
  const x = rnd(-10, 12), a = rnd(2, 9) * (lvl > 2 && rnd(0, 1) ? -1 : 1), b = rnd(-15, 15) || 4;
  return num(`Solve: ${lin(a, b)} = ${neg(a * x + b)}`, x, [`${b > 0 ? "Subtract" : "Add"} ${Math.abs(b)} ${b > 0 ? "from" : "to"} both sides: ${lin(a, 0)} = ${neg(a * x)}.`, `Divide by ${neg(a)}: x = ${neg(x)}.`]);
};
M.parens = (lvl) => {
  const x = rnd(-6, 12), a = rnd(2, 8), b = rnd(-9, 9) || 2;
  return num(`Solve: ${a}(x ${sgn(b)}) = ${neg(a * (x + b))}`, x, [`Divide both sides by ${a}: x ${sgn(b)} = ${neg(x + b)}.`, `${b > 0 ? "Subtract" : "Add"} ${Math.abs(b)}: x = ${neg(x)}.`]);
};
M.ineq2 = (lvl) => {
  const x = rnd(-6, 10), a = rnd(2, 6) * (rnd(0, 2) === 0 ? -1 : 1), b = rnd(-9, 9) || 3, op = pick([">", "<"]);
  const flip = a < 0, res = flip ? (op === ">" ? "<" : ">") : op;
  return choice(`Solve: ${lin(a, b)} ${op} ${neg(a * x + b)}`, `x ${res} ${neg(x)}`, [`x ${res === ">" ? "<" : ">"} ${neg(x)}`, `x ${res} ${neg(-x)}`, `x ${res} ${neg(x + b)}`], [`Undo ${neg(b)}: ${lin(a, 0)} ${op} ${neg(a * x)}.`, `Divide by ${neg(a)}${flip ? " and flip the sign, because it is negative" : ""}: x ${res} ${neg(x)}.`]);
};
M.eqwp = (lvl) => {
  const n = who(), k = rnd(0, 2);
  if (k === 0) { const f = rnd(10, 30), r = rnd(3, 9), w = rnd(3, 12); return num(`A gym charges $${f} to join plus $${r} a visit. ${n} spent $${f + r * w}. How many visits?`, w, [`${f} + ${r}v = ${f + r * w}.`, `${r}v = ${r * w}.`, `v = ${w}.`]); }
  if (k === 1) { const w = rnd(4, 15), l = w + rnd(2, 10); return num(`A rectangle's length is ${l - w} more than its width. The perimeter is ${2 * (l + w)}. What is the width?`, w, [`2(w + w + ${l - w}) = ${2 * (l + w)}.`, `4w + ${2 * (l - w)} = ${2 * (l + w)}.`, `4w = ${4 * w}, so w = ${w}.`]); }
  const s = rnd(5, 30), a = rnd(2, 8), m = rnd(2, 6);
  return num(`${n} has $${s} and saves $${a} a week. After how many weeks will ${n} have $${s + a * m}?`, m, [`${s} + ${a}w = ${s + a * m}.`, `${a}w = ${a * m}, so w = ${m}.`]);
};

/* ---------------- Grade 7: geometry ---------------- */
M.scale = (lvl) => {
  const s = pick([2, 5, 10, 20, 25, 50]), c = rnd(2, 12), k = rnd(0, 1);
  if (k === 0) return num(`On a map, 1 cm = ${s} km. Two towns are ${c} cm apart on the map. How far apart are they really? (km)`, s * c, [`Each cm stands for ${s} km.`, `${c} × ${s} = ${s * c} km.`]);
  return num(`A drawing uses 1 inch = ${s} feet. A room is ${s * c} feet long. How long is it in the drawing? (inches)`, c, [`Divide by the scale.`, `${s * c} ÷ ${s} = ${c} inches.`]);
};
M.anglerel = (lvl) => {
  const a = rnd(15, 75), k = rnd(0, 3);
  if (k === 0) return num(`Two angles are complementary. One is ${a}°. What is the other?`, 90 - a, ["Complementary angles add to 90°.", `90 − ${a} = ${90 - a}°.`], { picture: { type: "angle", deg: 90, split: [a, 90 - a], ask: 1 } });
  if (k === 1) { const b = rnd(20, 160); return num(`Two angles are supplementary. One is ${b}°. What is the other?`, 180 - b, ["Supplementary angles add to 180°.", `180 − ${b} = ${180 - b}°.`], { picture: { type: "angle", deg: 180, split: [b, 180 - b], ask: 1 } }); }
  if (k === 2) { const b = rnd(20, 160); return num(`Two lines cross. One angle is ${b}°. What is the vertical angle across from it?`, b, ["Vertical angles are equal.", `It is also ${b}°.`]); }
  const b = rnd(30, 100), c = rnd(20, 150 - b);
  return num(`A triangle has angles of ${b}° and ${c}°. What is the third angle?`, 180 - b - c, ["The angles in a triangle add to 180°.", `180 − ${b} − ${c} = ${180 - b - c}°.`]);
};
M.circle = (lvl) => {
  const r = rnd(1, 12), k = rnd(0, 2);
  if (k === 0) return num(`Find the circumference of a circle with radius ${r} cm. Use 3.14.`, dec(pi(2 * r)), ["C = 2πr.", `2 × 3.14 × ${r} = ${dec(pi(2 * r))} cm.`]);
  if (k === 1) return num(`Find the area of a circle with radius ${r} m. Use 3.14.`, dec(pi(r * r)), ["A = πr².", `3.14 × ${r}² = 3.14 × ${r * r} = ${dec(pi(r * r))} m².`]);
  return num(`A circle has a diameter of ${2 * r} in. Find its circumference. Use 3.14.`, dec(pi(2 * r)), ["C = πd.", `3.14 × ${2 * r} = ${dec(pi(2 * r))} in.`]);
};
M.geo7 = (lvl) => {
  const k = rnd(0, 2), l = rnd(3, 10), w = rnd(2, 8), h = rnd(2, 9);
  if (k === 0) return num(`What is the volume of a rectangular prism ${l} cm by ${w} cm by ${h} cm? (cubic cm)`, l * w * h, ["V = l × w × h.", `${l} × ${w} × ${h} = ${l * w * h} cm³.`], { picture: { type: "cubes", l: Math.min(l, 10), w: Math.min(w, 6), h: Math.min(h, 8), labels: true, unit: "cm" } });
  if (k === 1) { const b = rnd(2, 8) * 2, t = rnd(2, 8), L = rnd(3, 10); return num(`A triangular prism has a triangle base with base ${b} and height ${t}, and is ${L} long. What is its volume?`, (b * t * L) / 2, ["V = (area of the base) × length.", `Base: ½ × ${b} × ${t} = ${(b * t) / 2}.`, `${(b * t) / 2} × ${L} = ${(b * t * L) / 2}.`]); }
  const a = rnd(4, 10), c = rnd(2, a - 1), d = rnd(4, 10), e = rnd(2, d - 1);
  return num(`An L-shaped room is a ${a} by ${d} rectangle with a ${c} by ${e} corner cut out. What is its area?`, a * d - c * e, [`Whole rectangle: ${a} × ${d} = ${a * d}.`, `Cut-out: ${c} × ${e} = ${c * e}.`, `${a * d} − ${c * e} = ${a * d - c * e}.`], { picture: { type: "area", rows: Math.min(a, 12), cols: Math.min(d, 14), cut: { rows: c, cols: e } } });
};

/* ---------------- Grade 7: statistics and probability ---------------- */
const SAMPLE = [["Which sample is most likely to represent all students at a school?", "50 students picked at random from the school list", ["The 20 students in the chess club", "Your 10 closest friends", "Students in the cafeteria line for pizza"]], ["A survey asks only people at a gym about exercise. Why might it be biased?", "Gym members probably exercise more than most people.", ["The sample is random.", "Gyms are too small.", "Everyone exercises the same amount."]], ["What is a random sample?", "Every member of the group has an equal chance to be chosen.", ["Only volunteers are chosen.", "The first people you see are chosen.", "Only experts are chosen."]], ["To learn the favorite lunch of a whole school, who should you survey?", "Students chosen randomly from every grade", ["Only sixth graders", "Only the cooks", "Only students who bring lunch"]], ["Why use a sample instead of asking everyone?", "Asking everyone takes too much time or money.", ["Samples are always perfect.", "Samples give exact answers.", "It is against the rules to ask everyone."]], ["Which question is NOT biased?", "What is your favorite season?", ["Don't you agree summer is the best season?", "Isn't winter awful?", "Why is spring better than fall?"]]];
M.sampling = (lvl) => {
  if (rnd(0, 1)) { const n = pick([20, 25, 40, 50]), y = rnd(2, n / 2), N = pick([200, 400, 500, 1000]); return num(`In a random sample of ${n} students, ${y} like chess. Predict how many of the school's ${N} students like chess.`, (y * N) / n, [`Sample rate: ${y}/${n}.`, `${y}/${n} × ${N} = ${(y * N) / n}.`]); }
  const [q, a, ws] = pick(SAMPLE);
  return choice(q, a, ws, ["A good sample is random and represents the whole group.", a]);
};
M.comppop = (lvl) => {
  const A = niceList(5, 10, 30), B = niceList(5, 15, 40), mA = mean(A), mB = mean(B);
  if (mA === mB) return M.comppop(lvl);
  if (rnd(0, 1)) return num(`Class A scores: ${A.join(", ")}. Class B scores: ${B.join(", ")}. What is the difference between the means?`, Math.abs(mA - mB), [`Mean A = ${mA}. Mean B = ${mB}.`, `Difference: ${Math.abs(mA - mB)}.`]);
  return choice(`Class A scores: ${A.join(", ")}. Class B scores: ${B.join(", ")}. Which class has the higher mean?`, mA > mB ? "Class A" : "Class B", ["Class A", "Class B", "They are equal"], [`Mean A = ${mA}; mean B = ${mB}.`], { keepOrder: ["Class A", "Class B", "They are equal"] });
};
M.mad = (lvl) => {
  const xs = niceList(pick([4, 5]), 1, 20), m = mean(xs), d = xs.map((x) => Math.abs(x - m)), v = mean(d);
  return num(`Find the mean absolute deviation (MAD) of ${xs.join(", ")}.`, dec(v), [`Mean: ${m}.`, `Distances from the mean: ${d.join(", ")}.`, `Mean of the distances: ${d.reduce((a, b) => a + b, 0)} ÷ ${xs.length} = ${dec(v)}.`]);
};
M.inferdata = (lvl) => {
  const n = pick([20, 30, 40, 50]), y = rnd(2, n - 2), N = pick([300, 600, 900, 1200]);
  if ((y * N) % n) return M.inferdata(lvl);
  const t = pick(["prefer pizza", "walk to school", "have a pet", "play an instrument"]);
  return num(`In a random sample of ${n} students, ${y} ${t}. About how many of ${fmt(N)} students ${t}?`, (y * N) / n, ["Set up a proportion: sample part / sample size = whole part / whole size.", `${y}/${n} = ?/${fmt(N)}.`, `${y} × ${N / n} = ${(y * N) / n}.`]);
};
M.prob = (lvl) => {
  const r = rnd(1, 6), b = rnd(1, 6), g = rnd(0, 5), t = r + b + g, k = rnd(0, 2);
  if (k === 0) return word(`A bag has ${r} red, ${b} blue and ${g} green marbles. What is P(red)? (simplest form)`, fr(r, t), [`Total: ${t}.`, `P(red) = ${r}/${t} = ${fr(r, t)}.`], { accept: [`${r}/${t}`, dec(r / t)] });
  if (k === 1) { const n = rnd(1, 6); return word(`You roll a number cube (1–6). What is P(a number greater than ${n})? (simplest form)`, fr(6 - n, 6), [`Numbers greater than ${n}: ${6 - n}.`, `P = ${6 - n}/6 = ${fr(6 - n, 6)}.`], { accept: [`${6 - n}/6`, dec((6 - n) / 6)] }); }
  return choice("Which probability means an event is impossible?", "0", ["1", "1/2", "2"], ["Probability goes from 0 (impossible) to 1 (certain).", "Impossible = 0."]);
};
M.expprob = (lvl) => {
  const n = pick([30, 60, 120]), k = rnd(0, 1);
  if (k === 0) return num(`You roll a number cube ${n} times. How many times would you expect to roll a 4?`, n / 6, ["Theoretical P(4) = 1/6.", `1/6 × ${n} = ${n / 6}.`]);
  const h = rnd(10, n - 10);
  return word(`A coin is flipped ${n} times and lands heads ${h} times. What is the experimental probability of heads? (simplest form)`, fr(h, n), ["Experimental probability = results ÷ trials.", `${h}/${n} = ${fr(h, n)}.`], { accept: [`${h}/${n}`, dec(h / n)] });
};
M.compound = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const a = pick([2, 3, 4]), b = pick([2, 3, 4, 5, 6]); return num(`You pick one of ${a} shirts and one of ${b} pairs of shorts. How many outfits are possible?`, a * b, ["Multiply the choices.", `${a} × ${b} = ${a * b}.`]); }
  if (k === 1) return word("You flip a coin and roll a number cube. What is P(heads and a 6)? (simplest form)", "1/12", ["P(heads) = 1/2; P(6) = 1/6.", "1/2 × 1/6 = 1/12."]);
  const n = rnd(2, 5);
  return word(`You flip ${n} coins. What is P(all heads)? (simplest form)`, `1/${2 ** n}`, [`Each coin: 1/2.`, `(1/2)^${n} = 1/${2 ** n}.`]);
};
M.probmodel = (lvl) => {
  const parts = rnd(4, 10), colored = rnd(1, parts - 1);
  if (rnd(0, 1)) return word(`A spinner has ${parts} equal parts; ${colored} are blue. What is P(blue)? (simplest form)`, fr(colored, parts), [`P = blue parts ÷ all parts.`, fr(colored, parts) === `${colored}/${parts}` ? `P(blue) = ${colored}/${parts}.` : `${colored}/${parts} = ${fr(colored, parts)}.`], { picture: { type: "fraction", parts, shaded: colored, shape: "circle" }, accept: [`${colored}/${parts}`] });
  return choice("A spinner has 4 equal sections. Is this a uniform probability model?", "Yes, each section is equally likely.", ["No, some sections are more likely.", "No, a spinner can't be a model.", "Only if it spins twice."], ["Uniform means every outcome has the same probability.", "Equal sections → equal chances."], { picture: { type: "fraction", parts: 4, shaded: 1, shape: "circle" } });
};

/* ---------------- Grade 8: numbers ---------------- */
M.irrational = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const n = pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 20, 26, 30, 40, 50, 60, 70, 80, 90]), lo = Math.floor(Math.sqrt(n)); return choice(`√${n} is between which two whole numbers?`, `${lo} and ${lo + 1}`, [`${lo - 1} and ${lo}`, `${lo + 1} and ${lo + 2}`, `${Math.floor(n / 2)} and ${Math.floor(n / 2) + 1}`], [`${lo}² = ${lo * lo} and ${lo + 1}² = ${(lo + 1) ** 2}.`, `${n} is between them, so √${n} is between ${lo} and ${lo + 1}.`]); }
  const ir = pick(["√2", "π", "√7", "√15", "0.1010010001…"]), rs = sample(["√25", "0.75", "2/3", "−4", "0.333…", "√49", "3.5"], 3);
  if (k === 1) return choice("Which number is irrational?", ir, rs, ["Irrational numbers can't be written as a fraction; their decimals never end or repeat.", `${ir} is irrational.`]);
  return choice(`Which number is rational?`, rs[0], sample(["√2", "π", "√7", "√15", "√3"], 3), ["Rational numbers can be written as a fraction of integers.", `${rs[0]} is rational.`]);
};
M.roots = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const n = rnd(2, 15); return num(`√${n * n} = ?`, n, [`Which number times itself is ${n * n}?`, `${n} × ${n} = ${n * n}.`]); }
  if (k === 1) { const n = rnd(1, 10); return num(`∛${n ** 3} = ?`, n, [`Which number times itself 3 times is ${n ** 3}?`, `${n} × ${n} × ${n} = ${n ** 3}.`]); }
  const n = rnd(2, 12);
  return num(`Solve x² = ${n * n} for the positive value of x.`, n, ["Take the square root of both sides.", `x = √${n * n} = ${n}.`]);
};
const SUP = { "-9": "⁻⁹", "-8": "⁻⁸", "-7": "⁻⁷", "-6": "⁻⁶", "-5": "⁻⁵", "-4": "⁻⁴", "-3": "⁻³", "-2": "⁻²", "-1": "⁻¹", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", 10: "¹⁰", 11: "¹¹", 12: "¹²", 13: "¹³", 14: "¹⁴", 15: "¹⁵", 16: "¹⁶" };
const sup = (n) => (SUP[n] != null ? SUP[n] : `^${n}`);
M.intexp = (lvl) => {
  const b = rnd(2, 5), m = rnd(1, 5), n = rnd(1, 4), k = rnd(0, 3);
  if (k === 0) return num(`${b}${sup(m)} × ${b}${sup(n)} = ${b}^? What is the exponent?`, m + n, ["Same base: add the exponents.", `${m} + ${n} = ${m + n}.`]);
  if (k === 1) return num(`(${b}${sup(m)})${sup(n)} = ${b}^? What is the exponent?`, m * n, ["Power to a power: multiply the exponents.", `${m} × ${n} = ${m * n}.`]);
  if (k === 2) { const e = rnd(1, 3); return word(`${b}${sup(-e)} = ? (as a fraction)`, `1/${b ** e}`, ["A negative exponent means 1 over the positive power.", `${b}${sup(-e)} = 1/${b}${sup(e)} = 1/${b ** e}.`], { accept: [dec(1 / b ** e, 6)] }); }
  return num(`${rnd(2, 99)}⁰ = ?`, 1, ["Any nonzero number to the zero power is 1."]);
};
M.scinot = (lvl) => {
  const a = rnd(11, 99) / 10, e = rnd(3, 8) * (lvl > 1 && rnd(0, 1) ? -1 : 1), k = rnd(0, 2);
  const std = e > 0 ? fmt(Math.round(a * 10 ** e)) : (a * 10 ** e).toFixed(-e + 1);
  if (k === 0) return choice(`Write ${std} in scientific notation.`, `${a} × 10${sup(e)}`, [`${a} × 10${sup(e > 0 ? e - 1 : e + 1)}`, `${dec(a * 10)} × 10${sup(e > 0 ? e - 1 : e + 1)}`, `${a} × 10${sup(-e)}`], [`Move the decimal point so one digit is before it: ${a}.`, `It moved ${Math.abs(e)} places ${e > 0 ? "left" : "right"}, so the exponent is ${neg(e)}.`]);
  if (k === 1) return choice(`Write ${a} × 10${sup(e)} in standard form.`, std, [e > 0 ? fmt(Math.round(a * 10 ** (e - 1))) : (a * 10 ** (e + 1)).toFixed(-e), e > 0 ? fmt(Math.round(a * 10 ** (e + 1))) : (a * 10 ** (e - 1)).toFixed(-e + 2)], [`Move the decimal point ${Math.abs(e)} places ${e > 0 ? "right" : "left"}.`, `${std}.`]);
  const x = rnd(2, 4), y = rnd(1, 2), p = rnd(2, 5), q = rnd(2, 4);
  return choice(`(${x} × 10${sup(p)}) × (${y} × 10${sup(q)}) = ?`, `${x * y} × 10${sup(p + q)}`, [`${x * y} × 10${sup(p * q)}`, `${x + y} × 10${sup(p + q)}`, `${x * y} × 10${sup(Math.abs(p - q))}`], [`Multiply the numbers: ${x} × ${y} = ${x * y}.`, `Add the exponents: ${p} + ${q} = ${p + q}.`]);
};

/* ---------------- Grade 8: linear equations, functions and systems ---------------- */
M.bothsides = (lvl) => {
  const x = rnd(-8, 10), a = rnd(3, 9), c = rnd(1, a - 1), b = rnd(-12, 12), d = (a - c) * x + b;
  return num(`Solve: ${lin(a, b)} = ${lin(c, d)}`, x, [`Subtract ${c}x from both sides: ${lin(a - c, b)} = ${neg(d)}.`, `${b >= 0 ? "Subtract" : "Add"} ${Math.abs(b)}: ${lin(a - c, 0)} = ${neg(d - b)}.`, ...(a - c > 1 ? [`Divide by ${a - c}: x = ${neg(x)}.`] : [])]);
};
M.numsol = (lvl) => {
  const a = rnd(2, 6), b = rnd(1, 9), k = rnd(0, 2), c = k === 0 ? a + rnd(1, 3) : a, d = k === 1 ? b + rnd(1, 5) : b;
  const ans = ["One solution", "No solution", "Infinitely many solutions"][k];
  return choice(`How many solutions does ${lin(a, b)} = ${lin(c, d)} have?`, ans, ["One solution", "No solution", "Infinitely many solutions"], [k === 0 ? "The x coefficients are different, so there is exactly one solution." : k === 1 ? `Same x coefficients but ${b} ≠ ${d}: the equation is never true.` : "Both sides are exactly the same, so every x works."], { keepOrder: ["One solution", "No solution", "Infinitely many solutions"] });
};
M.slope = (lvl) => {
  const m = pick([-3, -2, -1, 1, 2, 3, 4]), x1 = rnd(-3, 2), y1 = rnd(-3, 3), dx = rnd(1, 3), x2 = x1 + dx, y2 = y1 + m * dx;
  if (rnd(0, 1)) return num(`Find the slope of the line through ${pt(x1, y1)} and ${pt(x2, y2)}.`, m, ["slope = rise ÷ run = (y₂ − y₁) ÷ (x₂ − x₁).", `(${neg(y2)} − ${y1 < 0 ? `(${neg(y1)})` : y1}) ÷ (${neg(x2)} − ${x1 < 0 ? `(${neg(x1)})` : x1}) = ${neg(m * dx)} ÷ ${dx} = ${neg(m)}.`], { visual: Math.abs(y2) <= 10 && Math.abs(y1) <= 10 ? { type: "coord", min: -10, max: 10, points: [{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], line: true } : null });
  const b = rnd(-5, 10);
  return num(`A table shows x: 0, 1, 2, 3 and y: ${[0, 1, 2, 3].map((x) => neg(m * x + b)).join(", ")}. What is the slope?`, m, ["Slope = change in y ÷ change in x.", `y changes by ${neg(m)} each time x goes up 1.`]);
};
M.ymxb = (lvl) => {
  const m = pick([-3, -2, -1, 2, 3, 4, 5]), b = rnd(-6, 8), k = rnd(0, 2);
  if (k === 0) return num(`What is the y-intercept of y = ${lin(m, b)}?`, b, ["In y = mx + b, b is the y-intercept.", `b = ${neg(b)}.`]);
  if (k === 1) return num(`What is the slope of y = ${lin(m, b)}?`, m, ["In y = mx + b, m is the slope.", `m = ${neg(m)}.`]);
  const x = rnd(-3, 5);
  return num(`For y = ${lin(m, b)}, what is y when x = ${neg(x)}?`, m * x + b, [`${neg(m)} × ${x < 0 ? `(${neg(x)})` : x} ${sgn(b)} = ${neg(m * x)} ${sgn(b)} = ${neg(m * x + b)}.`]);
};
M.funcq = (lvl) => {
  const xs = sample([1, 2, 3, 4, 5, 6], 4), yes = rnd(0, 1), ys = xs.map(() => rnd(0, 9));
  const pairs = xs.map((x, i) => [x, ys[i]]);
  if (!yes) pairs[3] = [pairs[0][0], (pairs[0][1] + rnd(1, 5)) % 10];
  const set = `{${pairs.map(([x, y]) => `(${x}, ${y})`).join(", ")}}`;
  return choice(`Is this relation a function? ${set}`, yes ? "Yes" : "No", ["Yes", "No"], ["A function gives each input exactly one output.", yes ? "Every x appears once, so yes." : `x = ${pairs[0][0]} has two different outputs, so no.`], { keepOrder: ["Yes", "No"] });
};
M.compfunc = (lvl) => {
  const m1 = rnd(2, 9), m2 = rnd(2, 9), b1 = rnd(0, 9), b2 = rnd(0, 9);
  if (m1 === m2) return M.compfunc(lvl);
  return choice(`Function A: y = ${lin(m1, b1)}. Function B has the table x: 0, 1, 2; y: ${b2}, ${b2 + m2}, ${b2 + 2 * m2}. Which has the greater rate of change?`, m1 > m2 ? "Function A" : "Function B", ["Function A", "Function B", "They are the same"], [`A's slope is ${m1}.`, `B goes up ${m2} each step, so its slope is ${m2}.`], { keepOrder: ["Function A", "Function B", "They are the same"] });
};
M.linnon = (lvl) => {
  const lins = ["y = 3x + 1", "y = −2x", "y = x/2 + 4", "y = 5 − x", "y = 0.5x − 3"], nons = ["y = x²", "y = 2ˣ", "y = 1/x", "y = x³ − 1", "y = x² + 3"];
  if (rnd(0, 1)) { const good = pick(nons); return choice("Which function is nonlinear?", good, sample(lins, 3), ["Linear functions have x only to the first power.", `${good} curves, so it is nonlinear.`]); }
  const good = pick(lins);
  return choice("Which function is linear?", good, sample(nons, 3), ["A linear function looks like y = mx + b.", `${good} is linear.`]);
};
M.writefunc = (lvl) => {
  const m = pick([-3, -2, 2, 3, 4, 5]), b = rnd(-5, 9);
  return choice(`Which equation fits the table x: 0, 1, 2, 3 and y: ${[0, 1, 2, 3].map((x) => neg(m * x + b)).join(", ")}?`, `y = ${lin(m, b)}`, [`y = ${lin(b || 1, m)}`, `y = ${lin(m, b + m)}`, `y = ${lin(-m, b)}`], [`When x = 0, y = ${neg(b)}: that's b.`, `y changes by ${neg(m)} each step: that's m.`, `y = ${lin(m, b)}.`]);
};
function system() {
  const x = rnd(-4, 5), y = rnd(-4, 5), m1 = pick([1, 2, -1, 3]); let m2 = pick([-2, -1, 1, 2, -3]);
  if (m2 === m1) m2 = -m1 - 1;
  return { x, y, m1, b1: y - m1 * x, m2, b2: y - m2 * x };
}
M.sysgraph = (lvl) => {
  const s = system(), ok = [s.b1, s.b2, s.m1 * 3 + s.b1, s.m2 * 3 + s.b2].every((v) => Math.abs(v) <= 9);
  if (!ok || Math.abs(s.x) > 5) return M.sysgraph(lvl);
  return word(`Where do y = ${lin(s.m1, s.b1)} and y = ${lin(s.m2, s.b2)} cross? Write the point like (1, 2).`, pt(s.x, s.y), ["The solution is where the lines cross.", `Check: at x = ${neg(s.x)}, both give y = ${neg(s.y)}.`, `The solution is ${pt(s.x, s.y)}.`], { accept: [`(${s.x},${s.y})`, `(${s.x}, ${s.y})`] });
};
M.subst = (lvl) => {
  const s = system();
  return num(`Solve by substitution: y = ${lin(s.m1, s.b1)} and y = ${lin(s.m2, s.b2)}. What is x?`, s.x, [`Set them equal: ${lin(s.m1, s.b1)} = ${lin(s.m2, s.b2)}.`, `${lin(s.m1 - s.m2, 0)} = ${neg(s.b2 - s.b1)}.`, `x = ${neg(s.x)} (and y = ${neg(s.y)}).`]);
};
M.elim = (lvl) => {
  const x = rnd(-5, 8), y = rnd(-5, 8), a = rnd(1, 4), b = rnd(1, 4), c = rnd(1, 4);
  return num(`Solve by elimination: ${lin(a, 0)} + ${lin(b, 0, "y")} = ${neg(a * x + b * y)} and ${lin(c, 0)} − ${lin(b, 0, "y")} = ${neg(c * x - b * y)}. What is x?`, x, ["Add the equations: the y terms cancel.", `${lin(a + c, 0)} = ${neg((a + c) * x)}.`, `x = ${neg(x)}.`]);
};
M.syswp = (lvl) => {
  const a = rnd(5, 20), c = rnd(5, 20), pa = rnd(5, 12), pc = rnd(2, pa - 1);
  return num(`A show sold ${a + c} tickets for $${a * pa + c * pc}. Adult tickets cost $${pa} and child tickets cost $${pc}. How many adult tickets were sold?`, a, [`a + c = ${a + c} and ${pa}a + ${pc}c = ${a * pa + c * pc}.`, `Replace c with ${a + c} − a: ${pa}a + ${pc}(${a + c} − a) = ${a * pa + c * pc}.`, `${pa - pc}a + ${pc * (a + c)} = ${a * pa + c * pc}, so ${pa - pc}a = ${(pa - pc) * a}.`, `a = ${a}.`]);
};

/* ---------------- Grade 8: transformations ---------------- */
M.transform = (lvl) => {
  const x = rnd(-5, 5), y = rnd(-5, 5), k = rnd(0, 3), acc = (X, Y) => ({ accept: [`(${X},${Y})`, `(${X}, ${Y})`] });
  if (k === 0) { const h = rnd(-4, 4) || 2, v = rnd(-4, 4) || -3; return word(`Translate ${pt(x, y)} ${Math.abs(h)} ${h > 0 ? "right" : "left"} and ${Math.abs(v)} ${v > 0 ? "up" : "down"}. Where does it land?`, pt(x + h, y + v), [`Add ${neg(h)} to x and ${neg(v)} to y.`, `${pt(x + h, y + v)}.`], acc(x + h, y + v)); }
  if (k === 1) return word(`Reflect ${pt(x, y)} across the y-axis. Where does it land?`, pt(-x, y), ["Reflecting across the y-axis changes the sign of x.", `${pt(-x, y)}.`], acc(-x, y));
  if (k === 2) return word(`Rotate ${pt(x, y)} 180° around the origin. Where does it land?`, pt(-x, -y), ["A 180° rotation changes both signs: (x, y) → (−x, −y).", `${pt(-x, -y)}.`], acc(-x, -y));
  return word(`Rotate ${pt(x, y)} 90° counterclockwise around the origin. Where does it land?`, pt(-y, x), ["90° counterclockwise: (x, y) → (−y, x).", `${pt(-y, x)}.`], acc(-y, x));
};
M.dilation = (lvl) => {
  const k = pick([2, 3, 0.5, 4]), x = rnd(-4, 4) * 2, y = rnd(-4, 4) * 2;
  if (rnd(0, 1)) return word(`Dilate ${pt(x, y)} by a scale factor of ${k} from the origin. Where does it land?`, pt(x * k, y * k), [`Multiply both coordinates by ${k}.`, `${pt(x * k, y * k)}.`], { accept: [`(${x * k},${y * k})`, `(${x * k}, ${y * k})`] });
  const s = rnd(2, 9) * 2;
  return num(`A square with sides of ${s} cm is dilated by a scale factor of ${k}. How long is each new side?`, dec(s * k), [`Multiply by the scale factor: ${s} × ${k} = ${dec(s * k)} cm.`]);
};
M.congsim = (lvl) => {
  const k = rnd(0, 1);
  if (k === 0) { const a = rnd(2, 9), b = rnd(2, 9), f = rnd(2, 4); return num(`Two triangles are similar. Sides ${a} and ${b} in the small one match sides ${a * f} and ? in the big one. What is the missing side?`, b * f, [`Scale factor: ${a * f} ÷ ${a} = ${f}.`, `${b} × ${f} = ${b * f}.`]); }
  const good = pick(["a translation", "a reflection", "a rotation"]);
  return choice("Which transformation always makes a congruent figure (same size and shape)?", good, ["a dilation by 2", "a dilation by 1/2", "stretching only the width"], ["Translations, reflections and rotations keep size and shape.", "Dilations change the size."]);
};
M.parallel = (lvl) => {
  const a = rnd(35, 145), k = rnd(0, 3);
  if (k === 0) return num(`A transversal crosses two parallel lines. One angle is ${a}°. What is its corresponding angle?`, a, ["Corresponding angles are equal when lines are parallel.", `${a}°.`]);
  if (k === 1) return num(`A transversal crosses two parallel lines. One angle is ${a}°. What is the same-side interior angle?`, 180 - a, ["Same-side interior angles add to 180°.", `180 − ${a} = ${180 - a}°.`]);
  if (k === 2) return num(`A transversal crosses two parallel lines. One angle is ${a}°. What is its alternate interior angle?`, a, ["Alternate interior angles are equal.", `${a}°.`]);
  const b = rnd(30, 80), c = rnd(30, 80);
  return num(`A triangle has interior angles ${b}° and ${c}°. What is the exterior angle next to the third angle?`, b + c, ["An exterior angle equals the sum of the two far interior angles.", `${b} + ${c} = ${b + c}°.`]);
};

/* ---------------- Grade 8: Pythagorean theorem ---------------- */
M.pyth = (lvl) => {
  const [a, b, c] = pick(TRIPLES);
  if (rnd(0, 2) === 0) { const t = pick(TRIPLES), bad = [t[0], t[1], t[2] + 1]; const isT = rnd(0, 1); const s = isT ? t : bad; return choice(`Can ${s.join(", ")} be the sides of a right triangle?`, isT ? "Yes" : "No", ["Yes", "No"], ["Check a² + b² = c².", `${s[0]}² + ${s[1]}² = ${s[0] ** 2 + s[1] ** 2}; ${s[2]}² = ${s[2] ** 2}.`, isT ? "They match, so yes." : "They don't match, so no."], { keepOrder: ["Yes", "No"] }); }
  return num(`A right triangle has legs ${a} and ${b}. How long is the hypotenuse?`, c, ["a² + b² = c².", `${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}.`, `c = √${c * c} = ${c}.`]);
};
M.pythleg = (lvl) => {
  const [a, b, c] = pick(TRIPLES);
  return num(`A right triangle has a hypotenuse of ${c} and one leg of ${a}. How long is the other leg?`, b, ["a² + b² = c², so b² = c² − a².", `${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}.`, `b = √${b * b} = ${b}.`]);
};
M.dist = (lvl) => {
  const [a, b, c] = pick(TRIPLES.filter((t) => t[1] <= 12)), x = rnd(-6, 0), y = rnd(-6, 0), sw = rnd(0, 1), dx = sw ? b : a, dy = sw ? a : b;
  return num(`Find the distance between ${pt(x, y)} and ${pt(x + dx, y + dy)}.`, c, [`Across: ${dx}. Up: ${dy}.`, `d² = ${dx}² + ${dy}² = ${dx * dx + dy * dy}.`, `d = ${c}.`]);
};
M.pythwp = (lvl) => {
  const [a, b, c] = pick(TRIPLES), k = rnd(0, 2);
  if (k === 0) return num(`A ${c}-foot ladder leans on a wall. Its foot is ${a} feet from the wall. How high up the wall does it reach?`, b, [`The ladder is the hypotenuse: ${c}.`, `h² = ${c}² − ${a}² = ${b * b}.`, `h = ${b} feet.`]);
  if (k === 1) return num(`A TV screen is ${a} inches tall and ${b} inches wide. How long is its diagonal?`, c, [`d² = ${a}² + ${b}² = ${c * c}.`, `d = ${c} inches.`]);
  return num(`${who()} walks ${a} blocks north, then ${b} blocks east. How far is that in a straight line from the start?`, c, ["The path makes a right triangle.", `d² = ${a}² + ${b}² = ${c * c}.`, `d = ${c} blocks.`]);
};

/* ---------------- Grade 8: volume ---------------- */
M.cyl = (lvl) => {
  const r = rnd(1, 8), h = rnd(2, 12);
  if (rnd(0, 2) === 0) return word(`Find the volume of a cylinder with radius ${r} and height ${h}. Give the answer in terms of π.`, `${r * r * h}π`, ["V = πr²h.", `π × ${r}² × ${h} = ${r * r * h}π.`], { accept: [`${r * r * h} π`, `${r * r * h}pi`, dec(pi(r * r * h))] });
  return num(`Find the volume of a cylinder with radius ${r} cm and height ${h} cm. Use 3.14.`, dec(pi(r * r * h)), ["V = πr²h.", `3.14 × ${r}² × ${h} = 3.14 × ${r * r * h} = ${dec(pi(r * r * h))} cm³.`], { picture: { type: "solid", kind: "cylinder" } });
};
M.cone = (lvl) => {
  const r = rnd(1, 6), h = rnd(1, 5) * 3, v = (r * r * h) / 3;
  if (rnd(0, 2) === 0) return word(`Find the volume of a cone with radius ${r} and height ${h}. Give the answer in terms of π.`, `${v}π`, ["V = ⅓πr²h.", `⅓ × π × ${r}² × ${h} = ${v}π.`], { accept: [`${v} π`, `${v}pi`, dec(pi(v))] });
  return num(`Find the volume of a cone with radius ${r} in and height ${h} in. Use 3.14.`, dec(pi(v)), ["V = ⅓πr²h.", `⅓ × ${r * r} × ${h} = ${v}.`, `3.14 × ${v} = ${dec(pi(v))} in³.`], { picture: { type: "solid", kind: "cone" } });
};
M.sphere = (lvl) => {
  const r = pick([3, 6, 3, 9]), v = (4 * r ** 3) / 3;
  if (rnd(0, 1)) return word(`Find the volume of a sphere with radius ${r}. Give the answer in terms of π.`, `${v}π`, ["V = 4/3 πr³.", `4/3 × ${r}³ = 4/3 × ${r ** 3} = ${v}.`, `${v}π.`], { accept: [`${v} π`, `${v}pi`, dec(pi(v))] });
  return num(`Find the volume of a ball with radius ${r} cm. Use 3.14.`, dec(pi(v)), ["V = 4/3 πr³.", `4/3 × ${r ** 3} = ${v}.`, `3.14 × ${v} = ${dec(pi(v))} cm³.`], { picture: { type: "solid", kind: "sphere" } });
};
M.volmix = (lvl) => pick([M.cyl, M.cone, M.sphere])(lvl);

/* ---------------- Grade 8: data ---------------- */
M.scatter = (lvl) => {
  const k = pick([1, -1, 0]), pts = [1, 2, 3, 4, 5, 6, 7].map((x) => ({ x, y: k === 0 ? rnd(1, 9) : Math.max(0, Math.min(10, (k > 0 ? x : 9 - x) + rnd(-1, 1) + 1)) }));
  if (k === 0 && Math.abs(pts[0].y - pts[6].y) > 4) return M.scatter(lvl);
  const ans = k > 0 ? "Positive association" : k < 0 ? "Negative association" : "No association";
  return choice("What kind of association does the scatter plot show?", ans, ["Positive association", "Negative association", "No association"], ["Positive: as x goes up, y goes up. Negative: as x goes up, y goes down.", `This plot shows ${ans.toLowerCase()}.`], { picture: { type: "coord", min: 0, max: 10, points: pts }, keepOrder: ["Positive association", "Negative association", "No association"] });
};
M.bestfit = (lvl) => {
  const m = pick([2, 3, 5, 0.5, 1.5]), b = rnd(0, 20), x = rnd(4, 20);
  if (rnd(0, 1)) return num(`A line of best fit is y = ${m}x + ${b}, where x is hours studied and y is a test score gain. Predict y when x = ${x}.`, dec(m * x + b), [`${m} × ${x} + ${b} = ${dec(m * x)} + ${b} = ${dec(m * x + b)}.`]);
  return num(`The line of best fit for plant height y (cm) after x weeks is y = ${m}x + ${b}. How much does the plant grow each week?`, m, ["The slope is the rate of change.", `${m} cm per week.`]);
};
M.twoway = (lvl) => {
  const a = rnd(5, 20), b = rnd(5, 20), c = rnd(5, 20), d = rnd(5, 20), k = rnd(0, 2);
  const rows = [["", "Pet", "No pet"], ["Grade 7", String(a), String(b)], ["Grade 8", String(c), String(d)]];
  if (k === 0) return num("How many students in the table have a pet?", a + c, [`Add the "Pet" column: ${a} + ${c} = ${a + c}.`], { visual: { type: "table", rows } });
  if (k === 1) return word("What fraction of Grade 7 students have a pet? (simplest form)", fr(a, a + b), [`Grade 7 total: ${a} + ${b} = ${a + b}.`, fr(a, a + b) === `${a}/${a + b}` ? `${a} of ${a + b} is ${a}/${a + b}.` : `${a}/${a + b} = ${fr(a, a + b)}.`], { visual: { type: "table", rows }, accept: [`${a}/${a + b}`, dec(a / (a + b))] });
  return num("How many students were surveyed in all?", a + b + c + d, [`${a} + ${b} + ${c} + ${d} = ${a + b + c + d}.`], { visual: { type: "table", rows } });
};

export const MIDDLE = M;
