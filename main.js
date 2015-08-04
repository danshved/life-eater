var game = new Phaser.Game(640, 360, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('tail', 'assets/tail-cell.png'); // 12x12
    game.load.image('head', 'assets/head-cell.png'); // 12x12
    game.load.spritesheet('life', 'assets/life-cells.png', 12, 12);
}

var step = 12;   // Cell size in pixels
var sizex = 50;  // Field width in cells
var sizey = 30;  // Field height in cells

// The Life field
var sprites = [];
var field = [];
var newfield = [];

// Text object in the corner
var txt;

// Update counter
var counter = 0;

// Time of the last life "tick"
var tickInterval = 300; // Delay between life ticks, in milliseconds

function create() {
    var grp = game.add.spriteBatch();

    for(var x = 0; x < sizex; x++) {
        for(var y = 0; y < sizey; y++) {
            //var sprite = game.add.sprite(20 + step * x, step * y, 'life');
            var sprite = grp.create(20 + step * x, step * y, 'life');
            sprite.animations.add('die', [0, 1, 2, 3], 9, false);
            sprite.animations.add('appear', [3, 2, 1, 0], 9, false);
            sprite.visible = false;
            sprites.push(sprite);

            field.push(!game.rnd.between(0, 4));
            newfield.push(false);
        }
    }

    txt = game.add.text(20, 20, 'Hello', { fontSize: '32px', fill: 'white' });

    game.time.advancedTiming = true;
    game.time.events.loop(tickInterval, tickUpdate);
}

//var now, x, y, cnt, dx, dy, i, tmp;

function update() {
    // Show fps
    txt.text = game.time.fps;
}

function tickUpdate() {
    lifeTick();
}

function lifeTick() {
    // Update the field according to the rules
    for(var x = 0; x < sizex; x++) {
        for(var y = 0; y < sizey; y++) {
            // Count the neighbors
            var cnt = 0;
            for(var dx = -1; dx <= 1; dx++) {
                for(var dy = -1; dy <= 1; dy ++) {
                    if(field[sizey * ((x + dx + sizex) % sizex) + ((y + dy + sizey) % sizey)]) {
                        cnt++;
                    }
                }
            }

            // Apply the rules of the game of life
            var i = sizey * x + y;
            newfield[i] = (cnt == 3) || (cnt == 4 && field[i]);
        }
    }

    var tmp = newfield;
    newfield = field;
    field = tmp;

    // Animate birth & death of cells
    for(var i = 0; i < field.length; i++) {
        if(field[i]) {
            sprites[i].visible = true;
            if(!newfield[i]) {
                sprites[i].animations.play('appear');
            } else {
                sprites[i].animations.stop();
                sprites[i].frame = 0;
            }
        } else if(newfield[i]) {
            sprites[i].animations.play('die');
        } else {
            sprites[i].visible = false;
        }
    }
}

