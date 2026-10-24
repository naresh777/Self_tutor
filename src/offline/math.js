// Built-in math problems for every Grade 2 and Grade 3 TEKS topic, with pictures.
// Each generator takes a level (1 warm-up, 2 on grade level, 3 stretch) and an optional argument,
// and returns one problem. The op names are set on the topics in course.js ("name|op:arg#TEKS").
import { rnd, pick, shuffle, sample, fmt, num, choice, word, NAMES } from "./util.js";
import { localOne } from "../check.js";
import { EARLY } from "./math-early.js";
import { UPPER } from "./math-upper.js";
import { MIDDLE } from "./math-middle.js";

const sign = (a, b) => (a > b ? ">" : a < b ? "<" : "=");
const CMP = [">", "<", "="];
const parts = (n) => ({ th: Math.floor(n / 1000), h: Math.floor((n % 1000) / 100), t: Math.floor((n % 100) / 10), o: n % 10 });
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function words(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "");
  if (n < 1000) return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + words(n % 100) : "");
  if (n < 1000000) return words(Math.floor(n / 1000)) + " thousand" + (n % 1000 ? " " + words(n % 1000) : "");
  return "one million";
}
function expanded(n) {
  const out = [];
  for (let p = 100000; p >= 1; p /= 10) { const d = Math.floor(n / p) % 10; if (d) out.push(fmt(d * p)); }
  return out.join(" + ") || "0";
}
const pl = (n, one, many = one + "s") => `${n} ${n === 1 ? one : many}`;
const roundTo = (n, p) => Math.round(n / p) * p;
const who = () => pick(NAMES);
const two = () => { const [a, b] = sample(NAMES, 2); return [a, b]; };
// Three-digit numbers that need regrouping (or not) when added or subtracted.
function addPair(lvl, digits) {
  const max = digits === 2 ? 99 : 999, min = digits === 2 ? 10 : 100;
  for (;;) {
    const a = rnd(min, max), b = rnd(min, max);
    if (a + b > (digits === 2 ? 199 : 1000)) continue;
    const carries = (a % 10) + (b % 10) >= 10 ? 1 : 0, carries2 = ((a % 100) + (b % 100)) >= 100 ? 1 : 0;
    const k = carries + carries2;
    if ((lvl === 1 && k === 0) || (lvl === 2 && k === 1) || (lvl === 3 && k >= 1)) return [a, b];
  }
}
function subPair(lvl, digits, zeros = false) {
  const max = digits === 2 ? 99 : 999, min = digits === 2 ? 20 : 200;
  for (;;) {
    let a = rnd(min, max);
    if (zeros) a = rnd(2, 9) * 100 + pick([0, 0, rnd(1, 9)]);
    const b = rnd(digits === 2 ? 10 : 100, a - 5);
    const k = (a % 10 < b % 10 ? 1 : 0) + (Math.floor(a / 10) % 10 < Math.floor(b / 10) % 10 + (a % 10 < b % 10 ? 1 : 0) ? 1 : 0);
    if (zeros || (lvl === 1 && k === 0) || (lvl === 2 && k === 1) || (lvl === 3 && k >= 1)) return [a, b];
  }
}
function addSteps(a, b) {
  const A = parts(a), B = parts(b), s = [];
  const o = A.o + B.o, t = A.t + B.t + Math.floor(o / 10), h = A.h + B.h + Math.floor(t / 10);
  s.push(`Ones: ${A.o} + ${B.o} = ${o}.${o >= 10 ? ` Trade 10 ones for 1 ten. Write ${o % 10}, carry 1 ten.` : ""}`);
  s.push(`Tens: ${A.t} + ${B.t}${o >= 10 ? " + 1" : ""} = ${t}.${t >= 10 && a >= 100 ? ` Trade 10 tens for 1 hundred. Write ${t % 10}, carry 1 hundred.` : ""}`);
  if (a >= 100 || b >= 100) s.push(`Hundreds: ${A.h} + ${B.h}${t >= 10 ? " + 1" : ""} = ${h}.`);
  s.push(`${a} + ${b} = ${a + b}.`);
  return s;
}
function subSteps(a, b) {
  const s = [];
  let { h, t, o } = parts(a);
  const B = parts(b);
  if (o < B.o) {
    if (t === 0) { h--; t = 10; s.push(`There are no tens to trade, so trade 1 hundred for 10 tens first: now ${pl(h, "hundred")} and 10 tens.`); }
    t--; o += 10; s.push(`You can't take ${B.o} ones from ${o - 10}. Trade 1 ten for 10 ones: now ${pl(t, "ten")} and ${o} ones.`);
  }
  s.push(`Ones: ${o} − ${B.o} = ${o - B.o}.`);
  if (t < B.t) { h--; t += 10; s.push(`You can't take ${B.t} tens from ${t - 10}. Trade 1 hundred for 10 tens: now ${pl(h, "hundred")} and ${t} tens.`); }
  s.push(`Tens: ${t} − ${B.t} = ${t - B.t}.`);
  if (a >= 100) s.push(`Hundreds: ${h} − ${B.h} = ${h - B.h}.`);
  s.push(`${a} − ${b} = ${a - b}. Check: ${a - b} + ${b} = ${a}.`);
  return s;
}

const G = {};

