// Built-in English practice for Grades 6 to 8: word meaning, grammar, punctuation, style, research
// and writing. Each bank is [question, answer, wrong answers, why]. Same shape as english-upper.js.
import { pick, rnd, choice } from "./util.js";

const ask = ([q, a, ws, why], tip) => choice(q, a, ws, [tip, why || `The answer is: ${a}`]);
const bank = (items, tip) => () => ask(pick(items), tip);
// A bank split by kind ("arg" picks one kind); now and then it mixes in a question of another kind.
const kinds = (groups, tips) => (lvl, arg) => {
  const k = groups[arg] && rnd(0, 3) ? arg : pick(Object.keys(groups));
  return ask(pick(groups[k]), tips[k]);
};

/* ---------------- word meaning ---------------- */
const CONNOT = [
  ["Which word has the most positive connotation?", "thrifty", ["cheap", "stingy", "tight-fisted"], "Thrifty suggests being smart with money; the others sound negative."],
  ["Which word has the most negative connotation?", "nosy", ["curious", "interested", "inquisitive"], "Nosy suggests poking into other people's business."],
  ["Which word has the most positive connotation?", "confident", ["arrogant", "cocky", "conceited"], "Confident is a good kind of self-belief; the others sound like bragging."],
  ["\"The house was old.\" Which word for old sounds most positive?", "historic", ["run-down", "ancient", "shabby"], "Historic suggests value and importance."],
  ["Which word has the most negative connotation?", "scrawny", ["slender", "slim", "lean"], "Scrawny suggests too thin and weak."],
  ["What is the denotation of a word?", "Its dictionary meaning", ["The feelings it brings up", "How it sounds", "How long it is"], "Denotation is the literal meaning; connotation is the feeling."],
  ["Which word for a smell sounds most pleasant?", "aroma", ["stench", "odor", "reek"], "Aroma suggests a nice smell."],
  ["Which word has the most negative connotation?", "stubborn", ["determined", "persistent", "dedicated"], "Stubborn suggests refusing to change for no good reason."],
  ["Which word has the most positive connotation?", "youthful", ["childish", "immature", "babyish"], "Youthful suggests fresh energy; the others suggest acting too young."],
  ["A writer calls a crowd a \"mob.\" What feeling does that create?", "The crowd seems wild and dangerous.", ["The crowd seems calm.", "The crowd seems small.", "The crowd seems friendly."], "Mob has a negative, threatening connotation."],
];
const FIG3 = [
  ["\"The old car groaned up the hill.\" What kind of figurative language is this?", "personification", ["simile", "hyperbole", "alliteration"], "A car can't really groan; it is given a human action."],
  ["\"Her voice was music to his ears.\" What kind of figurative language is this?", "metaphor", ["simile", "personification", "onomatopoeia"], "It says her voice IS music, with no like or as."],
  ["\"The snow fell as softly as a whisper.\" What kind of figurative language is this?", "simile", ["metaphor", "personification", "hyperbole"], "It compares using as."],
  ["\"I've told you a million times!\" What kind of figurative language is this?", "hyperbole", ["simile", "metaphor", "personification"], "It is a huge exaggeration."],
  ["\"The wind howled through the trees.\" What does this personification suggest?", "The wind was loud and wild.", ["The wind was gentle.", "There was no wind.", "The trees were happy."], "Howling is loud and fierce."],
  ["\"Time is a thief.\" What does this metaphor mean?", "Time takes things away from us without our noticing.", ["Time steals money.", "Clocks are dangerous.", "People should not waste money."], "Like a thief, time quietly takes moments away."],
  ["Which sentence uses personification?", "The sun smiled down on the picnic.", ["The sun was very bright.", "The sun was like a lamp.", "The sun set at seven."], "The sun can't smile; that is a human action."],
  ["\"Sizzle,\" \"buzz\" and \"crash\" are examples of what?", "onomatopoeia", ["metaphor", "personification", "simile"], "Onomatopoeia words sound like what they name."],
];
const ALLUSION = [
  ["\"He has the patience of Job.\" This is an allusion. What does it mean?", "He is very patient.", ["He has a great job.", "He is in a hurry.", "He is a farmer."], "Job is a figure known for great patience."],
  ["\"Our coach has a Midas touch.\" What does the allusion mean?", "Everything the coach does turns out successful.", ["The coach is greedy.", "The coach likes gold.", "The coach touches everything."], "King Midas turned everything he touched into gold."],
  ["What is an allusion?", "A short reference to a well-known person, place, story or event", ["A comparison using like or as", "A word that sounds like a noise", "A huge exaggeration"], "Allusions point to something the reader already knows."],
  ["\"The new phone was his Achilles' heel.\" What does it mean?", "The phone was his weak spot.", ["The phone hurt his foot.", "The phone was very strong.", "The phone was a gift."], "Achilles could only be hurt in his heel."],
  ["\"She opened a Pandora's box when she asked that question.\" What does it mean?", "Her question caused many unexpected problems.", ["She found a treasure.", "She opened a present.", "Her question was easy."], "Pandora's box released troubles into the world."],
  ["\"Don't be a Scrooge!\" What does the allusion mean?", "Don't be stingy.", ["Don't be scared.", "Don't be late.", "Don't be loud."], "Scrooge is a famously stingy character."],
  ["\"It was a David and Goliath game.\" What does it mean?", "A small, weaker team faced a much bigger one.", ["Two giants played.", "The game was boring.", "Both teams were equal."], "Little David defeated the giant Goliath."],
  ["\"He's a real Romeo.\" What does the allusion suggest?", "He is romantic.", ["He is a good cook.", "He is very tall.", "He is a fast runner."], "Romeo is a famous romantic character."],
];
const ANALOGY = [
  ["Complete the analogy: hot is to cold as up is to ___", "down", ["over", "high", "warm"], "Hot and cold are opposites, so up goes with its opposite, down."],
  ["Complete the analogy: author is to book as composer is to ___", "song", ["piano", "pen", "theater"], "An author creates a book; a composer creates a song."],
  ["Complete the analogy: petal is to flower as page is to ___", "book", ["paper", "pen", "write"], "A petal is part of a flower; a page is part of a book."],
  ["Complete the analogy: hammer is to nail as screwdriver is to ___", "screw", ["wood", "drill", "tool"], "Each tool is used on the thing named."],
  ["Complete the analogy: puppy is to dog as kitten is to ___", "cat", ["mouse", "pet", "fur"], "A puppy grows into a dog; a kitten grows into a cat."],
  ["Complete the analogy: glove is to hand as sock is to ___", "foot", ["shoe", "leg", "wool"], "A glove covers a hand; a sock covers a foot."],
  ["Complete the analogy: tired is to exhausted as happy is to ___", "ecstatic", ["sad", "glad", "sleepy"], "Exhausted is much more tired; ecstatic is much more happy."],
  ["Complete the analogy: chef is to kitchen as teacher is to ___", "classroom", ["student", "lesson", "chalk"], "A chef works in a kitchen; a teacher works in a classroom."],
  ["Complete the analogy: seed is to tree as egg is to ___", "bird", ["nest", "shell", "fly"], "A seed grows into a tree; an egg hatches into a bird."],
];
const IRONY = [
  ["During a huge storm, Leo says, \"Lovely weather we're having!\" What is this?", "verbal irony", ["a pun", "a simile", "dramatic irony"], "He says the opposite of what he means."],
  ["\"I used to be a banker, but I lost interest.\" What makes this a pun?", "\"Interest\" has two meanings: money earned and curiosity.", ["It rhymes.", "It exaggerates.", "It compares two things with like."], "A pun plays on a word's double meaning."],
  ["What is verbal irony?", "Saying the opposite of what you really mean", ["A play on words that sound alike", "When readers know more than characters", "A comparison using as"], "Sarcasm is a common kind of verbal irony."],
  ["Which sentence is a pun?", "The bicycle couldn't stand up because it was two-tired.", ["The bicycle was very fast.", "The bicycle was red and shiny.", "The bicycle flew like a bird."], "\"Two-tired\" sounds like \"too tired.\""],
  ["After failing a test, Mia mutters, \"Well, that went great.\" What is this?", "verbal irony", ["a pun", "personification", "hyperbole"], "She means it went badly."],
  ["\"A boiled egg every morning is hard to beat.\" Why is this a pun?", "\"Beat\" means both to stir eggs and to do better than.", ["Eggs are hard.", "It uses a simile.", "It is an exaggeration."], "The joke plays on two meanings of beat."],
  ["What is dramatic irony?", "When the reader knows something a character does not", ["When a character tells a joke", "When words sound alike", "When a story has a happy ending"], "Dramatic irony builds suspense or humor."],
  ["A firefighter's house burns down. What kind of irony is this?", "situational irony", ["verbal irony", "a pun", "dramatic irony"], "The outcome is the opposite of what you would expect."],
];
const WORDREL = [
  ["Which word is an antonym of \"generous\"?", "selfish", ["kind", "giving", "helpful"], "Antonyms have opposite meanings."],
  ["Which word is a synonym of \"enormous\"?", "gigantic", ["tiny", "average", "narrow"], "Synonyms have similar meanings."],
  ["Which word is a more specific example of \"vehicle\"?", "motorcycle", ["transportation", "machine", "travel"], "A motorcycle is one kind of vehicle."],
  ["\"Bark\" in \"The tree's bark was rough\" means…", "the outer covering of a tree", ["a dog's sound", "a kind of ship", "to shout"], "Context shows it is about a tree."],
  ["Which pair shows cause and effect?", "rain : flood", ["rain : umbrella", "rain : cloud", "rain : puddle"], "Too much rain can cause a flood."],
  ["Which words go from weakest to strongest?", "warm, hot, scorching", ["scorching, warm, hot", "hot, warm, scorching", "warm, scorching, hot"], "Each word is more intense than the one before."],
  ["Which word does NOT belong: oak, maple, pine, daisy?", "daisy", ["oak", "maple", "pine"], "The others are trees; a daisy is a flower."],
  ["Which word is an antonym of \"ancient\"?", "modern", ["old", "historic", "aged"], "Modern is the opposite of ancient."],
];

