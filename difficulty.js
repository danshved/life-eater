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
        // Go back to the first level
        this.level = 0;
        this.apply();

        // Tell the ``colony'' object to use level-dependent pattern chooser
        colony.pickPattern = patternChooser.pickPattern;
        colony.pickPatternContext = patternChooser;
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

// The object that determines which patterns spawn on which level
var patternChooser = {
    // All still lifes
    stillPatterns: [],

    // One-time initialization
    initialize: function() {
        // Build the list of all "still life" patterns
        for(var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            if(pattern.kind === 'still') {
                this.stillPatterns.push(pattern);
            }
        }

        // Sort by perimeter
        this.stillPatterns.sort(
            function(a, b) { return a.killLength() - b.killLength(); }
        );

        // TODO: remove
        for(var i = 0; i < this.stillPatterns.length; i++) {
            console.log(this.stillPatterns[i].killLength());
        }

        return this;
    },

    // Pick a random pattern appropriate for the current difficulty level
    pickPattern: function() {
        return this.stillPatterns[game.rnd.between(0, this.stillPatterns.length - 1)];
    }

}.initialize();

