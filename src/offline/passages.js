// Original reading passages for Grades 2 and 3, with STAAR-style questions.
// Each question is [skills, question, answer, wrong choices, why]. Skills say which TEKS topics it practices:
// elements, character, plot, infer, theme, setting, summary, vocab, central, features, cause, purpose,
// structure, fable, fairy, poem, drama, persuade.

export const PASSAGES = [
  {
    grade: 2, kind: "fiction", title: "The Lost Kite",
    text: `Rosa had a bright red kite with a long yellow tail. On Saturday, she ran across the park and let the string out. The kite climbed higher and higher.

Then a strong gust of wind tugged the string right out of her hands! The kite sailed over the pond and got stuck in a tall oak tree.

Rosa's eyes filled with tears. Her little brother Teo patted her arm. "Don't worry. Let's ask Mr. Green," he said. Mr. Green worked at the park. He brought a long pole with a hook on the end. Carefully, he lifted the kite out of the branches.

"Thank you!" Rosa cried. That afternoon she held the string with both hands, and she tied it to her wrist, just in case.`,
    qs: [
      [["elements", "setting"], "Where does most of the story take place?", "At a park", ["At school", "At the beach", "In Rosa's house"], "The story says Rosa ran across the park, and the kite flew over the pond in the park."],
      [["plot", "elements"], "What is Rosa's problem?", "Her kite gets stuck in a tree.", ["She can't find the park.", "Her brother takes her kite.", "It starts to rain."], "The wind pulled the kite away, and it got stuck in a tall oak tree."],
      [["plot"], "How is the problem solved?", "Mr. Green uses a long pole to get the kite down.", ["Rosa climbs the tree.", "Teo buys a new kite.", "The wind blows the kite down."], "Mr. Green brought a pole with a hook and lifted the kite out."],
      [["character", "infer"], "Which word best describes Teo?", "helpful", ["mean", "sleepy", "bossy"], "Teo patted Rosa's arm and thought of asking Mr. Green for help."],
      [["infer"], "Why does Rosa tie the string to her wrist at the end?", "So the kite won't blow away again", ["Because her wrist hurts", "To show Teo a trick", "Because Mr. Green told her to"], "She ties it 'just in case,' so the wind can't pull it away again."],
      [["vocab"], "In the story, what does the word gust mean?", "a sudden strong wind", ["a kind of tree", "a long string", "a loud noise"], "A gust of wind 'tugged the string right out of her hands,' so it is a sudden strong wind."],
      [["theme"], "What lesson can readers learn from this story?", "When you have a problem, it helps to ask for help.", ["Kites are not fun.", "Never go to the park.", "Brothers are always annoying."], "Rosa and Teo solved the problem by asking Mr. Green."],
      [["summary"], "Which is the best summary of the story?", "Rosa's kite gets stuck in a tree, and Mr. Green helps get it down.", ["Rosa has a red kite.", "Teo pats Rosa's arm.", "Mr. Green works at the park."], "A summary tells the most important events: the problem and how it was solved."],
    ],
  },
  {
    grade: 2, kind: "fiction", title: "Max Makes a Plan",
    text: `Max wanted to win the class reading race. The student who read the most pages in a month would get to pick the next class read-aloud book.

At first, Max read a little bit whenever he remembered. After one week, he had only read 30 pages. His friend Lily had read 90!

Max made a plan. He put a sticky note on the fridge that said "Read 20 minutes after dinner." Every night, he read in his beanbag chair. On the weekends, he read to his grandpa on the porch.

At the end of the month, Max had read 410 pages. He didn't read the most pages in the class, but he finished three whole chapter books. "I'm going to keep reading every night," he told his teacher. "I like my plan."`,
    qs: [
      [["character", "elements"], "Who is the main character?", "Max", ["Lily", "Grandpa", "The teacher"], "The story is mostly about Max and what he does."],
      [["plot"], "What does Max do after he sees he has only read 30 pages?", "He makes a plan to read every night.", ["He quits the race.", "He asks Lily to read for him.", "He hides his books."], "The story says, 'Max made a plan,' and he read 20 minutes after dinner."],
      [["character"], "Which word best describes Max at the end of the story?", "proud", ["angry", "bored", "scared"], "He finished three books and says he likes his plan."],
      [["infer"], "How do you know Max learned to love reading?", "He says he will keep reading every night.", ["He won the race.", "He put a note on the fridge.", "Lily read 90 pages."], "Even though he didn't win, he wants to keep reading."],
      [["theme"], "What is the theme of the story?", "Making a plan and sticking to it helps you reach a goal.", ["Winning is the only thing that matters.", "Reading is boring.", "Friends should not race."], "Max's plan helped him read much more."],
      [["setting"], "Where does Max read on the weekends?", "On the porch with his grandpa", ["At the library", "On the bus", "At the park"], "The story says he read to his grandpa on the porch."],
      [["summary", "plot"], "Which event happens first?", "Max reads only a little bit when he remembers.", ["Max puts a sticky note on the fridge.", "Max reads to his grandpa.", "Max talks to his teacher."], "At first, Max read 'whenever he remembered.'"],
    ],
  },
  {
    grade: 2, kind: "fiction", title: "Nina's Garden",
    text: `In March, Nina and her dad planted tomato seeds in small cups by the kitchen window. Nina watered them every morning before school.

Soon tiny green sprouts poked up. By April, the plants were too big for the cups. Nina and Dad moved them to the garden in the backyard.

One morning, Nina found three plants knocked over. Little tracks led to the fence. "A rabbit!" said Dad. Nina felt her face get hot. She had worked so hard!

That weekend, they built a short fence of wire around the garden. Nina also planted a row of clover near the back fence, just for the rabbit.

In July, Nina picked her first red tomato. She shared it with Dad, and she spotted the rabbit munching clover by the fence.`,
    qs: [
      [["plot", "elements"], "What problem happens in the garden?", "A rabbit knocks over some plants.", ["The seeds will not grow.", "Nina forgets to water.", "It snows in April."], "Nina found plants knocked over and rabbit tracks."],
      [["plot"], "How do Nina and Dad solve the problem?", "They build a wire fence and plant clover for the rabbit.", ["They catch the rabbit in a box.", "They move to a new house.", "They stop gardening."], "They built a short fence and planted clover just for the rabbit."],
      [["character", "infer"], "What does 'Nina felt her face get hot' show?", "Nina was upset.", ["Nina was sleepy.", "Nina had a fever.", "Nina was hungry."], "Her face got hot because she was upset that her hard work was ruined."],
      [["character"], "Which word best describes Nina?", "kind", ["lazy", "rude", "careless"], "She planted clover just for the rabbit, which is kind."],
      [["structure", "summary"], "In what order do the events happen?", "plant seeds, move plants outside, rabbit problem, pick a tomato", ["pick a tomato, plant seeds, rabbit problem, move plants", "rabbit problem, plant seeds, pick a tomato, move plants", "move plants, pick a tomato, plant seeds, rabbit problem"], "The story goes in time order from March to July."],
      [["theme"], "What lesson does the story teach?", "Problems can be solved in a way that is fair to everyone.", ["Rabbits are bad.", "Gardens are too much work.", "Never share food."], "Nina protected her garden and still gave the rabbit food."],
      [["setting"], "When does Nina pick her first tomato?", "In July", ["In March", "In April", "In winter"], "The story says, 'In July, Nina picked her first red tomato.'"],
    ],
  },
  {
    grade: 2, kind: "fiction", title: "The New Kid",
    text: `Omar's family moved to Texas in the middle of the school year. On his first day, he stood at the edge of the playground and held the straps of his backpack.

A girl with a soccer ball ran over. "I'm Zoe. Do you want to play?" she asked.

Omar shook his head. "I don't know anyone," he said quietly.

"You know me now," said Zoe with a grin. She rolled the ball to him. Omar stopped it with his foot and kicked it back. Then he kicked it again, harder. It zoomed past three kids!

"Wow! You're on our team!" Zoe shouted. By the end of recess, Omar was laughing with five new friends.`,
    qs: [
      [["character", "infer"], "How does Omar feel at the beginning of the story?", "nervous", ["excited", "angry", "silly"], "He stands at the edge of the playground holding his backpack straps and says he doesn't know anyone."],
      [["character"], "How does Omar feel at the end?", "happy", ["lonely", "scared", "tired"], "He is laughing with five new friends."],
      [["character"], "Why does Omar change?", "Zoe invites him to play and he finds friends.", ["His mom picks him up early.", "It starts to rain.", "He gets a new backpack."], "Zoe is friendly, and playing soccer helps Omar make friends."],
      [["theme"], "What is the theme of the story?", "A small act of kindness can make a big difference.", ["Soccer is the best sport.", "Moving is always fun.", "Never talk to new people."], "Zoe's kind invitation changed Omar's whole day."],
      [["setting"], "Where does the story happen?", "On a school playground", ["In a classroom", "At Omar's old house", "At a soccer stadium"], "Omar stands at the edge of the playground at recess."],
      [["vocab"], "What does the word zoomed mean in the story?", "moved very fast", ["moved very slowly", "stopped", "bounced up high"], "The ball 'zoomed past three kids' after a hard kick."],
    ],
  },
  {
    grade: 3, kind: "fiction", title: "The Science Fair Volcano",
    text: `For weeks, Priya planned her science fair project: a volcano made of clay that would erupt with baking soda and vinegar. She painted it brown and green, and she added tiny plastic trees.

The night before the fair, she tested it one last time. Nothing happened. The vinegar just sat in the crater like a puddle. Priya's stomach sank.

She checked her notebook. Then she noticed the problem: the baking soda box was empty, and she had used flour by mistake! Both were white powders in the pantry.

"Mom, can we go to the store?" she asked. They bought a new box just before closing time.

At the fair, Priya's volcano bubbled over with fizzy orange foam. When the judges asked how it worked, she explained the chemical reaction, and she also told them about her flour mistake. "Checking your materials is part of being a scientist," she said. Priya won second place, and a judge wrote, "Great problem solving!" on her ribbon.`,
    qs: [
      [["plot"], "What is the climax, or turning point, of the story?", "Priya discovers she used flour instead of baking soda.", ["Priya paints her volcano.", "Priya wins second place.", "Priya buys plastic trees."], "The turning point is when she finds the cause of the problem."],
      [["plot", "summary"], "What happens in the resolution?", "Priya's volcano works at the fair and she wins a ribbon.", ["Priya's volcano does not erupt.", "Priya forgets her notebook.", "Priya decides to quit science."], "The resolution is how things end after the problem is solved."],
      [["character"], "Which trait does Priya show when she checks her notebook?", "careful", ["careless", "impatient", "shy"], "Instead of giving up, she carefully looks for what went wrong."],
      [["infer"], "Why does Priya tell the judges about her mistake?", "She thinks finding mistakes is part of science.", ["She wants the judges to feel sorry for her.", "The judges made her tell them.", "She wants to blame her mom."], "She says, 'Checking your materials is part of being a scientist.'"],
      [["theme"], "Which sentence best states the theme?", "Mistakes can help you learn if you look for the cause.", ["Science fairs are too hard.", "Always use flour in a volcano.", "Winning first place is all that matters."], "Priya learned from her mistake and solved it."],
      [["vocab"], "In the story, what does crater mean?", "the hole at the top of a volcano", ["a kind of powder", "a science judge", "a store"], "The vinegar 'sat in the crater like a puddle,' at the top of the volcano."],
      [["infer"], "What can the reader infer about why the flour did not work?", "Flour does not react with vinegar the way baking soda does.", ["The vinegar was too cold.", "The volcano was the wrong color.", "The trees blocked the foam."], "When she used baking soda, the volcano bubbled, so flour must not make the reaction."],
    ],
  },
  {
    grade: 3, kind: "fiction", title: "Storm at Grandma's",
    text: `Eli spent every summer at Grandma's farmhouse outside of Waco. The house had creaky stairs, a porch swing, and a big pecan tree that shaded the yard.

One July evening, the sky turned the color of a bruise. Grandma looked up from her tomatoes. "Storm's coming. Help me bring in the chairs," she said.

Thunder boomed, and the lights flickered off. Eli froze in the dark kitchen. His heart thumped.

Grandma struck a match and lit an old lantern. "When I was your age, we had no electric lights at all," she said. She pulled out a deck of cards and taught Eli a game called Go Fish. Rain drummed on the tin roof while they played by the warm yellow light.

When the power came back on, Eli was almost disappointed. "Can we play by the lantern again tomorrow?" he asked. Grandma laughed. "Even without a storm," she promised.`,
    qs: [
      [["setting"], "How does the setting affect the plot?", "A storm knocks out the power, so Eli and Grandma play cards by lantern light.", ["The pecan tree falls on the house.", "The farm is too far from town for Eli to visit.", "The creaky stairs keep Eli awake."], "The storm at the farmhouse causes the power to go out, which leads to the card game."],
      [["vocab", "infer"], "The sky 'turned the color of a bruise.' What does this tell the reader?", "The sky became dark purple and gray.", ["The sky was hurt.", "The sky was bright blue.", "The sky was full of birds."], "A bruise is dark purple, so the sky got dark before the storm."],
      [["character"], "How do Eli's feelings change?", "He goes from scared to happy.", ["He goes from happy to angry.", "He is bored the whole time.", "He goes from calm to scared."], "He froze with his heart thumping, but later he wants to play by the lantern again."],
      [["character"], "Which word best describes Grandma?", "calm", ["frightened", "grumpy", "careless"], "She stays steady during the storm, lights a lantern and teaches a game."],
      [["theme"], "What is a theme of this story?", "Time with family can turn a scary moment into a good memory.", ["Storms are always dangerous.", "Card games are boring.", "Farms need more electric lights."], "Playing cards with Grandma made the storm a happy memory."],
      [["setting"], "Where does the story take place?", "At Grandma's farmhouse", ["At Eli's school", "In a big city", "At a campground"], "The story says Eli spent every summer at Grandma's farmhouse."],
      [["summary"], "Which is the best summary?", "During a summer storm, the power goes out and Grandma helps Eli feel safe by playing cards with him.", ["Eli visits Grandma.", "Grandma grows tomatoes and has a porch swing.", "Thunder is loud, and rain drums on the roof."], "A good summary includes the main problem and how it turns out."],
    ],
  },
  {
    grade: 3, kind: "fiction", title: "The Broken Trophy",
    text: `Jay's older sister, Kayla, had a shiny trophy from the city swim meet. She kept it on the top shelf of their room. Jay was not supposed to touch it.

One afternoon, Jay wanted to see how heavy it was. He stood on a chair and lifted it down. It was heavier than he expected. Thunk! It slipped and the little swimmer on top snapped off.

Jay's stomach twisted. He could hide it behind the books. Kayla might not notice for days.

Instead, Jay carried both pieces to the kitchen where Kayla was doing homework. "I broke your trophy," he said. "I'm really sorry. I'll give you my allowance to fix it."

Kayla was quiet for a long moment. Then she sighed. "I'm glad you told me the truth," she said. They glued the swimmer back on together, and Kayla showed Jay her best freestyle kick in the living room.`,
    qs: [
      [["character", "infer"], "What is Jay's motivation for telling Kayla the truth?", "He feels sorry and knows hiding it would be wrong.", ["He wants to get in trouble.", "He wants Kayla's trophy for himself.", "Their mom told him to."], "His stomach twisted, and he chose to apologize instead of hiding it."],
      [["plot"], "What is the conflict in the story?", "Jay breaks his sister's trophy and must decide whether to tell her.", ["Kayla loses a swim meet.", "Jay cannot reach the shelf.", "The glue will not work."], "The main problem is the broken trophy and Jay's choice."],
      [["theme"], "What is the theme of the story?", "Telling the truth is the right choice, even when it is hard.", ["Trophies are not important.", "Never stand on chairs.", "Older sisters are always angry."], "Jay was honest, and Kayla was glad he told the truth."],
      [["character"], "How does Kayla respond to Jay's apology?", "She is glad he told the truth and helps fix it.", ["She yells and walks away.", "She throws the trophy out.", "She tells their parents right away."], "She says, 'I'm glad you told me the truth,' and they glue it together."],
      [["plot"], "What is the rising action?", "Jay lifts the trophy, it breaks, and he thinks about hiding it.", ["Kayla shows Jay her kick.", "Kayla wins the swim meet.", "They glue the swimmer back on."], "Rising action is the events that build up the problem."],
      [["vocab"], "What does 'Jay's stomach twisted' mean?", "Jay felt worried and guilty.", ["Jay was hungry.", "Jay was dizzy from the chair.", "Jay had eaten too much."], "It shows the feeling he had after breaking the trophy."],
    ],
  },
  {
    grade: 3, kind: "fiction", title: "Ava and the Robot Club",
    text: `Ava loved building things, but she had never written computer code. When the Robot Club met on Tuesday, everyone else seemed to know what to do.

Their first task was to make a small robot drive in a square. Ava's robot spun in circles. Then it drove straight into the wall. A few kids giggled.

Ava wanted to hide under the table. Instead, she asked Mr. Patel, the club leader, for help. He showed her how each block of code gave the robot one instruction. "Robots only do exactly what you tell them," he said.

Ava read her code slowly, one block at a time. She found it: she had told the robot to turn for two seconds instead of one. She changed the number and pressed start.

The robot drove forward, turned, drove, turned, drove, turned, drove, turned, and stopped right where it began. A perfect square! This time, the kids cheered.`,
    qs: [
      [["plot"], "What is the climax of the story?", "Ava finds the mistake in her code and fixes it.", ["Ava joins the Robot Club.", "The kids giggle.", "Mr. Patel says hello."], "Finding and fixing the mistake is the turning point."],
      [["character"], "What does Ava do that shows she is determined?", "She asks for help and checks her code slowly.", ["She hides under the table.", "She quits the club.", "She laughs at the other kids."], "Even though she wanted to hide, she kept working on the problem."],
      [["infer"], "Why did the robot spin in circles at first?", "The code told it to turn for too long.", ["The robot was broken.", "The table was in the way.", "Mr. Patel turned it off."], "Ava had told the robot to turn for two seconds instead of one."],
      [["theme"], "What is the theme of the story?", "When you keep trying and ask for help, you can learn something new.", ["Robots are dangerous.", "Only some kids can code.", "Giggling is mean."], "Ava learned to code by asking for help and trying again."],
      [["character"], "How do the other kids' reactions change?", "They giggle at first and cheer at the end.", ["They cheer at first and giggle at the end.", "They leave the room.", "They never notice Ava."], "First a few kids giggled; at the end, they cheered."],
      [["summary"], "Which is the best summary of the story?", "Ava's robot does not work at first, but she gets help, fixes her code and makes a perfect square.", ["Ava goes to Robot Club on Tuesday.", "Mr. Patel says robots do what you tell them.", "The robot drives into a wall and the kids giggle."], "The best summary covers the problem, what she did and how it ended."],
    ],
  },
  {
    grade: 2, kind: "fable", title: "The Ant and the Dove",
    text: `An ant went to a river to get a drink. A wave washed over the ant, and it was swept into the water. "Help!" the ant cried.

A dove sitting in a tree saw the ant. She quickly picked a leaf and dropped it into the water. The ant climbed onto the leaf and floated safely to the shore.

A few days later, a hunter crept toward the dove's tree with a net. The ant saw him. It crawled up the hunter's boot and bit his ankle! "Ouch!" the hunter yelled. The dove heard him and flew away to safety.

Moral: One good turn deserves another.`,
    qs: [
      [["fable", "theme"], "What is the moral of the fable?", "If someone helps you, you should help them too.", ["Rivers are dangerous for doves.", "Hunters always win.", "Ants are faster than birds."], "The dove helped the ant, and later the ant helped the dove. 'One good turn deserves another.'"],
      [["fable"], "What makes this story a fable?", "It is short, has animal characters and teaches a lesson.", ["It is a true story about a scientist.", "It gives facts about rivers.", "It is a poem with rhyming lines."], "Fables are short stories, often with animals, that end with a moral."],
      [["plot"], "How does the dove help the ant?", "She drops a leaf into the water.", ["She carries the ant in her beak.", "She calls the hunter.", "She builds a bridge."], "The ant climbs on the leaf and floats to shore."],
      [["plot", "cause"], "What happens because the ant bites the hunter?", "The hunter yells, and the dove flies away.", ["The dove falls into the river.", "The ant gets caught in the net.", "The hunter catches the dove."], "The 'Ouch!' warns the dove, so she escapes."],
      [["character"], "Which word describes both the ant and the dove?", "helpful", ["selfish", "lazy", "mean"], "Each one helps the other."],
    ],
  },
  {
    grade: 2, kind: "fable", title: "The Tortoise and the Hare",
    text: `Hare liked to brag. "I'm the fastest animal in the forest!" he said. "Nobody can beat me."

Tortoise said slowly, "I will race you."

All the animals laughed. The race began, and Hare zoomed ahead. Soon he could not even see Tortoise. "I have lots of time," Hare said with a yawn. He lay down under a shady tree and fell asleep.

Tortoise kept walking, one slow step after another. He did not stop. He walked past the sleeping Hare and kept going.

Hare woke up and raced to the finish line, but it was too late. Tortoise had already won!

Moral: Slow and steady wins the race.`,
    qs: [
      [["fable", "theme"], "What is the moral of this fable?", "Slow and steady wins the race.", ["Fast animals always win.", "It is good to brag.", "Naps are the best."], "Tortoise kept going and won, while Hare stopped."],
      [["character"], "Which word best describes Hare?", "boastful", ["shy", "patient", "humble"], "Hare brags, 'I'm the fastest animal in the forest!'"],
      [["character"], "Which word best describes Tortoise?", "steady", ["lazy", "boastful", "silly"], "He keeps walking one step after another without stopping."],
      [["plot", "cause"], "Why does Hare lose the race?", "He takes a nap because he thinks he has lots of time.", ["He gets lost in the forest.", "He hurts his foot.", "The animals trick him."], "He fell asleep under a tree, and Tortoise passed him."],
      [["fable"], "How is this fable like 'The Ant and the Dove'?", "Both have animal characters and teach a lesson.", ["Both are about birds.", "Both happen in a city.", "Both have no lesson."], "Fables use animals to teach a moral."],
    ],
  },
  {
    grade: 3, kind: "fable", title: "The Fox and the Crow",
    text: `A crow found a piece of cheese and flew to a high branch to eat it. A hungry fox trotted by and saw the cheese.

"Good morning, beautiful Crow," said the fox in a sweet voice. "Your feathers shine like black glass. I'm sure your voice is just as lovely. Won't you sing one song for me?"

The crow felt proud. She lifted her head, opened her beak and cawed. The cheese fell straight down, and the fox snapped it up.

"Thank you," said the fox, licking his lips. "Here is some advice in return for the cheese: never trust someone who flatters you."

Moral: Be careful of people who say nice things only to get something from you.`,
    qs: [
      [["fable", "theme"], "What lesson does the crow learn?", "Don't trust someone who flatters you to get something.", ["Always share your cheese.", "Foxes are good singers.", "Birds should eat on the ground."], "The fox praised the crow only to trick her into dropping the cheese."],
      [["character", "infer"], "Why does the fox praise the crow?", "He wants her to drop the cheese.", ["He wants to be her friend.", "He loves her singing.", "He wants to teach her a song."], "When she opened her beak, the cheese fell and the fox took it."],
      [["vocab"], "In the fable, what does flatters mean?", "says very nice things that may not be true", ["tells the truth", "yells at", "sings to"], "The fox calls the crow beautiful and says her voice is lovely to trick her."],
      [["character"], "Which word best describes the fox?", "sly", ["honest", "shy", "foolish"], "The fox uses a trick to get the cheese."],
      [["fable"], "Which detail shows this is a fable?", "It ends with a moral.", ["It has a table of contents.", "It gives facts about real crows.", "It is written in stanzas."], "Fables end with a lesson called a moral."],
    ],
  },
  {
    grade: 3, kind: "myth", title: "Why the Sun and Moon Share the Sky",
    text: `Long ago, people say, the Sun and the Moon were sisters who both wanted to light the sky. The Sun was bright and warm. The Moon was cool and silver.

Every day they argued. "The sky is mine!" said the Sun. "No, it is mine!" said the Moon. When they both shone at once, the animals could not sleep, and the plants grew tired.

At last, Grandmother Earth called them together. "The world needs both of you," she said. "The Sun will warm the day so plants can grow. The Moon will glow at night so animals can rest and travelers can find their way."

The sisters agreed. That is why, to this day, the Sun rules the day and the Moon rules the night, and sometimes, in the early morning, you can see them both, waving goodbye.`,
    qs: [
      [["fable"], "What does this myth try to explain?", "Why the Sun shines in the day and the Moon at night", ["Why animals sleep in caves", "How plants make food", "Why the ocean is salty"], "Myths often explain how something in nature came to be."],
      [["plot"], "What is the problem in the myth?", "The Sun and Moon argue about who should light the sky.", ["The Moon gets lost.", "The animals eat the plants.", "Grandmother Earth is sick."], "Both sisters want the whole sky."],
      [["plot"], "How is the problem solved?", "Grandmother Earth gives each sister her own time to shine.", ["The Sun wins a race.", "The Moon moves away.", "The animals vote."], "The Sun gets the day and the Moon gets the night."],
      [["theme"], "What is a theme of the myth?", "Sharing and taking turns helps everyone.", ["Being the brightest is most important.", "Sisters never get along.", "Night is scary."], "Once the sisters shared, the plants and animals were happy."],
      [["infer"], "What does 'waving goodbye' at the end describe?", "Seeing the Sun and Moon in the sky at the same time in the morning", ["The sisters fighting again", "Animals waking up", "Travelers getting lost"], "In the early morning, both can be seen as one rises and one sets."],
    ],
  },
  {
    grade: 2, kind: "fairy", title: "The Gingerbread Boy (Two Tellings)",
    text: `Telling 1: An old woman baked a gingerbread boy. When she opened the oven, he jumped out and ran away! "Run, run, as fast as you can! You can't catch me, I'm the Gingerbread Boy!" He ran past a cow and a horse. At the river, a fox offered to carry him across. The fox tricked him and ate him up.

Telling 2: In a Texas town, a baker made a gingerbread cowboy. He hopped off the tray and ran into the desert. "Run, run, fast as you can! You can't catch me, I'm the Gingerbread Man!" He ran past a rattlesnake and a jackrabbit. At the river, a sly coyote offered to help. The coyote tricked him and gobbled him up.`,
    qs: [
      [["fairy", "compare"], "How are the two tellings alike?", "In both, a gingerbread character runs away and is tricked at a river.", ["In both, the gingerbread boy wins.", "Both happen in a desert.", "In both, a cow eats the gingerbread boy."], "Both stories end with a sly animal tricking the runner at a river."],
      [["fairy", "compare"], "How are the two tellings different?", "The second one has a Texas setting and a coyote instead of a fox.", ["Only the first one has a river.", "The second one has no trick.", "The first one is about a cookie robot."], "Telling 2 changes the setting to Texas and the animals to desert animals."],
      [["setting"], "What is the setting of Telling 2?", "A Texas town and the desert", ["A big city", "The ocean", "A castle"], "The baker lives in a Texas town, and the cowboy runs into the desert."],
      [["fairy", "character"], "Which character is the trickster in Telling 1?", "the fox", ["the cow", "the old woman", "the horse"], "The fox tricks the Gingerbread Boy at the river."],
      [["theme"], "What lesson do both tellings teach?", "Be careful who you trust.", ["Always run from cows.", "Bake cookies every day.", "Rivers are fun to swim in."], "Both runners trusted a sly animal and got eaten."],
    ],
  },
  {
    grade: 2, kind: "fairy", title: "The Little Red Hen (Two Tellings)",
    text: `Telling 1: On a farm, the Little Red Hen found some wheat seeds. "Who will help me plant them?" she asked. "Not I," said the Cat, the Dog and the Duck. So she planted them herself. She cut the wheat, took it to the mill and baked bread, all by herself. When the bread smelled delicious, everyone wanted some. "No," said the Hen. "You did not help, so my chicks and I will eat it."

Telling 2: In a busy city, Little Red Hen ran a food truck. She wanted to make tortillas. "Who will help me grind the corn?" she asked. "Not I," said Raccoon, Pigeon and Squirrel. She ground the corn, mixed the dough and cooked the tortillas herself. When the smell drifted down the street, everyone lined up. "This time I'll share," said the Hen, "but tomorrow, you all help me cook." And they did!`,
    qs: [
      [["fairy", "compare"], "How are the two tellings alike?", "In both, the Hen asks for help and does all the work herself.", ["In both, the animals help right away.", "Both happen on a farm.", "In both, the Hen makes tortillas."], "Both tellings start with the Hen asking for help and getting 'Not I.'"],
      [["fairy", "compare"], "How is the ending of Telling 2 different?", "The Hen shares but asks the animals to help next time.", ["The Hen eats everything alone.", "The animals eat the Hen's chicks.", "The food truck breaks down."], "In Telling 1 she doesn't share; in Telling 2 she shares and they help tomorrow."],
      [["setting"], "What is the setting of Telling 2?", "A busy city", ["A farm", "A forest", "A castle"], "Telling 2 says, 'In a busy city, Little Red Hen ran a food truck.'"],
      [["character"], "Which word best describes the Hen in both tellings?", "hardworking", ["lazy", "mean", "silly"], "She does every step of the work herself."],
      [["theme"], "What lesson does Telling 1 teach?", "If you want to share the reward, you should share the work.", ["Bread is hard to make.", "Cats don't like wheat.", "Always eat alone."], "The animals didn't help, so they didn't get bread."],
    ],
  },
  {
    grade: 2, kind: "poem", title: "Rain Song",
    text: `Pitter, patter, on the pane,
Here comes the gentle springtime rain.
It taps the roof, it fills the pail,
It makes a puddle for the snail.

Splish and splash, I stomp around,
With rubber boots upon the ground.
The flowers drink, the grass grows green,
The cleanest world I've ever seen!`,
    qs: [
      [["poem"], "Which words from the poem rhyme?", "pane and rain", ["roof and pail", "boots and ground", "flowers and green"], "Pane and rain end with the same sound."],
      [["poem"], "Which words are an example of sounds the rain makes?", "Pitter, patter", ["springtime rain", "rubber boots", "grass grows green"], "'Pitter, patter' imitates the sound of rain."],
      [["poem"], "How many stanzas does the poem have?", "2", ["1", "4", "8"], "There are two groups of lines with a space between them."],
      [["poem", "infer"], "How does the speaker feel about the rain?", "happy", ["scared", "angry", "bored"], "The speaker stomps in puddles and calls it 'the cleanest world I've ever seen!'"],
      [["poem"], "Which line has alliteration (words that start with the same sound)?", "The flowers drink, the grass grows green", ["Here comes the gentle springtime rain", "It taps the roof, it fills the pail", "With rubber boots upon the ground"], "'grass grows green' repeats the g sound."],
    ],
  },
  {
    grade: 2, kind: "poem", title: "My Shadow Friend",
    text: `I have a friend who follows me
Wherever I may go.
When I am tall, my friend is tall,
When I am low, it's low.

It hops when I hop down the street,
It jumps when I jump high,
But when the sun goes down at night,
My friend won't say goodbye!`,
    qs: [
      [["poem", "infer"], "Who is the friend in the poem?", "The speaker's shadow", ["A puppy", "A little brother", "The sun"], "The friend copies every move and disappears when the sun goes down, so it is a shadow."],
      [["poem"], "Which words rhyme in the first stanza?", "go and low", ["me and tall", "follows and may", "tall and go"], "Go and low end with the same sound."],
      [["poem"], "Which lines show repetition?", "It hops when I hop… It jumps when I jump…", ["I have a friend who follows me", "Wherever I may go", "My friend won't say goodbye!"], "The pattern 'It ___ when I ___' repeats."],
      [["poem", "infer"], "Why won't the friend say goodbye at night?", "A shadow disappears when there is no sunlight.", ["The friend is sleeping.", "The friend is angry.", "The friend went home for dinner."], "Shadows need light, so it just disappears."],
    ],
  },
  {
    grade: 3, kind: "poem", title: "The Old Oak Tree",
    text: `Upon the hill the old oak stands,
With crooked arms and knotty hands.
For a hundred years it's watched the town,
While seasons turned from green to brown.

In spring, it wears a coat of leaves,
In summer, shade beneath its eaves.
In fall, it drops its acorns round,
In winter, sleeps without a sound.

The squirrels climb, the robins sing,
It gives a home to everything.
So when you pass, please tip your hat
To the patient oak, so old and fat!`,
    qs: [
      [["poem", "vocab"], "The poem says the tree has 'crooked arms and knotty hands.' What does this mean?", "The tree's branches are bent and bumpy.", ["The tree has real arms.", "The tree is sick.", "The tree waves at people."], "This personification describes branches as arms and hands."],
      [["poem"], "What is the rhyme pattern in each stanza?", "Every two lines rhyme.", ["No lines rhyme.", "Only the last lines rhyme.", "Every line rhymes with the title."], "stands/hands, town/brown and leaves/eaves rhyme in pairs."],
      [["poem", "structure"], "How is the second stanza organized?", "By the four seasons", ["By animals", "From biggest to smallest", "By the times of day"], "It tells what the oak does in spring, summer, fall and winter."],
      [["poem", "theme"], "What is the main message of the poem?", "The old oak is important because it gives a home to many living things.", ["Trees are boring.", "Squirrels are noisy.", "People should cut down old trees."], "'It gives a home to everything,' and the speaker says to tip your hat."],
      [["poem"], "How many stanzas are in the poem?", "3", ["2", "4", "12"], "There are three groups of four lines."],
    ],
  },
  {
    grade: 2, kind: "drama", title: "The Missing Lunch (A Play)",
    text: `CHARACTERS: SAM, LILY, MS. ROSE (the teacher)

SETTING: A classroom just before lunch.

SAM: (looking in his cubby) My lunch box is gone!
LILY: Are you sure? Did you look under your jacket?
SAM: (lifting his jacket) Not there either. (He sighs.)
MS. ROSE: Sam, did you bring your lunch box inside this morning?
SAM: (thinking) I set it down when I tied my shoe… by the flagpole!
LILY: Let's go look!
(SAM and LILY walk outside. SAM spots a blue lunch box by the flagpole.)
SAM: (grinning) There it is! Thanks, Lily.
LILY: That's what friends are for.`,
    qs: [
      [["drama"], "What is the setting of the play?", "A classroom just before lunch", ["A park on Saturday", "A school bus", "A kitchen at home"], "The play lists SETTING: A classroom just before lunch."],
      [["drama"], "What are the words in parentheses, like (looking in his cubby)?", "Stage directions that tell what a character does", ["Words the characters say", "The title of the play", "The names of the actors"], "Stage directions tell actors how to move or act."],
      [["drama"], "Which part of the play lists who is in it?", "CHARACTERS", ["SETTING", "the stage directions", "the last line"], "The CHARACTERS list names Sam, Lily and Ms. Rose."],
      [["plot"], "Where does Sam find his lunch box?", "By the flagpole", ["In his cubby", "Under his jacket", "In the cafeteria"], "He remembers setting it down by the flagpole when he tied his shoe."],
      [["character"], "Which word describes Lily?", "helpful", ["rude", "sleepy", "silly"], "Lily gives ideas and goes outside to help look."],
    ],
  },
  {
    grade: 3, kind: "drama", title: "The Talent Show (A Play)",
    text: `CHARACTERS: KAI, NORA, MR. DIAZ (music teacher)

SETTING: Backstage at the school talent show.

KAI: (pacing back and forth) I can't do it. What if I forget the words?
NORA: You practiced every day for two weeks!
KAI: But there are SO many people out there. (peeks through the curtain and gulps)
MR. DIAZ: (walking over) Kai, do you know what I do when I'm nervous?
KAI: (shaking his head) What?
MR. DIAZ: I take three slow breaths and look for one friendly face.
NORA: Look for me! I'll be in the front row.
(KAI takes three slow breaths. The music starts.)
KAI: (smiling) Okay. I'm ready.
(KAI walks onstage. The audience claps.)`,
    qs: [
      [["drama", "character"], "Which stage direction shows that Kai is nervous?", "(pacing back and forth)", ["(smiling)", "(walking over)", "(The audience claps.)"], "Pacing back and forth is something people do when they are nervous."],
      [["drama"], "Why does a play use dialogue?", "So the characters can tell the story through what they say", ["To list facts", "To give the page numbers", "To show a map"], "In a play, most of the story is told through the characters' words."],
      [["character"], "How do Kai's feelings change from the beginning to the end?", "He goes from nervous to ready.", ["He goes from excited to angry.", "He stays scared the whole time.", "He goes from happy to bored."], "At first he says 'I can't do it,' but at the end he smiles and says 'I'm ready.'"],
      [["plot"], "What helps Kai feel ready?", "Taking slow breaths and looking for Nora", ["Forgetting the words", "Leaving the show", "Changing his song"], "Mr. Diaz shares a trick, and Nora promises to sit in front."],
      [["theme"], "What is a theme of the play?", "Support from others can help you face your fears.", ["Talent shows are too loud.", "Never practice.", "Teachers are always strict."], "Nora and Mr. Diaz help Kai feel brave."],
    ],
  },
  {
    grade: 2, kind: "info", title: "Busy Honeybees",
    text: `Honeybees: Small Insects, Big Jobs

What Bees Do
Honeybees fly from flower to flower to collect a sweet liquid called nectar. As they move, yellow dust called pollen sticks to their fuzzy bodies. The pollen rubs off on the next flower. This helps plants make seeds and fruit.

Inside the Hive
A hive can hold more than 20,000 bees! The queen bee lays the eggs. Worker bees build wax rooms called cells, feed the babies and make honey from nectar.

(Photo caption: A worker bee covered in yellow pollen.)

Why Bees Matter
Many foods, like apples, strawberries and almonds, need bees to grow. Without bees, our lunch boxes would look very different!`,
    qs: [
      [["central"], "What is the central idea of the passage?", "Honeybees do important jobs that help plants and people.", ["Bees live in hives.", "Strawberries are red.", "The queen bee is big."], "Every section tells about how bees help: making honey and helping plants grow."],
      [["features"], "What does the heading 'Inside the Hive' tell the reader?", "That section is about what happens in a hive.", ["How to make honey at home", "That bees are dangerous", "Where to buy apples"], "Headings tell what a section is about."],
      [["features"], "What does the photo caption help the reader understand?", "What a bee looks like covered in pollen", ["How many bees live in a hive", "What the queen eats", "How to grow almonds"], "The caption explains the picture: a worker bee covered in pollen."],
      [["cause"], "What happens because pollen sticks to bees' bodies?", "Plants can make seeds and fruit.", ["Bees cannot fly.", "Honey turns yellow.", "The hive gets bigger."], "The pollen rubs off on the next flower, which helps plants make seeds and fruit."],
      [["central"], "Which detail supports the idea that bees help people?", "Many foods, like apples and almonds, need bees to grow.", ["A hive can hold 20,000 bees.", "Bees have fuzzy bodies.", "Worker bees build cells."], "This detail shows how bees help our food grow."],
      [["purpose"], "Why did the author write this passage?", "To inform readers about honeybees", ["To tell a funny story about a bee", "To persuade readers to buy honey", "To teach a song"], "The passage gives facts about bees."],
      [["vocab"], "What is nectar?", "a sweet liquid in flowers", ["yellow dust", "a wax room", "a baby bee"], "The passage says nectar is 'a sweet liquid' bees collect from flowers."],
    ],
  },
  {
    grade: 2, kind: "info", title: "How a Seed Grows",
    text: `How a Seed Grows

Step 1: The Seed
A seed has a tiny baby plant inside and food to help it start growing.

Step 2: Roots Come First
When a seed gets water and warmth, it begins to grow. First, a root pushes down into the soil. Roots drink water and hold the plant in place.

Step 3: The Sprout
Next, a little stem pushes up toward the sunlight. This is called a sprout.

Step 4: Leaves and Flowers
Then, leaves grow and use sunlight to make food for the plant. Finally, many plants grow flowers, and the flowers make new seeds.

Diagram: seed → root → sprout → plant with flowers`,
    qs: [
      [["cause", "structure"], "What grows first when a seed starts to grow?", "the root", ["the flower", "the leaves", "a new seed"], "Step 2 says, 'First, a root pushes down into the soil.'"],
      [["cause"], "What makes a seed begin to grow?", "Water and warmth", ["Snow and wind", "Darkness and cold", "Loud music"], "The passage says when a seed gets water and warmth, it begins to grow."],
      [["features"], "How does the diagram help the reader?", "It shows the order a plant grows in.", ["It tells how to cook seeds.", "It lists types of flowers.", "It shows where to buy seeds."], "The diagram shows seed → root → sprout → flowers."],
      [["structure"], "How is the passage organized?", "In order, step by step", ["As a problem and solution", "By comparing two plants", "As a story with characters"], "It uses Steps 1 to 4 and time-order words like first, next and finally."],
      [["central"], "What is the central idea?", "A seed grows in steps until it becomes a plant that makes new seeds.", ["Roots drink water.", "Sprouts are small.", "Flowers are pretty."], "The whole passage explains the steps of a plant's growth."],
      [["purpose"], "What is the author's purpose?", "To explain how a seed grows", ["To make the reader laugh", "To convince people to plant trees", "To tell about a gardener's life"], "The text explains a process step by step."],
    ],
  },
  {
    grade: 2, kind: "info", title: "The Texas State Flag",
    text: `The Lone Star Flag

Texas has its own state flag. People call it the Lone Star Flag because it has one white star.

Colors with Meaning
The flag has three colors. Blue stands for loyalty. White stands for purity, or being good and honest. Red stands for bravery.

Where You Will See It
You can see the flag at schools, at the state capitol in Austin and at many homes and stores. Texans say the Pledge to the Texas Flag at school.

(Picture: a flag with a blue stripe and a white star on the left side, and a white stripe above a red stripe on the right.)`,
    qs: [
      [["central"], "What is this passage mostly about?", "The Texas state flag and what it means", ["How to sew a flag", "The city of Austin", "The history of all flags"], "Every part tells about the Lone Star Flag."],
      [["features"], "Under which heading would you find what the colors mean?", "Colors with Meaning", ["The Lone Star Flag", "Where You Will See It", "Picture"], "That heading tells you the section is about the colors."],
      [["central", "vocab"], "Why is the flag called the Lone Star Flag?", "It has one white star.", ["It is only used at night.", "It has many stars.", "It is made in Austin."], "'Lone' means one, and the flag has one white star."],
      [["central"], "What does the color red stand for?", "bravery", ["loyalty", "purity", "the sky"], "The passage says, 'Red stands for bravery.'"],
      [["purpose"], "Why did the author write this passage?", "To give facts about the Texas flag", ["To tell a story about a cowboy", "To get readers to visit Austin", "To describe a dream"], "It informs readers with facts."],
    ],
  },
  {
    grade: 3, kind: "info", title: "Monarch Butterflies on the Move",
    text: `The Great Journey

Every fall, millions of monarch butterflies fly south to the mountains of Mexico. Some travel more than 2,500 miles! Many fly right through Texas on the way.

Why Do They Go?
Monarchs cannot survive cold winters. Because the weather in the north turns cold, they move to forests in Mexico where it stays cool but not freezing. There, they cluster together on fir trees to stay warm.

The Trip Home
In spring, the monarchs fly north again. They lay eggs on milkweed plants, the only plants monarch caterpillars eat. The butterflies that hatch keep flying north. It takes several generations to finish the trip!

How You Can Help
Monarch numbers have gone down because there is less milkweed. Planting milkweed in a garden gives monarchs a place to lay eggs.`,
    qs: [
      [["cause", "structure"], "Why do monarchs fly to Mexico?", "Because they cannot survive the cold winters in the north", ["Because they like mountains", "Because milkweed only grows there", "Because they are chased by birds"], "The section 'Why Do They Go?' explains the cause: cold winters."],
      [["structure"], "Which text structure does the section 'Why Do They Go?' use?", "Cause and effect", ["Compare and contrast", "Time order of a recipe", "Problem and solution"], "It tells the cause (cold weather) and the effect (moving south)."],
      [["structure", "central"], "Which section uses a problem and solution structure?", "How You Can Help", ["The Great Journey", "Why Do They Go?", "The Trip Home"], "Problem: less milkweed. Solution: plant milkweed."],
      [["central"], "What is the central idea of the passage?", "Monarch butterflies make a long journey each year, and people can help them.", ["Mexico has fir trees.", "Caterpillars are small.", "Texas is a big state."], "The passage explains the journey and ends with how to help."],
      [["features"], "How do the headings help the reader?", "They show what each part of the passage is about.", ["They tell a story.", "They give the author's name.", "They show the butterflies' colors."], "Headings divide the text into topics."],
      [["vocab"], "In the passage, what does cluster mean?", "gather close together", ["fly far away", "lay eggs", "change color"], "They 'cluster together on fir trees to stay warm.'"],
      [["purpose"], "Why does the author include the last section?", "To tell readers how they can help monarchs", ["To describe Mexico's weather", "To explain what caterpillars look like", "To entertain with a joke"], "It gives a way to solve the milkweed problem."],
    ],
  },
  {
    grade: 3, kind: "info", title: "Frogs and Toads",
    text: `Frogs and toads are both amphibians. That means they start life in water and later live on land. They are alike in many ways, but they are also different.

How They Are Alike
Both frogs and toads hatch from eggs as tadpoles. Both eat insects, and both catch them with long, sticky tongues.

How They Are Different
Frogs have smooth, wet skin. Toads have dry, bumpy skin. Frogs have long back legs for big leaps, while toads have shorter legs and take small hops. Frogs usually live near water. Toads can live in drier places, like gardens.

(Chart)
Frog: smooth wet skin | long legs | lives near water
Toad: dry bumpy skin | short legs | can live in gardens`,
    qs: [
      [["structure"], "What text structure does the author use?", "Compare and contrast", ["Time order", "Problem and solution", "A story with a plot"], "The passage tells how frogs and toads are alike and different."],
      [["central"], "Which is one way frogs and toads are alike?", "Both catch insects with sticky tongues.", ["Both have dry, bumpy skin.", "Both have long back legs.", "Both always live near water."], "The 'How They Are Alike' section says both eat insects with sticky tongues."],
      [["central"], "Which is a way they are different?", "Frogs have smooth skin, but toads have bumpy skin.", ["Both start as tadpoles.", "Both are amphibians.", "Both eat insects."], "The 'How They Are Different' section compares their skin."],
      [["features"], "How does the chart help the reader?", "It shows the differences side by side.", ["It tells a story about a frog.", "It lists where to buy a toad.", "It shows how tadpoles hatch."], "The chart lists frog and toad features next to each other."],
      [["vocab"], "What does amphibians mean in the passage?", "animals that start life in water and later live on land", ["animals that only live in trees", "insects that hop", "animals with fur"], "The passage explains the word right after it: 'That means…'"],
      [["purpose"], "Why did the author write this passage?", "To explain how frogs and toads are alike and different", ["To persuade readers to keep toads as pets", "To tell a story about a frog prince", "To teach a frog song"], "The author informs by comparing."],
    ],
  },
  {
    grade: 3, kind: "info", title: "The Day the Dust Came",
    text: `In the 1930s, a terrible drought hit the Great Plains, including the Texas Panhandle. A drought is a long time with very little rain.

Farmers had plowed up the tall grasses that held the soil in place. When the rain stopped, the soil dried into dust. Then strong winds blew the dust into giant clouds called "black blizzards."

The dust storms buried fences, filled houses and made it hard to breathe. Many families had to leave their farms.

To fix the problem, the government taught farmers new ways to farm. Farmers planted rows of trees to block the wind. They plowed in curves that held water, and they planted grass again. These ideas helped the soil stay in place, and many of them are still used today.`,
    qs: [
      [["cause", "structure"], "What caused the soil to blow away?", "The grass was plowed up, and then there was no rain.", ["Too many trees were planted.", "There was too much rain.", "Families moved away."], "Without grass roots or rain, the dry soil turned to dust that the wind could carry."],
      [["structure"], "Which text structure does the last paragraph use?", "Problem and solution", ["Compare and contrast", "Description of a person", "Sequence of a recipe"], "It tells how farmers fixed the problem."],
      [["vocab"], "What is a drought?", "a long time with very little rain", ["a big storm with snow", "a kind of farm", "a dust cloud"], "The passage defines it: 'A drought is a long time with very little rain.'"],
      [["central"], "What is the central idea of the passage?", "A drought caused huge dust storms, and new farming ideas helped fix the problem.", ["Fences can get buried.", "The Panhandle is in Texas.", "Trees block wind."], "The passage explains the cause, the effects and the solution."],
      [["cause"], "What was one effect of the dust storms?", "Many families had to leave their farms.", ["Farmers grew more wheat.", "The rivers flooded.", "It snowed in summer."], "The storms filled houses and buried fences, so many families left."],
      [["purpose"], "Why did the author write this passage?", "To inform readers about an event in history", ["To make readers laugh", "To sell farm tools", "To tell a fairy tale"], "It gives facts about the dust storms of the 1930s."],
    ],
  },
  {
    grade: 2, kind: "persuade", title: "Let's Have a Class Garden!",
    text: `Dear Principal Lee,

Our class thinks our school should have a garden. Here are our reasons.

First, a garden would help us learn. We could measure how fast plants grow and learn about bugs and soil.

Second, we could grow healthy food. Fresh carrots and lettuce taste great in a salad!

Third, a garden would make our school beautiful. Flowers would make everyone smile on the way in.

We will water the plants and pull the weeds every week. Please say yes to a class garden!

Sincerely,
Room 12`,
    qs: [
      [["persuade", "purpose"], "What does Room 12 want the principal to do?", "Agree to have a school garden", ["Buy new books", "Make recess longer", "Plant trees at home"], "They write, 'Please say yes to a class garden!'"],
      [["persuade"], "Which is one reason the class gives?", "A garden would help them learn.", ["Gardens are expensive.", "Principals like carrots.", "Weeds grow fast."], "Their first reason is that a garden would help them learn."],
      [["purpose"], "What is the author's purpose?", "To persuade", ["To entertain with a story", "To explain how to cook", "To describe a dream"], "They give reasons to convince the principal."],
      [["features"], "Which part of the letter is 'Sincerely, Room 12'?", "the closing and signature", ["the greeting", "the body", "the date"], "The closing comes at the end, followed by who wrote it."],
      [["persuade"], "How does the class show they will be responsible?", "They promise to water and weed every week.", ["They say flowers make people smile.", "They say carrots taste great.", "They sign the letter."], "Promising to care for it shows they will be responsible."],
    ],
  },
  {
    grade: 3, kind: "persuade", title: "Why Every Kid Should Learn to Swim",
    text: `Swimming is more than just fun on a hot Texas day. Every kid should learn to swim, and here's why.

First, swimming keeps you safe. Texas has many lakes, rivers and pools. Knowing how to swim and float can save your life if you fall into water.

Second, swimming is great exercise. It makes your heart and muscles strong, and it is easy on your joints.

Third, swimming opens the door to other activities, like snorkeling, surfing and water polo.

Some people say swim lessons cost too much. But many cities offer free or low-cost lessons in the summer. Check with your city's pool!

Don't wait. Grab a towel and sign up for swim lessons today.`,
    qs: [
      [["persuade"], "What is the author's claim?", "Every kid should learn to swim.", ["Swimming pools are too crowded.", "Texas is hot.", "Snorkeling is hard."], "The claim is stated in the first paragraph."],
      [["persuade"], "Which reason supports the claim?", "Knowing how to swim can save your life.", ["Some lessons cost money.", "Towels are soft.", "Rivers are long."], "This reason explains why swimming matters for safety."],
      [["persuade"], "How does the author answer people who say lessons cost too much?", "Many cities offer free or low-cost lessons.", ["Swimming is free everywhere.", "The author agrees and gives up.", "Lessons are only for adults."], "The author responds to the other side with a fact about city pools."],
      [["purpose"], "What is the author's purpose?", "To persuade readers to learn to swim", ["To tell the history of swimming", "To explain how to build a pool", "To entertain with a funny story"], "The author gives reasons and ends with 'sign up for swim lessons today.'"],
      [["structure"], "What words does the author use to organize the reasons?", "First, Second, Third", ["Once upon a time", "Before and after", "In conclusion only"], "The reasons are numbered with First, Second and Third."],
    ],
  },
  {
    grade: 3, kind: "fiction", title: "The Lemonade Stand",
    text: `Leo and his cousin Mia wanted to buy a new soccer ball that cost $24. "Let's sell lemonade," Mia suggested.

They made a sign that said "Lemonade 50¢" and set up a table on the corner. By noon, they had sold only six cups. The sun beat down, and no one walked by.

"Maybe we're in the wrong spot," Leo said. He remembered that the city park had a softball game that afternoon. They carried their table to the park entrance.

Thirsty players and fans lined up. Mia poured while Leo made change. By four o'clock, their pitcher was empty and their jar held $26.50.

"We have enough for the ball," Mia said, "and $2.50 to save for next time!"`,
    qs: [
      [["plot"], "Why do Leo and Mia move their stand?", "Not many people walked by their corner.", ["The sign blew away.", "They ran out of lemonade.", "Their parents told them to."], "By noon they had sold only six cups because no one walked by."],
      [["infer"], "Why do they sell more at the park?", "Many thirsty people were at the softball game.", ["The lemonade was cheaper there.", "They added cookies.", "It started to rain."], "The game brought lots of players and fans."],
      [["character"], "What trait does Leo show when he thinks of the park?", "clever", ["lazy", "rude", "careless"], "He solves the problem by thinking of a better spot."],
      [["summary"], "Which is the best summary?", "Leo and Mia move their lemonade stand to the park and earn enough to buy a soccer ball.", ["Leo and Mia make a sign.", "It is hot outside.", "Mia pours lemonade."], "A summary tells the main problem, solution and outcome."],
      [["theme"], "What is the theme?", "If a plan isn't working, try a new idea.", ["Lemonade is too sour.", "Soccer is better than softball.", "Never spend money."], "Moving the stand turned their day around."],
      [["infer"], "How much money did they have after buying the ball?", "$2.50", ["$24.00", "$26.50", "$0.50"], "They had $26.50 and the ball cost $24, so $2.50 was left."],
    ],
  },
  {
    grade: 2, kind: "fiction", title: "Pancake Morning",
    text: `On Sunday morning, Ella wanted to surprise her mom with breakfast. She tiptoed into the kitchen. Her big brother Ben was already there.

"Want to make pancakes?" Ben whispered. Ella nodded so fast her braids bounced.

Ben read the recipe out loud. Ella poured the flour and cracked the eggs. One egg landed on the floor with a splat! Ella giggled, and Ben handed her a paper towel.

Ben flipped the pancakes while Ella set the table and put a flower in a cup. When Mom came downstairs, she gasped. "What a wonderful surprise!" she said, and she gave them both a big hug.`,
    qs: [
      [["elements"], "Who are the characters in the story?", "Ella, Ben and Mom", ["Ella and her dad", "Ben and a dog", "Mom and a chef"], "The story is about Ella, her brother Ben and their mom."],
      [["setting"], "When does the story happen?", "On Sunday morning", ["On a school night", "At lunch on Friday", "In the middle of the night"], "The first sentence says, 'On Sunday morning.'"],
      [["infer", "character"], "Why does Ella tiptoe into the kitchen?", "She doesn't want to wake her mom and spoil the surprise.", ["The floor is wet.", "She is sneaking a cookie.", "Her feet hurt."], "She wanted to surprise her mom, so she was quiet."],
      [["plot"], "What happens after the egg lands on the floor?", "Ella giggles, and Ben hands her a paper towel.", ["Mom wakes up and gets mad.", "Ben drops the pancakes.", "They stop cooking."], "The story says Ella giggled and Ben handed her a paper towel."],
      [["character"], "How does Mom feel at the end?", "surprised and happy", ["angry", "sad", "worried"], "She gasps, says 'What a wonderful surprise!' and hugs them."],
      [["theme"], "What is the theme?", "Doing something kind for someone makes everyone happy.", ["Eggs are slippery.", "Brothers are always bossy.", "Never cook on Sunday."], "Ella and Ben's kind surprise made their mom happy."],
    ],
  },
];