/* ---------------- pronouns ---------------- */
const INTENS = [
  ["Which sentence uses an intensive pronoun?", "The mayor herself cut the ribbon.", ["The mayor cut the ribbon.", "She cut the ribbon.", "The mayor cut her ribbon."], "\"Herself\" adds emphasis; the sentence works without it."],
  ["Choose the intensive pronoun: \"We painted the mural ___.\"", "ourselves", ["us", "we", "ours"], "Ourselves emphasizes that we did it."],
  ["Which pronoun is used incorrectly?", "Me and Jay went home.", ["Jay and I went home.", "I myself went home.", "We went home."], "Use I as a subject: Jay and I."],
  ["\"I made the cake myself.\" What does \"myself\" do?", "It emphasizes who made the cake.", ["It is the subject.", "It shows ownership.", "It joins two sentences."], "Intensive pronouns add emphasis."],
  ["Which is correct?", "They built the fort themselves.", ["They built the fort theirselves.", "They built the fort themself.", "They built the fort hisself."], "Themselves is the correct form; theirselves and hisself are not words."],
  ["Which sentence uses a reflexive (not intensive) pronoun?", "Ben hurt himself.", ["Ben himself won.", "The teacher herself laughed.", "I myself agree."], "In \"Ben hurt himself,\" the pronoun is needed; you can't drop it."],
  ["Choose the correct pronoun: \"You should be proud of ___.\"", "yourself", ["you", "yourselfs", "your"], "Yourself refers back to you."],
  ["Which is correct?", "The students themselves planned the trip.", ["The students theirselves planned the trip.", "The students themself planned the trip.", "The students them planned the trip."], "Themselves matches the plural students."],
];
const PSHIFT = [
  ["Which sentence has a shift in pronoun person?", "When a student studies, you get better grades.", ["When students study, they get better grades.", "When I study, I get better grades.", "When you study, you get better grades."], "It switches from a student (third person) to you (second person)."],
  ["Which pronoun agrees: \"Each of the boys must bring ___ own glove.\"", "his", ["our", "them", "its"], "Each is singular and the group is boys, so use his."],
  ["Which sentence keeps the pronoun person consistent?", "If you practice daily, you will improve.", ["If you practice daily, one will improve.", "If one practices daily, you will improve.", "If we practice daily, you will improve."], "You and you match."],
  ["Which pronoun agrees: \"The team celebrated ___ win.\"", "its", ["their", "it's", "our"], "Team is one group, so use its."],
  ["Which sentence has a shift in pronoun number?", "A dog needs exercise, so take them on walks.", ["Dogs need exercise, so take them on walks.", "A dog needs exercise, so take it on walks.", "My dog needs exercise, so I walk him."], "A dog is singular, but them is plural."],
  ["Fix the shift: \"We went to the museum, where you could touch fossils.\"", "We went to the museum, where we could touch fossils.", ["We went to the museum, where they could touch fossils.", "You went to the museum, where we could touch fossils.", "We went to the museum, where one could touch fossils."], "Keep the same person: we and we."],
  ["Which pronoun agrees: \"Neither of the girls brought ___ phone.\"", "her", ["their", "they", "them"], "Neither is singular, so use her."],
  ["Which pronoun agrees: \"One of the girls lost ___ hat.\"", "her", ["their", "them", "its"], "One is singular, so use her."],
];
const VAGUE = [
  ["Why is \"Sam told Leo that he won\" unclear?", "\"He\" could mean Sam or Leo.", ["It has no verb.", "Won is spelled wrong.", "It is too short."], "A vague pronoun could point to more than one noun."],
  ["Which sentence fixes the vague pronoun in \"They say it will rain\"?", "The weather report says it will rain.", ["They said it would rain.", "It will rain, they say.", "They think it might rain."], "Name who \"they\" is."],
  ["Fix: \"Mia put the vase on the table and it broke.\"", "Mia put the vase on the table, and the vase broke.", ["Mia put it on the table and it broke.", "It broke when she put it there.", "Mia put the vase on it and it broke."], "Name which thing broke."],
  ["Which sentence has a clear pronoun?", "When Ava called Grace, Ava was excited.", ["When Ava called Grace, she was excited.", "She called her and she was excited.", "They called and she was excited."], "Repeating the name removes the confusion."],
  ["Which word is vague in \"This made everyone upset\"?", "This", ["made", "everyone", "upset"], "\"This\" needs a clear noun: This rule, this news…"],
  ["Fix: \"I took the cookies out of the boxes and ate them.\"", "I took the cookies out of the boxes and ate the cookies.", ["I took them out and ate them.", "I ate them out of the boxes.", "They were eaten from the boxes."], "Them could mean cookies or boxes."],
  ["Why is \"In the article, it says bees are vanishing\" weak?", "\"It\" has nothing clear to refer to.", ["Bees are not vanishing.", "Article should be capitalized.", "It is too long."], "Better: The article says bees are vanishing."],
  ["Which sentence has a clear pronoun?", "The coach told the players that the players would run laps.", ["The coach told him he would run laps.", "He told them they would run laps.", "They told him that he would run."], "Naming the players makes it clear."],
];

