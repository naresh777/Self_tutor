// Built-in English problems for Grades 2 and 3 (Texas ELAR TEKS): phonics, word study, grammar,
// conventions and writing. Each generator mixes words from small banks, so sheets vary from day to day.
// Reading topics use the passages in passages.js.
import { rnd, pick, shuffle, sample, cap, choice, word, NAMES } from "./util.js";

const who = () => pick(NAMES);
// Pick a word from one list and wrong choices from the others.
function oddOne(question, right, wrongPool, steps, more) {
  return choice(question, pick(right), sample(wrongPool, 3), steps, more);
}

/* ---------------- phonics ---------------- */
const SHORT = { a: ["cat", "map", "bag", "hat", "jam", "van"], e: ["bed", "pen", "net", "web", "leg", "ten"], i: ["pig", "fish", "lid", "pin", "milk", "zip"], o: ["dog", "pot", "box", "mop", "log", "frog"], u: ["bus", "cup", "sun", "duck", "rug", "drum"] };
const LONG = { a: ["cake", "rain", "play", "game", "tail", "snake"], e: ["tree", "seal", "bee", "leaf", "green", "team"], i: ["bike", "kite", "light", "pie", "night", "slide"], o: ["boat", "home", "snow", "rope", "goat", "bone"], u: ["mule", "cube", "flute", "tube", "June", "huge"] };
const all = (o) => Object.values(o).flat();
const OPEN = [["me", "open"], ["go", "open"], ["hi", "open"], ["she", "open"], ["no", "open"], ["we", "open"], ["cat", "closed"], ["sit", "closed"], ["map", "closed"], ["hop", "closed"], ["bed", "closed"], ["run", "closed"]];
const vowelsGen = () => {
  const k = rnd(0, 3), v = pick("aeiou".split(""));
  if (k === 0) return oddOne(`Which word has a short ${v} sound, like "${SHORT[v][0]}"?`, SHORT[v].slice(1), [...LONG[v], ...all(SHORT).filter((w) => !SHORT[v].includes(w))], [`Say each word slowly and listen to the middle sound.`, `A short ${v} sounds like the ${v} in "${SHORT[v][0]}".`]);
  if (k === 1) return oddOne(`Which word has a long ${v} sound, like "${LONG[v][0]}"?`, LONG[v].slice(1), [...SHORT[v], ...all(LONG).filter((w) => !LONG[v].includes(w))], [`A long vowel says its own name.`, `Listen for "${v}" saying its name, like in "${LONG[v][0]}".`]);
  if (k === 2) {
    const [w, t] = pick(OPEN);
    return choice(`Is the syllable "${w}" open or closed?`, t, [t === "open" ? "closed" : "open"], ["An open syllable ends with a vowel, and the vowel is long.", "A closed syllable ends with a consonant, and the vowel is short.", `"${w}" ends with ${t === "open" ? "a vowel" : "a consonant"}, so it is ${t}.`], { keepOrder: ["open", "closed"] });
  }
  const [s, l] = pick([["hop", "hope"], ["kit", "kite"], ["cap", "cape"], ["tub", "tube"], ["pin", "pine"], ["not", "note"], ["mad", "made"], ["cut", "cute"]]);
  return choice(`Which word has a long vowel sound: "${s}" or "${l}"?`, l, [s], [`Silent e at the end makes the vowel say its name.`, `"${l}" has a long vowel.`], { keepOrder: [s, l] });
};
const TEAMS = [["ai", ["rain", "paint", "snail", "train"]], ["ay", ["play", "stay", "gray", "tray"]], ["ee", ["feet", "sheep", "green", "sleep"]], ["ea", ["read", "beach", "team", "leaf"]], ["oa", ["boat", "coat", "road", "toast"]], ["ow", ["snow", "grow", "slow", "bowl"]], ["igh", ["night", "light", "high", "bright"]], ["ie", ["pie", "tie", "lie", "cried"]]];
const SILENT_E = ["cake", "bike", "home", "cube", "made", "ride", "rope", "flute", "game", "smile"];
const NO_E = ["cat", "sit", "frog", "jump", "bed", "milk", "sun", "hand", "stop", "pig"];
const vteamsGen = () => {
  const k = rnd(0, 2);
  if (k === 0) { const [t, ws] = pick(TEAMS); return oddOne(`Which word has the vowel team "${t}"?`, ws, NO_E, [`Look for the letters ${t.split("").join(" and ")} side by side.`, `Vowel teams work together to make one sound.`]); }
  if (k === 1) return oddOne("Which word ends with a silent e?", SILENT_E, NO_E, ["Look at the last letter.", "In a silent e word, the e is quiet and makes the vowel long."]);
  const [t, ws] = pick(TEAMS), w = pick(ws), blank = w.replace(t, "__");
  return choice(`Which letters complete the word? ${blank}`, t, TEAMS.map((x) => x[0]).filter((x) => x !== t), [`Say the word and listen to the vowel sound.`, `The word is "${w}", spelled with ${t}.`]);
};
const RCTRL = { ar: ["car", "star", "farm", "park", "shark"], or: ["corn", "fork", "horse", "storm", "short"], er: ["her", "fern", "herd", "clerk", "germ"], ir: ["bird", "girl", "shirt", "first", "dirt"], ur: ["fur", "turn", "burn", "nurse", "surf"] };
const rcontrolGen = () => {
  const [t, ws] = pick(Object.entries(RCTRL)), w = pick(ws);
  if (rnd(0, 1)) return oddOne(`Which word has the "${t}" sound?`, ws, [...NO_E, ...all(LONG)], [`Bossy r changes the vowel's sound.`, `Listen for "${t}", like in "${ws[0]}".`]);
  const opts = t === "er" || t === "ir" || t === "ur" ? ["er", "ir", "ur"] : ["ar", "or", "er"];
  return choice(`Which letters complete the word? ${w.replace(t, "__")}`, t, opts.filter((x) => x !== t).concat(["ar", "or"].filter((x) => x !== t)), [`Say the word "${w}".`, `"${w}" is spelled with ${t}.`, t === "er" || t === "ir" || t === "ur" ? "er, ir and ur sound the same, so you have to remember the spelling." : ""].filter(Boolean));
};
const DIPH = { oi: ["coin", "soil", "point", "boil"], oy: ["boy", "toy", "joy", "enjoy"], ou: ["cloud", "house", "mouth", "shout"], ow: ["cow", "town", "clown", "crown"] };
const CONTR = [["do not", "don't"], ["can not", "can't"], ["is not", "isn't"], ["I am", "I'm"], ["it is", "it's"], ["we are", "we're"], ["they are", "they're"], ["you will", "you'll"], ["she is", "she's"], ["did not", "didn't"], ["I have", "I've"], ["we will", "we'll"], ["he would", "he'd"], ["was not", "wasn't"]];
const diphGen = (lvl) => {
  const k = rnd(0, 2);
  if (k === 0) { const [t, ws] = pick(Object.entries(DIPH)), w = pick(ws); return choice(`Which letters complete the word? ${w.replace(t, "__")}`, t, Object.keys(DIPH).filter((x) => x !== t), [`Say "${w}" and listen to the vowel sound.`, `oi and oy say /oy/; ou and ow say /ow/.`, `"${w}" is spelled with ${t}.`]); }
  const [long, short] = pick(CONTR);
  if (k === 1) return word(`Write the contraction for "${long}".`, short, [`A contraction squeezes two words together.`, `An apostrophe takes the place of the missing letters.`, `"${long}" becomes "${short}".`], { accept: [short.replace("'", "’")] });
  return choice(`What two words make the contraction "${short}"?`, long, sample(CONTR.filter((c) => c[0] !== long).map((c) => c[0]), 3), [`The apostrophe shows where letters were left out.`, `"${short}" means "${long}".`]);
};
const SYL = [["basket", "bas-ket", 2], ["rabbit", "rab-bit", 2], ["napkin", "nap-kin", 2], ["tiger", "ti-ger", 2], ["robot", "ro-bot", 2], ["sunset", "sun-set", 2], ["pumpkin", "pump-kin", 2], ["music", "mu-sic", 2], ["butterfly", "but-ter-fly", 3], ["elephant", "el-e-phant", 3], ["banana", "ba-na-na", 3], ["fantastic", "fan-tas-tic", 3], ["dinosaur", "di-no-saur", 3], ["computer", "com-pu-ter", 3], ["helicopter", "hel-i-cop-ter", 4], ["watermelon", "wa-ter-mel-on", 4], ["cat", "cat", 1], ["jump", "jump", 1]];
const sylGen = () => {
  const [w, split, n] = pick(SYL);
  if (rnd(0, 1)) return word(`How many syllables are in the word "${w}"? Write a number.`, String(n), [`Clap as you say "${w}".`, `${split} has ${n} syllable${n > 1 ? "s" : ""}.`]);
  const parts = split.split("-"), wrong = [w.slice(0, 1) + "-" + w.slice(1), w.slice(0, -2) + "-" + w.slice(-2), parts.join("")].filter((x) => x !== split);
  return choice(`Which shows "${w}" split into syllables?`, split, wrong, [`Each syllable has one vowel sound.`, `Clap it: ${split}.`]);
};
const HOMO = [["Our class won the ___.", "prize", "pries"], ["I ___ a letter to Grandma.", "wrote", "rote"], ["The ___ was too big to carry.", "pail", "pale"], ["We ate a ___ for a snack.", "pear", "pair"], ["The dog wagged its ___.", "tail", "tale"], ["I can ___ the birds singing.", "hear", "here"], ["The ___ is shining today.", "sun", "son"], ["We walked down the ___.", "road", "rode"], ["She has ___ cats.", "two", "too"], ["The ___ blew the leaves.", "wind", "whined"], ["Put the book over ___.", "there", "their"], ["I ___ the answer!", "know", "no"], ["Please ___ for your turn.", "wait", "weight"], ["We saw a ___ at the zoo.", "bear", "bare"], ["I ate ___ cookies.", "eight", "ate"], ["They lost ___ ball.", "their", "there"]];
const homophoneGen = () => {
  const [s, a, b] = pick(HOMO);
  return choice(`Which word completes the sentence?\n${s}`, a, [b], [`${a} and ${b} sound alike but mean different things.`, `"${s.replace("___", a)}" makes sense.`], { keepOrder: shuffle([a, b]) });
};

