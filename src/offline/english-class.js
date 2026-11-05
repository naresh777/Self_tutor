// Grade 2 English practice that follows the order her class teaches: each week pairs a phonics
// skill with a grammar skill (digraphs, soft c and g, schwa, the floss rule, r-controlled vowels,
// multisyllable silent e; capitals, sentence types, editing, agreement, adjectives, adverbs,
// prepositions), plus parts of a book and poem forms and sounds.
import { rnd, pick, sample, shuffle, choice, word, NAMES } from "./util.js";

const who = () => pick(NAMES);
const oddOne = (q, right, wrongPool, steps, more) => choice(q, pick(right), sample(wrongPool, 3), steps, more);
const PLAIN = ["cat", "dog", "map", "sun", "pig", "bed", "frog", "jump", "milk", "hand", "lamp", "rug", "nest", "drum"];

/* ---------------- consonant digraphs ---------------- */
const DIG = {
  sh: [["ship", "a boat"], ["fish", "it swims"], ["shell", "you find it at the beach"], ["dish", "you eat from it"], ["brush", "for your hair"], ["sheep", "it says baa"], ["shop", "a store"], ["wish", "on a star"]],
  ch: [["chin", "below your mouth"], ["chair", "you sit on it"], ["lunch", "a midday meal"], ["cheese", "mice love it"], ["peach", "a fuzzy fruit"], ["bench", "a long seat"], ["chick", "a baby hen"], ["chop", "cut with an axe"]],
  th: [["thumb", "on your hand"], ["bath", "wash in a tub"], ["three", "the number 3"], ["tooth", "in your mouth"], ["math", "a school subject"], ["moth", "a night bug"], ["thin", "not thick"], ["path", "a trail"]],
  wh: [["whale", "a huge sea animal"], ["wheel", "a bike has two"], ["white", "the color of snow"], ["whip", "cream on top"], ["whisker", "on a cat's face"], ["wheat", "used to make bread"]],
  ck: [["duck", "it quacks"], ["sock", "on your foot"], ["clock", "it tells time"], ["truck", "a big car"], ["rock", "a stone"], ["back", "behind you"], ["kick", "a soccer move"], ["neck", "under your head"]],
  ph: [["phone", "you call people on it"], ["graph", "a chart"], ["photo", "a picture"], ["dolphin", "a smart sea animal"], ["elephant", "it has a trunk"], ["alphabet", "a to z"]],
  ng: [["ring", "on your finger"], ["king", "wears a crown"], ["swing", "at the playground"], ["wing", "a bird has two"], ["song", "you sing it"], ["long", "not short"]],
};
const SOUND = { sh: "/sh/ like shh, be quiet", ch: "/ch/ like a train, choo-choo", th: "/th/ with your tongue between your teeth", wh: "/w/ like in whale", ck: "/k/ at the end of a short word", ph: "/f/ like in phone", ng: "/ng/ at the end, like in ring" };
const digraph = (lvl) => {
  const keys = lvl === 1 ? ["sh", "ch", "th", "wh"] : Object.keys(DIG);
  const d = pick(keys), [w, clue] = pick(DIG[d]);
  const others = Object.entries(DIG).filter(([k]) => k !== d).flatMap(([, ws]) => ws.map((x) => x[0])).filter((x) => !x.includes(d));
  const k = rnd(0, 3);
  if (k === 0) return oddOne(`Which word has the digraph "${d}"?`, DIG[d].map((x) => x[0]), [...PLAIN, ...others], [`A digraph is two letters that make one sound.`, `"${d}" says ${SOUND[d]}.`]);
  if (k === 1) {
    const blank = w.replace(d, "__");
    return choice(`Which digraph completes the word? ${blank} (${clue})`, d, sample(keys.filter((x) => x !== d), 3), [`Say the word: ${w}.`, `${w} is spelled with ${d}.`], { hint: `Say the word for "${clue}" and listen.` });
  }
  if (k === 2) return choice(`What sound does "${d}" make?`, SOUND[d].split(" ")[0], sample(Object.keys(SOUND).filter((x) => x !== d && SOUND[x].split(" ")[0] !== SOUND[d].split(" ")[0]).map((x) => SOUND[x].split(" ")[0]), 3), [`The two letters ${d.split("").join(" and ")} work together.`, `"${d}" says ${SOUND[d]}, like in "${w}".`]);
  return choice("A consonant digraph is…", "two consonants that make one new sound", ["two vowels that make one sound", "a letter that makes no sound", "a word with two syllables"], ["Digraphs are teams of consonants like sh, ch, th and wh.", "Together they make one new sound: sh in ship."]);
};

