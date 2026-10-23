// Grade-level skills for each subject. Topics follow common US grade-level standards;
// names and grouping are our own. `op` marks math skills that have a built-in offline generator.

export const GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8"];
export const gradeLabel = (g) => (g === "K" ? "Kindergarten" : "Grade " + g);
export const kidAge = (g) => (g === "K" ? "5 to 6" : `${+g + 5} to ${+g + 6}`);

export const SUBJECTS = {
  math: {
    name: "Math",
    strands: {
      fluency: { name: "Number skills", color: "var(--teal)" },
      story: { name: "Word problems", color: "var(--accent)" },
      reason: { name: "Puzzles & reasoning", color: "var(--plum)" },
    },
    grades: {
      K: [["k-count", "Counting to 20", "fluency"], ["k-add", "Adding within 10", "fluency", "add10"], ["k-sub", "Taking away within 10", "fluency", "sub10"], ["k-story", "Adding and taking away stories", "story"], ["k-compare", "More, fewer, the same", "reason"], ["k-shapes", "Naming shapes", "reason"]],
      1: [["1-add", "Adding within 20", "fluency", "add20"], ["1-sub", "Subtracting within 20", "fluency", "sub20"], ["1-place", "Tens and ones", "fluency"], ["1-story", "Story problems within 20", "story"], ["1-time", "Telling time to the hour and half hour", "reason"], ["1-pattern", "Number patterns", "reason"]],
      2: [["2-add", "Adding and subtracting within 100", "fluency", "add100"], ["2-place", "Place value to 1,000", "fluency"], ["2-money", "Counting coins and dollars", "story"], ["2-story", "Two-step story problems", "story"], ["2-evenodd", "Even and odd numbers", "reason"], ["2-skip", "Skip counting by 2s, 5s, 10s", "reason"]],
      3: [["3-mul", "Multiplication facts", "fluency", "mulfacts"], ["3-div", "Division facts", "fluency", "divfacts"], ["3-round", "Rounding to 10 and 100", "fluency"], ["3-story", "Multi-step word problems", "story"], ["3-frac", "Fractions on a number line", "reason"], ["3-area", "Area and perimeter", "reason"]],
      4: [["4-mul", "Multi-digit multiplication", "fluency", "multimul"], ["4-div", "Long division", "fluency", "longdiv"], ["4-dec", "Tenths and hundredths", "fluency"], ["4-story", "Word problems with all four operations", "story"], ["4-equiv", "Equivalent fractions", "reason"], ["4-factor", "Factors and multiples", "reason"]],
      5: [["5-fracadd", "Adding and subtracting fractions", "fluency"], ["5-dec", "Decimal operations", "fluency"], ["5-ooo", "Order of operations", "fluency"], ["5-story", "Fraction and decimal word problems", "story"], ["5-volume", "Volume of boxes", "reason"], ["5-coord", "The coordinate grid", "reason"]],
      6: [["6-int", "Integers and the number line", "fluency", "int"], ["6-expr", "Writing and evaluating expressions", "fluency"], ["6-ratio", "Ratios and unit rates", "story"], ["6-pct", "Percents", "story"], ["6-eq", "One-step equations", "reason"], ["6-stats", "Mean, median and range", "reason"]],
      7: [["7-rat", "Operations with negative numbers", "fluency", "int"], ["7-eq", "Two-step equations", "fluency"], ["7-prop", "Proportional relationships", "story"], ["7-pct", "Discounts, tax and tips", "story"], ["7-ineq", "Inequalities", "reason"], ["7-prob", "Probability", "reason"]],
      8: [["8-exp", "Exponents and scientific notation", "fluency"], ["8-lin", "Solving linear equations", "fluency"], ["8-slope", "Slope and lines", "reason"], ["8-sys", "Systems of equations", "story"], ["8-pyth", "Pythagorean theorem", "reason"], ["8-func", "Functions and tables", "reason"]],
    },
  },
  english: {
    name: "English",
    strands: {
      reading: { name: "Reading", color: "var(--teal)" },
      words: { name: "Words & spelling", color: "var(--accent)" },
      writing: { name: "Grammar & writing", color: "var(--plum)" },
    },
    grades: {
      K: [["ek-sounds", "Letter sounds", "words"], ["ek-rhyme", "Rhyming words", "words"], ["ek-sight", "Sight words", "words"], ["ek-story", "Listening to a short story", "reading"], ["ek-caps", "Capital letters and periods", "writing"], ["ek-sentence", "Building a sentence", "writing"]],
      1: [["e1-vowels", "Short and long vowels", "words"], ["e1-blends", "Blends and digraphs (bl, sh, ch)", "words"], ["e1-details", "Story details: who, what, where", "reading"], ["e1-main", "What is it mostly about?", "reading"], ["e1-nounverb", "Nouns and verbs", "writing"], ["e1-complete", "Complete sentences", "writing"]],
      2: [["e2-spell", "Spelling patterns", "words"], ["e2-compound", "Compound words", "words"], ["e2-sequence", "Story order: first, next, last", "reading"], ["e2-characters", "Characters and feelings", "reading"], ["e2-plurals", "Plurals", "writing"], ["e2-past", "Past tense verbs", "writing"]],
      3: [["e3-affix", "Prefixes and suffixes", "words"], ["e3-synant", "Synonyms and antonyms", "words"], ["e3-main", "Main idea and details", "reading"], ["e3-cause", "Cause and effect", "reading"], ["e3-adj", "Adjectives and adverbs", "writing"], ["e3-agree", "Subject-verb agreement", "writing"]],
      4: [["e4-context", "Context clues", "words"], ["e4-roots", "Greek and Latin roots", "words"], ["e4-infer", "Making inferences", "reading"], ["e4-theme", "Theme of a story", "reading"], ["e4-punct", "Commas and quotation marks", "writing"], ["e4-runon", "Fixing run-on sentences", "writing"]],
      5: [["e5-figurative", "Similes, metaphors and idioms", "words"], ["e5-homophones", "Homophones (their, there, they're)", "words"], ["e5-compare", "Comparing two texts", "reading"], ["e5-pov", "Point of view", "reading"], ["e5-tense", "Verb tenses", "writing"], ["e5-combine", "Combining sentences", "writing"]],
      6: [["e6-meaning", "Word meanings in context", "words"], ["e6-connotation", "Connotation: word feelings", "words"], ["e6-central", "Central idea and summary", "reading"], ["e6-evidence", "Finding text evidence", "reading"], ["e6-pronouns", "Pronouns", "writing"], ["e6-paragraph", "Paragraph structure", "writing"]],
      7: [["e7-shades", "Shades of meaning", "words"], ["e7-analogies", "Word analogies", "words"], ["e7-purpose", "Author's purpose", "reading"], ["e7-claims", "Claims and reasons", "reading"], ["e7-clauses", "Phrases and clauses", "writing"], ["e7-concise", "Clear, concise sentences", "writing"]],
      8: [["e8-roots", "Vocabulary from roots", "words"], ["e8-irony", "Irony and figurative meaning", "words"], ["e8-argument", "Evaluating an argument", "reading"], ["e8-theme", "Theme and plot development", "reading"], ["e8-verbals", "Gerunds, participles, infinitives", "writing"], ["e8-voice", "Active and passive voice", "writing"]],
    },
  },
};

export const SKILLS = {};
for (const [subject, s] of Object.entries(SUBJECTS))
  for (const g of GRADES)
    for (const [id, name, strand, op] of s.grades[g]) SKILLS[id] = { id, name, strand, op, grade: g, subject };

export const skillsFor = (subject, grade) => SUBJECTS[subject].grades[grade].map((r) => SKILLS[r[0]]);
