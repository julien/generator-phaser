<% const T = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
class <%= T %> extends Phaser.Group {

  constructor(game, parent) {
    super(game, parent);
  }

}

export default <%= T %>;