/* ---------------- sentence types ---------------- */
const STYPES = [
  ["Where is my backpack?", "question"], ["Can we go to the park?", "question"], ["What time is lunch?", "question"], ["Do you like pizza?", "question"],
  ["The library opens at nine.", "statement"], ["My cat sleeps on my bed.", "statement"], ["We have art on Tuesday.", "statement"], ["The sky is blue today.", "statement"],
  ["Wow, we won the game!", "exclamation"], ["Watch out for the puddle!", "exclamation"], ["I love this song!", "exclamation"], ["Hooray, it snowed!", "exclamation"],
];
const TNAME = { statement: "statement (it tells)", question: "question (it asks)", exclamation: "exclamation (strong feeling)" };
const MARK = { statement: ".", question: "?", exclamation: "!" };
const stype = () => {
  const [s, t] = pick(STYPES), k = rnd(0, 2);
  const why = ["A statement tells something and ends with a period (.).", "A question (interrogative) asks something and ends with a question mark (?).", "An exclamation (exclamatory) shows strong feeling and ends with an exclamation point (!)."];
  if (k === 0) return choice(`What kind of sentence is this?\n"${s}"`, TNAME[t], Object.values(TNAME).filter((x) => x !== TNAME[t]), [...why, `"${s}" is a ${t}.`], { keepOrder: Object.values(TNAME) });
  if (k === 1) return choice(`Which end mark belongs at the end?\n"${s.slice(0, -1)}___"`, MARK[t], [".", "?", "!"].filter((x) => x !== MARK[t]), [...why, `It is a ${t}, so it ends with ${MARK[t]}`], { keepOrder: [".", "?", "!"] });
  const want = pick(["statement", "question", "exclamation"]);
  const right = pick(STYPES.filter((x) => x[1] === want))[0];
  return choice(`Which sentence is ${want === "exclamation" ? "an exclamation" : "a " + want}?`, right, ["statement", "question", "exclamation"].filter((x) => x !== want).map((x) => pick(STYPES.filter((y) => y[1] === x))[0]), [...why, `"${right}" is ${want === "exclamation" ? "an exclamation" : "a " + want}.`]);
};

/* ---------------- open and closed syllables ---------------- */
const OPENW = [["ti-ger", "ti"], ["ro-bot", "ro"], ["mu-sic", "mu"], ["ba-by", "ba"], ["pa-per", "pa"], ["ze-ro", "ze"], ["o-pen", "o"], ["hu-man", "hu"]];
const CLOSEDW = [["bas-ket", "bas"], ["rab-bit", "rab"], ["nap-kin", "nap"], ["sun-set", "sun"], ["muf-fin", "muf"], ["pic-nic", "pic"], ["kit-ten", "kit"], ["hel-met", "hel"]];
const opensyl = () => {
  const k = rnd(0, 2);
  const why = ["An open syllable ends with a vowel, so the vowel is long (says its name).", "A closed syllable ends with a consonant, so the vowel is short."];
  if (k === 0) {
    const open = rnd(0, 1), [split, first] = pick(open ? OPENW : CLOSEDW);
    return choice(`In "${split}", is the first syllable "${first}" open or closed?`, open ? "open" : "closed", [open ? "closed" : "open"], [...why, `"${first}" ends with ${open ? "a vowel" : "a consonant"}, so it is ${open ? "open" : "closed"}.`], { keepOrder: ["open", "closed"] });
  }
  if (k === 1) {
    const [split] = pick(OPENW);
    return choice("Which word starts with an open syllable (a long vowel sound)?", split.replace("-", ""), sample(CLOSEDW, 3).map((x) => x[0].replace("-", "")), [...why, `${split}: the first syllable ends with a vowel.`]);
  }
  const [w, t] = pick([["me", "open"], ["go", "open"], ["she", "open"], ["hi", "open"], ["cat", "closed"], ["sit", "closed"], ["hop", "closed"], ["bed", "closed"]]);
  return choice(`Is "${w}" an open or closed syllable?`, t, [t === "open" ? "closed" : "open"], [...why, `"${w}" ends with ${t === "open" ? "a vowel" : "a consonant"}.`], { keepOrder: ["open", "closed"] });
};

