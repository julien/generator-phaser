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
  }

  function update() {
    img.rotation += 0.05;
  }

  game = new Phaser.Game(width, height, Phaser.WEBGL, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
  });

}());

