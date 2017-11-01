<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
//Documentation for Phaser's (2.6.2) text:: phaser.io/docs/2.6.2/Phaser.Text.html
class <%= up_prefab %> extends Phaser.Text {

  //initialization code in the constructor
  constructor(game, x, y, text, style) {
    super(game, x, y, text, style);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default <%= up_prefab %>;
