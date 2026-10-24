// Built-in math problems for Kindergarten and Grade 1: counting, comparing, shapes, early adding and
// subtracting, place value to 120, length, time, data and halves. Same shape as math.js: each
// generator takes a level (1 warm-up, 2 on level, 3 stretch) and an optional argument.
import { rnd, pick, shuffle, sample, num, choice, NAMES } from "./util.js";

const who = () => pick(NAMES);
const THINGS = [["🍎", "apple", "apples"], ["⭐", "star", "stars"], ["🐟", "fish", "fish"], ["🌸", "flower", "flowers"], ["🚗", "car", "cars"], ["🐞", "ladybug", "ladybugs"], ["🎈", "balloon", "balloons"], ["🍪", "cookie", "cookies"], ["🐸", "frog", "frogs"], ["⚽", "ball", "balls"], ["🦆", "duck", "ducks"], ["🍓", "strawberry", "strawberries"]];
const thing = () => pick(THINGS);
const nm = (t, n) => `${n} ${n === 1 ? t[1] : t[2]}`;
const pl = (n, one, many = one + "s") => `${n} ${n === 1 ? one : many}`;
const NUMW = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const near = (n, lo, hi) => shuffle([n - 1, n + 1, n + 2, n - 2, n + 10, n - 10].filter((x) => x >= lo && x <= hi && x !== n)).slice(0, 3);
const objs = (...gs) => ({ type: "objects", groups: gs });
const rowStart = (n) => Math.max(1, (Math.floor((n - 1) / 10) - 1) * 10 + 1);
const cnt = (n) => Array.from({ length: n }, (_, i) => i + 1).join(", ");

const E = {};

