// Top-left corner of the game field
var FIELD_X = 14;
var FIELD_Y = 36;

// Size of a cell on the game field (cells are squares)
var CELL_SIZE = 12;

// Field size, in cells
var SIZE_X = 51;
var SIZE_Y = 36;

// Delay between life ticks, in milliseconds
var TICK_DELAY = 150;

// Constants to operate with the 4 directions
var directions = {
    RIGHT: 0,
    DOWN: 1,
    LEFT: 2,
    UP: 3,

    dx: [1, 0, -1, 0],
    dy: [0, 1, 0, -1],

    get: function(x1, y1, x2, y2) {
        return (x2 == x1 + 1) ? this.RIGHT :
            (x2 == x1 - 1) ? this.LEFT :
            (y2 == y1 + 1) ? this.DOWN : this.UP;
    }
};

// Current tick number
var currentTick = 0;

// Current score
var score = 0;

// Game of Life field (the logical part, not the visualization)
var life = {
    // SIZE_X * SIZE_Y booleans. true/false = alive/dead cell.
    cells: [],

    // Values of cells in the previous tick
    oldCells: [],

    // One-time initialization
    initialize: function() {
        this.cells.length = SIZE_X * SIZE_Y;
        this.oldCells.length = SIZE_X * SIZE_Y;
        return this;
    },

    // Convenience functions to access cell states
    cellAt: function(x, y) {
        return this.cells[x * SIZE_Y + y];
    },

    setCellAt: function(x, y, val) {
        this.cells[x * SIZE_Y + y] = val;
    },

    oldCellAt: function(x, y) {
        return this.oldCells[x * SIZE_Y + y];
    },

    // Called each time the user starts a new game
    create: function() {
        // Clear the field
        for(var i = 0; i < SIZE_X * SIZE_Y; i++) {
            this.cells[i] = false;
            this.oldCells[i] = false;
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
        // Omit cells near the border: this 1-unit thin rectangle is Life-free.
        for(var x = 1; x < SIZE_X - 1; x++) {
            for(var y = 1; y < SIZE_Y - 1; y++) {
                // Count the neighbors
                var cnt = 0;
                for(var dx = -1; dx <= 1; dx++) {
                    for(var dy = -1; dy <= 1; dy ++) {
                        if(this.oldCellAt(x + dx, y + dy))
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

}.initialize();

var snake = {
    // Minimal allowed length of the snake
    MIN_LENGTH: 3,

    // Length of the snake (desired) when the game starts. The nake will be
    // born with length 1 and immediately start growing until the length
    // reaches this value.
    START_LENGTH: 15,

    // Classification of field cells w.r.t. the snake
    FREE: -1, // "Snake isn't over this cell"

    // Classification of field cells w.r.t. the surrounding made by the snake
    INSIDE: -2,
    OUTSIDE: -3,
    BORDER: -4,

    // Head position and movement direction
    head: { x : 0, y : 0 },
    headDir: directions.UP,

    // The desired length of the snake. Can be larger than the actual length,
    // in which case the snake will steadily grow.
    desiredLength: 0,

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

    // One-time initialization
    initialize: function() {
        // Allocate all the memory
        this.tail.length = SIZE_X * SIZE_Y + 1;
        for(var i = 0; i < this.tail.length; i++) {
            this.tail[i] = { x: 0, y: 0 };
        }

        this.tailIndices.length = SIZE_X * SIZE_Y;
        this.loopClasses.length = SIZE_X * SIZE_Y;

        return this;
    },

    // Initialize the snake. Called every time the user starts a new game.
    create: function() {
        // Place ourselves on the center of the field, looking up
        this.head.x = Math.round(SIZE_X / 2);
        this.head.y = Math.round(SIZE_Y / 2),
        this.headDir = directions.UP,

        // Start growing
        this.desiredLength = this.START_LENGTH;

        // Clear the circular buffer representing our tail
        this.tailIn = 0;
        this.tailOut = 0;

        // Remember that our tail doesn't occupy any cells on the field
        for(var i = 0; i < this.tailIndices.length; i++) {
            this.tailIndices[i] = this.FREE;
        }

        // Reset other misc. data
        this.hadLoop = false;
    },

    // Returns the snake's length, head included
    length: function() {
        return (this.tailIn - this.tailOut + this.tail.length)
            % this.tail.length + 1;
    },

    // Return the (x, y) coordinates of a cell with given index,
    // 0 being the head and length() - 1 being the end of the tail.
    posByIndex: function(index) {
        return (index == 0) ? this.head :
            this.tail[(this.tailIn - index + this.tail.length) % this.tail.length];
    },

    // Returns the index of a snake cell with given coordinates, or FREE
    // if the snake isn't over the cell
    indexAt: function(x, y) {
        if(x == this.head.x && y == this.head.y) {
            return 0;
        } else {
            // Get the index in the circular buffer
            var tailIndex = this.tailIndexAt(x, y);
            if(tailIndex == this.FREE) {
                return this.FREE;
            } else {
                return (this.tailIn - tailIndex + this.tail.length) % this.tail.length;
            }
        }
    },

    // Add new tail segment
    pushTail: function(x, y) {
        // Store the index of the new segment
        this.setTailIndexAt(x, y, this.tailIn);

        // Add the segment to the circular buffer
        this.tail[this.tailIn].x = x;
        this.tail[this.tailIn].y = y;
        this.tailIn = (this.tailIn + 1) % this.tail.length;
    },

    // Remove the last tail segment (FIFO)
    popTail: function() {
        // Remember that this cell is free now
        var segment = this.tail[this.tailOut];
        this.setTailIndexAt(segment.x, segment.y, this.FREE);

        // Remove tail segment from the circular buffer
        this.tailOut = (this.tailOut + 1) % this.tail.length;
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

    // Get/set the loop class of the given cell
    loopClassAt: function(x, y) {
        return this.loopClasses[x * SIZE_Y + y];
    },

    setLoopClassAt: function(x, y, val) {
        this.loopClasses[x * SIZE_Y + y] = val;
    },

    // Advance the snake one step further
    // direction (optional): which way to turn.
    tick: function(direction) {
        if(direction !== undefined) {
            this.headDir = direction;
        }

        // Move the head forward and grow 1 unit
        this.pushTail(this.head.x, this.head.y);
        this.head.x += directions.dx[this.headDir];
        this.head.y += directions.dy[this.headDir];

        // Don't let length exceed the desired value
        if(this.length() > this.desiredLength) {
            this.popTail();
        }

        // Detect if we've made a loop
        this.checkLoop();
    },

    // Check if we've made a loop. If so, remove the looping part of the snake
    checkLoop: function() {
        this.hadLoop = false;

        // Don't do anything if snake has hit the wall
        if(!inBounds(this.head.x, this.head.y)) {
            return;
        }

        // Find out which segment we've bitten, if any
        var biteIndex = this.tailIndexAt(this.head.x, this.head.y);
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

}.initialize(); // var snake = {...}


// The SIZE_X * SIZE_Y grid of sprites to display the game field.
// This includes the Life cells and the snake's tail.
var grid = {
    // Indices of various frames in the spritesheet
    ALIVE_FRAME: 0,   // A Life cell
    CHERRY_FRAME: 7,
    COLONY_FRAME: 14, // Cell of a Life colony to be spawned
    HTAIL_FRAME: 6,   // The entire snake when it has length 1

    // Indices of snake parts. Each index marks a group of 4
    // variants of the same part facing in different directions.
    HEAD_FRAMES: 16,
    TAIL_FRAMES: 20,
    MIDDLE_FRAMES: 24,
    CORNER_LEFT_FRAMES: 28,
    CORNER_RIGHT_FRAMES: 32,

    // How many times a colony preview blinks before the colony appears
    COLONY_BLINKS: 3,

    // One sprite for each grid cell
    sprites: [],

    // Initialization. Called once when 'game' state is entered.
    create: function() {
        var grp = game.add.spriteBatch();
        this.sprites = [];

        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                var sprite = grp.create(FIELD_X + CELL_SIZE * x, FIELD_Y + CELL_SIZE * y,
                        'cell');
                sprite.animations.add('die', [0, 1, 2, 3, 4, 5], 18, false);
                sprite.animations.add('appear', [5, 4, 3, 2, 1, 0], 18, false);
                sprite.animations.add('annihilate', [8, 9, 10, 11, 12, 13], 24, false);
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
                var snakeIndex = snake.indexAt(x, y);

                // Visualize the cell depending on its gameplay state
                var sprite = this.sprites[x * SIZE_Y + y];

                // The snake
                if(snakeIndex != snake.FREE) {
                    this.showSnakeSegment(sprite, snakeIndex);
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

    showSnakeSegment: function(sprite, index) {
        var cur = snake.posByIndex(index);
        var nextDir, prevDir;

        // Determine direction from this cell to the previous one,
        // where "previous" means "neighbor closer to the head".
        if(index == 0) {
            prevDir = null;
        } else {
            var prev = snake.posByIndex(index - 1);
            prevDir = directions.get(cur.x, cur.y, prev.x, prev.y);
        }

        // Determine direction from next cell to this one
        if(index == snake.length() - 1) {
            nextDir = null;
        } else {
            var next = snake.posByIndex(index + 1);
            nextDir = directions.get(next.x, next.y, cur.x, cur.y);
        }

        // Choose which image to display
        var frame;
        if(prevDir === null) {
            frame = (nextDir === null) ? this.HTAIL_FRAME : // One-point snake
                (this.HEAD_FRAMES + nextDir); // Head sprite oriented accordingly
        } else {
            if(nextDir === null) {
                frame = this.TAIL_FRAMES;
            } else {
                var angle = (prevDir - nextDir + 4) % 4;
                frame = (angle == 1) ? this.CORNER_RIGHT_FRAMES:
                    (angle == 3) ? this.CORNER_LEFT_FRAMES: this.MIDDLE_FRAMES;
            }

            frame += prevDir;
        }

        // Set the sprite to the chosen image
        this.showFrame(sprite, frame);
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

    // Phaser's cursor object
    cursor: null,

    // One-time initialization
    initialize: function() {
        // Allocate the buffer
        this.queue.length = this.MAX_LENGTH + 1;
        return this;
    },

    // Called once when entering the 'game' state
    create: function() {
        // Empty the buffer
        this.queueIn = 0;
        this.queueOut = 0;

        // Subscribe to keyboard events
        this.cursor = game.input.keyboard.createCursorKeys();
        this.cursor.down.onDown.add(this.onCursorKey, this);
        this.cursor.up.onDown.add(this.onCursorKey, this);
        this.cursor.right.onDown.add(this.onCursorKey, this);
        this.cursor.left.onDown.add(this.onCursorKey, this);
    },

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

    // Called each time the user prersses a key
    onCursorKey: function(key) {
        var dir = (key === this.cursor.down) ? directions.DOWN:
            (key === this.cursor.up) ? directions.UP:
            (key === this.cursor.right) ? directions.RIGHT:
            (key === this.cursor.left) ? directions.LEFT: undefined;

        if(dir !== undefined) {
            this.maybePush(dir);
        }
    }

}.initialize();

// The cherry that can be eaten for growth
var cherry = {
    exists: false,
    x: 0,
    y: 0
};

// Next Life colony that is about to be spawned
var colony = {
    // How many ticks between game start and first colony spawn
    FIRST_DELAY: 20,

    // How many ticks pass between colony spawns
    SPAWN_DELAY: SIZE_X + SIZE_Y,

    // When the colony will be spawned
    spawnTick: 0,

    // Position of the colony's top left corner
    x: 0,
    y: 0,

    // Size of the colony
    sizeX: 0,
    sizeY: 0,

    // Colony cells as a boolean array
    cells: [],

    // Colony cells
    // dx, dy: RELATIVE coordinates inside the colony
    cellAt: function(dx, dy) {
        return this.cells[dx * this.sizeY + dy];
    },

    setCellAt: function(dx, dy, value) {
        this.cells[dx * this.sizeY + dy] = value;
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
        // Choose a pattern at random
        var pattern = patterns[game.rnd.between(0, patterns.length - 1)];

        // Copy the pattern to our memory, and apply a random
        // rotation/reflection.
        var matrix = Matrix2.d8element(game.rnd.between(0, 3), game.rnd.between(0, 1));
        this.assignPattern(pattern, matrix);

        // Choose the spawn position on the field
        this.x = game.rnd.between(1, SIZE_X - 1 - this.sizeX);
        this.y = game.rnd.between(1, SIZE_Y - 1 - this.sizeY);
    },

    // Set the pattern that the colony will use
    assignPattern: function(pattern, mat) {
        // Original indices lie on the grid between (0, 0) and (cx, cy) inclusive
        var cx = pattern.sizeX - 1;
        var cy = pattern.sizeY - 1;

        // Move this grid using the matrix. This is linear, i.e. (0, 0) rests
        // on its place and (cx, cy) can go into any coordinate quadrant.
        var newCx = mat.getX(cx, cy);
        var newCy = mat.getY(cx, cy);

        // Determine additional shift that is needed to bring the transformed
        // rectangle back to the positive quadrant, with one corner at (0, 0)
        var deltaX = (newCx >= 0) ? 0 : -newCx;
        var deltaY = (newCy >= 0) ? 0 : -newCy;

        // Remember the size
        this.sizeX = Math.abs(newCx) + 1;
        this.sizeY = Math.abs(newCy) + 1;

        // Allocate more memory if needed
        if(this.cells.length < this.sizeX * this.sizeY) {
            this.cells.length = this.sizeX * this.sizeY;
        }

        // Copy the data
        for(var x = 0; x < pattern.sizeX; x++) {
            for(var y = 0; y < pattern.sizeY; y++) {
                this.setCellAt(deltaX + mat.getX(x, y), deltaY + mat.getY(x, y),
                        pattern.cellAt(x, y));
            }
        }
    }
};

// Text objects storing the current score etc.
var hud = {
    // Y coordinate of the text (vertical anchor is text center)
    Y: 16,

    // Gap between pictograms and neighboring text
    X_GAP: 3,

    scoreText: null,
    lengthText: null,

    // Initialization
    // Called once when entering the 'game' state
    create: function() {
        // Snake length display
        this.lengthText = game.add.text(42 + this.X_GAP, this.Y, '0');
        this.lengthText.anchor.set(0.0, 0.5);
        this.lengthText.text = snake.START_LENGTH;
        this.setCommonParams(this.lengthText);

        // Score display
        this.scoreText = game.add.text(game.width - 42 - this.X_GAP, this.Y, '0');
        this.scoreText.anchor.set(1.0, 0.5);
        this.setCommonParams(this.scoreText);
    },

    // Initialization done for every text object
    setCommonParams: function(obj) {
        // obj.fill = '#ff5500';    // color of the cherry
        obj.fill = 'white';
    },

    tick: function() {
        this.lengthText.text = snake.desiredLength;
        this.scoreText.text = score;
    }
};

// Checks whether the given coordinates are in the field's boundaries
function inBounds(x, y) {
    return (x >= 0) && (y >= 0) && (x < SIZE_X) && (y < SIZE_Y);
}

var bootState = {
    preload: function() {
        game.load.spritesheet('cell', 'assets/cells.png', 12, 12);
        game.load.image('background', 'assets/background.png');
    },

    create: function() {
        game.state.start('game');
    }
};

var gameState = {
    create: function() {
        // Initialize state of the game
        this.initGameState();

        // Prepare to accept user input
        inputQueue.create();

        // Create all the Phaser objects
        game.add.sprite(0, 0, 'background');
        grid.create();
        hud.create();

        // Launch the main timer to measure ticks by which Life & Snake live.
        game.time.events.loop(TICK_DELAY, this.tick, this);
    },

    // Initializes game state. If a game is already in progress, this will
    // have the effect of aborting it and starting a fresh one.
    initGameState: function() {
        currentTick = 0;
        score = 0;

        life.create();
        colony.generate();
        colony.spawnTick = colony.FIRST_DELAY;

        snake.create();
        this.maybeSpawnCherry();
    },

    tick: function() {
        // Make a step in the Game of Life
        life.tick();

        // Drop a new Life colony if it's time
        if(currentTick >= colony.spawnTick) {
            life.add(colony.x, colony.y, colony);
            colony.generate();
            colony.spawnTick = currentTick + colony.SPAWN_DELAY;
        }

        // Destroy the cherry if life crept on it
        if(cherry.exists && life.cellAt(cherry.x, cherry.y)) {
            cherry.exists = false;
        }

        // Make a snake's step, turning if there was user input
        snake.tick(inputQueue.maybePop());

        // Snake grows when it eats the cherry
        if(cherry.exists && cherry.x == snake.head.x && cherry.y == snake.head.y) {
            cherry.exists = false;
            snake.desiredLength++;
        }

        // If the snake surrounded something, destroy all Life there
        if(snake.hadLoop) {
            for(var x = 0; x < SIZE_X; x++) {
                for(var y = 0; y < SIZE_Y; y++) {
                    var situation = snake.loopClassAt(x, y);

                    // Get points for all the life strictly inside the loop
                    if(situation == snake.INSIDE && life.cellAt(x, y)) {
                        score++;
                    }

                    // Destroy life inside and on the loop
                    if(situation != snake.OUTSIDE) {
                        life.setCellAt(x, y, false);
                    }
                }
            }
        }

        // Respawn the cherry if it was eaten/destroyed
        if(!cherry.exists) {
            this.maybeSpawnCherry();
        }

        // Show what happened on the game field
        grid.tick();

        // Update the HUD text
        hud.tick();

        // Keep track of time
        currentTick++;

        // Restart everything when we die
        if(!inBounds(snake.head.x, snake.head.y) ||
                life.cellAt(snake.head.x, snake.head.y))
        {
            this.initGameState();
        }

    },

    maybeSpawnCherry: function() {
        cherry.x = game.rnd.between(0, SIZE_X - 1);
        cherry.y = game.rnd.between(0, SIZE_Y - 1);
        cherry.exists = !life.cellAt(cherry.x, cherry.y) &&
            (snake.indexAt(cherry.x, cherry.y) == snake.FREE);
    }

}

// Tell Phaser to launch the game
var game = new Phaser.Game(640, 480, Phaser.AUTO, '');
game.state.add('boot', bootState);
game.state.add('game', gameState);
game.state.start('boot');

// TODO: maybe make Life 2 times slower? Otherwise a cell blinking with period 2
// will be either lethal or not depending on whether it was born in an odd/even tick,
// because it always takes an even number of ticks for the snake to make a loop.
