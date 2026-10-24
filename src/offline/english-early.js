// Built-in English problems for Kindergarten and Grade 1: letters, sounds, rhyming, short and long
// vowels, blends and digraphs, sight words, early grammar and conventions. Pictures are emoji with
// the word next to them, so a child can read along while Pip reads the question aloud.
import { rnd, pick, shuffle, sample, choice, word } from "./util.js";

const ABC = "abcdefghijklmnopqrstuvwxyz".split("");
// Letters children often mix up, used as wrong choices.
const LOOKALIKE = { b: "dpq", d: "bpq", p: "qbd", q: "pgd", m: "nw", n: "mhu", u: "nv", w: "mv", i: "lj", l: "it", e: "ca", a: "oe", g: "qy", h: "nk", f: "tk", t: "fl", c: "eo", o: "ca", s: "zc", z: "sx", v: "uw", y: "vg", j: "ig", k: "hx", r: "nh", x: "kz" };
const wrongLetters = (l, n = 3) => [...new Set([...(LOOKALIKE[l] || ""), ...sample(ABC.filter((x) => x !== l), 4)])].filter((x) => x !== l).slice(0, n);

const PICS = [["🐶", "dog"], ["🐱", "cat"], ["☀️", "sun"], ["🐟", "fish"], ["🍎", "apple"], ["🐝", "bee"], ["🎈", "balloon"], ["🦊", "fox"], ["🐷", "pig"], ["🥚", "egg"], ["🐸", "frog"], ["🌙", "moon"], ["🐮", "cow"], ["🦆", "duck"], ["🐭", "mouse"], ["🚌", "bus"], ["🎩", "hat"], ["🪁", "kite"], ["🐍", "snake"], ["🍋", "lemon"], ["🦁", "lion"], ["🐢", "turtle"], ["🌽", "corn"], ["🥕", "carrot"], ["🐐", "goat"], ["🛏️", "bed"], ["🔑", "key"], ["🌳", "tree"], ["🐻", "bear"], ["🦓", "zebra"], ["🧦", "sock"], ["🐙", "octopus"], ["🍉", "melon"], ["🎸", "guitar"], ["🦉", "owl"], ["🐞", "bug"], ["🪣", "pail"], ["🧸", "teddy"], ["🦷", "tooth"], ["🍪", "cookie"]];
const show = ([e, w]) => `${e} ${w}`;

/* ---------------- letters ---------------- */
const lettersGen = (lvl, arg) => {
  const l = pick(ABC), U = l.toUpperCase();
  if (arg === "upper") return choice(`Which is the capital (uppercase) letter for "${l}"?`, U, wrongLetters(l).map((x) => x.toUpperCase()), [`Capital letters are the big letters.`, `The capital of "${l}" is "${U}".`]);
  if (arg === "lower") return choice(`Which is the small (lowercase) letter for "${U}"?`, l, wrongLetters(l), [`Lowercase letters are the small letters.`, `The lowercase of "${U}" is "${l}".`]);
  if (arg === "match") return choice("Which pair is the same letter, big and small?", U + l, wrongLetters(l).map((x) => U + x), [`Say the name of the capital letter.`, `"${U}" and "${l}" are both the letter ${U}.`]);
  const [e, w] = pick(PICS.filter((p) => p[1].length <= 6)), k = rnd(0, 2);
  if (k === 0) return choice(`What is the first letter in "${w}"? ${e}`, w[0], wrongLetters(w[0]), [`Look at the left side of the word: that's where it starts.`, `"${w}" starts with "${w[0]}".`]);
  if (k === 1) return word(`How many letters are in the word "${w}"? ${e}`, String(w.length), [`Point to each letter as you count.`, `${w.split("").join(", ")}: ${w.length} letters.`]);
  return choice(`What is the last letter in "${w}"? ${e}`, w.at(-1), wrongLetters(w.at(-1)), [`Look at the right side of the word: that's where it ends.`, `"${w}" ends with "${w.at(-1)}".`]);
};

