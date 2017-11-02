<% const T = stateName.charAt(0).toUpperCase() + stateName.slice(1); %>
class <%= T %> extends Phaser.State {

  constructor(game, parent) {
    super(game,parent);
  }

  preload() {

  }

  create() {

  }

  update() {

  }

  paused() {

  }

  render() {

  }

  shutdown() {

  }

}

export default <%= T %>;