/* ---------------- counting and numbers to 20 ---------------- */
E.count = (lvl, arg) => {
  const max = +arg || 10, n = rnd(lvl === 1 ? 1 : 3, lvl === 3 ? Math.min(20, max + 5) : max), t = thing();
  return num(`How many ${t[2]} are there?`, n, ["Touch each one as you count, and count each one only once.", `${cnt(n)}.`, `The last number you say tells how many: ${n}.`], { picture: objs({ emoji: t[0], n }) });
};
E.numwrite = (lvl, arg) => {
  const max = +arg || 10, n = rnd(0, max), k = rnd(0, 2), t = thing();
  if (k === 0) return choice(`Which number is "${NUMW[n]}"?`, n, near(n, 0, max), [`Say the number word: ${NUMW[n]}.`, `${NUMW[n]} is written ${n}.`]);
  if (k === 1) return choice(`Which word names the number ${n}?`, NUMW[n], near(n, 0, max).map((x) => NUMW[x]), [`Read the number: ${n}.`, `${n} is "${NUMW[n]}".`]);
  const m = Math.max(1, n);
  return choice(`Which number tells how many ${t[2]}?`, m, near(m, 1, max), [`Count them: ${cnt(m)}.`, `Write the number ${m}.`], { picture: objs({ emoji: t[0], n: m }) });
};
E.cmpgrp = (lvl, arg) => {
  const max = +arg || 10, t = thing(), u = pick(THINGS.filter((x) => x !== t));
  let a = rnd(1, max), b = rnd(1, max);
  if (rnd(0, 4) === 0) b = a;
  const word = pick(["more", "fewer"]);
  if (a === b) return choice(`Are there more ${t[2]}, more ${u[2]}, or the same number?`, "the same", [`more ${t[2]}`, `more ${u[2]}`], [`Count each group: ${a} ${t[2]} and ${b} ${u[2]}.`, `${a} and ${b} are the same number.`], { keepOrder: [`more ${t[2]}`, `more ${u[2]}`, "the same"], picture: objs({ emoji: t[0], n: a }, { emoji: u[0], n: b }) });
  const right = (word === "more") === (a > b) ? t[2] : u[2];
  return choice(`Which group has ${word}: the ${t[2]} or the ${u[2]}?`, right, [right === t[2] ? u[2] : t[2], "they are the same"], [`Count each group: ${a} ${t[2]} and ${b} ${u[2]}.`, `${Math.max(a, b)} is more than ${Math.min(a, b)}, so the ${right} ${word === "more" ? "have more" : "have fewer"}.`], { keepOrder: [t[2], u[2], "they are the same"], picture: objs({ emoji: t[0], n: a }, { emoji: u[0], n: b }) });
};
E.cmpnum = (lvl, arg) => {
  const max = +arg || 20, a = rnd(1, max), b = pick([rnd(1, max), a + pick([1, -1, 10, -10])]), bb = Math.max(0, Math.min(max, b));
  if (rnd(0, 1) || a === bb) {
    const sign = a > bb ? ">" : a < bb ? "<" : "=";
    return choice(`Which sign makes this true?\n${a} ___ ${bb}`, sign, [">", "<", "="], [`The open side of > and < faces the bigger number.`, a === bb ? `${a} and ${bb} are equal.` : `${Math.max(a, bb)} is greater, so ${a} ${sign} ${bb}.`], { keepOrder: [">", "<", "="], visual: { type: "numberline", start: 0, end: max <= 20 ? 20 : Math.ceil(Math.max(a, bb) / 10) * 10 + 10, marks: [a, bb] } });
  }
  const big = rnd(0, 1) === 1;
  return choice(`Which number is ${big ? "greater" : "less"}: ${a} or ${bb}?`, big ? Math.max(a, bb) : Math.min(a, bb), [big ? Math.min(a, bb) : Math.max(a, bb)], [max > 20 ? "Compare the tens first. If they match, compare the ones." : "The number that comes later when you count is greater.", `${Math.max(a, bb)} is greater than ${Math.min(a, bb)}.`], { keepOrder: [a, bb].map(String), visual: { type: "numberline", start: 0, end: max <= 20 ? 20 : Math.ceil(Math.max(a, bb) / 10) * 10 + 10, marks: [a, bb] } });
};
E.order = (lvl, arg) => {
  const max = +arg || 10, k = rnd(0, 2);
  if (k === 0) { const n = rnd(1, max - 1), after = rnd(0, 1) === 1, ans = after ? n + 1 : n - 1; return num(`What number comes just ${after ? "after" : "before"} ${n}?`, ans, [`Count ${after ? "up" : "back"} one from ${n}.`, `${after ? `${n}, ${ans}` : `${ans}, ${n}`}.`], { visual: { type: "numberline", start: Math.max(0, n - 5), end: Math.max(0, n - 5) + 10, marks: [n, ans] } }); }
  if (k === 1) { const n = rnd(1, max - 1); return num(`What number comes between ${n - 1} and ${n + 1}?`, n, ["Count up from the first number.", `${n - 1}, ${n}, ${n + 1}.`]); }
  const s = rnd(0, Math.max(0, max - 5)), miss = rnd(1, 3), list = [0, 1, 2, 3, 4].map((i) => s + i);
  return num(`What number is missing?\n${list.map((x, i) => (i === miss ? "___" : x)).join(", ")}`, s + miss, ["Count in order from the first number.", `${list.join(", ")}.`]);
};
E.teen = (lvl) => {
  const o = rnd(1, 9), n = 10 + o, k = rnd(0, 2);
  if (k === 0) return num(`A full ten frame and ${o} more. How many in all?`, n, ["A full ten frame is 10.", `10 and ${o} more is ${n}.`], { picture: { type: "tenframe", filled: n, total: 20 } });
  if (k === 1) return num(`${n} is 10 and how many more ones?`, o, [`Teen numbers are 10 and some ones.`, `${n} = 10 + ${o}.`], { visual: { type: "tenframe", filled: n, total: 20 } });
  return choice(`Which shows ${n}?`, `10 + ${o}`, [`10 + ${Math.min(9, o + 1)}`, `${o} + ${o}`, `10 + ${Math.max(0, o - 1)}`].filter((x) => x !== `10 + ${o}`), [`${n} has 1 ten and ${o} ones.`, `So ${n} = 10 + ${o}.`], { visual: { type: "tenframe", filled: n, total: 20 } });
};
E.make = (lvl, arg) => {
  const tot = +arg || 10, a = rnd(1, tot - 1), b = tot - a, k = rnd(0, 1);
  if (k === 0) return num(`${a} and how many more make ${tot}?`, b, [tot === 10 ? `Look at the ten frame: ${a} ${a === 1 ? "is" : "are"} filled.` : `${a} are blue.`, tot === 10 ? `Count the empty spaces: ${b}.` : `Count the white ones to make ${tot}: ${b}.`, `${a} + ${b} = ${tot}.`], { picture: tot === 10 ? { type: "tenframe", filled: a } : objs({ emoji: "🔵", n: a }, { emoji: "⚪", n: b }) });
  return choice(`Which pair makes ${tot}?`, `${a} and ${b}`, [`${a} and ${b + 1}`, `${Math.max(0, a - 1)} and ${b - 1 < 0 ? 2 : b - 1}`, `${a + 1} and ${b + 1}`], [`Add the two numbers.`, `${a} + ${b} = ${tot}.`]);
};
E.by = (lvl, arg) => {
  const step = +arg || 10;
  if (step === 1) {
    const n = rnd(lvl === 1 ? 10 : 20, 99), after = rnd(0, 2) > 0;
    return num(after ? `Count by ones. What comes after ${n}?` : `Count by ones. What comes before ${n}?`, after ? n + 1 : n - 1, [`Count ${after ? "up" : "back"} by one.`, after && n % 10 === 9 ? `After ${n} comes a new ten: ${n + 1}.` : `${after ? n + 1 : n - 1}.`], { visual: { type: "hundred", start: rowStart(n), rows: 3, shade: [n] } });
  }
  const s = rnd(1, 6) * 10, miss = rnd(1, 3), list = [0, 1, 2, 3].map((i) => s + i * 10);
  if (rnd(0, 1)) return num(`Count by tens. What number is missing?\n${list.map((x, i) => (i === miss ? "___" : x)).join(", ")}`, s + miss * 10, ["Counting by tens adds 10 each time.", `${list.join(", ")}.`], { visual: { type: "hundred", start: 1, rows: 10, shade: list } });
  const t = rnd(2, 9);
  return num(`How many is ${t} groups of ten?`, t * 10, ["Count by tens.", `${Array.from({ length: t }, (_, i) => (i + 1) * 10).join(", ")}.`]);
};
E.chart = (lvl) => {
  const n = rnd(12, 89), k = rnd(0, 2), s0 = rowStart(n), ans = k === 0 ? n : k === 1 ? n + 10 : n - 10;
  const q = k === 0 ? `What number goes in the "?" box?` : k === 1 ? `Find ${n} on the chart. What number is just below it?` : `Find ${n} on the chart. What number is just above it?`;
  return num(q, ans, [k === 0 ? "Each number is 1 more than the one to its left." : "Going down one row adds 10; going up one row takes away 10.", `The answer is ${ans}.`], { picture: { type: "hundred", start: s0, rows: 3, ask: k === 0 ? [n] : [], shade: k === 0 ? [] : [n] } });
};
E.pv2 = (lvl, arg) => {
  const max = +arg || 99, n = rnd(lvl === 1 ? 11 : 20, max), t = Math.floor(n / 10), o = n % 10, k = rnd(0, 2);
  if (k === 0) return num("What number do the blocks show?", n, [`Count the rods by tens: ${Array.from({ length: t }, (_, i) => (i + 1) * 10).join(", ")}.`, `Then count on the ones: ${o}.`, `${t * 10} + ${o} = ${n}.`], { picture: { type: "blocks", number: n }, visual: { type: "placevalue", number: n } });
  if (k === 1) return num(`How many tens are in ${n}?`, t, [`Cover the ones digit and read what is left: ${t}.`, `${n} has ${pl(t, "ten")} and ${pl(o, "one")}.`], { visual: { type: "blocks", number: n } });
  return choice(`Which is another way to show ${n}?`, `${pl(t, "ten")} and ${pl(o, "one")}`, [`${pl(o, "ten")} and ${pl(t, "one")}`, `${pl(t, "ten")} and ${pl((o + 1) % 10, "one")}`, `${pl(t + 1, "ten")} and ${pl(o, "one")}`], [`The last digit is the ones. Cover it, and the rest tells the tens.`, `${n} = ${pl(t, "ten")} and ${pl(o, "one")}.`], { visual: { type: "blocks", number: n } });
};

