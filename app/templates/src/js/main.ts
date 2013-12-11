///<reference path='./lib/phaser.d.ts'/>
class ExampleGame {

  game: Phaser.Game
  img: Phaser.Sprite

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
      preload: this.preload,
      create: this.create,
      update: this.update
    });
  }

  preload() {
    this.game.load.image('example', 'assets/example.png');
  }

  create() {
    var width = document.body.clientWidth,
      height = document.body.clientHeight;

    this.img = this.game.add.sprite(width / 2, height / 2, 'example');
    this.img.anchor = new Phaser.Point(0.5, 0.5);

    this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
    this.game.stage.scale.setShowAll();

    window.onresize = ()=> {
      this.game.stage.scale.refresh();
    };
  }

  update() {
    var x, y, cx, cy, dx, dy, angle, scale;

    x = this.game.input.position.x;
    y = this.game.input.position.y;
    cx = this.game.world.centerX;
    cy = this.game.world.centerY;

    angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    this.img.angle = angle;

    dx = x - cx;
    dy = y - cy;
    scale = Math.sqrt(dx * dx + dy * dy) / 100;

    this.img.scale.x = scale * 0.6;
    this.img.scale.y = scale * 0.6;

  }
}

window.onload = ()=> {
  new ExampleGame();
};