/* ---------------- Grade 2: numbers to 1,200 ---------------- */
G.pv3 = (lvl) => {
  const n = lvl === 1 ? rnd(11, 99) : rnd(101, 999);
  const P = parts(n), k = rnd(0, 2);
  if (k === 0) return num("What number do the base-ten blocks show?", n, [`Count the flats: ${P.h} hundreds = ${P.h * 100}.`, `Count the rods: ${P.t} tens = ${P.t * 10}.`, `Count the small cubes: ${P.o} ones.`, `${P.h * 100} + ${P.t * 10} + ${P.o} = ${n}.`].filter((x) => !x.startsWith("Count the flats: 0")), { picture: { type: "blocks", number: n }, visual: { type: "placevalue", number: n } });
  const place = pick(n >= 100 ? ["hundreds", "tens", "ones"] : ["tens", "ones"]);
  const d = place === "hundreds" ? P.h : place === "tens" ? P.t : P.o;
  if (k === 1) return num(`How many ${place} are in ${n}?`, d, [`Put ${n} in a place value chart.`, `The ${place} digit is ${d}.`], { visual: { type: "placevalue", number: n } });
  const val = d * (place === "hundreds" ? 100 : place === "tens" ? 10 : 1);
  return num(`What is the value of the digit ${d} in ${n}?`, val, [`Find the ${d}: it is in the ${place} place.`, `${d} ${place} = ${val}.`], { visual: { type: "placevalue", number: n } });
};
G.pv4 = (lvl) => {
  const n = lvl === 1 ? rnd(100, 999) : rnd(1000, 1200);
  const P = parts(n), k = rnd(0, 1);
  if (k === 0 && n <= 1200) return num("What number do the blocks show?", n, [P.th ? `1 big cube is 1 thousand = 1,000.` : `There are no thousand cubes.`, `${pl(P.h, "flat")} = ${P.h * 100}, ${pl(P.t, "rod")} = ${P.t * 10}, ${pl(P.o, "cube")} = ${P.o}.`, `Together: ${fmt(n)}.`], { picture: { type: "blocks", number: n }, visual: { type: "placevalue", number: n } });
  const q = pick([["thousands", P.th], ["hundreds", P.h], ["tens", P.t], ["ones", P.o]].filter(([p]) => n >= 1000 || p !== "thousands"));
  return num(`What digit is in the ${q[0]} place of ${fmt(n)}?`, q[1], [`Line the digits up in a place value chart.`, `The ${q[0]} digit is ${q[1]}.`], { visual: { type: "placevalue", number: n } });
};
G.forms = (lvl) => {
  const n = lvl === 1 ? rnd(21, 99) : lvl === 2 ? rnd(101, 999) : rnd(1001, 1200);
  const k = rnd(0, 2), v = { type: "placevalue", number: n };
  if (k === 0) return num(`Write in standard form: ${expanded(n)}`, n, [`Each part is one place: ${expanded(n)}.`, `Put the digits together: ${fmt(n)}.`], { visual: v, accept: [String(n)] });
  if (k === 1) {
    const wr = [expanded(n + (n % 100 >= 10 ? 0 : 10)), expanded(n).replace(/(\d)00\b/, "$10"), String(n).split("").join(" + ")].filter((x) => x !== expanded(n));
    return choice(`Which is the expanded form of ${fmt(n)}?`, expanded(n), wr, [`Break ${fmt(n)} into the value of each digit.`, `${fmt(n)} = ${expanded(n)}.`], { visual: v });
  }
  const off = [n + 10, n - 1 > 0 ? n + 100 : n + 1, Number(String(n).split("").reverse().join("")) || n + 2].map(words);
  return choice(`Which shows ${fmt(n)} in word form?`, words(n), off, [`Read each part: ${expanded(n)}.`, `Say it: ${words(n)}.`], { visual: v });
};
G.compose = (lvl) => {
  const n = rnd(lvl === 1 ? 120 : 210, 999), P = parts(n), k = rnd(0, 1);
  if (k === 0 && P.h >= 1) {
    const t2 = P.t + 10;
    return num(`${fmt(n)} is ${P.h - 1} hundreds, ? tens and ${P.o} ones. What number goes in the blank?`, t2, [`Take 1 hundred apart into 10 tens.`, `${P.t} tens + 10 tens = ${t2} tens.`, `${(P.h - 1) * 100} + ${t2 * 10} + ${P.o} = ${n}.`], { visual: { type: "blocks", number: n } });
  }
  const right = `${P.h - 1} hundreds, ${P.t + 10} tens, ${P.o} ones`;
  return choice(`Which is another way to make ${fmt(n)}?`, right, [`${P.h - 1} hundreds, ${P.t} tens, ${P.o} ones`, `${P.h} hundreds, ${P.t + 10} tens, ${P.o} ones`, `${P.h - 1} hundreds, ${P.t + 1} tens, ${P.o} ones`], [`1 hundred is the same as 10 tens.`, `Trade 1 hundred for 10 tens: ${right}.`], { visual: { type: "blocks", number: n } });
};
G.cmp = (lvl, arg) => {
  const max = +arg || 1200, lo = max > 2000 ? 10000 : max > 200 ? 100 : 10;
  const k = rnd(0, 1);
  if (k === 0) {
    const a = rnd(lo, max);
    const b = pick([a + pick([1, 10, 100]) * pick([1, -1]), rnd(lo, max), Number(String(a).split("").reverse().join("")), a]);
    const bb = Math.max(lo, Math.min(max, b));
    return choice(`Which sign makes this true?\n${fmt(a)} ___ ${fmt(bb)}`, sign(a, bb), CMP, [`Compare from the biggest place first.`, a === bb ? `Every digit is the same, so they are equal.` : `${fmt(Math.max(a, bb))} is greater, so ${fmt(a)} ${sign(a, bb)} ${fmt(bb)}.`], { keepOrder: CMP, visual: { type: "numberline", start: roundTo(Math.min(a, bb), lo) - lo, end: roundTo(Math.max(a, bb), lo) + lo, marks: [a, bb] } });
  }
  const set = sample(Array.from({ length: 40 }, () => rnd(lo, max)), 3 + (lvl > 1 ? 1 : 0));
  const asc = rnd(0, 1) === 1;
  const sorted = [...set].sort((x, y) => (asc ? x - y : y - x)).map(fmt).join(", ");
  const wr = [[...set].sort((x, y) => (asc ? y - x : x - y)).map(fmt).join(", "), set.map(fmt).join(", "), shuffle(set).map(fmt).join(", ")];
  return choice(`Which list puts these numbers in order from ${asc ? "least to greatest" : "greatest to least"}?\n${shuffle(set).map(fmt).join("   ")}`, sorted, wr, [`Compare the biggest place first, then the next place.`, `In order: ${sorted}.`]);
};
G.moreless = (lvl) => {
  const k = rnd(0, 2);
  if (k < 2) {
    const n = rnd(110, 990), d = pick(lvl === 1 ? [10] : [10, 100]), more = rnd(0, 1) === 1, ans = more ? n + d : n - d;
    return num(`What is ${d} ${more ? "more" : "less"} than ${n}?`, ans, [`${d === 10 ? "Only the tens digit changes." : "Only the hundreds digit changes."}`, `${n} ${more ? "+" : "−"} ${d} = ${ans}.`], { visual: { type: "numberline", start: Math.min(n, ans) - d, end: Math.max(n, ans) + d, jumps: [{ from: n, to: ans }] } });
  }
  const lo = rnd(1, 9) * 100, ans = lo + rnd(1, 9) * 10;
  return num(`What number is at the point marked "?" on the number line? Each tick is 10.`, ans, [`The line goes from ${lo} to ${lo + 100}, counting by tens.`, `Count the ticks from ${lo}: ${Array.from({ length: (ans - lo) / 10 }, (_, i) => lo + (i + 1) * 10).join(", ")}.`], { picture: { type: "numberline", start: lo, end: lo + 100, step: 10, ask: ans }, visual: { type: "numberline", start: lo, end: lo + 100, step: 10, jumps: [{ from: lo, to: ans }] } });
};

/* ---------------- adding and subtracting ---------------- */
G.add2 = (lvl) => {
  const [a, b] = addPair(lvl, 2);
  return num(`${a} + ${b} = ?`, a + b, [`Add the tens: ${a - (a % 10)} + ${b - (b % 10)} = ${a - (a % 10) + b - (b % 10)}.`, `Add the ones: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}.`, `Put them together: ${a + b}.`], { visual: { type: "blocks", numbers: [a, b], op: "+" } });
};
G.add4 = (lvl) => {
  const n = lvl === 1 ? 3 : lvl === 2 ? 3 : 4;
  const xs = Array.from({ length: n }, () => rnd(10, lvl === 3 ? 49 : 35));
  const s = xs.reduce((a, b) => a + b, 0);
  const tens = xs.reduce((a, x) => a + x - (x % 10), 0), ones = xs.reduce((a, x) => a + (x % 10), 0);
  return num(`${xs.join(" + ")} = ?`, s, [`Add all the tens: ${xs.map((x) => x - (x % 10)).join(" + ")} = ${tens}.`, `Add all the ones: ${xs.map((x) => x % 10).join(" + ")} = ${ones}.`, `${tens} + ${ones} = ${s}.`]);
};
G.sub2 = (lvl) => {
  const [a, b] = subPair(lvl, 2);
  return num(`${a} − ${b} = ?`, a - b, subSteps(a, b), { visual: { type: "blocks", numbers: [a, b], op: "-" } });
};
G.add3 = (lvl) => {
  const [a, b] = addPair(lvl, 3);
  return num(`${a} + ${b} = ?`, a + b, addSteps(a, b), { visual: { type: "blocks", numbers: [a, b], op: "+" } });
};
G.sub3 = (lvl) => {
  const [a, b] = subPair(lvl, 3);
  return num(`${a} − ${b} = ?`, a - b, subSteps(a, b), { visual: { type: "blocks", numbers: [a, b], op: "-" } });
};
G.regroup = (lvl) => {
  if (rnd(0, 2) === 0) { const [a, b] = addPair(3, 3); return num(`${a} + ${b} = ?`, a + b, addSteps(a, b), { visual: { type: "blocks", numbers: [a, b], op: "+" } }); }
  const [a, b] = subPair(lvl, 3, lvl > 1);
  return num(`${a} − ${b} = ?`, a - b, subSteps(a, b), { visual: { type: "blocks", numbers: [a, b], op: "-" } });
};
const THINGS = [["stickers", "sticker book"], ["shells", "bucket"], ["marbles", "jar"], ["books", "shelf"], ["apples", "basket"], ["beads", "box"], ["cards", "deck"], ["seeds", "garden"], ["blocks", "tower"], ["coins", "piggy bank"]];
G.wp = (lvl, arg) => {
  const big = arg === "3" || lvl === 3, [n1, n2] = two(), [thing] = pick(THINGS);
  const a = big ? rnd(120, 600) : rnd(25, 90), b = big ? rnd(60, 300) : rnd(10, 60);
  const k = rnd(0, lvl === 1 ? 1 : 4);
  const strip = (total, ps) => ({ type: "strip", total, parts: ps });
  if (k === 0) return num(`${n1} has ${a} ${thing}. ${n2} gives ${n1} ${b} more. How many ${thing} does ${n1} have now?`, a + b, [`We are joining, so add.`, `${a} + ${b} = ${a + b}.`], { picture: strip("?", [a, b]) });
  if (k === 1) return num(`${n1} had ${a + b} ${thing}. ${n1} gave ${b} away. How many ${thing} are left?`, a, [`Some are taken away, so subtract.`, `${a + b} − ${b} = ${a}.`], { picture: strip(a + b, ["?", b]) });
  if (k === 2) return num(`${n1} had some ${thing}. Then ${n1} got ${b} more. Now ${n1} has ${a + b}. How many did ${n1} have at the start?`, a, [`The start is missing. The whole is ${a + b} and one part is ${b}.`, `${a + b} − ${b} = ${a}.`], { picture: strip(a + b, ["?", b]) });
  if (k === 3) return num(`${n1} has ${a + b} ${thing}. ${n2} has ${a}. How many more ${thing} does ${n1} have than ${n2}?`, b, [`Compare: find the difference.`, `${a + b} − ${a} = ${b}.`], { picture: strip(a + b, [a, "?"]) });
  return num(`${n1} had ${a + b} ${thing}. After giving some to ${n2}, ${n1} has ${a} left. How many did ${n1} give away?`, b, [`The change is missing. Think: ${a + b} − ? = ${a}.`, `${a + b} − ${a} = ${b}.`], { picture: strip(a + b, [a, "?"]) });
};
G.multistep = (lvl, arg) => {
  const big = arg === "3", n = who(), [thing, place] = pick(THINGS);
  const a = big ? rnd(200, 500) : rnd(40, 90), b = big ? rnd(100, 300) : rnd(20, 60), c = big ? rnd(50, 200) : rnd(10, Math.min(a + b - 5, 50));
  return num(`${n} had ${a} ${thing} in the ${place}. ${n} added ${b} more, then gave away ${c}. How many ${thing} are in the ${place} now?`, a + b - c, [`Step 1: ${a} + ${b} = ${a + b}.`, `Step 2: ${a + b} − ${c} = ${a + b - c}.`], { picture: { type: "strip", total: a + b, parts: [a, b] } });
};
G.story = (lvl) => {
  const n = who(), [thing] = pick(THINGS);
  const a = rnd(20, 80), b = rnd(5, Math.min(a - 2, 40)), plus = rnd(0, 1) === 1;
  const ans = plus ? `${n} has ${a} ${thing} and gets ${b} more. How many now?` : `${n} has ${a} ${thing} and gives away ${b}. How many are left?`;
  const wrong = plus
    ? [`${n} has ${a} ${thing} and gives away ${b}. How many are left?`, `${n} has ${b} ${thing} and gets ${a + b} more. How many now?`, `${n} has ${a} ${thing}. ${b} are red. How many are not red?`]
    : [`${n} has ${a} ${thing} and gets ${b} more. How many now?`, `${n} has ${b} ${thing} and gives away ${a}. How many are left?`, `${n} has ${a} red ${thing} and ${b} blue ones. How many in all?`];
  return choice(`Which story matches ${a} ${plus ? "+" : "−"} ${b} = ?`, ans, wrong, [plus ? `Adding means joining more to a group.` : `Subtracting means taking some away or finding what is left.`, `The story must start with ${a} and ${plus ? "add" : "take away"} ${b}.`]);
};

