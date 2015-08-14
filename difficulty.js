// The difficulty curve manager
var difficulty = {
    // How many levels there are
    LEVEL_COUNT: 10,

    // Which score triggers each level
    // i'th value is the score to pass from level i to i+1.
    LEVELUPS: [],

    // Level that's active at the moment
    level: 0,

    // One-time initialization
    initialize: function() {
        this.LEVELUPS.length = this.LEVEL_COUNT - 1;
        for(var i = 1; i < this.LEVEL_COUNT; i++) {
            this.LEVELUPS[i - 1] = 500 * i * (i + 1);
        }

        return this;
    },

    // Called each time a new game starts
    reset: function() {
        this.level = 0;
        this.apply();
    },

    tick: function() {
        // Levelup if necessary
        while(this.level < this.LEVELUPS.length &&
            score >= this.LEVELUPS[this.level])
        {
            this.level++;
        }

        this.apply();
    },

    // Impose difficulty parameters on the game logic objects
    apply: function() {
        // Spawns per tick: 0.012 (delay 83) -> 0.08 (delay 13)
        var spawnsPerTick = 0.012 + 0.068 * this.level / (this.LEVEL_COUNT - 1);
        colony.spawnDelay = Math.round(1 / spawnsPerTick);
    },

    // Find out which fraction of score the user has got to complete this level
    levelProgress: function() {
        // No progress can ever be made on the last level
        if(this.level >= this.LEVELUPS.length) {
            return 0;
        }

        var nextScore = this.LEVELUPS[this.level];
        var prevScore = (this.level == 0) ? 0 : this.LEVELUPS[this.level - 1];
        return (score - prevScore) / (nextScore - prevScore);
    }

}.initialize();