/* ---------------- editing ---------------- */
const MARKS = [
  ["three short lines under a letter (≡)", "Make it a capital letter"],
  ["a slash through a capital letter (/)", "Make it a lowercase letter"],
  ["a caret (^) between words", "Add a word or letter here"],
  ["a circle around a dot (⊙)", "Add a period"],
  ["a line through a word with a loop at the end", "Take it out (delete)"],
  ["a circle around a word with \"sp\"", "Check the spelling"],
];
const FIX = [
  ["my dog likes to run.", "My dog likes to run.", "The first word of a sentence starts with a capital letter."],
  ["We went to the park with ava.", "We went to the park with Ava.", "Names of people start with a capital letter."],
  ["The cat sat on the mat", "The cat sat on the mat.", "A telling sentence ends with a period."],
  ["Where is my shoe.", "Where is my shoe?", "A question ends with a question mark."],
  ["The birds sings in the tree.", "The birds sing in the tree.", "More than one bird: use \"sing,\" not \"sings.\""],
  ["i like to read books.", "I like to read books.", "The word I is always a capital letter."],
  ["We have soccer on monday.", "We have soccer on Monday.", "Days of the week start with a capital letter."],
  ["She have a red bike.", "She has a red bike.", "One person: use \"has.\""],
];
const edit = () => {
  const k = rnd(0, 2);
  if (k === 0) { const [m, mean] = pick(MARKS); return choice(`What does this editing mark mean: ${m}?`, mean, MARKS.filter((x) => x[1] !== mean).map((x) => x[1]), ["Editing marks show what to fix when you check your writing.", `${m} means: ${mean.toLowerCase()}.`]); }
  const [bad, good, why] = pick(FIX);
  if (k === 1) {
    const wrongs = [bad, bad.replace(/[.?!]?$/, (m) => (m === "" ? "?" : m === "!" ? "." : "!")), bad.toLowerCase(), bad.replace(/^./, (c) => c.toUpperCase()).replace(/[.?!]?$/, "")].filter((x) => x !== good);
    return choice(`Which is the correct way to fix this sentence?\n"${bad}"`, good, wrongs, [`Look for capitals, end marks and words that match.`, why, `Fixed: "${good}"`]);
  }
  return choice("Which sentence is written correctly?", good, [bad, ...sample(FIX.filter((x) => x[0] !== bad).map((x) => x[0]), 2)], ["Check: capital at the start, capitals for names and days, the right end mark, and verbs that match.", `"${good}" is correct.`]);
};

/* ---------------- silent e ---------------- */
const VCE = [["cap", "cape"], ["kit", "kite"], ["hop", "hope"], ["tub", "tube"], ["pin", "pine"], ["not", "note"], ["mad", "made"], ["cut", "cute"], ["rid", "ride"], ["tap", "tape"], ["cub", "cube"], ["rob", "robe"], ["man", "mane"], ["dim", "dime"]];
const vce = () => {
  const [s, l] = pick(VCE), k = rnd(0, 2);
  if (k === 0) return choice(`Add a silent e to "${s}". What new word do you make?`, l, [s + "s", s + "y", s.slice(0, -1) + "e"], ["Silent e goes at the end.", `It makes the vowel say its name: ${s} → ${l}.`]);
  if (k === 1) return choice(`Which word has a long vowel because of silent e: "${s}" or "${l}"?`, l, [s], ["Vowel, consonant, e (VCe): the e is quiet and makes the vowel long.", `"${l}" has a silent e.`], { keepOrder: [s, l] });
  const w = pick([s, l]), long = w === l;
  return choice(`Is the vowel in "${w}" short or long?`, long ? "long" : "short", [long ? "short" : "long"], [long ? "It ends with a silent e." : "There is no silent e at the end.", long ? `Silent e makes the vowel long in "${w}".` : `The vowel in "${w}" is short.`], { keepOrder: ["short", "long"] });
};