/* ---------------- data ---------------- */
const CATS = [["Cats", "Dogs", "Fish", "Birds"], ["Apples", "Bananas", "Grapes", "Pears"], ["Soccer", "Tag", "Swings", "Jump rope"], ["Red", "Blue", "Green", "Yellow"], ["Popcorn", "Fruit", "Crackers", "Yogurt"]];
const TITLES = ["Favorite pets", "Favorite fruit", "Favorite recess game", "Favorite color", "Favorite snack"];
G.graph = (lvl, arg) => {
  const i = rnd(0, CATS.length - 1), labels = CATS[i].slice(0, lvl === 1 ? 3 : 4);
  const scaled = arg === "3", key = scaled ? pick([2, 5, 10]) : 1;
  const kind = arg === "dot" ? "dot" : pick(["bar", "pictograph"]);
  const values = labels.map(() => (kind === "pictograph" ? rnd(1, 6) * (scaled ? key : 1) : scaled ? rnd(1, 9) * key : rnd(1, 10)));
  const pic = { type: "graph", kind, labels, values, title: TITLES[i], key, step: scaled && kind === "bar" ? key : undefined };
  const [x, y] = sample([0, 1, 2, 3].slice(0, labels.length), 2);
  const k = rnd(0, lvl === 1 ? 0 : 2);
  const read = kind === "pictograph" && key > 1 ? `Each ● stands for ${key}.` : kind === "bar" ? `Read across from the top of each bar.` : `Count the marks.`;
  if (k === 0) return num(`Use the ${kind === "bar" ? "bar graph" : kind === "dot" ? "dot plot" : "pictograph"}. How many chose ${labels[x]}?`, values[x], [read, `${labels[x]}: ${values[x]}.`], { picture: pic });
  if (k === 1) return num(`Use the graph. How many more chose ${labels[values[x] >= values[y] ? x : y]} than ${labels[values[x] >= values[y] ? y : x]}?`, Math.abs(values[x] - values[y]), [read, `${Math.max(values[x], values[y])} − ${Math.min(values[x], values[y])} = ${Math.abs(values[x] - values[y])}.`], { picture: pic });
  const total = values.reduce((a, b) => a + b, 0);
  return num(`Use the graph. How many answers are there in all?`, total, [read, `Add them all: ${values.join(" + ")} = ${total}.`], { picture: pic });
};

/* ---------------- money ---------------- */
const COIN = { quarters: 25, dimes: 10, nickels: 5, pennies: 1 };
function coinSet(lvl, bills = false) {
  for (;;) {
    const set = { quarters: rnd(0, lvl > 1 ? 3 : 1), dimes: rnd(0, lvl > 1 ? 4 : 3), nickels: rnd(0, 3), pennies: rnd(0, lvl > 1 ? 6 : 4), dollar: bills ? rnd(0, 3) : 0 };
    const cents = Object.entries(COIN).reduce((a, [k, v]) => a + set[k] * v, 0) + set.dollar * 100;
    if (cents > 0 && (bills || cents <= 100)) return { set, cents };
  }
}
const money = (c) => `$${(c / 100).toFixed(2)}`;
G.coins = (lvl) => {
  const { set, cents } = coinSet(lvl);
  const ONE = { quarters: "quarter", dimes: "dime", nickels: "nickel", pennies: "penny" };
  const order = Object.entries(COIN).filter(([k]) => set[k]).map(([k, v]) => `${pl(set[k], ONE[k], k)} = ${set[k] * v}¢`);
  return num("How many cents are the coins worth?", cents, ["Start with the coins worth the most and count on.", ...order, `Total: ${cents}¢.`], { picture: { type: "coins", ...set }, accept: [`${cents}¢`, money(cents)] });
};
G.money = (lvl) => {
  const c = lvl === 1 ? rnd(10, 99) : rnd(5, 99), k = rnd(0, 1);
  if (k === 0) return choice(`Which is the right way to write ${c} cents with a dollar sign?`, money(c), [`$${c}`, `${c}$`, `$${(c / 1000).toFixed(3)}`], [`Cents go after the decimal point.`, `${c} cents = ${money(c)}.`]);
  const { set, cents } = coinSet(lvl);
  return choice("Which shows the value of these coins?", `${cents}¢`, [`${cents + 5}¢`, `${Math.max(1, cents - 10)}¢`, `$${cents}`], ["Count the coins worth the most first.", `They are worth ${cents}¢ (or ${money(cents)}).`], { picture: { type: "coins", ...set } });
};
G.money3 = (lvl) => {
  const { set, cents } = coinSet(lvl, true);
  if (rnd(0, 2) > 0) return num("How much money is shown? Write it with a dollar sign and decimal point, like $2.35.", money(cents), [`Count the dollars first: ${set.dollar} × $1.00.`, `Then count the coins: ${cents - set.dollar * 100}¢.`, `Total: ${money(cents)}.`], { picture: { type: "coins", ...set }, accept: [String(cents / 100), (cents / 100).toFixed(2)] });
  return pick(FIN3)();
};

