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

    // Called each time the user starts a new game
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

