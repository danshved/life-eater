var bootState = {
    preload: function() {
        game.load.spritesheet('cell', 'assets/cells.png', 12, 12);
        game.load.image('background', 'assets/background.png');
        game.load.image('hud-bg', 'assets/hud-bg.png');
        game.load.image('gameover-icons', 'assets/gameover-icons.png');
    },

    create: function() {
        // Show the bg image: grid around the game field
        game.add.sprite(0, 0, 'background');

        // Run one-time initializations for all the other states
        gameState.initialize();
        gameOverState.initialize();

        game.state.start('game', false);
    }
};

var gameState = {
    // Delay between life ticks, in milliseconds
    TICK_DELAY: 150,

    // One-time initialization. Called from the 'boot' state.
    initialize: function() {
        // Create and show the empty field
        grid.create();

        // Create the HUD elements and show initial values
        hud.create();
    },

    // Called by Phaser each time when we enter the 'game' state, i.e. a new game is starting
    create: function() {
        // Initialize all gamestate variables (Life field, snake, score etc.)
        difficulty.reset();
        gameLogic.reset();

        // Prepare to accept user input
        inputQueue.create();

        // Launch the main timer to measure ticks by which Life & the snake live.
        game.time.events.loop(this.TICK_DELAY, this.tick, this);

        // Show initial state of the game on the screen
        grid.tick();
        hud.tick();
    },

    // Called by Phaser when we leave the 'game' state.
    shutdown: function() {
        // Hide all the game sprites & other graphics. Do not destroy them,
        // they'll be reused in the next game.
        grid.hide();
        hud.hide();
    },

    tick: function() {
        // Advance the game
        gameLogic.tick(inputQueue.maybePop());

        // Increase difficulty if user has enough score
        difficulty.tick();

        // Show what happened to the user
        grid.tick();
        hud.tick();

        // Keep track of time
        currentTick++;

        // Restart everything when we die
        if(gameLogic.gameOver())
        {
            game.state.start('gameOver', false);
        }
    }
};

var gameOverState = {
    // Positioning of elements on the screen
    TABLE_Y: 249,
    STEP_Y: 30,
    LEFT_X: 190,
    RIGHT_X: 450,

    // "Game over" title text
    gameOver: null,

    // Helper text in the bottom of the screen
    hint: null,

    // Results table
    score: null,
    length: null,
    level: null,

    // The sprite showing icons to the right of the results table
    icons: null,

    // One-time initialization. Called by us from the 'boot' state
    initialize: function() {
        // "Game over" caption
        this.gameOver = game.add.text(320, 163, 'GAME OVER',
                { font: 'bold 36px Arial', fill: 'white' });
        this.gameOver.anchor.set(0.5);

        // Helper text at the bottom
        this.hint = game.add.text(320, 468, 'Click anywhere to restart',
                { font: '16px Arial', fill: 'white' });
        this.hint.anchor.set(0.5, 1.0);

        // The results table
        this.score = this.makeRow('Score', this.TABLE_Y);
        this.length = this.makeRow('Length', this.TABLE_Y + this.STEP_Y);
        this.level = this.makeRow('Difficulty', this.TABLE_Y + 2 * this.STEP_Y);

        // "Icons" to the left of the table
        this.icons = game.add.sprite(this.LEFT_X, this.TABLE_Y, 'gameover-icons');

        // Hide everything, show only when entering the 'gameOver' state
        this.setVisible(false);
    },

    // Helper: make two text objects representing one row in the results table
    makeRow: function(title, y) {
        var result = {
            title: game.add.text(this.LEFT_X + 39, y + 9, title,
                { font: '24px Arial', fill: 'white' }),
            value: game.add.text(this.RIGHT_X, y + 9, '',
                { font: 'bold 24px Arial', fill: 'white' })
        };

        result.title.anchor.set(0.0, 0.5);
        result.value.anchor.set(1.0, 0.5);
        return result;
    },

    // Called by Phaser each time the game enters the 'gameOver' state
    create: function() {
        // Update values in the results table
        this.score.value.text = score;
        this.length.value.text = snake.desiredLength;
        this.level.value.text = difficulty.level + 1;

        // Show all the elements for the "game over" screen
        this.setVisible(true);

        // Restart game when user clicks anywhere
        game.input.onDown.add(this.onMouseDown, this);
    },

    // Called by Phaser each time we leave the 'gameOver' state
    shutdown: function() {
        this.setVisible(false);
    },

    onMouseDown: function() {
        game.state.start('game', false);
    },

    setVisible: function(value) {
        this.gameOver.visible = value;
        this.hint.visible = value;
        this.icons.visible = value;
        this.setRowVisible(this.score, value);
        this.setRowVisible(this.length, value);
        this.setRowVisible(this.level, value);
    },

    setRowVisible: function(row, value) {
        row.title.visible = value;
        row.value.visible = value;
    }
};

// Tell Phaser to launch the game
var game = new Phaser.Game(640, 480, Phaser.AUTO, '');
game.state.add('boot', bootState);
game.state.add('game', gameState);
game.state.add('gameOver', gameOverState);
game.state.start('boot');
