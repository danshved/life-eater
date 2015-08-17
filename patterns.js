// patterns.js
// A collection of Life patterns that can be spawned on the field during the
// game.
function LifePattern(rawPattern) {
    // Copy the simple data
    this.kind = rawPattern.kind;

    // Copy the pattern itself
    this.sizeY = rawPattern.cells.length;
    this.sizeX = rawPattern.cells[0].length;
    this.cells = [];

    for(var x = 0; x < this.sizeX; x++) {
        for(var y = 0; y < this.sizeY; y++) {
            this.cells.push(rawPattern.cells[y][x] != '.');
        }
    }

    // Determine the bounding box
    if(this.kind == 'still') {
        this.box = { x: this.sizeX, y: this.sizeY };
    }
}

LifePattern.prototype.cellAt = function(x, y) {
    return this.cells[x * this.sizeY + y];
}

// Which length the snake must have to kill this pattern.
// Applies only to still lifes and oscillators.
LifePattern.prototype.killLength = function() {
    return 2 * (this.box.x + this.box.y) + 5;
}

var blockPattern = new LifePattern({
    name: "block",
    kind: "still",
    cells: [
        "OO",
        "OO"
    ]
});

var patterns = [ blockPattern,
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "snorkel loop",
    kind: "still",
    cells: [
        "..OO..",
        ".O..O.",
        "..O.O.",
        "O.O.OO",
        "OO...."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "cis-loaf with tail",
    kind: "still",
    cells: [
        "...OO.",
        "..O..O",
        ".O.O.O",
        ".O..O.",
        "OO...."
    ]
}),
new LifePattern({
    name: "symmetric scorpion",
    kind: "still",
    cells: [
        "...O...",
        ".OOOOO.",
        "O.....O",
        "O.O.O.O",
        ".OO.OO."
    ]
}),
new LifePattern({
    name: "claw with tail",
    kind: "still",
    cells: [
        "OO....",
        ".O....",
        ".O.OO.",
        "..O..O",
        "....OO"
    ]
}),
new LifePattern({
    name: "eleven loop",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        "O..O.",
        ".O.O.",
        "OO.OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "hook with tail",
    kind: "still",
    cells: [
        "OO...",
        ".O...",
        ".O.OO",
        "..O.O"
    ]
}),
new LifePattern({
    name: "load siamese loaf",
    kind: "still",
    cells: [
        "..OO.",
        ".O..O",
        "O.O.O",
        "O..O.",
        ".OO.."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "boat with long tail",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        ".O..OO",
        "..OO.O"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "long long shillelagh",
    kind: "still",
    cells: [
        ".....OO",
        "OO..O.O",
        "O..O...",
        ".OO...."
    ]
}),
new LifePattern({
    name: "long shillelagh",
    kind: "still",
    cells: [
        "OO..OO",
        "O..O.O",
        ".OO..."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "block and two walls",
    kind: "still",
    cells: [
        "OO.OO",
        "OO.O.",
        "...O.",
        "OOO..",
        "O...."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "cis-shillelagh",
    kind: "still",
    cells: [
        "....OO",
        ".....O",
        "OO..O.",
        "O..O..",
        ".OO..."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "cis-rotated hook",
    kind: "still",
    cells: [
        ".OO....",
        "..O..OO",
        "O.O.O.O",
        "Oo..O..",
        "....OO."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "bookends",
    kind: "still",
    cells: [
        "OO...OO",
        "O.O.O.O",
        "..O.O..",
        ".OO.OO."
    ]
}),
new LifePattern({
    name: "dead spark coil",
    kind: "still",
    cells: [
        "OO...OO",
        "O.O.O.O",
        "..O.O..",
        "O.O.O.O",
        "OO...OO"
    ]
}),
new LifePattern({
    name: "trans-mirrored R-bee",
    kind: "still",
    cells: [
        ".....O.",
        ".OO.O.O",
        "O.O.O.O",
        "O.O.OO.",
        ".O....."
    ]
}),
new LifePattern({
    name: "cis-boat with tail",
    kind: "still",
    cells: [
        "...OO",
        "...O.",
        "OO.O.",
        "O.O..",
        ".O..."
    ]
}),
new LifePattern({
    name: "fourteener",
    kind: "still",
    cells: [
        "....OO.",
        "OO..O.O",
        "O.....O",
        ".OOOOO.",
        "...O..."
    ]
}),
new LifePattern({
    name: "loop",
    kind: "still",
    cells: [
        ".OO..",
        "O..O.",
        ".O.O.",
        "OO.OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "beehive with tail",
    kind: "still",
    cells: [
        ".OO...",
        "O..O..",
        ".OO.O.",
        "....O.",
        "....OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "twin hat",
    kind: "still",
    cells: [
        "..O...O..",
        ".O.O.O.O.",
        ".O.O.O.O.",
        "OO.O.O.OO",
        "....O...."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "block on table",
    kind: "still",
    cells: [
        "..OO",
        "..OO",
        "....",
        "OOOO",
        "O..O"
    ]
}),
new LifePattern({
    name: "moose antlers",
    kind: "still",
    cells: [
        "OO.....OO",
        "O.......O",
        ".OOO.OOO.",
        "...O.O...",
        "....O...."
    ]
}),
new LifePattern({
    name: "cis-mirrored R-bee",
    kind: "still",
    cells: [
        ".OO.OO.",
        "O.O.O.O",
        "O.O.O.O",
        ".O...O."
    ]
}),
new LifePattern({
    name: "alternate table on table",
    kind: "still",
    cells: [
        "O..O..",
        "OOOO..",
        "......",
        "..OOOO",
        "..O..O"
    ]
}),
new LifePattern({
    name: "table on table",
    kind: "still",
    cells: [
        "O..O",
        "OOOO",
        "....",
        "OOOO",
        "O..O"
    ]
}),
new LifePattern({
    name: "long long ship",
    kind: "still",
    cells: [
        "OO...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...OO"
    ]
}),
new LifePattern({
    name: "tub with tail",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        ".O.O.",
        "...O.",
        "...OO"
    ]
}),
new LifePattern({
    name: "long long boat",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "hat",
    kind: "still",
    cells: [
        "..O..",
        ".O.O.",
        ".O.O.",
        "OO.OO"
    ]
}),
new LifePattern({
    name: "trans-boat with tail",
    kind: "still",
    cells: [
        "OO...",
        "O.O..",
        ".O.O.",
        "...O.",
        "...OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "carrier siamese snake",
    kind: "still",
    cells: [
        "OO.OO..",
        "O.OO..O",
        ".....OO"
    ]
}),
new LifePattern({
    name: "snake siamese snake",
    kind: "still",
    cells: [
        "OO.OO.O",
        "O.OO.OO"
    ]
}),
new LifePattern({
    name: "canoe",
    kind: "still",
    cells: [
        "...OO",
        "....O",
        "...O.",
        "O.O..",
        "OO..."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "extra long snake",
    kind: "still",
    cells: [
        "OO.....",
        "O.O....",
        "...O...",
        "....O.O",
        ".....OO"
    ]
}),
new LifePattern({
    name: "long long snake",
    kind: "still",
    cells: [
        "OO....",
        "O.O...",
        "...O.O",
        "....OO"
    ]
}),
new LifePattern({
    name: "long snake",
    kind: "still",
    cells: [
        "OO...",
        "O.O.O",
        "...OO"
    ]
}),
new LifePattern({
    name: "snake",
    kind: "still",
    cells: [
        "OO.O",
        "O.OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "integral sign",
    kind: "still",
    cells: [
        "...OO",
        "..O.O",
        "..O..",
        "O.O..",
        "OO..."
    ]
}),
new LifePattern({
    name: "shillelagh",
    kind: "still",
    cells: [
        "OO...",
        "O..OO",
        ".OO.O"
    ]
}),
new LifePattern({
    name: "long ship",
    kind: "still",
    cells: [
        "OO..",
        "O.O.",
        ".O.O",
        "..OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "aircraft carrier aka carrier",
    kind: "still",
    cells: [
        "OO..",
        "O..O",
        "..OO"
    ]
}),
new LifePattern({
    name: "long barge",
    kind: "still",
    cells: [
        ".O...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...O."
    ]
}),
new LifePattern({
    name: "mango aka cigar",
    kind: "still",
    cells: [
        ".OO..",
        "O..O.",
        ".O..O",
        "..OO."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "barge",
    kind: "still",
    cells: [
        ".O..",
        "O.O.",
        ".O.O",
        "..O."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "long boat",
    kind: "still",
    cells: [
        ".O..",
        "O.O.",
        ".O.O",
        "..OO"
    ]
}),
new LifePattern({
    name: "ship",
    kind: "still",
    cells: [
        "OO.",
        "O.O",
        ".OO"
    ]
}),
new LifePattern({
    name: "prepond",
    kind: "still", // eventually turns into a pond
    cells: [
        ".O.",
        "OO.",
        "..O"
    ]
}),
new LifePattern({
    name: "tub",
    kind: "still",
    cells: [
        ".O.",
        "O.O",
        ".O."
    ]
}),
new LifePattern({
    name: "boat",
    kind: "still",
    cells: [
        "OO.",
        "O.O",
        ".O."
    ]
}),
new LifePattern({
    name: "loaf",
    kind: "still",
    cells: [
        ".OO.",
        "O..O",
        ".O.O",
        "..O."
    ]
}),
new LifePattern({
    name: "tumbler",
    kind: "oscillator",
    cells: [
        ".O.....O.",
        "O.O...O.O",
        "O..O.O..O",
        "..O...O..",
        "..OO.OO.."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "25P3H1V0.2",
    kind: "spaceship",
    cells: [
        ".......OO.O.....",
        "....OO.O.OO.OOO.",
        ".OOOO..OO......O",
        "O....O...O...OO.",
        ".OO............."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "spark coil",
    kind: "oscillator",
    cells: [
        "OO....OO",
        "O.O..O.O",
        "..O..O..",
        "O.O..O.O",
        "OO....OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "monogram",
    kind: "oscillator",
    cells: [
        "OO...OO",
        ".O.O.O.",
        ".OO.OO.",
        ".O.O.O.",
        "OO...OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "cis-boat and long hook eating tub",
    kind: "oscillator",
    cells: [
        ".....O.....",
        ".O.OO.O.OO.",
        "O.O...O.O.O",
        ".O....O..O.",
        ".....OO...."
    ]
}),
new LifePattern({
    name: "beehive and long hook eating tub",
    kind: "oscillator",
    cells: [
        ".....O...O.",
        ".O.OO.O.O.O",
        "O.O...O.O.O",
        ".O....O..O.",
        ".....OO...."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "trans-block and long hook eating tub",
    kind: "oscillator",
    cells: [
        ".....O....",
        ".O.OO.O...",
        "O.O...O...",
        ".O....O.OO",
        ".....OO.OO"
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "short keys",
    kind: "oscillator",
    cells: [
        ".O........O.",
        "O.OOO..OOO.O",
        ".O..O..O..O.",
        "....O..O...."
    ]
}),
new LifePattern({
    name: "odd keys",
    kind: "oscillator",
    cells: [
        "..........O.",
        ".O.......O.O",
        "O.OOO..OO.O.",
        ".O..O..O....",
        "....O..O...."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "candlefrobra",
    kind: "oscillator",
    cells: [
        ".....O....",
        ".O.OO.O.OO",
        "O.O...O.OO",
        ".O....O...",
        ".....OO..."
    ]
}),
new LifePattern({
    name: "bent keys",
    kind: "oscillator",
    cells: [
        ".O........O.",
        "O.O......O.O",
        ".O.OO..OO.O.",
        "....O..O....",
        "....O..O...."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "test tube baby",
    kind: "oscillator",
    cells: [
        "OO....OO",
        "O.O..O.O",
        "..O..O..",
        "..O..O..",
        "...OO..."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "pentadecathlon",
    kind: "oscillator",
    cells: [
        "..O....O..",
        "OO.OOOO.OO",
        "..O....O.."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
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
}),
new LifePattern({
    name: "bipole",
    kind: "oscillator",
    cells: [
        "OO...",
        "O.O..",
        ".....",
        "..O.O",
        "...OO"
    ]
}),
new LifePattern({
    name: "toad",
    kind: "oscillator",
    cells: [
        ".OOO",
        "OOO."
    ]
}),
new LifePattern({
    name: "clock",
    kind: "oscillator",
    cells: [
        "..O.",
        "O.O.",
        ".O.O",
        ".O.."
    ]
}),
new LifePattern({
    name: "beacon",
    kind: "oscillator",
    cells: [
        "OO..",
        "O...",
        "...O",
        "..OO"
    ]
}),
new LifePattern({
    name: "HWSS",
    kind: "spaceship",
    cells: [
        "...OO..",
        ".O....O",
        "O......",
        "O.....O",
        "OOOOOO."
    ]
}),
new LifePattern({
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
}),
new LifePattern({
    name: "LWSS",
    kind: "spaceship",
    cells: [
        ".O..O",
        "O....",
        "O...O",
        "OOOO."
    ]
    // Turns to a glider at the wall
}),
new LifePattern({
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
}),
new LifePattern({
    name: "L-tetromino",
    kind: "still", // eventually turns into a beehive
    cells: [
        "OOO",
        "O.."
    ]
}),
new LifePattern({
    name: "blinker",
    kind: "oscillator",
    cells: [
        "OOO"
    ]
}),
new LifePattern({
    name: "glider",
    kind: "spaceship",
    cells: [
        "OOO",
        "..O",
        ".O."
    ]
}),
new LifePattern({
    name: "R-pentomino",
    kind: "methuselah",
    cells: [
        ".OO",
        "OO.",
        ".O."
    ]
    // Added by zorg's request
}),
];

// TODO: look into shapes on the wall / in the corner
// TODO: find some oscillators that can be cut in half
// TODO: ? find more shapes that can be cut in half, maybe with a bigger killbox
// TODO: don't spawn the very first block near the walls ?
// TODO: don't spawn the very first block near the walls ?