/* ---------------- phrases, clauses and sentences ---------------- */
const PHRASE = [
  ["Is \"after the long game\" a phrase or a clause?", "phrase", ["clause", "complete sentence", "independent clause"], "It has no subject and verb."],
  ["Is \"because the bus was late\" a phrase or a clause?", "dependent clause", ["phrase", "independent clause", "complete sentence"], "It has a subject (bus) and verb (was) but can't stand alone."],
  ["Which is an independent clause?", "the dog barked", ["when the dog barked", "barking loudly", "under the porch"], "It has a subject and verb and stands alone."],
  ["What is a clause?", "A group of words with a subject and a verb", ["Any group of words", "A word that names a person", "A sentence with a comma"], "Phrases lack a subject-verb pair."],
  ["Which is a prepositional phrase?", "across the river", ["the river flowed", "because it rained", "she swam"], "It starts with a preposition and has no verb."],
  ["Which word starts a dependent clause?", "although", ["and", "the", "very"], "Subordinating words like although, because and when start dependent clauses."],
  ["In \"When the bell rang, students left,\" what is the independent clause?", "students left", ["When the bell rang", "the bell rang", "When"], "It can stand alone as a sentence."],
  ["Is \"running down the hall\" a phrase or a clause?", "phrase", ["clause", "independent clause", "complete sentence"], "It has no subject."],
];
const STYPE = [
  ["What kind of sentence is \"I ran, and I won\"?", "compound", ["simple", "complex", "compound-complex"], "Two independent clauses joined by and."],
  ["What kind of sentence is \"Because I trained, I won the race\"?", "complex", ["simple", "compound", "compound-complex"], "One dependent clause and one independent clause."],
  ["What kind of sentence is \"The cat slept on the warm windowsill\"?", "simple", ["compound", "complex", "compound-complex"], "One independent clause."],
  ["What kind of sentence is \"When it rained, we stayed in, but Leo went out\"?", "compound-complex", ["simple", "compound", "complex"], "Two independent clauses plus a dependent clause."],
  ["Which sentence is complex?", "Although it was cold, we swam.", ["It was cold, so we swam.", "We swam in the cold lake.", "It was cold; we swam anyway."], "\"Although it was cold\" is a dependent clause."],
  ["Which sentence is compound?", "The sun set, and the stars came out.", ["The sun set behind the hills.", "After the sun set, the stars came out.", "Setting slowly, the sun disappeared."], "Two independent clauses joined with a comma and and."],
  ["Combine as a complex sentence: \"I was tired. I finished my homework.\"", "Although I was tired, I finished my homework.", ["I was tired, and I finished my homework.", "I was tired I finished my homework.", "Tired, homework."], "Although makes the first part a dependent clause."],
  ["Which sentence is simple?", "My brother and I built a treehouse.", ["My brother built it, and I painted it.", "Because we worked hard, the treehouse was done.", "We built it, but it fell."], "It has one subject (brother and I) and one verb (built)."],
];
const MODIF = [
  ["Which sentence has a dangling modifier?", "Walking to school, the rain started.", ["Walking to school, I felt the rain start.", "The rain started while I walked to school.", "I walked to school in the rain."], "The rain wasn't walking to school."],
  ["Fix: \"I saw a dog with my binoculars running across the field.\"", "With my binoculars, I saw a dog running across the field.", ["I saw with my binoculars a running field.", "Running across the field, my binoculars saw a dog.", "I saw a dog running with my binoculars."], "Place modifiers next to what they describe."],
  ["What is wrong with \"She almost ate the whole pizza\" if she ate only half?", "\"Almost\" is misplaced; it should be \"She ate almost half.\"", ["Nothing is wrong.", "Pizza is misspelled.", "It needs a comma."], "Almost should go next to the word it changes."],
  ["Which sentence is correct?", "Covered in mud, the dog shook itself.", ["Covered in mud, I washed the dog.", "Covered in mud, the bath was needed.", "Covered in mud, the hose sprayed the dog."], "The dog is the one covered in mud."],
  ["Fix: \"After finishing the test, the bell rang.\"", "After I finished the test, the bell rang.", ["After finishing the test, the bell was ringing.", "The bell, after finishing the test, rang.", "After finishing, the test rang."], "The bell didn't finish the test."],
  ["Which sentence has a misplaced modifier?", "The boy fed the cat wearing a red cap.", ["The boy wearing a red cap fed the cat.", "Wearing a red cap, the boy fed the cat.", "The boy fed the cat while wearing a red cap."], "It sounds like the cat is wearing the cap."],
  ["Fix: \"Hanging on the wall, Mia admired the painting.\"", "Mia admired the painting hanging on the wall.", ["Hanging on the wall, the painting admired Mia.", "Mia, hanging on the wall, admired the painting.", "Hanging, Mia admired the wall."], "The painting hangs on the wall, not Mia."],
  ["What is a dangling modifier?", "A describing phrase with no clear word to describe in the sentence", ["A run-on sentence", "A missing period", "A word spelled wrong"], "The phrase \"dangles\" because what it describes is missing."],
];
const COORD = [
  ["Which sentence uses commas correctly?", "It was a long, tiring hike.", ["It was a long tiring, hike.", "It was a, long tiring hike.", "It was, a long tiring hike."], "Long and tiring both describe hike equally: use a comma."],
  ["Which sentence needs NO comma between the adjectives?", "She wore a bright red scarf.", ["He told a funny, clever joke.", "It was a cold, rainy day.", "We had a long, boring meeting."], "\"Bright\" describes red, so they are not coordinate."],
  ["How can you test for coordinate adjectives?", "Switch their order or put \"and\" between them.", ["Count the letters.", "Check if they rhyme.", "See if both are colors."], "If it still sounds right, use a comma."],
  ["Which is correct?", "a friendly, playful puppy", ["a friendly playful, puppy", "a, friendly playful puppy", "a friendly, playful, puppy"], "Friendly and playful are coordinate."],
  ["Which sentence uses commas correctly?", "The quiet, peaceful lake sparkled.", ["The quiet peaceful, lake sparkled.", "The, quiet peaceful lake sparkled.", "The quiet, peaceful, lake sparkled."], "A comma goes between coordinate adjectives, not before the noun."],
  ["Which needs a comma?", "a smart funny friend", ["three big dogs", "an old stone wall", "two tall trees"], "Smart and funny both describe friend equally."],
  ["Which sentence is correct?", "He gave a short, powerful speech.", ["He gave a short powerful, speech.", "He gave a, short, powerful speech.", "He gave, a short powerful speech."], "Comma between coordinate adjectives only."],
  ["Which phrase should NOT have a comma?", "five little ducks", ["a warm, cozy blanket", "a dark, stormy night", "a sweet, juicy peach"], "Five is a number, not a coordinate adjective."],
];
const CONCISE = [
  ["Which is the most concise?", "Please reply soon.", ["Please reply at your earliest possible convenience.", "Please make a reply as soon as you possibly can.", "I would like to ask that you please reply soon."], "Concise writing uses only the words it needs."],
  ["Cut the wordiness: \"Due to the fact that it rained, we stayed home.\"", "Because it rained, we stayed home.", ["Due to the fact it rained, we stayed in our home.", "Since the fact is that it rained, we stayed home.", "It rained, due to the fact that we stayed home."], "\"Due to the fact that\" means because."],
  ["Which word is redundant in \"The circle was round in shape\"?", "round in shape", ["circle", "was", "The"], "A circle is already round."],
  ["Which is concise?", "We met at noon.", ["We met at 12 noon in the middle of the day.", "We had a meeting at the time of noon.", "Our meeting was held at noon time."], "Each extra phrase repeats what noon already means."],
  ["Cut the wordiness: \"In my personal opinion, I think dogs are great.\"", "I think dogs are great.", ["In my opinion, I personally think dogs are great.", "Personally, in my opinion, dogs are great.", "In my personal opinion I think that dogs are really great."], "\"In my opinion\" and \"I think\" say the same thing."],
  ["Which phrase can replace \"at this point in time\"?", "now", ["at this time point", "in this time", "presently at this time"], "One word does the job."],
  ["Which sentence has NO repeated idea?", "The team worked together.", ["The team cooperated together.", "The team joined together as one.", "The team collaborated jointly together."], "Cooperated and together repeat each other."],
  ["Make it concise: \"The reason why I'm late is because the bus broke down.\"", "I'm late because the bus broke down.", ["The reason I'm late is because of the reason the bus broke down.", "The reason why is the bus broke down.", "Because the bus broke down is the reason I'm late."], "\"The reason why … is because\" is wordy."],
];

