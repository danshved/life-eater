// Pattern database. Defines the object ``patterns'' which makes it
// easy to choose patterns to spawn based on the current game difficulty.
function LifePattern(rawPattern) {
    this.sizeY = rawPattern.cells.length;
    this.sizeX = rawPattern.cells[0].length;
    this.cells = [];

    for(var x = 0; x < this.sizeX; x++) {
        for(var y = 0; y < this.sizeY; y++) {
            this.cells.push(rawPattern.cells[y][x] != '.');
        }
    }
}

LifePattern.prototype.cellAt = function(x, y) {
    return this.cells[x * this.sizeY + y];
}

patterns = [];

patterns.length = rawPatterns.length;
for(var i = 0; i < rawPatterns.length; i++) {
    patterns[i] = new LifePattern(rawPatterns[i]);
}
