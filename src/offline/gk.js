// General knowledge: everyday facts kids are expected to just know: days, months, calendars,
// seasons, time facts, coins, measuring, Earth and space, animals and nature.
// Each generator takes a level (1 warm-up, 2 on level, 3 stretch).
import { rnd, pick, sample, choice, num, NAMES } from "./util.js";

export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const ORD = ["first", "second", "third", "fourth", "fifth"];
const ordNum = (n) => n + (n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th");
const wrap = (i, n) => ((i % n) + n) % n;
const otherDays = (ans, n = 3) => sample(WEEKDAYS.filter((d) => d !== ans), n);
const otherMonths = (ans, near) => {
  const i = MONTHS.indexOf(ans);
  const pool = near ? [MONTHS[wrap(i - 1, 12)], MONTHS[wrap(i + 1, 12)], MONTHS[wrap(i + 2, 12)], MONTHS[wrap(i - 2, 12)]] : MONTHS;
  return sample(pool.filter((m) => m !== ans), 3);
};
const dayList = WEEKDAYS.join(", ");
const monthList = MONTHS.join(", ");

/* ---------- days of the week ---------- */
function days(lvl) {
  const i = rnd(0, 6), d = WEEKDAYS[i];
  const t = pick(lvl === 1 ? ["after", "before", "count", "weekend", "after"] : lvl === 2 ? ["yesterday", "tomorrow", "two", "school", "first"] : ["inN", "twoBefore", "school", "inN", "order"]);
  if (t === "after" || t === "tomorrow") {
    const a = WEEKDAYS[wrap(i + 1, 7)];
    const q = t === "after" ? `What day comes right after ${d}?` : `If today is ${d}, what day will tomorrow be?`;
    return choice(q, a, otherDays(a), [`The days go in order: ${dayList}.`, `The day after ${d} is ${a}.`], { hint: "Say the days of the week in order and stop at the next one." });
  }
  if (t === "before" || t === "yesterday") {
    const a = WEEKDAYS[wrap(i - 1, 7)];
    const q = t === "before" ? `What day comes right before ${d}?` : `If today is ${d}, what day was yesterday?`;
    return choice(q, a, otherDays(a), [`The days go in order: ${dayList}.`, `The day before ${d} is ${a}.`], { hint: "Yesterday is the day before today." });
  }
  if (t === "count") return num("How many days are in one week?", 7, ["Count them: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.", "That's 7 days."]);
  if (t === "weekend") return choice("Which two days make the weekend?", "Saturday and Sunday", ["Monday and Tuesday", "Friday and Monday", "Wednesday and Thursday"], ["The weekend is the two days with no school.", "Those are Saturday and Sunday."]);
  if (t === "first") return choice("Which day is usually the first school day of the week?", "Monday", ["Sunday", "Friday", "Wednesday"], ["School days are Monday to Friday.", "So Monday is the first school day."]);
  if (t === "school") return num("How many school days are in one week (Monday to Friday)?", 5, ["Count: Monday, Tuesday, Wednesday, Thursday, Friday.", "That's 5 school days. Saturday and Sunday make 2 weekend days."]);
  if (t === "two") {
    const a = WEEKDAYS[wrap(i + 2, 7)];
    return choice(`What day is 2 days after ${d}?`, a, otherDays(a), [`Count on 2 days from ${d}: ${WEEKDAYS[wrap(i + 1, 7)]}, ${a}.`, `So it is ${a}.`]);
  }
  if (t === "twoBefore") {
    const a = WEEKDAYS[wrap(i - 2, 7)];
    return choice(`What day was 2 days before ${d}?`, a, otherDays(a), [`Count back 2 days from ${d}: ${WEEKDAYS[wrap(i - 1, 7)]}, ${a}.`, `So it was ${a}.`]);
  }
  if (t === "order") {
    const s = [0, 1, 2].map((k) => WEEKDAYS[wrap(i + k, 7)]);
    const right = s.join(", ");
    return choice("Which days are in the right order?", right, [[s[1], s[0], s[2]].join(", "), [s[0], s[2], s[1]].join(", "), [s[2], s[1], s[0]].join(", ")], [`The days go in order: ${dayList}.`, `So the right order is ${right}.`]);
  }
  const n = rnd(3, 10), a = WEEKDAYS[wrap(i + n, 7)];
  return choice(`Today is ${d}. What day will it be in ${n} days?`, a, otherDays(a), [n >= 7 ? `In 7 days it's ${d} again. Then count on ${n - 7} more.` : `Count on ${n} days from ${d}.`, `${Array.from({ length: n }, (_, k) => WEEKDAYS[wrap(i + k + 1, 7)]).join(", ")}.`, `It will be ${a}.`]);
}

/* ---------- months of the year ---------- */
function months(lvl) {
  const i = rnd(0, 11), m = MONTHS[i];
  const t = pick(lvl === 1 ? ["after", "before", "count", "firstlast"] : lvl === 2 ? ["number", "which", "two", "after"] : ["days", "count31", "shortest", "later", "days"]);
  if (t === "after") { const a = MONTHS[wrap(i + 1, 12)]; return choice(`Which month comes right after ${m}?`, a, otherMonths(a, true), [`The months go in order: ${monthList}.`, `After ${m} comes ${a}.${i === 11 ? " Then a new year starts again with January." : ""}`]); }
  if (t === "before") { const a = MONTHS[wrap(i - 1, 12)]; return choice(`Which month comes right before ${m}?`, a, otherMonths(a, true), [`The months go in order: ${monthList}.`, `Before ${m} comes ${a}.`]); }
  if (t === "count") return num("How many months are in one year?", 12, [`Count them: ${monthList}.`, "That's 12 months."]);
  if (t === "firstlast") return rnd(0, 1)
    ? choice("Which month is the first month of the year?", "January", ["December", "March", "June"], ["The year starts with January.", "New Year's Day is January 1."])
    : choice("Which month is the last month of the year?", "December", ["January", "November", "October"], ["The year ends with December.", "After December 31, a new year begins."]);
  if (t === "number") return num(`${m} is which month of the year? (Write its number.)`, i + 1, [`Count the months: ${MONTHS.slice(0, i + 1).map((x, k) => `${k + 1} ${x}`).join(", ")}.`, `${m} is month ${i + 1}.`], { hint: "Start counting at January as 1." });
  if (t === "which") return choice(`Which month is month number ${i + 1}?`, m, otherMonths(m, true), [`Count from January as 1: ${MONTHS.slice(0, i + 1).join(", ")}.`, `Month ${i + 1} is ${m}.`]);
  if (t === "two") { const a = MONTHS[wrap(i + 2, 12)]; return choice(`Which month is 2 months after ${m}?`, a, otherMonths(a, true), [`Count on 2: ${MONTHS[wrap(i + 1, 12)]}, ${a}.`, `So it's ${a}.`]); }
  if (t === "days") {
    const d = MDAYS[i], a = i === 1 ? "28 (29 in a leap year)" : String(d);
    return choice(`How many days are in ${m}?`, a, i === 1 ? ["30", "31", "27"] : d === 31 ? ["30", "28 (29 in a leap year)", "32"] : ["31", "28 (29 in a leap year)", "29"], [
      "Rhyme: \"30 days has September, April, June and November. All the rest have 31, except February, which has 28 (29 in a leap year).\"",
      `${m} has ${a} days.`]);
  }
  if (t === "count31") return num("How many months have 31 days?", 7, ["The months with 31 days are January, March, May, July, August, October and December.", "Tip: make two fists and count months on your knuckles and the dips between them. Knuckle months have 31 days.", "That's 7 months."]);
  if (t === "shortest") return choice("Which is the shortest month of the year?", "February", ["April", "September", "June"], ["February has only 28 days (29 in a leap year).", "Every other month has 30 or 31."]);
  const n = rnd(3, 6), a = MONTHS[wrap(i + n, 12)];
  return choice(`It is ${m} now. What month will it be in ${n} months?`, a, otherMonths(a, true), [`Count on ${n}: ${Array.from({ length: n }, (_, k) => MONTHS[wrap(i + k + 1, 12)]).join(", ")}.`, `It will be ${a}.`]);
}

/* ---------- reading a calendar ---------- */
function calendar(lvl) {
  const mi = rnd(0, 11), month = MONTHS[mi], days = MDAYS[mi], start = rnd(0, 6);
  const dow = (d) => WEEKDAYS[(start + d - 1) % 7];
  const pic = (mark = []) => ({ picture: { type: "calendar", month, start, days, mark } });
  const read = "Find the date in the calendar, then look up to the top of its column to see the day.";
  const t = pick(lvl === 1 ? ["dayOf", "firstX", "howMany", "dayOf"] : lvl === 2 ? ["countX", "weekAfter", "lastDay", "dayOf"] : ["nthX", "until", "weeksBefore", "nextFirst"]);
  if (t === "dayOf") {
    const d = rnd(1, days), a = dow(d);
    return choice(`Look at the calendar. What day of the week is ${month} ${d}?`, a, otherDays(a), [read, `${month} ${d} is in the ${a} column.`], { ...pic([d]), hint: read });
  }
  if (t === "firstX") {
    const w = rnd(0, 6), first = 1 + wrap(w - start, 7);
    return num(`Look at the calendar. What is the date of the first ${WEEKDAYS[w]} in ${month}?`, first, [`Find the ${WEEKDAYS[w]} column.`, `The first number in that column is ${first}.`], { ...pic(), hint: `Look down the ${WEEKDAYS[w].slice(0, 3)} column.`, accept: [ordNum(first), `${month} ${first}`] });
  }
  if (t === "howMany") return num(`Look at the calendar. How many days are in ${month}?`, days, ["Find the last number on the calendar.", `The last date is ${days}, so ${month} has ${days} days.`], pic());
  if (t === "countX") {
    const w = rnd(0, 6), first = 1 + wrap(w - start, 7), list = [];
    for (let d = first; d <= days; d += 7) list.push(d);
    return num(`How many ${WEEKDAYS[w]}s are in this ${month}?`, list.length, [`Look down the ${WEEKDAYS[w]} column and count the dates.`, `They are ${list.join(", ")}.`, `That's ${list.length} ${WEEKDAYS[w]}s.`], { ...pic(), hint: `Count the dates in the ${WEEKDAYS[w].slice(0, 3)} column.` });
  }
  if (t === "weekAfter") {
    const d = rnd(1, days - 7);
    return num(`What date is one week after ${month} ${d}?`, d + 7, ["One week is 7 days.", `On a calendar, one week later is the date right below: ${d} + 7 = ${d + 7}.`], { ...pic([d]), accept: [ordNum(d + 7), `${month} ${d + 7}`] });
  }
  if (t === "lastDay") {
    const a = dow(days);
    return choice(`What day of the week is the last day of ${month}?`, a, otherDays(a), [`The last day is ${month} ${days}.`, `It is in the ${a} column.`], pic([days]));
  }
  if (t === "nthX") {
    const w = rnd(0, 6), k = rnd(1, 3), first = 1 + wrap(w - start, 7), a = first + 7 * k;
    return num(`What is the date of the ${ORD[k]} ${WEEKDAYS[w]} in ${month}?`, a, [`The first ${WEEKDAYS[w]} is the ${ordNum(first)}.`, `Each week adds 7: ${Array.from({ length: k + 1 }, (_, j) => first + 7 * j).join(", ")}.`, `The ${ORD[k]} ${WEEKDAYS[w]} is the ${ordNum(a)}.`], { ...pic(), accept: [ordNum(a), `${month} ${a}`] });
  }
  if (t === "until") {
    const now = rnd(1, days - 5), party = rnd(now + 3, Math.min(days, now + 16)), who = pick(NAMES);
    return num(`Today is ${month} ${now}. ${who}'s party is on ${month} ${party}. How many days until the party?`, party - now, [`Subtract the dates: ${party} − ${now}.`, `That's ${party - now} days. You can also count the boxes from ${now} to ${party}.`], pic([now, party]));
  }
  if (t === "weeksBefore") {
    const d = rnd(15, days);
    return num(`What date is 2 weeks before ${month} ${d}?`, d - 14, ["2 weeks is 14 days.", `${d} − 14 = ${d - 14}. On the calendar, go up two rows.`], { ...pic([d]), accept: [ordNum(d - 14), `${month} ${d - 14}`] });
  }
  const a = WEEKDAYS[(start + days) % 7], next = MONTHS[(mi + 1) % 12];
  return choice(`${month} ends on a ${dow(days)}. What day of the week will ${next} 1 be?`, a, otherDays(a), [`The last day of ${month} is the ${ordNum(days)}, a ${dow(days)}.`, `The next day is ${next} 1, so it's the day after ${dow(days)}: ${a}.`], pic([days]));
}

/* ---------- seasons ---------- */
const SEASONS = ["spring", "summer", "fall", "winter"];
const SEASON_OF = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "fall", "fall", "fall", "winter"];
function seasons(lvl) {
  const t = pick(lvl === 1 ? ["count", "coldest", "hottest", "leaves", "flowers"] : lvl === 2 ? ["after", "monthSeason", "leaves", "snow", "before"] : ["monthSeason", "months", "per", "after", "autumn"]);
  const s = pick(SEASONS), i = SEASONS.indexOf(s), cap = (x) => x[0].toUpperCase() + x.slice(1);
  const other = (a) => SEASONS.filter((x) => x !== a).map(cap);
  if (t === "count") return num("How many seasons are in a year?", 4, ["The four seasons are spring, summer, fall and winter.", "So there are 4."]);
  if (t === "coldest") return choice("Which season is usually the coldest?", "Winter", other("winter"), ["Winter has the shortest days and the coldest weather.", "It's the season for coats, and snow in some places."]);
  if (t === "hottest") return choice("Which season is usually the hottest?", "Summer", other("summer"), ["Summer has the longest, sunniest days.", "It's usually the hottest season."]);
  if (t === "leaves") return choice("In which season do many trees' leaves change color and fall off?", "Fall", other("fall"), ["That's why it is called fall!", "Another name for fall is autumn."]);
  if (t === "flowers") return choice("In which season do many flowers start to bloom?", "Spring", other("spring"), ["After winter, the weather warms up.", "Flowers bloom and baby animals are born in spring."]);
  if (t === "snow") return choice("In which season is it most likely to snow?", "Winter", other("winter"), ["Snow needs very cold weather.", "Winter is the coldest season."]);
  if (t === "after") { const a = SEASONS[(i + 1) % 4]; return choice(`Which season comes after ${s}?`, cap(a), other(a), ["The seasons go in a circle: spring, summer, fall, winter, then spring again.", `After ${s} comes ${a}.`]); }
  if (t === "before") { const a = SEASONS[(i + 3) % 4]; return choice(`Which season comes before ${s}?`, cap(a), other(a), ["The seasons go in a circle: spring, summer, fall, winter, then spring again.", `Before ${s} comes ${a}.`]); }
  if (t === "autumn") return choice("What is another name for fall?", "Autumn", ["Spring", "Winter", "Summer"], ["Fall is also called autumn.", "Both names mean the season between summer and winter."]);
  if (t === "per") return num("Each season lasts about how many months?", 3, ["There are 12 months and 4 seasons.", "12 ÷ 4 = 3 months for each season."]);
  if (t === "months") return choice("Which three months are summer in the United States?", "June, July and August", ["December, January and February", "March, April and May", "September, October and November"], ["In the United States, summer is June, July and August.", "Spring is March to May, fall is September to November and winter is December to February."]);
  const m = rnd(0, 11), a = SEASON_OF[m];
  return choice(`In the United States, which season is it in ${MONTHS[m]}?`, cap(a), other(a), ["Winter: December, January, February. Spring: March, April, May.", "Summer: June, July, August. Fall: September, October, November.", `So ${MONTHS[m]} is in ${a}.`]);
}

