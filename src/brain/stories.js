// Story Time: short original stories in two halves. Pip reads the first half, asks the child
// to guess what happens next (any guess is fine), reads the rest, then asks three questions.
// band 1: about 80 words, simple "who/what" questions. band 2: about 120 words, details.
// band 3: about 160 words, order of events and "why" questions.
// q: [question, choices, index of the right choice]

export const STORIES = [
  {
    id: "lost-mitten", band: 1, title: "The Lost Mitten",
    a: "Mia had two red mittens. On a snowy day, she played in the park with her dog, Biscuit. When it was time to go home, Mia looked at her hands. One mitten was gone!",
    predict: ["What do you think happens next?", ["Biscuit finds the mitten", "Mia buys new mittens", "It starts to rain"]],
    b: "Mia and Biscuit walked back across the park. Biscuit sniffed the snow. Then he dug and dug. Up came the red mitten, wet and cold! Mia hugged Biscuit and gave him a treat at home.",
    qs: [
      ["What color were Mia's mittens?", ["Blue", "Red", "Green"], 1],
      ["Who found the lost mitten?", ["Mia's mom", "Mia", "Biscuit the dog"], 2],
      ["What did Mia give Biscuit at home?", ["A treat", "A ball", "A bath"], 0],
    ],
  },
  {
    id: "big-seed", band: 1, title: "The Big Seed",
    a: "Leo found a big brown seed in the garden. He planted it in a pot and put the pot by the sunny window. Every morning he gave it a little cup of water.",
    predict: ["What do you think will happen to the seed?", ["It grows into a plant", "It rolls away", "A bird eats it"]],
    b: "After one week, a tiny green shoot poked out of the dirt. After a month, it was taller than Leo's hand. Then one day, a big yellow flower opened. It was a sunflower!",
    qs: [
      ["Where did Leo put the pot?", ["By the sunny window", "In the closet", "Under his bed"], 0],
      ["What did Leo give the seed every morning?", ["Some milk", "A cup of water", "A cookie"], 1],
      ["What grew from the seed?", ["A tomato", "A tree", "A sunflower"], 2],
    ],
  },
  {
    id: "rainy-picnic", band: 1, title: "The Rainy Picnic",
    a: "Ava and her grandpa packed sandwiches, apples and juice for a picnic. They drove to the lake. Just as they spread out the blanket, dark clouds came and it started to rain.",
    predict: ["What do you think Ava and Grandpa will do?", ["Have the picnic somewhere dry", "Swim in the lake", "Go to sleep"]],
    b: "They ran back to the car, laughing. Grandpa said, \"Let's have our picnic right here!\" They ate sandwiches in the back seat and listened to the rain on the roof. Ava said it was the best picnic ever.",
    qs: [
      ["Who went on the picnic with Ava?", ["Her grandpa", "Her teacher", "Her sister"], 0],
      ["Where did they go for the picnic?", ["The beach", "The lake", "The zoo"], 1],
      ["Where did they eat their picnic in the end?", ["Under a tree", "At home", "In the car"], 2],
    ],
  },
  {
    id: "class-hamster", band: 1, title: "Nibbles Gets Out",
    a: "Nibbles was the class hamster. One morning, Mr. Lee found the cage door open and Nibbles was not inside. The children looked under the desks and behind the books.",
    predict: ["Where do you think Nibbles is hiding?", ["Somewhere in the classroom", "On the roof", "At the store"]],
    b: "Sam heard a tiny crunch, crunch sound. It came from his backpack! He opened it slowly. There was Nibbles, eating Sam's crackers. Everyone laughed, and Mr. Lee put a new lock on the cage.",
    qs: [
      ["What kind of animal is Nibbles?", ["A rabbit", "A hamster", "A fish"], 1],
      ["Where was Nibbles hiding?", ["In Sam's backpack", "In the sink", "In a shoe"], 0],
      ["What was Nibbles eating?", ["An apple", "Cheese", "Crackers"], 2],
    ],
  },
  {
    id: "kite-day", band: 1, title: "Kite Day",
    a: "Noah made a kite with paper, sticks and a long tail of ribbons. He took it to the hill on a windy day. He ran fast, and the kite went up, up, up. Then the string slipped out of his hand!",
    predict: ["What do you think happens to the kite?", ["Someone helps catch it", "It turns into a bird", "Noah goes home without it"]],
    b: "The kite flew toward a tall tree. A girl named Zoe jumped and grabbed the string just in time. She gave it back to Noah. They took turns flying the kite all afternoon.",
    qs: [
      ["What did Noah use to make the tail?", ["Ribbons", "Leaves", "Socks"], 0],
      ["Why did the kite get away?", ["It broke", "The string slipped from his hand", "A dog took it"], 1],
      ["Who caught the kite string?", ["Noah's dad", "A teacher", "A girl named Zoe"], 2],
    ],
  },
  {
    id: "pancakes", band: 1, title: "Pancake Morning",
    a: "On Saturday, Lily wanted to make pancakes for her mom. Dad helped her mix flour, eggs and milk in a big bowl. Lily stirred and stirred. Then Dad heated the pan.",
    predict: ["What do you think Lily will do with the pancakes?", ["Surprise her mom", "Feed them to ducks", "Throw them away"]],
    b: "Lily poured the batter in small circles. Dad flipped them. They made a tall stack and put strawberries on top. Lily carried the plate to Mom's room. Mom smiled and said, \"What a sweet surprise!\"",
    qs: [
      ["Who did Lily make pancakes for?", ["Her teacher", "Her mom", "Her friend"], 1],
      ["Who helped Lily cook?", ["Dad", "Grandma", "Her brother"], 0],
      ["What did they put on top of the pancakes?", ["Chocolate", "Bananas", "Strawberries"], 2],
    ],
  },
  {
    id: "lemonade", band: 2, title: "The Lemonade Stand",
    a: "Jayden wanted to buy a new soccer ball, but it cost ten dollars. He had only three. His sister Maya had an idea: a lemonade stand! They squeezed lemons, added water and sugar, and made a sign that said \"Lemonade 50 cents.\" They set up their table on the corner. But the first hour, nobody stopped.",
    predict: ["What do you think Jayden and Maya will try next?", ["Find a busier place or change something", "Drink all the lemonade", "Give up and go home"]],
    b: "Maya noticed that people were walking to the park down the street. So they carried their table to the park gate, where lots of families were passing. They also added ice to keep the lemonade cold. Soon there was a line! By the end of the day, they had sold enough cups to earn eight dollars. Now Jayden had enough for the ball, and he bought Maya a treat too.",
    qs: [
      ["How much did the soccer ball cost?", ["Five dollars", "Ten dollars", "Twenty dollars"], 1],
      ["Why did they move the table?", ["It was raining", "More people were walking to the park", "A dog knocked it over"], 1],
      ["What did they add to keep the lemonade cold?", ["Ice", "Snow", "Milk"], 0],
    ],
  },
  {
    id: "spelling-bee", band: 2, title: "The Spelling Bee",
    a: "Priya was nervous about the class spelling bee. Every night for a week, she practiced with her grandma. Grandma said a word, and Priya spelled it out loud. When she got one wrong, she wrote it three times on a card. On the day of the bee, Priya's hands felt shaky. Her first word was \"because.\"",
    predict: ["What do you think will happen to Priya?", ["She remembers her practice and does well", "She runs out of the room", "The teacher forgets her"]],
    b: "Priya took a deep breath, the way Grandma taught her. She pictured the word on her practice card. \"B-E-C-A-U-S-E,\" she said. Correct! She spelled six more words right. Then the word \"surprise\" tripped her up. She came in third place. Priya was proud anyway, because she had worked hard. That night, she wrote \"surprise\" on a new card.",
    qs: [
      ["Who helped Priya practice?", ["Her grandma", "Her coach", "Her brother"], 0],
      ["What did Priya do when she got a word wrong while practicing?", ["Skipped it", "Wrote it three times on a card", "Asked for an easier word"], 1],
      ["Which word did Priya miss at the bee?", ["Because", "Friend", "Surprise"], 2],
    ],
  },
  {
    id: "broken-bike", band: 2, title: "The Flat Tire",
    a: "Carlos rode his bike to school every day. One morning, the back tire made a hissing sound and went flat. He was far from home and school started in twenty minutes. Carlos remembered that his uncle had put a small repair kit in his bike bag.",
    predict: ["What do you think Carlos will do?", ["Try to fix the tire with the kit", "Leave the bike on the road", "Ride the flat tire fast"]],
    b: "Carlos opened the kit and read the steps on the card. First, find the hole. Second, rub the patch with glue. Third, press the patch on and count to sixty. Fourth, pump air into the tire. He found a tiny nail and pulled it out. He followed each step in order. The tire held! Carlos got to school just as the bell rang.",
    qs: [
      ["What was wrong with the bike?", ["The chain broke", "The back tire went flat", "The bell fell off"], 1],
      ["What caused the hole in the tire?", ["A tiny nail", "A sharp rock", "Glass"], 0],
      ["What was the LAST step Carlos did?", ["Find the hole", "Put on glue", "Pump air into the tire"], 2],
    ],
  },
  {
    id: "garden-snail", band: 2, title: "Who Ate the Lettuce?",
    a: "Grandpa Joe grew lettuce in his garden. One morning, the leaves had holes in them. The next morning, there were even more holes. Ruby wanted to solve the mystery. She noticed shiny silver trails on the path near the lettuce. The trails went toward a big flat rock.",
    predict: ["Who do you think is eating the lettuce?", ["Snails", "A dog", "Grandpa Joe"], 0],
    b: "Ruby lifted the rock carefully. Underneath were five snails, sleeping in the cool shade. \"There are our lettuce thieves!\" Grandpa laughed. Ruby read that snails like to eat at night and hide in the day. She and Grandpa moved the snails to the far end of the yard, near some weeds they could munch instead. The lettuce grew back nice and green.",
    qs: [
      ["What clue did Ruby notice on the path?", ["Footprints", "Shiny silver trails", "Feathers"], 1],
      ["How many snails were under the rock?", ["Two", "Five", "Ten"], 1],
      ["When do snails like to eat?", ["At night", "At lunchtime", "Only in winter"], 0],
    ],
  },
  {
    id: "new-kid", band: 2, title: "The New Kid",
    a: "A new boy named Kenji joined Ella's class. He had just moved from far away and didn't know anyone. At lunch, Kenji sat alone at the end of the table. He took out a notebook and started drawing a dragon. Ella saw him and thought about her own first day at a new school.",
    predict: ["What do you think Ella will do?", ["Go and talk to Kenji", "Laugh at his drawing", "Eat lunch outside"]],
    b: "Ella picked up her tray and sat next to Kenji. \"That's an amazing dragon,\" she said. Kenji smiled and showed her more drawings: a castle, a rocket and a giant cat. Ella liked to write stories, so they decided to make a comic book together. Ella wrote the words and Kenji drew the pictures. By Friday, three more kids wanted to help.",
    qs: [
      ["What was Kenji drawing at lunch?", ["A dragon", "A horse", "A car"], 0],
      ["Why did Ella understand how Kenji felt?", ["She was also new once", "She knew his family", "She liked dragons"], 0],
      ["What did Ella and Kenji make together?", ["A cake", "A comic book", "A kite"], 1],
    ],
  },
  {
    id: "science-fair", band: 2, title: "The Volcano",
    a: "For the science fair, Omar built a volcano out of clay. Inside the top, he put a small cup. His plan was to add baking soda and then vinegar to make foam pour out. The night before the fair, he tested it. Nothing happened! The foam only bubbled a tiny bit.",
    predict: ["What do you think Omar will do?", ["Figure out what went wrong", "Bring no project", "Paint the volcano blue"]],
    b: "Omar checked his notes. He had used only one spoon of baking soda. His mom suggested he try changing just one thing at a time. First he tried two spoons. Better! Then he tried three spoons. The foam rushed over the top like real lava. At the fair, Omar explained how he tested his idea step by step. He won a ribbon for the best experiment.",
    qs: [
      ["What did Omar make his volcano out of?", ["Paper", "Clay", "Wood"], 1],
      ["How many spoons of baking soda made the best foam?", ["One", "Two", "Three"], 2],
      ["Why did Omar win a ribbon?", ["His volcano was the biggest", "He tested his idea step by step", "He was the fastest"], 1],
    ],
  },
  {
    id: "camping", band: 3, title: "The Camping Trip",
    a: "Hannah's family went camping in the mountains. First, they set up the tent next to a stream. Then Hannah and her brother Max gathered small sticks for the campfire. Dad cooked hot dogs, and Mom told a funny story about a bear who loved pancakes. After dinner, they put out the fire with water and climbed into their sleeping bags. In the middle of the night, Hannah woke up. Something was scratching on the outside of the tent!",
    predict: ["What do you think is scratching the tent?", ["A small animal or a branch", "A dragon", "Max playing a trick"]],
    b: "Hannah's heart thumped. She shook Max awake, and together they peeked out with a flashlight. A little raccoon was sniffing around their cooler, trying to open the lid. Its tiny hands scratched against the tent as it climbed past. Dad got up and gently shooed it away. Then he put the cooler inside the car, where animals could not reach it. \"Never leave food out at a campsite,\" Dad said. In the morning, they found tiny paw prints in the mud. Max said, \"Maybe it was the bear who loves pancakes!\" Everyone laughed.",
    qs: [
      ["What did the family do FIRST at the campsite?", ["Cooked hot dogs", "Set up the tent", "Told stories"], 1],
      ["What was making the scratching sound?", ["A raccoon", "The wind", "A bear"], 0],
      ["Why did Dad move the cooler into the car?", ["To keep it cold", "So animals could not get the food", "To make room in the tent"], 1],
    ],
  },
  {
    id: "school-play", band: 3, title: "The School Play",
    a: "Theo's class was putting on a play about the planets. Theo was chosen to be Saturn, and he had six lines to learn. He made a plan. On Monday, he learned the first two lines. On Tuesday, he added two more. On Wednesday, he learned the last two. On Thursday, he practiced all six for his family. On the night of the play, Theo stood on the stage in his costume with a big ring around his middle. He opened his mouth to speak, and his mind went completely blank.",
    predict: ["What do you think Theo will do?", ["Find a way to remember his lines", "Walk off the stage", "Sing a song instead"]],
    b: "Theo looked out at the crowd and saw his grandma waving. He remembered how he had learned his lines: two at a time, like stepping stones. He thought about the first two, the ones from Monday. \"I am Saturn, the sixth planet from the Sun,\" he said. Then the rest came back, one pair at a time. When he said his last line about his beautiful rings, everyone clapped. After the show, his teacher said Theo had shown that being calm and having a plan can beat being nervous.",
    qs: [
      ["How many lines did Theo have to learn?", ["Four", "Six", "Ten"], 1],
      ["How did Theo learn his lines during the week?", ["All at once on Thursday", "Two new lines each day", "He did not practice"], 1],
      ["What helped Theo remember after his mind went blank?", ["Reading from a paper", "Thinking of how he learned them two at a time", "A friend whispering"], 1],
    ],
  },
  {
    id: "treasure-map", band: 3, title: "The Treasure Map",
    a: "While cleaning the attic, Sofia and her cousin Ben found an old map tucked inside a book. It showed their grandmother's backyard. The directions said: \"Start at the oak tree. Walk ten steps toward the shed. Turn left and walk five steps to the bird bath. Dig beside the flat stone.\" Grandma smiled when she saw it but would not say a word. The cousins grabbed a shovel and ran outside.",
    predict: ["What do you think they will find?", ["Something special that Grandma buried", "Nothing at all", "A pirate ship"]],
    b: "Sofia counted the steps out loud while Ben checked the map. At first they turned right by mistake and ended up at the fence. \"Let's start over and go slowly,\" Sofia said. This time they turned left and found the bird bath, with a flat stone beside it. They dug carefully. Their shovel hit a metal box. Inside were old photos, a toy car and a letter. The letter was from Grandma, written when she was nine years old. It said, \"To whoever finds this: I hope you love this yard as much as I do.\" The cousins added a letter of their own and buried the box again for the next explorer.",
    qs: [
      ["Where did the directions say to start?", ["At the shed", "At the oak tree", "At the fence"], 1],
      ["What mistake did the cousins make at first?", ["They turned right instead of left", "They lost the shovel", "They read the map upside down"], 0],
      ["What did the cousins do at the end?", ["Kept everything in their room", "Added their own letter and buried the box again", "Gave the box to a museum"], 1],
    ],
  },
  {
    id: "lost-library-book", band: 3, title: "The Missing Library Book",
    a: "Aiden borrowed a book about sharks from the school library. It was due back on Friday. On Thursday night, he looked for it to read one last chapter, but it was not on his shelf. He checked under his bed, in his backpack and in the kitchen. It was nowhere. Aiden felt worried, because the book belonged to the whole school. He decided to think back over his week, one day at a time.",
    predict: ["What do you think Aiden will remember?", ["Where he last had the book", "That he never borrowed it", "Nothing useful"]],
    b: "On Monday, he read it in bed. On Tuesday, he showed his friend Grace the picture of the hammerhead shark at recess. On Wednesday, he took it in the car to his swimming lesson. Wait, the car! Aiden asked his dad for the car keys. He looked under the seats and in the side pocket of the door. There it was, a little bent but safe. Aiden decided to keep a special spot on his desk just for library books, so this would not happen again. On Friday, he returned it on time and borrowed a book about whales.",
    qs: [
      ["What was the library book about?", ["Whales", "Sharks", "Dinosaurs"], 1],
      ["How did Aiden figure out where the book was?", ["He thought back over each day of his week", "His teacher told him", "He bought a new one"], 0],
      ["Where did Aiden find the book?", ["In the car", "At the pool", "At Grace's house"], 0],
    ],
  },
  {
    id: "bake-sale", band: 3, title: "The Bake Sale Mix-Up",
    a: "Layla and her dad were baking cookies for the school bake sale. The recipe card said: two cups of flour, one cup of sugar, one egg, a spoon of vanilla and a cup of chocolate chips. Layla was in charge of measuring. While she worked, her little brother kept asking her questions, and she lost track. When the cookies came out of the oven, they were flat, hard and very salty.",
    predict: ["What do you think went wrong?", ["Layla mixed up an ingredient", "The oven was too cold", "The cookies were perfect"]],
    b: "Dad looked at the jars on the counter. The sugar jar and the salt jar looked almost the same. Layla had put in a cup of salt instead of sugar! She felt like crying, but Dad said mistakes are how cooks learn. They made a plan. Layla put a bright label on each jar. Then she asked her brother to color a picture in the other room while she worked. This time, she read each step out loud and checked it off with a pencil. The new cookies were soft and sweet, and they sold out in ten minutes.",
    qs: [
      ["Why did Layla lose track while measuring?", ["She was tired", "Her brother kept asking questions", "The recipe was missing"], 1],
      ["What did Layla put in by mistake?", ["Salt instead of sugar", "Too many eggs", "No flour"], 0],
      ["Which of these did Layla do the second time?", ["Baked faster", "Checked off each step with a pencil", "Used a new oven"], 1],
    ],
  },
  {
    id: "rescue-kitten", band: 3, title: "The Kitten in the Tree",
    a: "On the way home from school, Isaac and his friend Nora heard a tiny meow. High in a maple tree was a gray kitten, clinging to a branch. It was too scared to climb down. Nora wanted to climb up and grab it, but Isaac said the branches looked too thin. They needed a safer plan. Isaac remembered that the fire station was just around the corner.",
    predict: ["What do you think Isaac and Nora will do?", ["Ask a grown-up at the fire station for help", "Climb the tree anyway", "Walk away and forget the kitten"]],
    b: "Nora stayed by the tree to keep an eye on the kitten while Isaac ran to the fire station. A firefighter named Ms. Park came back with him carrying a short ladder. She climbed up slowly and talked softly to the kitten until it crawled into her arms. The kitten had a collar with a phone number on it. Ms. Park called the number, and an older man hurried over a few minutes later. \"Pepper! I've been looking everywhere,\" he said. He thanked Isaac and Nora for being smart and staying safe. The next week, he brought them a plate of cookies and a photo of Pepper napping in the sun.",
    qs: [
      ["Why didn't Nora climb the tree?", ["The branches looked too thin", "She was afraid of cats", "It was too dark"], 0],
      ["What did Nora do while Isaac went for help?", ["Went home", "Stayed to watch the kitten", "Climbed the tree"], 1],
      ["How did they find the kitten's owner?", ["They put up posters", "The collar had a phone number", "The kitten walked home"], 1],
    ],
  },
];