/* ---------------- sounds ---------------- */
// Words grouped by first sound and by last sound (sounds, not just letters).
const START = { b: ["bat", "bed", "bus", "ball"], c: ["cat", "cup", "cow", "corn"], d: ["dog", "duck", "doll", "door"], f: ["fish", "fox", "fan", "fork"], g: ["goat", "gum", "gate", "girl"], h: ["hat", "hen", "hop", "house"], l: ["lion", "leg", "lamp", "leaf"], m: ["moon", "mop", "milk", "map"], n: ["nest", "nut", "net", "nose"], p: ["pig", "pan", "pen", "pie"], r: ["rug", "rat", "ring", "rain"], s: ["sun", "sock", "seal", "sit"], t: ["top", "tub", "ten", "tooth"], w: ["web", "wig", "wet", "wagon"] };
const END = { t: ["cat", "hat", "net", "pot"], g: ["dog", "pig", "bag", "rug"], n: ["sun", "pen", "fan", "bun"], p: ["cup", "mop", "map", "cap"], d: ["bed", "red", "lid", "mud"], x: ["fox", "box", "six", "wax"], s: ["bus", "yes", "gas", "plus"], m: ["ham", "drum", "gum", "jam"], k: ["duck", "sock", "book", "milk"] };
const EMO = Object.fromEntries(PICS.map(([e, w]) => [w, e]));
const withPic = (w) => (EMO[w] ? `${EMO[w]} ${w}` : w);
const soundGen = (lvl, arg) => {
  const end = arg === "end", bank = end ? END : START, [s, ws] = pick(Object.entries(bank)), w = pick(ws);
  const others = Object.entries(bank).filter(([k]) => k !== s).flatMap(([, v]) => v);
  if (rnd(0, 1)) return choice(`What sound do you hear at the ${end ? "end" : "beginning"} of "${withPic(w)}"?`, s, sample(Object.keys(bank).filter((x) => x !== s), 3), [`Say "${w}" slowly.`, `Listen to the ${end ? "last" : "first"} sound: /${s}/.`]);
  const ref = pick(ws.filter((x) => x !== w));
  return choice(`Which word ${end ? "ends" : "begins"} with the same sound as "${withPic(ref)}"?`, withPic(w), sample(others, 3).map(withPic), [`Say "${ref}". The ${end ? "last" : "first"} sound is /${s}/.`, `"${w}" ${end ? "ends" : "begins"} with /${s}/ too.`]);
};
const RHYME = [["cat", "hat", "bat", "mat"], ["dog", "log", "frog", "fog"], ["sun", "fun", "run", "bun"], ["bee", "tree", "see", "key"], ["cake", "lake", "snake", "bake"], ["pig", "wig", "dig", "big"], ["bug", "rug", "mug", "hug"], ["moon", "spoon", "soon", "noon"], ["bed", "red", "sled", "head"], ["fox", "box", "socks", "rocks"], ["star", "car", "jar", "far"], ["coat", "goat", "boat", "float"], ["ring", "sing", "king", "wing"], ["mouse", "house", "blouse", "grouse"]];
const rhymeGen = () => {
  const set = pick(RHYME), [a, b] = sample(set, 2), others = RHYME.filter((r) => r !== set).map((r) => pick(r));
  if (rnd(0, 2)) return choice(`Which word rhymes with "${withPic(a)}"?`, withPic(b), sample(others, 3).map(withPic), ["Rhyming words end with the same sound.", `"${a}" and "${b}" end with the same sound.`]);
  const c = pick(others);
  return choice(`Do "${a}" and "${c}" rhyme?`, "no", ["yes"], ["Say both words. Do the ends sound the same?", `"${a}" and "${c}" end with different sounds, so they do not rhyme.`], { keepOrder: ["yes", "no"] });
};
const CLAP = [["cat", 1], ["dog", 1], ["sun", 1], ["frog", 1], ["apple", 2], ["tiger", 2], ["pencil", 2], ["rabbit", 2], ["monkey", 2], ["window", 2], ["banana", 3], ["elephant", 3], ["butterfly", 3], ["dinosaur", 3], ["octopus", 3], ["kangaroo", 3]];
const clapGen = () => { const [w, n] = pick(CLAP); return word(`Clap the word "${withPic(w)}". How many claps (syllables)?`, String(n), [`Say "${w}" and clap each part.`, `"${w}" has ${n} clap${n > 1 ? "s" : ""}.`]); };

