class Game extends Phaser.State {

  create() {
    this.input.onDown.add(this.onInputDown, this);
  }

  update() {}

  onInputDown() {
    this.game.state.start('menu');
  }

}

export default Game;
