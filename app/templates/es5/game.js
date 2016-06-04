function Game() {}

Game.prototype.create = function () {
  this.input.onDown.add(this.onInputDown, this);
};

Game.prototype.update = function () {};

Game.prototype.onInputDown = function () {
  this.game.state.start('menu');
};

module.exports = Game;