/* ---------------- vowels ---------------- */
const SHORT = { a: ["cat", "hat", "map", "bag", "fan", "jam"], i: ["pig", "lid", "pin", "six", "wig", "fish"], o: ["dog", "pot", "box", "mop", "fox", "log"], e: ["bed", "hen", "net", "ten", "web", "leg"], u: ["sun", "bug", "cup", "bus", "rug", "duck"] };
const KEYW = { a: "cat", i: "pig", o: "dog", e: "bed", u: "sun" };
const shortGen = (lvl, arg) => {
  const vs = arg && arg !== "all" ? arg.split("") : Object.keys(SHORT), v = pick(vs), w = pick(SHORT[v]);
  const k = rnd(0, 1);
  if (k === 0) return choice(`Which letter is missing? ${EMO[w] ? EMO[w] + " " : ""}${w.replace(v, "_")}`, v, Object.keys(SHORT).filter((x) => x !== v).slice(0, 3), [`Say "${w}" and listen to the middle sound.`, `It's the short ${v} sound, like in "${KEYW[v]}": ${w}.`]);
  const others = Object.entries(SHORT).filter(([k]) => k !== v).flatMap(([, x]) => x);
  return choice(`Which word has the short ${v} sound, like in "${KEYW[v]}"?`, withPic(w === KEYW[v] ? pick(SHORT[v].filter((x) => x !== w)) : w), sample(others, 3).map(withPic), [`Say each word and listen to the middle.`, `Short ${v} sounds like the ${v} in "${KEYW[v]}".`]);
};
const SILENT = [["cap", "cape"], ["kit", "kite"], ["tap", "tape"], ["pin", "pine"], ["hop", "hope"], ["tub", "tube"], ["can", "cane"], ["rob", "robe"], ["not", "note"], ["cub", "cube"], ["mad", "made"], ["bit", "bite"]];
const silentGen = () => {
  const [s, l] = pick(SILENT), k = rnd(0, 1);
  if (k === 0) return choice(`Add a silent e to "${s}". What new word do you make?`, l, [s + "s", s.slice(0, -1) + "e", s + "y"].filter((x) => x !== l), ["Silent e goes at the end and makes the vowel say its name.", `${s} + e = ${l}.`]);
  if (k === 1) return choice(`Which word has a long vowel because of silent e?`, l, sample(SILENT.filter((p) => p[0] !== s).map((p) => p[0]), 3), ["Look for an e at the end.", `"${l}" ends with a silent e, so the ${l.match(/[aiou]/)[0]} says its name.`]);
};
const silentGenFixed = (lvl) => {
  if (rnd(0, 2)) return silentGen(lvl);
  const [s, l] = pick(SILENT), w = pick([s, l]), long = w === l;
  return choice(`Is the vowel in "${w}" short or long?`, long ? "long" : "short", [long ? "short" : "long"], [long ? "It ends with a silent e." : "There is no silent e at the end.", long ? `Silent e makes the vowel long: ${w}.` : `The vowel is short: ${w}.`], { keepOrder: ["short", "long"] });
};
const BLENDS = { bl: ["block", "blue", "blob"], cl: ["clap", "clock", "cloud"], fl: ["flag", "flip", "fly"], gr: ["grass", "grin", "grape"], tr: ["tree", "truck", "train"], st: ["star", "stop", "step"], sn: ["snail", "snack", "snow"], dr: ["drum", "drip", "dress"], fr: ["frog", "frost", "fruit"], sw: ["swim", "swing", "sweep"], pl: ["plum", "plant", "plate"], sk: ["skip", "skunk", "sky"] };
const DIGRAPHS = { sh: ["ship", "shell", "fish", "dish"], ch: ["chip", "chin", "lunch", "bench"], th: ["thumb", "three", "bath", "math"], wh: ["whale", "wheel", "whisk", "white"] };
const NGNK = { ng: ["ring", "king", "song", "swing", "long", "wing"], nk: ["sink", "pink", "bank", "skunk", "trunk", "wink"] };
const partGen = (bank, label, where = "start") => () => {
  const [p, ws] = pick(Object.entries(bank)), w = pick(ws), at = where === "end" ? w.lastIndexOf(p) : w.indexOf(p);
  const blank = w.slice(0, at) + "__" + w.slice(at + p.length);
  if (rnd(0, 1)) return choice(`Which letters complete the word? ${EMO[w] ? EMO[w] + " " : ""}${blank}`, p, sample(Object.keys(bank).filter((x) => x !== p), 3), [`Say "${w}" slowly.`, `"${w}" is spelled with "${p}".`]);
  const others = Object.entries(bank).filter(([k]) => k !== p).flatMap(([, v]) => v);
  return choice(`Which word has the ${label} "${p}"?`, w, sample(others, 3), [`Look for "${p}" in each word.`, `"${w}" has "${p}".`]);
};
const blendGen = partGen(BLENDS, "blend");
const digraphGen = partGen(DIGRAPHS, "letters");
const ngnkGen = partGen(NGNK, "ending", "end");
const TEAMS1 = { ai: ["rain", "tail", "paint", "snail"], ay: ["play", "day", "tray", "hay"], ee: ["bee", "tree", "feet", "sheep"], ea: ["leaf", "seal", "beach", "team"], oa: ["boat", "goat", "road", "soap"], ow: ["snow", "bowl", "grow", "crow"] };
const teamGen = (lvl, arg) => {
  const keys = arg ? arg.match(/../g) : Object.keys(TEAMS1);
  const t = pick(keys), w = pick(TEAMS1[t]), k = rnd(0, 1);
  if (k === 0) return choice(`Which letters complete the word? ${EMO[w] ? EMO[w] + " " : ""}${w.replace(t, "__")}`, t, sample(Object.keys(TEAMS1).filter((x) => x !== t), 3), [`Two vowels work together to make one long sound.`, `"${w}" is spelled with "${t}".`]);
  const others = ["cat", "sit", "dog", "bed", "cup", "fish", "jump", "hand", "milk"];
  return choice(`Which word has the vowel team "${t}"?`, w, sample(others, 3), [`Look for "${t[0]}" and "${t[1]}" side by side.`, `"${w}" has "${t}".`]);
};

