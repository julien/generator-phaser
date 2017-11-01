<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
//Documentation for Phaser's (2.6.2) sprites:: phaser.io/docs/2.6.2/Phaser.Sprite.html
class <%= up_prefab %> extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, frame) {
    super(game, x, y, '<%= prefabName %>', frame);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default <%= up_prefab %>;
