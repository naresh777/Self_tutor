import { test } from "node:test";
import assert from "node:assert/strict";
import { GRADES, SUBJECTS, WEEKS, year, units, topic } from "../src/course.js";
import { dayType, sheetPlan, advance, pace } from "../src/plan.js";

const peek = () => ({ recent: [], attempts: 0, correct: 0 });

test("every grade has a full 36-week year in each subject", () => {
  for (const s of Object.keys(SUBJECTS))
    for (const g of GRADES) {
      const y = year(s, g);
      assert.equal(y.length, WEEKS, `${s} ${g}`);
      assert.equal(new Set(y.map((t) => t.id)).size, WEEKS);
      assert.equal(units(s, g).length, 9);
      y.forEach((t, i) => { assert.equal(t.week, i + 1); assert.ok(t.name && t.unitTitle); assert.equal(topic(t.id), t); });
    }
});

test("grade 2 ends with grade 3 preview weeks", () => {
  const last = year("math", "2").slice(32);
  assert.ok(last.every((t) => t.bridge && t.grade === "3" && t.unit === 9));
  assert.equal(last[0].name, "Equal groups");
});

test("weekly rhythm: lesson, practice, Friday quiz, monthly test every 4th week", () => {
  assert.deepEqual([0, 1, 2, 3, 4].map((d) => dayType(3, d)), ["learn", "practice", "practice", "practice", "quiz"]);
  assert.equal(dayType(4, 4), "test");
  assert.equal(dayType(36, 4), "test");
  assert.deepEqual(advance({ week: 3, day: 4 }), { week: 4, day: 0 });
});

test("sheets mix in review, tests cover the whole unit", () => {
  const practice = sheetPlan("math", "2", 6, 2, peek);
  assert.equal(practice.items[0].topic.week, 6);
  assert.ok(practice.items.some((it) => it.review && it.topic.week < 6));
  const t = sheetPlan("english", "2", 8, 4, peek);
  assert.equal(t.type, "test");
  assert.deepEqual(t.items.filter((it) => !it.review).map((it) => it.topic.week), [5, 6, 7, 8]);
  assert.equal(t.items.reduce((a, it) => a + it.count, 0), 15);
  assert.equal(sheetPlan("math", "2", 1, 0, peek).items.length, 1); // nothing earlier to review yet
});

test("pace compares school days with course days", () => {
  const mon = new Date(2026, 9, 5); // a Monday
  const fri = new Date(2026, 9, 16);
  assert.equal(pace({ start: "2026-10-05", pos: { week: 2, day: 4 } }, fri).k, "on");
  assert.equal(pace({ start: "2026-10-05", pos: { week: 1, day: 0 } }, fri).k, "behind");
  assert.equal(pace({ start: "2026-10-05", pos: { week: 2, day: 0 } }, mon).k, "ahead");
});
