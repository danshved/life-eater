var game = new Phaser.Game(640, 480, Phaser.AUTO, '',
    { preload: preload, create: create});

// Top-left corner of the game field
var FIELD_X = 14;
var FIELD_Y = 12;

// Size of a cell on the game field (cells are squares)
var CELL_SIZE = 12;

// Field size, in cells
var SIZE_X = 51;
var SIZE_Y = 38;

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

// Current tick number
var currentTick = 0;

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
                this.cells.push(false);
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

    // Add new Life group to the field based on a given rectangular pattern.
    // Cells that are true in the pattern become alive.
    // Cells that are false don't do anything.
    //
    // x, y: where to put the top-left corner of the pattern
    // pattern: the Life to be added. must have properties ``sizeX'' and ``sizeY''
    // and a method ``cellAt(x: number, y: number): boolean''.
    add: function(x, y, pattern) {
        for(var dx = 0; dx < pattern.sizeX; dx++) {
            for(var dy = 0; dy < pattern.sizeY; dy++) {
                if(pattern.cellAt(dx, dy)) {
                    this.setCellAt((x + dx) % SIZE_X, (y + dy) % SIZE_Y, true);
                }
            }
        }
    }

};

var snake = {
    // Minimal allowed (desired) length of the snake
    MIN_LENGTH: 3,

    // Classification of field cells w.r.t. the snake
    FREE: -1, // "Snake isn't over this cell"
    HEAD: -2, // "Snake's head is in this cell"
    TAIL: -3, // "Snake's non-head segment is in this cell"

    // Classification of field cells w.r.t. the surrounding made by the snake
    INSIDE: -4,
    OUTSIDE: -5,
    BORDER: -6,

    // Head position and movement direction
    headX: Math.round(SIZE_X / 2),
    headY: Math.round(SIZE_Y / 2),
    headDir: directions.UP,

    // The desired length of the snake. Can be larger than the actual length,
    // in which case the snake will steadily grow.
    desiredLength: 15,

    // Circular buffer for the tail segments
    tail: [],
    tailIn: 0,
    tailOut: 0,

    // The "reversed" version of the circular buffer. For each field cell gives
    // the index of the tail segment over that cell,  or -1 if that field cell
    // isn't under the snake.
    tailIndices: [],

    // Whether or not there was a loop removal in the last tick()
    hadLoop: false,

    // The class of each cell w.r.t. the last loop made by the snake
    loopClasses: [],

    // Add new tail segment
    pushSegment: function(x, y) {
        // Store the index of the new segment
        this.setTailIndexAt(x, y, this.tailIn);

        // Add the segment to the circular buffer
        this.tail[this.tailIn].x = x;
        this.tail[this.tailIn].y = y;
        this.tailIn = (this.tailIn + 1) % this.tail.length;
    },

    // Remove the last tail segment (FIFO)
    popSegment: function() {
        // Remember that this cell is free now
        var segment = this.tail[this.tailOut];
        this.setTailIndexAt(segment.x, segment.y, this.FREE);

        // Remove tail segment from the circular buffer
        this.tailOut = (this.tailOut + 1) % this.tail.length;
    },

    // Returns the snake's length, head included
    length: function() {
        return (this.tailIn - this.tailOut + this.tail.length)
            % this.tail.length + 1;
    },

    // Returns the index of tail segment in the given cell.
    // Returns FREE for head cell and for empty cells
    tailIndexAt: function(x, y) {
        return this.tailIndices[x * SIZE_Y + y];
    },

    // Set the index of tail segment in the given cell
    setTailIndexAt: function(x, y, val) {
        this.tailIndices[x * SIZE_Y + y] = val;
    },

    // Returns which part of snake is over the given cell: head, tail segment, or nothing
    segmentKindAt: function(x, y) {
        return (x == this.headX && y == this.headY) ? this.HEAD :
            (this.tailIndexAt(x, y) == this.FREE) ? this.FREE : this.TAIL;
    },

    // Get/set the loop class of the given cell
    loopClassAt: function(x, y) {
        return this.loopClasses[x * SIZE_Y + y];
    },

    setLoopClassAt: function(x, y, val) {
        this.loopClasses[x * SIZE_Y + y] = val;
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
                this.loopClasses.push(this.OUTSIDE);
            }
        }
    },

    // Advance the snake one step further
    // direction (optional): which way to turn.
    tick: function(direction) {
        if(direction !== undefined) {
            this.headDir = direction;
        }

        // Advance the tail
        this.pushSegment(this.headX, this.headY);

        // Don't let length exceed the desired value
        if(this.length() > this.desiredLength) {
            this.popSegment();
        }

        // Move the head
        this.headX += directions.dx[this.headDir];
        this.headY += directions.dy[this.headDir];

        // Detect if we've made a loop
        this.checkLoop();
    },

    // Check if we've made a loop. If so, remove the looping part of the snake
    checkLoop: function() {
        this.hadLoop = false;

        // Don't do anything if snake has hit the wall
        if(!inBounds(this.headX, this.headY)) {
            return;
        }

        // Find out which segment we've bitten, if any
        var biteIndex = this.tailIndexAt(this.headX, this.headY);
        if(biteIndex == this.FREE) {
            return;
        }

        // Remember that there was a loop, and remember which cells were
        // inside/on the border of this loop.
        this.hadLoop = true;
        this.loopClassify(biteIndex, this.tailIn);

        // Remove the looping part, i.e. all cells between the head (exclusive)
        // and the bitten segment (inclusive)
        for(var index = biteIndex; index != this.tailIn;
            index = (index + 1) % this.tail.length)
        {
            var segment = this.tail[index];
            this.setTailIndexAt(segment.x, segment.y, this.FREE);
        }
        this.tailIn = biteIndex;

        // Reduce length by 1 unit, so that player has to eat cherry now and then
        this.desiredLength--;
        if(this.desiredLength < this.MIN_LENGTH) {
            this.desiredLength = this.MIN_LENGTH;
        }
    },

    // Classify all field cells w.r.t. a loop made by the snake
    // [start, end): indices of segments making the loop (in the ``tail'' circular array)
    loopClassify: function(start, end) {
        for(var x = 0; x < SIZE_X; x++) {
            // We always start outside the loop
            var curClass = this.OUTSIDE;

            // X-components of the first and last encountered wall segments
            var firstDiff = 0;
            var lastDiff = 0;

            for(var y = 0; y < SIZE_Y; y++) {
                // Determine if this cell is on the border
                var index = this.tailIndexAt(x, y);

                // If we're on the border or just got off it, update our classification
                if(index != this.FREE && this.indexIsBetween(start, index, end)) {
                    // We lie on the loop, i.e. on the border of the surrounding
                    curClass = this.BORDER;

                    // Find our two neighbors on the loop
                    var prevIndex = (index == start) ? end : index;
                    prevIndex = (prevIndex - 1 + this.tail.length) % this.tail.length;

                    var nextIndex = (index + 1) % this.tail.length;
                    if(nextIndex == end) {
                        nextIndex = start;
                    }

                    // Determine whecher the border goes right or left here
                    lastDiff = this.tail[nextIndex].x - this.tail[prevIndex].x;
                    if(firstDiff == 0) {
                        firstDiff = lastDiff;
                    }
                } else if(curClass == this.BORDER) {
                    // We were on the wall, but aren't any longer. Determine whether
                    // we're inside or outside based on the wall's left/right direction.
                    curClass = (firstDiff * lastDiff > 0) ? this.INSIDE : this.OUTSIDE;
                }

                this.setLoopClassAt(x, y, curClass);
            }
        }
    },

    // Utility: checks that index b belongs to [a, c) in the cyclic sense
    // (as indices in the ``tail'' buffer)
    indexIsBetween: function(a, b, c) {
        if(a <= c) {
            return (a <= b) && (b < c);
        } else {
            return (a <= b) || (b < c);
        }
    }

}; // var snake = {...}