/* ---------------- subject-verb agreement ---------------- */
const AGREE = [["The dog ___ at the mail carrier.", "barks", "bark"], ["The dogs ___ at the mail carrier.", "bark", "barks"], ["Mia and Leo ___ tag at recess.", "play", "plays"], ["My brother ___ his teeth.", "brushes", "brush"], ["They ___ to school.", "walk", "walks"], ["She ___ a red bike.", "has", "have"], ["We ___ happy today.", "are", "is"], ["My mom ___ at the store.", "is", "are"], ["The birds ___ every morning.", "sing", "sings"], ["Ben ___ milk with lunch.", "drinks", "drink"]];
const agree = () => {
  const [s, a, b] = pick(AGREE);
  if (rnd(0, 1)) return choice(`Which verb matches the subject?\n${s}`, a, [b], ["Find the subject: who or what is doing it?", "One person or thing usually takes a verb ending in -s. More than one does not.", `"${s.replace("___", a)}"`], { keepOrder: [a, b].sort() });
  return choice("Which sentence is correct?", s.replace("___", a), [s.replace("___", b)], ["The subject and verb have to match.", `"${s.replace("___", a)}" is correct.`]);
};

/* ---------------- soft c and g, -ge and -dge ---------------- */
const SOFTC = ["city", "cent", "rice", "face", "pencil", "circle", "mice", "ice", "cereal", "fancy"], HARDC = ["cat", "cup", "cot", "cake", "clap", "corn", "cub", "candy"];
const SOFTG = ["gem", "giant", "page", "cage", "giraffe", "huge", "gym", "germ"], HARDG = ["goat", "gum", "game", "bag", "dog", "gate", "go", "flag"];
const DGE = [["badge", "a pin you wear"], ["edge", "the side of a table"], ["bridge", "it goes over a river"], ["fudge", "a chocolate treat"], ["judge", "decides in court"], ["hedge", "a row of bushes"]];
const GE = [["cage", "a bird's home"], ["page", "part of a book"], ["huge", "very big"], ["large", "big"], ["stage", "where actors stand"], ["change", "to make different"]];
const softcg = () => {
  const k = rnd(0, 3);
  const rule = "c and g make their soft sounds (/s/ and /j/) when e, i or y comes right after them.";
  if (k === 0) { const soft = rnd(0, 1), w = pick(soft ? SOFTC : HARDC); return choice(`Does the c in "${w}" make a soft sound (/s/) or a hard sound (/k/)?`, soft ? "soft /s/" : "hard /k/", [soft ? "hard /k/" : "soft /s/"], [rule, `In "${w}", c is followed by "${w[w.indexOf("c") + 1] || "nothing"}", so it is ${soft ? "soft" : "hard"}.`], { keepOrder: ["soft /s/", "hard /k/"] }); }
  if (k === 1) { const soft = rnd(0, 1), w = pick(soft ? SOFTG : HARDG); return choice(`Does the g in "${w}" make a soft sound (/j/) or a hard sound (/g/)?`, soft ? "soft /j/" : "hard /g/", [soft ? "hard /g/" : "soft /j/"], [rule, `"${w}" has a ${soft ? "soft" : "hard"} g.`], { keepOrder: ["soft /j/", "hard /g/"] }); }
  if (k === 2) { const c = rnd(0, 1); return oddOne(`Which word has a soft ${c ? "c (/s/)" : "g (/j/)"}?`, c ? SOFTC : SOFTG, c ? HARDC : HARDG, [rule, `Listen for ${c ? "/s/" : "/j/"}.`]); }
  const dge = rnd(0, 1), [w, clue] = pick(dge ? DGE : GE), stem = w.replace(/d?ge$/, "");
  return choice(`Which ending completes the word? ${stem}___ (${clue})`, dge ? "dge" : "ge", [dge ? "ge" : "dge"], ["Use -dge right after a short vowel: badge, edge, bridge.", "Use -ge after a long vowel or a consonant: cage, huge, large.", `The word is "${w}".`], { keepOrder: ["ge", "dge"] });
};

