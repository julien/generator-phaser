(function () {
  'use strict'; 

  var game, img;

  function preload() {
    game.load.image('example', 'assets/example.png');
  }

  function create() {
    img = game.add.sprite(400, 300, 'example');
    img.anchor = new Phaser.Point(0.5, 0.5);
  }

  function update() {
    img.rotation += 0.05;
  }

  game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
  });
}());

