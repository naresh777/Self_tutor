// The school-year course: for each grade and subject, 8 units of 4 weekly topics (weeks 1-32),
// then a 4-week unit 9 that previews next year's grade (Grade 8 reviews its own year instead).
// Topics follow common US grade-level standards; the wording and order are our own.
// "name|op" marks a math topic that also has a built-in offline generator (see check.js).

export const GRADES = ["K", "1", "2", "3", "4", "5", "6", "7", "8"];
export const gradeLabel = (g) => (g === "K" ? "Kindergarten" : "Grade " + g);
export const kidAge = (g) => (g === "K" ? "5 to 6" : `${+g + 5} to ${+g + 6}`);
export const nextGrade = (g) => (g === "K" ? "1" : g === "8" ? null : String(+g + 1));
export const WEEKS = 36;
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const SUBJECTS = {
  math: { name: "Math", color: "var(--teal)" },
  english: { name: "English", color: "var(--plum)" },
};

const SCOPE = {
  math: {
    K: [
      ["Numbers to 10", ["Counting objects to 10", "Writing numbers 0 to 10", "Comparing groups: more and fewer", "Number order to 10"]],
      ["Shapes", ["Circles, squares, triangles and rectangles", "Shapes around us", "Flat and solid shapes", "Position words: above, below, beside"]],
      ["Adding within 5", ["Putting together", "Adding with pictures|add10", "Addition sentences", "Adding stories"]],
      ["Subtracting within 5", ["Taking away", "Subtracting with pictures|sub10", "Subtraction sentences", "Take-away stories"]],
      ["Numbers to 20", ["Counting to 20", "Teen numbers: ten and some ones", "Writing numbers to 20", "Comparing numbers to 20"]],
      ["Adding and subtracting within 10", ["Making 5", "Making 10", "Adding within 10|add10", "Subtracting within 10|sub10"]],
      ["Measuring and sorting", ["Longer and shorter", "Heavier and lighter", "Sorting into groups", "Counting groups after sorting"]],
      ["Counting to 100", ["Counting by ones to 100", "Counting by tens", "Patterns on a hundred chart", "Adding and subtracting review|add10"]],
    ],
    1: [
      ["Addition strategies", ["Counting on|add20", "Doubles and near doubles|add20", "Making 10 to add|add20", "Adding three numbers"]],
      ["Subtraction strategies", ["Counting back|sub20", "Think addition to subtract|sub20", "Fact families", "Missing numbers in equations"]],
      ["Story problems", ["Adding to and putting together", "Taking from and taking apart", "Comparing story problems", "Two-step stories within 20"]],
      ["Place value", ["Tens and ones", "Numbers to 120", "Comparing two-digit numbers (<, >, =)", "10 more and 10 less"]],
      ["Adding two-digit numbers", ["Adding tens", "Adding a one-digit number to a two-digit number", "Adding a multiple of 10", "Subtracting multiples of 10"]],
      ["Length and time", ["Ordering by length", "Measuring with units", "Telling time to the hour", "Telling time to the half hour"]],
      ["Data", ["Tally charts", "Picture graphs", "Reading bar graphs", "Answering questions about data"]],
      ["Shapes and fractions", ["2D and 3D shapes", "Building new shapes", "Halves", "Fourths (quarters)"]],
    ],
    2: [
      ["Addition and subtraction facts", ["Fluency within 20|add20", "Even and odd numbers", "Arrays and repeated addition", "Subtraction fact strategies|sub20"]],
      ["Place value to 1,000", ["Hundreds, tens and ones", "Reading and writing numbers to 1,000", "Expanded form", "Comparing three-digit numbers"]],
      ["Adding within 100", ["Adding tens and ones|add100", "Regrouping ones into a ten|add100", "Adding up to four two-digit numbers", "Mental math: adding 10 and 100"]],
      ["Subtracting within 100", ["Subtracting tens and ones|add100", "Regrouping a ten|add100", "Checking subtraction with addition", "Two-step word problems"]],
      ["Adding and subtracting within 1,000", ["Adding three-digit numbers", "Subtracting three-digit numbers", "Adding and subtracting 10 and 100", "Explaining your strategy"]],
      ["Money and time", ["Counting coins", "Dollars and cents word problems", "Telling time to 5 minutes", "a.m. and p.m."]],
      ["Measurement and data", ["Inches, feet, centimeters and meters", "Estimating length", "Line plots", "Picture graphs and bar graphs"]],
      ["Shapes and fractions", ["Shapes by sides and angles", "Rows and columns in rectangles", "Halves, thirds and fourths", "Skip counting by 5s, 10s and 100s"]],
    ],
    3: [
      ["What multiplication means", ["Equal groups", "Arrays", "Multiplying by 2, 5 and 10|mulfacts", "Multiplication word problems"]],
      ["What division means", ["Sharing equally", "Division as equal groups", "Fact families: multiply and divide|divfacts", "Division word problems"]],
      ["Multiplication facts", ["Facts with 3, 4 and 6|mulfacts", "Facts with 7, 8 and 9|mulfacts", "Properties of multiplication", "Multiplying by multiples of 10"]],
      ["Place value and rounding", ["Rounding to the nearest 10", "Rounding to the nearest 100", "Adding within 1,000", "Subtracting within 1,000"]],
      ["Fractions", ["Unit fractions", "Fractions on a number line", "Equivalent fractions", "Comparing fractions"]],
      ["Area", ["Understanding area", "Area by counting squares", "Area of rectangles by multiplying", "Area of combined rectangles"]],
      ["Measurement and data", ["Time to the minute and elapsed time", "Liquid volume and mass", "Scaled picture and bar graphs", "Line plots with halves and fourths"]],
      ["Shapes and problem solving", ["Quadrilaterals", "Perimeter", "Two-step word problems", "Patterns in the multiplication table"]],
    ],
    4: [
      ["Place value", ["Place value to 1,000,000", "Comparing and rounding big numbers", "Adding multi-digit numbers", "Subtracting multi-digit numbers"]],
      ["Multiplication", ["Multiplying by one-digit numbers|multimul", "Multiplying two two-digit numbers|multimul", "Multiplication comparison problems", "Estimating products"]],
      ["Division", ["Dividing with remainders|longdiv", "Long division|longdiv", "Interpreting remainders", "Factors, multiples, prime and composite"]],
      ["Fractions 1", ["Equivalent fractions", "Comparing fractions", "Adding and subtracting fractions", "Mixed numbers"]],
      ["Fractions 2 and decimals", ["Multiplying a fraction by a whole number", "Fraction word problems", "Tenths and hundredths", "Comparing decimals"]],
      ["Measurement", ["Converting units", "Area and perimeter formulas", "Line plots with fractions", "Money and time word problems"]],
      ["Geometry", ["Points, lines, rays and angles", "Measuring angles", "Parallel and perpendicular lines", "Lines of symmetry"]],
      ["Patterns and review", ["Number and shape patterns", "Multi-step word problems", "Multiplication and division review|multimul", "Fractions review"]],
    ],
    5: [
      ["Place value and decimals", ["Powers of 10", "Decimals to thousandths", "Comparing and rounding decimals", "Multiplying whole numbers"]],
      ["Decimal operations", ["Adding and subtracting decimals", "Multiplying decimals", "Dividing decimals", "Decimal word problems"]],
      ["Division", ["Dividing by two-digit numbers", "Estimating quotients", "Remainders in context", "Order of operations"]],
      ["Adding fractions", ["Common denominators", "Adding and subtracting fractions", "Mixed numbers", "Fraction word problems"]],
      ["Multiplying and dividing fractions", ["Fractions as division", "Multiplying fractions", "Area with fraction side lengths", "Dividing with unit fractions"]],
      ["Volume", ["Unit cubes and volume", "The volume formula", "Volume of combined shapes", "Converting measurements"]],
      ["The coordinate plane", ["Plotting points", "Graphing patterns", "Classifying shapes", "Line plots with fractions"]],
      ["Getting ready for algebra", ["Numerical expressions", "Patterns and relationships", "Multi-step problems", "Year review"]],
    ],
    6: [
      ["Ratios", ["Ratios and ratio language", "Equivalent ratios and tables", "Unit rates", "Rate word problems"]],
      ["Percents", ["Percent as a rate per 100", "Finding a percent of a number", "Finding the whole from a percent", "Converting units with ratios"]],
      ["Fraction division and decimals", ["Dividing fractions", "Multi-digit division", "Decimal operations", "GCF and LCM"]],
      ["Integers", ["Negative numbers in real life|int", "Opposites on the number line|int", "Absolute value", "The coordinate plane in four quadrants"]],
      ["Expressions", ["Exponents", "Writing expressions", "Evaluating expressions", "Equivalent expressions"]],
      ["Equations and inequalities", ["One-step equations", "Writing equations from stories", "Inequalities", "Dependent and independent variables"]],
      ["Geometry", ["Area of triangles and polygons", "Surface area with nets", "Volume with fraction edge lengths", "Polygons on the coordinate plane"]],
      ["Statistics", ["Statistical questions", "Mean, median and mode", "Range and interquartile range", "Dot plots, histograms and box plots"]],
    ],
    7: [
      ["Proportional relationships", ["Unit rates with fractions", "Recognizing proportional relationships", "Constant of proportionality", "Graphs of proportional relationships"]],
      ["Percent applications", ["Percent increase and decrease", "Discounts, markups and tax", "Simple interest", "Percent error"]],
      ["Rational numbers", ["Adding integers|int", "Subtracting integers|int", "Multiplying and dividing integers", "Operations with rational numbers"]],
      ["Expressions", ["Combining like terms", "The distributive property", "Factoring expressions", "Rewriting expressions"]],
      ["Equations and inequalities", ["Two-step equations", "Equations with parentheses", "Two-step inequalities", "Word problems with equations"]],
      ["Geometry", ["Scale drawings", "Angle relationships", "Circles: circumference and area", "Area, surface area and volume"]],
      ["Statistics", ["Sampling", "Comparing populations", "Mean absolute deviation", "Making inferences from data"]],
      ["Probability", ["Probability of simple events", "Experimental and theoretical probability", "Compound events", "Probability models"]],
    ],
    8: [
      ["Numbers", ["Rational and irrational numbers", "Square and cube roots", "Integer exponents", "Scientific notation"]],
      ["Linear equations", ["Variables on both sides", "One, none or infinitely many solutions", "Slope", "Graphing lines: y = mx + b"]],
      ["Functions", ["What a function is", "Comparing functions", "Linear and nonlinear functions", "Writing functions from tables and graphs"]],
      ["Systems of equations", ["Solving systems by graphing", "Substitution", "Elimination", "System word problems"]],
      ["Transformations", ["Translations, reflections and rotations", "Dilations", "Congruence and similarity", "Angles with parallel lines"]],
      ["Pythagorean theorem", ["The theorem", "Finding missing sides", "Distance on the coordinate plane", "Pythagorean word problems"]],
      ["Volume", ["Volume of cylinders", "Volume of cones", "Volume of spheres", "Mixed volume problems"]],
      ["Data", ["Scatter plots", "Lines of best fit", "Two-way tables", "Year review"]],
    ],
  },
  english: {
    K: [
      ["Letters", ["Uppercase letters", "Lowercase letters", "Matching uppercase and lowercase", "Letters in words"]],
      ["Sounds", ["Beginning sounds", "Ending sounds", "Rhyming words", "Clapping syllables"]],
      ["Short vowels", ["Short a words", "Short i words", "Short o words", "Short e and u words"]],
      ["Sight words", ["Sight words: the, a, I, see", "Sight words: is, and, can, we", "Sight words: like, to, go, my", "Reading short sentences"]],
      ["Stories", ["Who is in the story", "Where the story happens", "First, next, last", "Retelling a story"]],
      ["Information", ["Facts from a short text", "Asking and answering questions", "Pictures and words together", "New words in a text"]],
      ["Writing", ["Capital letters", "Periods and question marks", "Writing a sentence", "Nouns: people, places, things"]],
      ["Words", ["Action words (verbs)", "Plurals with s", "Opposites", "Sorting words into groups"]],
    ],
    1: [
      ["Phonics", ["Short vowels review", "Consonant blends (bl, st, tr)", "Digraphs: sh, ch, th, wh", "Endings -ng and -nk"]],
      ["Long vowels", ["Silent e (cake, bike)", "Vowel teams ai and ay", "Vowel teams ee and ea", "Vowel teams oa and ow"]],
      ["Reading stories", ["Characters and setting", "Beginning, middle and end", "Feelings in a story", "The lesson of a story"]],
      ["Reading information", ["Main topic", "Key details", "Titles and labels", "Comparing two texts"]],
      ["Grammar", ["Common and proper nouns", "One and more than one", "Verbs: past, present, future", "Pronouns: I, me, he, she"]],
      ["Sentences", ["Complete sentences", "Statements, questions and exclamations", "Adjectives", "Joining words: and, but, or"]],
      ["Words", ["Compound words", "Endings -ed and -ing", "Words that sound alike", "Sorting words by category"]],
      ["Writing", ["Capital letters for names and dates", "Commas in dates and lists", "Writing an opinion", "Writing how to do something"]],
    ],
    2: [
      ["Phonics review", ["Short and long vowels", "Bossy r: ar, or, er, ir, ur", "Vowel teams oo, ou, ow, oi, oy", "Two-syllable words"]],
      ["Reading stories", ["Who, what, where, when, why", "How a story is built", "How characters respond", "Different voices in a story"]],
      ["Reading information", ["Main topic of a paragraph", "Headings, bold words and glossaries", "The author's purpose", "Connecting steps and events"]],
      ["Vocabulary", ["Prefixes un- and re-", "Suffixes -ful, -less and -ly", "Context clues", "Shades of meaning"]],
      ["Grammar 1", ["Collective nouns", "Irregular plural nouns", "Reflexive pronouns (myself, ourselves)", "Irregular past tense verbs"]],
      ["Grammar 2", ["Adjectives and adverbs", "Expanding sentences", "Rearranging sentences", "Contractions and apostrophes"]],
      ["Spelling and words", ["Spelling patterns: -ight, -tch, -dge", "Compound words", "Homophones", "ABC order and the dictionary"]],
      ["Writing", ["Opinion writing with reasons", "Informative writing with facts", "Writing a story in order", "Fables and folktales"]],
    ],
    3: [
      ["Reading stories", ["Asking and answering questions", "Retelling stories and morals", "Character traits and motivations", "Chapters, scenes and stanzas"]],
      ["Reading information", ["Main idea and key details", "Cause and effect", "Sequence of events", "Comparing two texts"]],
      ["Words", ["Prefixes and suffixes", "Root words", "Literal and nonliteral meaning", "Synonyms and antonyms"]],
      ["Grammar 1", ["Parts of speech", "Regular and irregular plurals", "Abstract nouns", "Verb tenses"]],
      ["Grammar 2", ["Subject-verb agreement", "Comparing with -er and -est", "Conjunctions", "Simple and compound sentences"]],
      ["Punctuation", ["Capitalizing titles", "Commas in addresses", "Quotation marks in dialogue", "Possessives"]],
      ["Spelling", ["Adding suffixes", "Spelling patterns and rules", "Homophones", "Using a dictionary"]],
      ["Writing", ["Opinion paragraphs", "Informative paragraphs with linking words", "Stories with dialogue", "Revising and editing"]],
    ],
    4: [
      ["Reading stories", ["Theme", "Characters, setting and events", "First and third person", "Stories from different cultures"]],
      ["Reading information", ["Main idea and summary", "Explaining events and ideas", "Text structure", "Firsthand and secondhand accounts"]],
      ["Vocabulary", ["Context clues", "Greek and Latin roots", "Similes and metaphors", "Idioms, adages and proverbs"]],
      ["Grammar", ["Relative pronouns and adverbs", "Progressive verb tenses", "Helping verbs: can, may, must", "Order of adjectives"]],
      ["Sentences", ["Prepositional phrases", "Fragments and complete sentences", "Fixing run-on sentences", "Commonly confused words"]],
      ["Punctuation and spelling", ["Capitalization", "Commas and quotation marks", "Commas before conjunctions", "Spelling grade-level words"]],
      ["Reading closely", ["Making inferences", "Quoting evidence", "Charts and diagrams", "Reasons and evidence"]],
      ["Writing", ["Opinion essays", "Informative essays", "Stories with descriptive details", "Choosing precise words"]],
    ],
    5: [
      ["Reading stories", ["Quoting to support inferences", "Theme and summary", "Comparing characters", "The narrator's point of view"]],
      ["Reading information", ["More than one main idea", "Relationships between people and events", "Different accounts of one event", "Using several texts"]],
      ["Vocabulary", ["Context clues", "Greek and Latin affixes and roots", "Figurative language", "Synonyms, antonyms and homographs"]],
      ["Grammar", ["Conjunctions, prepositions and interjections", "Perfect verb tenses", "Shifts in verb tense", "Either/or and neither/nor"]],
      ["Punctuation", ["Commas in a series", "Commas after introductory words", "Titles of works", "Commas with yes, no and tag questions"]],
      ["Sentences", ["Combining sentences", "Expanding and reducing sentences", "Dialects and varieties of English", "Formal and informal language"]],
      ["Reading closely", ["Text structures", "Author's reasons and evidence", "Visual elements in texts", "Drawing conclusions"]],
      ["Writing", ["Opinion writing", "Research and note-taking", "Informative writing", "Narrative techniques"]],
    ],
    6: [
      ["Literature", ["Citing text evidence", "Theme and central idea", "Plot development", "Character development"]],
      ["Informational text", ["Central idea and summary", "How ideas are developed", "Text structure", "Author's point of view"]],
      ["Vocabulary", ["Context clues", "Greek and Latin roots", "Figurative language and personification", "Connotation and denotation"]],
      ["Grammar", ["Pronoun case", "Intensive pronouns", "Shifts in pronoun number and person", "Vague pronouns"]],
      ["Language", ["Punctuation for extra information", "Spelling", "Varying sentence patterns", "Consistent style and tone"]],
      ["Reading closely", ["Word choice and tone", "Comparing genres", "Evaluating claims", "Charts and media"]],
      ["Research", ["Gathering sources", "Paraphrasing and quoting", "Credible sources", "Citing sources"]],
      ["Writing", ["Argument essays", "Informative essays", "Narratives", "Revising for clarity"]],
    ],
    7: [
      ["Literature", ["Citing several pieces of evidence", "Theme development", "How story elements interact", "Characters' points of view"]],
      ["Informational text", ["Two or more central ideas", "How people, events and ideas interact", "Author's purpose", "Tracing an argument"]],
      ["Vocabulary", ["Context and affixes", "Analogies", "Figurative language and allusions", "Connotation"]],
      ["Grammar", ["Phrases and clauses", "Simple, compound and complex sentences", "Misplaced and dangling modifiers", "Commas with coordinate adjectives"]],
      ["Style", ["Concise language", "Cutting wordiness", "Precise word choice", "Spelling"]],
      ["Reading closely", ["Poetry: form and meaning", "How a drama is built", "Fiction and history compared", "Evaluating evidence"]],
      ["Research", ["Research questions", "Evaluating sources", "Using quotations", "Avoiding plagiarism"]],
      ["Writing", ["Arguments with counterclaims", "Organized informative writing", "Narrative pacing", "Editing and proofreading"]],
    ],
    8: [
      ["Literature", ["The strongest evidence", "Theme and its development", "Dialogue and plot", "Dramatic irony"]],
      ["Informational text", ["Developing a central idea", "Analogies and comparisons", "Paragraph structure", "Evaluating arguments"]],
      ["Vocabulary", ["Greek and Latin roots", "Verbal irony and puns", "Connotation and denotation", "Word relationships"]],
      ["Grammar", ["Gerunds, participles and infinitives", "Active and passive voice", "Verb moods", "Shifts in voice and mood"]],
      ["Punctuation and style", ["Commas, ellipses and dashes", "Spelling", "Sentence variety", "Formal style"]],
      ["Reading closely", ["Conflicting information", "Modern stories from old myths", "Comparing text structures", "Evaluating media"]],
      ["Research", ["Research questions", "Assessing sources", "Citation", "Combining information"]],
      ["Writing", ["Argument essays", "Explanatory essays", "Narratives with reflection", "Year review"]],
    ],
  },
};