/* ---------------- schwa ---------------- */
const SCHWA = [["about", "a-bout", "a"], ["again", "a-gain", "a"], ["away", "a-way", "a"], ["alone", "a-lone", "a"], ["sofa", "so-fa", "a"], ["panda", "pan-da", "a"], ["zebra", "ze-bra", "a"], ["lemon", "lem-on", "o"], ["wagon", "wag-on", "o"], ["seven", "sev-en", "e"], ["pencil", "pen-cil", "i"], ["banana", "ba-nan-a", "a"]];
const schwa = () => {
  const [w, split, v] = pick(SCHWA), k = rnd(0, 2);
  if (k === 0) return choice("The schwa is a lazy vowel sound. What does it sound like?", "/uh/", ["/ee/", "/oo/", "/ch/"], ["In a syllable that isn't stressed, a vowel often gets lazy and says /uh/.", `Like the ${v} in "${w}" (${split}).`]);
  if (k === 1) return oddOne("Which word has a schwa (/uh/) sound?", SCHWA.map((x) => x[0]), ["cat", "ship", "tree", "bike", "frog", "duck"], ["Schwa hides in longer words, in the syllable you don't say strongly.", "One-syllable words like cat or ship don't have it."]);
  return choice(`In "${w}" (${split}), which vowel makes the lazy /uh/ sound?`, v, ["a", "e", "i", "o", "u"].filter((x) => x !== v).slice(0, 3), [`Say it slowly: ${split}.`, `The ${v} in the weaker syllable says /uh/. That's the schwa.`]);
};

/* ---------------- floss rule ---------------- */
const FLOSS = [["bell", "bel"], ["hill", "hil"], ["doll", "dol"], ["puff", "puf"], ["cliff", "clif"], ["stuff", "stuf"], ["miss", "mis"], ["glass", "glas"], ["dress", "dres"], ["buzz", "buz"], ["fizz", "fiz"], ["spell", "spel"], ["grass", "gras"], ["sniff", "snif"]];
const floss = () => {
  const [right, wrong] = pick(FLOSS), k = rnd(0, 2);
  const rule = "Floss rule: in a one-syllable word with a short vowel, double a final f, l, s or z (ff, ll, ss, zz).";
  if (k === 0) return choice(`Which spelling is correct?`, right, [wrong], [rule, `"${right}" is short, has a short vowel and ends in ${right.slice(-1)}, so double it.`], { keepOrder: [wrong, right].sort() });
  if (k === 1) { const end = right.slice(-2); return choice(`Which letters complete the word? ${right.slice(0, -2)}___`, end, ["ff", "ll", "ss", "zz"].filter((x) => x !== end).slice(0, 2).concat([end[0]]), [rule, `The word is "${right}".`]); }
  return choice("Which word follows the floss rule?", right, sample(["plan", "jump", "ship", "nest", "cake", "lamp", "frog"], 3), [rule, `"${right}" doubles its last letter.`]);
};

