//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class Crosshairs extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, 'crosshairs', frame);

    //set size
    this.width = 35; 
    this.scale.y = Math.abs(this.scale.x);

    this.anchor.setTo(0.5, 0.5);
  }

  update(){
    this.x = this.game.input.mousePointer.x;
    this.y = this.game.input.mousePointer.y;
  }

}

export default Crosshairs;
