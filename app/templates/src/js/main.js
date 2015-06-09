window.onload = function () {
  'use strict';

  var game, ns = window['<%= _.slugify(projectName) %>'];

  game = new Phaser.Game(640, 480, Phaser.AUTO, '<%= _.slugify(projectName) %>-game');
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');
};