/* ---------- time facts ---------- */
function timefacts(lvl) {
  const t = pick(lvl === 1 ? ["minHour", "hrDay", "dayWeek", "longer", "monthYear"] : lvl === 2 ? ["secMin", "dayYear", "weekYear", "half", "quarter", "about"] : ["hrToMin", "minToSec", "weekToDay", "leap", "ampm", "decade"]);
  if (t === "minHour") return num("How many minutes are in one hour?", 60, ["The minute hand goes all the way around the clock in one hour.", "That's 60 minutes."]);
  if (t === "hrDay") return num("How many hours are in one whole day (day and night)?", 24, ["A day has 12 hours of a.m. and 12 hours of p.m.", "12 + 12 = 24 hours."]);
  if (t === "dayWeek") return num("How many days are in one week?", 7, ["Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.", "That's 7 days."]);
  if (t === "monthYear") return num("How many months are in one year?", 12, ["January to December.", "That's 12 months."]);
  if (t === "longer") return pick([
    () => choice("Which is longer?", "1 hour", ["1 minute", "1 second"], ["1 hour = 60 minutes.", "So an hour is much longer than a minute or a second."]),
    () => choice("Which is longer?", "1 week", ["1 day", "1 hour"], ["1 week = 7 days.", "So a week is the longest."]),
    () => choice("Which is shortest?", "1 second", ["1 minute", "1 hour"], ["A second is about as long as it takes to say \"one Mississippi\".", "60 seconds make a minute."]),
  ])();
  if (t === "secMin") return num("How many seconds are in one minute?", 60, ["The second hand goes all the way around the clock in one minute.", "That's 60 seconds."]);
  if (t === "dayYear") return num("How many days are in one year (not a leap year)?", 365, ["A year has 365 days.", "A leap year, every 4 years, has 366."]);
  if (t === "weekYear") return num("About how many weeks are in one year?", 52, ["365 days ÷ 7 days in a week is about 52.", "So a year has about 52 weeks."]);
  if (t === "half") return num("How many minutes are in half an hour?", 30, ["One hour is 60 minutes.", "Half of 60 is 30."]);
  if (t === "quarter") return num("How many minutes are in a quarter of an hour?", 15, ["One hour is 60 minutes.", "A quarter is one of 4 equal parts: 60 ÷ 4 = 15."]);
  if (t === "about") return pick([
    () => choice("Which takes about 1 minute?", "Washing your hands", ["Sleeping at night", "A school day", "Blinking once"], ["Washing your hands well takes about a minute.", "Sleeping takes hours, a blink takes less than a second."]),
    () => choice("Which takes about 1 hour?", "Watching a movie", ["Tying your shoes", "A sneeze", "A whole school year"], ["A movie is about 1 or 2 hours long.", "Tying shoes takes seconds."]),
    () => choice("Which takes about 1 second?", "Clapping your hands once", ["Eating lunch", "Reading a book", "A soccer game"], ["One clap is very quick.", "That's about 1 second."]),
  ])();
  if (t === "hrToMin") { const h = rnd(2, 5); return num(`How many minutes are in ${h} hours?`, h * 60, ["1 hour = 60 minutes.", `${h} × 60 = ${h * 60} minutes.`]); }
  if (t === "minToSec") { const m = rnd(2, 5); return num(`How many seconds are in ${m} minutes?`, m * 60, ["1 minute = 60 seconds.", `${m} × 60 = ${m * 60} seconds.`]); }
  if (t === "weekToDay") { const w = rnd(2, 6); return num(`How many days are in ${w} weeks?`, w * 7, ["1 week = 7 days.", `${w} × 7 = ${w * 7} days.`]); }
  if (t === "leap") return num("A leap year comes every 4 years. How many days does a leap year have?", 366, ["A leap year adds one extra day, February 29.", "365 + 1 = 366 days."]);
  if (t === "decade") return rnd(0, 1)
    ? num("How many years are in a decade?", 10, ["\"Dec\" means ten.", "A decade is 10 years."])
    : num("How many years are in a century?", 100, ["\"Cent\" means one hundred, like 100 cents in a dollar.", "A century is 100 years."]);
  return pick([
    () => choice("You eat breakfast at 7:00 in the morning. Is that a.m. or p.m.?", "a.m.", ["p.m."], ["a.m. is from midnight until noon.", "Morning times are a.m."], { max: 2 }),
    () => choice("You eat dinner at 6:00 in the evening. Is that a.m. or p.m.?", "p.m.", ["a.m."], ["p.m. is from noon until midnight.", "Evening times are p.m."], { max: 2 }),
    () => choice("What is 12:00 in the middle of the day called?", "Noon", ["Midnight", "Morning", "Evening"], ["12:00 in the day is noon. 12:00 at night is midnight.", "So the answer is noon."]),
  ])();
}

