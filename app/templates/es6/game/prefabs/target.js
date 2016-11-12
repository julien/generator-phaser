//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Target extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'target', frame);

    //setup physics properties
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;

    //set click event
    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

    //setup audio
    this.ding = this.game.add.audio('ding');

    //set size
    this.width = 100;
    this.scale.y = Math.abs(this.scale.x);

    // add animations from spritesheets
    this.animations.add('idling',null,5,true);
    this.animations.play('idling');

    this.changeDirection();
  }

  changeDirection(){
    var spd = 400;
    this.body.velocity.y = Math.random() * spd*2 - spd;
    this.body.velocity.x = Math.random() * spd*2 - spd;

    this.game.time.events.add(Phaser.Timer.SECOND * 0.25, this.changeDirection, this);
  }

  clicked () {
    this.ding.play();

    this.game.global.score++;
  }

}

export default Target;
