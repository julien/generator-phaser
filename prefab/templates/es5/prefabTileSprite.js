<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
'use strict';

//Documentation for Phaser's (2.6.2) tile sprites:: phaser.io/docs/2.6.2/Phaser.TileSprite.html
<%= up_prefab %>.prototype = Object.create(Phaser.TileSprite.prototype);

  // prefab initialization and construction
<%= up_prefab %>.prototype.constructor = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, '<%= prefabName %>');

};

  // prefab specific frame update code
<%= up_prefab %>.prototype.update = function() {

};

module.exports = <%= up_prefab %>;