/* ---------- coins and money ---------- */
const COIN = { penny: 1, nickel: 5, dime: 10, quarter: 25 };
function coins(lvl) {
  const names = Object.keys(COIN), c = pick(names);
  const t = pick(lvl === 1 ? ["value", "value", "most", "dollarCents"] : lvl === 2 ? ["howManyPennies", "nickelsIn", "quartersDollar", "dimesDollar", "most"] : ["mix", "mix", "quartersIn", "fewest"]);
  if (t === "value") return choice(`How much is one ${c} worth?`, `${COIN[c]}¢`, names.filter((x) => x !== c).map((x) => `${COIN[x]}¢`), ["Penny 1¢, nickel 5¢, dime 10¢, quarter 25¢.", `A ${c} is worth ${COIN[c]}¢.`], { picture: { type: "coins", [c]: 1 } });
  if (t === "most") return choice("Which coin is worth the most?", "Quarter", ["Dime", "Nickel", "Penny"], ["A quarter is worth 25¢, the most of these.", "Careful: a dime is smaller than a nickel but is worth more (10¢ vs 5¢)."]);
  if (t === "dollarCents") return num("How many cents make one dollar?", 100, ["One dollar = 100 cents.", "$1.00 is the same as 100¢."]);
  if (t === "howManyPennies") { const k = pick(["nickel", "dime", "quarter"]); return num(`How many pennies make one ${k}?`, COIN[k], ["A penny is 1¢.", `A ${k} is ${COIN[k]}¢, so ${COIN[k]} pennies.`]); }
  if (t === "nickelsIn") { const k = pick(["dime", "quarter"]); return num(`How many nickels make one ${k}?`, COIN[k] / 5, ["A nickel is 5¢.", `Count by 5s to ${COIN[k]}: ${Array.from({ length: COIN[k] / 5 }, (_, j) => 5 * (j + 1)).join(", ")}.`, `That's ${COIN[k] / 5} nickels.`]); }
  if (t === "quartersDollar") return num("How many quarters make one dollar?", 4, ["A quarter is 25¢.", "25, 50, 75, 100. That's 4 quarters."]);
  if (t === "dimesDollar") return num("How many dimes make one dollar?", 10, ["A dime is 10¢.", "Count by 10s to 100: that's 10 dimes."]);
  if (t === "quartersIn") { const d = rnd(2, 4); return num(`How many quarters make $${d}.00?`, d * 4, ["4 quarters make $1.00.", `${d} × 4 = ${d * 4} quarters.`]); }
  if (t === "fewest") return choice("Which uses the fewest coins to make 30¢?", "1 quarter and 1 nickel", ["3 dimes", "6 nickels", "30 pennies"], ["Start with the biggest coin that fits: a quarter (25¢).", "25¢ + 5¢ = 30¢ with just 2 coins."]);
  const set = { quarter: rnd(0, 3), dime: rnd(0, 3), nickel: rnd(0, 2), penny: rnd(0, 4) };
  if (!set.quarter && !set.dime) set.dime = 1;
  const total = Object.entries(set).reduce((a, [k, n]) => a + COIN[k] * n, 0);
  const parts = Object.entries(set).filter(([, n]) => n).map(([k, n]) => `${n} ${k === "penny" && n > 1 ? "pennies" : k + (n > 1 ? "s" : "")} = ${COIN[k] * n}¢`);
  return num("How many cents are these coins worth?", total, ["Count the biggest coins first.", ...parts, `Total: ${total}¢.`], { picture: { type: "coins", ...set }, accept: [`${total}¢`, `${total} cents`] });
}