/* ---------------- word parts and meanings ---------------- */
const PREFIX = { un: ["not", ["happy", "kind", "lock", "tie", "safe", "fair", "zip"]], re: ["again", ["read", "do", "fill", "paint", "build", "tell", "play"]], dis: ["not or the opposite of", ["like", "agree", "appear", "obey", "honest"]], pre: ["before", ["heat", "view", "school", "pay"]], mis: ["wrongly", ["spell", "read", "place", "behave"]] };
const SUFFIX = { er: ["a person who", ["teach", "paint", "farm", "sing", "bake"]], or: ["a person who", ["act", "sail", "visit", "invent"]], ful: ["full of", ["help", "care", "joy", "hope", "color"]], less: ["without", ["help", "care", "fear", "hope", "sleep"]], ly: ["in a way that is", ["quick", "slow", "soft", "loud", "kind"]], able: ["able to be", ["wash", "read", "fix", "enjoy"]] };
const meaning = (p, root, isPre) => {
  if (isPre) return p === "un" || p === "dis" ? `not ${root}` : p === "re" ? `${root} again` : p === "pre" ? `${root} before` : `${root} wrongly`;
  return p === "er" || p === "or" ? `a person who ${root}s` : p === "ful" ? `full of ${root}` : p === "less" ? `without ${root}` : p === "ly" ? `in a ${root} way` : `able to be ${root}ed`;
};
const prefixGen = (lvl, arg) => {
  const keys = arg === "3" ? Object.keys(PREFIX) : ["un", "re", "dis"];
  const p = pick(keys), [m, roots] = PREFIX[p], root = pick(roots), w = p + root;
  const k = rnd(0, 2);
  if (k === 0) return choice(`What does the prefix "${p}-" mean in the word "${w}"?`, m, Object.keys(PREFIX).filter((x) => x !== p).map((x) => PREFIX[x][0]).filter((x) => x !== m), [`A prefix goes at the start of a word and changes its meaning.`, `"${p}-" means "${m}", so "${w}" means ${meaning(p, root, true)}.`]);
  if (k === 1) return choice(`Which word means "${meaning(p, root, true)}"?`, w, keys.filter((x) => x !== p).map((x) => x + root).concat([root + "ful"]), [`Find the prefix that means "${m}".`, `"${p}-" + "${root}" = "${w}".`]);
  const n = who(), sent = { un: `${n} was ___ because it rained on the picnic.`, re: `${n} had to ___ the page because it got wet.`, dis: `${n} and Sam ___ about which game to play.`, pre: `We ___ the oven before baking.`, mis: `Oops, I ___ the word on my test.` }[p];
  const target = { un: "unhappy", re: "rewrite", dis: "disagree", pre: "preheat", mis: "misspelled" }[p];
  return choice(`Which word best completes the sentence?\n${sent}`, target, { un: ["rehappy", "dishappy"], re: ["unwrite", "miswrite"], dis: ["unagree", "reagree"], pre: ["reheat", "unheat"], mis: ["unspelled", "prespelled"] }[p], [`Think about what the sentence means.`, `"${target}" fits: the prefix "${p}-" means "${m}".`]);
};
const suffixGen = (lvl, arg) => {
  const keys = arg === "3" ? Object.keys(SUFFIX) : ["er", "or", "ful", "less", "ly"];
  const sfx = pick(keys), [m, roots] = SUFFIX[sfx], root = pick(roots), w = root + (sfx === "er" && root.endsWith("e") ? "r" : sfx);
  if (rnd(0, 1)) return choice(`What does "${w}" mean?`, meaning(sfx, root, false), keys.filter((x) => x !== sfx).map((x) => meaning(x, root, false)), [`Find the base word: "${root}". Then the suffix: "-${sfx}".`, `"-${sfx}" means "${m}", so "${w}" means ${meaning(sfx, root, false)}.`]);
  return choice(`Which suffix makes a word that means "${meaning(sfx, root, false)}"?\n${root}___`, `-${sfx}`, keys.filter((x) => x !== sfx).map((x) => "-" + x), [`A suffix goes at the end of a word.`, `"-${sfx}" means "${m}": ${w}.`]);
};
const SYN = [["big", "large", "tiny"], ["happy", "glad", "sad"], ["fast", "quick", "slow"], ["small", "little", "huge"], ["begin", "start", "finish"], ["shout", "yell", "whisper"], ["smart", "clever", "silly"], ["cold", "chilly", "hot"], ["easy", "simple", "hard"], ["angry", "mad", "calm"], ["shut", "close", "open"], ["brave", "bold", "afraid"], ["loud", "noisy", "quiet"], ["neat", "tidy", "messy"], ["rich", "wealthy", "poor"]];
const HOMOGRAPH = [["bat", "The bat flew out of the cave at night.", "a flying animal", "a stick for hitting a ball"], ["bat", "Jay swung the bat and hit the ball.", "a stick for hitting a ball", "a flying animal"], ["wave", "We watched a big wave crash on the sand.", "moving water in the ocean", "to move your hand hello"], ["wave", "Wave to Grandpa from the window.", "to move your hand hello", "moving water in the ocean"], ["park", "We had a picnic at the park.", "a place with grass and trees", "to stop and leave a car"], ["park", "Dad will park the car here.", "to stop and leave a car", "a place with grass and trees"], ["bark", "The tree's bark felt rough.", "the outside of a tree", "the sound a dog makes"], ["bark", "The dogs bark at the mail truck.", "the sound a dog makes", "the outside of a tree"], ["fall", "The leaves turn red in the fall.", "the season after summer", "to drop down"], ["light", "This box is light, so I can lift it.", "not heavy", "something that helps you see"], ["ring", "Mom wears a gold ring.", "jewelry for a finger", "the sound of a bell"], ["kind", "What kind of cake do you like?", "a type or sort", "nice and caring"]];
const synGen = (lvl, arg) => {
  const k = rnd(0, arg === "3" ? 3 : 2), [a, s, o] = pick(SYN);
  if (k === 0) return choice(`Which word is a synonym for "${a}" (it means the same)?`, s, [o, pick(SYN.filter((x) => x[0] !== a))[2], pick(SYN.filter((x) => x[0] !== a))[0]], [`Synonyms are words that mean the same or almost the same.`, `"${s}" means almost the same as "${a}".`]);
  if (k === 1) return choice(`Which word is an antonym for "${a}" (it means the opposite)?`, o, [s, pick(SYN.filter((x) => x[0] !== a))[1], pick(SYN.filter((x) => x[0] !== a))[0]], [`Antonyms are opposites.`, `"${o}" is the opposite of "${a}".`]);
  if (k === 2) return contextGen(lvl);
  const [w, sent, right, wrong] = pick(HOMOGRAPH);
  return choice(`Read the sentence: "${sent}"\nWhat does "${w}" mean here?`, right, [wrong], [`"${w}" is a homograph: same spelling, different meanings.`, `Use the other words in the sentence as clues: here it means ${right}.`]);
};
const CONTEXT = [
  ["The puppy was so drowsy that it fell asleep in my lap.", "drowsy", "sleepy", ["hungry", "noisy", "wet"]],
  ["The giant whale was enormous, bigger than a school bus.", "enormous", "very big", ["very small", "very fast", "very old"]],
  ["Mia was famished after the long hike, so she ate two sandwiches.", "famished", "very hungry", ["very tired", "very happy", "very cold"]],
  ["The path was so narrow that only one person could walk on it at a time.", "narrow", "not wide", ["very long", "very muddy", "very bright"]],
  ["Leo was furious when his tower got knocked down. He stomped his feet.", "furious", "very angry", ["very calm", "very proud", "very sleepy"]],
  ["The fragile glass bird broke when it fell off the shelf.", "fragile", "easy to break", ["very heavy", "very shiny", "hard to see"]],
  ["We had to hurry because the bus was about to depart without us.", "depart", "leave", ["arrive", "stop", "honk"]],
  ["The baby was content, smiling and cooing in her crib.", "content", "happy and calm", ["upset", "hungry", "scared"]],
  ["The cheetah is swift. It can run faster than any other land animal.", "swift", "fast", ["slow", "spotted", "hungry"]],
  ["After the storm, the yard was a mess of soggy leaves and puddles.", "soggy", "very wet", ["very dry", "very bright", "very loud"]],
  ["Ava was timid on the first day and hid behind her mom.", "timid", "shy", ["bossy", "silly", "sleepy"]],
  ["The museum had ancient tools that were thousands of years old.", "ancient", "very old", ["brand new", "broken", "tiny"]],
];
const MULTI = [["I put a stamp on the letter before I mailed it.", "stamp", "a small sticker for mail", "to hit the ground with your foot"], ["The horse began to stamp its hoof.", "stamp", "to hit the ground with your foot", "a small sticker for mail"], ["Please match your socks.", "match", "to find two that go together", "a game between teams"], ["Our soccer match starts at noon.", "match", "a game between teams", "to find two that go together"], ["Hold the jar so it doesn't spill.", "hold", "to keep in your hands", "a ship's storage space"], ["Draw a line under the title.", "line", "a long thin mark", "people waiting in a row"], ["We waited in line for lunch.", "line", "people waiting in a row", "a long thin mark"], ["The play was about a brave knight.", "play", "a show on a stage", "to have fun with a game"]];
function contextGen() {
  if (rnd(0, 2) === 0) { const [s, w, r, wr] = pick(MULTI); return choice(`Read the sentence: "${s}"\nWhat does "${w}" mean here?`, r, [wr], [`Some words have more than one meaning.`, `The clues in the sentence show it means ${r}.`]); }
  const [s, w, r, ws] = pick(CONTEXT);
  return choice(`Read the sentence: "${s}"\nWhat does "${w}" mean?`, r, ws, [`Look for clue words around "${w}".`, `The clues tell you "${w}" means ${r}.`]);
}
const FIG = [["The snow was a white blanket on the ground.", "metaphor", "The snow covered the ground like a blanket."], ["Her smile was as bright as the sun.", "simile", "Her smile was very bright and happy."], ["The runner was as fast as a cheetah.", "simile", "The runner was very fast."], ["My little brother is a busy bee.", "metaphor", "My brother is always busy."], ["The pillow was as soft as a cloud.", "simile", "The pillow was very soft."], ["The classroom was a zoo after recess.", "metaphor", "The classroom was wild and noisy."], ["He was as quiet as a mouse.", "simile", "He was very quiet."], ["The stars were diamonds in the sky.", "metaphor", "The stars sparkled brightly."], ["The baby slept like a log.", "simile", "The baby slept very deeply."], ["Time is a thief.", "metaphor", "Time goes by quickly and takes things away."]];
const figurativeGen = () => {
  const [s, t, m] = pick(FIG);
  if (rnd(0, 1)) return choice(`Is this sentence a simile or a metaphor?\n"${s}"`, t, [t === "simile" ? "metaphor" : "simile"], ["A simile compares using 'like' or 'as'.", "A metaphor says one thing IS another.", `This one ${t === "simile" ? "uses like or as" : "doesn't use like or as"}, so it is a ${t}.`], { keepOrder: ["simile", "metaphor"] });
  return choice(`What does this sentence mean?\n"${s}"`, m, sample(FIG.filter((f) => f[0] !== s).map((f) => f[2]), 3), ["Figurative language doesn't mean exactly what the words say.", `It means: ${m}`]);
};

