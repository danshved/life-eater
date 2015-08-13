var bootState = {
    preload: function() {
        game.load.spritesheet('cell', 'assets/cells.png', 12, 12);
        game.load.image('background', 'assets/background.png');
        game.load.image('hud-bg', 'assets/hud-bg.png');
    },

    create: function() {
        game.state.start('game');
    }
};

var gameState = {
    // Delay between life ticks, in milliseconds
    TICK_DELAY: 150,

    create: function() {
        // Initialize all gamestate variables (Life field, snake, score etc.)
        this.reset();

        // Prepare to accept user input
        inputQueue.create();

        // Show the bg image: grid around the game field and HUD icons
        game.add.sprite(0, 0, 'background');

        // Create and show the empty field
        grid.create();

        // Create the HUD elements and show initial values
        hud.create();
        hud.tick();

        // Launch the main timer to measure ticks by which Life & the snake live.
        game.time.events.loop(this.TICK_DELAY, this.tick, this);
    },

    // Initializes game state. If a game is already in progress, this will
    // have the effect of aborting it and starting a fresh one.
    reset: function() {
        difficulty.create();
        gameLogic.reset();
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
        if(!inBounds(snake.head.x, snake.head.y) ||
            life.cellAt(snake.head.x, snake.head.y))
        {
            this.reset();
        }
    }
}

// Tell Phaser to launch the game
var game = new Phaser.Game(640, 480, Phaser.AUTO, '');
game.state.add('boot', bootState);
game.state.add('game', gameState);
game.state.start('boot');
