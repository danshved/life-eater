// patterns.js
// A collection of Life patterns that can be spawned on the field during the
// game

function LifePattern(charImage) {
    this.sizeY = charImage.length;
    this.sizeX = charImage[0].length;
    this.cells = [];

    for(var x = 0; x < this.sizeX; x++) {
        for(var y = 0; y < this.sizeY; y++) {
            this.cells.push(charImage[y][x] != '.');
        }
    }
}

LifePattern.prototype.cellAt = function(x, y) {
    return this.cells[x * this.sizeY + y];
}

var patterns = [
    // Block (still)
    new LifePattern([
        "OO",
        "OO"
    ]),
    // Beehive at beehive (still)
    new LifePattern([
        "....O.",
        "...O.O",
        "...O.O",
        ".OO.O.",
        "O..O..",
        ".OO..."
    ]),
    // Ship on long boat (still)
    new LifePattern([
        "OO.....",
        "O.O....",
        ".OO....",
        "...OO..",
        "...O.O.",
        "....O.O",
        ".....O."
    ]),
    // Cis-R-bee and R-loaf (still)
    new LifePattern([
        ".OO.",
        "O..O",
        ".OOO",
        "....",
        ".OOO",
        "O..O",
        "O.O.",
        ".O.."
    ]),
    // Beehive with nine (still)
    new LifePattern([
        ".OO....",
        "O..O...",
        ".OO.O..",
        "....O..",
        "....O.O",
        ".....OO"
    ]),
    // Beehive bend tail (still)
    new LifePattern([
        ".OO..",
        "O..O.",
        ".OO.O",
        "....O",
        ".OOO.",
        ".O..."
    ]),
    // Ortho-loaf and table (still)
    new LifePattern([
        "..O..",
        ".O.O.",
        ".O..O",
        "..OO.",
        ".....",
        "OOOO.",
        "O..O."
    ]),
    // Trans-boat with nine (still)
    new LifePattern([
        "OO....",
        "O.O...",
        ".O....",
        "..OOO.",
        ".....O",
        "....OO"
    ]),
    // Beehive and cap (still)
    new LifePattern([
        ".OO..",
        "O..O.",
        "OOOO.",
        ".....",
        "..OO.",
        ".O..O",
        "..OO."
    ]),
    // Long long barge (still)
    new LifePattern([
        ".O....",
        "O.O...",
        ".O.O..",
        "..O.O.",
        "...O.O",
        "....O."
    ]),
    // Trans-barge with tail (still)
    new LifePattern([
        "OO....",
        ".O....",
        ".O.O..",
        "..O.O.",
        "...O.O",
        "....O."
    ]),
    // Snorkel loop (stil)
    new LifePattern([
        "..OO..",
        ".O..O.",
        "..O.O.",
        "O.O.OO",
        "OO...."
    ]),
    // Beehive and table (still)
    new LifePattern([
        "..OO.",
        ".O..O",
        "..OO.",
        ".....",
        "OOOO.",
        "O..O."
    ]),
    // Cis-boat and table (still)
    new LifePattern([
        ".O..",
        "O.O.",
        "OO..",
        "....",
        "OOOO",
        "O..O"
    ]),
    // R-bee and snake (still)
    new LifePattern([
        "OO.O.",
        "O.OO.",
        ".....",
        ".OOO.",
        ".O..O",
        "..OO."
    ]),
    // Eater on boat (still)
    new LifePattern([
        ".OO..",
        ".O.O.",
        "...O.",
        "...OO",
        ".OO..",
        "O.O..",
        ".O..."
    ]),
    // Trans-boat and dock (still)
    new LifePattern([
        ".O....",
        "O.O...",
        ".OO...",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]),
    // Long long canoe (still)
    new LifePattern([
        ".....OO",
        "......O",
        ".....O.",
        "....O..",
        "...O...",
        "O.O....",
        "OO....."
    ]),
    // Long canoe (still)
    new LifePattern([
        "....OO",
        ".....O",
        "....O.",
        "...O..",
        "O.O...",
        "OO...."
    ]),
    // Trans-rotated R-bee (still)
    new LifePattern([
        ".O.....",
        "O.O....",
        "O.O....",
        ".OO.OO.",
        "....O.O",
        "....O.O",
        ".....O."
    ]),
    // Bee hat (still)
    new LifePattern([
        ".OO...",
        "O..O..",
        ".OO.O.",
        "..O.O.",
        "O.O.OO",
        "OO...."
    ]),
    // Cis-loaf with tail (still)
    new LifePattern([
        "...OO.",
        "..O..O",
        ".O.O.O",
        ".O..O.",
        "OO...."
    ]),
    // Symmetric scorpion (still)
    new LifePattern([
        "...O...",
        ".OOOOO.",
        "O.....O",
        "O.O.O.O",
        ".OO.OO."
    ]),
    // Claw with tail (still)
    new LifePattern([
        "OO....",
        ".O....",
        ".O.OO.",
        "..O..O",
        "....OO"
    ]),
    // Eleven loop (still)
    new LifePattern([
        ".O...",
        "O.O..",
        "O..O.",
        ".O.O.",
        "OO.OO"
    ]),
    // Long integral (still)
    new LifePattern([
        "..OO",
        ".O.O",
        ".O..",
        "..O.",
        "O.O.",
        "OO.."
    ]),
    // Hook with tail (still)
    new LifePattern([
        "OO...",
        ".O...",
        ".O.OO",
        "..O.O"
    ]),
    // Load siamese loaf (still)
    new LifePattern([
        "..OO.",
        ".O..O",
        "O.O.O",
        "O..O.",
        ".OO.."
    ]),
    // Tub with long tail (still)
    new LifePattern([
        ".O..",
        "O.O.",
        ".O.O",
        "...O",
        "..O.",
        "..OO"
    ]),
    // Beehive at loaf (still)
    new LifePattern([
        "....O.",
        "...O.O",
        "...O.O",
        ".OO.O.",
        "O..O..",
        "O.O...",
        ".O...."
    ]),
    // Cis-hook and R-bee (still)
    new LifePattern([
        "..OO",
        "O..O",
        "OOO.",
        "....",
        "OOO.",
        "O..O",
        ".OO."
    ]),
    // Boat with long tail (still)
    new LifePattern([
        "OO....",
        "O.O...",
        ".O..OO",
        "..OO.O"
    ]),
    // Trans-R-bee and R-loaf (still)
    new LifePattern([
        "..OO.",
        ".O..O",
        ".OOO.",
        ".....",
        ".OOO.",
        "O..O.",
        "O.O..",
        ".O..."
    ]),
    // Long long shillelagh (still)
    new LifePattern([
        ".....OO",
        "OO..O.O",
        "O..O...",
        ".OO...."
    ]),
    // Long shillelagh (still)
    new LifePattern([
        "OO..OO",
        "O..O.O",
        ".OO..."
    ]),
    // Integral with tub (still)
    new LifePattern([
        "OO....",
        "O.O...",
        "..O...",
        "..O.O.",
        "...O.O",
        "....O."
    ]),
    // Cis-block and long hook (still)
    new LifePattern([
        "...OO",
        "O...O",
        "OOOO.",
        ".....",
        "..OO.",
        "..OO."
    ]),
    // Eater siamese eater (still)
    new LifePattern([
        "OO..",
        "O.O.",
        "..O.",
        "..OO",
        "...O",
        "OOO.",
        "O..."
    ]),
    // Cis-boat and dock (still)
    new LifePattern([
        "..O...",
        ".O.O..",
        ".OO...",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]),
    // Block and two walls (still)
    new LifePattern([
        "OO.OO",
        "OO.O.",
        "...O.",
        "OOO..",
        "O...."
    ]),
    // Trans-hook and R-bee (still)
    new LifePattern([
        "...OO",
        ".O..O",
        ".OOO.",
        ".....",
        ".OOO.",
        "O..O.",
        ".OO.."
    ]),
    // Mirrored dock (still)
    new LifePattern([
        "OO..OO",
        "O....O",
        ".OOOO.",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]),
    // Cis-shillelagh (still)
    new LifePattern([
        "....OO",
        ".....O",
        "OO..O.",
        "O..O..",
        ".OO..."
    ]),
    // Trans-block and long hook (still)
    new LifePattern([
        "...OO",
        "O...O",
        "OOOO.",
        ".....",
        "OO...",
        "OO..."
    ]),
    // Cis-rotated hook (still)
    new LifePattern([
        ".OO....",
        "..O..OO",
        "O.O.O.O",
        "Oo..O..",
        "....OO."
    ]),
    // Trans-loaf with tail (still)
    new LifePattern([
        "OO....",
        ".O....",
        ".O.OO.",
        "..O..O",
        "...O.O",
        "....O."
    ]),
    // Block and cap (still)
    new LifePattern([
        ".OO.",
        "O..O",
        "OOOO",
        "....",
        "OO..",
        "OO.."
    ]),
    // Elevener (still)
    new LifePattern([
        "....OO",
        "...O.O",
        "...O..",
        ".OOO..",
        "O.....",
        "OO...."
    ]),
    // Bookends (still)
    new LifePattern([
        "OO...OO",
        "O.O.O.O",
        "..O.O..",
        ".OO.OO."
    ]),
    // Dead spark coil (still)
    new LifePattern([
        "OO...OO",
        "O.O.O.O",
        "..O.O..",
        "O.O.O.O",
        "OO...OO"
    ]),
    // Trans-mirrored R-bee (still)
    new LifePattern([
        ".....O.",
        ".OO.O.O",
        "O.O.O.O",
        "O.O.OO.",
        ".O....."
    ]),
    // Cis-boat with tail (still)
    new LifePattern([
        "...OO",
        "...O.",
        "OO.O.",
        "O.O..",
        ".O..."
    ]),
    // Fourteener (still)
    new LifePattern([
        "....OO.",
        "OO..O.O",
        "O.....O",
        ".OOOOO.",
        "...O..."
    ]),
    // Loop (still)
    new LifePattern([
        ".OO..",
        "O..O.",
        ".O.O.",
        "OO.OO"
    ]),
    // Scorpion (still)
    new LifePattern([
        "...O...",
        ".OOO...",
        "O...OO.",
        "O.O.O.O",
        ".OO.O.O",
        ".....O."
    ]),
    // Beehive with tail (still)
    new LifePattern([
        ".OO...",
        "O..O..",
        ".OO.O.",
        "....O.",
        "....OO"
    ]),
    // Beehive and dock (still)
    new LifePattern([
        "...OO.",
        "..O..O",
        "...OO.",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]),
    // Twin hat (still)
    new LifePattern([
        "..O...O..",
        ".O.O.O.O.",
        ".O.O.O.O.",
        "OO.O.O.OO",
        "....O...."
    ]),
    // Block and dock (still)
    new LifePattern([
        "...OO.",
        "...OO.",
        "......",
        ".OOOO.",
        "O....O",
        "OO..OO"
    ]),
    // Block on table (still)
    new LifePattern([
        "..OO",
        "..OO",
        "....",
        "OOOO",
        "O..O"
    ]),
    // Moose antlers (still)
    new LifePattern([
        "OO.....OO",
        "O.......O",
        ".OOO.OOO.",
        "...O.O...",
        "....O...."
    ]),
    // Cis-mirrored R-bee (still)
    new LifePattern([
        ".OO.OO.",
        "O.O.O.O",
        "O.O.O.O",
        ".O...O."
    ]),
    // Alternate table on table (still)
    new LifePattern([
        "O..O..",
        "OOOO..",
        "......",
        "..OOOO",
        "..O..O"
    ]),
    // Table on table (still)
    new LifePattern([
        "O..O",
        "OOOO",
        "....",
        "OOOO",
        "O..O"
    ]),
    // Long long ship (still)
    new LifePattern([
        "OO...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...OO"
    ]),
    // Tub with tail (still)
    new LifePattern([
        ".O...",
        "O.O..",
        ".O.O.",
        "...O.",
        "...OO"
    ]),
    // Long long boat (still)
    new LifePattern([
        ".O...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...OO"
    ]),
    // Boat-ship-tie (still)
    new LifePattern([
        "OO....",
        "O.O...",
        ".OO...",
        "...OO.",
        "...O.O",
        "....O.",
    ]),
    // Hat (still)
    new LifePattern([
        "..O..",
        ".O.O.",
        ".O.O.",
        "OO.OO"
    ]),
    // Trans-boat with tail (still)
    new LifePattern([
        "OO...",
        "O.O..",
        ".O.O.",
        "...O.",
        "...OO"
    ]),
    // Bi-pond (still)
    new LifePattern([
        ".OO....",
        "O..O...",
        "O..O...",
        ".OO.OO.",
        "...O..O",
        "...O..O",
        "....OO."
    ]),
    // Big S (still)
    new LifePattern([
        "....OO.",
        "...O..O",
        "...O.OO",
        "OO.O...",
        "O..O...",
        ".OO...."
    ]),
    // Snake bridge snake (still)
    new LifePattern([
        "....OO",
        "....O.",
        ".....O",
        "....OO",
        "OO.O..",
        "O.OO.."
    ]),
    // Carrier siamese snake (still)
    new LifePattern([
        "OO.OO..",
        "O.OO..O",
        ".....OO"
    ]),
    // Snake siamese snake (still)
    new LifePattern([
        "OO.OO.O",
        "O.OO.OO"
    ]),
    // Canoe (still)
    new LifePattern([
        "...OO",
        "....O",
        "...O.",
        "O.O..",
        "OO..."
    ]),
    // Extra extra long snake (still)
    new LifePattern([
        "OO......",
        "O.O.....",
        "...O....",
        "....O...",
        ".....O.O",
        "......OO"
    ]),
    // Extra long snake (still)
    new LifePattern([
        "OO.....",
        "O.O....",
        "...O...",
        "....O.O",
        ".....OO"
    ]),
    // Long long snake (still)
    new LifePattern([
        "OO....",
        "O.O...",
        "...O.O",
        "....OO"
    ]),
    // Long snake (still)
    new LifePattern([
        "OO...",
        "O.O.O",
        "...OO"
    ]),
    // Snake (still)
    new LifePattern([
        "OO.O",
        "O.OO"
    ]),
    // Boat-tie (still)
    new LifePattern([
        ".O....",
        "O.O...",
        ".OO...",
        "...OO.",
        "...O.O",
        "....O.",
    ]),
    // Integral sign (still)
    new LifePattern([
        "...OO",
        "..O.O",
        "..O..",
        "O.O..",
        "OO..."
    ]),
    // Shillelagh (still)
    new LifePattern([
        "OO...",
        "O..OO",
        ".OO.O"
    ]),
    // Long ship (still)
    new LifePattern([
        "OO..",
        "O.O.",
        ".O.O",
        "..OO"
    ]),
    // Paperclip (still)
    new LifePattern([
        "..OO.",
        ".O..O",
        ".O.OO",
        "OO.O.",
        "O..O.",
        ".OO.."
    ]),
    // Aircraft carrier aka carrier (still)
    new LifePattern([
        "OO..",
        "O..O",
        "..OO"
    ]),
    // Long barge (still)
    new LifePattern([
        ".O...",
        "O.O..",
        ".O.O.",
        "..O.O",
        "...O."
    ]),
    // Mango aka cigar (still)
    new LifePattern([
        ".OO..",
        "O..O.",
        ".O..O",
        "..OO."
    ]),
    // Bi-loaf 1 aka half bakery aka loaf on loaf (still)
    new LifePattern([
        ".O.....",
        "O.O....",
        "O..O...",
        ".OO.O..",
        "...O.O.",
        "...O..O",
        "....OO."
    ]),
    // Barge (still)
    new LifePattern([
        ".O..",
        "O.O.",
        ".O.O",
        "..O."
    ]),
    // Ship-tie (still)
    new LifePattern([
        "OO....",
        "O.O...",
        ".OO...",
        "...OO.",
        "...O.O",
        "....OO",
    ]),
    // Long boat (still)
    new LifePattern([
        ".O..",
        "O.O.",
        ".O.O",
        "..OO"
    ]),
    // Ship (still)
    new LifePattern([
        "OO.",
        "O.O",
        ".OO"
    ]),
    // Pond (still, eventually)
    // The starting shape is known as a prepond
    new LifePattern([
        ".O.",
        "OO.",
        "..O"
    ]),
    // Tub (still)
    new LifePattern([
        ".O.",
        "O.O",
        ".O."
    ]),
    // Boat (still)
    new LifePattern([
        "OO.",
        "O.O",
        ".O."
    ]),
    // Loaf (still)
    new LifePattern([
        ".OO.",
        "O..O",
        ".O.O",
        "..O."
    ]),
    // Tumbler (oscillator)
    new LifePattern([
        ".O.....O.",
        "O.O...O.O",
        "O..O.O..O",
        "..O...O..",
        "..OO.OO.."
    ]),
    // Blinker puffer 1 (puffer)
    new LifePattern([
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
    ]),
    // 46P4H1V0 (spaceship)
    new LifePattern([
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
    ]),
    // 44P5H2V0 (spaceship)
    // Leaves two blocks at the wall
    new LifePattern([
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
    ]),
    // X66 (spaceship)
    new LifePattern([
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
    ]),
    // Weekender (spaceship)
    // Disappears at the wall
    new LifePattern([
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
    ]),
    // Turtle (spaceship)
    new LifePattern([
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
    ]),
    // Sidecar (spaceship)
    new LifePattern([
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
    ]),
    // Schick engine (spaceship)
    new LifePattern([
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
    ]),
    // Pushalong 1 (spaceship)
    new LifePattern([
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
    ]),
    // Pufferfish (puffer)
    new LifePattern([
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
    ]),
    // Orion 2 (spaceship)
    new LifePattern([
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
    ]),
    // Orion (spaceship)
    new LifePattern([
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
    ]),
    // Hivenudger (spaceship)
    new LifePattern([
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
    ]),
    // Edge-repair spaceship 1 (spaceship)
    new LifePattern([
        "........O.......",
        ".......OOOO.....",
        "..O...O...OO.OO.",
        ".OOOO.....O..OO.",
        "O...O.......O..O",
        ".O.O..O.........",
        ".....O.........."
    ]),
    // Dart (spaceship)
    new LifePattern([
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
    ]),
    // Crab (spaceship)
    new LifePattern([
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
    ]),
    // Coe ship (spaceship)
    new LifePattern([
        "....OOOOOO",
        "..OO.....O",
        "OO.O.....O",
        "....O...O.",
        "......O...",
        "......OO..",
        ".....OOOO.",
        ".....OO.OO",
        ".......OO."
    ]),
    // Canada goose (spaceship)
    new LifePattern([
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
    ]),
    // B29 (spaceship)
    new LifePattern([
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
    ]),
    // 37P4H1V0 (spaceship)
    new LifePattern([
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
    ]),
    // 30P5H2V0 (spaceship)
    new LifePattern([
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
    ]),
    // 25P3H1V0.2 (spaceship)
    new LifePattern([
        ".......OO.O.....",
        "....OO.O.OO.OOO.",
        ".OOOO..OO......O",
        "O....O...O...OO.",
        ".OO............."
    ]),
    // Queen bee shuttle (oscillator)
    new LifePattern([
        ".........O............",
        ".......O.O............",
        "......O.O.............",
        "OO...O..O...........OO",
        "OO....O.O...........OO",
        ".......O.O............",
        ".........O............"
    ]),
    // Pentoad (oscillator)
    new LifePattern([
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
    ]),
    // Elkies' p5 (oscillator)
    new LifePattern([
        ".O.......",
        "O..OOO...",
        "..O......",
        "...O.O..O",
        "..OO.OOOO",
        "....O....",
        "....O.O..",
        ".....OO.."
    ]),
    // Eater/block frop (oscillator)
    new LifePattern([
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
    ]),
    // Confused eaters (oscillator)
    new LifePattern([
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
    ]),
    // Two pulsar quadrants (oscillator)
    new LifePattern([
        "....O....",
        "....O....",
        "...OO....",
        "..O......",
        "O..O..OOO",
        "O...O.O..",
        "O....O...",
        ".........",
        "..OOO...."
    ]),
    // Spark coil (oscillator)
    new LifePattern([
        "OO....OO",
        "O.O..O.O",
        "..O..O..",
        "O.O..O.O",
        "OO....OO"
    ]),
    // Pulsar quadrant (oscillator)
    new LifePattern([
        ".....O..",
        "...OOO..",
        "..O...OO",
        "O..O..O.",
        "O...O.O.",
        "O....O..",
        "........",
        "..OOO..."
    ]),
    // Monogram (oscillator)
    new LifePattern([
        "OO...OO",
        ".O.O.O.",
        ".OO.OO.",
        ".O.O.O.",
        "OO...OO"
    ]),
    // French kiss (oscillator)
    new LifePattern([
        "O.........",
        "OOO.......",
        "...O......",
        "..O..OO...",
        "..O....O..",
        "...OO..O..",
        "......O...",
        ".......OOO",
        ".........O"
    ]),
    // Cuphook (oscillator)
    new LifePattern([
        "....OO...",
        "OO.O.O...",
        "OO.O.....",
        "...O.....",
        "...O..O..",
        "....OO.O.",
        ".......O.",
        ".......OO"
    ]),
    // Cis-boat and long hook eating tub (oscillator)
    new LifePattern([
        ".....O.....",
        ".O.OO.O.OO.",
        "O.O...O.O.O",
        ".O....O..O.",
        ".....OO...."
    ]),
    // Beehive and long hook eating tub (oscillator)
    new LifePattern([
        ".....O...O.",
        ".O.OO.O.O.O",
        "O.O...O.O.O",
        ".O....O..O.",
        ".....OO...."
    ]),
    // Achim's p8 (oscillator)
    new LifePattern([
        ".OO......",
        "O........",
        ".O...O...",
        ".O...OO..",
        "...O.O...",
        "..OO...O.",
        "...O...O.",
        "........O",
        "......OO."
    ]),
    // Smiley (oscillator)
    new LifePattern([
        "OOO.OOO",
        ".O.O.O.",
        ".......",
        ".O...O.",
        ".......",
        "O.O.O.O",
        "..O.O.."
    ]),
    // Fumarole (oscillator)
    new LifePattern([
        "...OO...",
        ".O....O.",
        ".O....O.",
        ".O....O.",
        "..O..O..",
        "O.O..O.O",
        "OO....OO"
    ]),
    // Silver's p5 (oscillator)
    new LifePattern([
        "OO.........",
        "O..........",
        ".O..O......",
        "...OO......",
        "...O...O.OO",
        "..O....OO.O",
        "..OO......."
    ]),
    // Griddle and beehive (oscillator)
    new LifePattern([
        "...O..",
        ".O.O..",
        "O....O",
        "OOOOOO",
        "......",
        "..OO..",
        ".O..O.",
        "..OO.."
    ]),
    // Coe's p8 (oscillator)
    new LifePattern([
        "OO..........",
        "OO..OO......",
        ".....OO.....",
        "....O..O....",
        ".......O..OO",
        ".....O.O..OO"
    ]),
    // Almosymmetric (oscillator)
    new LifePattern([
        "....O....",
        "OO..O.O..",
        "O.O......",
        ".......OO",
        ".O.......",
        "O......O.",
        "OO.O.O...",
        ".....O..."
    ]),
    // Unix (oscillator)
    new LifePattern([
        ".OO.....",
        ".OO.....",
        "........",
        ".O......",
        "O.O.....",
        "O..O..OO",
        "....O.OO",
        "..OO...."
    ]),
    // Trans-block and long hook eating tub (oscillator)
    new LifePattern([
        ".....O....",
        ".O.OO.O...",
        "O.O...O...",
        ".O....O.OO",
        ".....OO.OO"
    ]),
    // Skewed quad (oscillator)
    new LifePattern([
        ".OO....",
        ".O...OO",
        "..O.O.O",
        ".......",
        "O.O.O..",
        "OO...O.",
        "....OO."
    ]),
    // Quad (oscillator)
    new LifePattern([
        "OO..OO",
        "O..O.O",
        ".O....",
        "....O.",
        "O.O..O",
        "OO..OO"
    ]),
    // Short keys (oscillator)
    new LifePattern([
        ".O........O.",
        "O.OOO..OOO.O",
        ".O..O..O..O.",
        "....O..O...."
    ]),
    // Odd keys (oscillator)
    new LifePattern([
        "..........O.",
        ".O.......O.O",
        "O.OOO..OO.O.",
        ".O..O..O....",
        "....O..O...."
    ]),
    // Octagon 2 (oscillator)
    new LifePattern([
        "...OO...",
        "..O..O..",
        ".O....O.",
        "O......O",
        "O......O",
        ".O....O.",
        "..O..O..",
        "...OO..."
    ]),
    // Griddle and boat (oscillator)
    new LifePattern([
        "...O..",
        ".O.O..",
        "O....O",
        "OOOOOO",
        "......",
        "..OO..",
        ".O.O..",
        "..O..."
    ]),
    // Four Boats (oscillator)
    new LifePattern([
        "...O....",
        "..O.O...",
        ".O..O...",
        "O....OO.",
        ".OO....O",
        "...O..O.",
        "...O.O..",
        "....O..."
    ]),
    // Candlefrobra (oscillator)
    new LifePattern([
        ".....O....",
        ".O.OO.O.OO",
        "O.O...O.OO",
        ".O....O...",
        ".....OO..."
    ]),
    // Bent keys (oscillator)
    new LifePattern([
        ".O........O.",
        "O.O......O.O",
        ".O.OO..OO.O.",
        "....O..O....",
        "....O..O...."
    ]),
    // 21P2 (oscillator)
    new LifePattern([
        "...O...",
        ".OOO...",
        "O.....O",
        "O.OOOOO",
        ".O.....",
        "....O..",
        "...OO.."
    ]),
    // Nivasch's pseudo-barberpole (oscillator)
    new LifePattern([
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
    ]),
    // Pseudo-barberpole (oscillator)
    new LifePattern([
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
    ]),
    // Tub test tube baby (oscillator)
    new LifePattern([
        ".O......O.",
        "O.O....O.O",
        ".O.O..O.O.",
        "...O..O...",
        "...O..O...",
        "....OO...."
    ]),
    // Odd test tube baby (oscillator)
    new LifePattern([
        ".......O.",
        "OO....O.O",
        "O.O..O.O.",
        "..O..O...",
        "..O..O...",
        "...OO...."
    ]),
    // Muttering moat 1 (oscillator)
    new LifePattern([
        "OO.....",
        "O...OO.",
        ".O.O.O.",
        ".......",
        ".OO..O.",
        "...O..O",
        ".....OO"
    ]),
    // Griddle and block (oscillator)
    new LifePattern([
        "...O..",
        ".O.O..",
        "O....O",
        "OOOOOO",
        "......",
        "..OO..",
        "..OO.."
    ]),
    // Blinkers bit pole (oscillator)
    new LifePattern([
        ".....OO",
        "OOO.O.O",
        ".......",
        ".O.O..O",
        "O....O.",
        "OO...O."
    ]),
    // Two eaters (oscillator)
    new LifePattern([
        "OO.......",
        ".O.......",
        ".O.O.....",
        "..OO.....",
        ".....OO..",
        ".....O.O.",
        ".......O.",
        ".......OO"
    ]),
    // Test tube baby (oscillator)
    new LifePattern([
        "OO....OO",
        "O.O..O.O",
        "..O..O..",
        "..O..O..",
        "...OO..."
    ]),
    // Eater plug (oscillator)
    new LifePattern([
        ".......O",
        ".....OOO",
        "....O...",
        ".....O..",
        "..O..O..",
        ".O.OO...",
        ".O......",
        "OO......"
    ]),
    // Beacon and two tails (oscillator)
    new LifePattern([
        "OO.....",
        "O......",
        "...O.OO",
        "..OO.O.",
        ".....O.",
        "..OOO..",
        "..O...."
    ]),
    // Trice tongs (oscillator)
    new LifePattern([
        "..O....",
        "..OOO..",
        "OO...O.",
        ".O.O.O.",
        ".O.....",
        "..OO..O",
        ".....OO"
    ]),
    // Jam (oscillator)
    new LifePattern([
        "...OO.",
        "..O..O",
        "O..O.O",
        "O...O.",
        "O.....",
        "...O..",
        ".OO..."
    ]),
    // Heptapole (oscillator)
    new LifePattern([
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
    ]),
    // Why not (oscillator)
    new LifePattern([
        "...O...",
        "...O.O.",
        ".O.....",
        "O.OOOOO",
        ".O.....",
        "...O.O.",
        "...O..."
    ]),
    // By flops aka butterfly (oscillator)
    new LifePattern([
        "...O..",
        ".O.O..",
        ".....O",
        "OOOOO.",
        ".....O",
        ".O.O..",
        "...O.."
    ]),
    // Phoenix 1 aka flip-flops (oscillator)
    new LifePattern([
        "...O....",
        "...O.O..",
        ".O......",
        "......OO",
        "OO......",
        "......O.",
        "..O.O...",
        "....O..."
    ]),
    // Pentadecathlon (oscillator)
    new LifePattern([
        "..O....O..",
        "OO.OOOO.OO",
        "..O....O.."
    ]),
    // Mold (oscillator)
    new LifePattern([
        "...OO.",
        "..O..O",
        "O..O.O",
        "....O.",
        "O.OO..",
        ".O...."
    ]),
    // Mazing (oscillator)
    new LifePattern([
        "...OO..",
        ".O.O...",
        "O.....O",
        ".O...OO",
        ".......",
        "...O.O.",
        "....O.."
    ]),
    // Hexapole (oscillator)
    new LifePattern([
        "OO.......",
        "O.O......",
        ".........",
        "..O.O....",
        ".........",
        "....O.O..",
        ".........",
        "......O.O",
        ".......OO"
    ]),
    // Fox (oscillator)
    new LifePattern([
        "....O..",
        "....O..",
        "..O..O.",
        "OO.....",
        "....O.O",
        "..O.O.O",
        "......O"
    ]),
    // Figure eight (oscillator)
    new LifePattern([
        "OOO...",
        "OOO...",
        "OOO...",
        "...OOO",
        "...OOO",
        "...OOO"
    ]),
    // Caterer (oscillator)
    new LifePattern([
        "..O.....",
        "O...OOOO",
        "O...O...",
        "O.......",
        "...O....",
        ".OO....."
    ]),
    // Pentapole (oscillator)
    new LifePattern([
        "OO......",
        "O.O.....",
        "........",
        "..O.O...",
        "........",
        "....O.O.",
        ".......O",
        "......OO"
    ]),
    // Quadpole (oscillator)
    new LifePattern([
        "OO.....",
        "O.O....",
        ".......",
        "..O.O..",
        ".......",
        "....O.O",
        ".....OO"
    ]),
    // Tripole (oscillator)
    new LifePattern([
        "OO....",
        "O.O...",
        "......",
        "..O.O.",
        ".....O",
        "....OO"
    ]),
    // Bipole (oscillator)
    new LifePattern([
        "OO...",
        "O.O..",
        ".....",
        "..O.O",
        "...OO"
    ]),
    // Toad (oscillator)
    new LifePattern([
        ".OOO",
        "OOO."
    ]),
    // Clock (oscillator)
    new LifePattern([
        "..O.",
        "O.O.",
        ".O.O",
        ".O.."
    ]),
    // Beacon (oscillator)
    new LifePattern([
        "OO..",
        "O...",
        "...O",
        "..OO"
    ]),
    // Heavyweight spaceship aka HWSS (spaceship)
    new LifePattern([
        "...OO..",
        ".O....O",
        "O......",
        "O.....O",
        "OOOOOO."
    ]),
    // Middleweight spaceship aka MWSS (spaceship)
    // Turns to a half-pulsar at the wall
    new LifePattern([
        "...O..",
        ".O...O",
        "O.....",
        "O....O",
        "OOOOO."
    ]),
    // Lightweight spaceship aka LWSS aka small fish (spaceship)
    // Turns to a glider at the wall
    new LifePattern([
        ".O..O",
        "O....",
        "O...O",
        "OOOO."
    ]),
    // Loafer (spaceship)
    new LifePattern([
        ".OO..O.OO",
        "O..O..OO.",
        ".O.O.....",
        "..O......",
        "........O",
        "......OOO",
        ".....O...",
        "......O..",
        ".......OO"
    ]),
    // Beehive (still, eventually)
    new LifePattern([
        "OOO",
        "O.."
    ]),
    // Blinker (oscillator)
    new LifePattern([
        "OOO"
    ]),
    // Glider (spaceship)
    new LifePattern([
        "OOO",
        "..O",
        ".O."
    ]),
    // R-pentomino, by zorg's request
    new LifePattern([
        ".OO",
        "OO.",
        ".O."
    ]),
];
// TODO: look into shapes on the wall / in the corner
// TODO: find some oscillators that can be cut in half