/* ---------------- grammar ---------------- */
const NOUNS_C = ["dog", "city", "teacher", "river", "school", "girl", "park", "book"];
const NOUNS_P = ["Max", "Texas", "Mrs. Lee", "Frisco", "Monday", "July", "Red River", "Ava"];
const PLURAL = [["box", "boxes"], ["dish", "dishes"], ["bus", "buses"], ["baby", "babies"], ["city", "cities"], ["leaf", "leaves"], ["child", "children"], ["mouse", "mice"], ["foot", "feet"], ["tooth", "teeth"], ["man", "men"], ["fox", "foxes"], ["bench", "benches"], ["puppy", "puppies"], ["wolf", "wolves"], ["cat", "cats"]];
const COLLECTIVE = [["a ___ of fish", "school", ["herd", "flock"]], ["a ___ of cows", "herd", ["school", "pack"]], ["a ___ of birds", "flock", ["herd", "team"]], ["a ___ of wolves", "pack", ["flock", "school"]], ["a ___ of players", "team", ["herd", "pack"]], ["a ___ of bees", "swarm", ["herd", "school"]], ["a ___ of puppies", "litter", ["flock", "swarm"]]];
const nounsGen = (lvl, arg) => {
  const k = rnd(0, arg === "3" ? 4 : 2);
  if (k === 0) return choice("Which word is a proper noun?", pick(NOUNS_P), sample(NOUNS_C, 3), ["A proper noun names a special person, place or thing.", "Proper nouns start with a capital letter."]);
  if (k === 1) { const [s, p] = pick(PLURAL); return word(`Write the plural of "${s}" (more than one).`, p, [s.endsWith("y") && !"aeiou".includes(s.at(-2)) ? "Change the y to i and add -es." : /(s|x|sh|ch)$/.test(s) ? "Words ending in s, x, sh or ch add -es." : s.endsWith("f") ? "Change f to v and add -es." : p.endsWith("s") ? "Add -s." : "This plural is irregular; it changes the word.", `One ${s}, two ${p}.`]); }
  if (k === 2) { const n = pick(NOUNS_C), s = `The ${n} was ${pick(["very big", "near the road", "full of people", "old"])}.`; return choice(`Which word is the noun in this sentence?\n${s}`, n, ["was", "very", "the", "near", "full", "old"].filter((w) => s.includes(w)).slice(0, 3), ["A noun names a person, place or thing.", `"${n}" is a thing (or place), so it is the noun.`]); }
  if (k === 3) { const [p, a, ws] = pick(COLLECTIVE); return choice(`Which collective noun completes the phrase? ${p}`, a, ws, ["A collective noun names a group.", `We say ${p.replace("___", a)}.`]); }
  const [owner, thing, many] = pick([["dog", "bone", false], ["girl", "hat", false], ["teacher", "desk", false], ["birds", "nest", true], ["boys", "bikes", true], ["cats", "toys", true]]);
  const right = many ? `the ${owner}' ${thing}` : `the ${owner}'s ${thing}`;
  return choice(`Which shows the ${thing} that belongs to the ${owner}?`, right, [many ? `the ${owner}'s ${thing}` : `the ${owner}s' ${thing}`, `the ${owner}s ${thing}`, `the ${thing}'s ${owner}`], [`Possessive nouns use an apostrophe to show who owns something.`, many ? `"${owner}" already ends in s, so add just an apostrophe: ${right}.` : `Add 's to one owner: ${right}.`]);
};
const VERBS = [["jump", "jumped", "will jump"], ["play", "played", "will play"], ["walk", "walked", "will walk"], ["help", "helped", "will help"], ["bake", "baked", "will bake"], ["hop", "hopped", "will hop"], ["cry", "cried", "will cry"], ["run", "ran", "will run"], ["eat", "ate", "will eat"], ["go", "went", "will go"], ["see", "saw", "will see"], ["swim", "swam", "will swim"], ["write", "wrote", "will write"], ["sing", "sang", "will sing"], ["take", "took", "will take"], ["make", "made", "will make"], ["give", "gave", "will give"], ["fly", "flew", "will fly"]];
const verbsGen = (lvl, arg) => {
  const k = rnd(0, 2), n = who();
  const pool = arg === "3" ? VERBS : VERBS.slice(0, 12);
  const [v, past, fut] = pick(pool);
  if (k === 0) return word(`Write the past tense of "${v}".\nToday I ${v}. Yesterday I ___.`, past, [/ed$/.test(past) ? (v.endsWith("e") ? "Add -d." : v.endsWith("y") ? "Change y to i and add -ed." : /[aeiou][^aeiouwy]$/.test(v) && v.length <= 3 ? "Double the last letter and add -ed." : "Add -ed.") : `"${v}" is irregular, so its past tense is a new word.`, `Yesterday I ${past}.`]);
  if (k === 1) { const [v, past, fut] = pick(VERBS.filter((x) => ["jump", "play", "walk", "run", "swim", "sing", "hop"].includes(x[0]))); const t = pick(["past", "present", "future"]); const s = t === "past" ? `${n} ${past} at the park.` : t === "present" ? `${n} ${v === "go" ? "goes" : v.endsWith("y") && v !== "play" ? v.slice(0, -1) + "ies" : /(s|sh|ch|x)$/.test(v) ? v + "es" : v + "s"} at the park.` : `${n} ${fut} at the park.`; return choice(`Is the verb in this sentence past, present or future?\n${s}`, t, ["past", "present", "future"].filter((x) => x !== t), ["Past already happened. Present is happening now. Future will happen.", t === "future" ? `"will" shows the future.` : t === "past" ? `"${past}" tells about something that already happened.` : `The verb tells about now.`], { keepOrder: ["past", "present", "future"] }); }
  const [when, kind] = pick([["Tomorrow", "future"], ["Yesterday", "past"], ["Next week", "future"], ["Last night", "past"]]);
  const [v2, past2, fut2] = pick(VERBS.filter((x) => ["walk", "run", "swim", "sing", "play", "jump"].includes(x[0])));
  const right = kind === "future" ? fut2 : past2;
  return choice(`Which verb completes the sentence?\n${when} ${n} ___ at the park.`, right, [kind === "future" ? past2 : fut2, v2 + (v2.endsWith("s") ? "es" : "s"), v2 + "ing"], [`"${when}" tells you the time: the ${kind}.`, `${when} ${n} ${right} at the park.`]);
};
const ADJ = [["The fluffy cat slept on the rug.", "fluffy", ["cat", "slept", "rug"]], ["We saw a tall giraffe.", "tall", ["saw", "giraffe", "We"]], ["Mia wore her red boots.", "red", ["wore", "boots", "Mia"]], ["The soup was hot.", "hot", ["soup", "was", "The"]], ["Leo found three shells.", "three", ["found", "shells", "Leo"]], ["It was a stormy night.", "stormy", ["night", "was", "It"]]];
const ADV = [["The turtle walked slowly.", "slowly", ["turtle", "walked", "The"]], ["Sam sang loudly in the shower.", "loudly", ["sang", "shower", "Sam"]], ["We will leave soon.", "soon", ["leave", "will", "We"]], ["The kids played outside.", "outside", ["kids", "played", "The"]], ["She quickly finished her lunch.", "quickly", ["finished", "lunch", "her"]]];
const adjGen = () => {
  const k = rnd(0, 2);
  if (k === 0) { const [s, a, ws] = pick(ADJ); return choice(`Which word is an adjective (it describes a noun)?\n${s}`, a, ws, ["An adjective tells what kind, how many or which one.", `"${a}" describes a noun.`]); }
  if (k === 1) { const [s, a, ws] = pick(ADV); return choice(`Which word is an adverb (it tells how, when or where)?\n${s}`, a, ws, ["An adverb describes a verb: how, when or where.", `"${a}" tells ${/ly$/.test(a) ? "how" : a === "soon" ? "when" : "where"}.`]); }
  const [w, art] = pick([["apple", "an"], ["egg", "an"], ["owl", "an"], ["umbrella", "an"], ["kite", "a"], ["dog", "a"], ["unicorn", "a"], ["igloo", "an"]]);
  return choice(`Which article goes before "${w}"? I saw ___ ${w}.`, art, [art === "a" ? "an" : "a"], [`Use "an" before a vowel sound and "a" before a consonant sound.`, `"${w}" starts with a ${art === "an" ? "vowel" : "consonant"} sound: ${art} ${w}.`], { keepOrder: ["a", "an"] });
};
const COMPARE = [["tall", "taller", "tallest"], ["fast", "faster", "fastest"], ["small", "smaller", "smallest"], ["big", "bigger", "biggest"], ["happy", "happier", "happiest"], ["funny", "funnier", "funniest"], ["good", "better", "best"], ["bad", "worse", "worst"], ["cold", "colder", "coldest"]];
const compareGen = () => {
  const [b, er, est] = pick(COMPARE), k = rnd(0, 2);
  if (k === 0) return choice(`Which word completes the sentence?\nMy dog is ___ than your dog.`, er, [b, est, "more " + b], ["Comparing two things: use -er (or more).", `Use "${er}" for two.`]);
  if (k === 1) return choice(`Which word completes the sentence?\nThat is the ___ one of all.`, est, [b, er, "most " + er], ["Comparing three or more: use -est (or most).", `Use "${est}" for the one above all the rest.`]);
  const [b2, more, most] = pick([["quickly", "more quickly", "most quickly"], ["carefully", "more carefully", "most carefully"], ["slowly", "more slowly", "most slowly"]]);
  return choice(`Which words complete the sentence?\nOf all the runners, Ava ran the ___.`, most, [more, b2, b2 + "est"], [`Adverbs ending in -ly use "more" and "most".`, `"of all" means more than two, so use "${most}".`]);
};
const PRON = [["Mia lost her hat. ___ looked everywhere.", "She", ["Her", "Him", "They"]], ["Leo and I made a fort. ___ used blankets.", "We", ["Us", "Them", "He"]], ["The dog barked. ___ wanted a treat.", "It", ["They", "Her", "Us"]], ["Mom gave the book to ___.", "me", ["I", "we", "she"]], ["Sam and Kai are brothers. ___ share a room.", "They", ["Them", "He", "Us"]], ["Please give the pencil to ___ (Jay).", "him", ["he", "they", "we"]], ["The cat licked ___ paw.", "its", ["it's", "their", "his's"]], ["Ben and Zoe took ___ dog for a walk.", "their", ["there", "they're", "them"]]];
const PREP = [["The cat is under the table.", "under", ["cat", "is", "table"]], ["We walked across the bridge.", "across", ["walked", "bridge", "We"]], ["The bird flew over the tree.", "over", ["bird", "flew", "tree"]], ["Put your shoes by the door.", "by", ["Put", "shoes", "door"]], ["Mia sat between her friends.", "between", ["sat", "friends", "her"]]];
const pronounGen = (lvl, arg) => {
  if (arg !== "3" && rnd(0, 1)) { const [s, p, ws] = pick(PREP); return choice(`Which word is a preposition (it tells where)?\n${s}`, p, ws, ["A preposition shows where something is, like in, on, under or over.", `"${p}" tells where.`]); }
  const [s, p, ws] = pick(PRON);
  return choice(`Which pronoun completes the sentence?\n${s}`, p, ws, ["A pronoun takes the place of a noun.", `"${s.replace("___", p)}"`]);
};
const RELATIVE = [["That is the girl ___ won the race.", "who", ["which", "where", "whose"]], ["This is the park ___ we play soccer.", "where", ["who", "which", "when"]], ["I like the book ___ you gave me.", "that", ["who", "where", "whose"]], ["Saturday is the day ___ we go swimming.", "when", ["who", "which", "where"]], ["The boy ___ dog is lost is sad.", "whose", ["who", "which", "where"]], ["My aunt, ___ lives in Dallas, is a nurse.", "who", ["which", "where", "when"]], ["Summer is the season ___ we visit the beach.", "when", ["who", "whose", "which"]], ["The library is the place ___ I feel calm.", "where", ["who", "whose", "when"]], ["Our dog, ___ is brown, loves to swim.", "which", ["who", "where", "when"]]];
const relativeGen = () => { const [s, a, ws] = pick(RELATIVE); return choice(`Which word completes the sentence?\n${s}`, a, ws, ["Relative pronouns (who, whose, which, that) and adverbs (where, when) join an extra detail to a noun.", `"${s.replace("___", a)}"`]); };

