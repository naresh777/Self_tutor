// Original reading passages for Grades 4 and 5, in the same shape as passages.js.
// Extra skills used here: pov (narrator and point of view), evidence (choosing the quote that
// supports an answer), accounts (firsthand and secondhand), and culture (traditional tales).

export const UPPER_PASSAGES = [
  {
    grade: 4, kind: "fiction", title: "The Robot That Wouldn't Stop",
    text: `I spent three weeks building Bolt, my cardboard-and-motor robot, for the Prosper Science Night. On the big evening, I set him on the table and flipped the switch. Bolt rolled forward, beeped twice, and kept going—right off the edge.

My face burned as people turned to look. I scooped up Bolt and saw that a wire had come loose from his brake sensor. My hands were shaking, but I remembered what Grandpa always says: "A problem is just a puzzle that hasn't been solved yet."

I borrowed tape from the judge's table and reattached the wire. This time, when Bolt reached the edge, he stopped, spun around, and rolled back to me. A small crowd clapped.

I didn't win first place. But when the judge handed me a ribbon for "Best Problem Solver," I decided that was even better.`,
    qs: [
      [["pov"], "From what point of view is the story told?", "First person, by the student who built Bolt", ["Third person, by the judge", "First person, by Grandpa", "Third person, by a narrator outside the story"], "The narrator uses I, me and my, and is the one who built Bolt."],
      [["plot", "elements"], "What is the main problem in the story?", "Bolt rolls off the table because a wire is loose.", ["The narrator forgets to bring Bolt.", "The judge doesn't like robots.", "Grandpa can't come to Science Night."], "Bolt kept going right off the edge, and a wire had come loose."],
      [["character", "infer"], "Which word best describes the narrator at the end?", "proud", ["embarrassed", "bored", "angry"], "The narrator decides the ribbon was 'even better' than first place."],
      [["evidence"], "Which sentence best shows the narrator was embarrassed?", "My face burned as people turned to look.", ["I spent three weeks building Bolt.", "A small crowd clapped.", "I borrowed tape from the judge's table."], "A burning face is a sign of embarrassment."],
      [["theme"], "What is the theme of the story?", "Staying calm and solving problems matters more than winning.", ["Robots are dangerous.", "Science fairs are unfair.", "Never build things out of cardboard."], "The narrator fixes Bolt and values the problem-solver ribbon."],
      [["vocab"], "What does Grandpa's saying, \"A problem is just a puzzle that hasn't been solved yet,\" mean?", "Problems can be figured out with effort.", ["Puzzles are a waste of time.", "Problems never go away.", "Only grandparents can solve problems."], "It compares a problem to a puzzle you can work out."],
      [["summary"], "Which is the best summary?", "A student's robot fails at Science Night, but the student fixes it and wins a problem-solving ribbon.", ["A student builds a robot named Bolt.", "Grandpa tells a saying about puzzles.", "The judge has tape on a table."], "A summary tells the main problem and how it is solved."],
    ],
  },
  {
    grade: 4, kind: "fiction", title: "Abuela's Tamales",
    text: `Every December, Lucía's family gathered in Abuela's kitchen to make tamales. Abuela spread masa on corn husks with quick, sure strokes. Lucía's strokes were slow and lumpy.

"Mine look terrible," Lucía sighed, holding up a tamale that drooped like a sleepy caterpillar.

Abuela laughed. "My first tamales looked worse. My mother made me practice until my arms ached." She guided Lucía's hand, showing her how to press the spoon flat.

By the end of the afternoon, Lucía had made two dozen. They weren't perfect, but they held together. When the family sat down to eat, Tío Marco took a bite and grinned. "Whoever made this one has a future in this kitchen."

Lucía beamed. It was one of hers.`,
    qs: [
      [["pov"], "From what point of view is the story told?", "Third person", ["First person, by Lucía", "First person, by Abuela", "Second person"], "The narrator uses she and her and is not a character in the story."],
      [["setting", "elements"], "When and where does the story take place?", "In Abuela's kitchen in December", ["At a restaurant in summer", "At school in the fall", "At a market on Saturday"], "The first sentence tells: every December in Abuela's kitchen."],
      [["character"], "How does Lucía change from the beginning to the end?", "She goes from discouraged to proud.", ["She goes from proud to sad.", "She stays bored the whole time.", "She goes from happy to angry."], "She sighs that hers look terrible, but at the end she beams."],
      [["figurative", "vocab"], "The tamale \"drooped like a sleepy caterpillar.\" What does this simile show?", "The tamale was floppy and messy.", ["The tamale was alive.", "The tamale was perfect.", "The tamale was very small."], "A sleepy caterpillar would sag, so the tamale sagged."],
      [["theme", "culture"], "What is a theme of this story?", "Skills and traditions are learned with practice and passed down in families.", ["Cooking is too hard for kids.", "Only grandmothers can cook.", "December is the best month."], "Abuela learned from her mother and now teaches Lucía."],
      [["evidence"], "Which detail best supports the idea that Abuela is patient?", "She guided Lucía's hand, showing her how to press the spoon flat.", ["Abuela spread masa with quick, sure strokes.", "Tío Marco took a bite and grinned.", "Lucía had made two dozen."], "Guiding her hand shows Abuela taking time to teach."],
    ],
  },
  {
    grade: 4, kind: "fiction", title: "Coyote and the Stars (A Tale Retold)",
    text: `Long ago, the night sky was dark and empty. First Woman sat on a blanket, carefully placing stars one by one to make pictures that would guide the people. She put the North Star in its spot so travelers could always find their way.

Coyote watched. "This is taking forever," he complained. Before First Woman could stop him, Coyote grabbed the corner of the blanket and flung it into the air. The remaining stars scattered across the sky in a messy sprinkle.

"Now there will always be stars with no pattern," First Woman said sadly. "And people will remember that hurrying can spoil careful work."

That is why, the elders say, some stars make clear shapes, while others are scattered like spilled sand.`,
    qs: [
      [["culture", "theme"], "What lesson does this tale teach?", "Being impatient can ruin careful work.", ["Stars are not important.", "Always help your friends.", "Blankets should be kept clean."], "First Woman says people will remember that hurrying can spoil careful work."],
      [["culture", "plot"], "What does this tale explain?", "Why some stars form patterns and others are scattered", ["Why coyotes howl", "How the sun was made", "Why people travel at night"], "The last paragraph says that is why some stars make shapes and others are scattered."],
      [["character"], "Which word best describes Coyote?", "impatient", ["careful", "wise", "shy"], "He complains that it is taking forever and grabs the blanket."],
      [["cause"], "What happens because Coyote flings the blanket?", "The rest of the stars scatter with no pattern.", ["The North Star falls.", "First Woman leaves.", "The sky turns blue."], "The remaining stars scattered across the sky in a messy sprinkle."],
      [["structure", "culture"], "How is this story like other traditional tales?", "It uses animal characters and explains something in nature.", ["It takes place in a modern city.", "It is told by a scientist.", "It has no lesson."], "Many traditional tales explain nature and teach a lesson."],
    ],
  },
  {
    grade: 4, kind: "info", title: "Letters from the Dust Bowl (Two Accounts)",
    text: `Account 1: A Letter
April 15, 1935
Dear Cousin Ruth,
Yesterday the sky turned black at noon. A wall of dust rolled over our farm like a giant wave. Mama hung wet sheets over the windows, but dust still crept in. This morning I wrote my name in the dirt on the kitchen table. I am tired of dust in my teeth.
Your cousin, Ellie

Account 2: From a History Book
On April 14, 1935, a storm later called "Black Sunday" swept across the Great Plains. Winds carried millions of tons of soil. Years of drought and farming that removed grasses had left the soil loose. The storm helped lead to new government programs that taught farmers to protect the land.`,
    qs: [
      [["accounts"], "Which account is a firsthand account?", "Account 1, the letter", ["Account 2, the history book", "Both accounts", "Neither account"], "Ellie lived through the storm and tells what she saw herself."],
      [["accounts", "compare"], "What does Account 2 tell that Account 1 does not?", "Why the soil was loose and what happened afterward", ["How dust felt in Ellie's teeth", "That Mama hung wet sheets", "That Ellie wrote her name in the dirt"], "The history book explains the drought, farming and new programs."],
      [["accounts", "compare"], "What does Account 1 tell that Account 2 does not?", "How the storm felt to a person who lived through it", ["How many tons of soil blew", "The name Black Sunday", "Why the government made new programs"], "The letter gives personal feelings and details."],
      [["cause"], "According to Account 2, what caused the soil to be loose?", "Drought and farming that removed grasses", ["Too much rain", "Wet sheets on windows", "Government programs"], "Years of drought and farming that removed grasses had left the soil loose."],
      [["figurative", "vocab"], "Ellie says the dust rolled in \"like a giant wave.\" What does this show?", "The dust storm was huge and powerful.", ["The storm brought ocean water.", "The dust was blue.", "The storm was small and gentle."], "A giant wave is huge and strong."],
      [["central"], "What is the central idea of Account 2?", "A huge dust storm in 1935 was caused by drought and poor farming and led to changes.", ["Ellie misses her cousin.", "Dust gets into houses.", "Sheets keep dust out."], "The history book explains the storm's causes and effects."],
    ],
  },
  {
    grade: 4, kind: "info", title: "How Volcanoes Form",
    text: `How Volcanoes Form

Deep Under the Ground
Far beneath Earth's surface, it is so hot that some rock melts into a thick liquid called magma.

Pushing Upward
Magma is lighter than the solid rock around it, so it slowly rises. It collects in a space called a magma chamber.

Eruption!
When enough pressure builds up, magma bursts through cracks in Earth's crust. Once magma reaches the surface, it is called lava. Over many eruptions, layers of cooled lava and ash pile up to build a mountain.

Diagram label: magma chamber → vent → crater`,
    qs: [
      [["structure"], "How is this text mostly organized?", "In sequence, telling the steps of how a volcano forms", ["Problem and solution", "Compare and contrast", "As a story with characters"], "The sections go in order from deep underground to eruption."],
      [["features"], "Which heading would help you find out what makes magma rise?", "Pushing Upward", ["Deep Under the Ground", "Eruption!", "How Volcanoes Form"], "That section explains that magma is lighter and rises."],
      [["vocab"], "What is the difference between magma and lava?", "Magma is underground; lava has reached the surface.", ["Magma is cold; lava is hot.", "They are two kinds of ash.", "Lava is underground; magma is above."], "The text says once magma reaches the surface it is called lava."],
      [["cause"], "What causes magma to burst through Earth's crust?", "Pressure building up", ["Rain falling", "Lava cooling", "Ash piling up"], "When enough pressure builds up, magma bursts through cracks."],
      [["features"], "What does the diagram label show?", "The path magma takes out of the volcano", ["Kinds of rocks", "How hot magma is", "Where people live"], "It goes magma chamber → vent → crater."],
      [["central", "summary"], "Which is the best summary?", "Melted rock rises, builds pressure, and erupts, and layers of lava build a volcano.", ["Lava is hot.", "Volcanoes have craters.", "Magma is a liquid."], "A summary covers the main steps."],
    ],
  },
  {
    grade: 4, kind: "persuade", title: "Make Bike Lanes Safer",
    text: `Dear City Council,

Our town needs protected bike lanes on Main Street. Right now, bike riders share the road with fast cars and trucks. Last year, our local paper reported eleven bike accidents on Main Street alone.

Protected lanes, which have a curb or posts between bikes and cars, keep riders safer. Cities that added them, such as Austin, saw fewer crashes. Safer lanes would also encourage more people to ride, which means less traffic and cleaner air.

Some people worry that bike lanes cost too much. However, they cost far less than widening roads, and fewer accidents save money for everyone.

Please vote yes on protected bike lanes.

Sincerely,
The Fifth-Grade Green Team`,
    qs: [
      [["purpose", "persuade"], "What is the author's main purpose?", "To persuade the council to build protected bike lanes", ["To tell a story about a bike ride", "To explain how to fix a bike", "To describe Austin"], "The letter ends: Please vote yes on protected bike lanes."],
      [["reasons", "evidence"], "Which piece of evidence supports the claim that Main Street is unsafe?", "Eleven bike accidents were reported on Main Street last year.", ["Austin is a city in Texas.", "Bike lanes have posts.", "The letter is signed by the Green Team."], "Accident numbers are evidence of danger."],
      [["reasons"], "Which is a reason the authors give for bike lanes?", "They would mean less traffic and cleaner air.", ["Bikes are more fun than cars.", "Main Street is too wide.", "The council likes bikes."], "More riders means less traffic and cleaner air."],
      [["structure", "reasons"], "How do the authors respond to people who worry about cost?", "They say lanes cost less than widening roads and save money.", ["They agree lanes are too expensive.", "They ignore the worry.", "They say money doesn't matter."], "The fourth paragraph answers the cost worry with 'However.'"],
      [["vocab"], "What does \"protected\" mean in \"protected bike lanes\"?", "Separated from cars by a curb or posts", ["Painted bright colors", "Only open on weekends", "Guarded by police"], "The letter explains protected lanes have a curb or posts between bikes and cars."],
    ],
  },
  {
    grade: 5, kind: "fiction", title: "The Lighthouse Keeper's Daughter",
    text: `The storm had been raging for hours when Nell saw the light flicker and die. Her father was in town, stuck on the far side of the flooded bridge. The supply boat was due back tonight, and without the lighthouse beam, its captain would never see the rocks.

Nell's stomach twisted. She had watched her father trim the wick a hundred times, but she had never climbed the tower alone during a storm. The wind shrieked against the glass as she counted the iron steps—ninety-eight, ninety-nine, one hundred.

At the top, her fingers were too cold to strike the match. She tucked her hands under her arms, breathed slowly, and tried again. The flame caught. Light swept across the black water just as a faint horn sounded from the bay.

The next morning, the captain knocked on their door with a basket of oranges. "Someone kept a steady hand last night," he said. Nell only smiled.`,
    qs: [
      [["plot", "elements"], "What is the conflict in the story?", "Nell must relight the lighthouse alone so the boat won't crash.", ["Nell is angry at her father.", "The captain forgets the oranges.", "Nell is afraid of the dark kitchen."], "The light died, her father was away, and the boat was coming."],
      [["character", "infer"], "What can you infer about Nell from the way she relights the lamp?", "She stays calm and determined under pressure.", ["She gives up easily.", "She doesn't care about the boat.", "She has never seen the lamp before."], "She warms her hands, breathes slowly, and tries again."],
      [["evidence"], "Which sentence best supports the idea that Nell was scared?", "Nell's stomach twisted.", ["The flame caught.", "Nell only smiled.", "The supply boat was due back tonight."], "A twisting stomach is a sign of fear."],
      [["pov"], "How would the story be different if the captain told it?", "Readers would not know Nell's thoughts and feelings in the tower.", ["The storm would not happen.", "Nell would not climb the tower.", "The story would have no setting."], "The narrator shows Nell's feelings; the captain was out on the water."],
      [["structure", "plot"], "Why does the author count the steps, \"ninety-eight, ninety-nine, one hundred\"?", "To build suspense as Nell climbs", ["To teach counting", "To show the tower is short", "To show Nell is bored"], "Slowing down the climb makes readers feel the tension."],
      [["theme"], "What is the theme?", "Courage means acting even when you are afraid.", ["Storms are always dangerous.", "Oranges are the best gift.", "Lighthouses are old-fashioned."], "Nell is scared but climbs the tower anyway."],
      [["vocab"], "What does \"Someone kept a steady hand\" mean?", "Someone stayed calm and did the job well.", ["Someone's hands were tied.", "Someone held the boat.", "Someone was too cold to move."], "The captain is praising Nell's calm work."],
    ],
  },
  {
    grade: 5, kind: "fiction", title: "Two Sides of the Fence",
    text: `Marcus thought his new neighbor, Mr. Okafor, was the grumpiest man on Elm Street. Every time Marcus's soccer ball sailed over the fence, Mr. Okafor tossed it back without a word, frowning.

One Saturday, Marcus climbed the fence to apologize and saw something surprising: rows of tiny seedlings, some flattened by soccer balls. Mr. Okafor knelt beside them, gently propping up a broken stem.

"These are from my mother's garden in Nigeria," he said quietly. "Seeds are all I could bring."

Marcus's cheeks went hot. That afternoon, he and his sister built a net to stop stray balls. A week later, a bag of fresh peppers appeared on their porch with a note: "Thank you, neighbor."`,
    qs: [
      [["character", "compare"], "How do Marcus's feelings about Mr. Okafor change?", "He goes from thinking he is grumpy to understanding and respecting him.", ["He goes from liking him to fearing him.", "He never changes his mind.", "He goes from respecting him to ignoring him."], "Marcus learns why Mr. Okafor frowned and helps him."],
      [["infer"], "Why did Mr. Okafor frown when the ball came over?", "The balls were damaging seedlings that mattered to him.", ["He doesn't like children.", "He wanted to keep the ball.", "He was tired of soccer on TV."], "Marcus sees seedlings flattened by soccer balls."],
      [["pov"], "Whose thoughts does the narrator share most?", "Marcus's", ["Mr. Okafor's", "Marcus's sister's", "No one's"], "We learn what Marcus thought and felt."],
      [["evidence"], "Which sentence shows Marcus felt embarrassed?", "Marcus's cheeks went hot.", ["He and his sister built a net.", "Seeds are all I could bring.", "A bag of fresh peppers appeared."], "Hot cheeks show embarrassment."],
      [["theme"], "What is the theme?", "Understanding someone's story can change how you see them.", ["Soccer is dangerous.", "Fences make good neighbors.", "Gardens need sun."], "Marcus changes his view after learning about the seeds."],
      [["relationships", "cause"], "What happens as a result of Marcus building the net?", "Mr. Okafor leaves peppers and a thank-you note.", ["Marcus stops playing soccer.", "The seedlings are flattened.", "Mr. Okafor moves away."], "A week later, peppers appear with a note."],
    ],
  },
  {
    grade: 5, kind: "info", title: "The Secret Life of Coral Reefs",
    text: `Coral reefs cover less than one percent of the ocean floor, yet about one-fourth of all ocean animals depend on them. That is why scientists call reefs "the rainforests of the sea."

A coral may look like a rock or a plant, but it is actually made of tiny animals called polyps. Each polyp builds a hard shell around itself. Over hundreds of years, millions of these shells form a reef.

Corals get most of their food from algae that live inside them. The algae use sunlight to make food and share it with the coral. In return, the coral gives the algae a safe home. This partnership also gives corals their bright colors.

When ocean water gets too warm, corals push out their algae and turn white. This is called coral bleaching. If the water cools quickly, the coral can recover. If not, it may die. Scientists are now growing young corals in underwater "nurseries" and planting them on damaged reefs.`,
    qs: [
      [["central", "several"], "What are two central ideas of the passage?", "Coral reefs support many animals, and warming water threatens them.", ["Corals are rocks, and algae are fish.", "Reefs are in rainforests, and they are cold.", "Polyps are plants, and nurseries are schools."], "The passage explains why reefs matter and how bleaching harms them."],
      [["vocab"], "Why are reefs called \"the rainforests of the sea\"?", "Because so many kinds of living things depend on them", ["Because it rains on them", "Because they have trees", "Because they are green"], "One-fourth of ocean animals depend on reefs, like a rainforest's many species."],
      [["structure", "cause"], "How is the fourth paragraph organized?", "Cause and effect", ["Chronological order from 1900 to today", "A list of coral names", "A story with dialogue"], "Warm water causes bleaching, which can cause death."],
      [["relationships"], "How do corals and algae help each other?", "Algae share food; corals give algae a home.", ["Corals eat the algae.", "Algae build coral shells.", "They do not interact."], "The third paragraph describes the partnership."],
      [["infer", "conclusions"], "What can you conclude about coral nurseries?", "Scientists hope they will help damaged reefs recover.", ["They are where corals sleep.", "They make the water warmer.", "They are for baby fish only."], "Young corals are planted on damaged reefs."],
      [["evidence"], "Which sentence supports the idea that reefs are important?", "About one-fourth of all ocean animals depend on them.", ["A coral may look like a rock.", "This is called coral bleaching.", "Each polyp builds a hard shell."], "That fact shows how many animals rely on reefs."],
    ],
  },
  {
    grade: 5, kind: "info", title: "Kids Who Changed Their Towns",
    text: `When Mia Torres was nine, she noticed that the playground in her neighborhood had no swings that her cousin, who uses a wheelchair, could ride. Mia wrote letters to the city, gave a speech at a council meeting, and helped raise money with a lemonade stand. Two years later, the park opened an accessible swing.

In another town, eleven-year-old Jayden Brooks saw that many families near him had no easy way to get fresh vegetables. He started a garden club at school. The club now grows food in raised beds and gives away hundreds of pounds of produce every summer.

Both kids started with a problem they noticed close to home. Both asked adults for help, and both kept going when things moved slowly. Their stories show that young people can make real changes in their communities.`,
    qs: [
      [["structure", "compare"], "How does the author organize the passage?", "By telling two examples and then comparing them", ["By listing steps to build a swing", "By telling events in one day", "By arguing against gardens"], "Two stories come first; the last paragraph tells how they are alike."],
      [["central"], "What is the central idea?", "Young people can make real changes in their communities.", ["Swings are expensive.", "Gardens need raised beds.", "Lemonade stands earn money."], "The last sentence states this idea."],
      [["compare", "relationships"], "How are Mia and Jayden alike?", "Both noticed a local problem and kept working to fix it.", ["Both built swings.", "Both are nine years old.", "Both live in the same town."], "The last paragraph lists how they are alike."],
      [["purpose"], "Why did the author most likely write this passage?", "To inspire readers by showing what kids have done", ["To sell vegetables", "To explain how swings work", "To tell a made-up adventure"], "The passage shows real changes kids made."],
      [["vocab"], "What does \"accessible\" mean in \"an accessible swing\"?", "Able to be used by people with disabilities", ["Very fast", "Painted bright colors", "Only for adults"], "Mia wanted a swing her cousin who uses a wheelchair could ride."],
      [["evidence"], "Which detail best shows that Jayden's club made a big difference?", "It gives away hundreds of pounds of produce every summer.", ["He started a garden club at school.", "He was eleven years old.", "The beds are raised."], "Hundreds of pounds shows a large impact."],
    ],
  },
  {
    grade: 5, kind: "persuade", title: "Should Schools Start Later?",
    text: `Text 1: Yes, Start Later
Doctors say most kids need nine to twelve hours of sleep. Many students who wake at 6:00 a.m. don't get enough. One study found that when a district started school an hour later, students were more alert and grades improved. A later start would help kids learn.

Text 2: Keep the Bell Where It Is
A later start would push the end of school later too. That could mean sports practices ending after dark and less time for homework, jobs or family. Buses might also need new schedules, which can cost money. Instead of changing the clock, families can help kids go to bed earlier.`,
    qs: [
      [["compare", "several"], "On what topic do the two texts disagree?", "Whether schools should start later in the morning", ["Whether kids need sleep", "Whether buses are yellow", "Whether sports are fun"], "Text 1 says yes, start later; Text 2 says keep it the same."],
      [["reasons", "evidence"], "Which evidence does Text 1 use?", "A study where a later start improved grades", ["A bus schedule", "A story about a team", "Advice to go to bed earlier"], "Text 1 mentions a study about alertness and grades."],
      [["reasons"], "What reason does Text 2 give against a later start?", "Activities like sports would end later.", ["Kids sleep too much.", "Doctors disagree about sleep.", "Grades would go up."], "Text 2 says practices might end after dark."],
      [["purpose", "persuade"], "What do both authors want readers to do?", "Agree with their opinion about school start times", ["Learn to drive a bus", "Join a sports team", "Read a science book"], "Both are persuasive texts with opposite claims."],
      [["infer", "conclusions"], "What solution does Text 2 offer instead?", "Families can help kids go to bed earlier.", ["Cancel sports.", "Start school at noon.", "Buy more buses."], "The last sentence of Text 2 gives this solution."],
    ],
  },
  {
    grade: 5, kind: "poem", title: "The Old Bridge",
    text: `The old stone bridge has seen it all—
The wagons creak, the horses call,
The Model T that coughed and shook,
The girl who leaned to read her book.

It held the weight of marching feet,
Of summer storms and winter sleet.
Its back is bent, its stones are gray,
But still it carries us today.

So when you cross, don't rush on through—
Just think of all it's carried, too.`,
    qs: [
      [["figurative", "poem"], "\"Its back is bent\" is an example of what?", "personification", ["simile", "hyperbole", "onomatopoeia"], "The bridge is given a human body part."],
      [["theme", "poem"], "What is the theme of the poem?", "Old things carry the history of everyone who came before.", ["Bridges are dangerous.", "Cars are better than horses.", "Winter is the worst season."], "The bridge has 'seen it all' and still carries people."],
      [["structure", "poem"], "What is the rhyme pattern in the first stanza?", "Pairs of lines rhyme (all/call, shook/book).", ["No lines rhyme.", "Every line rhymes with 'bridge.'", "Only the last line rhymes."], "Lines 1 and 2 rhyme, then lines 3 and 4."],
      [["infer"], "What do the wagons, the Model T and the marching feet show?", "Many different times in history", ["Things that broke the bridge", "A single busy day", "Things in the river"], "Each one comes from a different time."],
      [["purpose", "poem"], "What does the speaker want readers to do in the last two lines?", "Slow down and think about the bridge's history", ["Run across quickly", "Build a new bridge", "Read a book on the bridge"], "The speaker says don't rush and think of all it's carried."],
    ],
  },
];
