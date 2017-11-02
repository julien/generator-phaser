<% const T = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
class <%= T %> extends Phaser.TileSprite {

  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, '<%= prefabName %>');
  }

  update() {

  }

}

export default <%= T %>;