/* ---------- measurement facts ---------- */
function measure(lvl) {
  const t = pick(lvl === 1 ? ["tool", "tool", "longer", "heavier"] : lvl === 2 ? ["inFt", "ftYd", "cmM", "ozLb", "freeze"] : ["ftToIn", "ydToFt", "kmM", "kgG", "qtGal", "boil"]);
  if (t === "tool") return pick([
    () => choice("Which tool measures how long something is?", "Ruler", ["Thermometer", "Scale", "Clock"], ["A ruler measures length.", "It shows inches or centimeters."]),
    () => choice("Which tool tells how hot or cold it is?", "Thermometer", ["Ruler", "Scale", "Measuring cup"], ["A thermometer measures temperature.", "We read it in degrees."]),
    () => choice("Which tool measures how heavy something is?", "Scale", ["Ruler", "Thermometer", "Calendar"], ["A scale measures weight.", "We read it in pounds or kilograms."]),
    () => choice("Which tool shows what day it is?", "Calendar", ["Clock", "Ruler", "Scale"], ["A calendar shows the days, weeks and months.", "A clock shows the time of day."]),
  ])();
  if (t === "longer") return choice("Which is longer?", "1 foot", ["1 inch"], ["1 foot = 12 inches.", "So a foot is longer."], { max: 2 });
  if (t === "heavier") return choice("Which is heavier?", "A watermelon", ["A grape", "A feather", "A paper clip"], ["A watermelon weighs several pounds.", "The others weigh almost nothing."]);
  if (t === "inFt") return num("How many inches are in one foot?", 12, ["A standard ruler is 1 foot long.", "It has 12 inches."]);
  if (t === "ftYd") return num("How many feet are in one yard?", 3, ["A yard is about as long as a big step for a grown-up.", "1 yard = 3 feet."]);
  if (t === "cmM") return num("How many centimeters are in one meter?", 100, ["\"Centi\" means one hundredth.", "1 meter = 100 centimeters."]);
  if (t === "ozLb") return num("How many ounces are in one pound?", 16, ["Ounces measure light things.", "1 pound = 16 ounces."]);
  if (t === "freeze") return num("Water freezes into ice at how many degrees Fahrenheit?", 32, ["Water turns to ice at 32°F.", "That's 0°C on the Celsius scale."], { accept: ["32°F", "32 degrees"] });
  if (t === "boil") return num("Water boils at how many degrees Fahrenheit?", 212, ["Water boils at 212°F.", "That's 100°C on the Celsius scale."], { accept: ["212°F", "212 degrees"] });
  if (t === "ftToIn") { const f = rnd(2, 5); return num(`How many inches are in ${f} feet?`, f * 12, ["1 foot = 12 inches.", `${f} × 12 = ${f * 12} inches.`]); }
  if (t === "ydToFt") { const y = rnd(2, 6); return num(`How many feet are in ${y} yards?`, y * 3, ["1 yard = 3 feet.", `${y} × 3 = ${y * 3} feet.`]); }
  if (t === "kmM") return num("How many meters are in one kilometer?", 1000, ["\"Kilo\" means one thousand.", "1 kilometer = 1,000 meters."], { accept: ["1,000"] });
  if (t === "kgG") return num("How many grams are in one kilogram?", 1000, ["\"Kilo\" means one thousand.", "1 kilogram = 1,000 grams."], { accept: ["1,000"] });
  return num("How many quarts are in one gallon?", 4, ["A gallon of milk holds 4 quarts.", "Each quart is 2 pints, and each pint is 2 cups."]);
}

