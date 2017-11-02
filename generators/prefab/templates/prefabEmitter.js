<% const T = prefabName.charAt(0).toUpperCase() + prefabName.slice(1); %>
class <%= T %> extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y, maxParticles) {
    super(game, x, y, maxParticles);
  }

  update() {

  }

}

export default <%= T %>;