/* ---------------- personal financial literacy ---------------- */
const FIN2A = [
  () => { const n = who(), a = rnd(5, 30), b = rnd(2, 15); return num(`${n} has $${a} in a savings account. ${n} makes a deposit of $${b}. How much is in the account now?`, a + b, [`A deposit puts money into the account, so add.`, `$${a} + $${b} = $${a + b}.`], { accept: [`$${a + b}`] }); },
  () => { const n = who(), a = rnd(20, 50), b = rnd(3, 19); return num(`${n} has $${a} in the bank and makes a withdrawal of $${b}. How much is left in the bank?`, a - b, [`A withdrawal takes money out, so subtract.`, `$${a} − $${b} = $${a - b}.`], { accept: [`$${a - b}`] }); },
  () => { const n = who(), w = rnd(2, 5), s = rnd(2, 6); return num(`${n} saves $${s} each week for ${w} weeks. How much does ${n} save?`, s * w, [`Add $${s} ${w} times.`, `${Array(w).fill(s).join(" + ")} = ${s * w}.`], { accept: [`$${s * w}`] }); },
  () => choice("What is a deposit?", "Putting money into a bank account", ["Taking money out of a bank account", "Spending money at a store", "Borrowing money from a friend"], ["Think of putting money in a piggy bank.", "A deposit is money you put into an account."]),
  () => choice("What is a withdrawal?", "Taking money out of a bank account", ["Putting money into a bank account", "Earning money for a job", "Saving coins in a jar"], ["'Withdraw' means take out.", "A withdrawal takes money out of an account."]),
  () => choice("Why do people save money?", "To buy something they want later", ["So they never have money", "To make things cost more", "Because stores ask them to"], ["Saving means keeping money for later.", "People save to buy something later or for an emergency."]),
  () => choice("Which is a way to earn money?", "Doing a job like walking a neighbor's dog", ["Buying a toy", "Losing a coin", "Putting money in a bank"], ["Earning means getting paid for work.", "Doing a job earns money."]),
  () => choice("Which is the best place to keep money safe?", "In a bank", ["Under a rock outside", "In a coat pocket", "On the playground"], ["Think about where money is protected.", "A bank keeps money safe."]),
];
const FIN2B = [
  () => choice("A producer is someone who…", "makes goods or gives services", ["only buys things", "borrows money", "never works"], ["Producers produce, or make.", "A producer makes goods or provides services."]),
  () => choice("A consumer is someone who…", "buys and uses goods and services", ["makes goods to sell", "lends money", "works at a bank"], ["Consumers consume, or use.", "A consumer buys and uses goods and services."]),
  () => choice("A baker makes bread to sell. The baker is a…", "producer", ["consumer", "borrower", "lender"], ["Does the baker make or buy the bread?", "The baker makes it, so the baker is a producer."]),
  () => choice("Mia buys a sandwich for lunch. Mia is a…", "consumer", ["producer", "lender", "baker"], ["Is Mia making or buying?", "Mia buys and uses it, so Mia is a consumer."]),
  () => choice("When you borrow something, you…", "use it and give it back", ["keep it forever", "sell it", "throw it away"], ["Borrowing is not keeping.", "Borrowing means you return it."]),
  () => choice("When you lend something, you…", "let someone use it for a while", ["buy it from someone", "keep it from everyone", "lose it"], ["The lender gives it for a while.", "Lending lets someone use it and give it back."]),
  () => choice("Why should you pay back money you borrowed?", "So people trust you and lend to you again", ["So you can keep the money", "Because it is fun", "So the store closes"], ["Think about being fair.", "Paying back builds trust."]),
  () => choice("Which is a service?", "A doctor checking your health", ["A box of crayons", "A loaf of bread", "A new bike"], ["A service is work someone does for you.", "A doctor's checkup is a service."]),
  () => choice("Which is a good?", "A soccer ball", ["A haircut", "A teacher's lesson", "A car wash"], ["Goods are things you can hold.", "A soccer ball is a good."]),
  () => { const n = who(), a = rnd(4, 9), b = rnd(1, 3); return num(`${n} borrowed $${a} from a sister and has paid back $${b}. How much does ${n} still owe?`, a - b, [`Owed = borrowed − paid back.`, `$${a} − $${b} = $${a - b}.`], { accept: [`$${a - b}`] }); },
];
const FIN3 = [
  () => choice("Which is income?", "Money you earn from a job", ["Money you spend at a store", "A gift you give away", "A bill you pay"], ["Income comes in.", "Income is money you earn."]),
  () => choice("What does it mean to spend money?", "Use money to buy something", ["Put money in the bank", "Earn money from a job", "Borrow money"], ["Spending makes money go out.", "Spending is using money to buy things."]),
  () => choice("Why might someone use credit?", "To buy something now and pay it back later", ["To get free money", "To never pay for anything", "To earn more money"], ["Credit is a kind of borrowing.", "Credit lets you buy now and pay back later."]),
  () => choice("What does a person need to do after using a credit card?", "Pay the money back", ["Nothing", "Throw the card away", "Ask the store for more"], ["Credit is borrowed money.", "Borrowed money must be paid back."]),
  () => { const n = who(), e = rnd(10, 30), s = rnd(2, e - 5); return num(`${n} earned $${e} raking leaves and spent $${s}. How much does ${n} have left to save?`, e - s, [`Income minus spending is what is left.`, `$${e} − $${s} = $${e - s}.`], { accept: [`$${e - s}`] }); },
  () => choice("Which is a responsible way to use money?", "Saving some and spending some", ["Spending all of it right away", "Borrowing and never paying back", "Losing track of it"], ["Think about planning ahead.", "Saving part of your money is responsible."]),
  () => choice("Giving money to help others is called…", "charitable giving", ["borrowing", "a withdrawal", "credit"], ["It's sharing to help.", "That is charitable giving."]),
];
G.fin = (lvl, arg) => pick(arg === "b" ? FIN2B : arg === "3" ? FIN3 : FIN2A)();