// The SIZE_X * SIZE_Y grid of sprites to display the game field.
// This includes the Life cells and the snake's tail.
var grid = {
    ALIVE_FRAME: 0,   // A Life cell
    HEAD_FRAME: 4,    // The snake's head
    TAIL_FRAME: 5,    // The snake's body segment
    CHERRY_FRAME: 10,
    COLONY_FRAME: 11, // Cell of a Life colony to be spawned

    COLONY_BLINKS: 3, // How many times a colony preview blinks before the colony appears

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
                sprite.animations.add('annihilate', [6, 7, 8, 9], 12, false);
                sprite.visible = false;
                this.sprites.push(sprite);
            }
        }
    },

    // Animate Life & snake: show what happened in their last tick()
    tick: function() {
        // Decide if we should be previewing the ``colony'', and if so,
        // whether it's an "on" or "off" blink phase.
        var colonyTicks = colony.spawnTick - currentTick;
        var colonyVisible = (colonyTicks > 0) && (colonyTicks <= 2 * this.COLONY_BLINKS) &&
            !!(colonyTicks % 2);

        // Show an appropriate frame for each cell, start animations where
        // necessary.
        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                // Get gameplay data for this cell
                var isAlive = life.cellAt(x, y);
                var wasAlive = life.oldCellAt(x, y);
                var snakeKind = snake.segmentKindAt(x, y);

                // Visualize the cell depending on its gameplay state
                var sprite = this.sprites[x * SIZE_Y + y];

                // The snake
                if(snakeKind == snake.HEAD) {
                    this.showFrame(sprite, this.HEAD_FRAME);
                }
                else if(snakeKind == snake.TAIL) {
                    this.showFrame(sprite, this.TAIL_FRAME);
                }
                // Annihilated surrounded cells, if any
                else if(snake.hadLoop && snake.loopClassAt(x, y) != snake.OUTSIDE) {
                    this.showAnimation(sprite, 'annihilate');
                }
                // Life cells, including those just born
                else if(isAlive) {
                    if(wasAlive) {
                        this.showFrame(sprite, this.ALIVE_FRAME);
                    } else {
                        this.showAnimation(sprite, 'appear');
                    }
                }
                // Colony preview, if any
                else if(colonyVisible && colony.absoluteCellAt(x, y)) {
                    this.showFrame(sprite, this.COLONY_FRAME);
                }
                // The cherry
                else if(cherry.exists && cherry.x == x && cherry.y == y) {
                    this.showFrame(sprite, this.CHERRY_FRAME);
                }
                // Empty cells where life just died
                else if(wasAlive) {
                    this.showAnimation(sprite, 'die');
                }
                // All other empty cells
                else {
                    sprite.visible = false;
                }
            }
        }
    },

    showFrame: function(sprite, frame) {
        sprite.visible = true;
        sprite.animations.stop();
        sprite.frame = frame;
    },

    showAnimation: function(sprite, name) {
        sprite.visible = true;
        var animation = sprite.animations.getAnimation(name);
        animation.restart();
        sprite.animations.play(name);
    },
};

