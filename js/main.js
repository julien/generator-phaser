(function () {

  var game,
    img,
    width = document.body.clientWidth,
    height = document.body.clientHeight;

  function preload() {
    game.load.image('example', 'assets/example.png');
  }

  function create() {
    img = game.add.sprite(width / 2, height / 2, 'example');
    img.anchor = new Phaser.Point(0.5, 0.5);

    game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
    game.stage.scale.setShowAll();
    window.addEventListener('resize', function () {
      game.stage.scale.refresh();
    });
  }

  function update() {
    var x, y, cx, cy, dx, dy, angle, scale;

    x = game.input.position.x;
    y = game.input.position.y;
    cx = game.world.centerX;
    cy = game.world.centerY;

    angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    img.angle = angle;

    dx = x - cx;
    dy = y - cy;
    scale = Math.sqrt(dx * dx + dy * dy) / 100;

    img.scale.x = scale * 0.6;
    img.scale.y = scale * 0.6;
  }

  game = new Phaser.Game(width, height, Phaser.WEBGL, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
  });

  window.game = game; // just for debugging
}());