/* ---------------- adjectives, adverbs, prepositions ---------------- */
const ADJ = [["The fluffy cat slept on the rug.", "fluffy", ["cat", "slept", "rug"]], ["We saw a tall giraffe.", "tall", ["saw", "giraffe", "We"]], ["Mia wore her red boots.", "red", ["wore", "boots", "Mia"]], ["Three ducks swam in the pond.", "Three", ["ducks", "swam", "pond"]], ["The soup was hot.", "hot", ["soup", "was", "The"]], ["A tiny ant carried a crumb.", "tiny", ["ant", "carried", "crumb"]], ["Leo has a shiny new bike.", "shiny", ["Leo", "has", "bike"]]];
const adjective = () => {
  const k = rnd(0, 2);
  if (k < 2) { const [s, a, ws] = pick(ADJ); return choice(`Which word is an adjective (it describes a noun)?\n${s}`, a, ws, ["An adjective tells what kind, how many, or which one.", `"${a}" describes a noun.`]); }
  const [noun, a, ws] = pick([["lemon", "sour", ["loud", "fast", "sleepy"]], ["ice", "cold", ["fluffy", "loud", "kind"]], ["puppy", "playful", ["sour", "metal", "rainy"]], ["mountain", "tall", ["juicy", "tiny", "quiet"]], ["fire", "hot", ["wet", "soft", "frozen"]]]);
  return choice(`Which adjective best describes a ${noun}?`, a, ws, ["Think about what a " + noun + " is like.", `A ${noun} is ${a}.`]);
};
const ADV = [["The turtle walked slowly.", "slowly", "how", ["turtle", "walked", "The"]], ["Sam sang loudly in the shower.", "loudly", "how", ["sang", "shower", "Sam"]], ["We will leave soon.", "soon", "when", ["leave", "will", "We"]], ["The kids played outside.", "outside", "where", ["kids", "played", "The"]], ["Mia carefully carried the eggs.", "carefully", "how", ["Mia", "carried", "eggs"]], ["I finished my homework yesterday.", "yesterday", "when", ["finished", "homework", "my"]], ["The dog ran upstairs.", "upstairs", "where", ["dog", "ran", "The"]], ["Ben quickly ate his lunch.", "quickly", "how", ["Ben", "ate", "lunch"]]];
const adverb = () => {
  const [s, a, kind, ws] = pick(ADV), k = rnd(0, 3);
  const why = "An adverb tells more about a verb: how, when or where.";
  if (k === 0) return choice(`Which word is an adverb?\n${s}`, a, ws, [why, `"${a}" tells ${kind}.`]);
  if (k === 1) return choice(`Does the adverb "${a}" tell how, when or where?\n${s}`, kind, ["how", "when", "where"].filter((x) => x !== kind), [why, `"${a}" tells ${kind}.`], { keepOrder: ["how", "when", "where"] });
  if (k === 2) { const [b, adv] = pick([["quick", "quickly"], ["slow", "slowly"], ["loud", "loudly"], ["soft", "softly"], ["kind", "kindly"], ["sad", "sadly"]]); return word(`Turn "${b}" into an adverb that tells how.`, adv, ["Many adverbs that tell how end in -ly.", `${b} + ly = ${adv}.`]); }
  const [sent, right, wrong] = pick([["The mouse tiptoed ___ so the cat would not wake up.", "quietly", "loudly"], ["The cheetah ran ___ across the field.", "fast", "slowly"], ["Please hold the baby bird ___.", "gently", "roughly"], ["We will eat dinner ___.", "later", "yesterday"]]);
  return choice(`Which adverb makes the most sense?\n${sent}`, right, [wrong], [why, `"${sent.replace("___", right)}"`], { keepOrder: [right, wrong].sort() });
};
const PREP = [["The cat is under the table.", "under", ["cat", "is", "table"]], ["We walked across the bridge.", "across", ["walked", "bridge", "We"]], ["The bird flew over the tree.", "over", ["bird", "flew", "tree"]], ["Put your shoes by the door.", "by", ["Put", "shoes", "door"]], ["The ball rolled behind the couch.", "behind", ["ball", "rolled", "couch"]], ["My book is in my backpack.", "in", ["My", "book", "backpack"]], ["We ate lunch after recess.", "after", ["ate", "lunch", "recess"]]];
const prep = () => {
  const k = rnd(0, 2);
  if (k === 0) { const [s, p, ws] = pick(PREP); return choice(`Which word is a preposition?\n${s}`, p, ws, ["A preposition shows where or when: in, on, under, over, behind, after.", `"${p}" tells ${p === "after" ? "when" : "where"}.`]); }
  if (k === 1) { const [s, p] = pick([["The fish swims ___ the bowl.", "in"], ["The lamp is ___ the table.", "on"], ["The plane flew ___ the clouds.", "above"], ["The mole digs ___ the ground.", "under"]]); return choice(`Which preposition completes the sentence?\n${s}`, p, ["in", "on", "above", "under", "with"].filter((x) => x !== p).slice(0, 3), ["Picture where it is.", `"${s.replace("___", p)}"`]); }
  const [s, ph] = pick([["The puppy hid under the bed.", "under the bed"], ["We swam in the lake.", "in the lake"], ["Mia sat beside her friend.", "beside her friend"], ["The kite flew over the trees.", "over the trees"]]);
  return choice(`Which words are the prepositional phrase?\n${s}`, ph, [s.split(" ").slice(0, 2).join(" "), s.split(" ").slice(1, 3).join(" ")], ["A prepositional phrase starts with a preposition and ends with a noun.", `"${ph}"`]);
};

