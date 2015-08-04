var game = new Phaser.Game(640, 360, Phaser.AUTO, '',
    { preload: preload, create: create});

// Top-left corner of the game field
var FIELD_X = 20;
var FIELD_Y = 0;

// Size of a cell on the game field (cells are squares)
var CELL_SIZE = 12;

// Field size, in cells
var SIZE_X = 50;
var SIZE_Y = 30;

// Delay between life ticks, in milliseconds
var TICK_DELAY = 300;

var life = {
    // SIZE_X * SIZE_Y booleans. true/false = alive/dead cell.
    cells: [],

    // Values of cells in the previous tick
    oldCells: [],

    // SIZE_X * SIZE_Y sprites to display cells.
    sprites: [],

    // Initialize Life
    create: function() {
        var grp = game.add.spriteBatch();

        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                // Initialize cells with random values
                this.cells.push(!game.rnd.between(0, 4));
                this.oldCells.push(false);

                // Create sprites to display cells and their death/birth animations
                var sprite = grp.create(FIELD_X + CELL_SIZE * x, FIELD_Y + CELL_SIZE * y,
                    'life');
                sprite.animations.add('die', [0, 1, 2, 3], 9, false);
                sprite.animations.add('appear', [3, 2, 1, 0], 9, false);
                sprite.visible = false;
                this.sprites.push(sprite);
            }
        }
    },

    // Read the cell at the given position
    cellAt: function(x, y) {
        return this.cells[x * SIZE_Y + y];
    },

    // Write the cell at the given position
    setCellAt: function(x, y, val) {
        this.cells[x * SIZE_Y + y] = val;
    },

    // Read the previous cell value at the given position
    oldCellAt: function(x, y) {
        return this.oldCells[x * SIZE_Y + y];
    },

    // Make a step according to the rules of the automaton.
    // Updates cells/oldCells, but doesn't touch the sprites.
    tick: function() {
        // Swap cells and oldCells
        var tmp = this.cells;
        this.cells = this.oldCells;
        this.oldCells = tmp;

        // Apply the rules of Life
        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                // Count the neighbors
                var cnt = 0;
                for(var dx = -1; dx <= 1; dx++) {
                    for(var dy = -1; dy <= 1; dy ++) {
                        if(this.oldCellAt((x + dx + SIZE_X) % SIZE_X,
                            (y + dy + SIZE_Y) % SIZE_Y))
                        {
                            cnt++;
                        }
                    }
                }

                // Set cell dead/alive by the rule
                // A live cell stays alive iff it has 2 or 3 live neighbors
                // A dead cell comes to life iff it has 3 live neighbors
                this.setCellAt(x, y, (cnt == 3) || (cnt == 4 && this.oldCellAt(x, y)));
            }
        }
    },

    // Animate the death/birth that occured in the last tick()
    animate: function() {
        for(var i = 0; i < this.cells.length; i++) {
            var sprite = this.sprites[i];
            if(this.cells[i]) {
                sprite.visible = true;
                if(!this.oldCells[i]) {
                    // Just appeared, play animation
                    sprite.animations.play('appear');
                } else {
                    // Old cell, show as fully alive
                    sprite.animations.stop();
                    sprite.frame = 0;
                }
            } else if(this.oldCells[i]) {
                // Just died, play animation
                sprite.animations.play('die');
            } else {
                // Died long ago, hide completely
                sprite.visible = false;
            }
        }
    }
};

function preload() {
    game.load.image('tail', 'assets/tail-cell.png'); // 12x12
    game.load.image('head', 'assets/head-cell.png'); // 12x12
    game.load.spritesheet('life', 'assets/life-cells.png', 12, 12);
}

function create() {
    life.create();

    game.time.advancedTiming = true;
    game.time.events.loop(TICK_DELAY, tickUpdate);
}

function tickUpdate() {
    life.tick();
    life.animate();
}