/* ---------------- sight words ---------------- */
const SIGHT = [["the", "a", "I", "see"], ["is", "and", "can", "we"], ["like", "to", "go", "my"]];
const SIGHT_SENT = { the: "I see ___ dog.", a: "I have ___ hat.", I: "Mom and ___ like cats.", see: "I can ___ the moon.", is: "The sun ___ hot.", and: "I like cats ___ dogs.", can: "I ___ jump.", we: "Can ___ go to school?", like: "I ___ apples.", to: "We go ___ the park.", go: "Let's ___ home.", my: "This is ___ bike." };
// Other sight words that would also make sense in a sentence, so they are never wrong choices.
const SIGHT_FITS = { the: ["a", "my"], a: ["the", "my"], my: ["the", "a"], like: ["see"], see: ["like"], we: ["I"], I: ["we"], can: ["like", "see"] };
const sightGen = (lvl, arg) => {
  const set = SIGHT[+arg] || SIGHT.flat(), all = SIGHT.flat(), w = pick(set);
  if (rnd(0, 1)) return choice(`Find the word "${w}".`, w, sample(all.filter((x) => x !== w), 3), [`Look at each letter: ${w.split("").join("-")}.`, `That's "${w}".`]);
  return choice(`Which word completes the sentence?\n${SIGHT_SENT[w]}`, w, sample(all.filter((x) => x !== w && !(SIGHT_FITS[w] || []).includes(x)), 3), ["Read the sentence with each word.", `"${SIGHT_SENT[w].replace("___", w)}"`]);
};