/* ---------------- sentences and conventions ---------------- */
const FRAG = [["The big brown dog.", false], ["The big brown dog ran home.", true], ["Running in the rain.", false], ["We ran in the rain.", true], ["After lunch.", false], ["After lunch we read a book.", true], ["My sister and I.", false], ["My sister and I built a fort.", true], ["Jumped over the log.", false], ["The frog jumped over the log.", true]];
const AGREE = [["The dogs ___ loudly.", "bark", "barks"], ["My cat ___ milk.", "likes", "like"], ["They ___ to school.", "walk", "walks"], ["She ___ fast.", "runs", "run"], ["The birds ___ in the morning.", "sing", "sings"], ["Ben ___ his teeth.", "brushes", "brush"], ["We ___ soccer on Fridays.", "play", "plays"]];
const sentenceGen = (lvl, arg) => {
  const k = rnd(0, 2);
  if (k === 0) { const pairs = shuffle(FRAG); const right = pairs.find((p) => p[1])[0]; return choice("Which is a complete sentence?", right, pairs.filter((p) => !p[1]).slice(0, 3).map((p) => p[0]), ["A complete sentence has a subject (who or what) and a verb (what they do).", `"${right}" has both.`]); }
  if (k === 1) { const [s, a, b] = pick(AGREE); return choice(`Which verb completes the sentence?\n${s}`, a, [b], ["The verb has to match the subject.", "One person or thing usually takes a verb ending in -s; more than one does not.", `"${s.replace("___", a)}"`], { keepOrder: shuffle([a, b]) }); }
  const [frag, fix] = pick([["Ran to the bus.", "Sam ran to the bus."], ["The happy puppy.", "The happy puppy wagged its tail."], ["Under the bed.", "My shoes are under the bed."], ["Ate pizza for lunch.", "We ate pizza for lunch."]]);
  return choice(`How can you fix this fragment?\n"${frag}"`, fix, [frag.replace(".", "!"), frag.toLowerCase(), frag.replace(".", ", and.")], ["A fragment is missing a subject or a verb.", `Adding the missing part makes it complete: "${fix}"`]);
};
const CONJ = [["I like apples, ___ I don't like pears.", "but"], ["We can paint, ___ we can draw.", "or"], ["Mia ran, ___ Ben walked.", "but"], ["Do you want juice ___ milk?", "or"], ["I fed the dog, ___ Dad fed the cat.", "and"], ["It was cold, ___ we wore coats.", "so"], ["I put on my shoes ___ my hat.", "and"]];
const conjGen = () => { const [s, a] = pick(CONJ); return choice(`Which word best joins the sentence?\n${s}`, a, ["and", "but", "or", "so"].filter((x) => x !== a), ["'and' adds, 'but' shows a difference, 'or' gives a choice, 'so' gives a result.", `"${s.replace("___", a)}"`]); };
const COMPOUND = [["The dog barked. The cat ran.", "The dog barked, and the cat ran."], ["I wanted to swim. The pool was closed.", "I wanted to swim, but the pool was closed."], ["We can play tag. We can read.", "We can play tag, or we can read."], ["It rained all day. We stayed inside.", "It rained all day, so we stayed inside."]];
const DIALOG = [["Mia said, \"Let's go to the park.\"", ["Mia said, Let's go to the park.", "Mia said \"Let's go to the park.", "Mia said, \"Let's go to the park\""]], ["\"I found it!\" shouted Leo.", ["I found it! shouted Leo.", "\"I found it! shouted Leo.\"", "\"I found it\"! shouted Leo."]], ["\"Can I help?\" asked Ava.", ["\"Can I help\"? asked Ava.", "Can I help? asked Ava.", "\"Can I help? asked Ava."]], ["Dad said, \"Dinner is ready.\"", ["Dad said, \"Dinner is ready\".", "Dad said \"Dinner is ready.", "Dad said, Dinner is ready."]]];
const compoundGen = () => {
  if (rnd(0, 1)) { const [two, one] = pick(COMPOUND); return choice(`Which joins these into one compound sentence?\n${two}`, one, COMPOUND.filter((c) => c[1] !== one).map((c) => c[1]).concat([two.replace(". ", " ")]).slice(0, 2).concat([two.replace(". ", ", ").replace(/ ([A-Z])/, (m, c) => " " + c.toLowerCase())]), ["Join two sentences with a comma and a joining word (and, but, or, so).", `"${one}"`]); }
  const [right, wrongs] = pick(DIALOG);
  return choice("Which sentence uses quotation marks correctly?", right, wrongs, ["Quotation marks go around the exact words someone says.", "The comma, question mark or period goes inside the closing quotation mark."]);
};
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const capsGen = (lvl, arg) => {
  const n = who(), m = pick(MONTHS), d = pick(DAYS);
  if (arg === "3" && rnd(0, 1)) {
    const [right, wrongs] = pick([["We read Charlotte's Web in class.", ["We read charlotte's web in class.", "We read Charlotte's web in Class.", "we read Charlotte's Web in class."]], ["My aunt lives in Austin, Texas.", ["My aunt lives in austin, texas.", "My Aunt Lives in Austin, Texas.", "my aunt lives in Austin, texas."]], ["We swam in the Gulf of Mexico.", ["We swam in the gulf of mexico.", "We Swam in the Gulf Of Mexico.", "we swam in the gulf of Mexico."]], ["Our class sang \"The Eyes of Texas.\"", ["Our class sang \"the eyes of texas.\"", "our class sang \"The Eyes Of Texas.\"", "Our Class sang \"the Eyes of texas.\""]]]);
    return choice("Which sentence uses capital letters correctly?", right, wrongs, ["Capitalize the first word, names of places, and the important words in titles.", `"${right}"`]);
  }
  const right = `${n} has a party on ${cap(d)}, ${cap(m)} ${rnd(1, 28)}.`;
  const num = right.match(/\d+/)[0];
  return choice("Which sentence uses capital letters correctly?", right, [`${n} has a party on ${d}, ${cap(m)} ${num}.`, `${n.toLowerCase()} has a party on ${cap(d)}, ${m} ${num}.`, `${n} has a Party on ${cap(d)}, ${m} ${num}.`], ["Names of people, days of the week and months start with capital letters.", `"${right}"`]);
};
const punctGen = (lvl, arg) => {
  const k = rnd(0, arg === "3" ? 3 : 2), n = who();
  if (k === 0) { const [s, e] = pick([["Where is my backpack", "?"], ["I love this song", "!"], ["The library opens at nine", "."], ["Can you help me", "?"], ["Watch out for the puddle", "!"], ["We have art on Tuesday", "."]]); return choice(`Which end mark belongs at the end?\n${s}___`, e, [".", "?", "!"].filter((x) => x !== e), [". tells something, ? asks something, ! shows strong feeling.", `"${s}${e}"`], { keepOrder: [".", "?", "!"] }); }
  if (k === 1) { const [a, b, c] = sample(["apples", "grapes", "pears", "bananas", "plums"], 3); const right = `${n} bought ${a}, ${b}, and ${c}.`; return choice("Which sentence uses commas correctly?", right, [`${n} bought ${a} ${b} and ${c}.`, `${n} bought, ${a}, ${b}, and ${c}.`, `${n}, bought ${a} ${b}, and ${c}.`], ["Put commas between items in a list.", `"${right}"`]); }
  if (k === 2) { const m = cap(pick(MONTHS)), d = rnd(1, 28), y = pick([2024, 2025, 2026]); return choice("Which date is written correctly?", `${m} ${d}, ${y}`, [`${m}, ${d} ${y}`, `${m} ${d} ${y}`, `${m.toLowerCase()} ${d}, ${y}`], ["Put a comma between the day and the year.", `${m} ${d}, ${y}.`]); }
  const [right, wrongs] = pick(DIALOG);
  return choice("Which sentence is punctuated correctly?", right, wrongs, ["Quotation marks go around a speaker's exact words.", "Punctuation goes inside the closing quotation mark."]);
};

