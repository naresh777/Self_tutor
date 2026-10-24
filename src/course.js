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
      ["Numbers to 10", ["Counting objects to 10|count:10", "Writing numbers 0 to 10|numwrite:10", "Comparing groups: more and fewer|cmpgrp:10", "Number order to 10|order:10"]],
      ["Shapes", ["Circles, squares, triangles and rectangles|flat:k", "Shapes around us|flat:real", "Flat and solid shapes|flatsolid", "Position words: above, below, beside|position"]],
      ["Adding within 5", ["Putting together|addpic:5", "Adding with pictures|add10", "Addition sentences|addpic:5", "Adding stories|tale:j5"]],
      ["Subtracting within 5", ["Taking away|subpic:5", "Subtracting with pictures|sub10", "Subtraction sentences|subpic:5", "Take-away stories|tale:t5"]],
      ["Numbers to 20", ["Counting to 20|count:20", "Teen numbers: ten and some ones|teen", "Writing numbers to 20|numwrite:20", "Comparing numbers to 20|cmpnum:20"]],
      ["Adding and subtracting within 10", ["Making 5|make:5", "Making 10|make:10", "Adding within 10|add10", "Subtracting within 10|sub10"]],
      ["Measuring and sorting", ["Longer and shorter|len", "Heavier and lighter|weigh", "Sorting into groups|sort", "Counting groups after sorting|sort:count"]],
      ["Counting to 100", ["Counting by ones to 100|by:1", "Counting by tens|by:10", "Patterns on a hundred chart|chart", "Adding and subtracting review|add10"]],
    ],
    1: [
      ["Addition strategies", ["Counting on|add20", "Doubles and near doubles|add20", "Making 10 to add|add20", "Adding three numbers|add3n"]],
      ["Subtraction strategies", ["Counting back|sub20", "Think addition to subtract|sub20", "Fact families|family", "Missing numbers in equations|missing"]],
      ["Story problems", ["Adding to and putting together|tale:j20", "Taking from and taking apart|tale:t20", "Comparing story problems|tale:c20", "Two-step stories within 20|tale:s"]],
      ["Place value", ["Tens and ones|pv2", "Numbers to 120|mix:pv2:120+order:120+by:1", "Comparing two-digit numbers (<, >, =)|cmpnum:99", "10 more and 10 less|tenmore"]],
      ["Adding two-digit numbers", ["Adding tens|tens:add", "Adding a one-digit number to a two-digit number|tens:one", "Adding a multiple of 10|tens:m10", "Subtracting multiples of 10|tens:sub"]],
      ["Length and time", ["Ordering by length|len:order", "Measuring with units|len:units", "Telling time to the hour|clock", "Telling time to the half hour|clock:half"]],
      ["Data", ["Tally charts|tallyq", "Picture graphs|graph", "Reading bar graphs|graph", "Answering questions about data|mix:graph+tallyq"]],
      ["Shapes and fractions", ["2D and 3D shapes|mix:flat+flatsolid+solids", "Building new shapes|mix:solids+flat", "Halves|half:2", "Fourths (quarters)|half:4"]],
    ],
    // Texas TEKS (19 TAC 111.4), in the unit order of Frisco ISD's 2025-26 Grade 2 math scope and sequence.
    // Texas TEKS (19 TAC 111.4), in the unit order of Frisco ISD's 2025-26 Grade 2 math scope and sequence.
    2: [
      ["Fact strategies", ["Addition facts to 20: make a ten and doubles|add20#2.4(A)", "Subtraction facts to 20: think addition|sub20#2.4(A)"]],
      ["Numbers to 1,200", ["Hundreds, tens and ones with base-ten blocks|pv3#2.2(A)", "Building numbers to 1,200 with thousands|pv4#2.2(A)", "Standard, word and expanded form|forms#2.2(B)", "Making a number more than one way|compose#2.2(A), 2.2(B)"]],
      ["Comparing numbers to 1,200", ["Comparing and ordering with >, < and =|cmp:1200#2.2(C), 2.2(D)", "Open number lines and 10 or 100 more or less|moreless#2.2(E), 2.2(F), 2.7(B)"]],
      ["Adding and subtracting two-digit numbers", ["Adding two-digit numbers with mental math|add2#2.4(B)", "Adding up to four two-digit numbers|add4#2.4(B)", "Subtracting two-digit numbers|sub2#2.4(B)"]],
      ["Adding and subtracting to 1,000", ["Adding three-digit numbers with place value|add3#2.4(C)", "Subtracting three-digit numbers with place value|sub3#2.4(C)", "Word problems with the unknown in any spot|wp#2.7(C), 2.4(D)"]],
      ["Data analysis", ["Pictographs and bar graphs|graph#2.10(A), 2.10(B)", "Solving problems with graphs|graph#2.10(C), 2.10(D)"]],
      ["Money", ["First-semester review: place value and adding|mix:pv3+forms+cmp:1200+add2+sub2+add3+sub3#2.2, 2.4", "Coin values and counting coins to one dollar|coins#2.5(A)", "Writing money with ¢, $ and a decimal point|money#2.5(B)"]],
      ["Geometry", ["2D shapes: sides and vertices|shapes2#2.8(A), 2.8(C)", "3D solids and putting shapes together and apart|solids#2.8(B), 2.8(D), 2.8(E)"]],
      ["Fractions", ["Halves, fourths and eighths|frac2#2.3(A), 2.3(D)", "More parts make smaller parts; counting parts past one whole|frac2b#2.3(B), 2.3(C)"]],
      ["Time", ["Time to the minute, a.m. and p.m.|time#2.9(G)"]],
      ["Measurement", ["Measuring length with rulers and units|measure#2.9(A), 2.9(B), 2.9(D)", "Length problems, number line distances and area|length#2.9(C), 2.9(E), 2.9(F)"]],
      ["Adding and subtracting to 1,000, part 2", ["Regrouping across tens and hundreds|regroup#2.4(C)", "Multi-step word problems|multistep#2.4(C), 2.7(C)", "Writing a story for a number sentence|story#2.4(D)"]],
      ["Multiplication and division", ["Equal groups: joining sets to multiply|groups#2.6(A)", "Sharing equally to divide; even and odd|share#2.6(B), 2.7(A)"]],
      ["Personal financial literacy", ["Saving, spending, deposits and withdrawals|fin#2.11(A), 2.11(B), 2.11(C)", "Borrowing, lending, producers and consumers|fin:b#2.11(D), 2.11(E), 2.11(F)"]],
      ["Getting ready for Grade 3", ["Place value to 100,000 and rounding|mix:pv5+round#3.2(A), 3.2(C)", "Adding and subtracting within 1,000 with estimation|mix:est+add3+sub3#3.4(A), 3.4(B)", "Multiplication with equal groups and arrays|arrays#3.4(D), 3.4(E)"]],
    ],
    // Texas TEKS (19 TAC 111.5), in the unit order of Frisco ISD's 2025-26 Grade 3 math scope and sequence.
    // Texas TEKS (19 TAC 111.5), in the unit order of Frisco ISD's 2025-26 Grade 3 math scope and sequence.
    3: [
      ["Foundation of numbers", ["Place value to 100,000|pv5#3.2(A), 3.2(B)", "Comparing and ordering numbers to 100,000|cmp:100000#3.2(D)", "Number lines and rounding|round#3.2(C)"]],
      ["Addition and subtraction", ["Estimating sums and differences|est#3.4(B)", "Adding within 1,000 fluently|add3#3.4(A)", "Subtracting within 1,000 fluently|regroup#3.4(A)", "Two-step problems with strip diagrams; perimeter|mix:twostep+perim#3.5(A), 3.7(B)"]],
      ["Multiplication", ["Equal groups, arrays and skip counting|arrays#3.4(D), 3.4(E)", "Multiplication facts with strategies|mulfacts#3.4(F)", "Multiplying a two-digit number by a one-digit number|mul21#3.4(G)", "Multiplication word problems and area|mulwp#3.4(K), 3.5(B), 3.5(C), 3.6(C)"]],
      ["Division", ["Sharing equally and making equal groups|share3#3.4(H)", "Division facts from multiplication|divfacts#3.4(F), 3.4(J)", "Division word problems; even and odd|divwp#3.4(K), 3.4(I), 3.5(B)"]],
      ["Algebraic reasoning", ["Finding the unknown factor or product|unknown#3.5(D)", "Two-step problems with all four operations|twostep:4#3.4(A), 3.5(A), 3.5(B)", "Input-output tables and number pairs|io#3.5(E)"]],
      ["Data and personal finance", ["Frequency tables, dot plots and scaled graphs|mix:graph:3+graph:dot#3.8(A), 3.8(B)", "Coins and bills; earning, saving, spending and credit|money3#3.4(C), 3.9(A)-(F)"]],
      ["Geometry", ["Sorting 2D and 3D figures|shapes3#3.6(A)", "Quadrilaterals|quad#3.6(B)"]],
      ["Fractions", ["Unit fractions and fractions of a whole|frac3#3.3(A), 3.3(C)", "Fractions on a number line|fracnl#3.3(B), 3.7(A)", "Building fractions from unit fractions|fracbuild#3.3(D)", "Sharing problems with fractions; equal-area parts|fracshare#3.3(E), 3.6(E)", "Equivalent fractions|fraceq#3.3(F), 3.3(G)", "Comparing fractions|fraccmp#3.3(H)"]],
      ["Measurement", ["Area of rectangles and composite figures|area3#3.6(C), 3.6(D)", "Perimeter and missing side lengths|perim#3.7(B)", "Time intervals, liquid volume and weight|time3#3.7(C), 3.7(D), 3.7(E)"]],
      ["STAAR review", ["STAAR-style review: numbers and operations|mix:pv5+round+add3+regroup+mulfacts+divfacts+unknown+twostep:4+io#3.2, 3.4, 3.5", "STAAR-style review: fractions, geometry and measurement|mix:frac3+fracnl+fraceq+fraccmp+quad+area3+perim+time3#3.3, 3.6, 3.7"]],
      ["Getting ready for Grade 4", ["Place value to 1,000,000|pv5:999999#4.2(B)", "Multiplying by one-digit numbers|multimul#4.4(D)", "Division with remainders|divrem#4.4(E), 4.4(F)", "Equivalent fractions and decimals|mix:fraceq+decfrac#4.3(C), 4.2(G)"]],
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
      ["Letters", ["Uppercase letters|e:letters:upper", "Lowercase letters|e:letters:lower", "Matching uppercase and lowercase|e:letters:match", "Letters in words|e:letters"]],
      ["Sounds", ["Beginning sounds|e:sound", "Ending sounds|e:sound:end", "Rhyming words|e:rhyme", "Clapping syllables|e:clap"]],
      ["Short vowels", ["Short a words|e:short:a", "Short i words|e:short:i", "Short o words|e:short:o", "Short e and u words|e:short:eu"]],
      ["Sight words", ["Sight words: the, a, I, see|e:sight:0", "Sight words: is, and, can, we|e:sight:1", "Sight words: like, to, go, my|e:sight:2", "Reading short sentences|mix:e:sentk+e:sight"]],
      ["Stories", ["Who is in the story|read:character", "Where the story happens|read:setting", "First, next, last|read:sequence", "Retelling a story|read:summary,sequence"]],
      ["Information", ["Facts from a short text|read:details,central", "Asking and answering questions|read:details,infer", "Pictures and words together|read:picture", "New words in a text|read:vocab"]],
      ["Writing", ["Capital letters|e:capk", "Periods and question marks|e:kind:k", "Writing a sentence|e:sentk", "Nouns: people, places, things|e:nounk"]],
      ["Words", ["Action words (verbs)|e:nounk:verb", "Plurals with s|e:plural:s", "Opposites|e:opp", "Sorting words into groups|e:cat"]],
    ],
    1: [
      ["Phonics", ["Short vowels review|e:short:all", "Consonant blends (bl, st, tr)|e:blend", "Digraphs: sh, ch, th, wh|e:digraph", "Endings -ng and -nk|e:ngnk"]],
      ["Long vowels", ["Silent e (cake, bike)|e:silent", "Vowel teams ai and ay|e:team:aiay", "Vowel teams ee and ea|e:team:eeea", "Vowel teams oa and ow|e:team:oaow"]],
      ["Reading stories", ["Characters and setting|read:character,setting", "Beginning, middle and end|read:sequence,plot", "Feelings in a story|read:feelings", "The lesson of a story|read:theme"]],
      ["Reading information", ["Main topic|read:central", "Key details|read:details", "Titles and labels|read:features", "Comparing two texts|read:compare"]],
      ["Grammar", ["Common and proper nouns|e:nouns", "One and more than one|e:plural", "Verbs: past, present, future|e:verbs", "Pronouns: I, me, he, she|e:pron1"]],
      ["Sentences", ["Complete sentences|e:sentence", "Statements, questions and exclamations|e:kind", "Adjectives|e:adj1", "Joining words: and, but, or|e:conj"]],
      ["Words", ["Compound words|e:compound1", "Endings -ed and -ing|e:ending", "Words that sound alike|e:homophone", "Sorting words by category|e:cat"]],
      ["Writing", ["Capital letters for names and dates|e:caps", "Commas in dates and lists|e:comma1", "Writing an opinion|w:opinion", "Writing how to do something|w:howto"]],
    ],
    // Texas TEKS for English Language Arts and Reading, Grade 2 (19 TAC 110.4).
    2: [
      ["Phonics and story basics", ["Short and long vowels; open and closed syllables|e:vowels#2.2(B)(i)", "Silent e and vowel teams|e:vteams#2.2(B)(i)", "Bossy r: ar, or, er, ir, ur|e:rcontrol#2.2(B)(i)", "Story elements: characters, setting and plot|read:elements,setting,plot#2.8(B), 2.8(C), 2.8(D)"]],
      ["Fiction", ["Main character traits, inside and out|read:character#2.8(B)", "Plot: problem, main events and solution|read:plot#2.8(C)", "Making predictions and inferences|read:infer#2.6(C), 2.6(F)", "Theme: the lesson of a story|read:theme#2.8(A)"]],
      ["Word study", ["Vowel sounds oi, oy, ou, ow; contractions|e:diph#2.2(B)(i), 2.2(B)(iii)", "Prefixes un-, re- and dis-|e:prefix#2.3(C)", "Suffixes -er, -or, -ful, -less and -ly|e:suffix#2.3(C)", "Synonyms, antonyms and context clues|e:syn#2.3(B), 2.3(D)"]],
      ["Informational text", ["Central idea and supporting details|read:central#2.9(D)(i)", "Text features: headings, captions, diagrams|read:features#2.9(D)(ii), 2.10(C)", "Order of events and cause and effect|read:cause,structure#2.9(D)(iii)", "Author's purpose|read:purpose#2.10(A)"]],
      ["Grammar", ["Nouns: common, proper, singular and plural|e:nouns#2.11(D)(iii)", "Verbs: past, present and future|e:verbs#2.11(D)(ii)", "Adjectives, articles and adverbs|e:adj#2.11(D)(iv), 2.11(D)(v)", "Pronouns and prepositions|e:pronoun#2.11(D)(vi), 2.11(D)(vii)"]],
      ["Folktales, poetry and drama", ["Fables and folktales|read:fable#2.9(A)", "Fairy tales: comparing versions|read:fairy,compare#2.9(A)", "Poetry: rhyme, rhythm, repetition and alliteration|read:poem#2.9(B), 2.10(D)", "Drama: reading a play|read:drama#2.9(C)"]],
      ["Writing conventions", ["Complete sentences and subject-verb agreement|e:sentence#2.11(D)(i)", "Joining with and, but, or|e:conj#2.11(D)(viii)", "Capital letters for months, days and names|e:caps#2.11(D)(ix)", "End marks, apostrophes, and commas in lists and dates|mix:e:punct+e:diph#2.11(D)(x)"]],
      ["Writing and research", ["Personal narratives|w:narrative#2.12(A)", "How-to and informational writing|w:howto#2.12(B)", "Letters and thank-you notes|w:letter#2.12(C)", "Opinion texts and research questions|w:opinion#2.9(E), 2.13(A)"]],
      ["Getting ready for Grade 3", ["Reading longer words: syllable types|e:syllables#3.2(A)", "Theme and character motivation|read:theme,character#3.8(A), 3.8(B)", "Central idea and text structure|read:central,structure#3.9(D)", "Compound sentences and dialogue punctuation|e:compound#3.11(D)"]],
    ],
    // Texas TEKS for English Language Arts and Reading, Grade 3 (19 TAC 110.5).
    3: [
      ["Reading strategies", ["Decoding multisyllable words|e:syllables#3.2(A)", "Homophones and spelling patterns|e:homophone#3.2(B)", "Making inferences with evidence|read:infer#3.6(F), 3.6(G)", "Retelling and summarizing|read:summary#3.7(D)"]],
      ["Fiction", ["Theme|read:theme#3.8(A)", "Character feelings, traits and motivations|read:character#3.8(B)", "Plot: rising action, climax and resolution|read:plot#3.8(C)", "Setting and how it shapes the plot|read:setting#3.8(D)"]],
      ["Vocabulary", ["Prefixes and suffixes|mix:e:prefix:3+e:suffix:3#3.3(C)", "Context clues and multiple-meaning words|e:context#3.3(B)", "Synonyms, antonyms and homographs|e:syn:3#3.3(D)", "Similes and metaphors|e:figurative#3.10(D)"]],
      ["Informational text", ["Central idea and supporting details|read:central#3.9(D)(i)", "Text features|read:features#3.9(D)(ii)", "Text structures: compare, cause and effect, problem and solution|read:structure,cause#3.9(D)(iii)", "Author's purpose and message|read:purpose#3.10(A)"]],
      ["Grammar", ["Compound sentences with coordinating conjunctions|e:compound#3.11(D)(i)", "Verb tenses and irregular verbs|e:verbs:3#3.11(D)(ii)", "Plural, collective and possessive nouns|e:nouns:3#3.11(D)(iii)", "Adjectives and adverbs that compare|e:compare#3.11(D)(iv), 3.11(D)(v)"]],
      ["Genres", ["Folktales, fables and myths|read:fable#3.9(A)", "Poetry: rhyme, meter and stanzas|read:poem#3.9(B)", "Drama: dialogue and stage directions|read:drama#3.9(C)", "Persuasive texts: claims and reasons|read:persuade#3.9(E)"]],
      ["Conventions", ["Pronouns|e:pronoun:3#3.11(D)(vi)", "Capitalizing titles and places|e:caps:3#3.11(D)(viii)", "Commas, apostrophes and quotation marks|e:punct:3#3.11(D)(ix)", "Editing for complete sentences|e:sentence:3#3.11(D)(i)"]],
      ["Writing and STAAR review", ["Personal narratives and stories|w:narrative#3.12(A)", "Informational writing|w:howto#3.12(B)", "Opinion writing|w:opinion#3.12(C)", "STAAR-style reading review|read:theme,character,plot,central,purpose,structure,infer,vocab#3.6, 3.8, 3.9"]],
    ],
    4: [
      ["Reading stories", ["Theme|read:theme", "Characters, setting and events", "First and third person", "Stories from different cultures"]],
      ["Reading information", ["Main idea and summary|read:central,summary", "Explaining events and ideas", "Text structure", "Firsthand and secondhand accounts"]],
      ["Vocabulary", ["Context clues|e:context", "Greek and Latin roots", "Similes and metaphors", "Idioms, adages and proverbs"]],
      ["Grammar", ["Relative pronouns and adverbs|e:relative", "Progressive verb tenses", "Helping verbs: can, may, must", "Order of adjectives"]],
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
