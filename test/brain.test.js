import { test } from "node:test";
import assert from "node:assert/strict";
import { dayPlan, startLevel, step, roundMove, params, rhythmOk, SHORT_GAP, LONG_GAP, recipe, recipeText, recallScore, parseSteps, weekly, ageForGrade, GAMES, PANTRY, ACTIONS } from "../src/brain/logic.js";
import { STORIES } from "../src/brain/stories.js";

test("schedule: three games Monday to Thursday, choice on Friday, rest at the weekend", () => {
  const on = (y, m, d) => dayPlan(new Date(y, m - 1, d));
  assert.deepEqual(on(2026, 11, 16).games, ["stars", "path", "chef"]); // Monday
  assert.equal(on(2026, 11, 17).offscreen, "says"); // Tuesday
  assert.equal(on(2026, 11, 20).choice, true); // Friday
  assert.equal(on(2026, 11, 21).rest, true); // Saturday
  assert.equal(on(2026, 11, 22).rest, true); // Sunday
  const week = [16, 17, 18, 19].flatMap((d) => on(2026, 11, d).games);
  assert.equal(week.filter((g) => g === "chef").length, 2);
  assert.equal(week.filter((g) => g === "story").length, 2);
  for (const g of week) assert.ok(GAMES[g], g);
});

test("starting level comes from age and difficulty; an 8-year-old on Medium starts at level 4", () => {
  assert.equal(ageForGrade("2"), 8);
  assert.equal(ageForGrade("K"), 5);
  assert.equal(startLevel({ age: 8, diff: "medium" }), 4);
  assert.equal(startLevel({ age: 8, diff: "easy" }), 2);
  assert.equal(startLevel({ age: 8, diff: "hard" }), 6);
  assert.equal(startLevel({ age: 5, diff: "easy" }), 1);
  assert.equal(startLevel({ age: 12, diff: "hard" }), 10);
  assert.equal(params.path(4).len, 4);
  assert.equal(params.chef(4).steps, 3);
  assert.equal(params.story(4).band, 2);
});

test("staircase: 3 wins step up, 2 misses step down, fixed when auto is off", () => {
  let s = { level: 4 };
  s = step(s, true); s = step(s, true); assert.equal(s.level, 4);
  s = step(s, true); assert.equal(s.level, 5);
  s = step(s, false); s = step(s, false); assert.equal(s.level, 4);
  s = step(s, true); s = step(s, false); s = step(s, true); assert.equal(s.level, 4);
  let f = { level: 4 };
  for (let i = 0; i < 6; i++) f = step(f, true, false);
  assert.equal(f.level, 4);
  assert.equal(step({ level: 10, wins: 2 }, true).level, 10);
  assert.equal(step({ level: 1, misses: 1 }, false).level, 1);
  assert.equal(roundMove(true, false, 4), 5);
  assert.equal(roundMove(false, true, 4), 3);
  assert.equal(roundMove(true, false, 4, false), 4);
});

test("every level gives playable settings", () => {
  for (let l = 1; l <= 10; l++) {
    const p = params.path(l), d = params.digits(l);
    assert.ok(p.len >= 2 && p.len <= 7 && d.len >= 2 && d.len <= 7, `path ${l}`);
    assert.ok(params.pairs(l).pairs <= 12);
    assert.ok(params.rhythm(l).len <= 8);
    assert.ok(params.picnic(l).chain <= 10);
    assert.ok(params.stars(l).every >= 420 && params.stars(l).fall >= 1.5);
  }
});

test("rhythm check needs the same drums and, with long gaps, the same timing", () => {
  const pat = [{ drum: 0, long: false }, { drum: 1, long: true }, { drum: 0, long: false }];
  const at = (gaps, drums) => { let t = 0; return drums.map((d, i) => ({ drum: d, t: (t += i ? gaps[i - 1] : 0) })); };
  assert.equal(rhythmOk(pat, at([SHORT_GAP, LONG_GAP], [0, 1, 0])), true);
  assert.equal(rhythmOk(pat, at([SHORT_GAP, SHORT_GAP], [0, 1, 0])), false);
  assert.equal(rhythmOk(pat, at([SHORT_GAP, LONG_GAP], [0, 0, 0])), false);
  assert.equal(rhythmOk(pat, at([SHORT_GAP], [0, 1])), false);
  assert.equal(rhythmOk([{ drum: 0 }, { drum: 0 }], at([900], [0, 0])), true);
});

test("recipes: the taps match the spoken steps", () => {
  const ids = new Set([...PANTRY, ...ACTIONS].map((x) => x.id));
  for (let l = 1; l <= 10; l++)
    for (let i = 0; i < 50; i++) {
      const r = recipe(l);
      assert.equal(r.steps.length, params.chef(l).steps);
      assert.ok(r.taps.length >= r.steps.length && r.taps.every((t) => ids.has(t)));
      assert.match(recipeText(r), /^First, .*Last, /);
      if (l >= 8) assert.match(r.steps.at(-1), /^if the bowl is red/);
    }
});

test("picnic recall score and routine parsing", () => {
  assert.equal(recallScore(["🍎", "🍌", "🧀"], ["🍎", "🍌"]), 2);
  assert.equal(recallScore(["🍎", "🍌", "🧀"], ["🍎", "🍩", "🌽"]), 0);
  assert.deepEqual(parseSteps(" 🪥 Brush teeth\n\n👕 Get dressed \n"), ["🪥 Brush teeth", "👕 Get dressed"]);
});

test("weekly averages", () => {
  const now = new Date(2026, 10, 19);
  assert.deepEqual(weekly([{ d: "2026-11-18", s: 4 }, { d: "2026-11-17", s: 5 }, { d: "2026-11-05", s: 2 }], 4, now), [null, 2, null, 4.5]);
});

test("stories: six per level band, three questions each with a valid answer", () => {
  assert.equal(new Set(STORIES.map((s) => s.id)).size, STORIES.length);
  for (const band of [1, 2, 3]) assert.equal(STORIES.filter((s) => s.band === band).length, 6);
  for (const s of STORIES) {
    assert.ok(s.a && s.b && s.title && s.predict[1].length === 3, s.id);
    assert.equal(s.qs.length, 3, s.id);
    for (const [q, ch, a] of s.qs) assert.ok(q && ch.length === 3 && a >= 0 && a < 3, `${s.id}: ${q}`);
  }
});