function topicFrom(subject, grade, unit, week, raw, extra = {}) {
  const [name, op] = raw.split("|");
  return { id: `${subject}-${grade}-w${week}`, subject, grade, unit, week, name, op, unitTitle: SCOPE[subject][grade][unit - 1]?.[0], ...extra };
}

const yearCache = {};
// All 36 weekly topics for one subject in a grade's course.
export function year(subject, grade) {
  const key = subject + grade;
  if (yearCache[key]) return yearCache[key];
  const weeks = [];
  SCOPE[subject][grade].forEach(([, topics], u) =>
    topics.forEach((t, i) => weeks.push(topicFrom(subject, grade, u + 1, u * 4 + i + 1, t))),
  );
  const ng = nextGrade(grade);
  if (ng) {
    // Unit 9 previews the first topic of next year's units 1-4.
    const title = `Getting ready for ${gradeLabel(ng)}`;
    for (let i = 0; i < 4; i++) {
      const t = topicFrom(subject, ng, i + 1, 33 + i, SCOPE[subject][ng][i][1][0], { bridge: true });
      weeks.push({ ...t, id: `${subject}-${grade}-w${33 + i}`, unit: 9, week: 33 + i, unitTitle: title });
    }
  } else {
    for (let i = 0; i < 4; i++)
      weeks.push({ id: `${subject}-${grade}-w${33 + i}`, subject, grade, unit: 9, week: 33 + i, name: `Review: ${SCOPE[subject][grade][i * 2][0]} and ${SCOPE[subject][grade][i * 2 + 1][0]}`, unitTitle: "Year review", review: true });
  }
  return (yearCache[key] = weeks);
}

export const units = (subject, grade) => {
  const out = [];
  for (const t of year(subject, grade)) (out[t.unit - 1] ||= { unit: t.unit, title: t.unitTitle, topics: [] }).topics.push(t);
  return out;
};

const byId = {};
export function topic(id) {
  if (byId[id]) return byId[id];
  const [subject, grade] = id.split("-");
  for (const t of year(subject, grade)) byId[t.id] = t;
  return byId[id];
}
