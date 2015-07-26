// Generate instructions for game play at the top of the screen
$('body').append('<h1> INSTRUCTIONS</h1>');
$('body').append('<p>Use the arrow keys to move the player to the water.</p>');
$('body').append('<p>When you reach the top, press the UP arrow to start over.</p>');
$('body').append("<p>Press 'r' to toggle between your character and a rock. </p>");
$('body').append("<p>When you are a rock, you are immune to bugs, but you also cannot move!</p>");

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    // once the bug's location of off the screen to the right, set it off to the left before re-entering the board
    if (this.x > 715) {
        this.x = -20;
    }
    // check to see if the lcoation of a bug is in the same location as the player to detect a crash
    if ((Math.abs(this.y - player.y) < 10) && (Math.abs(this.x - player.x) < 60)) {
        // only detect a crash if the player is not a rock
        if (player.sprite != 'images/Rock.png') {
            // reset the game if there is a collision
            reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = (707 / 7) * 3;
    this.y = 480;
    this.maxUp = 55;
    this.maxDown = 480;
    this.maxLeft = 5;
    this.maxRight = 590;
    this.won = false;
};

// Player object
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {};

// Detect the keyboard input for the player
Player.prototype.handleInput = function(e) {
    // If the player is in character form (not a rock)
    if (player.sprite != 'images/Rock.png') {
        // control the player's location based on keyboard input
        switch (e) {
            case 'up':
                // if the character wins
                if (this.y > 55 && this.y < 145) {
                    player.won = true;
                    winner.x = player.x;
                    // render a star on top of the player's head upon winning
                    winner.y = player.y - 135;
                    winner.render();
                }
                // when the player reaches the water
                if (this.y === 55) {
                    // reset the game, bringing the character back to the bottom
                    reset();
                } else if (this.y > this.maxUp) {
                    this.y -= 85;
                }
                break;
            case 'down':
                // move the player down one block
                if (this.y < this.maxDown && this.won === false) {
                    this.y += 85;
                }
                break;
            case 'right':
                // move the player one block to the right
                if (this.x < this.maxRight && this.won === false) {
                    this.x += 100;
                }
                break;
            case 'left':
                // move the player one block to the left
                if (this.x > this.maxLeft && this.won === false) {
                    this.x -= 100;
                }
                break;
            case 'r':
                // if the player has not yet reached the top
                if (this.won === false) {
                    // turn into a rock
                    player.sprite = 'images/Rock.png';
                }
                break;
        }
    } else {
        // if player is a rock
        if (e === 'r') {
            this.sprite = 'images/char-horn-girl.png';
        }
    }
};

// Win object, to display when the character reaches the top
var Win = function() {
    this.sprite = 'images/Star.png';
    this.x = 0;
    this.y = 0;
};

// Display only whwen the character has won
Win.prototype.render = function() {
    if (player.won) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Reset the game, setting the player to the bottom of the board and setting the win object to false
var reset = function() {
    player.x = (707 / 7) * 3;
    player.y = 480;
    player.won = false;
    winner.render();
};

// Now instantiate your objects.
var enemy1 = new Enemy(-420, 135, 320);
var enemy2 = new Enemy(-80, 225, 250);
var enemy3 = new Enemy(-300, 230, 300);
var enemy4 = new Enemy(-190, 315, 380);
var enemy5 = new Enemy(-650, 400, 250);
var enemy6 = new Enemy(-220, 135, 220);
var enemy7 = new Enemy(-200, 400, 350);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

// Place the player object in a variable called player
var player = new Player();

// Create a new Win object
var winner = new Win();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        67: 'c',
        82: 'r'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