/* ---------- fact banks: [level, question, answer, wrong answers, why] ---------- */
const bank = (rows) => (lvl) => {
  const pool = rows.filter((r) => r[0] <= lvl), r = pick(pool.filter((x) => x[0] >= lvl - 1));
  const [, q, a, ws, why] = r;
  return typeof a === "number" ? num(q, a, why) : choice(q, a, ws, why);
};

const space = bank([
  [1, "What do we call the star at the center of our solar system?", "The Sun", ["The Moon", "Mars", "The North Star"], ["The Sun is a star, a giant ball of hot gas.", "It gives Earth light and heat."]],
  [1, "Which planet do we live on?", "Earth", ["Mars", "Jupiter", "Venus"], ["We live on planet Earth.", "It's the third planet from the Sun."]],
  [1, "What goes around the Earth and lights up the night sky?", "The Moon", ["The Sun", "A cloud", "Saturn"], ["The Moon goes around (orbits) the Earth.", "It shines because sunlight bounces off it."]],
  [1, "How many continents are there?", 7, [], ["The 7 continents are Africa, Antarctica, Asia, Australia, Europe, North America and South America.", "So there are 7."]],
  [1, "What shape is the Earth?", "Round like a ball", ["Flat like a plate", "Square like a box", "Long like a pencil"], ["Earth is a sphere, round like a ball.", "Photos from space show it."]],
  [1, "Which ocean is the biggest?", "Pacific Ocean", ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], ["The Pacific Ocean is the largest and deepest ocean.", "It's bigger than all the land on Earth put together."]],
  [2, "Which continent is the United States on?", "North America", ["South America", "Europe", "Asia"], ["The United States is in North America.", "Canada and Mexico are there too."]],
  [2, "How many oceans are there on Earth?", 5, [], ["The 5 oceans are the Pacific, Atlantic, Indian, Southern and Arctic.", "So there are 5."]],
  [2, "Which planet is closest to the Sun?", "Mercury", ["Earth", "Venus", "Neptune"], ["Mercury is the closest planet to the Sun.", "Order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."]],
  [2, "Which is the biggest planet?", "Jupiter", ["Earth", "Mars", "Mercury"], ["Jupiter is the biggest planet.", "More than 1,000 Earths could fit inside it."]],
  [2, "Which planet is called the Red Planet?", "Mars", ["Venus", "Jupiter", "Neptune"], ["Mars looks red because of rusty dust.", "That's why it's called the Red Planet."]],
  [2, "Which continent is the coldest?", "Antarctica", ["Africa", "Australia", "South America"], ["Antarctica is at the South Pole.", "It is covered in thick ice all year."]],
  [2, "In which direction does the Sun rise in the morning?", "East", ["West", "North", "South"], ["The Sun rises in the east and sets in the west.", "Tip: \"East is where the day begins.\""]],
  [2, "What makes day and night?", "The Earth spinning", ["The Sun turning off", "Clouds covering the Sun", "The Moon blocking the Sun"], ["The Earth spins around once every day.", "The side facing the Sun has day; the other side has night."]],
  [3, "How long does it take the Earth to go all the way around the Sun?", "One year", ["One day", "One month", "One week"], ["Earth takes about 365 days to orbit the Sun.", "That's one year."]],
  [3, "How many planets are in our solar system?", 8, [], ["Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.", "That's 8 planets. Tip: \"My Very Educated Mother Just Served Us Nachos.\""]],
  [3, "Which planet has big, bright rings?", "Saturn", ["Mars", "Mercury", "Earth"], ["Saturn's rings are made of ice and rock.", "They are the brightest rings in the solar system."]],
  [3, "Which is the largest continent?", "Asia", ["Africa", "Europe", "Australia"], ["Asia is the largest continent.", "It has the most people too."]],
  [3, "What is the capital city of the United States?", "Washington, D.C.", ["New York City", "Los Angeles", "Austin"], ["The capital is Washington, D.C.", "The President works there in the White House."]],
  [3, "What is the capital city of Texas?", "Austin", ["Dallas", "Houston", "San Antonio"], ["Austin is the capital of Texas.", "The Texas State Capitol building is there."]],
  [3, "Which ocean is between the United States and Europe?", "Atlantic Ocean", ["Pacific Ocean", "Indian Ocean", "Arctic Ocean"], ["The Atlantic Ocean is east of the United States.", "Europe is on the other side."]],
  [3, "What is the name of our galaxy?", "The Milky Way", ["Andromeda", "The Big Dipper", "The Solar System"], ["Our solar system is in the Milky Way galaxy.", "It has billions of stars."]],
]);