/* ---------------- adding and subtracting stories and sentences ---------------- */
E.addpic = (lvl, arg) => {
  const max = +arg || 5, a = rnd(1, max - 1), b = rnd(1, max - a), t = thing();
  if (rnd(0, 1)) return num(`How many ${t[2]} in all?`, a + b, [`Count the first group: ${a}. Count the second group: ${b}.`, `Put them together: ${a} + ${b} = ${a + b}.`], { picture: { ...objs({ emoji: t[0], n: a }, { emoji: t[0], n: b }), op: "+" } });
  return choice("Which addition sentence matches the picture?", `${a} + ${b} = ${a + b}`, [`${a} + ${b} = ${a + b + 1}`, `${a} − ${b} = ${Math.max(0, a - b)}`, `${a + 1} + ${b} = ${a + b + 1}`], [`There are ${a} and ${b}.`, `${a} + ${b} = ${a + b}.`], { picture: { ...objs({ emoji: t[0], n: a }, { emoji: t[0], n: b }), op: "+" } });
};
E.subpic = (lvl, arg) => {
  const max = +arg || 5, a = rnd(2, max), b = rnd(1, a - 1), t = thing();
  if (rnd(0, 1)) return num(`There are ${a} ${t[2]}. ${b} ${b === 1 ? "is" : "are"} crossed out. How many are left?`, a - b, [`Count all of them: ${a}.`, `Count the ones not crossed out: ${a - b}.`, `${a} − ${b} = ${a - b}.`], { picture: objs({ emoji: t[0], n: a, crossed: b }) });
  return choice("Which subtraction sentence matches the picture?", `${a} − ${b} = ${a - b}`, [`${a} + ${b} = ${a + b}`, `${a} − ${b} = ${a - b + 1}`, `${a} − ${a - b} = ${b}`].filter((x) => x !== `${a} − ${b} = ${a - b}`), [`Start with ${a}. ${b} are taken away.`, `${a} − ${b} = ${a - b}.`], { picture: objs({ emoji: t[0], n: a, crossed: b }) });
};
// Story types: join (adding to), put (putting together), take (taking from), apart, compare, two (two steps).
E.tale = (lvl, arg) => {
  const max = +(String(arg || "").match(/\d+/) || [10])[0], n = who(), t = thing(), types = { k: ["join", "take"], j: ["join", "put"], t: ["take", "apart"], c: ["compare"], s: ["two"] }[(arg || "").replace(/\d+/g, "")] || ["join", "take"];
  const kind = pick(types), top = max;
  if (kind === "join") { const a = rnd(1, top - 1), b = rnd(1, top - a); return num(`${n} has ${nm(t, a)}. ${n} gets ${b} more. How many ${t[2]} does ${n} have now?`, a + b, ["More are joining, so add.", `${a} + ${b} = ${a + b}.`], { visual: { ...objs({ emoji: t[0], n: Math.min(a, 20) }, { emoji: t[0], n: Math.min(b, 20) }), op: "+" } }); }
  if (kind === "put") { const a = rnd(1, top - 1), b = rnd(1, top - a); return num(`There are ${a} red ${a === 1 ? t[1] : t[2]} and ${b} blue ${b === 1 ? t[1] : t[2]}. How many ${t[2]} are there in all?`, a + b, ["Put the two groups together, so add.", `${a} + ${b} = ${a + b}.`], { visual: { type: "strip", parts: [a, b], total: "?" } }); }
  if (kind === "take") { const a = rnd(2, top), b = rnd(1, a - 1); return num(`${n} has ${nm(t, a)}. ${n} gives ${b} away. How many ${t[2]} are left?`, a - b, ["Some are taken away, so subtract.", `${a} − ${b} = ${a - b}.`], { visual: objs({ emoji: t[0], n: a, crossed: b }) }); }
  if (kind === "apart") { const a = rnd(3, top), b = rnd(1, a - 1); return num(`${n} has ${nm(t, a)}. ${b} ${b === 1 ? "is" : "are"} in a box and the rest are on the table. How many are on the table?`, a - b, ["You know the whole and one part, so subtract.", `${a} − ${b} = ${a - b}.`], { visual: { type: "strip", parts: [b, "?"], total: a } }); }
  if (kind === "compare") { const a = rnd(3, top), b = rnd(1, a - 1), m = pick(NAMES.filter((x) => x !== n)); return num(`${n} has ${nm(t, a)}. ${m} has ${nm(t, b)}. How many more ${t[2]} does ${n} have than ${m}?`, a - b, ["To compare, find the difference: subtract.", `${a} − ${b} = ${a - b}.`], { visual: { type: "lengths", items: [{ label: n, len: Math.min(a, 15) }, { label: m, len: Math.min(b, 15) }], units: true } }); }
  const a = rnd(3, 9), b = rnd(1, 6), c = rnd(1, Math.min(a + b - 1, 6));
  return num(`${n} has ${nm(t, a)}. ${n} finds ${b} more, then gives ${c} to a friend. How many ${t[2]} does ${n} have now?`, a + b - c, [`First add: ${a} + ${b} = ${a + b}.`, `Then subtract: ${a + b} − ${c} = ${a + b - c}.`]);
};
E.add3n = (lvl) => {
  const a = rnd(1, 9), b = rnd(1, 9), c = rnd(1, Math.max(1, 20 - a - b));
  const ten = a + b === 10 ? [a, b, c] : b + c === 10 ? [b, c, a] : a + c === 10 ? [a, c, b] : null;
  return num(`${a} + ${b} + ${c} = ?`, a + b + c, ten ? [`Look for a ten: ${ten[0]} + ${ten[1]} = 10.`, `10 + ${ten[2]} = ${a + b + c}.`] : [`Add two numbers first: ${a} + ${b} = ${a + b}.`, `Then add the last one: ${a + b} + ${c} = ${a + b + c}.`]);
};
E.family = (lvl) => {
  const a = rnd(2, 9), b = rnd(1, 9), c = a + b, k = rnd(0, 1);
  if (k === 0) return choice(`Which fact belongs to the fact family ${a}, ${b}, ${c}?`, `${c} − ${a} = ${b}`, [`${a} − ${b} = ${c}`, `${c} + ${a} = ${b}`, `${b} − ${c} = ${a}`], [`A fact family uses the same three numbers.`, `The biggest number, ${c}, is the whole: ${a} + ${b} = ${c}, so ${c} − ${a} = ${b}.`]);
  return num(`${a} + ${b} = ${c}. So ${c} − ${b} = ?`, a, ["Use the addition fact to subtract.", `${a} + ${b} = ${c}, so ${c} − ${b} = ${a}.`], { visual: { type: "strip", parts: [a, b], total: c } });
};
E.missing = (lvl) => {
  const a = rnd(1, 10), b = rnd(1, 10), c = a + b, k = rnd(0, 2);
  if (k === 0) return num(`${a} + ___ = ${c}`, b, [`Start at ${a} and count up to ${c}.`, `${c} − ${a} = ${b}, so ${a} + ${b} = ${c}.`], { visual: { type: "strip", parts: [a, "?"], total: c } });
  if (k === 1) return num(`___ + ${b} = ${c}`, a, [`What plus ${b} makes ${c}?`, `${c} − ${b} = ${a}.`], { visual: { type: "strip", parts: ["?", b], total: c } });
  return num(`${c} − ___ = ${a}`, b, [`How many do you take from ${c} to leave ${a}?`, `${a} + ${b} = ${c}, so the answer is ${b}.`], { visual: { type: "numberline", start: 0, end: 20, jumps: [{ from: c, to: a }] } });
};