/* ---------------- verbs ---------------- */
const VERBALS = [
  ["In \"Swimming is my favorite sport,\" what is \"swimming\"?", "gerund", ["participle", "infinitive", "verb"], "A gerund is an -ing verb used as a noun."],
  ["In \"I want to travel,\" what is \"to travel\"?", "infinitive", ["gerund", "participle", "preposition"], "An infinitive is to + a verb."],
  ["In \"The barking dog woke us,\" what is \"barking\"?", "participle", ["gerund", "infinitive", "noun"], "A participle is a verb form used as an adjective."],
  ["Which sentence has a gerund?", "Reading helps me relax.", ["I am reading a book.", "The reading lamp is on.", "I want to read."], "Reading is the subject, so it acts as a noun."],
  ["Which sentence has an infinitive?", "Leo likes to draw comics.", ["Leo is drawing comics.", "Drawing comics is fun.", "Leo draws comics."], "To draw is an infinitive."],
  ["In \"The broken window let in cold air,\" what is \"broken\"?", "participle", ["gerund", "infinitive", "adverb"], "Broken describes the window."],
  ["What job does a gerund do?", "It acts as a noun.", ["It acts as an adjective.", "It joins clauses.", "It shows past tense only."], "Gerunds name an activity."],
  ["Which sentence has a participle?", "The smiling girl waved.", ["Smiling is good for you.", "She likes to smile.", "She smiled."], "Smiling describes the girl."],
];
const VOICE = [
  ["Is \"The ball was thrown by Sam\" active or passive?", "passive", ["active", "neither", "both"], "The subject (ball) receives the action."],
  ["Change to active voice: \"The cake was eaten by the kids.\"", "The kids ate the cake.", ["The cake ate the kids.", "The cake was eaten.", "The kids were eaten by the cake."], "In active voice, the doer is the subject."],
  ["Is \"Maya wrote the poem\" active or passive?", "active", ["passive", "neither", "both"], "Maya (the subject) does the action."],
  ["When is passive voice useful?", "When the doer is unknown or less important", ["Always; it is clearer", "Never in writing", "Only in poetry"], "\"The window was broken\" works when we don't know who did it."],
  ["Change to passive voice: \"The storm damaged the roof.\"", "The roof was damaged by the storm.", ["The storm was damaged by the roof.", "The roof damaged the storm.", "The storm is damaging the roof."], "The receiver (roof) becomes the subject."],
  ["Which sentence is in active voice?", "The coach blew the whistle.", ["The whistle was blown by the coach.", "The whistle was blown.", "The whistle had been blown."], "The coach does the action."],
  ["Which sentence is in passive voice?", "The letters were delivered at noon.", ["The carrier delivered the letters.", "We read the letters.", "The letters arrived at noon."], "Were delivered is passive: the doer is not the subject."],
  ["Why do many writers prefer active voice?", "It is usually clearer and more direct.", ["It is always longer.", "It hides who did the action.", "It uses more helping verbs."], "Active voice says who did what."],
];
const MOOD = [
  ["What mood is \"Close the door\"?", "imperative", ["indicative", "interrogative", "subjunctive"], "Imperative gives a command."],
  ["What mood is \"If I were taller, I could reach the shelf\"?", "subjunctive", ["indicative", "imperative", "interrogative"], "Subjunctive shows a wish or something not true."],
  ["What mood is \"The library opens at nine\"?", "indicative", ["imperative", "subjunctive", "conditional"], "Indicative states a fact."],
  ["What mood is \"Did you finish your project?\"", "interrogative", ["indicative", "imperative", "subjunctive"], "Interrogative asks a question."],
  ["What mood is \"If it rains, the game will be canceled\"?", "conditional", ["imperative", "interrogative", "indicative"], "Conditional shows what will happen if something else happens."],
  ["Which sentence uses the subjunctive correctly?", "I wish I were on vacation.", ["I wish I was on vacation.", "I wish I am on vacation.", "I wish I be on vacation."], "Use were in wishes."],
  ["Which sentence is in the imperative mood?", "Please hand in your essays.", ["You handed in your essays.", "Did you hand in your essays?", "If you hand in your essays, you'll get credit."], "It gives a polite command."],
  ["Which sentence is in the indicative mood?", "Owls hunt at night.", ["Hunt at night!", "Do owls hunt at night?", "If I were an owl, I would hunt at night."], "It states a fact."],
];
const VMSHIFT = [
  ["Which sentence has an unneeded shift in voice?", "Leo baked the bread, and then it was sliced by him.", ["Leo baked the bread and then sliced it.", "The bread was baked and sliced.", "Leo baked and sliced the bread."], "It switches from active (baked) to passive (was sliced)."],
  ["Which sentence has an unneeded shift in mood?", "Open your books, and you should read chapter two.", ["Open your books and read chapter two.", "You should open your books and read chapter two.", "Please open your books and read chapter two."], "It shifts from imperative to indicative."],
  ["Fix the shift: \"First mix the flour, and then the eggs should be added.\"", "First mix the flour, and then add the eggs.", ["First the flour is mixed, and then add the eggs.", "First mix the flour, and the eggs are added.", "Mixing the flour, the eggs should be added."], "Keep both verbs imperative."],
  ["Which sentence is consistent?", "Ava wrote the essay and revised it.", ["Ava wrote the essay, and it was revised by her.", "The essay was written, and Ava revised it.", "Ava wrote the essay, and it is revised."], "Both verbs are active."],
  ["Fix: \"If I were a bird, I will fly south.\"", "If I were a bird, I would fly south.", ["If I was a bird, I will fly south.", "If I am a bird, I would fly south.", "If I were a bird, I fly south."], "The subjunctive \"were\" pairs with \"would.\""],
  ["Fix the shift: \"Sam kicked the ball, and the goal was scored.\"", "Sam kicked the ball and scored the goal.", ["The ball was kicked, and Sam scored the goal.", "Sam kicked the ball, and the goal is scored.", "Sam kicks the ball, and the goal was scored."], "Keep the voice active."],
  ["Which sentence shifts from a question to a command?", "Did you feed the dog, and walk him now.", ["Did you feed the dog and walk him?", "Feed the dog and walk him.", "You fed the dog and walked him."], "It mixes interrogative and imperative."],
  ["Why avoid shifts in voice and mood?", "They make writing confusing and uneven.", ["They make sentences shorter.", "They are needed in every sentence.", "They show strong emotion."], "Consistent verbs keep writing clear."],
];

