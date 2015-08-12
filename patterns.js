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
    new LifePattern([
        "OO",
        "OO"
    ]),
    new LifePattern([
        "OOO"
    ]),
    new LifePattern([
        "OOO",
        "..O",
        ".O."
    ]),

];

var patterns2 = [
    // R-pentomino, by zorg's request
    new LifePattern([
        ".OO",
        "OO.",
        ".O."
    ]),
];
