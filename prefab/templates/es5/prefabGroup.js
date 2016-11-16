<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
'use strict';

//Documentation for Phaser's (2.6.2) group:: phaser.io/docs/2.6.2/Phaser.Group.html
<%= up_prefab %>.prototype = Object.create(Phaser.Group.prototype);

  // prefab initialization and construction
<%= up_prefab %>.prototype.constructor = function(game, parent) {
  Phaser.Group.call(this, game, parent);

};

  // prefab specific frame update code
<%= up_prefab %>.prototype.update = function() {

};

module.exports = <%= up_prefab %>;
