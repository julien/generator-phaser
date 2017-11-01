<% var up_prefab = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
//Documentation for Phaser's (2.6.2) emitter:: phaser.io/docs/2.6.2/Phaser.Particles.Arcade.Emitter.html
class <%= up_prefab %> extends Phaser.Particles.Arcade.Emitter {

  //initialization code in the constructor
  constructor(game, x, y, maxParticles) {
    super(game, x, y, maxParticles);
  }

  //Code ran on each frame of game
  update() {

  }

}

export default <%= up_prefab %>;
