(function() {
  'use strict';

  function Menu() {}

  Menu.prototype = {
    create: function () {
      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
        'MENU', {font: '42px Arial', fill: '#ffffff', align: 'center'
      });
      text.anchor.set(0.5);
      this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['<%= _.slugify(projectName) %>'] = window['<%= _.slugify(projectName) %>'] || {};
  window['<%= _.slugify(projectName) %>'].Menu = Menu;
}());
