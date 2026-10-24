// Short original reading passages for Kindergarten (grade 0) and Grade 1, in the same shape as passages.js.
// Extra skills used here: sequence (first, next, last), details (facts and answers in the text),
// feelings, and picture (what the picture line adds to the words).

export const EARLY_PASSAGES = [
  {
    grade: 0, kind: "fiction", title: "Pip the Pup",
    text: `🐶 Pip is a little pup.
Pip likes to dig in the yard.
Pip digs and digs.
Pip finds a big red ball!
Pip runs to Sam. "Play with me!"`,
    qs: [
      [["character"], "Who is the story about?", "Pip the pup", ["Sam's cat", "a big bird", "a fish"], "The story tells about Pip, a little pup."],
      [["setting"], "Where does Pip dig?", "in the yard", ["at school", "in the bath", "at the store"], "The story says Pip likes to dig in the yard."],
      [["details", "plot"], "What does Pip find?", "a big red ball", ["a bone", "a hat", "a blue sock"], "Pip finds a big red ball."],
      [["sequence"], "What does Pip do last?", "runs to Sam", ["digs in the yard", "takes a nap", "eats lunch"], "At the end, Pip runs to Sam to play."],
      [["summary"], "Which tells the story best?", "Pip digs, finds a ball and wants to play.", ["Pip is a pup.", "Sam has a yard.", "The ball is red."], "Retelling means telling the main things that happen in order."],
    ],
  },
  {
    grade: 0, kind: "fiction", title: "The Rainy Day",
    text: `🌧️ It is a rainy day.
Lily puts on her boots.
She puts on her coat.
Then she jumps in a puddle. Splash!
Lily laughs. She loves the rain.`,
    qs: [
      [["setting", "picture"], "What is the weather in the story?", "rainy", ["sunny", "snowy", "windy"], "The story and the picture show rain."],
      [["sequence"], "What does Lily put on first?", "her boots", ["her coat", "her hat", "her mittens"], "First she puts on her boots, then her coat."],
      [["sequence", "plot"], "What does Lily do after she puts on her coat?", "jumps in a puddle", ["goes to bed", "eats a snack", "reads a book"], "Then she jumps in a puddle."],
      [["feelings", "character"], "How does Lily feel about the rain?", "She loves it.", ["She is scared of it.", "She is mad at it.", "She is bored."], "Lily laughs, and the story says she loves the rain."],
      [["vocab"], "What is a puddle?", "a small pool of water on the ground", ["a kind of boot", "a big cloud", "a loud sound"], "Lily jumps in it and it goes splash, so it is water on the ground."],
    ],
  },
  {
    grade: 0, kind: "info", title: "Frogs",
    text: `🐸 Frogs
A frog is green.
A frog can hop far.
A frog has long legs.
A frog likes to sit by a pond.
A frog eats bugs!`,
    qs: [
      [["central"], "What is this text mostly about?", "frogs", ["ponds", "bugs", "birds"], "Every sentence tells something about frogs."],
      [["details"], "What does a frog eat?", "bugs", ["grass", "fish", "cake"], "The text says a frog eats bugs."],
      [["details"], "What can a frog do?", "hop far", ["fly", "bark", "read"], "The text says a frog can hop far."],
      [["details", "setting"], "Where does a frog like to sit?", "by a pond", ["in a tree", "on a bus", "in a box"], "A frog likes to sit by a pond."],
      [["picture"], "What does the picture at the top show?", "a frog", ["a dog", "a pond", "a bug"], "The picture 🐸 shows a frog, the same as the words."],
    ],
  },
  {
    grade: 0, kind: "info", title: "My Five Senses",
    text: `👀 I see with my eyes.
👂 I hear with my ears.
👃 I smell with my nose.
👅 I taste with my tongue.
✋ I touch with my hands.
My senses help me learn!`,
    qs: [
      [["central"], "What is this text mostly about?", "the five senses", ["hands", "food", "school"], "Each line tells about one of the senses."],
      [["details"], "What do you use to hear?", "your ears", ["your nose", "your eyes", "your hands"], "The text says I hear with my ears."],
      [["details"], "What do you use to smell?", "your nose", ["your ears", "your tongue", "your feet"], "The text says I smell with my nose."],
      [["picture"], "What does the 👀 picture go with?", "seeing with your eyes", ["hearing", "tasting", "touching"], "The eyes picture is next to 'I see with my eyes.'"],
      [["vocab"], "What does the word taste mean?", "find out how food is with your tongue", ["look at something", "listen to a song", "smell a flower"], "You taste with your tongue."],
    ],
  },
  {
    grade: 0, kind: "fiction", title: "Ben Bakes a Cake",
    text: `🎂 Ben and Dad bake a cake.
First, they mix the eggs and milk.
Next, they put the cake in the oven.
Last, they add pink frosting.
"Happy birthday, Mom!" says Ben.`,
    qs: [
      [["character"], "Who bakes the cake?", "Ben and Dad", ["Mom and Ben", "Dad and Grandma", "Ben's friend"], "The story says Ben and Dad bake a cake."],
      [["sequence"], "What do they do first?", "mix the eggs and milk", ["add pink frosting", "put the cake in the oven", "eat the cake"], "The word First tells what they do first."],
      [["sequence"], "What do they do last?", "add pink frosting", ["mix the eggs", "go to the store", "wash the dishes"], "The word Last tells what they do last."],
      [["infer", "details"], "Who is the cake for?", "Mom", ["Dad", "Ben", "the dog"], "Ben says, 'Happy birthday, Mom!'"],
      [["summary"], "Which tells the story best?", "Ben and Dad bake a birthday cake for Mom.", ["The cake is pink.", "Dad has an oven.", "Ben likes eggs."], "Retelling tells the main idea of the whole story."],
    ],
  },
  {
    grade: 0, kind: "fiction", title: "Where Is Kit?",
    text: `🐱 Kit the cat is lost!
Nora looks under the bed. No Kit.
She looks in the closet. No Kit.
She looks in the basket. Meow!
Kit is asleep in the basket.`,
    qs: [
      [["character"], "Who is lost?", "Kit the cat", ["Nora", "a dog", "a bird"], "The story says Kit the cat is lost."],
      [["plot"], "What is Nora's problem?", "She can't find her cat.", ["She lost her shoe.", "Her bed is broken.", "It is raining."], "Kit is lost, so Nora has to look for her."],
      [["sequence"], "Where does Nora look first?", "under the bed", ["in the basket", "in the closet", "in the yard"], "First she looks under the bed."],
      [["details"], "Where is Kit?", "in the basket", ["under the bed", "in the closet", "outside"], "Kit is asleep in the basket."],
      [["details"], "What is Kit doing in the basket?", "sleeping", ["eating", "playing", "hiding a toy"], "The story says Kit is asleep."],
    ],
  },
  {
    grade: 1, kind: "fiction", title: "The Big Race",
    text: `Jay and his sister Ana had a race to the big oak tree. "Ready, set, go!" said Mom.

Jay ran fast, but he tripped on a rock. He fell and scraped his knee. Ana stopped running. She went back to help him up.

"You could have won," said Jay.

"Helping you is more important," said Ana. They walked to the tree together, holding hands. Then they both laughed and shouted, "Tie!"`,
    qs: [
      [["character", "elements"], "Who are the main characters?", "Jay and Ana", ["Mom and Jay", "Ana and Mom", "Jay and a dog"], "The story is about Jay and his sister Ana."],
      [["plot", "sequence"], "What happens in the middle of the story?", "Jay trips and Ana helps him.", ["Mom says go.", "They both shout tie.", "They eat lunch."], "In the middle, Jay falls and Ana goes back to help."],
      [["sequence"], "How does the story end?", "They walk to the tree together and call it a tie.", ["Ana wins the race.", "Jay goes home.", "Mom runs the race."], "At the end they reach the tree together and shout 'Tie!'"],
      [["feelings", "character"], "How does Jay probably feel when he scrapes his knee?", "hurt", ["silly", "sleepy", "proud"], "Falling and scraping a knee hurts."],
      [["theme"], "What is the lesson of the story?", "Helping others matters more than winning.", ["Always run fast.", "Rocks are fun.", "Never race your sister."], "Ana says, 'Helping you is more important.'"],
      [["setting"], "Where are they racing to?", "the big oak tree", ["the pool", "the school", "the store"], "They race to the big oak tree."],
    ],
  },
  {
    grade: 1, kind: "fiction", title: "Grandpa's Garden",
    text: `Every Saturday, Maya visits Grandpa. They work in his garden behind the house.

In spring, they plant tiny seeds in rows. Maya waters them with a green can. In summer, the plants grow tall. Red tomatoes and yellow squash hang on the vines.

At the end of summer, Maya and Grandpa pick the vegetables. They make a big pot of soup. "We grew this ourselves!" Maya says with a grin.`,
    qs: [
      [["setting"], "Where does most of the story happen?", "in Grandpa's garden", ["at school", "at the beach", "in a store"], "They work in the garden behind Grandpa's house."],
      [["sequence", "plot"], "What happens at the beginning?", "They plant tiny seeds.", ["They make soup.", "They pick tomatoes.", "The plants grow tall."], "In spring, at the beginning, they plant seeds."],
      [["sequence"], "What happens at the end?", "They pick vegetables and make soup.", ["They plant seeds.", "Maya waters the seeds.", "Maya visits a farm."], "At the end of summer they pick the vegetables and make soup."],
      [["feelings"], "How does Maya feel at the end?", "proud and happy", ["sad", "angry", "scared"], "She grins and says, 'We grew this ourselves!'"],
      [["details"], "What color is Maya's watering can?", "green", ["red", "yellow", "blue"], "She waters the seeds with a green can."],
      [["vocab"], "What are vines?", "long stems that plants grow on", ["kinds of soup", "garden tools", "rows of seeds"], "Tomatoes and squash hang on the vines, so vines are long stems."],
    ],
  },
  {
    grade: 1, kind: "fable", title: "The Lion and the Mouse",
    text: `A big lion was sleeping. A little mouse ran over his paw and woke him up. The lion grabbed the mouse. "Please let me go," said the mouse. "Some day I will help you." The lion laughed, but he let the mouse go.

Later, the lion got caught in a hunter's net. He roared and roared, but he could not get out. The little mouse heard him. She chewed the ropes until the lion was free.

"You were right," said the lion. "Even a little friend can be a big help."`,
    qs: [
      [["character"], "Who are the two characters?", "a lion and a mouse", ["a lion and a hunter", "a mouse and a cat", "two lions"], "The story is about a lion and a little mouse."],
      [["plot", "sequence"], "What is the lion's problem in the middle?", "He is caught in a net.", ["He is hungry.", "He lost the mouse.", "He can't sleep."], "Later, the lion got caught in a hunter's net."],
      [["plot"], "How does the mouse help?", "She chews the ropes.", ["She calls the hunter.", "She roars loudly.", "She brings food."], "The mouse chewed the ropes until the lion was free."],
      [["feelings"], "How does the lion feel at first when the mouse says she will help?", "He thinks it is funny.", ["He is scared.", "He is sad.", "He is angry."], "The lion laughed at the idea."],
      [["theme"], "What is the lesson of the story?", "Even small friends can be a big help.", ["Lions are the best.", "Never sleep outside.", "Mice are too small to matter."], "The lion says, 'Even a little friend can be a big help.'"],
    ],
  },
  {
    grade: 1, kind: "fiction", title: "Leo's First Day",
    text: `Leo held Mom's hand tight. It was his first day at a new school. His tummy felt full of butterflies.

His teacher, Ms. Rivera, smiled. "Welcome, Leo! Would you like to feed our class fish?" Leo sprinkled food into the tank. A girl named Zoe said, "I like your dinosaur shirt!"

At recess, Leo and Zoe played on the slide. When Mom came to pick him up, Leo ran to her. "Can I come back tomorrow?" he asked.`,
    qs: [
      [["feelings"], "How does Leo feel at the beginning?", "nervous", ["angry", "sleepy", "silly"], "His tummy felt full of butterflies, which means he was nervous."],
      [["feelings", "character"], "How does Leo feel at the end?", "happy", ["scared", "sad", "bored"], "He runs to Mom and asks to come back tomorrow."],
      [["setting"], "Where does the story take place?", "at Leo's new school", ["at the zoo", "at Leo's house", "at the park"], "It is Leo's first day at a new school."],
      [["character"], "Who is Ms. Rivera?", "Leo's teacher", ["Leo's mom", "Leo's sister", "the bus driver"], "The story says his teacher, Ms. Rivera, smiled."],
      [["plot", "sequence"], "What happens in the middle?", "Leo feeds the fish and meets Zoe.", ["Leo holds Mom's hand.", "Mom picks Leo up.", "Leo goes to bed."], "In the middle he feeds the class fish and Zoe likes his shirt."],
      [["vocab"], "\"His tummy felt full of butterflies\" means Leo felt…", "nervous and jumpy", ["very hungry", "full of bugs", "very sleepy"], "Butterflies in your tummy is a way to say you feel nervous."],
    ],
  },
  {
    grade: 1, kind: "info", title: "All About Bats",
    text: `All About Bats

What Bats Look Like
Bats are small animals with wings. Their wings are made of thin skin.

When Bats Are Awake
Bats sleep in the day. They hang upside down in caves or trees. At night, they wake up and fly.

What Bats Eat
Many bats eat bugs. One bat can eat hundreds of bugs in one night! Some bats eat fruit.`,
    qs: [
      [["central"], "What is the main topic of this text?", "bats", ["caves", "bugs", "fruit"], "The title and every part tell about bats."],
      [["features"], "What is the title of this text?", "All About Bats", ["What Bats Eat", "When Bats Are Awake", "Bugs"], "The title is at the very top: All About Bats."],
      [["features"], "Which heading tells you where to read about bat food?", "What Bats Eat", ["What Bats Look Like", "When Bats Are Awake", "All About Bats"], "Headings tell what each part is about."],
      [["details"], "When do bats sleep?", "in the day", ["at night", "only in winter", "never"], "The text says bats sleep in the day."],
      [["details"], "How do bats hang when they sleep?", "upside down", ["on their feet", "in a nest", "under water"], "They hang upside down in caves or trees."],
      [["details"], "What are bat wings made of?", "thin skin", ["feathers", "fur", "paper"], "Their wings are made of thin skin."],
    ],
  },
  {
    grade: 1, kind: "info", title: "Our Sun",
    text: `The Sun

The sun is a star. It is the closest star to Earth.

The sun gives us light. It also keeps Earth warm. Plants need sunlight to grow.

The sun looks small in the sky because it is very far away. It is really much, much bigger than Earth!

Label: ☀️ = the sun   🌍 = Earth`,
    qs: [
      [["central"], "What is the main topic?", "the sun", ["plants", "Earth", "the moon"], "The whole text tells facts about the sun."],
      [["details"], "What is the sun?", "a star", ["a planet", "a cloud", "a moon"], "The text says the sun is a star."],
      [["details"], "What do plants need from the sun?", "sunlight to grow", ["rain", "snow", "wind"], "Plants need sunlight to grow."],
      [["details", "infer"], "Why does the sun look small?", "It is very far away.", ["It is a small star.", "It is behind clouds.", "It is smaller than Earth."], "The text says it looks small because it is very far away."],
      [["features"], "What does the label 🌍 stand for?", "Earth", ["the sun", "a star", "the moon"], "The label line says 🌍 = Earth."],
    ],
  },
  {
    grade: 1, kind: "info", title: "Two Kinds of Bears (Two Texts)",
    text: `Text 1: Polar Bears
Polar bears live where it is very cold. They have thick white fur. They swim in icy water and eat seals.

Text 2: Brown Bears
Brown bears live in forests and mountains. They have thick brown fur. They eat berries, roots and fish. In winter, they sleep in a den.`,
    qs: [
      [["compare"], "How are polar bears and brown bears the same?", "They both have thick fur.", ["They both eat seals.", "They both live in forests.", "They both have white fur."], "Text 1 and Text 2 both say the bears have thick fur."],
      [["compare"], "How are they different?", "Polar bears are white and brown bears are brown.", ["Only brown bears have fur.", "Polar bears eat berries.", "Brown bears live on ice."], "The texts tell different fur colors."],
      [["details"], "What do polar bears eat?", "seals", ["berries", "roots", "honey"], "Text 1 says polar bears eat seals."],
      [["details"], "Where do brown bears sleep in winter?", "in a den", ["in the water", "on the ice", "in a tree"], "Text 2 says they sleep in a den."],
      [["central"], "What are both texts about?", "bears", ["winter", "fish", "forests"], "Both texts tell about a kind of bear."],
    ],
  },
  {
    grade: 1, kind: "fiction", title: "Owl Can't Sleep",
    text: `Owl sat in her tree. The sun was up, and Owl wanted to sleep. But the birds were singing. Tweet, tweet!

"Please sing softer," said Owl. The birds sang more quietly. Then a woodpecker began to tap. Tap, tap, tap!

"Please tap somewhere else," said Owl. The woodpecker flew to another tree.

At last it was quiet. Owl closed her big yellow eyes. Soon she was fast asleep, until the moon came up.`,
    qs: [
      [["character"], "Who is the main character?", "Owl", ["a woodpecker", "the sun", "a bird"], "The story is about Owl trying to sleep."],
      [["plot", "elements"], "What is Owl's problem?", "It is too noisy to sleep.", ["She is hungry.", "Her tree fell down.", "She can't fly."], "The birds and the woodpecker make noise while she wants to sleep."],
      [["sequence"], "What happens first?", "The birds are singing.", ["The woodpecker taps.", "Owl falls asleep.", "The moon comes up."], "First the birds sing, then the woodpecker taps."],
      [["infer"], "Why does Owl sleep in the day?", "Owls are awake at night.", ["She is sick.", "She likes the sun.", "The birds told her to."], "She sleeps until the moon comes up, because owls are awake at night."],
      [["feelings"], "How does Owl probably feel when the woodpecker taps?", "annoyed", ["happy", "excited", "proud"], "She wants quiet, so the tapping bothers her."],
      [["theme"], "What can readers learn from Owl?", "You can ask nicely for what you need.", ["Always be loud.", "Never live in a tree.", "Birds are mean."], "Owl says please, and the others listen."],
    ],
  },
];
