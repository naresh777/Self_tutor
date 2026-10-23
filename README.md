# Pip Tutor

A math and English tutor app for kids in Kindergarten through Grade 8. Pip, a friendly owl powered by Claude, writes practice worksheets at each child's level, gives hints and guiding questions instead of answers, and shows worked solutions step by step. Parents get a PIN-protected corner with progress, missed problems and written progress notes.

It's a web app you install on an iPad or Android tablet from the browser, so it doesn't need the App Store or Google Play.

## What's inside

- **Two subjects, K–8.** Math: number skills, word problems, and puzzles and reasoning. English: reading, words and spelling, and grammar and writing. Each grade has six skills per subject.
- **Adaptive worksheets.** Five problems per sheet, at level 1 to 3 depending on how the child has been doing, with similar problems brought back after a miss. Reading skills come with a short original passage.
- **Help when stuck.** A hint, a "Show me how" step-by-step solution, a chat with Pip that guides with questions, and a read-aloud button for every question and passage.
- **Skill map.** Each skill shows Not started, Learning, Getting there, Mastered or Needs help, based on the last 10 problems.
- **Motivation.** Stars, a daily problem goal and a practice streak.
- **Parent corner.** Last-7-days stats per child and subject, skills that need attention, every missed problem with the child's answer, focus skills you pick, and a "Write a progress note" button.
- **Works offline for number facts.** Addition, subtraction, multiplication, division and integer sheets are built in, so practice still works without internet or an API key.

## Set it up

### 1. Put it online with GitHub Pages (one time)

1. In this repo on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow from the **Actions** tab). After a minute the app is live at `https://<your-username>.github.io/self_tutor/`.

### 2. Install it on each device

- **iPad / iPhone:** open the link in **Safari**, tap the **Share** button, then **Add to Home Screen**.
- **Android:** open the link in **Chrome**, tap the **⋮** menu, then **Install app** (or **Add to Home screen**).

It then opens full screen from its own icon, like a regular app.

### 3. Add the family and connect Claude

1. Open the app, add each child with their grade.
2. Tap **Parent corner**, choose a PIN, then **Family settings**.
3. Create an API key at [console.anthropic.com](https://console.anthropic.com) → **API keys**, paste it into **Pip's brain (Claude)**, and tap **Save and test**.

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
npm test         # answer-checker and offline generator tests
npm run build    # production build in dist/
```

Code layout:

| File | What it does |
|---|---|
| `src/curriculum.js` | Grades, subjects, strands and skills |
| `src/ai.js` | Claude calls: worksheets, answer checks, tutor chat, progress notes |
| `src/check.js` | Answer matching and the built-in number-fact sheets |
| `src/store.js` | Saving family data on the device, backup and restore |
| `src/main.js` | Screens and interactions |
| `public/sw.js` | Offline support for the installed app |
