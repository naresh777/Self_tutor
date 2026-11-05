// Built-in lessons for Monday "learn" days, used when Claude is off.
import { MATH_LESSONS } from "./lessons-math.js";
import { ENGLISH_LESSONS } from "./lessons-english.js";
import { EARLY_MATH_LESSONS, EARLY_ENGLISH_LESSONS } from "./lessons-early.js";
import { UPPER_MATH_LESSONS, UPPER_ENGLISH_LESSONS } from "./lessons-upper.js";
import { MIDDLE_MATH_LESSONS, MIDDLE_ENGLISH_LESSONS } from "./lessons-middle.js";
import { CLASS_LESSONS } from "./lessons-class.js";

const build = ([title, intro, points, problem, steps, tip, visual]) => ({
  title,
  intro,
  points,
  example: { problem, steps, visual: visual || null },
  tip,
});

export const LESSONS = Object.fromEntries(
  Object.entries({ ...EARLY_MATH_LESSONS, ...EARLY_ENGLISH_LESSONS, ...MATH_LESSONS, ...ENGLISH_LESSONS, ...UPPER_MATH_LESSONS, ...UPPER_ENGLISH_LESSONS, ...MIDDLE_MATH_LESSONS, ...MIDDLE_ENGLISH_LESSONS, ...CLASS_LESSONS }).map(([k, v]) => [k, build(v)])
);