/* ---------------- punctuation, spelling and style ---------------- */
const PAREN = [
  ["Which sentence correctly sets off extra information?", "My brother, a talented chef, made dinner.", ["My brother a talented chef, made dinner.", "My brother, a talented chef made dinner.", "My, brother a talented chef made dinner."], "Put commas on both sides of the extra phrase."],
  ["Which sentence uses parentheses correctly?", "The museum (open since 1920) has free days.", ["The museum (open since 1920 has free days.)", "The (museum open since 1920) has free days.", "The museum open since (1920) has free days."], "Parentheses go around the extra information only."],
  ["Which sentence uses dashes correctly?", "The answer—believe it or not—was zero.", ["The answer believe—it or not was—zero.", "The—answer believe it or not was zero.", "The answer believe it or not—was zero."], "Dashes set off an interruption with strong emphasis."],
  ["Which punctuation shows the LEAST emphasis on extra information?", "parentheses", ["dashes", "exclamation points", "all capitals"], "Parentheses whisper; dashes shout."],
  ["Which sentence is correct?", "Our teacher, Mr. Ruiz, loves science.", ["Our teacher Mr. Ruiz, loves science.", "Our teacher, Mr. Ruiz loves science.", "Our, teacher Mr. Ruiz loves science."], "Set off the name with commas on both sides."],
  ["Which sentence uses a dash correctly?", "I know what we need—more snacks.", ["I know—what we need more snacks.", "I know what—we need more snacks.", "I—know what we need more snacks."], "A dash can introduce an explanation or surprise."],
  ["Which sentence is correct?", "Austin, the capital of Texas, is growing fast.", ["Austin the capital of Texas, is growing fast.", "Austin, the capital of Texas is growing fast.", "Austin the capital, of Texas is growing fast."], "The appositive needs commas on both sides."],
  ["What are commas, parentheses and dashes used for here?", "To set off nonessential (extra) information", ["To end sentences", "To show possession", "To join two words"], "The sentence still makes sense without the extra part."],
];
const PUNCT8 = [
  ["Which sentence uses an ellipsis to show a pause?", "\"I think… no, I'm sure,\" she said.", ["\"I think, no I'm sure\" she said.", "\"I think. No. I'm sure\" she said.", "\"I think—no—I'm sure.\" she said…"], "An ellipsis (…) shows a pause or trailing off."],
  ["What does an ellipsis show in a quotation?", "Words have been left out.", ["The quote is a question.", "The speaker is angry.", "The quote is made up."], "\"Four score … ago\" shows words were removed."],
  ["Which sentence uses a dash to show a break in thought?", "I was about to leave—wait, where are my keys?", ["I was about to leave, wait where are my keys?", "I was about to leave. Wait. Where are my keys?", "I was about—to leave wait where are my keys?"], "A dash shows a sudden break."],
  ["Which sentence uses commas correctly?", "Yes, I finished, but I need help.", ["Yes I finished, but, I need help.", "Yes, I finished but, I need help.", "Yes I, finished but I need help."], "Commas after an intro word and before a conjunction joining clauses."],
  ["Which sentence correctly shows a pause with an ellipsis?", "The door creaked open… and then silence.", ["The door creaked open, and then… silence…", "The door… creaked… open… and… then silence.", "The door creaked open and then silence…."], "One ellipsis creates suspense."],
  ["Which is correct?", "Three things matter—kindness, effort and honesty.", ["Three things matter, kindness—effort and honesty.", "Three—things matter kindness, effort and honesty.", "Three things—matter kindness effort and honesty."], "A dash can introduce a list."],
  ["Where does the comma go? \"Although we were tired we kept hiking.\"", "after tired", ["after Although", "after we", "after kept"], "Put a comma after an introductory dependent clause."],
  ["What is the difference between a hyphen and a dash?", "A hyphen joins words; a dash separates ideas.", ["They are exactly the same.", "A dash joins words; a hyphen separates ideas.", "Hyphens are only for numbers."], "well-known (hyphen) vs. a sudden break—like this (dash)."],
];
const SPELLM = [
  ["Which word is spelled correctly?", "necessary", ["neccessary", "necesary", "nessecary"]], ["Which word is spelled correctly?", "separate", ["seperate", "separat", "seprate"]],
  ["Which word is spelled correctly?", "definitely", ["definately", "definitly", "defanitely"]], ["Which word is spelled correctly?", "occasion", ["ocassion", "occassion", "ocasion"]],
  ["Which word is spelled correctly?", "receive", ["recieve", "receeve", "resieve"]], ["Which word is spelled correctly?", "embarrass", ["embarass", "embaress", "embarrasse"]],
  ["Which word is spelled correctly?", "rhythm", ["rythm", "rhythem", "rythym"]], ["Which word is spelled correctly?", "conscience", ["concience", "conscence", "consience"]],
  ["Which word is spelled correctly?", "privilege", ["priviledge", "privelege", "privlege"]], ["Which word is spelled correctly?", "accommodate", ["accomodate", "acommodate", "acomodate"]],
  ["Which word is spelled correctly?", "government", ["goverment", "govermint", "governmint"]], ["Which word is spelled correctly?", "environment", ["enviroment", "envirnment", "enviornment"]],
  ["Which word is spelled correctly?", "February", ["Febuary", "Feburary", "Februrary"]], ["Which word is spelled correctly?", "license", ["lisence", "licence", "lycense"]],
  ["Which word is spelled correctly?", "humorous", ["humourous", "humerous", "humorus"]], ["Which word is spelled correctly?", "occurred", ["occured", "ocurred", "ocured"]],
  ["Which word is spelled correctly?", "beginning", ["begining", "beginnig", "beggining"]], ["Which word is spelled correctly?", "weird", ["wierd", "weerd", "wiered"]],
  ["Choose the correct word: \"The noise will ___ the baby.\"", "affect", ["effect", "afect", "effekt"], "Affect is usually the verb; effect is usually the noun."],
  ["Choose the correct word: \"Everyone came ___ Leo.\"", "except", ["accept", "excpet", "acept"], "Except means \"but not\"; accept means \"to receive.\""],
];
const SENTVAR = [
  ["Which revision adds the most sentence variety? \"I woke up. I ate. I left.\"", "After a quick breakfast, I hurried out the door.", ["I woke up, I ate, I left.", "I woke up and I ate and I left.", "Woke up. Ate. Left."], "Start with a phrase and combine ideas."],
  ["Which sentence begins with a prepositional phrase?", "Under the old bridge, a troll waited.", ["A troll waited under the old bridge.", "The troll waited.", "Waiting, the troll sat."], "It opens with \"Under the old bridge.\""],
  ["Which sentence begins with a participial phrase?", "Laughing loudly, the kids ran outside.", ["The kids laughed loudly.", "The kids ran outside laughing.", "Outside, the kids laughed."], "\"Laughing loudly\" is a participial phrase."],
  ["Why vary sentence beginnings and lengths?", "To keep writing interesting and smooth", ["To make every sentence the same", "To use more words", "To confuse the reader"], "Variety keeps readers engaged."],
  ["Which pair varies sentence length best?", "The storm hit at midnight, ripping shingles from roofs across town. Then it was gone.", ["The storm hit. It was midnight. It ripped shingles. It left.", "The storm hit at midnight and ripped shingles and then it left town.", "Storm. Midnight. Shingles. Gone."], "A long sentence then a short one adds punch."],
  ["Which sentence begins with a dependent clause?", "When the whistle blew, the race began.", ["The race began when the whistle blew.", "The whistle blew.", "The race began."], "\"When the whistle blew\" is a dependent clause."],
  ["Which revision combines the sentences best? \"Mia plays violin. She practices daily.\"", "Mia, who practices daily, plays violin.", ["Mia plays violin she practices daily.", "Mia plays violin. And she practices daily.", "Mia plays, violin practices daily."], "A clause can tuck one idea inside another."],
  ["Which sentence starts with an adverb?", "Slowly, the turtle crossed the road.", ["The turtle crossed the road slowly.", "The slow turtle crossed.", "The turtle was slow."], "\"Slowly\" opens the sentence."],
];
const STYLE = [
  ["Which sentence fits a formal science report?", "The results show that plants grew taller in sunlight.", ["So, like, the plants got way taller in the sun.", "The plants were totally awesome in the sun!", "Sun = taller plants lol."], "Formal style avoids slang and abbreviations."],
  ["Which sentence breaks the formal tone of an essay?", "Honestly, this law is kind of a joke.", ["This law has several weaknesses.", "Critics argue the law is unfair.", "The evidence suggests the law needs changes."], "\"Kind of a joke\" is casual."],
  ["Which is the best formal replacement for \"a bunch of\"?", "many", ["a ton of", "loads of", "heaps of"], "Many is precise and formal."],
  ["What does \"consistent style\" mean?", "Keeping the same level of formality throughout", ["Using the same word in every sentence", "Writing only short sentences", "Using many exclamation points"], "Don't jump between formal and casual."],
  ["Which sentence keeps an objective tone?", "The study included 200 students.", ["The amazing study included 200 lucky students.", "Only a silly 200 students joined.", "I can't believe 200 students joined!"], "Objective writing avoids personal feelings."],
  ["Which is the best formal replacement for \"get\" in \"We need to get more data\"?", "gather", ["grab", "snag", "score"], "Gather is precise and formal."],
  ["Which sentence avoids contractions, as in very formal writing?", "The committee did not approve the plan.", ["The committee didn't approve the plan.", "The committee wouldn't okay the plan.", "The committee won't go for it."], "Formal writing often avoids contractions."],
  ["Which sentence fits a friendly letter, not a formal one?", "Can't wait to see you next week!", ["I look forward to our meeting.", "Thank you for your consideration.", "Please find the report attached."], "It is casual and personal."],
];

