var game = new Phaser.Game(640, 480, Phaser.AUTO, '',
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
var TICK_DELAY = 200;

// Constants to operate with the 4 directions
var directions = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3,

    dx: [1, 0, -1, 0],
    dy: [0, 1, 0, -1]
};

// Game of Life field (the logical part, not the visualization)
var life = {
    // SIZE_X * SIZE_Y booleans. true/false = alive/dead cell.
    cells: [],

    // Values of cells in the previous tick
    oldCells: [],

    // Convenience functions to access these arrays

    cellAt: function(x, y) {
        return this.cells[x * SIZE_Y + y];
    },

    setCellAt: function(x, y, val) {
        this.cells[x * SIZE_Y + y] = val;
    },

    oldCellAt: function(x, y) {
        return this.oldCells[x * SIZE_Y + y];
    },

    // Initialize Life
    create: function() {
        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                // Initialize cells with random values
                this.cells.push(!game.rnd.between(0, 4));
                this.oldCells.push(false);

            }
        }
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

};

var snake = {
    FREE: -1, // "Snake isn't over this cell"
    HEAD: -2, // "Snake's head is in this cell"
    TAIL: -3, // "Snake's non-head segment is in this cell"

    // Head position and movement direction
    headX: Math.round(SIZE_X / 2),
    headY: Math.round(SIZE_Y / 2),
    headDir: directions.UP,

    // The desired length of the snake. Can be larger than the actual length,
    // in which case the snake will steadily grow.
    desiredLength: 8,

    // Circular buffer for the tail segments
    tail: [],
    tailIn: 0,
    tailOut: 0,

    // The "reversed" version of the circular buffer. For each field cell gives
    // the index of the tail segment over that cell,  or -1 if that field cell
    // isn't under the snake.
    tailIndices: [],

    pushSegment: function(x, y) {
        // Store the index of the new segment
        this.tailIndices[x * SIZE_Y + y] = this.tailIn;

        // Add the segment to the circular buffer
        this.tail[this.tailIn].x = x;
        this.tail[this.tailIn].y = y;
        this.tailIn = (this.tailIn + 1) % this.tail.length;
    },

    popSegment: function() {
        // Remember that this segment is free now
        var segment = this.tail[this.tailOut];
        this.tailIndices[segment.x * SIZE_Y + segment.y] = this.FREE;

        // Remove tail segment from the circular buffer
        this.tailOut = (this.tailOut + 1) % this.tail.length;
    },

    // Returns the snake's length, head included
    length: function() {
        return (this.tailIn - this.tailOut + this.tail.length)
            % this.tail.length;
    },

    // Returns which part of snake is over the given cell: head, tail segment, or nothing
    segmentInCell: function(x, y) {
        return (x == this.headX && y == this.headY) ? this.HEAD :
            (this.tailIndices[x * SIZE_Y + y] == this.FREE) ? this.FREE : this.TAIL;
    },

    // Initialize the structure: empty snake (only the head) in the center
    // of the screen
    create: function() {
        for(var i = 0; i < SIZE_X * SIZE_Y + 1; i++) {
            this.tail.push({
                x: 0,
                y: 0
            });
        }

        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                this.tailIndices.push(this.FREE);
            }
        }
    },

    // Advance the snake one step further
    tick: function() {
        // Advance the tail
        this.pushSegment(this.headX, this.headY);

        // Remove the last tail segment, unless we are growing
        if(this.length() >= this.desiredLength) {
            this.popSegment();
        }

        // Move the head
        this.headX += directions.dx[this.headDir];
        this.headY += directions.dy[this.headDir];
    }
};

// The SIZE_X * SIZE_Y grid of sprites to display the game field.
// This includes the Life cells and the snake's tail.
var grid = {
    ALIVE_FRAME: 0, // A cell that's alive
    HEAD_FRAME: 4,  // The snake's head
    TAIL_FRAME: 5,  // A cell in the snake's tail

    // One sprite for each grid cell
    sprites: [],

    create: function() {
        var grp = game.add.spriteBatch();

        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                var sprite = grp.create(FIELD_X + CELL_SIZE * x, FIELD_Y + CELL_SIZE * y,
                    'cell');
                sprite.animations.add('die', [0, 1, 2, 3], 9, false);
                sprite.animations.add('appear', [3, 2, 1, 0], 9, false);
                sprite.visible = false;
                this.sprites.push(sprite);
            }
        }
    },

    // Animate the death/birth that occurred in the last tick()
    animateTick: function() {
        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                var sprite = this.sprites[x * SIZE_Y + y];

                switch(snake.segmentInCell(x, y)) {
                    case snake.HEAD:
                        sprite.visible = true;
                        sprite.animations.stop();
                        sprite.frame = this.HEAD_FRAME;
                        break;

                    case snake.TAIL:
                        sprite.visible = true;
                        sprite.animations.stop();
                        sprite.frame = this.TAIL_FRAME;
                        break;

                    default:
                        this.showLifeSprite(sprite, x, y);
                        break;
                }
            }
        }
    },

    showLifeSprite: function(sprite, x, y) {
        var isAlive = life.cellAt(x, y);
        var wasAlive = life.oldCellAt(x, y);

        if(isAlive) {
            sprite.visible = true;
            if(!wasAlive) {
                // Just appeared, play animation
                sprite.animations.play('appear');
            } else {
                // Old cell, show as fully alive
                sprite.animations.stop();
                sprite.frame = this.ALIVE_FRAME;
            }
        } else if(wasAlive) {
            // Just died, play animation
            sprite.animations.play('die');
        } else {
            // Died long ago, hide completely
            sprite.visible = false;
        }
    }
};


function preload() {
    game.load.spritesheet('cell', 'assets/cells.png', 12, 12);
}

function create() {
    life.create();
    snake.create();
    grid.create();

    game.time.advancedTiming = true;
    game.time.events.loop(TICK_DELAY, tickUpdate);
}

function tickUpdate() {
    life.tick();
    snake.tick();
    grid.animateTick();
}
