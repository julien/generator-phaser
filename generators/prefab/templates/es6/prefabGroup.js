<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
//Documentation for Phaser's (2.6.2) group:: phaser.io/docs/2.6.2/Phaser.Group.html
class <%= up_prefab %> extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent) {
    super(game, parent);
  }

}

export default <%= up_prefab %>;
