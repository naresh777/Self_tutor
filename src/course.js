// The school-year course: 36 weekly topics per grade and subject, grouped into units, ending with
// a preview of next year's grade (Grade 8 reviews its own year instead).
// Grades 2 and 3 are written against the Texas TEKS (as taught in Frisco and Prosper ISD), with the
// TEKS code after "#". Other grades have 8 units of 4 weeks following common US grade-level standards.
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
    // Texas TEKS (19 TAC 111.4), in the unit order of Frisco ISD's 2025-26 Grade 2 math scope and sequence.
    // Texas TEKS (19 TAC 111.4), in the unit order of Frisco ISD's 2025-26 Grade 2 math scope and sequence.
    2: [
      ["Fact strategies", ["Addition facts to 20: make a ten and doubles|add20#2.4(A)", "Subtraction facts to 20: think addition|sub20#2.4(A)"]],
      ["Numbers to 1,200", ["Hundreds, tens and ones with base-ten blocks#2.2(A)", "Building numbers to 1,200 with thousands#2.2(A)", "Standard, word and expanded form#2.2(B)", "Making a number more than one way#2.2(A), 2.2(B)"]],
      ["Comparing numbers to 1,200", ["Comparing and ordering with >, < and =#2.2(C), 2.2(D)", "Open number lines and 10 or 100 more or less#2.2(E), 2.2(F), 2.7(B)"]],
      ["Adding and subtracting two-digit numbers", ["Adding two-digit numbers with mental math|add100#2.4(B)", "Adding up to four two-digit numbers#2.4(B)", "Subtracting two-digit numbers|add100#2.4(B)"]],
      ["Adding and subtracting to 1,000", ["Adding three-digit numbers with place value#2.4(C)", "Subtracting three-digit numbers with place value#2.4(C)", "Word problems with the unknown in any spot#2.7(C), 2.4(D)"]],
      ["Data analysis", ["Pictographs and bar graphs#2.10(A), 2.10(B)", "Solving problems with graphs#2.10(C), 2.10(D)"]],
      ["Money", ["First-semester review: place value and adding|add100#2.2, 2.4", "Coin values and counting coins to one dollar#2.5(A)", "Writing money with ¢, $ and a decimal point#2.5(B)"]],
      ["Geometry", ["2D shapes: sides and vertices#2.8(A), 2.8(C)", "3D solids and putting shapes together and apart#2.8(B), 2.8(D), 2.8(E)"]],
      ["Fractions", ["Halves, fourths and eighths#2.3(A), 2.3(D)", "More parts make smaller parts; counting parts past one whole#2.3(B), 2.3(C)"]],
      ["Time", ["Time to the minute, a.m. and p.m.#2.9(G)"]],
      ["Measurement", ["Measuring length with rulers and units#2.9(A), 2.9(B), 2.9(D)", "Length problems, number line distances and area#2.9(C), 2.9(E), 2.9(F)"]],
      ["Adding and subtracting to 1,000, part 2", ["Regrouping across tens and hundreds#2.4(C)", "Multi-step word problems#2.4(C), 2.7(C)", "Writing a story for a number sentence#2.4(D)"]],
      ["Multiplication and division", ["Equal groups: joining sets to multiply#2.6(A)", "Sharing equally to divide; even and odd#2.6(B), 2.7(A)"]],
      ["Personal financial literacy", ["Saving, spending, deposits and withdrawals#2.11(A), 2.11(B), 2.11(C)", "Borrowing, lending, producers and consumers#2.11(D), 2.11(E), 2.11(F)"]],
      ["Getting ready for Grade 3", ["Place value to 100,000 and rounding#3.2(A), 3.2(C)", "Adding and subtracting within 1,000 with estimation#3.4(A), 3.4(B)", "Multiplication with equal groups and arrays|mulfacts#3.4(D), 3.4(E)"]],
    ],
    // Texas TEKS (19 TAC 111.5), in the unit order of Frisco ISD's 2025-26 Grade 3 math scope and sequence.
    // Texas TEKS (19 TAC 111.5), in the unit order of Frisco ISD's 2025-26 Grade 3 math scope and sequence.
    3: [
      ["Foundation of numbers", ["Place value to 100,000#3.2(A), 3.2(B)", "Comparing and ordering numbers to 100,000#3.2(D)", "Number lines and rounding#3.2(C)"]],
      ["Addition and subtraction", ["Estimating sums and differences#3.4(B)", "Adding within 1,000 fluently#3.4(A)", "Subtracting within 1,000 fluently#3.4(A)", "Two-step problems with strip diagrams; perimeter#3.5(A), 3.7(B)"]],
      ["Multiplication", ["Equal groups, arrays and skip counting#3.4(D), 3.4(E)", "Multiplication facts with strategies|mulfacts#3.4(F)", "Multiplying a two-digit number by a one-digit number#3.4(G)", "Multiplication word problems and area#3.4(K), 3.5(B), 3.5(C), 3.6(C)"]],
      ["Division", ["Sharing equally and making equal groups#3.4(H)", "Division facts from multiplication|divfacts#3.4(F), 3.4(J)", "Division word problems; even and odd#3.4(K), 3.4(I), 3.5(B)"]],
      ["Algebraic reasoning", ["Finding the unknown factor or product#3.5(D)", "Two-step problems with all four operations#3.4(A), 3.5(A), 3.5(B)", "Input-output tables and number pairs#3.5(E)"]],
      ["Data and personal finance", ["Frequency tables, dot plots and scaled graphs#3.8(A), 3.8(B)", "Coins and bills; earning, saving, spending and credit#3.4(C), 3.9(A)-(F)"]],
      ["Geometry", ["Sorting 2D and 3D figures#3.6(A)", "Quadrilaterals#3.6(B)"]],
      ["Fractions", ["Unit fractions and fractions of a whole#3.3(A), 3.3(C)", "Fractions on a number line#3.3(B), 3.7(A)", "Building fractions from unit fractions#3.3(D)", "Sharing problems with fractions; equal-area parts#3.3(E), 3.6(E)", "Equivalent fractions#3.3(F), 3.3(G)", "Comparing fractions#3.3(H)"]],
      ["Measurement", ["Area of rectangles and composite figures#3.6(C), 3.6(D)", "Perimeter and missing side lengths#3.7(B)", "Time intervals, liquid volume and weight#3.7(C), 3.7(D), 3.7(E)"]],
      ["STAAR review", ["STAAR-style review: numbers and operations#3.2, 3.4, 3.5", "STAAR-style review: fractions, geometry and measurement#3.3, 3.6, 3.7"]],
      ["Getting ready for Grade 4", ["Place value to 1,000,000#4.2(B)", "Multiplying by one-digit numbers|multimul#4.4(D)", "Division with remainders|longdiv#4.4(E), 4.4(F)", "Equivalent fractions and decimals#4.3(C), 4.2(G)"]],
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
    // Texas TEKS for English Language Arts and Reading, Grade 2 (19 TAC 110.4).
    2: [
      ["Phonics and story basics", ["Short and long vowels; open and closed syllables#2.2(B)(i)", "Silent e and vowel teams#2.2(B)(i)", "Bossy r: ar, or, er, ir, ur#2.2(B)(i)", "Story elements: characters, setting and plot#2.8(B), 2.8(C), 2.8(D)"]],
      ["Fiction", ["Main character traits, inside and out#2.8(B)", "Plot: problem, main events and solution#2.8(C)", "Making predictions and inferences#2.6(C), 2.6(F)", "Theme: the lesson of a story#2.8(A)"]],
      ["Word study", ["Vowel sounds oi, oy, ou, ow; contractions#2.2(B)(i), 2.2(B)(iii)", "Prefixes un-, re- and dis-#2.3(C)", "Suffixes -er, -or, -ful, -less and -ly#2.3(C)", "Synonyms, antonyms and context clues#2.3(B), 2.3(D)"]],
      ["Informational text", ["Central idea and supporting details#2.9(D)(i)", "Text features: headings, captions, diagrams#2.9(D)(ii), 2.10(C)", "Order of events and cause and effect#2.9(D)(iii)", "Author's purpose#2.10(A)"]],
      ["Grammar", ["Nouns: common, proper, singular and plural#2.11(D)(iii)", "Verbs: past, present and future#2.11(D)(ii)", "Adjectives, articles and adverbs#2.11(D)(iv), 2.11(D)(v)", "Pronouns and prepositions#2.11(D)(vi), 2.11(D)(vii)"]],
      ["Folktales, poetry and drama", ["Fables and folktales#2.9(A)", "Fairy tales: comparing versions#2.9(A)", "Poetry: rhyme, rhythm, repetition and alliteration#2.9(B), 2.10(D)", "Drama: reading a play#2.9(C)"]],
      ["Writing conventions", ["Complete sentences and subject-verb agreement#2.11(D)(i)", "Joining with and, but, or#2.11(D)(viii)", "Capital letters for months, days and names#2.11(D)(ix)", "End marks, apostrophes, and commas in lists and dates#2.11(D)(x)"]],
      ["Writing and research", ["Personal narratives#2.12(A)", "How-to and informational writing#2.12(B)", "Letters and thank-you notes#2.12(C)", "Opinion texts and research questions#2.9(E), 2.13(A)"]],
      ["Getting ready for Grade 3", ["Reading longer words: syllable types#3.2(A)", "Theme and character motivation#3.8(A), 3.8(B)", "Central idea and text structure#3.9(D)", "Compound sentences and dialogue punctuation#3.11(D)"]],
    ],
    // Texas TEKS for English Language Arts and Reading, Grade 3 (19 TAC 110.5).
    3: [
      ["Reading strategies", ["Decoding multisyllable words#3.2(A)", "Homophones and spelling patterns#3.2(B)", "Making inferences with evidence#3.6(F), 3.6(G)", "Retelling and summarizing#3.7(D)"]],
      ["Fiction", ["Theme#3.8(A)", "Character feelings, traits and motivations#3.8(B)", "Plot: rising action, climax and resolution#3.8(C)", "Setting and how it shapes the plot#3.8(D)"]],
      ["Vocabulary", ["Prefixes and suffixes#3.3(C)", "Context clues and multiple-meaning words#3.3(B)", "Synonyms, antonyms and homographs#3.3(D)", "Similes and metaphors#3.10(D)"]],
      ["Informational text", ["Central idea and supporting details#3.9(D)(i)", "Text features#3.9(D)(ii)", "Text structures: compare, cause and effect, problem and solution#3.9(D)(iii)", "Author's purpose and message#3.10(A)"]],
      ["Grammar", ["Compound sentences with coordinating conjunctions#3.11(D)(i)", "Verb tenses and irregular verbs#3.11(D)(ii)", "Plural, collective and possessive nouns#3.11(D)(iii)", "Adjectives and adverbs that compare#3.11(D)(iv), 3.11(D)(v)"]],
      ["Genres", ["Folktales, fables and myths#3.9(A)", "Poetry: rhyme, meter and stanzas#3.9(B)", "Drama: dialogue and stage directions#3.9(C)", "Persuasive texts: claims and reasons#3.9(E)"]],
      ["Conventions", ["Pronouns#3.11(D)(vi)", "Capitalizing titles and places#3.11(D)(viii)", "Commas, apostrophes and quotation marks#3.11(D)(ix)", "Editing for complete sentences#3.11(D)(i)"]],
      ["Writing and STAAR review", ["Personal narratives and stories#3.12(A)", "Informational writing#3.12(B)", "Opinion writing#3.12(C)", "STAAR-style reading review#3.6, 3.8, 3.9"]],
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

// Grades written week by week against the Texas TEKS, including their own preview of next year.
export const TEKS = { math: ["2", "3"], english: ["2", "3"] };
export const isTeks = (subject, grade) => TEKS[subject].includes(grade);

function parse(raw) {
  const [head, teks] = raw.split("#");
  const [name, op] = head.split("|");
  return { name, op, teks };
}

function topicFrom(subject, grade, unit, week, raw, extra = {}) {
  return { id: `${subject}-${grade}-w${week}`, subject, grade, unit, week, ...parse(raw), unitTitle: SCOPE[subject][grade][unit - 1]?.[0], ...extra };
}

const NEXT_PREVIEW = "Getting ready for ";
const yearCache = {};
// All 36 weekly topics for one subject in a grade's course.
export function year(subject, grade) {
  const key = subject + grade;
  if (yearCache[key]) return yearCache[key];
  const weeks = [];
  const ng = nextGrade(grade);
  SCOPE[subject][grade].forEach(([title, topics], u) =>
    topics.forEach((t) => {
      const w = weeks.length + 1;
      // A grade's own "Getting ready" unit holds next year's topics.
      const bridge = title.startsWith(NEXT_PREVIEW);
      weeks.push(topicFrom(subject, grade, u + 1, w, t, bridge ? { grade: ng, bridge: true } : {}));
    }),
  );
  if (weeks.length < WEEKS && ng) {
    // Otherwise the last unit previews the first topic of next year's first units.
    const unit = SCOPE[subject][grade].length + 1;
    const title = `${NEXT_PREVIEW}${gradeLabel(ng)}`;
    for (let i = 0; weeks.length < WEEKS; i++) {
      const [, topics] = SCOPE[subject][ng][i];
      weeks.push({ ...topicFrom(subject, ng, i + 1, 0, topics[0]), id: `${subject}-${grade}-w${weeks.length + 1}`, unit, week: weeks.length + 1, unitTitle: title, bridge: true });
    }
  } else if (weeks.length < WEEKS) {
    const unit = SCOPE[subject][grade].length + 1;
    for (let i = 0; weeks.length < WEEKS; i++)
      weeks.push({ id: `${subject}-${grade}-w${weeks.length + 1}`, subject, grade, unit, week: weeks.length + 1, name: `Review: ${SCOPE[subject][grade][i * 2][0]} and ${SCOPE[subject][grade][i * 2 + 1][0]}`, unitTitle: "Year review", review: true });
  }
  if (weeks.length !== WEEKS) throw new Error(`${subject} ${grade} has ${weeks.length} weeks`);
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
