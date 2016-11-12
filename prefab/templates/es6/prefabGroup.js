<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
//Documentation for Phaser's (2.5.0) group:: phaser.io/docs/2.5.0/Phaser.Group.html
class <%= up_prefab %> extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent) {
    super(game, parent);
  }

  //Load operations (uses Loader), method called first
  preload() {

  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {

  }

  //Called when game is paused
  paused() {

  }

  //You're able to do any final post-processing style effects here.
  render() {

  }

  //Called when switching to a new state
  shutdown() {

  }

}

export default <%= up_prefab %>;
