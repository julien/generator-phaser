import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';

class Game extends Phaser.State {

  constructor() {
    super();
  }
  
  create() {
    //add background image
    this.background = this.game.add.sprite(0,0,'background');
    this.background.height = this.game.world.height;
    this.background.width = this.game.world.width;


    //setup UI
    this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
      font: '40px Arial', fill: '#ffffff', align: 'center'
    });
    this.countdownText.anchor.set(0.5,0);

    //set up click listeners
    this.game.input.onDown.add(this.shoot, this);

    //setup audio
    this.gunshot = this.game.add.audio('gunshot');

    //setup prefabs
    this.crosshairs = new Crosshairs(this.game);
    this.target = new Target(this.game,this.game.world.centerX,this.game.world.centerY);
    this.game.add.existing(this.crosshairs);
    this.game.add.existing(this.target);

    //setup a timer to end the game
    this.endGameTimer = this.game.time.create();
    this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame,this);
    this.endGameTimer.start();
  }

  shoot(click){
    this.gunshot.play();
  }

  update() {
    this.countdownText.setText( (this.endGameTimer.duration/1000).toFixed(1));
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
