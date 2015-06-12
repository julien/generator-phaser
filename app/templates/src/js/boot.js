(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      // configure game

      // kick off preloader
      this.game.state.start('preloader');
    }
  };

  window['<%= _.slugify(projectName) %>'] = window['<%= _.slugify(projectName) %>'] || {};
  window['<%= _.slugify(projectName) %>'].Boot = Boot;
}());