/* ---------------- parts of a book ---------------- */
const BOOK = [
  ["Who writes the words in a book?", "the author", ["the illustrator", "the reader", "the librarian"], "The author writes the words."],
  ["Who draws the pictures in a book?", "the illustrator", ["the author", "the publisher", "the reader"], "The illustrator makes the pictures."],
  ["Which page tells who the author wrote the book for?", "the dedication page", ["the title page", "the end page", "the cover"], "A dedication says who the book is for, like \"For my mom.\""],
  ["Where can you learn about the writer's life?", "the about the author page", ["the dedication page", "the cover", "the table of contents"], "The about the author page tells about the writer."],
  ["What is usually on the front cover?", "the title, author and illustrator", ["the last page of the story", "the dedication", "the glossary"], "The front cover shows the title and who made the book."],
  ["What does a table of contents show?", "the chapters and their page numbers", ["the meaning of words", "who the book is for", "the author's life"], "The table of contents helps you find each part."],
  ["What is the title page?", "a page near the front with the title and author's name", ["the very last page", "a page of pictures only", "a list of hard words"], "The title page is one of the first pages inside the book."],
  ["The part of the book you see on a shelf is called the…", "spine", ["glossary", "dedication", "caption"], "The spine holds the pages together and shows the title on the shelf."],
];
const bookparts = () => { const [q, a, ws, why] = pick(BOOK); return choice(q, a, ws, ["Books have special parts that tell us about them.", why]); };

/* ---------------- poems ---------------- */
const HAIKU = "Soft white snow falling\nCovering the sleepy town\nWinter whispers hush";
const ACRO = [["CAT", "Curls up in the sun\nAlways wants a snack\nTail goes swish"], ["SUN", "Shining in the sky\nUp so high\nNever cold"], ["DOG", "Digs in the yard\nOpens doors with his nose\nGood boy!"]];
const poemform = () => {
  const k = rnd(0, 4);
  if (k === 0) return word("How many lines does a haiku have? Write a number.", "3", ["A haiku is a short poem with 3 lines.", "The lines have 5, 7 and 5 syllables."]);
  if (k === 1) { const line = pick([["first", 5], ["second", 7], ["third", 5]]); return word(`How many syllables are in the ${line[0]} line of a haiku? Write a number.`, String(line[1]), ["Haiku pattern: 5 syllables, then 7, then 5.", `The ${line[0]} line has ${line[1]}.`]); }
  if (k === 2) { const [w, poem] = pick(ACRO); return word(`This is an acrostic poem. Read the first letter of each line. What word does it spell?\n\n${poem}`, w.toLowerCase(), ["In an acrostic poem, the first letters spell a word.", `${w.split("").join(", ")} spells ${w}.`], { accept: [w] }); }
  if (k === 3) return choice(`What kind of poem is this?\n\n${HAIKU}`, "haiku", ["acrostic", "free verse", "limerick"], ["It has 3 lines: 5, 7, 5 syllables, about nature.", "That makes it a haiku."]);
  return choice("Which kind of poem does not have to rhyme or follow a pattern?", "free verse", ["haiku", "acrostic", "limerick"], ["Free verse poems are free from rules.", "They can have any number of lines and don't need to rhyme."]);
};
const ONO = ["buzz", "splash", "boom", "meow", "crash", "pop", "sizzle", "hiss", "moo", "ding", "zoom", "honk"];
const poemsound = () => {
  const k = rnd(0, 3);
  if (k === 0) return oddOne("Which word is onomatopoeia (a word that sounds like the sound it names)?", ONO, ["happy", "table", "green", "jump", "seven", "slowly"], ["Onomatopoeia words imitate sounds.", "Say it out loud: it sounds like the noise!"]);
  if (k === 1) { const [s, a, ws] = pick([["The bee went ___ around the flowers.", "buzz", ["moo", "honk", "ding"]], ["The frog jumped into the pond with a ___.", "splash", ["hiss", "meow", "zoom"]], ["The cow said ___.", "moo", ["buzz", "pop", "crash"]], ["The bacon went ___ in the pan.", "sizzle", ["moo", "honk", "splash"]], ["The car horn went ___.", "honk", ["meow", "sizzle", "buzz"]]]); return choice(`Which sound word fits?\n${s}`, a, ws, ["Pick the word that sounds like the noise.", `"${s.replace("___", a)}"`]); }
  const ALLIT = [["Silly snakes slide south.", "s"], ["Big bears bounce on beds.", "b"], ["Funny frogs flip fast.", "f"], ["Many mice munch muffins.", "m"], ["Pink pigs play in puddles.", "p"]];
  if (k === 2) { const [s, l] = pick(ALLIT); return choice(`This sentence has alliteration. Which beginning sound repeats?\n"${s}"`, l, ["s", "b", "f", "m", "p", "t"].filter((x) => x !== l).slice(0, 3), ["Alliteration is when words close together start with the same sound.", `Listen: ${s.split(" ").filter((x) => x[0].toLowerCase() === l).join(", ")}.`]); }
  const [s] = pick(ALLIT);
  return choice("Which sentence has alliteration?", s, ["The dog ran to the park.", "I like to eat lunch.", "We went home after school."], ["Alliteration repeats the same beginning sound.", `"${s}"`]);
};