/* ---------------- adding tens (Grade 1) ---------------- */
E.tens = (lvl, arg) => {
  const k = arg || "add";
  if (k === "add") { const a = rnd(1, 7) * 10, b = rnd(1, 9 - a / 10) * 10; return num(`${a} + ${b} = ?`, a + b, [`Think in tens: ${pl(a / 10, "ten")} + ${pl(b / 10, "ten")} = ${(a + b) / 10} tens.`, `${(a + b) / 10} tens is ${a + b}.`], { visual: { type: "blocks", numbers: [a, b], op: "+" } }); }
  if (k === "sub") { const a = rnd(3, 9) * 10, b = rnd(1, a / 10 - 1) * 10; return num(`${a} − ${b} = ?`, a - b, [`Think in tens: ${a / 10} tens − ${pl(b / 10, "ten")} = ${pl((a - b) / 10, "ten")}.`, `${pl((a - b) / 10, "ten")} is ${a - b}.`], { visual: { type: "numberline", start: 0, end: 100, step: 10, jumps: [{ from: a, to: a - b }] } }); }
  if (k === "one") {
    const a = rnd(11, 89), b = rnd(1, 9), c = a + b;
    return num(`${a} + ${b} = ?`, c, (a % 10) + b >= 10 ? [`Add the ones: ${a % 10} + ${b} = ${(a % 10) + b}. That makes a new ten.`, `${a - (a % 10)} + ${(a % 10) + b} = ${c}.`] : [`Add the ones: ${a % 10} + ${b} = ${(a % 10) + b}.`, `The tens stay the same: ${c}.`], { visual: { type: "blocks", numbers: [a, b], op: "+" } });
  }
  const a = rnd(11, 69), b = rnd(1, 9 - Math.floor(a / 10)) * 10;
  return num(`${a} + ${b} = ?`, a + b, [`Only the tens change: ${pl(Math.floor(a / 10), "ten")} + ${pl(b / 10, "ten")} = ${Math.floor(a / 10) + b / 10} tens.`, `The ones stay ${a % 10}: ${a + b}.`], { visual: { type: "numberline", start: Math.floor(a / 10) * 10, end: Math.ceil((a + b) / 10) * 10 + 10, step: 10, jumps: [{ from: a, to: a + b }] } });
};
E.tenmore = (lvl, arg) => {
  const n = rnd(11, +arg || 89), more = rnd(0, 1) === 1, d = rnd(0, 3) ? 10 : 1, ans = more ? n + d : n - d;
  return num(`What is ${d} ${more ? "more" : "less"} than ${n}?`, ans, [d === 10 ? `10 ${more ? "more" : "less"} changes only the tens digit.` : `1 ${more ? "more" : "less"} changes the ones digit.`, `${n} ${more ? "+" : "−"} ${d} = ${ans}.`], { visual: { type: "hundred", start: rowStart(n), rows: 3, shade: [n] } });
};

