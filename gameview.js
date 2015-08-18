// Classes that display the ongoing game

// Top-left corner of the game field
var FIELD_X = 12;
var FIELD_Y = 34;

// Size of a cell on the game field (cells are squares)
var CELL_SIZE = 12;

// The SIZE_X * SIZE_Y grid of sprites to display the game field.
// This includes the Life cells and the snake's tail.
var grid = {
    // Indices of various frames in the spritesheet
    ALIVE_FRAME: 0,   // A Life cell
    BONUS_FRAME: 7,
    COLONY_FRAME: 14, // Cell of a Life colony to be spawned
    HTAIL_FRAME: 6,   // The entire snake when it has length 1

    // Indices of snake parts. Each index marks a group of 4
    // variants of the same part facing in different directions.
    HEAD_FRAMES: 16,
    TAIL_FRAMES: 20,
    MIDDLE_FRAMES: 24,
    CORNER_LEFT_FRAMES: 28,
    CORNER_RIGHT_FRAMES: 32,

    // How a colony preview blinks before the colony appears
    COLONY_BLINKS: 3,  // Number of blinks
    BLINK_PERIOD: 4,   // Blinking period, in ticks
    BLINK_DURATION: 2, // How many ticks per period the future colony is shown

    // One sprite for each grid cell
    sprites: [],

    // One-time initialization.
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

    // Hide all the sprites until the next tick()
    hide: function() {
        for(var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].visible = false;
        }
    },

    // Animate Life & snake: show what happened in their last tick()
    tick: function() {
        // Decide if we should be previewing the ``colony'', and if so,
        // whether it's an "on" or "off" blink phase.
        var colonyVisible = false;
        var colonyBegin = colony.spawnTick - this.BLINK_PERIOD * this.COLONY_BLINKS + 1;

        if(currentTick >= colonyBegin && currentTick < colony.spawnTick) {
            var periodTick = (currentTick - colonyBegin) % this.BLINK_PERIOD;
            colonyVisible = (periodTick < this.BLINK_DURATION);
        }

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
                // Bonus cell, if any
                else if(bonus.exists && x == bonus.x && y == bonus.y) {
                    this.showFrame(sprite, this.BONUS_FRAME);
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

// Information above the game field: the current length etc.
var hud = {
    // Y coordinate of the text (vertical anchor is text center)
    TEXT_Y: 17,

    // Gap between pictograms and neighboring text
    X_GAP: 5,

    // Font to use for all HUD text
    style: {
        font: 'bold 24px Arial',
        fill: 'white',
    },

    // Text objects
    lengthText: null,

    // Bar background sprite, i.e. the "icons"
    background: null,

    // One-time initialization
    create: function() {
        // HUD icons
        this.background = game.add.sprite(0, 0, 'hud-bg');

        // Snake length
        this.lengthText = game.add.text(40 + this.X_GAP, this.TEXT_Y, '0', this.style);
        this.lengthText.anchor.set(0.0, 0.5);
    },

    // Hide the HUD until the next tick()
    hide: function() {
        this.setVisible(false);
    },

    tick: function() {
        // Show everything if it was hidden
        this.setVisible(true);

        // Update all text objects
        this.lengthText.text = (snake.desiredLength == snake.topLength) ?
            snake.desiredLength : (snake.desiredLength.toString() + "/" + snake.topLength);
    },

    // Hide or show the entire HUD
    setVisible: function(value) {
        this.background.visible = value;
        this.lengthText.visible = value;
    }
};

// TODO: don't use the default font