/* ---------------- r-controlled vowels ---------------- */
const AROR = { ar: ["car", "star", "farm", "park", "shark", "garden", "market", "party"], or: ["corn", "fork", "horse", "storm", "short", "morning", "corner", "forty"] };
const ERIRUR = { er: ["her", "fern", "herd", "clerk", "germ", "letter", "winter"], ir: ["bird", "girl", "shirt", "first", "dirt", "circus", "thirty"], ur: ["fur", "turn", "burn", "nurse", "surf", "turtle", "purple"] };
const rctrl = (bank, label) => () => {
  const [t, ws] = pick(Object.entries(bank)), w = pick(ws), k = rnd(0, 2);
  const keys = Object.keys(bank);
  const note = keys.includes("er") ? "er, ir and ur all say /er/, so you have to remember the spelling." : "ar says /ar/ like car; or says /or/ like fork.";
  if (k === 0) return choice(`Which letters complete the word? ${w.replace(t, "__")}`, t, keys.filter((x) => x !== t).concat(keys.includes("er") ? [] : ["er"]), [`Bossy r changes the vowel's sound.`, note, `The word is "${w}".`]);
  if (k === 1) return oddOne(`Which word has the "${t}" sound${keys.includes("er") ? ` spelled ${t}` : ""}?`, ws, [...PLAIN, ...Object.entries(bank).filter(([x]) => x !== t).flatMap(([, v]) => v)], ["Bossy r changes the vowel's sound.", note]);
  const other = keys.filter((x) => x !== t), misspell = w.replace(t, pick(other));
  return choice(`Which spelling is correct?`, w, [misspell], ["Bossy r " + label + ".", note, `"${w}" is spelled with ${t}.`], { keepOrder: [w, misspell].sort() });
};
const aror = rctrl(AROR, "words: ar and or"), erirur = rctrl(ERIRUR, "words: er, ir and ur");

/* ---------------- multisyllable silent e ---------------- */
const VCE2 = [["cupcake", "cup-cake", "cake"], ["sunshine", "sun-shine", "shine"], ["inside", "in-side", "side"], ["invite", "in-vite", "vite"], ["reptile", "rep-tile", "tile"], ["mistake", "mis-take", "take"], ["explode", "ex-plode", "plode"], ["costume", "cos-tume", "tume"], ["trombone", "trom-bone", "bone"], ["pancake", "pan-cake", "cake"], ["bedtime", "bed-time", "time"], ["escape", "es-cape", "cape"], ["umpire", "um-pire", "pire"], ["athlete", "ath-lete", "lete"]];
const vce2 = () => {
  const [w, split, last] = pick(VCE2), k = rnd(0, 3), [first] = split.split("-");
  if (k === 0) return choice(`Which shows "${w}" split into syllables?`, split, [w.slice(0, 2) + "-" + w.slice(2), w.slice(0, -2) + "-" + w.slice(-2), first + last[0] + "-" + last.slice(1)].filter((x) => x !== split), ["Each syllable has one vowel sound.", `Clap it: ${split}. The silent e syllable is "${last}".`]);
  if (k === 1) return choice(`Which syllable in "${split}" has a silent e (VCe)?`, last, [first], ["Look for vowel, consonant, e at the end.", `"${last}" has the silent e, so its vowel is long.`], { keepOrder: [first, last] });
  if (k === 2) return choice(`Which word has a silent e syllable?`, w, sample(["sunset", "basket", "rabbit", "napkin", "picnic", "kitten", "muffin"], 3), ["A VCe syllable ends with vowel, consonant, silent e.", `${split}: "${last}" is a VCe syllable.`]);
  return word(`How many syllables are in "${w}"? Write a number.`, "2", [`Clap it: ${split}.`, "That's 2 syllables."]);
};

export const EN_CLASS = { dig2: digraph, stype2: stype, opensyl, edit2: edit, vce1: vce, agree2: agree, softcg, adj2: adjective, adv2: adverb, prep2: prep, bookparts, poemform, poemsound, aror, erirur, schwa, floss, vce2 };