/* ---------------- research ---------------- */
const RESEARCH = {
  rq: [
    ["Which is the best research question?", "How does screen time affect teenagers' sleep?", ["Do teens have phones?", "What is a phone?", "Is sleep good?"], "A good research question is focused and needs research to answer."],
    ["Which research question is too broad?", "What is the history of the world?", ["How did the Texas Revolution begin?", "Why did the Alamo fall in 1836?", "How did cattle drives shape Texas towns?"], "The history of the world is far too big."],
    ["Which research question is too narrow?", "What color was Sam Houston's horse?", ["Why was Sam Houston important to Texas?", "How did Sam Houston lead Texas?", "What challenges did Sam Houston face?"], "It has a one-word answer and little to research."],
    ["How can you narrow \"sports\" into a research question?", "How do concussions affect young football players?", ["What are sports?", "Are sports fun?", "Who likes sports?"], "Focus on one part of the topic."],
    ["What should you do if your research raises a new question?", "Refocus or add a new question to investigate", ["Ignore it", "Stop researching", "Make up an answer"], "Research questions can change as you learn."],
    ["Which question would need several sources to answer?", "Why are coral reefs dying around the world?", ["What is the capital of Texas?", "How many legs does a spider have?", "What year is it?"], "Complex questions need several sources."],
  ],
  cred: [
    ["Which source is most credible for a report on vaccines?", "A government health agency website", ["An anonymous blog", "A social media post", "A celebrity's opinion video"], "Experts and official agencies are reliable."],
    ["Which clue suggests a website may NOT be reliable?", "It has no author and many spelling errors.", ["It lists its sources.", "It was updated recently.", "It is written by a scientist."], "Credible sources name authors and check facts."],
    ["Why check a source's date?", "Information can go out of date.", ["Old sources are always better.", "Dates show the author's name.", "Dates make reports longer."], "Science and news change over time."],
    ["Which source is most likely biased?", "An ad from a company selling the product", ["A university study", "A science encyclopedia", "A museum website"], "Sellers want you to buy."],
    ["What does it mean to corroborate information?", "Check that other reliable sources agree", ["Copy it exactly", "Delete it", "Use only one source"], "If several good sources agree, it is more trustworthy."],
    ["Which domain is usually most trustworthy for science facts?", ".gov or .edu", [".biz", "a personal page", "a forum"], "Government and education sites are often reviewed."],
  ],
  para: [
    ["What is paraphrasing?", "Restating an idea in your own words", ["Copying a sentence exactly", "Making up new facts", "Listing your sources"], "A paraphrase keeps the idea but changes the words."],
    ["Which is the best paraphrase of \"Honeybees pollinate about one-third of the food we eat\"?", "Bees help produce roughly a third of our food.", ["Honeybees pollinate about one-third of the food we eat.", "Bees are dangerous insects.", "We eat bees."], "Same meaning, new words."],
    ["When should you use a direct quotation?", "When the exact words are powerful or important", ["Always, for every fact", "Never", "Only for numbers"], "Quote sparingly; paraphrase most information."],
    ["How do you show a direct quotation?", "Put the exact words in quotation marks and name the source.", ["Underline the words.", "Change a few words.", "Put the words in bold."], "Quotation marks show the words are someone else's."],
    ["Which is a correctly punctuated quotation?", "According to the scientist, \"Oceans absorb heat.\"", ["According to the scientist Oceans absorb heat.", "According to the scientist, Oceans absorb \"heat.\"", "\"According to the scientist, Oceans absorb heat."], "Quote marks go around the exact words."],
    ["What is a summary?", "A short version of the main ideas", ["Every detail copied", "Your opinion only", "A list of sources"], "Summaries are shorter than the original."],
  ],
  cite: [
    ["Why should you cite sources?", "To give credit and let readers find the information", ["To make the paper longer", "To hide where facts came from", "Because teachers like lists"], "Citations show where ideas came from."],
    ["What is plagiarism?", "Using someone else's words or ideas without credit", ["Paraphrasing and citing", "Quoting with credit", "Writing your own ideas"], "Always give credit."],
    ["Which is plagiarism?", "Copying a paragraph from a website into your essay without credit", ["Quoting a sentence with quotation marks and a citation", "Summarizing a book and naming it", "Writing your own opinion"], "Copying without credit is plagiarism."],
    ["What goes in a works cited list?", "Author, title, publisher or website, and date", ["Only your name", "Your grade", "Your teacher's name"], "These details help readers find the source."],
    ["How can you avoid plagiarism when taking notes?", "Write notes in your own words and record each source", ["Copy everything exactly", "Skip writing sources", "Use only one website"], "Good notes make citing easy."],
    ["Do you need to cite common knowledge like \"Texas is a state\"?", "No", ["Yes, always", "Only in science", "Only in history"], "Widely known facts don't need a citation."],
  ],
  combine: [
    ["Two sources give different dates for an event. What should you do?", "Check more reliable sources to see which is correct", ["Pick the date you like", "Use both dates without saying why", "Leave the event out"], "Look for corroboration."],
    ["What is synthesizing information?", "Combining ideas from several sources into one new understanding", ["Copying one source", "Choosing only one fact", "Ignoring sources"], "Synthesis connects sources."],
    ["Which sentence combines two sources well?", "Both NASA and a university study report that Arctic ice is shrinking.", ["NASA says stuff. A study says stuff.", "I read things about ice.", "Ice is cold."], "It shows agreement between sources."],
    ["Which tool helps organize notes from several sources?", "A chart with a column for each source", ["A single sticky note", "Your memory", "A drawing of the cover"], "Charts show how sources connect."],
    ["Why use more than one source?", "To check facts and get a fuller picture", ["To make the report longer", "Because one source is always wrong", "To copy more"], "Different sources add depth."],
    ["After gathering sources, what is a good next step?", "Sort notes by subtopic", ["Throw away the notes", "Start a new topic", "Copy one source into your essay"], "Sorting helps you plan paragraphs."],
  ],
};
const RES_TIP = { rq: "A strong research question is focused, can be researched, and can't be answered with a single word.", cred: "Credible sources have expert authors, recent dates, cited facts and little bias.", para: "Paraphrase in your own words, quote exact words in quotation marks, and always name the source.", cite: "Give credit for every idea that isn't yours or common knowledge.", combine: "Compare sources, check where they agree, and organize notes by subtopic." };

