<% var up_state = stateName.charAt(0).toUpperCase() + stateName.slice(1); %>

//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class <%= up_state %> extends Phaser.State {

  constructor(options) {
    //ES6 constructor
  }

  preload() {
    //Load operations (uses Loader), method called first
  }

  create() {
    //Setup code, method called after preload
  }

  update() {
    //Code ran on each frame of game
  }

  paused() {
    //Called when game is paused
  }

  render() {
    //You're able to do any final post-processing style effects here.
  }

  shutdown() {
    //Called when switching to a new state
  }

}

export default <%= up_state %>;
