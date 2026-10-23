import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect, localOne } from "../src/check.js";

const P = (answer, accept = []) => ({ answer, accept });

test("accepts equivalent numeric answers", () => {
  for (const [given, ans] of [["3/4", "0.75"], ["1 1/2", "3/2"], ["$4.50", "4.5"], ["50%", "0.5"], ["50%", "50"], ["-7", "−7"], ["12 cm", "12"], ["x = 5", "5"]])
    assert.equal(isCorrect(given, P(ans)), true, `${given} vs ${ans}`);
});

test("accepts text answers ignoring case and punctuation", () => {
  assert.equal(isCorrect("Triangle", P("triangle")), true);
  assert.equal(isCorrect("7:30", P("7:30")), true);
  assert.equal(isCorrect("they're", P("They're.")), true);
  assert.equal(isCorrect("unhappy", P("happy", ["glad"])), false);
});

test("rejects wrong or empty answers", () => {
  assert.equal(isCorrect("13", P("12")), false);
  assert.equal(isCorrect("", P("1")), false);
});

test("offline generators give correct answers", () => {
  for (const op of ["add10", "sub10", "add20", "sub20", "add100", "mulfacts", "divfacts", "multimul", "longdiv", "int"])
    for (let lvl = 1; lvl <= 3; lvl++)
      for (let i = 0; i < 100; i++) {
        const p = localOne(op, lvl);
        const expr = p.question.replace("= ?", "").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
        assert.equal(String(Function(`return ${expr}`)()), p.answer, p.question);
      }
});
