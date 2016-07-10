<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
'use strict';

<%= up_prefab %>.prototype = Object.create(Phaser.Group.prototype);

  // prefab initialization and construction
<%= up_prefab %>.prototype.constructor = function(game, parent) {
  Phaser.Sprite.call(this, game, parent);

};

  // prefab specific frame update code
<%= up_prefab %>.prototype.update = function() {

};

module.exports = <%= up_prefab %>;
