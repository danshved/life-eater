var bootState = {
    preload: function() {
        game.load.spritesheet('cell', 'assets/cells.png', 12, 12);
        game.load.image('background', 'assets/background.png');
        game.load.image('hud-bg', 'assets/hud-bg.png');
    },

    create: function() {
        // Show the bg image: grid around the game field
        game.add.sprite(0, 0, 'background');

        // Create and show the empty field
        grid.create();

        // Create the HUD elements and show initial values
        hud.create();

        game.state.start('game', false);
    }
};

var gameState = {
    // Delay between life ticks, in milliseconds
    TICK_DELAY: 150,

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
            game.state.start('game', false);
        }
    }
}

// Tell Phaser to launch the game
var game = new Phaser.Game(640, 480, Phaser.AUTO, '');
game.state.add('boot', bootState);
game.state.add('game', gameState);
game.state.start('boot');