/* ---------------- writing ---------------- */
const WRITE = {
  arg: [
    ["Which is the strongest claim for an argument essay?", "Schools should start at 9:00 a.m. so students get more sleep.", ["School is a place.", "Some schools start early.", "I like sleeping."], "A claim is a debatable position with a reason."],
    ["Which is the best evidence for \"Recycling should be required\"?", "Cities with recycling laws cut landfill waste by 30%.", ["Recycling bins are blue.", "My neighbor recycles.", "I think recycling is good."], "Facts and statistics are strong evidence."],
    ["What is a counterclaim?", "An opposing view that the writer answers", ["The writer's main claim", "A fact about the topic", "The conclusion"], "Addressing counterclaims makes an argument stronger."],
    ["Which transition introduces a counterclaim?", "Some people argue that", ["For example,", "In conclusion,", "First,"], "It signals the other side."],
    ["Which sentence best rebuts \"Homework causes stress\"?", "However, short, focused homework builds study habits without heavy stress.", ["Homework is stressful.", "I don't like homework.", "Stress is bad."], "A rebuttal answers the counterclaim with reasons."],
    ["What should the conclusion of an argument do?", "Restate the claim and leave the reader with a strong final thought", ["Introduce a new topic", "List every source", "Apologize for the argument"], "End with impact."],
    ["Which reasoning is a logical fallacy?", "Everyone is doing it, so it must be right.", ["Studies show the policy reduces injuries.", "Experts agree the data is accurate.", "The cost is lower, so the town saves money."], "\"Everyone is doing it\" is the bandwagon fallacy."],
  ],
  inform: [
    ["Which sentence is the best thesis for an explanatory essay about volcanoes?", "Volcanoes form when magma rises through weak spots in Earth's crust.", ["Volcanoes are cool.", "I saw a volcano once.", "What is a volcano?"], "A thesis tells what the essay will explain."],
    ["Which transition best shows a contrast?", "On the other hand,", ["Also,", "For example,", "Next,"], "It signals a difference."],
    ["How should an informative essay be organized?", "Introduction with a thesis, body paragraphs by subtopic, and a conclusion", ["One long paragraph", "Random facts in any order", "Only a conclusion"], "Clear structure helps readers learn."],
    ["Which detail belongs in a paragraph about how hurricanes form?", "Warm ocean water fuels the storm.", ["My cousin likes surfing.", "Snow falls in winter.", "Hurricanes have names."], "It explains formation."],
    ["What is domain-specific vocabulary?", "Words used in a particular subject, like 'photosynthesis'", ["Slang words", "Words from another language", "Very short words"], "Precise subject words make writing accurate."],
    ["Which heading would fit a section about causes?", "Why Earthquakes Happen", ["The End", "Cool Facts", "My Opinion"], "Headings preview a section's topic."],
    ["Which sentence is the best conclusion?", "Understanding how volcanoes work helps communities prepare and stay safe.", ["Volcanoes.", "And that's it.", "Now let's talk about dogs."], "Conclusions sum up and show why the topic matters."],
  ],
  narr: [
    ["Which opening line is the best hook for a narrative?", "The moment the lights went out, I heard the door creak open.", ["This is a story about me.", "One day something happened.", "I am going to tell a story."], "A hook creates curiosity."],
    ["Which technique slows the pace at a tense moment?", "Adding detailed sensory description", ["Skipping ahead in time", "Ending the story", "Removing dialogue"], "Detail makes time feel slower."],
    ["Which transition shows a jump in time?", "Three weeks later,", ["Suddenly,", "However,", "In addition,"], "It moves the story forward."],
    ["What does reflection add to a narrative?", "It shows what the narrator learned or how they changed.", ["It lists events.", "It adds new characters.", "It describes the setting."], "Reflection gives the story meaning."],
    ["Which line of dialogue best shows character?", "\"I'll go first,\" Ava said, gripping the rope. \"Someone has to.\"", ["\"Hi,\" said Ava.", "Ava said something.", "\"Okay,\" said Ava."], "It shows courage."],
    ["How can a writer speed up the pace?", "Use short sentences and quick action", ["Add long descriptions", "Include flashbacks", "Explain every thought"], "Short sentences move fast."],
    ["Which ending best includes reflection?", "Looking back, I realize that losing the race taught me more than winning ever could.", ["Then I went home.", "The end.", "I ate dinner."], "It shares a lesson."],
  ],
  revise: [
    ["Which revision is clearest? \"The thing was good and stuff.\"", "The concert was exciting and well-organized.", ["The thing was really good and stuff.", "It was good.", "The thing was nice."], "Replace vague words with specific ones."],
    ["Which sentence has a spelling error?", "We recieved the package today.", ["We received the package today.", "The package arrived today.", "Today we opened the package."], "Receive: i before e except after c."],
    ["Which sentence needs a comma?", "After the game we celebrated.", ["We celebrated after the game.", "We won.", "The game ended."], "Add a comma after the introductory phrase: After the game, we celebrated."],
    ["What is the main goal of revising?", "Improving ideas, organization and clarity", ["Fixing only spelling", "Making the essay longer", "Changing the font"], "Revising is about content; editing is about correctness."],
    ["Which sentence has a subject-verb agreement error?", "The list of chores are long.", ["The list of chores is long.", "The chores are long.", "My chore is easy."], "List is singular, so use is."],
    ["What is editing?", "Correcting grammar, spelling and punctuation", ["Adding new ideas", "Choosing a topic", "Reading for fun"], "Editing polishes the final draft."],
    ["Which revision removes repetition? \"The dog was happy. The dog wagged. The dog barked.\"", "The happy dog wagged its tail and barked.", ["The dog was happy and the dog wagged and the dog barked.", "Dog happy. Dog wagged. Dog barked.", "The dog, the dog, the dog."], "Combine and use pronouns."],
  ],
};
const WRITE_TIP = { arg: "An argument states a claim, supports it with evidence, answers counterclaims and ends strongly.", inform: "Explanatory writing has a clear thesis, organized sections, precise vocabulary and a concluding statement.", narr: "Narratives use a hook, dialogue, pacing, sensory details and reflection.", revise: "Revise for clarity and organization, then edit for spelling, grammar and punctuation." };

