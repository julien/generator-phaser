function Game() {}

Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);

    var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Game', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
};

Game.prototype.update = function () {};

Game.prototype.onInputDown = function () {
  this.game.state.start('gameover');
};

module.exports = Game;