/* ---------------- shapes and position ---------------- */
const FLAT = [["circle", { kind: "circle" }, 0], ["triangle", { sides: 3 }, 3], ["square", { kind: "square" }, 4], ["rectangle", { kind: "rectangle" }, 4], ["hexagon", { sides: 6 }, 6]];
const REAL = [["a clock", "circle"], ["a pizza", "circle"], ["a door", "rectangle"], ["a slice of pizza", "triangle"], ["a cracker", "square"], ["a window pane", "square"], ["a coin", "circle"], ["a book cover", "rectangle"], ["a yield sign", "triangle"], ["a dollar bill", "rectangle"]];
E.flat = (lvl, arg) => {
  const pool = arg === "k" ? FLAT.slice(0, 4) : FLAT, [name, spec, sides] = pick(pool), k = rnd(0, 2);
  if (k === 0 || (k === 1 && !sides)) return choice("What is the name of this shape?", name, pool.map((f) => f[0]).filter((x) => x !== name), [sides ? `Count the sides: ${sides}.` : "It is round with no corners.", `It is a ${name}.`], { picture: { type: "polygon", ...spec } });
  if (k === 1 && sides) return num(`How many ${rnd(0, 1) ? "sides" : "corners"} does this shape have?`, sides, ["Touch each one as you count.", `A ${name} has ${sides}.`], { picture: { type: "polygon", ...spec, dots: true } });
  const [obj, shape] = pick(REAL);
  return choice(`What shape is ${obj}?`, shape, ["circle", "triangle", "square", "rectangle"].filter((x) => x !== shape), ["Picture the object and trace its edge.", `${obj[0].toUpperCase() + obj.slice(1)} is shaped like a ${shape}.`]);
};
const SOLID_K = [["cube", "a block"], ["sphere", "a ball"], ["cylinder", "a can"], ["cone", "an ice cream cone"]];
E.flatsolid = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const [s] = pick(SOLID_K); return choice("Is this shape flat or solid?", "solid", ["flat"], ["A flat shape lies flat like paper. A solid shape is thick and you can hold it.", `This is a ${s}. It is solid.`], { keepOrder: ["flat", "solid"], picture: { type: "solid", kind: s } }); }
  if (k === 1) { const [name, spec] = pick(FLAT.slice(0, 4)); return choice("Is this shape flat or solid?", "flat", ["solid"], ["A flat shape lies flat like paper.", `This is a ${name}. It is flat.`], { keepOrder: ["flat", "solid"], picture: { type: "polygon", ...spec } }); }
  const [s, obj] = pick(SOLID_K);
  return choice(`What solid shape is ${obj}?`, s, SOLID_K.map((x) => x[0]).filter((x) => x !== s), [`Think about ${obj}: is it round, or does it have flat faces?`, `${obj[0].toUpperCase() + obj.slice(1)} is a ${s}.`], { picture: { type: "solid", kind: s } });
};
const POS = [["🐦", "🌳", "above", "tree"], ["🐱", "🪑", "below", "chair"], ["🐶", "🏠", "beside", "house"], ["⭐", "🎁", "above", "box"], ["⚽", "🛏️", "below", "bed"], ["🐰", "🌳", "beside", "tree"], ["☁️", "🏠", "above", "house"], ["🐟", "⛵", "below", "boat"]];
E.position = (lvl) => {
  const [a, b, where, ref] = pick(POS);
  return choice(`Where is the ${a} compared to the ${ref}?`, where, ["above", "below", "beside"].filter((x) => x !== where), [`Look at the ${ref}. Is the ${a} on top, underneath, or next to it?`, `It is ${where} the ${ref}.`], { keepOrder: ["above", "below", "beside"], picture: { type: "position", thing: a, ref: b, where } });
};

