// patterns.js
// A collection of Life patterns that can be spawned on the field during the
// game. This is the collection in raw form. When game loads, it is transformed
// into a more usable level-indexed database in lifebase.js.

var rawPatterns = [
{
    name: "block",
    kind: "still",
    cells: [
        "OO",
        "OO"
    ]
},
{
    name: "beehive at beehive",
    kind: "still",
    cells: [
        "....O.",
        "...O.O",
        "...O.O",
        ".OO.O.",
        "O..O..",
        ".OO..."
    ]
},
{
    name: "ship on long boat",
    kind: "still",
    cells: [
        "OO.....",
        "O.O....",
        ".OO....",
        "...OO..",
        "...O.O.",
        "....O.O",
        ".....O."
    ]
},
{
    name: "cis-R-bee and R-loaf",
    kind: "still",
    cells: [
        ".OO.",
        "O..O",
        ".OOO",
        "....",
        ".OOO",
        "O..O",
        "O.O.",
        ".O.."
    ]
},
{
    name: "beehive with nine",
    kind: "still",
    cells: [
        ".OO....",
        "O..O...",
        ".OO.O..",
        "....O..",
        "....O.O",
        ".....OO"
    ]
},
{
    name: "beehive bend tail",
    kind: "still",
    cells: [
        ".OO..",
        "O..O.",
        ".OO.O",
        "....O",
        ".OOO.",
        ".O..."
    ]
},
{
    name: "ortho-loaf and table",
    kind: "still",
    cells: [
        "..O..",
        ".O.O.",
        ".O..O",
        "..OO.",
        ".....",
        "OOOO.",
        "O..O."
    ]
},
{
    name: "trans-boat with nine",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        ".O....",
        "..OOO.",
        ".....O",
        "....OO"
    ]
},
{
    name: "beehive and cap",
    kind: "still",
    cells: [
        ".OO..",
        "O..O.",
        "OOOO.",
        ".....",
        "..OO.",
        ".O..O",
        "..OO."
    ]
},
{
    name: "long long barge",
    kind: "still",
    cells: [
        ".O....",
        "O.O...",
        ".O.O..",
        "..O.O.",
        "...O.O",
        "....O."
    ]
},
{
    name: "trans-barge with tail",
    kind: "still",
    cells: [
        "OO....",
        ".O....",
        ".O.O..",
        "..O.O.",
        "...O.O",
        "....O."
    ]
},
{
    name: "snorkel loop",
    kind: "still",
    cells: [
        "..OO..",
        ".O..O.",
        "..O.O.",
        "O.O.OO",
        "OO...."
    ]
},
{
    name: "beehive and table",
    kind: "still",
    cells: [
        "..OO.",
        ".O..O",
        "..OO.",
        ".....",
        "OOOO.",
        "O..O."
    ]
},
{
    name: "cis-boat and table",
    kind: "still",
    cells: [
        ".O..",
        "O.O.",
        "OO..",
        "....",
        "OOOO",
        "O..O"
    ]
},
{
    name: "r-bee and snake",
    kind: "still",
    cells: [
        "OO.O.",
        "O.OO.",
        ".....",
        ".OOO.",
        ".O..O",
        "..OO."
    ]
},
{
    name: "eater on boat",
    kind: "still",
    cells: [
        ".OO..",
        ".O.O.",
        "...O.",
        "...OO",
        ".OO..",
        "O.O..",
        ".O..."
    ]
},
{
    name: "trans-boat and dock",
    kind: "still",
    cells: [
        ".O....",
        "O.O...",
        ".OO...",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]
},
{
    name: "long long canoe",
    kind: "still",
    cells: [
        ".....OO",
        "......O",
        ".....O.",
        "....O..",
        "...O...",
        "O.O....",
        "OO....."
    ]
},
{
    name: "long canoe",
    kind: "still",
    cells: [
        "....OO",
        ".....O",
        "....O.",
        "...O..",
        "O.O...",
        "OO...."
    ]
},
{
    name: "trans-rotated R-bee",
    kind: "still",
    cells: [
        ".O.....",
        "O.O....",
        "O.O....",
        ".OO.OO.",
        "....O.O",
        "....O.O",
        ".....O."
    ]
},
{
    name: "bee hat",
    kind: "still",
    cells: [
        ".OO...",
        "O..O..",
        ".OO.O.",
        "..O.O.",
        "O.O.OO",
        "OO...."
    ]
},
{
    name: "cis-loaf with tail",
    kind: "still",
    cells: [
        "...OO.",
        "..O..O",
        ".O.O.O",
        ".O..O.",
        "OO...."
    ]
},
{
    name: "symmetric scorpion",
    kind: "still",
    cells: [
        "...O...",
        ".OOOOO.",
        "O.....O",
        "O.O.O.O",
        ".OO.OO."
    ]
},
{
    name: "claw with tail",
    kind: "still",
    cells: [
        "OO....",
        ".O....",
        ".O.OO.",
        "..O..O",
        "....OO"
    ]
},
{
    name: "eleven loop",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        "O..O.",
        ".O.O.",
        "OO.OO"
    ]
},
{
    name: "long integral",
    kind: "still",
    cells: [
        "..OO",
        ".O.O",
        ".O..",
        "..O.",
        "O.O.",
        "OO.."
    ]
},
{
    name: "hook with tail",
    kind: "still",
    cells: [
        "OO...",
        ".O...",
        ".O.OO",
        "..O.O"
    ]
},
{
    name: "load siamese loaf",
    kind: "still",
    cells: [
        "..OO.",
        ".O..O",
        "O.O.O",
        "O..O.",
        ".OO.."
    ]
},
{
    name: "tub with long tail",
    kind: "still",
    cells: [
        ".O..",
        "O.O.",
        ".O.O",
        "...O",
        "..O.",
        "..OO"
    ]
},
{
    name: "beehive at loaf",
    kind: "still",
    cells: [
        "....O.",
        "...O.O",
        "...O.O",
        ".OO.O.",
        "O..O..",
        "O.O...",
        ".O...."
    ]
},
{
    name: "cis-hook and R-bee",
    kind: "still",
    cells: [
        "..OO",
        "O..O",
        "OOO.",
        "....",
        "OOO.",
        "O..O",
        ".OO."
    ]
},
{
    name: "boat with long tail",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        ".O..OO",
        "..OO.O"
    ]
},
{
    name: "trans-R-bee and R-loaf",
    kind: "still",
    cells: [
        "..OO.",
        ".O..O",
        ".OOO.",
        ".....",
        ".OOO.",
        "O..O.",
        "O.O..",
        ".O..."
    ]
},
{
    name: "long long shillelagh",
    kind: "still",
    cells: [
        ".....OO",
        "OO..O.O",
        "O..O...",
        ".OO...."
    ]
},
{
    name: "long shillelagh",
    kind: "still",
    cells: [
        "OO..OO",
        "O..O.O",
        ".OO..."
    ]
},
{
    name: "integral with tub",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        "..O...",
        "..O.O.",
        "...O.O",
        "....O."
    ]
},
{
    name: "cis-block and long hook",
    kind: "still",
    cells: [
        "...OO",
        "O...O",
        "OOOO.",
        ".....",
        "..OO.",
        "..OO."
    ]
},
{
    name: "eater siamese eater",
    kind: "still",
    cells: [
        "OO..",
        "O.O.",
        "..O.",
        "..OO",
        "...O",
        "OOO.",
        "O..."
    ]
},
{
    name: "cis-boat and dock",
    kind: "still",
    cells: [
        "..O...",
        ".O.O..",
        ".OO...",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]
},
{
    name: "block and two walls",
    kind: "still",
    cells: [
        "OO.OO",
        "OO.O.",
        "...O.",
        "OOO..",
        "O...."
    ]
},
{
    name: "trans-hook and R-bee",
    kind: "still",
    cells: [
        "...OO",
        ".O..O",
        ".OOO.",
        ".....",
        ".OOO.",
        "O..O.",
        ".OO.."
    ]
},
{
    name: "mirrored dock",
    kind: "still",
    cells: [
        "OO..OO",
        "O....O",
        ".OOOO.",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]
},
{
    name: "cis-shillelagh",
    kind: "still",
    cells: [
        "....OO",
        ".....O",
        "OO..O.",
        "O..O..",
        ".OO..."
    ]
},
{
    name: "trans-block and long hook",
    kind: "still",
    cells: [
        "...OO",
        "O...O",
        "OOOO.",
        ".....",
        "OO...",
        "OO..."
    ]
},
{
    name: "cis-rotated hook",
    kind: "still",
    cells: [
        ".OO....",
        "..O..OO",
        "O.O.O.O",
        "Oo..O..",
        "....OO."
    ]
},
{
    name: "trans-loaf with tail",
    kind: "still",
    cells: [
        "OO....",
        ".O....",
        ".O.OO.",
        "..O..O",
        "...O.O",
        "....O."
    ]
},
{
    name: "block and cap",
    kind: "still",
    cells: [
        ".OO.",
        "O..O",
        "OOOO",
        "....",
        "OO..",
        "OO.."
    ]
},
{
    name: "elevener",
    kind: "still",
    cells: [
        "....OO",
        "...O.O",
        "...O..",
        ".OOO..",
        "O.....",
        "OO...."
    ]
},
{
    name: "bookends",
    kind: "still",
    cells: [
        "OO...OO",
        "O.O.O.O",
        "..O.O..",
        ".OO.OO."
    ]
},
{
    name: "dead spark coil",
    kind: "still",
    cells: [
        "OO...OO",
        "O.O.O.O",
        "..O.O..",
        "O.O.O.O",
        "OO...OO"
    ]
},
{
    name: "trans-mirrored R-bee",
    kind: "still",
    cells: [
        ".....O.",
        ".OO.O.O",
        "O.O.O.O",
        "O.O.OO.",
        ".O....."
    ]
},
{
    name: "cis-boat with tail",
    kind: "still",
    cells: [
        "...OO",
        "...O.",
        "OO.O.",
        "O.O..",
        ".O..."
    ]
},
{
    name: "fourteener",
    kind: "still",
    cells: [
        "....OO.",
        "OO..O.O",
        "O.....O",
        ".OOOOO.",
        "...O..."
    ]
},
{
    name: "loop",
    kind: "still",
    cells: [
        ".OO..",
        "O..O.",
        ".O.O.",
        "OO.OO"
    ]
},
{
    name: "scorpion",
    kind: "still",
    cells: [
        "...O...",
        ".OOO...",
        "O...OO.",
        "O.O.O.O",
        ".OO.O.O",
        ".....O."
    ]
},
{
    name: "beehive with tail",
    kind: "still",
    cells: [
        ".OO...",
        "O..O..",
        ".OO.O.",
        "....O.",
        "....OO"
    ]
},
{
    name: "beehive and dock",
    kind: "still",
    cells: [
        "...OO.",
        "..O..O",
        "...OO.",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]
},
{
    name: "twin hat",
    kind: "still",
    cells: [
        "..O...O..",
        ".O.O.O.O.",
        ".O.O.O.O.",
        "OO.O.O.OO",
        "....O...."
    ]
},
{
    name: "block and dock",
    kind: "still",
    cells: [
        "...OO.",
        "...OO.",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]
},
{
    name: "block on table",
    kind: "still",
    cells: [
        "..OO",
        "..OO",
        "....",
        "OOOO",
        "O..O"
    ]
},
{
    name: "moose antlers",
    kind: "still",
    cells: [
        "OO.....OO",
        "O.......O",
        ".OOO.OOO.",
        "...O.O...",
        "....O...."
    ]
},
{
    name: "cis-mirrored R-bee",
    kind: "still",
    cells: [
        ".OO.OO.",
        "O.O.O.O",
        "O.O.O.O",
        ".O...O."
    ]
},
{
    name: "alternate table on table",
    kind: "still",
    cells: [
        "O..O..",
        "OOOO..",
        "......",
        "..OOOO",
        "..O..O"
    ]
},
{
    name: "table on table",
    kind: "still",
    cells: [
        "O..O",
        "OOOO",
        "....",
        "OOOO",
        "O..O"
    ]
},
{
    name: "long long ship",
    kind: "still",
    cells: [
        "OO...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...OO"
    ]
},
{
    name: "tub with tail",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        ".O.O.",
        "...O.",
        "...OO"
    ]
},
{
    name: "long long boat",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...OO"
    ]
},
{
    name: "boat-ship-tie",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        ".OO...",
        "...OO.",
        "...O.O",
        "....O.",
]
},
{
    name: "hat",
    kind: "still",
    cells: [
        "..O..",
        ".O.O.",
        ".O.O.",
        "OO.OO"
    ]
},
{
    name: "trans-boat with tail",
    kind: "still",
    cells: [
        "OO...",
        "O.O..",
        ".O.O.",
        "...O.",
        "...OO"
    ]
},
{
    name: "bi-pond",
    kind: "still",
    cells: [
        ".OO....",
        "O..O...",
        "O..O...",
        ".OO.OO.",
        "...O..O",
        "...O..O",
        "....OO."
    ]
},
{
    name: "big S",
    kind: "still",
    cells: [
        "....OO.",
        "...O..O",
        "...O.OO",
        "OO.O...",
        "O..O...",
        ".OO...."
    ]
},
{
    name: "snake bridge snake",
    kind: "still",
    cells: [
        "....OO",
        "....O.",
        ".....O",
        "....OO",
        "OO.O..",
        "O.OO.."
    ]
},
{
    name: "carrier siamese snake",
    kind: "still",
    cells: [
        "OO.OO..",
        "O.OO..O",
        ".....OO"
    ]
},
{
    name: "snake siamese snake",
    kind: "still",
    cells: [
        "OO.OO.O",
        "O.OO.OO"
    ]
},
{
    name: "canoe",
    kind: "still",
    cells: [
        "...OO",
        "....O",
        "...O.",
        "O.O..",
        "OO..."
    ]
},
{
    name: "extra extra long snake",
    kind: "still",
    cells: [
        "OO......",
        "O.O.....",
        "...O....",
        "....O...",
        ".....O.O",
        "......OO"
    ]
},
{
    name: "extra long snake",
    kind: "still",
    cells: [
        "OO.....",
        "O.O....",
        "...O...",
        "....O.O",
        ".....OO"
    ]
},
{
    name: "long long snake",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        "...O.O",
        "....OO"
    ]
},
{
    name: "long snake",
    kind: "still",
    cells: [
        "OO...",
        "O.O.O",
        "...OO"
    ]
},
{
    name: "snake",
    kind: "still",
    cells: [
        "OO.O",
        "O.OO"
    ]
},
{
    name: "boat-tie",
    kind: "still",
    cells: [
        ".O....",
        "O.O...",
        ".OO...",
        "...OO.",
        "...O.O",
        "....O.",
]
},
{
    name: "integral sign",
    kind: "still",
    cells: [
        "...OO",
        "..O.O",
        "..O..",
        "O.O..",
        "OO..."
    ]
},
{
    name: "shillelagh",
    kind: "still",
    cells: [
        "OO...",
        "O..OO",
        ".OO.O"
    ]
},
{
    name: "long ship",
    kind: "still",
    cells: [
        "OO..",
        "O.O.",
        ".O.O",
        "..OO"
    ]
},
{
    name: "paperclip",
    kind: "still",
    cells: [
        "..OO.",
        ".O..O",
        ".O.OO",
        "OO.O.",
        "O..O.",
        ".OO.."
    ]
},
{
    name: "aircraft carrier aka carrier",
    kind: "still",
    cells: [
        "OO..",
        "O..O",
        "..OO"
    ]
},
{
    name: "long barge",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...O."
    ]
},
{
    name: "mango aka cigar",
    kind: "still",
    cells: [
        ".OO..",
        "O..O.",
        ".O..O",
        "..OO."
    ]
},
{
    name: "bi-loaf 1 aka half bakery aka loaf on loaf",
    kind: "still",
    cells: [
        ".O.....",
        "O.O....",
        "O..O...",
        ".OO.O..",
        "...O.O.",
        "...O..O",
        "....OO."
    ]
},
{
    name: "barge",
    kind: "still",
    cells: [
        ".O..",
        "O.O.",
        ".O.O",
        "..O."
    ]
},
{
    name: "ship-tie",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        ".OO...",
        "...OO.",
        "...O.O",
        "....OO",
]
},
{
    name: "long boat",
    kind: "still",
    cells: [
        ".O..",
        "O.O.",
        ".O.O",
        "..OO"
    ]
},
{
    name: "ship",
    kind: "still",
    cells: [
        "OO.",
        "O.O",
        ".OO"
    ]
},
{
    name: "prepond",
    kind: "still", // eventually turns into a pond
    cells: [
        ".O.",
        "OO.",
        "..O"
    ]
},
{
    name: "tub",
    kind: "still",
    cells: [
        ".O.",
        "O.O",
        ".O."
    ]
},
{
    name: "boat",
    kind: "still",
    cells: [
        "OO.",
        "O.O",
        ".O."
    ]
},
{
    name: "loaf",
    kind: "still",
    cells: [
        ".OO.",
        "O..O",
        ".O.O",
        "..O."
    ]
},
{
    name: "tumbler",
    kind: "oscillator",
    cells: [
        ".O.....O.",
        "O.O...O.O",
        "O..O.O..O",
        "..O...O..",
        "..OO.OO.."
    ]
},
{
    name: "blinker puffer 1",
    kind: "puffer",
    cells: [
        "...O.....",
        ".O...O...",
        "O........",
        "O....O...",
        "OOOOO....",
        ".........",
        ".........",
        ".........",
        ".OO......",
        "OO.OOO...",
        ".OOOO....",
        "..OO.....",
        ".........",
        ".....OO..",
        "...O....O",
        "..O......",
        "..O.....O",
        "..OOOOOO."
    ]
},
{
    name: "46P4H1V0",
    kind: "spaceship",
    cells: [
        "...O...........O...",
        "...O...........O...",
        "..O.O.........O.O..",
        "...................",
        ".O...O.......O...O.",
        ".O.OOOOOO.OOOOOO.O.",
        "O.......O.O.......O",
        "O.......O.O.......O",
        "O.................O",
        ".O.OO.OO...OO.OO.O."
    ]
},
{
    name: "44P5H2V0",
    kind: "spaceship",
    cells: [
        "....O.....O....",
        "...OOO...OOO...",
        "..O..O...O..O..",
        ".OOO.......OOO.",
        "..O.O.....O.O..",
        "....OO...OO....",
        "O....O...O....O",
        ".....O...O.....",
        "OO...O...O...OO",
        "..O..O...O..O..",
        "....O.....O...."
    ]
    // Leaves two blocks at the wall
},
{
    name: "x66",
    kind: "spaceship",
    cells: [
        "..O......",
        "OO.......",
        "O..OOO..O",
        "O....OOO.",
        ".OOO..OO.",
        ".........",
        ".OOO..OO.",
        "O....OOO.",
        "O..OOO..O",
        "OO.......",
        "..O......",
    ]
},
{
    name: "weekender",
    kind: "spaceship",
    cells: [
        ".O............O.",
        ".O............O.",
        "O.O..........O.O",
        ".O............O.",
        ".O............O.",
        "..O...OOOO...O..",
        "......OOOO......",
        "..OOOO....OOOO..",
        "................",
        "....O......O....",
        ".....OO..OO....."
    ]
},
{
    name: "turtle",
    kind: "spaceship",
    cells: [
        ".OOO.......O",
        ".OO..O.OO.OO",
        "...OOO....O.",
        ".O..O.O...O.",
        "O....O....O.",
        "O....O....O.",
        ".O..O.O...O.",
        "...OOO....O.",
        ".OO..O.OO.OO",
        ".OOO.......O",
]
},
{
    name: "sidecar",
    kind: "spaceship",
    cells: [
        ".O......",
        "O.....O.",
        "O.....O.",
        "OOOOO.O.",
        "........",
        "....OO..",
        "..O....O",
        ".O......",
        ".O.....O",
        ".OOOOOO."
    ]
},
{
    name: "schick engine",
    kind: "spaceship",
    cells: [
        ".O..O...............",
        "O...................",
        "O...O...............",
        "OOOO.........OO.....",
        "......OOO.....OO....",
        "......OO.OO......OOO",
        "......OOO.....OO....",
        "OOOO.........OO.....",
        "O...O...............",
        "O...................",
        ".O..O...............",
]
},
{
    name: "pushalong 1",
    kind: "spaceship",
    cells: [
        "...O.......",
        ".O..O......",
        "O...O......",
        "O...O......",
        "OO.O.......",
        ".....OO....",
        "..O..OO....",
        "....O......",
        ".......OOO.",
        "......OOOOO",
        ".....OO.OOO",
        "......OO..."
    ]
},
{
    name: "pufferfish",
    kind: "puffer",
    cells: [
        "...O.......O...",
        "..OOO.....OOO..",
        ".OO..O...O..OO.",
        "...OOO...OOO...",
        "...............",
        "....O.....O....",
        "..O..O...O..O..",
        "O.....O.O.....O",
        "OO....O.O....OO",
        "......O.O......",
        "...O.O...O.O...",
        "....O.....O...."
    ]
},
{
    name: "orion 2",
    kind: "spaceship",
    cells: [
        ".OO..........",
        "OO...........",
        "..O..........",
        "....O....OOO.",
        "....OOO....OO",
        ".....OOO.O.O.",
        "............O",
        ".....O.O.....",
        "....OO.O.....",
        ".....O.......",
        "...OO.O......",
        "......O......",
        "....OO......."
    ]
},
{
    name: "orion",
    kind: "spaceship",
    cells: [
        "...OO.........",
        "...O.O........",
        "...O..........",
        "OO.O..........",
        "O....O........",
        "O.OO......OOO.",
        ".....OOO....OO",
        "......OOO.O.O.",
        ".............O",
        "......O.O.....",
        ".....OO.O.....",
        "......O.......",
        "....OO.O......",
        ".......O......",
        ".....OO......."
    ]
},
{
    name: "hivenudger",
    kind: "spaceship",
    cells: [
        "OOOO.....O..O",
        "O...O...O....",
        "O.......O...O",
        ".O..O...OOOO.",
        ".............",
        ".....OO......",
        ".....OO......",
        ".....OO......",
        ".............",
        ".O..O...OOOO.",
        "O.......O...O",
        "O...O...O....",
        "OOOO.....O..O",
]
},
{
    name: "edge-repair spaceship 1",
    kind: "spaceship",
    cells: [
        "........O.......",
        ".......OOOO.....",
        "..O...O...OO.OO.",
        ".OOOO.....O..OO.",
        "O...O.......O..O",
        ".O.O..O.........",
        ".....O.........."
    ]
},
{
    name: "dart",
    kind: "spaceship",
    cells: [
        ".......O.......",
        "......O.O......",
        ".....O...O.....",
        "......OOO......",
        "...............",
        "....OO...OO....",
        "..O...O.O...O..",
        ".OO...O.O...OO.",
        "O.....O.O.....O",
        ".O.OO.O.O.OO.O."
    ]
},
{
    name: "crab",
    kind: "spaceship",
    cells: [
        "........OO...",
        ".......OO....",
        ".........O...",
        "...........OO",
        "..........O..",
        ".............",
        ".........O..O",
        ".OO.....OO...",
        "OO.....O.....",
        "..O....O.O...",
        "....OO..O....",
        "....OO......."
    ]
},
{
    name: "coe ship",
    kind: "spaceship",
    cells: [
        "....OOOOOO",
        "..OO.....O",
        "OO.O.....O",
        "....O...O.",
        "......O...",
        "......OO..",
        ".....OOOO.",
        ".....OO.OO",
        ".......OO."
    ]
},
{
    name: "canada goose",
    kind: "spaceship",
    cells: [
        "OOO..........",
        "O.........OO.",
        ".O......OOO.O",
        "...OO..OO....",
        "....O........",
        "........O....",
        "....OO...O...",
        "...O.O.OO....",
        "...O.O..O.OO.",
        "..O....OO....",
        "..OO.........",
        "..OO........."
    ]
},
{
    name: "b29",
    kind: "spaceship",
    cells: [
        "...OO...",
        "..OO....",
        "....O...",
        "......OO",
        ".....O..",
        "........",
        "....O..O",
        ".OO.O...",
        "OO....O.",
        "..O.O..O",
        ".......O",
        "....O..O",
        ".....O.O",
        ".....O.O",
        "......OO",
        "......O."
    ]
},
{
    name: "37P4H1V0",
    kind: "spaceship",
    cells: [
        ".O.................",
        ".O........O........",
        "O.O.....O...O......",
        "........O...OO.....",
        ".....O.OO.....OO...",
        ".OOOOOO..O......O..",
        "..OO......O...OOO..",
        "..........O...O.OO.",
        ".............O.....",
        "..................O",
        ".................O.",
        ".................O."
    ]
},
{
    name: "30P5H2V0",
    kind: "spaceship",
    cells: [
        "....O........",
        "...OOO.......",
        "..OO.OO......",
        ".............",
        ".O.O.O.O..O..",
        "OO...O...OOO.",
        "OO...O......O",
        "..........O.O",
        "........O.O..",
        ".........O..O",
        "............O"
    ]
},
{
    name: "25P3H1V0.2",
    kind: "spaceship",
    cells: [
        ".......OO.O.....",
        "....OO.O.OO.OOO.",
        ".OOOO..OO......O",
        "O....O...O...OO.",
        ".OO............."
    ]
},
{
    name: "queen bee shuttle",
    kind: "oscillator",
    cells: [
        ".........O............",
        ".......O.O............",
        "......O.O.............",
        "OO...O..O...........OO",
        "OO....O.O...........OO",
        ".......O.O............",
        ".........O............"
    ]
},
{
    name: "pentoad",
    kind: "oscillator",
    cells: [
        "...........OO",
        "...........O.",
        ".........O.O.",
        ".........OO..",
        ".....OO......",
        "......O......",
        "......O......",
        "......OO.....",
        "..OO.........",
        ".O.O.........",
        ".O...........",
        "OO..........."
    ]
},
{
    name: "elkies' p5",
    kind: "oscillator",
    cells: [
        ".O.......",
        "O..OOO...",
        "..O......",
        "...O.O..O",
        "..OO.OOOO",
        "....O....",
        "....O.O..",
        ".....OO.."
    ]
},
{
    name: "eater/block frop",
    kind: "oscillator",
    cells: [
        ".OO.......",
        "..O.......",
        "..O.O.....",
        "...O.O....",
        ".....OO.OO",
        "........OO",
        "..OO......",
        "...O......",
        "OOO.......",
        "O........."
    ]
},
{
    name: "confused eaters",
    kind: "oscillator",
    cells: [
        "O..........",
        "OOO........",
        "...O.......",
        "..O........",
        "..O..O.....",
        ".....O.....",
        "...O.O.....",
        "...OO..OO..",
        ".......O.O.",
        ".........O.",
        ".........OO"
    ]
},
{
    name: "two pulsar quadrants",
    kind: "oscillator",
    cells: [
        "....O....",
        "....O....",
        "...OO....",
        "..O......",
        "O..O..OOO",
        "O...O.O..",
        "O....O...",
        ".........",
        "..OOO...."
    ]
},
{
    name: "spark coil",
    kind: "oscillator",
    cells: [
        "OO....OO",
        "O.O..O.O",
        "..O..O..",
        "O.O..O.O",
        "OO....OO"
    ]
},
{
    name: "pulsar quadrant",
    kind: "oscillator",
    cells: [
        ".....O..",
        "...OOO..",
        "..O...OO",
        "O..O..O.",
        "O...O.O.",
        "O....O..",
        "........",
        "..OOO..."
    ]
},
{
    name: "monogram",
    kind: "oscillator",
    cells: [
        "OO...OO",
        ".O.O.O.",
        ".OO.OO.",
        ".O.O.O.",
        "OO...OO"
    ]
},
{
    name: "french kiss",
    kind: "oscillator",
    cells: [
        "O.........",
        "OOO.......",
        "...O......",
        "..O..OO...",
        "..O....O..",
        "...OO..O..",
        "......O...",
        ".......OOO",
        ".........O"
    ]
},
{
    name: "cuphook",
    kind: "oscillator",
    cells: [
        "....OO...",
        "OO.O.O...",
        "OO.O.....",
        "...O.....",
        "...O..O..",
        "....OO.O.",
        ".......O.",
        ".......OO"
    ]
},
{
    name: "cis-boat and long hook eating tub",
    kind: "oscillator",
    cells: [
        ".....O.....",
        ".O.OO.O.OO.",
        "O.O...O.O.O",
        ".O....O..O.",
        ".....OO...."
    ]
},
{
    name: "beehive and long hook eating tub",
    kind: "oscillator",
    cells: [
        ".....O...O.",
        ".O.OO.O.O.O",
        "O.O...O.O.O",
        ".O....O..O.",
        ".....OO...."
    ]
},
{
    name: "achim's p8",
    kind: "oscillator",
    cells: [
        ".OO......",
        "O........",
        ".O...O...",
        ".O...OO..",
        "...O.O...",
        "..OO...O.",
        "...O...O.",
        "........O",
        "......OO."
    ]
},
{
    name: "smiley",
    kind: "oscillator",
    cells: [
        "OOO.OOO",
        ".O.O.O.",
        ".......",
        ".O...O.",
        ".......",
        "O.O.O.O",
        "..O.O.."
    ]
},
{
    name: "fumarole",
    kind: "oscillator",
    cells: [
        "...OO...",
        ".O....O.",
        ".O....O.",
        ".O....O.",
        "..O..O..",
        "O.O..O.O",
        "OO....OO"
    ]
},
{
    name: "silver's p5",
    kind: "oscillator",
    cells: [
        "OO.........",
        "O..........",
        ".O..O......",
        "...OO......",
        "...O...O.OO",
        "..O....OO.O",
        "..OO......."
    ]
},
{
    name: "griddle and beehive",
    kind: "oscillator",
    cells: [
        "...O..",
        ".O.O..",
        "O....O",
        "OOOOOO",
        "......",
        "..OO..",
        ".O..O.",
        "..OO.."
    ]
},
{
    name: "coe's p8",
    kind: "oscillator",
    cells: [
        "OO..........",
        "OO..OO......",
        ".....OO.....",
        "....O..O....",
        ".......O..OO",
        ".....O.O..OO"
    ]
},
{
    name: "almosymmetric",
    kind: "oscillator",
    cells: [
        "....O....",
        "OO..O.O..",
        "O.O......",
        ".......OO",
        ".O.......",
        "O......O.",
        "OO.O.O...",
        ".....O..."
    ]
},
{
    name: "unix",
    kind: "oscillator",
    cells: [
        ".OO.....",
        ".OO.....",
        "........",
        ".O......",
        "O.O.....",
        "O..O..OO",
        "....O.OO",
        "..OO...."
    ]
},
{
    name: "trans-block and long hook eating tub",
    kind: "oscillator",
    cells: [
        ".....O....",
        ".O.OO.O...",
        "O.O...O...",
        ".O....O.OO",
        ".....OO.OO"
    ]
},
{
    name: "skewed quad",
    kind: "oscillator",
    cells: [
        ".OO....",
        ".O...OO",
        "..O.O.O",
        ".......",
        "O.O.O..",
        "OO...O.",
        "....OO."
    ]
},
{
    name: "quad",
    kind: "oscillator",
    cells: [
        "OO..OO",
        "O..O.O",
        ".O....",
        "....O.",
        "O.O..O",
        "OO..OO"
    ]
},
{
    name: "short keys",
    kind: "oscillator",
    cells: [
        ".O........O.",
        "O.OOO..OOO.O",
        ".O..O..O..O.",
        "....O..O...."
    ]
},
{
    name: "odd keys",
    kind: "oscillator",
    cells: [
        "..........O.",
        ".O.......O.O",
        "O.OOO..OO.O.",
        ".O..O..O....",
        "....O..O...."
    ]
},
{
    name: "octagon 2",
    kind: "oscillator",
    cells: [
        "...OO...",
        "..O..O..",
        ".O....O.",
        "O......O",
        "O......O",
        ".O....O.",
        "..O..O..",
        "...OO..."
    ]
},
{
    name: "griddle and boat",
    kind: "oscillator",
    cells: [
        "...O..",
        ".O.O..",
        "O....O",
        "OOOOOO",
        "......",
        "..OO..",
        ".O.O..",
        "..O..."
    ]
},
{
    name: "four Boats",
    kind: "oscillator",
    cells: [
        "...O....",
        "..O.O...",
        ".O..O...",
        "O....OO.",
        ".OO....O",
        "...O..O.",
        "...O.O..",
        "....O..."
    ]
},
{
    name: "candlefrobra",
    kind: "oscillator",
    cells: [
        ".....O....",
        ".O.OO.O.OO",
        "O.O...O.OO",
        ".O....O...",
        ".....OO..."
    ]
},
{
    name: "bent keys",
    kind: "oscillator",
    cells: [
        ".O........O.",
        "O.O......O.O",
        ".O.OO..OO.O.",
        "....O..O....",
        "....O..O...."
    ]
},
{
    name: "21P2",
    kind: "oscillator",
    cells: [
        "...O...",
        ".OOO...",
        "O.....O",
        "O.OOOOO",
        ".O.....",
        "....O..",
        "...OO.."
    ]
},
{
    name: "nivasch's pseudo-barberpole",
    kind: "oscillator",
    cells: [
        "..........OO.",
        "OO.........O.",
        "O........O...",
        "..OO...O.O...",
        ".............",
        "...O.O.O.....",
        ".............",
        ".....O.O.O...",
        ".............",
        "...O.O...OO..",
        "...O........O",
        ".O.........OO",
        ".OO.........."
    ]
},
{
    name: "pseudo-barberpole",
    kind: "oscillator",
    cells: [
        "..........OO",
        "...........O",
        ".........O..",
        ".......O.O..",
        "............",
        ".....O.O....",
        "............",
        "...O.O......",
        "............",
        "..OO........",
        "O...........",
        "OO.........."
    ]
},
{
    name: "tub test tube baby",
    kind: "oscillator",
    cells: [
        ".O......O.",
        "O.O....O.O",
        ".O.O..O.O.",
        "...O..O...",
        "...O..O...",
        "....OO...."
    ]
},
{
    name: "odd test tube baby",
    kind: "oscillator",
    cells: [
        ".......O.",
        "OO....O.O",
        "O.O..O.O.",
        "..O..O...",
        "..O..O...",
        "...OO...."
    ]
},
{
    name: "muttering moat 1",
    kind: "oscillator",
    cells: [
        "OO.....",
        "O...OO.",
        ".O.O.O.",
        ".......",
        ".OO..O.",
        "...O..O",
        ".....OO"
    ]
},
{
    name: "griddle and block",
    kind: "oscillator",
    cells: [
        "...O..",
        ".O.O..",
        "O....O",
        "OOOOOO",
        "......",
        "..OO..",
        "..OO.."
    ]
},
{
    name: "blinkers bit pole",
    kind: "oscillator",
    cells: [
        ".....OO",
        "OOO.O.O",
        ".......",
        ".O.O..O",
        "O....O.",
        "OO...O."
    ]
},
{
    name: "two eaters",
    kind: "oscillator",
    cells: [
        "OO.......",
        ".O.......",
        ".O.O.....",
        "..OO.....",
        ".....OO..",
        ".....O.O.",
        ".......O.",
        ".......OO"
    ]
},
{
    name: "test tube baby",
    kind: "oscillator",
    cells: [
        "OO....OO",
        "O.O..O.O",
        "..O..O..",
        "..O..O..",
        "...OO..."
    ]
},
{
    name: "eater plug",
    kind: "oscillator",
    cells: [
        ".......O",
        ".....OOO",
        "....O...",
        ".....O..",
        "..O..O..",
        ".O.OO...",
        ".O......",
        "OO......"
    ]
},
{
    name: "beacon and two tails",
    kind: "oscillator",
    cells: [
        "OO.....",
        "O......",
        "...O.OO",
        "..OO.O.",
        ".....O.",
        "..OOO..",
        "..O...."
    ]
},
{
    name: "trice tongs",
    kind: "oscillator",
    cells: [
        "..O....",
        "..OOO..",
        "OO...O.",
        ".O.O.O.",
        ".O.....",
        "..OO..O",
        ".....OO"
    ]
},
{
    name: "jam",
    kind: "oscillator",
    cells: [
        "...OO.",
        "..O..O",
        "O..O.O",
        "O...O.",
        "O.....",
        "...O..",
        ".OO..."
    ]
},
{
    name: "heptapole",
    kind: "oscillator",
    cells: [
        "OO........",
        "O.O.......",
        "..........",
        "..O.O.....",
        "..........",
        "....O.O...",
        "..........",
        "......O.O.",
        ".........O",
        "........OO"
    ]
},
{
    name: "why not",
    kind: "oscillator",
    cells: [
        "...O...",
        "...O.O.",
        ".O.....",
        "O.OOOOO",
        ".O.....",
        "...O.O.",
        "...O..."
    ]
},
{
    name: "by flops aka butterfly",
    kind: "oscillator",
    cells: [
        "...O..",
        ".O.O..",
        ".....O",
        "OOOOO.",
        ".....O",
        ".O.O..",
        "...O.."
    ]
},
{
    name: "phoenix 1 aka flip-flops",
    kind: "oscillator",
    cells: [
        "...O....",
        "...O.O..",
        ".O......",
        "......OO",
        "OO......",
        "......O.",
        "..O.O...",
        "....O..."
    ]
},
{
    name: "pentadecathlon",
    kind: "oscillator",
    cells: [
        "..O....O..",
        "OO.OOOO.OO",
        "..O....O.."
    ]
},
{
    name: "mold",
    kind: "oscillator",
    cells: [
        "...OO.",
        "..O..O",
        "O..O.O",
        "....O.",
        "O.OO..",
        ".O...."
    ]
},
{
    name: "mazing",
    kind: "oscillator",
    cells: [
        "...OO..",
        ".O.O...",
        "O.....O",
        ".O...OO",
        ".......",
        "...O.O.",
        "....O.."
    ]
},
{
    name: "hexapole",
    kind: "oscillator",
    cells: [
        "OO.......",
        "O.O......",
        ".........",
        "..O.O....",
        ".........",
        "....O.O..",
        ".........",
        "......O.O",
        ".......OO"
    ]
},
{
    name: "fox",
    kind: "oscillator",
    cells: [
        "....O..",
        "....O..",
        "..O..O.",
        "OO.....",
        "....O.O",
        "..O.O.O",
        "......O"
    ]
},
{
    name: "figure eight",
    kind: "oscillator",
    cells: [
        "OOO...",
        "OOO...",
        "OOO...",
        "...OOO",
        "...OOO",
        "...OOO"
    ]
},
{
    name: "caterer",
    kind: "oscillator",
    cells: [
        "..O.....",
        "O...OOOO",
        "O...O...",
        "O.......",
        "...O....",
        ".OO....."
    ]
},
{
    name: "pentapole",
    kind: "oscillator",
    cells: [
        "OO......",
        "O.O.....",
        "........",
        "..O.O...",
        "........",
        "....O.O.",
        ".......O",
        "......OO"
    ]
},
{
    name: "quadpole",
    kind: "oscillator",
    cells: [
        "OO.....",
        "O.O....",
        ".......",
        "..O.O..",
        ".......",
        "....O.O",
        ".....OO"
    ]
},
{
    name: "tripole",
    kind: "oscillator",
    cells: [
        "OO....",
        "O.O...",
        "......",
        "..O.O.",
        ".....O",
        "....OO"
    ]
},
{
    name: "bipole",
    kind: "oscillator",
    cells: [
        "OO...",
        "O.O..",
        ".....",
        "..O.O",
        "...OO"
    ]
},
{
    name: "toad",
    kind: "oscillator",
    cells: [
        ".OOO",
        "OOO."
    ]
},
{
    name: "clock",
    kind: "oscillator",
    cells: [
        "..O.",
        "O.O.",
        ".O.O",
        ".O.."
    ]
},
{
    name: "beacon",
    kind: "oscillator",
    cells: [
        "OO..",
        "O...",
        "...O",
        "..OO"
    ]
},
{
    name: "HWSS",
    kind: "spaceship",
    cells: [
        "...OO..",
        ".O....O",
        "O......",
        "O.....O",
        "OOOOOO."
    ]
},
{
    name: "MWSS",
    kind: "spaceship",
    cells: [
        "...O..",
        ".O...O",
        "O.....",
        "O....O",
        "OOOOO."
    ]
    // Turns to a half-pulsar at the wall
},
{
    name: "LWSS",
    kind: "spaceship",
    cells: [
        ".O..O",
        "O....",
        "O...O",
        "OOOO."
    ]
    // Turns to a glider at the wall
},
{
    name: "loafer",
    kind: "spaceship",
    cells: [
        ".OO..O.OO",
        "O..O..OO.",
        ".O.O.....",
        "..O......",
        "........O",
        "......OOO",
        ".....O...",
        "......O..",
        ".......OO"
    ]
},
{
    name: "L-tetromino",
    kind: "still", // eventually turns into a beehive
    cells: [
        "OOO",
        "O.."
    ]
},
{
    name: "blinker",
    kind: "oscillator",
    cells: [
        "OOO"
    ]
},
{
    name: "glider",
    kind: "spaceship",
    cells: [
        "OOO",
        "..O",
        ".O."
    ]
},
{
    name: "R-pentomino",
    kind: "methuselah",
    cells: [
        ".OO",
        "OO.",
        ".O."
    ]
    // Added by zorg's request
},
];

// TODO: look into shapes on the wall / in the corner
// TODO: find some oscillators that can be cut in half
// TODO: ? find more shapes that can be cut in half, maybe with a bigger killbox
// TODO: don't spawn the very first block near the walls ?
// TODO: don't spawn the very first block near the walls ?
