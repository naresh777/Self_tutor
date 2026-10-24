// Built-in lessons for Monday "learn" days, used when Claude is off.
import { MATH_LESSONS } from "./lessons-math.js";
import { ENGLISH_LESSONS } from "./lessons-english.js";

const build = ([title, intro, points, problem, steps, tip, visual]) => ({
  title,
  intro,
  points,
  example: { problem, steps, visual: visual || null },
  tip,
});

export const LESSONS = Object.fromEntries(
  Object.entries({ ...MATH_LESSONS, ...ENGLISH_LESSONS }).map(([k, v]) => [k, build(v)])
);