// Keyboard input queue
var inputQueue = {
    MAX_LENGTH: 4,

    // Circular buffer with the queue. Each item is a direction [0..3]
    queue: [],
    queueIn: 0,
    queueOut: 0,

    // Find out how many keys are in the queue
    length: function() {
        return (this.queueIn - this.queueOut + this.queue.length) % this.queue.length;
    },

    // Push a new direction to the queue (unless it's full)
    maybePush: function(dir) {
        if(this.length() < this.MAX_LENGTH) {
            this.queue[this.queueIn] = dir;
            this.queueIn = (this.queueIn + 1) % this.queue.length;
        }
    },

    // Pop a key from the queue.
    // Returns the key that was popped, or undefined if quueue was empty.
    maybePop: function() {
        if(this.length() != 0) {
            var result = this.queue[this.queueOut];
            this.queueOut = (this.queueOut + 1) % this.queue.length;
            return result;
        } else {
            return undefined;
        }
    },

    create: function() {
        // Initialize the circular buffer
        for(var i = 0; i < this.MAX_LENGTH; i++) {
            this.queue.push(directions.UP);
        }

        // Subscribe to keyboard events
        this.cursor = game.input.keyboard.createCursorKeys();
        this.cursor.down.onDown.add(this.onCursorKey, this);
        this.cursor.up.onDown.add(this.onCursorKey, this);
        this.cursor.right.onDown.add(this.onCursorKey, this);
        this.cursor.left.onDown.add(this.onCursorKey, this);
    },

    onCursorKey: function(key) {
        var dir = (key === this.cursor.down) ? directions.DOWN:
            (key === this.cursor.up) ? directions.UP:
            (key === this.cursor.right) ? directions.RIGHT:
            (key === this.cursor.left) ? directions.LEFT: undefined;

        if(dir !== undefined) {
            this.maybePush(dir);
        }
    }
};

