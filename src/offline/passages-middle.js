// Original reading passages for Grades 6 to 8, in the same shape as passages.js.
// Extra skills used here: authorpov (the author's point of view), argument and claims (tracing and
// judging an argument), tone and connotation, genre, media, interact (how people, events and ideas
// affect each other), history (fiction compared with history), dialogue, irony, analogy,
// conflicting (sources that disagree) and myth (modern stories drawn from old ones).

export const MIDDLE_PASSAGES = [
  {
    grade: 6, kind: "fiction", title: "The Last Shift at Hartley's Diner",
    text: `For forty-one years, the neon sign of Hartley's Diner had buzzed above Main Street like a tired bee. Tonight it would buzz for the last time.

Rosa wiped the counter in slow circles, though it was already clean. She had worked here every summer since she was thirteen, first filling ketchup bottles, later taking orders. Mr. Hartley, whose hands now shook when he poured coffee, had decided to sell the building to a phone-repair chain.

"You're polishing a hole into that counter," he said.

"Somebody should remember what it looked like," Rosa answered.

At nine o'clock, the regulars began arriving: Mrs. Okafor with her crossword, the Delgado twins, old Mr. Pruitt who always ordered pie and never ate the crust. Nobody said much. They simply sat in their usual seats, as if their presence could hold the walls up a little longer.

When the last plate was cleared, Mr. Hartley handed Rosa a small brass bell—the one that had hung above the door since opening day. "Every time it rang, someone new came in hungry and left a little happier," he said. "Take it with you. Ring it wherever you end up."

Rosa walked home under the dark sign, the bell cold in her palm. She was sad, but she was also thinking about the diner she might open someday.`,
    qs: [
      [["plot"], "What event drives the plot of the story?", "Hartley's Diner is closing for good.", ["Rosa is fired from her job.", "Mr. Pruitt stops eating pie.", "A storm damages the diner."], "The story follows the last night before the diner closes."],
      [["character"], "What does Rosa's cleaning of an already clean counter show about her?", "She is sad and wants to hold on to the diner.", ["She is careless about her work.", "She wants a raise.", "She dislikes Mr. Hartley."], "She says someone should remember what it looked like."],
      [["theme"], "Which theme does the story develop?", "Endings can carry something meaningful into new beginnings.", ["Restaurants always fail.", "Old people should not run businesses.", "Phones are more important than food."], "The bell goes with Rosa, and she imagines her own diner."],
      [["evidence"], "Which line best shows the regulars cared about the diner?", "They simply sat in their usual seats, as if their presence could hold the walls up a little longer.", ["Mrs. Okafor came with her crossword.", "Mr. Pruitt always ordered pie.", "At nine o'clock, the regulars began arriving."], "They wanted to keep the diner standing."],
      [["tone", "connotation"], "What tone does the phrase \"buzzed … like a tired bee\" create?", "worn-out and gentle", ["angry and loud", "silly and cheerful", "frightening"], "\"Tired\" suggests age and weariness."],
      [["setting"], "Why is the setting important to the story?", "The diner is a place full of memories for the town.", ["It shows the story happens in the future.", "It explains why Rosa is hungry.", "It shows the diner is on a farm."], "The regulars and Rosa have years of history there."],
      [["summary"], "Which is the best summary?", "On a beloved diner's last night, its owner gives Rosa the door bell, and she leaves sad but hopeful.", ["Rosa cleans a counter.", "Mr. Pruitt doesn't eat pie crust.", "A phone-repair chain buys a building and fixes phones."], "It covers the main event and the change in Rosa."],
      [["infer", "character"], "What can you infer about Mr. Hartley's feelings toward Rosa?", "He trusts her to carry on the diner's spirit.", ["He is angry she is leaving.", "He thinks she is lazy.", "He barely knows her."], "He gives her the bell and tells her to ring it wherever she ends up."],
    ],
  },
  {
    grade: 6, kind: "informational", title: "Why the Monarchs Are Disappearing",
    text: `Each fall, millions of monarch butterflies fly as far as 3,000 miles to forests in central Mexico. Many of them pass straight through Texas on the way. Yet over the last few decades, the number of monarchs reaching Mexico has dropped sharply. Scientists point to several connected causes.

The first cause is the loss of milkweed. Monarch caterpillars can eat only milkweed, and adult females lay their eggs only on it. As fields have been plowed, paved or sprayed with weed killers, milkweed has vanished from huge areas. Fewer milkweed plants mean fewer caterpillars.

Second, the monarchs' winter forests are shrinking. The butterflies cluster on fir trees high in the mountains, where the cool, steady air helps them survive. When trees are cut, the shelter thins, and a single cold storm can kill large numbers.

Third, extreme weather is becoming more common. Droughts dry up nectar flowers that adults need for fuel during migration.

The good news is that people can help. Schools, families and cities have planted milkweed gardens along the migration path. Mexico has protected many of the winter forests. Every garden is like a gas station on a long highway—small, but it keeps travelers going.`,
    qs: [
      [["central"], "What is the central idea of the article?", "Monarchs are declining for several connected reasons, but people can help.", ["Monarchs live only in Texas.", "Milkweed is a weed that should be removed.", "Butterflies are the fastest insects."], "The article explains causes, then solutions."],
      [["structure"], "How is most of the article organized?", "cause and effect", ["chronological order of one butterfly's life", "compare and contrast of two insects", "a story with characters"], "It lists causes of the decline and their effects."],
      [["evidence"], "Which detail supports the idea that milkweed is necessary?", "Monarch caterpillars can eat only milkweed.", ["The butterflies cluster on fir trees.", "Many of them pass straight through Texas.", "Mexico has protected many of the winter forests."], "If caterpillars can eat nothing else, milkweed is essential."],
      [["summary"], "Which is the best summary?", "Monarch numbers are dropping because of lost milkweed, shrinking forests and extreme weather, but gardens and protected forests help.", ["Monarchs fly to Mexico.", "Milkweed grows in fields.", "Droughts happen in Texas."], "It includes the main causes and solution."],
      [["authorpov", "purpose"], "What is the author's main purpose?", "To inform readers about the problem and how people can help", ["To entertain with a funny story", "To sell milkweed seeds", "To argue that butterflies are pests"], "The article explains facts and ends with ways to help."],
      [["figurative", "analogy"], "Why does the author compare a garden to a gas station?", "To show that gardens give migrating monarchs fuel to keep going", ["To show butterflies need gasoline", "To suggest gardens are noisy", "To compare cars and butterflies by size"], "Nectar is like fuel on a long trip."],
      [["cause", "interact"], "What happens when the winter forests are cut?", "The butterflies have less shelter, and cold storms can kill many.", ["The butterflies fly faster.", "Milkweed grows taller.", "The butterflies stay in Texas."], "The article says the shelter thins."],
      [["vocab"], "What does \"cluster\" mean in the article?", "gather closely together", ["fly away", "lay eggs", "change color"], "The butterflies cluster on fir trees for warmth."],
    ],
  },
  {
    grade: 6, kind: "argument", title: "Let Students Choose Their Books",
    text: `Every year, students at many middle schools are handed the same short list of required novels. I believe schools should let students choose most of the books they read for class.

First, choice builds motivation. When students pick books that match their interests, they are more likely to finish them. In one survey of young readers, a large majority said they were more likely to finish a book they had picked themselves.

Second, choice builds stronger readers. Students who read more pages each day grow their vocabulary faster. If choice makes students read more, it also makes them better readers.

Some teachers worry that students will pick only easy books. This is a fair concern. However, teachers can guide choice by offering a wide list at different levels and by meeting with students to set reading goals. Guided choice is not the same as no rules at all.

Finally, choice teaches responsibility. Adults choose what they read every day. Learning to choose wisely in school prepares students for that.

Required books still have a place; a few shared novels let a class discuss ideas together. But for most reading, schools should trust students to choose.`,
    qs: [
      [["claims", "argument"], "What is the author's main claim?", "Schools should let students choose most of the books they read for class.", ["Students should never read novels.", "Teachers should pick every book.", "Reading is not important."], "The author says it in the first paragraph and repeats it at the end."],
      [["argument", "evidence"], "Which piece of evidence supports the reason \"choice builds motivation\"?", "A survey found most young readers are more likely to finish books they picked.", ["Adults choose what they read every day.", "A few shared novels let a class discuss ideas.", "Teachers can meet with students."], "It is data about finishing books."],
      [["argument"], "What counterclaim does the author address?", "Students might pick only easy books.", ["Books are too expensive.", "Students don't like reading.", "Libraries are too small."], "\"Some teachers worry that students will pick only easy books.\""],
      [["argument", "claims"], "How does the author respond to the counterclaim?", "By suggesting guided choice with a wide list and reading goals", ["By ignoring it", "By agreeing that choice is a bad idea", "By saying teachers are wrong about everything"], "The author offers a solution."],
      [["authorpov"], "How does the author feel about required books?", "They still have a place, but only for some reading.", ["They should be banned.", "They are the only good books.", "They are too long."], "The conclusion says required books still have a place."],
      [["tone"], "Which word best describes the author's tone?", "reasonable", ["furious", "silly", "sad"], "The author admits fair concerns and offers balanced solutions."],
      [["evidence", "claims"], "Which reason is LEAST supported by evidence in the essay?", "Choice teaches responsibility.", ["Choice builds motivation.", "Choice builds stronger readers.", "Students who read more grow vocabulary faster."], "That reason relies on an example about adults, not data."],
      [["structure"], "Why does the author use the words First, Second and Finally?", "To organize the reasons clearly", ["To tell a story in time order", "To compare two books", "To show the essay is a poem"], "Transitions help readers follow the argument."],
    ],
  },
  {
    grade: 6, kind: "poem", title: "Bluebonnet Morning",
    text: `The field wakes up in pieces—
first a blue edge, then a blue sea,
as if the sky slipped down at night
and forgot to climb back home.

My little brother runs ahead,
his sneakers flashing white,
a small boat cutting waves of flowers
that close behind him, soft and slight.

Mom says we cannot pick them;
they belong here, not in jars.
So we pick the moment instead
and carry it home like stars.`,
    qs: [
      [["poem", "figurative"], "What does the speaker mean by \"as if the sky slipped down at night\"?", "The blue flowers look like the sky fell onto the field.", ["It rained all night.", "The sky became dark.", "The flowers are tall like clouds."], "The blue field is compared to the sky."],
      [["figurative"], "In stanza 2, what is the little brother compared to?", "a small boat", ["a star", "the sky", "a jar"], "\"A small boat cutting waves of flowers.\""],
      [["poem", "structure"], "How is the poem organized?", "Three stanzas of four lines each", ["One long paragraph", "Two lines that rhyme", "A list of facts"], "It has three groups of four lines."],
      [["theme"], "What is the theme of the poem?", "Some beautiful things are best kept as memories, not possessions.", ["Flowers should always be picked.", "Running is good exercise.", "The sky is falling."], "They \"pick the moment instead.\""],
      [["tone"], "What is the tone of the poem?", "peaceful and joyful", ["angry", "fearful", "bored"], "Soft images and happy moments create calm joy."],
      [["poem"], "Which words in stanza 2 rhyme?", "white and slight", ["ahead and flowers", "runs and waves", "boat and soft"], "Lines 2 and 4 end with white and slight."],
      [["evidence"], "Which line shows the family respects nature?", "they belong here, not in jars.", ["My little brother runs ahead,", "first a blue edge, then a blue sea,", "his sneakers flashing white,"], "Mom explains why they leave the flowers."],
    ],
  },
  {
    grade: 6, kind: "informational", title: "Screen Time by the Numbers",
    text: `How much time do young people really spend on screens? A survey of 1,000 students ages 11 to 14 asked them to record their screen use for one week. The chart below shows the average hours per school day.

CHART — Average hours per school day:
• Watching videos: 2.0 hours
• Gaming: 1.5 hours
• Social media: 1.0 hour
• Homework on a device: 1.0 hour
• Video calls and texting: 0.5 hour
Total: 6 hours

The results surprised some parents. Only about one-sixth of screen time was used for homework. Watching videos took up the most time.

Researchers noted that not all screen time is the same. A video call with a grandparent and three hours of scrolling are very different experiences. They suggest families focus on what kids do on screens, not only on the total hours.

Still, sleep experts warn that screens near bedtime can make it harder to fall asleep, because bright light signals the brain to stay awake.`,
    qs: [
      [["features", "media"], "According to the chart, which activity takes the most time?", "Watching videos", ["Gaming", "Social media", "Homework on a device"], "Videos: 2.0 hours, the highest number."],
      [["features"], "How many hours per school day are spent gaming and on social media combined?", "2.5 hours", ["1.5 hours", "3 hours", "6 hours"], "1.5 + 1.0 = 2.5."],
      [["central"], "What is the central idea of the article?", "Students spend a lot of time on screens, and what they do matters as much as how long.", ["Screens should be banned.", "Gaming is the best activity.", "Parents spend more time on screens than kids."], "The researchers' point is about the type of screen time."],
      [["evidence", "claims"], "Which detail supports the claim that only a small part of screen time is for homework?", "Homework on a device: 1.0 hour of 6 total", ["Watching videos: 2.0 hours", "1,000 students took the survey", "Video calls: 0.5 hour"], "1 out of 6 hours is about one-sixth."],
      [["media", "purpose"], "Why does the author include a chart?", "To show the survey results in a clear, quick way", ["To entertain readers with pictures", "To prove screens are good", "To list students' names"], "Charts make numbers easy to compare."],
      [["cause"], "Why can screens near bedtime affect sleep?", "Bright light signals the brain to stay awake.", ["Screens are too loud.", "Screens are heavy.", "Videos are too long."], "Sleep experts explain the cause."],
      [["authorpov"], "What is the researchers' view on screen time?", "The type of activity matters, not only the total hours.", ["All screen time is equally harmful.", "Screen time has no effects.", "Only gaming matters."], "They suggest families focus on what kids do."],
    ],
  },
  {
    grade: 7, kind: "drama", title: "The Audition",
    text: `CHARACTERS: MAYA, 13; JAY, her best friend; MS. LANE, the drama teacher

SCENE: A school hallway outside the auditorium. A sign on the door reads "Auditions: Spring Musical."

MAYA: (pacing, clutching a script) I can't do it. My voice cracks on the high note every single time.

JAY: (leaning against the lockers) You sang it perfectly in the car yesterday.

MAYA: That's because the radio was louder than me.

JAY: (grinning) Fair point. But you've practiced for three weeks. Even the cat stopped leaving the room.

MAYA: (laughs, then stops) What if everyone hears me crack?

(MS. LANE opens the door.)

MS. LANE: Maya Torres? You're next.

MAYA: (whispering to JAY) If I faint, tell my mom I loved her.

JAY: (whispering back) If you faint, I'm taking your spot.

(MAYA rolls her eyes, takes a breath and walks in. The door closes. JAY presses an ear to it. A clear voice rises—and on the high note, it cracks. A pause. Then the voice keeps going, stronger than before.)

JAY: (quietly, smiling) That's it. Keep going.

(Lights fade.)`,
    qs: [
      [["drama"], "What are the words in parentheses called?", "stage directions", ["dialogue", "the cast list", "the scene title"], "They tell actors what to do and how to speak."],
      [["drama", "setting"], "Where does the scene take place?", "A school hallway outside the auditorium", ["Inside a car", "On the stage", "In Maya's house"], "The scene description sets the place."],
      [["character", "dialogue"], "What does Jay's line \"If you faint, I'm taking your spot\" show about him?", "He uses humor to calm Maya down.", ["He wants to steal her role.", "He doesn't care about Maya.", "He is nervous too."], "His joke makes her roll her eyes, easing the tension."],
      [["plot"], "What is the climax of the scene?", "Maya's voice cracks on the high note, but she keeps singing.", ["Ms. Lane opens the door.", "Maya paces in the hallway.", "Jay leans against the lockers."], "It is the moment of greatest tension and turning."],
      [["theme"], "What theme does the scene suggest?", "Courage means continuing even when you make a mistake.", ["Singing is easy.", "Friends should compete.", "Never try new things."], "Maya cracks but keeps going, stronger than before."],
      [["dialogue", "character"], "How does dialogue reveal Maya's feelings?", "Her worried questions show she is afraid of failing.", ["She brags about her voice.", "She says she is bored.", "She refuses to speak."], "\"What if everyone hears me crack?\""],
      [["drama", "structure"], "Why does the playwright have Jay listen at the door instead of showing the audition?", "It lets the audience experience the suspense through Jay.", ["Because the auditorium is closed forever", "To make the play longer", "Because Jay is the main singer"], "We wait and listen with him."],
      [["pov", "character"], "How are Maya's and Jay's points of view different before the audition?", "Maya expects to fail; Jay believes she will do well.", ["Both expect her to fail.", "Jay is more scared than Maya.", "Neither cares about the audition."], "Jay reminds her she sang perfectly."],
    ],
  },
  {
    grade: 7, kind: "fiction", title: "Storm Over Galveston, 1900",
    text: `On the morning of September 8, 1900, eleven-year-old Thomas watched waves splash farther up the beach than he had ever seen. Grown-ups laughed and waded in the flooded streets. Galveston had weathered storms before.

By afternoon, nobody was laughing. Wind tore shingles from roofs and flung them like playing cards. Thomas's father led the family to a neighbor's sturdy brick house. Water rose to the first-floor windows, then the stairs. They climbed to the attic and listened to the house groan all night.

At dawn, Thomas looked out at a city he did not recognize. Whole blocks had vanished.

---

Historical note: The Galveston hurricane of 1900 is still the deadliest natural disaster in United States history. Estimates say between 6,000 and 12,000 people died. At the time, Galveston's highest point was less than nine feet above sea level, and the storm surge was about fifteen feet. Afterward, the city built a massive seawall and raised the ground level of much of the city by pumping sand underneath buildings.`,
    qs: [
      [["history", "compare"], "Which detail in the story is supported by the historical note?", "Water rose high enough to flood houses to the stairs.", ["Thomas was eleven years old.", "A neighbor had a brick house.", "Shingles flew like playing cards."], "The note says the surge was about 15 feet, higher than the island."],
      [["history", "compare"], "How does the story differ from the historical note?", "The story shows one family's experience; the note gives facts and numbers.", ["The story has more statistics.", "The note has characters and dialogue.", "They describe different storms."], "Fiction gives a personal view; history gives the big picture."],
      [["purpose", "history"], "Why might an author use a fictional character to tell about a real event?", "To help readers feel what living through it was like", ["To change what really happened", "To make the event seem fake", "To avoid using facts"], "Historical fiction makes history personal."],
      [["interact", "cause"], "What did the city do because of the hurricane?", "Built a seawall and raised the ground level", ["Moved everyone to Houston", "Stopped all shipping", "Built a bigger beach"], "The historical note describes these changes."],
      [["infer", "character"], "Why did grown-ups laugh in the flooded streets that morning?", "They didn't realize how dangerous the storm would be.", ["They enjoyed swimming.", "They knew the storm would pass quickly.", "They were celebrating a holiday."], "Galveston had weathered storms before, so they weren't worried."],
      [["figurative"], "What does \"listened to the house groan\" suggest?", "The house was straining under the storm.", ["The house was singing.", "Someone was sick.", "The family was arguing."], "Groan gives the house a human sound of strain."],
      [["setting", "plot"], "How does the setting drive the plot?", "The low island and rising water force the family to flee upward.", ["The setting is not important.", "The story happens in a desert.", "The setting changes to a city in Mexico."], "The storm and flooding create the conflict."],
      [["evidence"], "Which sentence best shows how much the city changed?", "Whole blocks had vanished.", ["Galveston had weathered storms before.", "They climbed to the attic.", "Thomas's father led the family."], "It shows huge destruction."],
    ],
  },
  {
    grade: 7, kind: "informational", title: "How the Railroad Remade Texas Towns",
    text: `In the late 1800s, railroads spread across Texas, and they decided which towns would grow and which would fade.

When a railroad company laid tracks, it chose where to put stations. A town with a station could ship cotton and cattle to faraway markets quickly and cheaply. Merchants moved in, banks opened, and populations grew. Many Texas cities owe their early growth to a railroad junction.

Towns the tracks skipped faced a hard choice. Some residents loaded their houses onto wagons and moved them, board by board, to be near the new station. Other towns slowly emptied. Today, a lonely cemetery or a historical marker may be all that remains of them.

The railroad also changed daily life. Before the tracks came, a trip that took days by wagon could now take hours. Newspapers, mail and catalog goods arrived faster. Ranchers no longer had to drive cattle hundreds of miles north on long trails; they could load them onto trains closer to home.

The railroad, in short, did more than carry passengers. It redrew the map of Texas.`,
    qs: [
      [["central"], "What is the central idea of the article?", "Railroads shaped which Texas towns grew and changed daily life.", ["Trains are the fastest way to travel today.", "Cattle drives were fun.", "Texas has many cemeteries."], "Every paragraph connects railroads to growth and change."],
      [["interact", "cause"], "How did a railroad station affect a town?", "It helped the town grow by connecting it to markets.", ["It made the town smaller.", "It ended all farming.", "It closed the banks."], "Merchants and banks moved in."],
      [["interact"], "How did people respond when the tracks skipped their town?", "Some moved their houses to be near the station.", ["They built their own railroad.", "They stopped using wagons forever.", "They moved to Mexico."], "Residents moved houses board by board."],
      [["structure"], "How does the last paragraph work?", "It sums up the article with a strong conclusion.", ["It introduces a new topic.", "It tells a story about one family.", "It lists statistics."], "\"In short\" signals a summary."],
      [["figurative"], "What does \"It redrew the map of Texas\" mean?", "The railroad changed where people lived and towns grew.", ["Someone drew a new map.", "The borders of Texas moved.", "Trains painted lines on the ground."], "It is a metaphor for big changes."],
      [["summary"], "Which is the best summary?", "Texas railroads helped station towns grow, left skipped towns to fade, and sped up trade and travel.", ["Railroads carry passengers.", "Some towns have cemeteries.", "Mail used to be slow."], "It covers the main points."],
      [["cause", "evidence"], "Which detail shows the railroad changed ranching?", "Ranchers could load cattle onto trains closer to home.", ["Merchants moved in.", "Newspapers arrived faster.", "Banks opened."], "Ranchers no longer drove cattle north on long trails."],
    ],
  },
  {
    grade: 7, kind: "argument", title: "Should Cities Ban Plastic Bags?",
    text: `Plastic bags are cheap and convenient, but they cost our communities far more than they seem to. Cities should ban single-use plastic bags.

The strongest reason is waste. Americans use billions of plastic bags each year, and most are used for only a few minutes. Because they are light, they blow out of trash cans and landfills, catching in trees and washing into rivers and oceans, where animals can mistake them for food.

A second reason is cost. Cities spend money cleaning bags from streets and clearing them from recycling machines, where they jam equipment.

Opponents argue that bans hurt shoppers who rely on free bags. That concern deserves attention. Cities can respond by giving away reusable bags to families who need them and phasing the ban in over a year.

Some people also claim that a friend of theirs reuses every plastic bag, so bags aren't a problem. One person's habits, however, do not change the billions of bags discarded every year.

A ban is a simple step with a big effect. Cities that care about clean streets and healthy waterways should take it.`,
    qs: [
      [["claims", "argument"], "What is the author's claim?", "Cities should ban single-use plastic bags.", ["Plastic bags are the best bags.", "Recycling machines are expensive.", "Shoppers should pay for all bags."], "It is stated in the first paragraph."],
      [["argument"], "What are the author's two main reasons?", "Bags create waste, and they cost cities money.", ["Bags are heavy and expensive.", "Bags are colorful and fun.", "Bags help animals and save time."], "\"The strongest reason is waste\" and \"A second reason is cost.\""],
      [["argument", "evidence"], "Which claim in the essay is NOT supported by strong evidence?", "One person reuses every bag, so bags aren't a problem.", ["Bags jam recycling machines.", "Bags blow out of trash cans.", "Americans use billions of bags."], "The author points out that one example is weak evidence."],
      [["argument"], "How does the author answer the counterclaim that bans hurt shoppers?", "By suggesting free reusable bags and a gradual phase-in", ["By saying shoppers don't matter", "By dropping the argument", "By banning all bags immediately"], "The author offers solutions."],
      [["evidence"], "Which detail best supports the reason about waste?", "Bags blow into rivers and oceans, where animals can mistake them for food.", ["Plastic bags are cheap.", "A ban is a simple step.", "Opponents argue that bans hurt shoppers."], "It shows the harm caused by waste."],
      [["authorpov", "tone"], "Which word best describes the author's attitude?", "concerned", ["amused", "uncertain", "bored"], "The author worries about harm to communities."],
      [["structure"], "Why does the author mention opponents' views?", "To show fairness and strengthen the argument by answering them", ["To change sides", "To fill space", "To confuse readers"], "Addressing counterclaims makes an argument stronger."],
    ],
  },
  {
    grade: 7, kind: "fiction", title: "Two Sides of the Fence",
    text: `Every Saturday, Mr. Abernathy's leaf blower roared at seven in the morning. And every Saturday, twelve-year-old Dev pulled his pillow over his head and groaned. "Who needs a perfect lawn at sunrise?"

Dev's mom suggested he go talk to him. Dev rehearsed angry speeches all week, but when he finally knocked on the door, Mr. Abernathy answered in a back brace.

"Sorry about the noise," the old man said before Dev could speak. "Doctor says I've got to finish chores before the heat. My back can't take the afternoon sun anymore." He nodded at the yard. "My wife planted those roses. She's gone now, but I keep them the way she liked."

Dev's speech evaporated. "Could I … help?" he asked. "If I did the leaves Friday after school, you wouldn't need to blow them Saturday."

Mr. Abernathy studied him. "You'd do that?"

"I'd sleep in," Dev admitted. "So it's kind of selfish."

The old man laughed for the first time Dev could remember. "Best kind of selfish there is."`,
    qs: [
      [["pov", "character"], "How does Dev's point of view about Mr. Abernathy change?", "He goes from annoyed to understanding and helpful.", ["He goes from friendly to angry.", "He stays angry the whole time.", "He becomes afraid of him."], "Learning the reason for the noise changes Dev's view."],
      [["pov"], "What point of view is the story told from?", "third person, mostly following Dev", ["first person, by Mr. Abernathy", "first person, by Dev", "second person"], "The narrator uses he and Dev, and shows Dev's thoughts."],
      [["character", "infer"], "Why does Mr. Abernathy keep the roses perfect?", "To honor his late wife, who planted them", ["To win a contest", "To annoy Dev", "To sell them"], "\"She's gone now, but I keep them the way she liked.\""],
      [["theme"], "What is the theme?", "Understanding another person's side can turn conflict into kindness.", ["Neighbors are always rude.", "Gardening is hard work.", "You should never knock on doors."], "Dev learns the truth and offers help."],
      [["figurative"], "What does \"Dev's speech evaporated\" mean?", "Dev forgot or dropped his angry words.", ["Dev's voice got louder.", "Dev started sweating.", "Dev's paper got wet."], "Like water drying up, his anger disappeared."],
      [["plot"], "What is the turning point of the story?", "Dev learns why Mr. Abernathy works early in the morning.", ["The leaf blower starts.", "Dev pulls his pillow over his head.", "Dev's mom gives advice."], "This changes how Dev acts."],
      [["dialogue", "irony"], "Why does Mr. Abernathy call Dev's offer \"the best kind of selfish\"?", "Because helping others also helps Dev, which is good for both.", ["Because Dev is being mean.", "Because Dev wants money.", "Because he doesn't want help."], "Dev sleeps in and Mr. Abernathy gets help."],
    ],
  },
  {
    grade: 7, kind: "poem", title: "The Runner",
    text: `At the starting line, my heart
is a drum someone forgot to stop.
The gun cracks the morning open.

Lap one: I am wind.
Lap two: I am breath and burning.
Lap three: I am only legs,
two pistons that refuse to quit.

Lap four, the last—
the crowd becomes a blur of noise,
the finish line a thin white promise.

I don't win.
I don't need to.
I beat the girl I was in August,
and she was fast too.`,
    qs: [
      [["poem", "structure"], "Why does the poet repeat \"Lap one,\" \"Lap two,\" \"Lap three\"?", "To show the race moving forward and the runner changing", ["To count the poem's lines", "To show the runner is confused", "Because each lap is the same"], "Each lap brings a new feeling."],
      [["figurative"], "What is the runner's heart compared to at the start?", "a drum that won't stop", ["a white line", "wind", "a piston"], "\"My heart is a drum.\""],
      [["figurative"], "What does \"two pistons that refuse to quit\" describe?", "the runner's legs working like a machine", ["the starting gun", "the crowd", "the finish line"], "Pistons pump steadily, like tired legs that keep going."],
      [["theme"], "What is the theme of the poem?", "Personal improvement can matter more than winning.", ["Only winners matter.", "Running is boring.", "Crowds are loud."], "\"I beat the girl I was in August.\""],
      [["poem", "structure"], "How does the final stanza differ from the others?", "It is short and reflective, after the action ends.", ["It describes the starting line.", "It is the longest stanza.", "It rhymes perfectly."], "The pace slows to a reflection."],
      [["tone"], "What is the tone of the final stanza?", "proud and calm", ["angry", "disappointed", "frightened"], "The runner is satisfied with her progress."],
      [["figurative"], "What does \"the finish line a thin white promise\" suggest?", "The end is close and offers hope.", ["The finish line is broken.", "The race is canceled.", "The runner is lying."], "A promise is something hoped for."],
    ],
  },
  {
    grade: 8, kind: "fiction", title: "Ari and the Loom",
    text: `Everyone at Westbrook Middle agreed: Ari's designs were the best in the fashion club. Ari agreed too—loudly.

"Honestly, I could beat anyone," Ari said, sketching a jacket. "Even Ms. Pallas." Ms. Pallas had designed costumes for Broadway before she began teaching.

The room went quiet. Ms. Pallas set down her coffee. "Then let's have a contest," she said calmly. "One week. One garment each."

Ari stitched day and night. The final jacket was dazzling—but its patches mocked teachers and classmates, each one a joke at someone's expense.

Ms. Pallas's piece was simple: a coat stitched with tiny scenes of every student in the club helping one another.

The judges, three local designers, studied both for a long time. "Your skill is extraordinary," one told Ari. "But your design is about tearing people down. Hers lifts them up."

Ari won second place. That night, Ari unpicked the mocking patches one by one and began, for the first time, to sew something for someone else.

Author's note: This story retells the Greek myth of Arachne, a gifted weaver who boasted she was better than the goddess Athena (called Pallas Athena). In the myth, Arachne's tapestry insulted the gods, and Athena turned her into a spider.`,
    qs: [
      [["myth", "compare"], "Which character in the story matches the goddess Athena?", "Ms. Pallas", ["Ari", "one of the judges", "a club member"], "The author's note explains that Athena was called Pallas Athena."],
      [["myth", "compare"], "How does the modern ending differ from the myth?", "Ari learns and changes instead of being turned into a spider.", ["Ari is turned into a spider.", "Ms. Pallas loses the contest.", "There is no contest."], "The modern story offers a chance to grow."],
      [["myth", "theme"], "What theme do the myth and the modern story share?", "Pride and disrespect can lead to a fall.", ["Sewing is difficult.", "Teachers always win.", "Contests are unfair."], "Both characters boast and insult others."],
      [["character"], "What is Ari's main character trait at the beginning?", "arrogant", ["shy", "lazy", "generous"], "Ari loudly agrees that Ari is the best."],
      [["character", "plot"], "What does Ari unpicking the patches show?", "Ari has realized the mistake and wants to change.", ["Ari wants to sell the jacket.", "Ari is angry at the judges.", "Ari plans to quit sewing."], "It is a symbol of Ari's change."],
      [["theme"], "What message do the judges' words express?", "Talent matters less than how you use it.", ["Skill is all that matters.", "Simple designs always win.", "Judges prefer teachers."], "\"Your design is about tearing people down.\""],
      [["purpose", "myth"], "Why did the author include the author's note?", "To explain the myth that inspired the story", ["To give sewing instructions", "To list the judges' names", "To prove the story is true"], "It connects the story to its source."],
      [["dialogue"], "How does Ms. Pallas's calm reply affect the plot?", "It sets up the contest that drives the rest of the story.", ["It ends the story.", "It shows she is afraid.", "It makes Ari quit."], "The contest is the main event."],
    ],
  },
  {
    grade: 8, kind: "fiction", title: "The Surprise",
    text: `Lena had planned her parents' anniversary dinner for a month. Her little brother Theo was in charge of keeping them away until six o'clock.

At 5:30, Lena was frosting the cake when her dad called. "Hey, kiddo! Theo says you're at the library studying. Want us to pick you up? We're heading home early."

Lena's stomach dropped. "No! I mean—I'm in the middle of a chapter. Could you, um, get gas first? And maybe … check if the hardware store has lightbulbs?"

"Lightbulbs?" Dad laughed. "Okay, weird, but sure."

She texted Theo: WHERE ARE YOU?? Three dots appeared, then: lost them at the park, sorry!!!

Lena raced to finish. She dimmed the lights, lit the candles and hid behind the couch just as the key turned.

Her parents walked in—holding a cake of their own. "Surprise!" her mom shouted at the dark room. "We wanted to celebrate you two for being such great kids!"

From behind the couch, Lena burst out laughing. Theo, who had been in on BOTH plans, finally walked in, grinning.`,
    qs: [
      [["irony"], "Why is the ending an example of situational irony?", "The parents planned a surprise for the kids at the same time the kids planned one for them.", ["Lena forgets the cake.", "Dad buys lightbulbs.", "Theo is lost at the park."], "The outcome is the opposite of what Lena expected."],
      [["irony", "infer"], "What does Theo's text \"lost them at the park, sorry!!!\" turn out to be?", "A cover story, since he knew about both surprises", ["The truth: he really lost them", "A message meant for his parents", "A joke about the hardware store"], "The ending reveals Theo was in on both plans."],
      [["dialogue", "plot"], "How does Dad's phone call move the plot forward?", "It creates a problem: the parents are coming home early.", ["It ends the story.", "It shows Dad is angry.", "It explains the anniversary."], "Lena must stall them."],
      [["dialogue", "character"], "What does Lena's stammering reply on the phone reveal?", "She is panicking and making up excuses.", ["She is bored.", "She is reading a great book.", "She wants lightbulbs."], "\"No! I mean—\" shows panic."],
      [["character", "infer"], "What can you infer about Theo?", "He is playful and good at keeping secrets.", ["He is careless and forgetful.", "He dislikes his parents.", "He is afraid of Lena."], "He kept both surprises secret."],
      [["plot", "structure"], "What builds suspense in the middle of the story?", "Lena racing against time as her parents come home early", ["The description of the library", "The list of hardware items", "The weather"], "A ticking clock creates tension."],
      [["theme"], "What theme does the story suggest?", "Family members show love in surprising ways.", ["Surprises always fail.", "Never trust your brother.", "Cakes are hard to frost."], "Both sides were celebrating each other."],
    ],
  },
  {
    grade: 8, kind: "informational", title: "Two Reports on the Lake Fish Kill",
    text: `REPORT A — from the Riverside Daily News
Hundreds of dead fish washed onto the shore of Cedar Lake on Monday. Residents blamed a new factory upstream. "The water smelled like chemicals," said one neighbor. The factory declined to comment. The paper's headline read: "Factory Poisons Cedar Lake."

REPORT B — from the State Water Quality Office
On Monday, about 400 fish were found dead at Cedar Lake. Water tests showed very low oxygen levels, common after several days above 100°F. Tests for factory chemicals found none above safe limits. Low oxygen during heat waves is the most likely cause. The office will continue testing for two weeks.

---

A reader comparing these reports should notice their differences in purpose, evidence and language. Report A uses a dramatic headline and a resident's opinion. Report B uses measurements and explains its tests. Neither report is complete: Report A gives no test results, and Report B is waiting on two more weeks of data.`,
    qs: [
      [["conflicting", "compare"], "On what point do the two reports disagree?", "the cause of the fish kill", ["whether fish died", "the name of the lake", "the day it happened"], "A blames the factory; B points to low oxygen."],
      [["evidence", "conflicting"], "Which report uses stronger evidence?", "Report B, because it uses water test results", ["Report A, because it quotes a neighbor", "Report A, because it has a headline", "Neither uses any evidence"], "Measurements are stronger than opinions."],
      [["media", "tone"], "How does the headline \"Factory Poisons Cedar Lake\" affect readers?", "It makes them believe the factory is guilty before the facts are known.", ["It calms readers down.", "It explains the water tests.", "It shows the factory is innocent."], "Dramatic language can shape opinions."],
      [["conflicting"], "Why does the final paragraph say neither report is complete?", "A lacks test results, and B is still collecting data.", ["Both reports are false.", "Both reports agree.", "Both are too long."], "The passage explains each gap."],
      [["purpose"], "What is the purpose of the final paragraph?", "To teach readers how to compare and judge sources", ["To blame the factory", "To report new fish deaths", "To advertise the newspaper"], "It explains differences in purpose, evidence and language."],
      [["connotation"], "Which word in Report A has a strong negative connotation?", "Poisons", ["Lake", "Monday", "shore"], "Poisons suggests deliberate harm."],
      [["claims", "evidence"], "What would best resolve the disagreement?", "More test results over the next two weeks", ["Another resident's opinion", "A louder headline", "A photo of the factory"], "Data can confirm the cause."],
    ],
  },
  {
    grade: 8, kind: "informational", title: "Your Brain Is a Busy City",
    text: `Imagine your brain as a city that never sleeps. Its roughly 86 billion neurons are the city's residents, and they are constantly sending messages to one another.

Each neuron has long branches that act like roads. When you learn something new, signals travel down a new road for the first time. The road is rough and slow, like a dirt path. But each time you practice, the road gets used again, and the brain strengthens it—paving the dirt path into a highway. This is why practicing piano or math facts makes them feel easier over time.

Roads that are rarely used can fade. That is one reason we forget skills we stop practicing. Scientists call the brain's ability to build and reshape these roads neuroplasticity.

Sleep is the city's night crew. While you rest, the brain replays important signals and clears away waste. Students who sleep well after studying often remember more the next day.

Of course, no comparison is perfect. A real city does not rebuild its roads overnight, and the brain is far more complex than any map. But thinking of your brain as a busy city can remind you: practice paves the way.`,
    qs: [
      [["analogy", "figurative"], "What does the author compare practicing a skill to?", "paving a dirt path into a highway", ["building a new city", "hiring a night crew", "drawing a map"], "Repeated use strengthens the brain's roads."],
      [["analogy"], "In the analogy, what do the city's residents represent?", "neurons", ["thoughts", "roads", "dreams"], "\"Neurons are the city's residents.\""],
      [["analogy", "purpose"], "Why does the author use a city analogy?", "To make a complex idea about the brain easier to understand", ["To describe a real city", "To argue for more roads", "To tell a story about traffic"], "Familiar comparisons explain unfamiliar ideas."],
      [["structure"], "What is the role of the last paragraph?", "It admits limits of the comparison and restates the main idea.", ["It introduces a new topic.", "It tells a story.", "It gives directions to a city."], "\"No comparison is perfect\" … \"practice paves the way.\""],
      [["structure"], "What is the topic sentence of paragraph 2?", "Each neuron has long branches that act like roads.", ["This is why practicing piano or math facts makes them feel easier over time.", "The road is rough and slow, like a dirt path.", "Imagine your brain as a city that never sleeps."], "It introduces the paragraph's main idea."],
      [["central"], "What is the central idea?", "Practice strengthens the brain's connections, so skills get easier.", ["Cities never sleep.", "The brain has exactly 86 billion roads.", "Sleep is a waste of time."], "The article returns to practice repeatedly."],
      [["vocab"], "What does \"neuroplasticity\" mean?", "the brain's ability to build and reshape connections", ["a type of plastic", "a disease of the brain", "a kind of map"], "The passage defines it directly."],
      [["cause"], "Why might students who sleep well remember more?", "The brain replays important signals during sleep.", ["Sleep builds real roads.", "Dreams teach new facts.", "Sleep makes neurons multiply."], "The \"night crew\" replays signals."],
    ],
  },
  {
    grade: 8, kind: "argument", title: "Year-Round School Is Worth It",
    text: `Summer vacation was designed for a world that no longer exists. Most students today do not spend summers working on family farms. Schools should switch to a year-round calendar with shorter, more frequent breaks.

The strongest reason is the "summer slide." Studies have found that many students lose a month or more of math skills over a long summer. Teachers then spend weeks each fall reviewing old material.

Second, shorter breaks can reduce burnout. A three-week break every nine weeks gives students and teachers time to rest before they are exhausted.

Critics say year-round schedules make family vacations and summer jobs harder. That is true for some families, and schools should consider it. But year-round schools still give the same number of days off; they simply spread them out. Families can plan trips during the fall or spring breaks, when travel is often cheaper.

Others argue that air-conditioning costs will rise. This deserves study, but the cost of re-teaching lost skills each fall is also real.

When we weigh the evidence, a year-round calendar better fits how students learn today.`,
    qs: [
      [["claims", "argument"], "What is the author's claim?", "Schools should switch to a year-round calendar.", ["Summer vacation should be longer.", "Students should work on farms.", "Air-conditioning is too expensive."], "Stated at the end of the first paragraph."],
      [["argument", "evidence"], "Which evidence supports the \"summer slide\" reason?", "Studies found many students lose a month or more of math skills over summer.", ["Families can plan trips in fall.", "Air-conditioning costs may rise.", "Students don't work on farms."], "It is research data about learning loss."],
      [["argument"], "Which counterclaim does the author address?", "Year-round schedules make vacations and summer jobs harder.", ["Students like long homework.", "Teachers want longer summers.", "Schools are too big."], "\"Critics say …\""],
      [["argument", "claims"], "How strong is the author's response to the air-conditioning concern?", "Somewhat weak: the author admits it deserves study and gives no numbers.", ["Very strong: it gives exact costs.", "There is no response.", "The author agrees schools should close."], "The response doesn't include data."],
      [["argument"], "Which is a reason, not evidence?", "Shorter breaks can reduce burnout.", ["Studies found students lose a month of math skills.", "Teachers spend weeks reviewing.", "Year-round schools give the same days off."], "It is a reason without specific data."],
      [["structure"], "How does the author open the essay?", "By explaining that summer break was designed for an older way of life", ["With a story about a student", "With a question", "With a list of statistics"], "The first two sentences give background."],
      [["authorpov", "tone"], "What is the author's tone?", "confident but fair", ["sarcastic", "uncertain", "angry"], "The author admits some critics' points while holding firm."],
    ],
  },
  {
    grade: 8, kind: "fiction", title: "The Lighthouse Keeper's Daughter",
    text: `The new automatic light arrived on a gray Tuesday. Nora watched two workers bolt it into the lantern room where her father had climbed one hundred and twelve steps every night for twenty years.

"It never sleeps," one worker said proudly. "Never gets sick. Never forgets."

Her father nodded politely. That evening, for the first time, he did not climb the stairs.

"What will you do now?" Nora asked.

"Oh, there's always paint to scrape," he said, but his hands kept reaching for the logbook that no longer needed writing.

A week later, a storm knocked out the island's power. The automatic light went dark. Nora found her father already at the bottom of the stairs, an old oil lamp in his hand.

"Machines are good," he said, starting up. "But somebody still has to care."

That night, Nora climbed beside him, counting all one hundred and twelve steps. Halfway up, she realized she was memorizing them.`,
    qs: [
      [["theme"], "Which theme develops over the story?", "Human care and responsibility still matter, even with new technology.", ["Machines are always bad.", "Lighthouses are boring.", "Storms are rare."], "The father's words and actions show this."],
      [["theme", "plot"], "How does the storm help develop the theme?", "When the machine fails, the father's care becomes necessary again.", ["It shows the machine is perfect.", "It ends the father's job.", "It makes Nora leave the island."], "The failure tests the idea that machines are enough."],
      [["dialogue", "character"], "What does the worker's line \"Never forgets\" suggest?", "The machine seems better than a human keeper.", ["The worker forgets things.", "The worker is joking.", "The father is forgetful."], "It contrasts the machine with the father."],
      [["character", "infer"], "Why do the father's hands keep reaching for the logbook?", "He misses his job and doesn't know what to do now.", ["He is writing a story.", "He wants to throw it away.", "He is looking for paint."], "His habit shows loss."],
      [["character"], "What does Nora memorizing the steps suggest?", "She may carry on her father's responsibility.", ["She is bored.", "She wants to count for fun.", "She is afraid of heights."], "It hints at her taking up his role."],
      [["dialogue"], "Which line best states the story's message?", "\"Machines are good. But somebody still has to care.\"", ["\"It never sleeps.\"", "\"Oh, there's always paint to scrape.\"", "\"What will you do now?\""], "The father sums up the theme."],
      [["setting"], "How does the island setting matter?", "Isolation makes the lighthouse vital, especially when power fails.", ["It doesn't matter at all.", "It shows the story is in a city.", "It explains why the workers are proud."], "Ships depend on the light near the island."],
      [["summary"], "Which is the best summary?", "After an automatic light replaces her father's job, a storm shows Nora that human care still matters.", ["Workers install a light.", "A father scrapes paint.", "Nora counts steps."], "It covers the change and the turning point."],
    ],
  },
  {
    grade: 8, kind: "fiction", title: "The Midnight Fix",
    text: `At 11:45 the night before the robotics competition, Priya slipped back into the empty lab. She had noticed something nobody else had: a cracked gear deep inside the team's robot, Kestrel. If it broke during the match, Kestrel would freeze in place.

Priya spent an hour replacing the gear. She told no one, because the robot's design belonged to her teammate Marcus, and he hated when anyone touched his work.

The next morning, Marcus found grease on the lab table. "Someone messed with Kestrel," he announced, glaring at Priya. "If we lose, I know who to blame."

Priya opened her mouth, then closed it.

In the final round, the opposing robot slammed into Kestrel. Gears ground loudly. The crowd gasped—but Kestrel kept rolling and scored the winning point.

"See?" Marcus shouted, hugging the robot. "My design is unbreakable!"

Across the table, Priya smiled and quietly dropped the cracked gear into her pocket.`,
    qs: [
      [["irony"], "Why is Marcus's line \"My design is unbreakable!\" an example of dramatic irony?", "Readers know Priya secretly replaced a cracked gear, but Marcus does not.", ["Marcus is joking.", "The robot actually breaks.", "Priya does not know the robot won."], "Dramatic irony happens when readers know something a character doesn't."],
      [["irony", "character"], "Why does Marcus's accusation create tension for the reader?", "We know Priya helped, so his blame is unfair.", ["We know Priya broke the robot.", "We don't know who touched the robot.", "Marcus is right about Priya."], "The reader knows the truth Marcus doesn't."],
      [["character", "infer"], "Why doesn't Priya defend herself?", "She cares more about the team succeeding than getting credit.", ["She doesn't understand the question.", "She broke the robot.", "She wants Marcus to lose."], "She stays quiet and smiles at the end."],
      [["plot"], "What is the climax of the story?", "Kestrel is hit in the final round but keeps rolling to win.", ["Priya enters the lab.", "Marcus finds grease.", "Priya puts the gear in her pocket."], "It is the moment of greatest tension."],
      [["dialogue", "character"], "What does Marcus's dialogue reveal about him?", "He is proud and quick to blame others.", ["He is humble and thankful.", "He is shy.", "He suspects nothing."], "\"If we lose, I know who to blame.\""],
      [["theme"], "What theme does the story suggest?", "True teamwork doesn't need credit.", ["Robots always break.", "Never touch other people's work.", "Winning is everything."], "Priya helps silently."],
      [["evidence"], "Which sentence best shows Priya doesn't need recognition?", "Across the table, Priya smiled and quietly dropped the cracked gear into her pocket.", ["Priya spent an hour replacing the gear.", "She had noticed something nobody else had.", "Priya opened her mouth, then closed it."], "She keeps the proof to herself."],
    ],
  },
];