/* ---------------- writing (Grade 2 and 3) ---------------- */
const W = {
  narrative: [
    ["What is a personal narrative?", "A true story about something that happened to the writer", ["A made-up story about a dragon", "A list of facts about frogs", "A letter asking for something"]],
    ["Which is the best beginning for a personal narrative?", "The day I lost my first tooth, I was eating an apple at lunch.", ["Teeth are important.", "The end.", "Frogs live in ponds."]],
    ["Which word tells the order of events?", "Next", ["Happy", "Blue", "Dog"]],
    ["Which sentence tells how the writer felt?", "My heart was pounding when I stepped on stage.", ["The stage was in the gym.", "There were six chairs.", "The show started at two."]],
    ["Which is the best ending for a story about learning to ride a bike?", "Now I ride my bike to the park every Saturday.", ["Bikes have two wheels.", "First, I got my helmet.", "Once upon a time there was a bike."]],
    ["Which word should a personal narrative use to tell about the writer?", "I", ["they", "you", "it"]],
    ["What should the middle of a narrative have?", "The events in the order they happened", ["Only the ending", "A list of new words", "The title again"]],
    ["Which detail best helps the reader picture the beach?", "The sand was hot and sparkly under my feet.", ["We went to the beach.", "It was fun.", "We went home."]],
  ],
  howto: [
    ["What is the purpose of how-to writing?", "To teach the reader how to do something", ["To tell a made-up story", "To make the reader laugh", "To describe a dream"]],
    ["Which word should come first in the steps?", "First", ["Finally", "Last", "Then"]],
    ["Which would help most in steps for making a sandwich?", "A list of what you need, then numbered steps", ["A poem about bread", "A story about a picnic", "A list of your favorite songs"]],
    ["Which sentence is a fact for a report about frogs?", "Frogs lay their eggs in water.", ["Frogs are the best animals.", "I think frogs are cute.", "Frogs should be pets."]],
    ["Where could you find facts for a report about the moon?", "A science book about space", ["A comic about a talking cat", "A cookbook", "A book of jokes"]],
    ["What is the best title for a report about how bees make honey?", "How Bees Make Honey", ["My Best Day", "Bees Are Fun!!!", "The End"]],
    ["What should the last step in a how-to text tell?", "The final thing to do, like 'Last, enjoy your snack!'", ["The first thing to do", "A new topic", "The title"]],
    ["Which detail belongs in a report about whales?", "Blue whales are the largest animals on Earth.", ["I went to a party.", "My shoes are new.", "Pizza is my favorite food."]],
  ],
  letter: [
    ["Which part of a letter is \"Dear Grandma,\"?", "The greeting", ["The closing", "The signature", "The body"]],
    ["Which part of a letter is \"Love, Ava\"?", "The closing and signature", ["The greeting", "The date", "The body"]],
    ["What goes in the body of a thank-you note?", "What you are thankful for and why", ["Only your name", "Only the date", "A list of spelling words"]],
    ["Which greeting is written correctly?", "Dear Uncle Sam,", ["dear uncle sam", "Dear Uncle Sam.", "Dear, Uncle Sam"]],
    ["Which closing is written correctly?", "Your friend,", ["your friend", "Your Friend.", "Your, friend"]],
    ["Where does the date go in a friendly letter?", "At the top", ["At the very bottom", "In the middle of the body", "Nowhere"]],
    ["Which sentence fits best in a thank-you note for a book?", "Thank you for the book about sharks; I read it every night!", ["Sharks live in the ocean.", "I need new shoes.", "The end."]],
  ],
  opinion: [
    ["Which sentence states an opinion?", "Summer is the best season.", ["Summer comes after spring.", "There are four seasons.", "Summer has long days."]],
    ["Which reason best supports the opinion \"Dogs make great pets\"?", "Dogs are loyal and love to play.", ["Dogs have four legs.", "My cousin has a fish.", "Some dogs are brown."]],
    ["Which words often start an opinion?", "I think", ["Once upon a time", "First, get", "The end"]],
    ["Which is a good research question for a report about penguins?", "What do penguins eat?", ["Do I like penguins?", "Is my shirt blue?", "What did I eat for lunch?"]],
    ["Which is the best ending for an opinion piece?", "That is why I think recess should be longer.", ["Recess is at noon.", "Once upon a time.", "First, go outside."]],
    ["Which word helps connect a reason to an opinion?", "because", ["the", "blue", "jump"]],
    ["Which sentence is a fact, not an opinion?", "Our school has 20 classrooms.", ["Our school is the best.", "Art is more fun than math.", "Lunch should be longer."]],
    ["Where is a good place to find information for research?", "A library book or a trusted website", ["A dream you had", "A guess", "A cartoon"]],
  ],
};
const W_TIP = {
  narrative: "A personal narrative tells a true story from your life, in order, with feelings and details.",
  howto: "How-to and informational writing teach facts or steps, in a clear order.",
  letter: "A letter has a date, a greeting, a body, a closing and a signature.",
  opinion: "An opinion piece says what you think and gives reasons to support it.",
};
const writingGen = (lvl, arg) => {
  const key = W[arg] ? arg : "narrative", [q, a, ws] = pick(W[key]);
  return choice(q, a, ws, [W_TIP[key], `So the best answer is: ${a}`]);
};

export const EN = {
  vowels: vowelsGen, vteams: vteamsGen, rcontrol: rcontrolGen, diph: diphGen, syllables: sylGen, homophone: homophoneGen,
  prefix: prefixGen, suffix: suffixGen, syn: synGen, context: contextGen, figurative: figurativeGen,
  nouns: nounsGen, verbs: verbsGen, adj: adjGen, compare: compareGen, pronoun: pronounGen, relative: relativeGen,
  sentence: sentenceGen, conj: conjGen, compound: compoundGen, caps: capsGen, punct: punctGen, write: writingGen,
};