// The cherry that can be eaten for growth
var cherry = {
    exists: false,
    x: 0,
    y: 0
};

// Next Life colony that is about to be spawned
var colony = {
    // How many ticks pass between colony spawns
    SPAWN_DELAY: 20,

    // When the colony will be spawned
    spawnTick: 0,

    // Position of the colony's top left corner
    x: 0,
    y: 0,

    // Size of the colony
    sizeX: 2,
    sizeY: 2,

    // Colony cells
    // x, y: RELATIVE coordinates inside the colony
    cellAt: function(dx, dy) {
        // TODO: add real implementation
        return true;
    },

    // Like cellAt(), but x and y are ABSOLUTE coordinates
    // of any point on the game field
    absoluteCellAt: function(x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        return (dx >= 0) && (dx < this.sizeX) &&
            (dy >= 0) && (dy < this.sizeY) &&
            this.cellAt(dx, dy);
    },

    // Choose a colony and determine when it will be spawned
    generate: function() {
        this.spawnTick = currentTick + this.SPAWN_DELAY;
        this.x = game.rnd.between(0, SIZE_X - this.sizeX);
        this.y = game.rnd.between(0, SIZE_Y - this.sizeY);
    }
};

// Checks whether the given coordinates are in the field's boundaries
function inBounds(x, y) {
    return (x >= 0) && (y >= 0) && (x < SIZE_X) && (y < SIZE_Y);
}

function preload() {
    game.load.spritesheet('cell', 'assets/cells.png', 12, 12);
    game.load.image('background', 'assets/background.png');
}

function create() {
    // Initialize state of the game
    life.create();
    colony.generate();
    snake.create();
    maybeSpawnCherry();

    // Prepare to accept user input
    inputQueue.create();

    // Create all the sprites
    game.add.sprite(0, 0, 'background');
    grid.create();

    // Launch the main timer to measure ticks by which Life & Snake live.
    game.time.events.loop(TICK_DELAY, tick);
}

function tick() {
    // Make a step in the Game of Life
    life.tick();

    // Drop a new Life colony if it's time
    if(currentTick >= colony.spawnTick) {
        life.add(colony.x, colony.y, colony);
        colony.generate();
    }

    // Destroy the cherry if life crept on it
    if(cherry.exists && life.cellAt(cherry.x, cherry.y)) {
        cherry.exists = false;
    }

    // Make a snake's step, turning if there was user input
    snake.tick(inputQueue.maybePop());

    // Snake grows when it eats the cherry
    if(cherry.exists && cherry.x == snake.headX && cherry.y == snake.headY) {
        cherry.exists = false;
        snake.desiredLength++;
    }

    // If the snake surrounded something, destroy all Life there
    if(snake.hadLoop) {
        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                if(snake.loopClassAt(x, y) != snake.OUTSIDE) {
                    life.setCellAt(x, y, false);
                }
            }
        }
    }

    // Respawn the cherry if it was eaten/destroyed
    if(!cherry.exists) {
        maybeSpawnCherry();
    }

    // Show what happened on the game field
    grid.tick();

    // Keep track of time
    currentTick++;
}

function maybeSpawnCherry() {
    cherry.x = game.rnd.between(0, SIZE_X - 1);
    cherry.y = game.rnd.between(0, SIZE_Y - 1);
    cherry.exists = !life.cellAt(cherry.x, cherry.y) &&
        (snake.segmentKindAt(cherry.x, cherry.y) == snake.FREE);
}
