// The state of the game and its evolution.

// Field size, in cells
var SIZE_X = 51;
var SIZE_Y = 36;

// Checks whether the given coordinates are in the field's boundaries
function inBounds(x, y) {
    return (x >= 0) && (y >= 0) && (x < SIZE_X) && (y < SIZE_Y);
}

// Current tick number
var currentTick = 0;

// Game of Life field
var life = {
    // Whether the field is empty (all cells are dead)
    isEmpty: true,

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
    reset: function() {
        // Clear the field
        for(var i = 0; i < SIZE_X * SIZE_Y; i++) {
            this.cells[i] = false;
            this.oldCells[i] = false;
        }
        this.isEmpty = true;
    },

    // Make a step according to the rules of the automaton.
    // Updates cells/oldCells, but doesn't touch the sprites.
    tick: function() {
        // Swap cells and oldCells
        var tmp = this.cells;
        this.cells = this.oldCells;
        this.oldCells = tmp;

        // Apply the rules of Life
        this.isEmpty = true;
        for(var x = 0; x < SIZE_X; x++) {
            for(var y = 0; y < SIZE_Y; y++) {
                // Count the neighbors
                var cnt = 0;
                for(var dx = -1; dx <= 1; dx++) {
                    for(var dy = -1; dy <= 1; dy ++) {
                        if(inBounds(x + dx, y + dy) && this.oldCellAt(x + dx, y + dy))
                        {
                            cnt++;
                        }
                    }
                }

                // Set cell dead/alive by the rule
                // A live cell stays alive iff it has 2 or 3 live neighbors
                // A dead cell comes to life iff it has 3 live neighbors
                var alive = (cnt == 3) || (cnt == 4 && this.oldCellAt(x, y));

                this.setCellAt(x, y, alive);
                this.isEmpty &= !alive;
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
    },

    // Kill all the cells that are alive
    killAll: function() {
        for(var i = 0; i < this.cells.length; i++) {
            this.cells[i] = false;
        }
    }

}.initialize();

// Next Life colony that is about to be spawned
var colony = {
    // How many ticks between game start and first colony spawn
    FIRST_DELAY: 20,

    // Maximum delay until the colony is spawned after the game field becomes
    // completely empty
    URGENT_DELAY: 12,

    // How many ticks pass between colony spawns
    // This will be altered by the difficulty manager
    spawnDelay: 45,

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
    generate: function(pattern) {
        // Choose a pattern at random if one wasn't given
        if(!pattern) {
            pattern = patternChooser.pickPattern();
        }

        // Copy the pattern to our memory, and apply a random
        // rotation/reflection.
        var matrix = Matrix2.d8element(game.rnd.between(0, 3), game.rnd.between(0, 1));
        this.assignPattern(pattern, matrix);

        // Choose the spawn position on the field
        this.x = game.rnd.between(0, SIZE_X - this.sizeX);
        this.y = game.rnd.between(0, SIZE_Y - this.sizeY);
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

var snake = {
    // Minimal allowed length of the snake
    MIN_LENGTH: 15,

    // Maximal allowed length
    MAX_LENGTH: SIZE_X * SIZE_Y,

    // Length of the snake (desired) when the game starts. The nake will be
    // born with length 1 and immediately start growing until the length
    // reaches this value.
    START_LENGTH: 15,

    // Special value saying that the snake doesn't occupy the given cell
    FREE: -1,

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

    // The maximum value of ``desiredLength'' in the course of the game
    topLength: 0,

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
    reset: function() {
        // Place ourselves on the center of the field, looking up
        this.head.x = Math.round(SIZE_X / 2);
        this.head.y = Math.round(SIZE_Y / 2),
        this.headDir = directions.UP,

        // Clear the circular buffer representing our tail
        this.tailIn = 0;
        this.tailOut = 0;

        // Remember that our tail doesn't occupy any cells on the field
        for(var i = 0; i < this.tailIndices.length; i++) {
            this.tailIndices[i] = this.FREE;
        }

        // Start growing
        this.desiredLength = this.START_LENGTH;
        this.topLength = this.desiredLength;

        // Reset other misc. data
        this.hadLoop = false;
    },

    // Returns the snake's length, head included
    length: function() {
        return (this.tailIn - this.tailOut + this.tail.length) % this.tail.length + 1;
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
    },

    // Helper: increment the desired length while respecting the limits
    // delta: length change. Can be negative.
    grow: function(delta) {
        this.desiredLength += delta;
        if(this.desiredLength < this.MIN_LENGTH) {
            this.desiredLength = this.MIN_LENGTH;
        } else if(this.desiredLength > this.MAX_LENGTH) {
            this.desiredLength = this.MAX_LENGTH;
        }

        if(this.desiredLength > this.topLength) {
            this.topLength = this.desiredLength;
        }
    }

}.initialize(); // var snake = {...}

// The object that determines which patterns spawn on which level
var patternChooser = {
    // All still lifes
    stillPatterns: [],

    // For each i, borders[i] gives the index of the first item in
    // ``stillPatterns'' that has killLength >= i
    borders: [],

    // One-time initialization
    initialize: function() {
        // Build the list of all "still life" patterns
        for(var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if(pattern.kind === 'still' || pattern.kind === 'oscillator') {
                this.stillPatterns.push(pattern);
            }
        }

        // Sort by perimeter
        this.stillPatterns.sort(
            function(a, b) { return a.killLength() - b.killLength(); }
        );

        // Find in advance all the jumps in the patterns' kill length
        for(var i = 0; i < this.stillPatterns.length; i++) {
            var killLength = this.stillPatterns[i].killLength();
            while(this.borders.length <= killLength) {
                this.borders.push(i);
            }
        }

        return this;
    },

    // Pick a random pattern appropriate for the current difficulty level
    pickPattern: function() {
        // Choose any pattern whose killLength is <= what the snake can
        // surround or could surround in any point in the past
        var border = (snake.topLength + 1 < this.borders.length) ?
            this.borders[snake.topLength + 1] : this.stillPatterns.length;

        return (border == 0) ? blockPattern :
            this.stillPatterns[game.rnd.between(0, border - 1)];
    }

}.initialize();

// The bonus cell that appears after each increase and length and allows
// to kill all Life on the field
var bonus = {
    // How long each bonus should persist on the field (in ticks)
    DURATION: 100,

    // How much longer the snake needs to grow to deserve each next bonus
    LENGTH_PER_SPAWN: 5,

    // Whether the bonus is on the field
    exists: false,

    // The bonus's position
    x: 0,
    y: 0,

    // Whether the bonus was used in the last tick()
    wasUsed: false,

    // When the bonus must expire and disappear
    expiryTick: 0,

    // How many cherries have already been spawned
    spawnCount: 0,

    // Initialization. Called each time a new game starts.
    reset: function() {
        this.exists = false;
        this.wasUsed = false;
        this.expiryTick = 0;
        this.spawnCount = 0;
    },

    // Show/hide bonus or activate it when eaten by the snake.
    // Invariant: after this call the bonus is not on the snake and
    // not on a Life cell.
    tick: function() {
        // Activate bonus & make it disappear if the snake hit it
        this.wasUsed = false;
        if(this.exists && snake.head.x == this.x && snake.head.y == this.y) {
            life.killAll();
            this.wasUsed = true;
            this.exists = false;
            this.expiryTick = currentTick;
        }

        // Make the bonus appear (or prolong its existence) if the snake grew sufficiently
        // longer
        var desiredCount = Math.floor(
            (snake.desiredLength - snake.START_LENGTH) / this.LENGTH_PER_SPAWN);
        if(desiredCount > this.spawnCount) {
            this.spawnCount = desiredCount;
            this.expiryTick = currentTick + this.DURATION;
        }

        // Show/hide bonus based on the expiry time
        if(currentTick >= this.expiryTick) {
            this.exists = false;
        } else {
            // Don't let the bonus exist on top of life
            if(life.cellAt(this.x, this.y))
            {
                this.exists = false;
            }

            // Locate bonus in a random spot if it isn't on the field
            // i.e. it's just appeared or was hit by Life
            if(!this.exists) {
                this.maybeSpawn();
            }
        }
    },

    // Try to locate the bonus on a random place on the field. May not
    // succeed if the field is too crowded.
    maybeSpawn: function() {
        this.x = game.rnd.between(0, SIZE_X - 1);
        this.y = game.rnd.between(0, SIZE_Y - 1);
        this.exists = !life.cellAt(this.x, this.y) &&
            (snake.indexAt(this.x, this.y) == snake.FREE);
    },
}

var gameLogic = {
    // Reset the game state (i.e. start a new game)
    reset: function() {
        // Drop the colony
        currentTick = 0;

        // Empty the Life
        life.reset();

        // Plan the first colony drop. Always drop the same colony first (2x2 block).
        // All subsequent ones will be chosen at random
        colony.generate(blockPattern);
        colony.spawnTick = colony.FIRST_DELAY;

        // Put the snake in start position
        snake.reset();

        // Initialize the bonus so that it doesn't exist but will
        // spawn when the snake grows longer
        bonus.reset();
    },

    // Make one step in the game
    // userInput: if specified, which arrow key the user has pressed
    tick: function(userInput) {
        // Make a step in the Game of Life
        life.tick();

        // Hurry up Life spawn if the game field is empty
        var urgentTick = currentTick + colony.URGENT_DELAY;
        if(life.isEmpty && currentTick >= colony.FIRST_DELAY &&
            colony.spawnTick > urgentTick)
        {
            colony.spawnTick = urgentTick;
        }

        // Drop a new Life colony if it's time
        if(currentTick >= colony.spawnTick) {
            life.add(colony.x, colony.y, colony);
            colony.generate();
            colony.spawnTick = currentTick + colony.spawnDelay;
        }

        // Make a snake's step, turning if there was user input
        snake.tick(userInput);

        // If the snake surrounded something, destroy all Life there
        if(snake.hadLoop) {
            var ateCells = 0;
            for(var x = 0; x < SIZE_X; x++) {
                for(var y = 0; y < SIZE_Y; y++) {
                    var situation = snake.loopClassAt(x, y);

                    // Consider as "eaten" all cells strictly inside the loop
                    if(situation == snake.INSIDE && life.cellAt(x, y)) {
                        ateCells++;
                    }

                    // Destroy life inside and on the loop
                    if(situation != snake.OUTSIDE) {
                        life.setCellAt(x, y, false);
                    }
                }
            }

            // Grow longer if we ate something, grow shorter otherwise as penalty
            snake.grow(ateCells ? 1 : -1);
        }

        // Show/hide/consume the bonus cell
        bonus.tick();
    },

    // Check if player lost the game in the last tick()
    gameOver: function() {
        return !inBounds(snake.head.x, snake.head.y)
            || (!snake.hadLoop && life.oldCellAt(snake.head.x, snake.head.y));
    },

}; // var gameLogic = {...}

// TODO: start spawning something as soon as the game field is empty
