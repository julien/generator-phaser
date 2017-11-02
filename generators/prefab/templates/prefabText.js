<% const T = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
class <%= T %> extends Phaser.Text {

  constructor(game, x, y, text, style) {
    super(game, x, y, text, style);
  }

  update() {

  }

}

export default <%= T %>;