/* ---------------- measuring and sorting ---------------- */
const HEAVY = [["🐘 elephant", "🐭 mouse"], ["🚗 car", "🚲 bike"], ["🍉 watermelon", "🍇 grape"], ["📚 stack of books", "🪶 feather"], ["🐻 bear", "🐦 bird"], ["🎳 bowling ball", "🎈 balloon"], ["🪨 big rock", "🍃 leaf"], ["🐄 cow", "🐱 cat"]];
E.weigh = (lvl) => {
  const [h, l] = pick(HEAVY), heavier = rnd(0, 1) === 1;
  return choice(`Which is ${heavier ? "heavier" : "lighter"}?`, heavier ? h : l, [heavier ? l : h], ["Think about lifting each one.", `The ${(heavier ? h : l).split(" ").slice(1).join(" ")} is ${heavier ? "heavier" : "lighter"}.`], { keepOrder: shuffle([h, l]) });
};
const LONG_ITEMS = ["✏️", "🖍️", "🐍", "🥖", "🪱", "🎀"];
E.len = (lvl, arg) => {
  const k = arg === "units" ? 2 : arg === "order" ? 1 : rnd(0, 1);
  if (k === 0) {
    const a = rnd(3, 12), b = pick([a + rnd(2, 4), a - rnd(2, Math.min(3, a - 1))]), [x, y] = sample(LONG_ITEMS, 2), longer = rnd(0, 1) === 1;
    const right = (longer === (a > b)) ? x : y;
    return choice(`Which is ${longer ? "longer" : "shorter"}?`, right, [right === x ? y : x], ["Line up the ends and compare.", `The ${right} is ${longer ? "longer" : "shorter"}.`], { keepOrder: [x, y], picture: { type: "lengths", items: [{ label: x, len: a }, { label: y, len: b }] } });
  }
  if (k === 1) {
    const lens = sample([3, 5, 7, 9, 11, 13], 3), labs = sample(LONG_ITEMS, 3), items = labs.map((l, i) => ({ label: l, len: lens[i] }));
    const short = rnd(0, 1) === 1, sorted = [...items].sort((p, q) => (short ? p.len - q.len : q.len - p.len)).map((t) => t.label).join(" ");
    return choice(`Which shows them in order from ${short ? "shortest to longest" : "longest to shortest"}?`, sorted, [[...items].sort((p, q) => (short ? q.len - p.len : p.len - q.len)).map((t) => t.label).join(" "), shuffle(labs).join(" "), labs.join(" ")], ["Find the shortest and the longest first.", `In order: ${sorted}.`], { picture: { type: "lengths", items } });
  }
  const n = rnd(2, 12), x = pick(LONG_ITEMS);
  return num(`How many cubes long is the ${x}?`, n, ["Count the cubes under it, from one end to the other.", `It is ${n} cubes long.`], { picture: { type: "lengths", items: [{ label: x, len: n }], units: true } });
};
const SORTS = [["fruit", ["🍎", "🍌", "🍇", "🍓", "🍐"]], ["animals", ["🐶", "🐱", "🐸", "🐰", "🦆"]], ["vehicles", ["🚗", "🚌", "🚲", "🚂", "✈️"]], ["shapes", ["🔺", "🟦", "🔵", "🟨", "🔷"]], ["clothes", ["👕", "👖", "🧦", "👟", "🧢"]]];
E.sort = (lvl, arg) => {
  const [g, items] = pick(SORTS), [, other] = pick(SORTS.filter((s) => s[0] !== g));
  if (arg !== "count" && rnd(0, 1)) {
    const odd = pick(other), set = shuffle([...sample(items, 3), odd]);
    return choice(`Which one does not belong?\n${set.join("  ")}`, odd, set.filter((x) => x !== odd), [`Three of them are ${g}.`, `${odd} is not one of the ${g}, so it does not belong.`], { keepOrder: set });
  }
  const a = pick(items), b = pick(other), na = rnd(2, 7), nb = rnd(2, 7);
  return num(`Sort the pictures. How many ${a} are there?`, na, [`Look only for ${a}.`, `Count them: ${cnt(na)}.`], { picture: objs({ emoji: a, n: na }, { emoji: b, n: nb }) });
};

