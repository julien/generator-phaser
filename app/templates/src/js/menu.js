(function () {
  'use strict';

  var ref = window['<%= _.slugify(projectName) %>'] || (window['<%= _.slugify(projectName) %>'] = {});

  ref.Menu = function () {
    this.titleTxt = null;
    this.startTxt = null;
  };

  ref.Menu.prototype = {
    
    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titleTxt = this.add.bitmapText(x, y, 'Example Game', {font: '16px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);

      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'START', {font: '12px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);

      this.input.onDown.add(this.onDown, this);
    },

    update: function () {
    
    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

}(this));