export const EN_MIDDLE = {
  connot: bank(CONNOT, "Denotation is a word's dictionary meaning; connotation is the feeling it carries."),
  fig3: bank(FIG3, "Figurative language means more than the words say: similes, metaphors, personification and more."),
  allusion: bank(ALLUSION, "An allusion refers to a well-known story, person or event to add meaning."),
  analogy: bank(ANALOGY, "Find how the first pair is related, then find a word that makes the second pair related the same way."),
  irony: bank(IRONY, "Verbal irony says the opposite of what is meant; a pun plays on a word's double meaning."),
  wordrel: bank(WORDREL, "Words relate as synonyms, antonyms, parts and wholes, categories, and degrees of strength."),
  intens: bank(INTENS, "Intensive pronouns (myself, herself, ourselves) add emphasis and can be removed."),
  pshift: bank(PSHIFT, "Keep pronouns consistent in number (one or many) and person (I, you, they)."),
  vague: bank(VAGUE, "Every pronoun should point clearly to one noun."),
  phrase: bank(PHRASE, "A clause has a subject and a verb; a phrase does not."),
  stype: bank(STYPE, "Simple: one clause. Compound: two independent clauses. Complex: an independent and a dependent clause."),
  modif: bank(MODIF, "Place a modifier right next to the word it describes."),
  coord: bank(COORD, "Use a comma between adjectives that each describe the noun equally."),
  concise: bank(CONCISE, "Cut words that repeat an idea or add nothing."),
  verbals: bank(VERBALS, "Gerunds act as nouns, participles as adjectives, and infinitives are to + verb."),
  voice: bank(VOICE, "Active: the subject does the action. Passive: the subject receives it."),
  mood: bank(MOOD, "Verb moods: indicative (fact), imperative (command), interrogative (question), conditional (if), subjunctive (wish)."),
  vmshift: bank(VMSHIFT, "Keep verbs in the same voice and mood unless there is a reason to change."),
  paren: bank(PAREN, "Commas, parentheses and dashes set off extra information."),
  punct8: bank(PUNCT8, "Ellipses show pauses or missing words; dashes show breaks; commas separate parts."),
  spellm: bank(SPELLM, "Check tricky patterns: double letters, ie/ei and silent letters."),
  sentvar: bank(SENTVAR, "Vary sentence beginnings, lengths and types to keep writing lively."),
  style: bank(STYLE, "Formal style avoids slang, keeps an objective tone and stays consistent."),
  res: kinds(RESEARCH, RES_TIP),
  wm: kinds(WRITE, WRITE_TIP),
};
