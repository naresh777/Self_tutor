# Pip Tutor

A math and English tutor app for kids in Kindergarten through Grade 8. Pip, a friendly owl powered by Claude, writes practice worksheets at each child's level, gives hints and guiding questions instead of answers, and shows worked solutions step by step. Parents get a PIN-protected corner with progress, missed problems and written progress notes.

It's a web app you install on an iPad or Android tablet from the browser, so it doesn't need the App Store or Google Play.

## What's inside

**A full school year for each grade, K–8, in Math and English.** Each course has 36 weeks of weekly topics, grouped into units, and ends with a few weeks that get kids ready for next year's grade (Grade 8 reviews its own year instead).

**Texas TEKS for Grades 2 and 3 (Prosper ISD and Frisco ISD).** Grade 2 and Grade 3 math follow the Texas Essential Knowledge and Skills in the order Frisco ISD's 2025-26 scope and sequence teaches them (Prosper ISD teaches the same TEKS). Grade 2 runs from fact strategies and numbers to 1,200 through adding and subtracting to 1,000, data, money, geometry, fractions, time, measurement and personal financial literacy, and ends with three weeks of Grade 3 readiness. English follows the ELAR TEKS (§110.4 and §110.5). Each topic carries its TEKS code, which shows in lessons and in the parent course map, and Pip writes STAAR-style questions on quizzes and tests. Other grades follow common US grade-level standards.

**Pictures that show the math.** Lessons, questions and "Show me how" steps come with drawn models: open number lines with hops for adding and subtracting, base-ten blocks (with the "trade 1 ten for 10 ones" step for subtraction), ten frames, strip diagrams, place value charts, arrays and equal groups, clocks, coins, fraction models and bar graphs. They're drawn on the device, so they look sharp and work in light and dark mode.

**A plan for every school day.** Each week follows the same rhythm, for both subjects:

| Day | Work |
|---|---|
| Monday | **New lesson**: a short lesson from Pip with a worked example, then a first practice sheet |
| Tuesday to Thursday | **Practice** sheets that get harder through the week |
| Friday | **Weekly quiz** on the week's topic, plus review |
| Friday of every 4th week | **Monthly test** on the last four weeks, plus review of earlier weeks |

Every sheet also mixes in problems from earlier weeks, with weaker topics coming back more often, so skills don't fade. Quizzes and tests have no hints. At the end, kids see their score and how to solve each problem they missed.

**Help when stuck.** On practice days kids can get a hint, tap "Show me how" for a step-by-step solution, or chat with Pip, who guides with questions instead of giving answers. Every question, passage and lesson can be read aloud.

**Motivation.** Kids earn stars, a bonus for finishing the day, and a streak. The course map shows how each week's topic is going.

**Parent corner** (behind a PIN):
- Course position and pace (on track, or days ahead or behind) against your school calendar
- Monthly test and weekly quiz scores for each subject
- Topics that need review, and every missed problem with your child's answer
- A "Write a progress note" button for a summary with next steps
- Course settings to set the start date and move to any week, for example to match the class

**Every grade, K–8, works fully offline.** Every week of the K through Grade 8 math and English course has a built-in lesson, practice sheets, quizzes and monthly tests made on the device, with pictures, reading passages and writing prompts. No internet and no API key are needed. A Claude key is optional: it adds the tutor chat, progress notes and freshly written lessons and problems. In **Family settings** you can choose **Built-in course** to stay offline even with a key saved. Older grades add pictures for angles, coordinate grids, cube volume, scatter plots and solids.

## Set it up

### 1. Put it online with GitHub Pages (one time)

1. In this repo on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow from the **Actions** tab). After a minute the app is live at `https://<your-username>.github.io/self_tutor/`.

### 2. Install it on each device

- **iPad / iPhone:** open the link in **Safari**, tap the **Share** button, then **Add to Home Screen**.
- **Android:** open the link in **Chrome**, tap the **⋮** menu, then **Install app** (or **Add to Home screen**).

It then opens full screen from its own icon, like a regular app.

### 3. Add the family (and optionally connect Claude)

1. Open the app and add each child with their grade for this school year.
2. Tap **Parent corner** and choose a PIN. Under **Course settings**, set the start date to the first day of school, and pick the week that matches what the class is doing now.
3. Optional: open **Family settings**. Create an API key at [console.anthropic.com](https://console.anthropic.com) → **API keys**, paste it into **Pip's brain (Claude)**, and tap **Save and test**.

Set a monthly spend limit in the Anthropic Console so costs stay predictable. You can pick a cheaper model (Sonnet or Haiku) in Family settings.

## Privacy and safety

- Kids, progress and the API key are saved **only on that device** (browser storage). Nothing goes to any server except the questions sent to Claude to write worksheets and hints.
- The API key is stored on the device and sent directly to Anthropic. Anyone with the device and the PIN could find it, so use a key with a spend limit, and remove it from **Family settings** if a device is lost.
- The PIN is a light lock to keep kids out of the Parent corner, not strong security.
- Pip is told never to ask kids for personal details.
- To move progress to another device, use **Family settings → Backup and moving devices**.

## Develop

```bash
npm install
npm run dev      # local dev server
npm test         # course, plan, answer-checker, generator and picture tests
npm run build    # production build in dist/
```

Code layout:

| File | What it does |
|---|---|
| `src/course.js` | The 36-week course for each grade and subject, with TEKS codes for Grades 2 and 3 |
| `src/plan.js` | The daily plan, review mixing and pacing |
| `src/ai.js` | Claude calls: lessons, worksheets, quizzes, tests, answer checks, tutor chat, progress notes |
| `src/check.js` | Answer matching and the built-in number-fact sheets |
| `src/offline/` | The built-in K–8 course: problem makers, English banks, reading passages and lessons |
| `src/visuals.js` | Draws the math pictures (number lines, base-ten blocks, strip diagrams and more) from small JSON specs |
| `src/store.js` | Saving family data on the device, backup and restore |
| `src/main.js` | Screens and interactions |
| `public/sw.js` | Offline support for the installed app |
