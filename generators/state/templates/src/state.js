<% const up_state = stateName.charAt(0).toUpperCase() + stateName.slice(1); %>
// Documentation for Phaser's (2.6.2) states:: phaser.io/docs/2.6.2/Phaser.State.html
class <%= up_state %> extends Phaser.State {

  // Initialization code in the constructor
  constructor(game, parent) {
    super(game,parent);
  }

  // Load operations (uses Loader), method called first
  preload() {

  }

  // Setup code, method called after preload
  create() {

  }

  // Code ran on each frame of game
  update() {

  }

  // Called when game is paused
  paused() {

  }

  // You're able to do any final post-processing style effects here.
  render() {

  }

  // Called when switching to a new state
  shutdown() {

  }

}

export default <%= up_state %>;
