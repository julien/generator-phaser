<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
'use strict';

<%= up_prefab %>.prototype = Object.create(Phaser.Sprite.prototype);

  // prefab initialization and construction
<%= up_prefab %>.prototype.constructor = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, '<%= prefabName %>', frame);

};

  // prefab specific frame update code
<%= up_prefab %>.prototype.update = function() {

};

module.exports = <%= up_prefab %>;
