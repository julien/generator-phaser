function Gameover() {}

Gameover.prototype.create = function () {
  var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Gameover', {
    font: '42px Arial', fill: '#ffffff', align: 'center'
  });
  text.anchor.set(0.5);

  this.input.onDown.add(this.onInputDown, this);
};

Gameover.prototype.update = function () {};

Gameover.prototype.onInputDown = function () {
  this.game.state.start('menu');
};

module.exports = Gameover;