/* ---------------- time, data and halves (Grade 1) ---------------- */
E.clock = (lvl, arg) => {
  const h = rnd(1, 12), m = arg === "half" ? pick([0, 30]) : 0, str = `${h}:${m ? "30" : "00"}`;
  if (rnd(0, 1)) return choice("What time does the clock show?", str, [`${h % 12 + 1}:${m ? "30" : "00"}`, `${h}:${m ? "00" : "30"}`, `${(h + 10) % 12 + 1}:${m ? "30" : "00"}`], [m ? `The long hand points to 6: that's half past, or 30.` : `The long hand points to 12: that's o'clock.`, m ? `The short hand is halfway past ${h}.` : `The short hand points to ${h}.`, `It is ${str}.`], { picture: { type: "clock", hour: h, minute: m } });
  return choice(`Where does the long hand point at ${str}?`, m ? "to the 6" : "to the 12", [m ? "to the 12" : "to the 6", `to the ${h}`].filter((x) => x !== (m ? "to the 6" : "to the 12")), ["The long hand shows the minutes.", m ? "At half past, it points to 6." : "At o'clock, it points to 12."], { visual: { type: "clock", hour: h, minute: m } });
};
const TCATS = [["Favorite fruit", ["Apple", "Banana", "Grape"]], ["Pets", ["Dog", "Cat", "Fish"]], ["Weather this month", ["Sunny", "Rainy", "Cloudy"]], ["Favorite color", ["Red", "Blue", "Green"]]];
E.tallyq = (lvl) => {
  const [title, labels] = pick(TCATS), values = sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3), pic = { type: "tally", title, labels, values };
  const [x, y] = sample([0, 1, 2], 2), k = rnd(0, 2);
  if (k === 0) return num(`Use the tally chart. How many for ${labels[x]}?`, values[x], ["Each bundle of 5 tally marks has a line across.", `Count by fives, then ones: ${values[x]}.`], { picture: pic });
  if (k === 1) { const most = values.indexOf(Math.max(...values)); if (values.filter((v) => v === values[most]).length === 1) return choice("Use the tally chart. Which has the most?", labels[most], labels.filter((_, i) => i !== most), ["Count each row.", `${labels.map((l, i) => `${l}: ${values[i]}`).join(", ")}.`, `${labels[most]} has the most.`], { keepOrder: labels, picture: pic }); }
  return num(`Use the tally chart. How many more for ${labels[values[x] >= values[y] ? x : y]} than ${labels[values[x] >= values[y] ? y : x]}?`, Math.abs(values[x] - values[y]), ["Count both rows.", `${Math.max(values[x], values[y])} − ${Math.min(values[x], values[y])} = ${Math.abs(values[x] - values[y])}.`], { picture: pic });
};
E.half = (lvl, arg) => {
  const n = arg === "4" ? 4 : arg === "2" ? 2 : pick([2, 4]), name = n === 2 ? "halves" : "fourths", one = n === 2 ? "one half" : "one fourth", k = rnd(0, 2), shape = pick(["circle", "rect"]);
  if (k === 0) return num(`A shape is cut into ${name}. How many equal parts is that?`, n, [`${name[0].toUpperCase() + name.slice(1)} means ${n} equal parts.`, `${n} parts.`], { visual: { type: "fraction", parts: n, shaded: 0, shape } });
  if (k === 1) return choice("How much of the shape is shaded?", one, [n === 2 ? "one fourth" : "one half", "the whole shape"], [`The shape has ${n} equal parts and 1 is shaded.`, `1 of ${n} equal parts is ${one}.`], { picture: { type: "fraction", parts: n, shaded: 1, shape } });
  if (rnd(0, 2)) { const food = pick(["sandwich", "pizza", "cake", "pancake", "tortilla", "cookie"]), ate = rnd(1, n - 1), m = who(); return num(`${m} cuts a ${food} into ${name} and eats ${ate === 1 ? "one" : ate} of them. How many ${name} are left?`, n - ate, [`${name[0].toUpperCase() + name.slice(1)} means ${n} equal parts.`, `${n} − ${ate} = ${n - ate}.`], { visual: { type: "fraction", parts: n, shaded: n - ate, shape: food === "sandwich" ? "rect" : "circle" } }); }
  return choice(`Which is bigger: one half or one fourth of the same pizza?`, "one half", ["one fourth", "they are the same"], ["Fewer parts means bigger parts.", "A half is bigger than a fourth."], { visual: { type: "fraction", parts: 2, shaded: 1, shape: "circle" } });
};

export const EARLY = E;
