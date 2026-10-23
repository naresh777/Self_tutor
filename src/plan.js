// The daily plan. Each course week has five school days:
// Monday learn the new topic, Tuesday to Thursday practice it (getting harder),
// Friday a weekly quiz, or a monthly test on the unit when it's the unit's last week.
import { WEEKS, year, topic } from "./course.js";

export const dayType = (week, day) => (day === 0 ? "learn" : day < 4 ? "practice" : week % 4 === 0 ? "test" : "quiz");
export const TYPE_LABEL = { learn: "New lesson", practice: "Practice", quiz: "Weekly quiz", test: "Monthly test", extra: "Extra practice" };

export const mastery = (p) => (p && p.recent.length ? p.recent.reduce((a, b) => a + b, 0) / p.recent.length : 0);

// Pick earlier topics to mix back in, weakest first, so old skills don't fade.
export function reviewTopics(subject, grade, week, count, peek, exclude = []) {
  const earlier = year(subject, grade).filter((t) => t.week < week && !exclude.includes(t.id));
  if (!earlier.length) return [];
  const scored = earlier.map((t) => {
    const p = peek(t.id);
    const m = p.attempts ? mastery(p) : 0.5;
    const age = week - t.week;
    return { t, w: (1.2 - m) * 3 + Math.random() + (age > 6 ? 0.5 : 0) };
  });
  scored.sort((a, b) => b.w - a.w);
  return scored.slice(0, count).map((s) => s.t);
}

function practiceLevel(day, p) {
  let lvl = day; // Tue 1, Wed 2, Thu 3
  const m = mastery(p);
  if (p.attempts >= 5 && m >= 0.85) lvl++;
  if (p.attempts >= 5 && m < 0.6) lvl--;
  return Math.max(1, Math.min(3, lvl));
}

// What a worksheet for one subject on one course day contains.
export function sheetPlan(subject, grade, week, day, peek) {
  const type = dayType(week, day);
  const cur = year(subject, grade)[week - 1];
  if (type === "learn") return { type, items: [{ topic: cur, count: 5, level: 1 }, ...reviewTopics(subject, grade, week, 1, peek).map((t) => ({ topic: t, count: 1, level: 2, review: true }))] };
  if (type === "practice") return { type, items: [{ topic: cur, count: 5, level: practiceLevel(day, peek(cur.id)) }, ...reviewTopics(subject, grade, week, 1, peek).map((t) => ({ topic: t, count: 1, level: 2, review: true }))] };
  if (type === "quiz") return { type, items: [{ topic: cur, count: 6, level: 2 }, ...reviewTopics(subject, grade, week, 4, peek).map((t) => ({ topic: t, count: 1, level: 2, review: true }))] };
  const unitTopics = year(subject, grade).filter((t) => t.unit === cur.unit);
  return {
    type,
    items: [
      ...unitTopics.map((t) => ({ topic: t, count: 3, level: 2 })),
      ...reviewTopics(subject, grade, unitTopics[0].week, 3, peek).map((t) => ({ topic: t, count: 1, level: 2, review: true })),
    ],
  };
}

export const extraPlan = (t, peek) => ({ type: "extra", items: [{ topic: t, count: 5, level: Math.max(1, Math.min(3, 1 + Math.floor(mastery(peek(t.id)) * 3))) }] });

export const dayIndex = (pos) => (pos.week - 1) * 5 + pos.day;
export const isFinished = (pos) => pos.week > WEEKS;
export function advance(pos) {
  return pos.day < 4 ? { week: pos.week, day: pos.day + 1 } : { week: pos.week + 1, day: 0 };
}

// School days (Mon-Fri) from the start date up to and including today.
export function schoolDaysSince(startIso, now = new Date()) {
  const d = new Date(startIso + "T00:00:00");
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let n = 0;
  while (d <= end && n < 400) { const wd = d.getDay(); if (wd >= 1 && wd <= 5) n++; d.setDate(d.getDate() + 1); }
  return n;
}

export function pace(course, now) {
  const expected = Math.min(WEEKS * 5, schoolDaysSince(course.start, now));
  const done = dayIndex(course.pos);
  const diff = done - expected;
  if (diff >= 2) return { k: "ahead", label: `${diff} days ahead`, cls: "good", diff };
  if (diff <= -3) return { k: "behind", label: `${-diff} days behind`, cls: "bad", diff };
  return { k: "on", label: "On track", cls: "good", diff };
}

export const topicOf = topic;