/* ---------------- geometry ---------------- */
const POLY = { 3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon", 8: "octagon" };
G.shapes2 = (lvl) => {
  const n = pick([3, 4, 5, 6, 8]), k = rnd(0, 2);
  if (k === 0) return num(`How many sides does this shape have?`, n, ["Touch each side as you count.", `It has ${n} sides. It is a ${POLY[n]}.`], { picture: { type: "polygon", sides: n } });
  if (k === 1) return num(`How many vertices (corners) does this shape have?`, n, ["A vertex is where two sides meet.", `It has ${n} vertices.`], { picture: { type: "polygon", sides: n, dots: true } });
  return choice(`What is the name of this shape?`, POLY[n], Object.values(POLY).filter((x) => x !== POLY[n]), [`Count the sides: ${n}.`, `A shape with ${n} sides is a ${POLY[n]}.`], { picture: { type: "polygon", sides: n } });
};
const SOLIDS = [
  ["cube", "6 square faces, 12 edges and 8 vertices", "a number cube"],
  ["prism", "6 rectangle faces, 12 edges and 8 vertices", "a cereal box"],
  ["cylinder", "2 flat circle faces and a curved surface", "a soup can"],
  ["cone", "1 flat circle face and a point at the top", "an ice cream cone"],
  ["sphere", "no flat faces; it is round like a ball", "a ball"],
  ["pyramid", "a square base and 4 triangle faces that meet at a point", "a tent"],
];
const SNAME = { cube: "cube", prism: "rectangular prism", cylinder: "cylinder", cone: "cone", sphere: "sphere", pyramid: "square pyramid" };
G.solids = (lvl) => {
  const [k, desc, real] = pick(SOLIDS), q = rnd(0, 3);
  if (q === 0) return choice("What is the name of this solid?", SNAME[k], Object.values(SNAME).filter((x) => x !== SNAME[k]), [`Look at its faces: ${desc}.`, `It is a ${SNAME[k]}.`], { picture: { type: "solid", kind: k } });
  if (q === 1) return choice(`Which solid has ${desc}?`, SNAME[k], Object.values(SNAME).filter((x) => x !== SNAME[k]), [`Picture each solid and its faces.`, `A ${SNAME[k]} has ${desc}.`]);
  if (q === 2) return choice(`Which real thing is shaped like a ${SNAME[k]}?`, real, SOLIDS.filter((s) => s[0] !== k).map((s) => s[2]), [`Think about the faces of a ${SNAME[k]}.`, `${real[0].toUpperCase() + real.slice(1)} is shaped like a ${SNAME[k]}.`]);
  const a = pick([[2, "triangles", "a square", "Two triangles can make a square (or a bigger triangle)."], [2, "squares", "a rectangle", "Two squares side by side make a rectangle."], [6, "triangles", "a hexagon", "Six triangles fit together to make a hexagon."]]);
  return choice(`What shape can you make by putting ${a[0]} equal ${a[1]} together?`, a[2], ["a circle", "a pentagon", "an octagon"].filter((x) => x !== a[2]), [`Imagine sliding the ${a[1]} together.`, a[3]]);
};
G.shapes3 = (lvl) => {
  if (rnd(0, 1)) return G.solids(lvl);
  const k = pick(["square", "rectangle", "rhombus", "trapezoid", "parallelogram"]);
  const q = rnd(0, 1);
  if (q === 0) return choice("Is this figure 2D (flat) or 3D (solid)?", "2D", ["3D"], ["A flat shape has length and width only.", "It is flat, so it is 2D."], { picture: { type: "polygon", kind: k }, keepOrder: ["2D", "3D"] });
  const sk = pick(SOLIDS)[0];
  return choice("Is this figure 2D (flat) or 3D (solid)?", "3D", ["2D"], ["A solid takes up space.", "It is a solid, so it is 3D."], { picture: { type: "solid", kind: sk }, keepOrder: ["2D", "3D"] });
};
const QUADS = [
  ["square", "4 equal sides and 4 square corners"],
  ["rectangle", "2 pairs of equal sides and 4 square corners"],
  ["rhombus", "4 equal sides but no square corners"],
  ["trapezoid", "exactly 1 pair of parallel sides"],
  ["parallelogram", "2 pairs of parallel sides"],
];
G.quad = (lvl) => {
  const [k, desc] = pick(QUADS), q = rnd(0, 3);
  if (q === 0) return choice("Which quadrilateral is this?", k, QUADS.map((x) => x[0]).filter((x) => x !== k), [`Check the sides and corners.`, `It has ${desc}, so it is a ${k}.`], { picture: { type: "polygon", kind: k } });
  if (q === 1) return choice(`Which shape has ${desc}?`, k, QUADS.map((x) => x[0]).filter((x) => x !== k), [`Think about sides, corners and parallel sides.`, `A ${k} has ${desc}.`]);
  if (q === 2) return choice("Which statement is true?", "Every square is also a rectangle.", ["Every rectangle is a square.", "A trapezoid has 2 pairs of parallel sides.", "A rhombus always has square corners."], ["A rectangle needs 4 square corners and 2 pairs of equal sides.", "A square has all of that, so every square is a rectangle."]);
  return num("How many sides does every quadrilateral have?", 4, ["'Quad' means four.", "Every quadrilateral has 4 sides."]);
};

/* ---------------- fractions (Grade 2: words) ---------------- */
const FW = { 2: ["half", "halves"], 4: ["fourth", "fourths"], 8: ["eighth", "eighths"], 3: ["third", "thirds"], 6: ["sixth", "sixths"] };
const fw = (k, n) => `${k === 1 ? "one" : ONES[k]} ${k === 1 ? FW[n][0] : FW[n][1]}`;
G.frac2 = (lvl) => {
  const n = pick([2, 4, 8]), k = rnd(1, n - 1), shape = pick(["circle", "rect"]), q = rnd(0, 1);
  if (q === 0) return choice("What part of the shape is shaded?", fw(k, n), [fw(Math.max(1, n - k), n), fw(k, n === 2 ? 4 : n === 4 ? 8 : 4), fw(Math.min(k + 1, n - 1), n)], [`The shape has ${n} equal parts.`, `${ONES[k]} of them are shaded: ${fw(k, n)}.`], { picture: { type: "fraction", parts: n, shaded: k, shape } });
  return num(`A ${pick(["pizza", "pie", "sandwich"])} is cut into ${FW[n][1]}. How many equal parts is that?`, n, [`${FW[n][1][0].toUpperCase() + FW[n][1].slice(1)} means ${n} equal parts.`, `${n} parts.`], { visual: { type: "fraction", parts: n, shaded: 0, shape: "circle" } });
};
G.frac2b = (lvl) => {
  const q = rnd(0, 1);
  if (q === 0) {
    const [a, b] = sample([2, 4, 8], 2);
    const bigger = a < b ? a : b;
    return choice(`Which is bigger: one ${FW[a][0]} or one ${FW[b][0]} of the same pizza?`, `one ${FW[bigger][0]}`, [`one ${FW[a + b - bigger][0]}`, "They are the same"], ["The more parts a whole is cut into, the smaller each part.", `Fewer parts means bigger parts, so one ${FW[bigger][0]} is bigger.`], { visual: { type: "fraction", parts: bigger, shaded: 1, shape: "circle" } });
  }
  const n = pick([2, 4]), k = n + rnd(1, n - 1);
  return choice(`How many wholes and parts are shaded?`, `1 whole and ${fw(k - n, n)}`, [`${fw(k, n * 2)}`, `2 wholes`, `1 whole and ${fw(Math.min(n - 1, k - n + 1), n)}`], [`Count the ${FW[n][1]}: ${k} of them.`, `${n} ${FW[n][1]} make 1 whole, and ${k - n} more is ${fw(k - n, n)}.`], { picture: { type: "fraction", parts: n, shaded: k, shape: "rect" } });
};

/* ---------------- Grade 3 fractions ---------------- */
G.frac3 = (lvl) => {
  const n = pick([2, 3, 4, 6, 8]), k = lvl === 1 ? 1 : rnd(1, n - 1), shape = pick(["circle", "rect"]);
  if (rnd(0, 1)) return word("What fraction of the shape is shaded? Write it like 3/4.", `${k}/${n}`, [`Count the equal parts: ${n}. That's the bottom number.`, `Count the shaded parts: ${k}. That's the top number.`, `${k}/${n}.`], { picture: { type: "fraction", parts: n, shaded: k, shape } });
  return choice(`Which shape shows 1/${n}?`, `A whole cut into ${n} equal parts with 1 part shaded`, [`A whole cut into ${n} unequal parts with 1 part shaded`, `A whole cut into ${n + 1} equal parts with 1 part shaded`, `A whole cut into ${n} equal parts with ${Math.min(n, 2)} parts shaded`], [`The bottom number says how many equal parts.`, `1/${n} is 1 of ${n} equal parts.`], { visual: { type: "fraction", parts: n, shaded: 1, shape } });
};
G.fracnl = (lvl) => {
  const n = pick([2, 3, 4, 6, 8]), wholes = lvl === 3 ? 2 : 1;
  let at = rnd(1, n * wholes - 1);
  if (at % n === 0) at++;
  return word("What fraction is at the point marked \"?\"? Write it like 1/4.", `${at}/${n}`, [`Count the equal spaces from 0 to 1: ${n}. Each space is 1/${n}.`, `Count spaces from 0 to the point: ${at}.`, `The point is at ${at}/${n}.`], { picture: { type: "fractionline", parts: n, wholes, at, ask: true }, visual: { type: "fractionline", parts: n, wholes, at, label_all: true } });
};
G.fracbuild = (lvl) => {
  const n = pick([3, 4, 6, 8]), k = rnd(2, n - 1);
  const sum = Array(k).fill(`1/${n}`).join(" + ");
  if (rnd(0, 1)) return word(`${sum} = ? Write the fraction.`, `${k}/${n}`, [`Count how many 1/${n} pieces: ${k}.`, `${k} pieces of 1/${n} make ${k}/${n}.`], { visual: { type: "fraction", parts: n, shaded: k, shape: "rect" } });
  return choice(`Which shows ${k}/${n} as unit fractions added together?`, sum, [Array(k).fill(`1/${k}`).join(" + "), `${k}/${n} + 1/${n}`, Array(Math.max(1, k - 1)).fill(`1/${n}`).join(" + ")], [`${k}/${n} means ${k} parts of size 1/${n}.`, `So ${k}/${n} = ${sum}.`], { visual: { type: "fraction", parts: n, shaded: k, shape: "rect" } });
};
G.fracshare = (lvl) => {
  const f = pick([2, 3, 4, 6, 8]), [thing, one] = pick([["pizzas", "pizza"], ["pies", "pie"], ["sandwiches", "sandwich"], ["pans of brownies", "pan of brownies"]]);
  const things = rnd(1, Math.min(3, f - 1));
  if (things === 1 || rnd(0, 1)) return word(`${f} friends share 1 ${one} equally. What fraction does each friend get? Write it like 1/4.`, `1/${f}`, [`Cut the whole into ${f} equal parts, one for each friend.`, `Each friend gets 1/${f}.`], { visual: { type: "fraction", parts: f, shaded: 1, shape: "circle" } });
  return word(`${f} friends share ${things} ${thing} equally. What fraction of one ${one} does each friend get? Write it like 2/4.`, `${things}/${f}`, [`Cut each of the ${things} ${thing} into ${f} equal parts.`, `Each friend gets 1 part from each one: ${things} parts of size 1/${f}.`, `That is ${things}/${f}.`]);
};
G.fraceq = (lvl) => {
  const n = pick([2, 3, 4]), k = rnd(1, n - 1), m = pick([2, 3, 4].filter((x) => x * n <= 12));
  if (rnd(0, 1)) return num(`${k}/${n} = ?/${n * m}. What is the missing top number?`, k * m, [`The bottom number went from ${n} to ${n * m}: each part was cut into ${m}.`, `So the shaded parts also grow ${m} times: ${k} × ${m} = ${k * m}.`], { visual: { type: "fraction", parts: n * m, shaded: k * m, shape: "rect" } });
  return choice(`Which fraction is equivalent to ${k}/${n}?`, `${k * m}/${n * m}`, [`${k + 1}/${n * m}`, `${k}/${n * m}`, `${k * m}/${n}`].filter((x) => x !== `${k * m}/${n * m}`), [`Equivalent fractions name the same amount.`, `Cut each part into ${m}: ${k}/${n} = ${k * m}/${n * m}.`], { visual: { type: "fraction", parts: n, shaded: k, shape: "rect" } });
};
G.fraccmp = (lvl) => {
  let a, b, c, d;
  if (rnd(0, 1)) { const n = pick([3, 4, 6, 8]); a = rnd(1, n - 1); b = n; c = rnd(1, n - 1); d = n; }
  else { const k = rnd(1, 3); a = k; c = k; b = pick([2, 3, 4, 6, 8].filter((x) => x > k)); d = pick([2, 3, 4, 6, 8].filter((x) => x > k && x !== b)); }
  const s = sign(a / b, c / d);
  return choice(`Which sign makes this true?\n${a}/${b} ___ ${c}/${d}`, s, CMP, [b === d ? `Same-size parts: compare how many parts. ${a} vs ${c}.` : `Same number of parts: the one with fewer, bigger parts is larger.`, `${a}/${b} ${s} ${c}/${d}.`], { keepOrder: CMP, visual: { type: "fraction", parts: b, shaded: a, shape: "rect" } });
};
G.decfrac = (lvl) => {
  const k = rnd(1, 9), h = rnd(11, 99);
  if (rnd(0, 1)) return word(`Write ${k}/10 as a decimal.`, `0.${k}`, [`Tenths go in the first place after the decimal point.`, `${k}/10 = 0.${k}.`], { accept: [`.${k}`] });
  return word(`Write ${h}/100 as a decimal.`, `0.${h}`, [`Hundredths fill two places after the decimal point.`, `${h}/100 = 0.${h}.`], { accept: [`.${h}`] });
};

/* ---------------- time ---------------- */
const tstr = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
G.time = (lvl, arg) => {
  const q = rnd(0, 3);
  if (q < 3 || arg === "clock") {
    const h = rnd(1, 12), m = lvl === 1 ? pick([0, 15, 30, 45]) : lvl === 2 ? rnd(0, 11) * 5 : rnd(0, 59);
    return word("What time does the clock show? Write it like 3:45.", tstr(h, m), [`The short hand is at or just past ${h}, so the hour is ${h}.`, `The long hand shows the minutes: count by 5s${m % 5 ? " then by 1s" : ""} to ${m}.`, `The time is ${tstr(h, m)}.`], { picture: { type: "clock", hour: h, minute: m } });
  }
  const [act, ap] = pick([["eating breakfast", "a.m."], ["going to sleep at night", "p.m."], ["eating dinner", "p.m."], ["the first school bell", "a.m."], ["watching the sunset", "p.m."], ["waking up", "a.m."]]);
  return choice(`Is ${act} more likely at 7:00 a.m. or 7:00 p.m.?`, `7:00 ${ap}`, [`7:00 ${ap === "a.m." ? "p.m." : "a.m."}`], ["a.m. is from midnight to noon (morning).", "p.m. is from noon to midnight (afternoon and night).", `${act[0].toUpperCase() + act.slice(1)} happens in the ${ap === "a.m." ? "morning" : "evening"}, so it's ${ap}`], { keepOrder: ["7:00 a.m.", "7:00 p.m."] });
};
G.time3 = (lvl) => {
  const q = rnd(0, 3);
  if (q <= 1) {
    const h = rnd(1, 10), m = rnd(0, 5) * 5, d = lvl === 1 ? pick([15, 20, 30]) : rnd(2, 11) * 5;
    let eh = h, em = m + d; while (em >= 60) { em -= 60; eh++; }
    const n = who(), act = pick(["started reading", "began soccer practice", "started baking", "began a puzzle"]);
    return word(`${n} ${act} at ${tstr(h, m)} and stopped ${d} minutes later. What time did ${n} stop? Write it like 4:35.`, tstr(eh, em), [`Start at ${tstr(h, m)} and jump ahead ${d} minutes.`, `${tstr(h, m)} + ${d} minutes = ${tstr(eh, em)}.`], { picture: { type: "clock", hour: h, minute: m, caption: "Start time" }, visual: { type: "clock", hour: eh > 12 ? eh - 12 : eh, minute: em, caption: "End time" } });
  }
  if (q === 2) {
    const [thing, ans, ws] = pick([["a bathtub of water", "liters", ["milliliters"]], ["a spoonful of medicine", "milliliters", ["liters"]], ["a big watermelon", "kilograms", ["grams"]], ["a paper clip", "grams", ["kilograms"]], ["a bag of flour", "pounds", ["ounces"]], ["a slice of bread", "ounces", ["pounds"]]]);
    return choice(`Which unit is best for measuring ${thing}?`, ans, ws, ["Think: is it big or small?", `${thing[0].toUpperCase() + thing.slice(1)} is best measured in ${ans}.`]);
  }
  const a = rnd(2, 9), b = rnd(2, 9);
  return num(`A pitcher holds ${a} liters. A jug holds ${b} liters. How many liters do they hold together?`, a + b, [`Add the two amounts.`, `${a} + ${b} = ${a + b} liters.`]);
};

/* ---------------- measurement ---------------- */
G.measure = (lvl) => {
  const q = rnd(0, 3);
  if (q <= 2) {
    const unit = pick(["in", "cm"]), len = rnd(2, 10), start = lvl === 3 ? rnd(1, 2) : 0, object = pick(["pencil", "crayon", "ribbon", "worm"]);
    return num(`How long is the ${object}, in ${unit === "cm" ? "centimeters" : "inches"}?`, len, start ? [`The ${object} starts at ${start}, not 0.`, `It ends at ${start + len}. ${start + len} − ${start} = ${len}.`] : [`The ${object} starts at 0.`, `It ends at ${len}, so it is ${len} ${unit === "cm" ? "centimeters" : "inches"} long.`], { picture: { type: "ruler", length: len, start, unit, object, max: 12 } });
  }
  const [thing, ans, ws] = pick([["the length of a classroom", "feet", ["inches", "centimeters"]], ["the length of a crayon", "inches", ["yards", "meters"]], ["the length of a football field", "yards", ["inches", "centimeters"]], ["the width of a book", "centimeters", ["meters", "yards"]], ["the height of a door", "meters", ["centimeters", "inches"]]]);
  return choice(`Which unit would you use to measure ${thing}?`, ans, ws, ["Small things use small units; big things use big units.", `Use ${ans} for ${thing}.`]);
};
G.length = (lvl) => {
  const q = rnd(0, 2);
  if (q === 0) { const r = rnd(2, 5), c = rnd(2, 6); return num("How many square units cover this shape?", r * c, [`Count the squares in each row: ${c}.`, `There are ${r} rows: ${Array(r).fill(c).join(" + ")} = ${r * c}.`], { picture: { type: "area", rows: r, cols: c } }); }
  if (q === 1) { const a = rnd(10, 60), b = rnd(5, 40), n = who(); return num(`${n}'s ribbon is ${a} inches long. ${n} cuts off ${b} inches. How long is the ribbon now?`, a - b, [`Taking away length: subtract.`, `${a} − ${b} = ${a - b} inches.`], { visual: { type: "numberline", start: 0, end: a + 5 - (a % 5), jumps: [{ from: a, to: a - b }] } }); }
  const a = rnd(0, 40), b = a + rnd(5, 40);
  return num(`On a number line, how far is it from ${a} to ${b}?`, b - a, [`Distance is how many units you jump.`, `${b} − ${a} = ${b - a}.`], { visual: { type: "numberline", start: a - (a % 10), end: b + 10 - (b % 10), jumps: [{ from: a, to: b }] } });
};
G.area3 = (lvl) => {
  if (lvl === 3 || rnd(0, 2) === 0) {
    const r = rnd(4, 6), c = rnd(5, 8), cr = rnd(1, r - 2), cc = rnd(1, c - 2);
    const total = r * c - cr * cc;
    return num("Find the area of the shape in square units.", total, [`Split it into two rectangles.`, `Bottom part: ${r - cr} × ${c} = ${(r - cr) * c}. Top part: ${cr} × ${c - cc} = ${cr * (c - cc)}.`, `${(r - cr) * c} + ${cr * (c - cc)} = ${total} square units.`], { picture: { type: "area", rows: r, cols: c, cut: { rows: cr, cols: cc } } });
  }
  const r = rnd(2, 6), c = rnd(3, 9);
  return num(`What is the area of the rectangle in square units?`, r * c, [`Count the rows (${r}) and the squares in each row (${c}).`, `Area = ${r} × ${c} = ${r * c} square units.`], { picture: { type: "area", rows: r, cols: c } });
};
G.perim = (lvl) => {
  const r = rnd(2, 8), c = rnd(3, 10), unit = pick(["ft", "in", "cm", "m"]);
  if (lvl === 3 || rnd(0, 2) === 0) {
    const P = 2 * (r + c);
    return num(`A rectangle has a perimeter of ${P} ${unit}. One side is ${r} ${unit}. How long is the missing side?`, c, [`Two sides of ${r}: ${r} + ${r} = ${2 * r}.`, `The other two sides share ${P} − ${2 * r} = ${2 * c}.`, `${2 * c} ÷ 2 = ${c} ${unit}.`], { picture: { type: "area", rows: r, cols: c, grid: false, labels: true, unit, hide: c } });
  }
  return num(`What is the perimeter of the rectangle?`, 2 * (r + c), [`Perimeter is the distance around: add all 4 sides.`, `${c} + ${r} + ${c} + ${r} = ${2 * (r + c)} ${unit}.`], { picture: { type: "area", rows: r, cols: c, grid: false, labels: true, unit } });
};

/* ---------------- multiplication and division ---------------- */
G.groups = (lvl) => {
  const g = rnd(2, lvl === 1 ? 4 : 5), e = rnd(2, lvl === 1 ? 5 : 6);
  if (rnd(0, 1)) return num(`There are ${g} groups with ${e} in each group. How many in all?`, g * e, [`Add ${e} again and again, ${g} times.`, `${Array(g).fill(e).join(" + ")} = ${g * e}.`], { picture: { type: "groups", groups: g, each: e } });
  return choice(`Which addition matches ${g} groups of ${e}?`, Array(g).fill(e).join(" + "), [Array(e).fill(g + 1).join(" + "), `${g} + ${e}`, Array(g).fill(e + 1).join(" + ")], [`Each group has ${e}, and there are ${g} groups.`, `${Array(g).fill(e).join(" + ")} = ${g * e}.`], { picture: { type: "groups", groups: g, each: e } });
};
G.share = (lvl) => {
  if (rnd(0, 2) === 0) {
    const n = rnd(lvl === 1 ? 2 : 11, lvl === 1 ? 20 : 99);
    return choice(`Is ${n} even or odd?`, n % 2 ? "odd" : "even", [n % 2 ? "even" : "odd"], ["Look at the ones digit.", `It ends in ${n % 10}, so ${n} is ${n % 2 ? "odd" : "even"}.`], { keepOrder: ["even", "odd"], visual: n <= 20 ? { type: "tenframe", filled: n } : null });
  }
  const g = rnd(2, 5), e = rnd(2, lvl === 1 ? 4 : 6), [thing] = pick(THINGS);
  return num(`${g * e} ${thing} are shared equally by ${g} friends. How many does each friend get?`, e, [`Deal them out one at a time into ${g} groups.`, `Each group gets ${e}. Check: ${g} groups of ${e} = ${g * e}.`], { visual: { type: "groups", groups: g, each: e } });
};
G.arrays = (lvl) => {
  const r = rnd(2, lvl === 1 ? 4 : 6), c = rnd(2, lvl === 1 ? 5 : 8), q = rnd(0, 2);
  if (q === 0) return num(`How many dots are in the array?`, r * c, [`There are ${r} rows of ${c}.`, `Skip count by ${c}: ${Array.from({ length: r }, (_, i) => c * (i + 1)).join(", ")}.`, `${r} × ${c} = ${r * c}.`], { picture: { type: "array", rows: r, cols: c } });
  if (q === 1) return choice(`Which multiplication matches the array?`, `${r} × ${c}`, [`${r} + ${c}`, `${r} × ${c + 1}`, `${r + 1} × ${c}`], [`Count the rows: ${r}. Count in each row: ${c}.`, `${r} rows of ${c} is ${r} × ${c}.`], { picture: { type: "array", rows: r, cols: c } });
  return num(`Skip count by ${c}s: ${Array.from({ length: r }, (_, i) => c * (i + 1)).join(", ")}, ? What comes next?`, c * (r + 1), [`Each number is ${c} more than the one before.`, `${c * r} + ${c} = ${c * (r + 1)}.`]);
};
G.mul21 = (lvl) => {
  const a = rnd(1, lvl === 1 ? 3 : 9) * 10 + rnd(1, 9), b = rnd(2, lvl === 1 ? 4 : 9), t = a - (a % 10), o = a % 10;
  return num(`${a} × ${b} = ?`, a * b, [`Break ${a} into ${t} + ${o}.`, `${t} × ${b} = ${t * b}.`, `${o} × ${b} = ${o * b}.`, `${t * b} + ${o * b} = ${a * b}.`], { visual: { type: "strip", total: a * b, parts: [t * b, o * b], caption: `${t} × ${b} and ${o} × ${b}` } });
};
G.mulwp = (lvl) => {
  if (rnd(0, 1)) { const r = rnd(2, 8), c = rnd(3, 9); return num(`A garden is ${r} feet wide and ${c} feet long. What is its area in square feet?`, r * c, [`Area of a rectangle = length × width.`, `${c} × ${r} = ${r * c} square feet.`], { visual: { type: "area", rows: r, cols: c } }); }
  const g = rnd(3, 9), e = rnd(3, 9), [thing, place] = pick([["shells", "buckets"], ["eggs", "cartons"], ["muffins", "trays"], ["crayons", "boxes"], ["flowers", "pots"], ["chairs", "rows"]]);
  return num(`There are ${g} ${place} with ${e} ${thing} in each. How many ${thing} are there in all?`, g * e, [`Equal groups: multiply.`, `${g} × ${e} = ${g * e}.`], { visual: { type: "array", rows: g, cols: e } });
};
G.share3 = (lvl) => {
  const g = rnd(2, lvl === 1 ? 5 : 9), e = rnd(2, lvl === 1 ? 5 : 9), [thing] = pick(THINGS);
  if (rnd(0, 1)) return num(`${g * e} ${thing} are put into equal groups of ${e}. How many groups are there?`, g, [`How many ${e}s make ${g * e}?`, `${e} × ${g} = ${g * e}, so there are ${g} groups.`], { visual: { type: "groups", groups: g, each: e } });
  return num(`${g * e} ${thing} are shared equally among ${g} kids. How many does each kid get?`, e, [`Share them out into ${g} equal groups.`, `${g * e} ÷ ${g} = ${e}.`], { visual: { type: "groups", groups: g, each: e } });
};
G.divwp = (lvl) => {
  if (rnd(0, 2) === 0) { const n = rnd(10, 999); return choice(`Is ${n} even or odd?`, n % 2 ? "odd" : "even", [n % 2 ? "even" : "odd"], ["Only the ones digit matters.", `${n} ends in ${n % 10}, so it is ${n % 2 ? "odd" : "even"}.`], { keepOrder: ["even", "odd"] }); }
  const g = rnd(2, 9), e = rnd(2, 9), [thing] = pick(THINGS), n = who();
  return num(`${n} has ${g * e} ${thing} and puts the same number in each of ${g} bags. How many ${thing} go in each bag?`, e, [`Divide: ${g * e} ÷ ${g}.`, `Think: ${g} × ? = ${g * e}. ${g} × ${e} = ${g * e}.`], { visual: { type: "groups", groups: g, each: e } });
};
G.unknown = (lvl) => {
  const a = rnd(2, 10), b = rnd(2, 10), q = rnd(0, 2);
  if (q === 0) return num(`${a} × ? = ${a * b}`, b, [`Think: how many groups of ${a} make ${a * b}?`, `${a * b} ÷ ${a} = ${b}.`], { visual: { type: "array", rows: b, cols: a } });
  if (q === 1) return num(`? × ${b} = ${a * b}`, a, [`Use division: ${a * b} ÷ ${b}.`, `${a * b} ÷ ${b} = ${a}.`]);
  return num(`${a * b} ÷ ? = ${b}`, a, [`Think: ${b} × ? = ${a * b}.`, `${b} × ${a} = ${a * b}, so the missing number is ${a}.`]);
};
G.twostep = (lvl, arg) => {
  const n = who(), [thing] = pick(THINGS);
  const k = rnd(0, 2);
  if (k === 0 || arg !== "4") { const a = rnd(100, 400), b = rnd(50, 300), c = rnd(20, Math.min(a + b - 10, 200)); return num(`${n} had ${a} ${thing} and found ${b} more. Then ${n} gave away ${c}. How many are left?`, a + b - c, [`First add: ${a} + ${b} = ${a + b}.`, `Then subtract: ${a + b} − ${c} = ${a + b - c}.`], { picture: { type: "strip", total: a + b, parts: [a, b] } }); }
  if (k === 1) { const g = rnd(3, 8), e = rnd(3, 9), x = rnd(2, 15); return num(`${n} buys ${g} packs of ${thing} with ${e} in each pack, and already had ${x}. How many ${thing} does ${n} have now?`, g * e + x, [`First multiply: ${g} × ${e} = ${g * e}.`, `Then add: ${g * e} + ${x} = ${g * e + x}.`]); }
  const g = rnd(2, 6), e = rnd(3, 9), x = rnd(2, g * e - 1);
  return num(`${n} has ${g} bags with ${e} ${thing} in each bag. ${n} gives away ${x} ${thing}. How many are left?`, g * e - x, [`First multiply: ${g} × ${e} = ${g * e}.`, `Then subtract: ${g * e} − ${x} = ${g * e - x}.`]);
};
G.io = (lvl) => {
  const rule = pick(lvl === 1 ? ["+", "-"] : ["+", "-", "×"]), k = rule === "×" ? rnd(2, 6) : rnd(2, 15);
  const ins = sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => x + (rule === "-" ? k : 0)), 4).sort((a, b) => a - b);
  const f = (x) => (rule === "+" ? x + k : rule === "-" ? x - k : x * k);
  const rows = [["In", ...ins.map(String)], ["Out", ...ins.slice(0, 3).map((x) => String(f(x))), "?"]];
  return num("Find the rule. What number goes in place of the \"?\" in the table?", f(ins[3]), [`Look at each In and Out pair: ${ins.slice(0, 2).map((x) => `${x} → ${f(x)}`).join(", ")}.`, `The rule is ${rule === "×" ? "multiply by" : rule === "+" ? "add" : "subtract"} ${k}.`, `${ins[3]} ${rule === "-" ? "−" : rule} ${k} = ${f(ins[3])}.`], { picture: { type: "table", rows } });
};
G.divrem = (lvl) => {
  const b = rnd(2, 9), q = rnd(3, lvl > 1 ? 30 : 9), r = rnd(1, b - 1), a = b * q + r;
  return choice(`${a} ÷ ${b} = ?`, `${q} R${r}`, [`${q + 1} R${r}`, `${q} R${(r + 1) % b || b + 1}`, `${q - 1} R${r + b}`], [`Find the biggest multiple of ${b} that fits: ${b} × ${q} = ${b * q}.`, `What's left over: ${a} − ${b * q} = ${r}.`, `${a} ÷ ${b} = ${q} R${r}.`], { visual: { type: "groups", groups: Math.min(b, 10), each: Math.min(q, 12), caption: `${b} groups of ${q}, with ${r} left over` } });
};

