import test from "node:test";
import assert from "node:assert/strict";
import { renderVisual } from "../src/visuals.js";
import { localOne } from "../src/check.js";

const specs = [
  { type: "numberline", start: 30, end: 60, jumps: [{ from: 38, to: 48 }, { from: 48, to: 53 }] },
  { type: "blocks", numbers: [46, 27], op: "+" },
  { type: "blocks", numbers: [52, 17], op: "-" },
  { type: "tenframe", filled: 8, added: 5 },
  { type: "strip", total: "?", parts: [35, 18] },
  { type: "array", rows: 3, cols: 4 },
  { type: "groups", groups: 3, each: 4 },
  { type: "clock", hour: 3, minute: 45 },
  { type: "coins", quarters: 2, dimes: 1, pennies: 3 },
  { type: "fraction", parts: 4, shaded: 3, shape: "circle" },
  { type: "graph", kind: "bar", labels: ["Cats", "Dogs"], values: [4, 6] },
  { type: "placevalue", number: 482 },
];

test("every picture type draws an SVG", () => {
  for (const v of specs) assert.match(renderVisual(v), /^<figure class="vizbox"><svg class="viz"/, v.type);
});

test("bad specs draw nothing and text is escaped", () => {
  assert.equal(renderVisual(null), "");
  assert.equal(renderVisual({ type: "nope" }), "");
  assert.equal(renderVisual({ type: "numberline", start: 10, end: 5 }), "");
  assert.ok(!renderVisual({ type: "array", rows: 2, cols: 2, caption: "<script>" }).includes("<script>"));
});

test("subtraction blocks show the trade", () => {
  assert.match(renderVisual({ type: "blocks", numbers: [52, 17], op: "-" }), /Trade 1 ten for 10 ones/);
});

test("built-in add and subtract problems come with a picture", () => {
  for (const op of ["add20", "sub20", "add100", "mulfacts", "divfacts"]) {
    const p = localOne(op, 2);
    assert.ok(renderVisual(p.visual), op);
  }
});