const nature = bank([
  [1, "Which animal is a mammal?", "Dog", ["Snake", "Frog", "Goldfish"], ["Mammals have hair or fur and feed their babies milk.", "A dog is a mammal."]],
  [1, "What do plants need to grow?", "Sunlight, water and air", ["Candy and toys", "Only darkness", "Rocks and sand only"], ["Plants need sunlight, water, air and good soil.", "They use sunlight to make their own food."]],
  [1, "What is a baby frog called?", "Tadpole", ["Kitten", "Cub", "Chick"], ["A frog starts as an egg, then a tadpole that swims with a tail.", "Later it grows legs and becomes a frog."]],
  [1, "What is a baby cat called?", "Kitten", ["Puppy", "Calf", "Foal"], ["A baby cat is a kitten.", "A baby dog is a puppy."]],
  [1, "Which animal lives in the ocean?", "Dolphin", ["Camel", "Squirrel", "Owl"], ["Dolphins live in the ocean.", "They are mammals that breathe air through a blowhole."]],
  [1, "Which animal has feathers?", "Bird", ["Cat", "Fish", "Turtle"], ["Only birds have feathers.", "Feathers keep them warm and help them fly."]],
  [2, "What is frozen water called?", "Ice", ["Steam", "Rain", "Sand"], ["When water gets very cold, it freezes into ice.", "That happens at 32°F."]],
  [2, "Which part of a plant takes in water from the soil?", "Roots", ["Flowers", "Leaves", "Seeds"], ["Roots grow under the ground.", "They soak up water and hold the plant in place."]],
  [2, "What does a caterpillar turn into?", "A butterfly", ["A bee", "A spider", "A worm"], ["A caterpillar makes a chrysalis.", "It comes out as a butterfly. This change is called metamorphosis."]],
  [2, "What do bees make?", "Honey", ["Milk", "Silk", "Wool"], ["Bees make honey from flower nectar.", "They also help flowers make seeds."]],
  [2, "An animal that eats only plants is called a…", "Herbivore", ["Carnivore", "Omnivore", "Predator"], ["Herbivores eat only plants, like cows and rabbits.", "\"Herb\" is a kind of plant."]],
  [2, "When water is heated and turns into a gas, it is called…", "Water vapor", ["Ice", "Snow", "Mud"], ["Heat turns liquid water into a gas called water vapor.", "This is called evaporation."]],
  [2, "How many legs does an insect have?", 6, [], ["All insects have 6 legs.", "Spiders have 8 legs, so they are not insects."]],
  [3, "What are the three states of matter?", "Solid, liquid and gas", ["Hot, warm and cold", "Rock, water and air only", "Big, medium and small"], ["Matter can be a solid (ice), a liquid (water) or a gas (water vapor).", "Heating or cooling changes one state into another."]],
  [3, "Which part of a plant makes food using sunlight?", "Leaves", ["Roots", "Stem", "Seeds"], ["Leaves use sunlight, water and air to make food.", "This is called photosynthesis."]],
  [3, "An animal that eats only meat is called a…", "Carnivore", ["Herbivore", "Omnivore", "Producer"], ["Carnivores eat other animals, like lions and sharks.", "Herbivores eat plants; omnivores eat both."]],
  [3, "An animal that eats both plants and meat is called an…", "Omnivore", ["Herbivore", "Carnivore", "Insect"], ["Omnivores eat plants and animals.", "Bears, raccoons and people are omnivores."]],
  [3, "What gas do people and animals need to breathe in to live?", "Oxygen", ["Carbon dioxide", "Helium", "Smoke"], ["We breathe in oxygen and breathe out carbon dioxide.", "Plants do the opposite and give off oxygen."]],
  [3, "Animals with a backbone are called…", "Vertebrates", ["Invertebrates", "Insects", "Plants"], ["Vertebrates have a backbone: fish, frogs, snakes, birds and mammals.", "Animals without one, like worms and insects, are invertebrates."]],
  [3, "How many legs does a spider have?", 8, [], ["Spiders have 8 legs.", "They are arachnids, not insects (insects have 6)."]],
]);

// Younger kids stay on the easier facts; older kids skip the warm-ups.
const levelFor = (lvl, grade) => (grade === "K" || grade === "1" ? Math.min(lvl, 2) : Number(grade) >= 4 ? Math.max(lvl, 2) : lvl);

const GEN = { days, months, calendar, seasons, timefacts, coins, measure, space, nature };
export const gk = (name, lvl, grade) => (GEN[name] ? GEN[name](levelFor(lvl || 1, grade)) : null);
