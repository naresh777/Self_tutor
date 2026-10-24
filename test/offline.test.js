import { test } from "node:test";
import assert from "node:assert/strict";
import { year } from "../src/course.js";
import { offlineSheet, offlineLesson } from "../src/offline/index.js";
import { renderVisual } from "../src/visuals.js";
import { isCorrect } from "../src/check.js";

const topics = () => ["math", "english"].flatMap((s) => ["2", "3"].flatMap((g) => year(s, g).map((t) => [g, t])));

test("every Grade 2 and 3 topic has a built-in problem type", () => {
  for (const [g, t] of topics()) assert.ok(t.op, `Grade ${g} week ${t.week}: ${t.name}`);
});

test("every Grade 2 and 3 topic has a built-in lesson", () => {
  for (const [g, t] of topics()) {
    const L = offlineLesson(t);
    assert.ok(L, `no lesson for Grade ${g}: ${t.name}`);
    assert.ok(L.title && L.intro && L.points.length && L.example.problem && L.example.steps.length && L.tip, t.name);
    if (L.example.visual) assert.ok(renderVisual(L.example.visual), `lesson picture for ${t.name}`);
  }
});

test("built-in sheets give valid, solvable problems at every level", () => {
  for (const [g, t] of topics()) for (const level of [1, 2, 3]) {
    const ps = offlineSheet([{ topic: t, count: 5, level }], g);
    assert.equal(ps.length, 5, `${t.name} level ${level}`);
    for (const p of ps) {
      const j = JSON.stringify(p);
      assert.ok(p.question && p.answer != null && Array.isArray(p.steps), j);
      assert.doesNotMatch(j, /undefined|NaN|\[object/, j);
      if (p.type === "choice") {
        assert.ok(p.choices.includes(p.answer) && new Set(p.choices).size === p.choices.length, j);
      } else if (p.type !== "write") {
        assert.ok(isCorrect(String(p.answer), p), `own answer marked wrong: ${j}`);
      }
      for (const k of ["picture", "visual"]) if (p[k]) assert.ok(renderVisual(p[k]), `${k} in ${j}`);
    }
  }
});