/* ---------------- words and grammar ---------------- */
const OPP = [["hot", "cold"], ["big", "small"], ["up", "down"], ["fast", "slow"], ["happy", "sad"], ["day", "night"], ["in", "out"], ["wet", "dry"], ["open", "closed"], ["tall", "short"], ["full", "empty"], ["loud", "quiet"], ["old", "new"], ["on", "off"]];
const oppGen = () => {
  const [a, b] = pick(OPP), flip = rnd(0, 1), [x, y] = flip ? [b, a] : [a, b];
  return choice(`What is the opposite of "${x}"?`, y, sample(OPP.filter((p) => !p.includes(x)).flat(), 3), ["Opposites mean very different things.", `The opposite of "${x}" is "${y}".`]);
};
const CATS = { colors: ["red", "blue", "green", "yellow", "purple"], animals: ["cat", "dog", "horse", "duck", "pig"], foods: ["apple", "bread", "milk", "rice", "pizza"], toys: ["ball", "doll", "kite", "blocks", "yo-yo"], clothes: ["shirt", "sock", "hat", "coat", "shoe"], weather: ["rain", "snow", "wind", "sunny", "cloudy"] };
const catGen = () => {
  const [g, ws] = pick(Object.entries(CATS)), other = Object.entries(CATS).filter(([k]) => k !== g).flatMap(([, v]) => v);
  if (rnd(0, 1)) { const odd = pick(other), set = shuffle([...sample(ws, 3), odd]); return choice(`Which word does not belong?\n${set.join(", ")}`, odd, set.filter((x) => x !== odd), [`Three of the words are ${g}.`, `"${odd}" is not one of the ${g}.`], { keepOrder: set }); }
  return choice(`Which word is one of the ${g}?`, pick(ws), sample(other, 3), [`Think about what ${g} are.`, `Pick the word that names one of the ${g}.`]);
};
const NOUNK = [["dog", ["run", "big", "soft"]], ["park", ["jump", "red", "happy"]], ["teacher", ["sing", "tall", "fast"]], ["ball", ["kick", "blue", "sleepy"]], ["school", ["read", "loud", "wet"]], ["mom", ["sit", "cold", "funny"]], ["house", ["play", "tiny", "hot"]]];
const VERBK = [["jump", ["cat", "red", "tree"]], ["run", ["ball", "happy", "car"]], ["swim", ["fish", "blue", "pond"]], ["eat", ["apple", "soft", "plate"]], ["sing", ["bird", "loud", "song"]], ["clap", ["hands", "big", "sun"]], ["hop", ["frog", "green", "log"]]];
const nounKGen = (lvl, arg) => {
  if (arg === "verb") { const [v, ws] = pick(VERBK); return choice("Which word is an action word (a verb)?", v, ws, ["An action word tells what someone does.", `You can ${v}, so "${v}" is an action word.`]); }
  const [n, ws] = pick(NOUNK);
  return choice("Which word names a person, place or thing (a noun)?", n, ws, ["A noun names a person, a place or a thing.", `"${n}" is a noun.`]);
};
const PLURALS = [["cat", "cats"], ["dog", "dogs"], ["hat", "hats"], ["cup", "cups"], ["bug", "bugs"], ["pig", "pigs"], ["box", "boxes"], ["bus", "buses"], ["dish", "dishes"], ["fox", "foxes"], ["bench", "benches"], ["bed", "beds"]];
const pluralGen = (lvl, arg) => {
  const pool = arg === "s" ? PLURALS.filter(([, p]) => !p.endsWith("es")) : PLURALS, [s, p] = pick(pool);
  return choice(`One ${s}, two ___`, p, [s, s + (p.endsWith("es") ? "s" : "es"), s + "z"].filter((x) => x !== p), [p.endsWith("es") ? "Words that end in s, x, sh or ch add -es." : "Add -s to mean more than one.", `One ${s}, two ${p}.`]);
};
const PRON1 = [["Ava is my friend. ___ likes to paint.", "She", ["He", "Me", "We"]], ["Leo is tall. ___ plays basketball.", "He", ["She", "Me", "I"]], ["___ am six years old.", "I", ["Me", "He", "She"]], ["Mom gave the cup to ___.", "me", ["I", "he", "she"]], ["Sam has a dog. ___ walks it every day.", "He", ["She", "I", "Me"]], ["Grandma bakes bread. ___ lets me help.", "She", ["He", "Me", "I"]], ["Can you help ___ tie my shoe?", "me", ["I", "she", "he"]]];
const pron1Gen = () => { const [s, a, ws] = pick(PRON1); return choice(`Which word completes the sentence?\n${s}`, a, ws, ["A pronoun takes the place of a name.", `"${s.replace("___", a)}"`]); };
const ADJ1 = [["The red ball rolled away.", "red", ["ball", "rolled", "away"]], ["I have a soft blanket.", "soft", ["have", "blanket", "I"]], ["The big dog barked.", "big", ["dog", "barked", "The"]], ["We ate sweet grapes.", "sweet", ["ate", "grapes", "We"]], ["She has two cats.", "two", ["has", "cats", "She"]], ["The cold wind blew.", "cold", ["wind", "blew", "The"]], ["A tiny bug sat on the leaf.", "tiny", ["bug", "sat", "leaf"]]];
const adj1Gen = () => { const [s, a, ws] = pick(ADJ1); return choice(`Which word describes (tells more about) a noun?\n${s}`, a, ws, ["Describing words tell color, size, number or how something feels.", `"${a}" describes the noun.`]); };
const KINDS = [["Do you like pizza", "question", "?"], ["I have a red bike", "statement", "."], ["Wow, we won", "exclamation", "!"], ["Where is my hat", "question", "?"], ["The dog is sleeping", "statement", "."], ["Look out", "exclamation", "!"], ["Can we go outside", "question", "?"], ["We ate lunch at noon", "statement", "."], ["That was so much fun", "exclamation", "!"]];
const kindGen = (lvl, arg) => {
  const [s, kind, mark] = pick(arg === "k" ? KINDS.filter((k) => k[1] !== "exclamation") : KINDS);
  if (arg === "k" || rnd(0, 1)) return choice(`Which mark goes at the end?\n${s}___`, mark, arg === "k" ? [mark === "." ? "?" : "."] : [".", "?", "!"], [". ends a telling sentence. ? ends an asking sentence.", ...(arg === "k" ? [] : ["! shows strong feeling."]), `"${s}${mark}"`], { keepOrder: arg === "k" ? [".", "?"] : [".", "?", "!"] });
  return choice(`What kind of sentence is this?\n${s}${mark}`, kind, ["statement", "question", "exclamation"], ["A statement tells. A question asks. An exclamation shows strong feeling.", `It ends with "${mark}", so it is ${kind === "exclamation" ? "an" : "a"} ${kind}.`], { keepOrder: ["statement", "question", "exclamation"] });
};
const SENTK = [["The cat naps.", ["the cat", "naps the", "cat The naps."]], ["I like to read.", ["i like to read", "like I read to.", "to read"]], ["We play tag.", ["we play tag", "play tag", "tag We play."]], ["The sun is hot.", ["the sun is hot", "sun hot", "is The sun hot."]], ["My dog can run.", ["my dog can run", "dog can", "run My can dog."]], ["Mom reads to me.", ["mom reads to me", "reads Mom", "to me Mom reads."]], ["The bird can sing.", ["the bird can sing", "bird sing", "sing The bird can."]], ["I see a red car.", ["i see a red car", "a red car", "car I see a red."]], ["We like the zoo.", ["we like the zoo", "the zoo", "zoo We the like."]]];
const sentKGen = () => { const [r, ws] = pick(SENTK); return choice("Which one is written as a sentence?", r, ws, ["A sentence starts with a capital letter, ends with a mark, and makes sense.", `"${r}"`]); };
const capKGen = () => {
  const items = [["Sam has a dog.", ["sam has a dog.", "Sam has a Dog.", "sAm has a dog."]], ["I like Texas.", ["i like Texas.", "I like texas.", "I Like texas."]], ["My cat is Max.", ["my cat is max.", "My cat is max.", "my Cat is Max."]], ["We go to the park.", ["we go to the park.", "We Go to the park.", "we go To the park."]], ["Mia and I run.", ["mia and i run.", "Mia and i run.", "mia and I run."]], ["Ben has a cat.", ["ben has a cat.", "Ben Has a cat.", "ben has a Cat."]], ["The bus is big.", ["the bus is big.", "The Bus is big.", "the bus Is big."]], ["Can I go?", ["can I go?", "Can i go?", "can i go?"]], ["Zoe likes to hop.", ["zoe likes to hop.", "Zoe Likes to hop.", "zoe likes To hop."]]];
  const [r, ws] = pick(items);
  return choice("Which sentence uses capital letters the right way?", r, ws, ["Start a sentence with a capital letter. Names and the word I are always capital.", `"${r}"`]);
};
const COMPOUNDS = [["sun", "flower", "sunflower"], ["rain", "bow", "rainbow"], ["cup", "cake", "cupcake"], ["star", "fish", "starfish"], ["fire", "truck", "firetruck"], ["butter", "fly", "butterfly"], ["snow", "man", "snowman"], ["foot", "ball", "football"], ["pop", "corn", "popcorn"], ["bed", "room", "bedroom"]];
const compound1Gen = () => {
  const [a, b, c] = pick(COMPOUNDS);
  if (rnd(0, 1)) return choice(`Put the two words together: ${a} + ${b} = ?`, c, [a + pick(COMPOUNDS)[1], pick(COMPOUNDS)[0] + b, b + a].filter((x) => x !== c), ["A compound word is two small words joined together.", `${a} + ${b} = ${c}.`]);
  return choice(`Which two words make "${c}"?`, `${a} + ${b}`, [`${c.slice(0, 2)} + ${c.slice(2)}`, `${b} + ${a}`, `${a} + ${pick(COMPOUNDS)[1]}`].filter((x) => x !== `${a} + ${b}`), ["Look for two small words inside the big word.", `${c} = ${a} + ${b}.`]);
};
const ENDINGS = [["jump", "jumped", "jumping"], ["play", "played", "playing"], ["kick", "kicked", "kicking"], ["help", "helped", "helping"], ["look", "looked", "looking"], ["rest", "rested", "resting"], ["fish", "fished", "fishing"], ["pick", "picked", "picking"]];
const endingGen = () => {
  const [b, ed, ing] = pick(ENDINGS);
  const rest = { jump: "over the rock", play: "with my friend", kick: "the ball", help: "my dad", look: "at the stars", rest: "on the couch", fish: "at the lake", pick: "apples" }[b];
  if (rnd(0, 1)) return choice(`Which word completes the sentence?\nYesterday I ___ ${rest}.`, ed, [ing, b], ["Yesterday means it already happened, so add -ed.", `Yesterday I ${ed} ${rest}.`]);
  return choice(`Which word completes the sentence?\nRight now I am ___ ${rest}.`, ing, [ed, b], ["\"Right now I am\" goes with -ing.", `Right now I am ${ing} ${rest}.`]);
};
const COMMA1 = () => {
  const [m, d, y] = [pick(["May", "June", "July", "March", "October"]), rnd(1, 28), pick([2025, 2026, 2027])];
  if (rnd(0, 1)) return choice("Which date is written correctly?", `${m} ${d}, ${y}`, [`${m} ${d} ${y}`, `${m}, ${d} ${y}`, `${m} ${d}, ${y},`], ["Put a comma between the day and the year.", `${m} ${d}, ${y}`]);
  const [a, b, c] = sample(["eggs", "milk", "bread", "apples", "jam", "corn"], 3);
  return choice("Which list uses commas correctly?", `We got ${a}, ${b}, and ${c}.`, [`We got ${a} ${b} and ${c}.`, `We got, ${a} ${b}, and ${c}.`, `We, got ${a}, ${b} and ${c}.`], ["Put commas between the things in a list.", `We got ${a}, ${b}, and ${c}.`]);
};

export const EN_EARLY = {
  letters: lettersGen, sound: soundGen, rhyme: rhymeGen, clap: clapGen, short: shortGen, silent: silentGenFixed,
  blend: blendGen, digraph: digraphGen, ngnk: ngnkGen, team: teamGen, sight: sightGen,
  opp: oppGen, cat: catGen, nounk: nounKGen, plural: pluralGen, pron1: pron1Gen, adj1: adj1Gen,
  kind: kindGen, sentk: sentKGen, capk: capKGen, compound1: compound1Gen, ending: endingGen, comma1: COMMA1,
};
