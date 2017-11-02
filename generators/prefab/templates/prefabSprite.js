<% const T = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
class <%= T %> extends Phaser.Sprite {

  constructor(game, x, y, frame) {
    super(game, x, y, '<%= prefabName %>', frame);
  }

  update() {

  }

}

export default <%= T %>;