/* ---------------- place value to 1,000,000, rounding and estimating ---------------- */
G.pv5 = (lvl, arg) => {
  const max = +arg || 99999, n = rnd(max > 100000 ? 100000 : 10000, max);
  const places = ["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"].slice(n >= 100000 ? 0 : 1);
  const digits = String(n).split(""), i = rnd(0, digits.length - 2), place = places[i], d = +digits[i];
  const val = d * 10 ** (digits.length - 1 - i);
  const k = rnd(0, 2);
  if (k === 0) return num(`What is the value of the digit ${d} in ${fmt(n)}? (It's in the ${place} place.)`, val, [`The ${d} is in the ${place} place.`, `${d} ${place} = ${fmt(val)}.`], { visual: { type: "placevalue", number: n } });
  if (k === 1) return choice(`Which is the expanded form of ${fmt(n)}?`, expanded(n), [expanded(n + 10 ** (digits.length - 2)), digits.join(" + "), expanded(Number(digits.slice(1).join("") + digits[0]))], [`Write the value of each digit.`, `${fmt(n)} = ${expanded(n)}.`], { visual: { type: "placevalue", number: n } });
  if (n > 999999) return num(`Write ${words(n)} in standard form.`, n, [`Write each part in its place.`, `${fmt(n)}.`]);
  return num(`Write in standard form: ${words(n)}`, n, [`The words before "thousand" tell the thousands: ${words(Math.floor(n / 1000))}.`, `Then the rest: ${words(n % 1000) || "zero"}.`, `${fmt(n)}.`]);
};
G.round = (lvl) => {
  const p = lvl === 1 ? 10 : pick([10, 100]), n = p === 10 ? rnd(11, 989) : rnd(101, 9899);
  if (n % p === 0) return G.round(lvl);
  const lo = Math.floor(n / p) * p, hi = lo + p, ans = n - lo >= p / 2 ? hi : lo;
  return num(`Round ${fmt(n)} to the nearest ${p === 10 ? "ten" : "hundred"}.`, ans, [`${fmt(n)} is between ${fmt(lo)} and ${fmt(hi)}.`, `The halfway point is ${fmt(lo + p / 2)}.`, `${fmt(n)} is ${ans === hi ? "at or past" : "before"} halfway, so it rounds to ${fmt(ans)}.`], { visual: { type: "numberline", start: lo, end: hi, step: p / 10, marks: [n], labels: [lo + p / 2] } });
};
G.est = (lvl) => {
  const a = rnd(110, 890), b = rnd(110, Math.min(890, 999 - a + 300)), p = lvl === 1 ? 100 : pick([10, 100]);
  const ra = roundTo(a, p), rb = roundTo(b, p), plus = rnd(0, 1) === 1 || a <= b;
  const ans = plus ? ra + rb : ra - rb;
  return num(`Estimate ${a} ${plus ? "+" : "−"} ${b} by rounding each number to the nearest ${p === 10 ? "ten" : "hundred"} first.`, ans, [`${a} rounds to ${ra}.`, `${b} rounds to ${rb}.`, `${ra} ${plus ? "+" : "−"} ${rb} = ${ans}.`], { hint: `Round each number first, then ${plus ? "add" : "subtract"}.` });
};

/* ---------------- reviews ---------------- */
G.mix = (lvl, arg) => {
  const ops = String(arg || "add3,sub3").split("+");
  return gen(pick(ops), lvl);
};

// Run one generator by op name ("op" or "op:arg"), falling back to the classic number-fact ones.
Object.assign(G, EARLY, UPPER, MIDDLE);
export function gen(opArg, lvl) {
  const i = String(opArg).indexOf(":");
  const op = i < 0 ? opArg : opArg.slice(0, i), arg = i < 0 ? undefined : opArg.slice(i + 1);
  return G[op] ? G[op](lvl, arg) : localOne(op, lvl);
}
export const MATH_OPS = Object.keys(G);
