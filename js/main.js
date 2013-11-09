(function () {
  var game,
    width = 240,
    height = 320, 
    player,
    ball,
    ballSpeed = 300,
    ballReleased = 0,
    cpu,
    cpuSpeed = 190;

  function createPaddle(x, y) {
    var p = game.add.sprite(x, y, 'paddle');
    p.anchor.setTo(.5, .5);
    p.body.collidWorldsBounds = true;
    p.body.bounce.setTo(1, 1);
    p.body.immovable = true;
    return p;
  }

  function releaseBall() {
    if (!ballReleased) {
      ball.body.velocity.x = ballSpeed;
      ball.body.velocity.y = -ballSpeed;
      ballReleased = 1;
    }
  }

  function handleCollision(ball, paddle) {
    var diff = 0;
    if (ball.x < paddle.x) {
      diff = paddle.x - ball.x;
      ball.body.velocity.x = -10 * diff;
    } else if (ball.x > paddle.x) {
      diff = ball.x - paddle.x;
      ball.body.velocity.x = 10 * diff;
    } else {
      ball.body.velocity.x = 2 + Math.random() * 8;
    }
  }
  
  function resetBall() {
    if (ballReleased) {
      ball.x = game.world.centerX;
      ball.y = game.world.centerY;
      ball.body.velocity.x = 0;
      ball.body.velocity.y = 0;
      ballReleased = 0;
    }      
  }

  function checkBounds() {
    var top = ball.height / 2, 
      bottom = game.world.height - (ball.height / 2);
    
    if (ball.y < top || ball.y > bottom) {
      resetBall();
    }
  }
  
  // phaser specific functions
  function preload () {
    game.load.image('paddle', 'assets/phaser-pong-paddle.png');
    game.load.image('ball', 'assets/phaser-pong-ball.png');
    game.load.image('background', 'assets/phaser-pong-background.jpg');
  }

  function create() {
    game.add.tileSprite(0, 0, 240, 320, 'background');

    player = createPaddle(game.world.centerX, game.world.height - 20);
    cpu = createPaddle(game.world.centerX, 20);
    ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
    ball.anchor.setTo(0.5, 0.5);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);

    game.input.onDown.add(releaseBall, this);
  }

  function update() {
    var width = player.width / 2;
    
    player.x = game.input.x;

    if (player.x < width) {
      player.x = width;
    } else if (player.x > game.width - width) {
      player.x = game.width - width;
    }

    if (cpu.x - ball.x < -15) {
      cpu.body.velocity.x = cpuSpeed; 
    } else if (cpu.x - ball.x > 15) {
      cpu.body.velocity.x = -cpuSpeed;
    } else {
      cpu.body.velocity.x = 0;
    }

    // collision detection
    game.physics.collide(ball, player, handleCollision, null, this);
    game.physics.collide(ball, cpu, handleCollision, null, this);

    checkBounds();
  }

  game = new Phaser.Game(width, height, Phaser.WEBGL, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
  });

  window.game = game; // just for debugging
}());

