class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {
    this.game.load.image('background','assets/bg_wood.png');
    this.game.load.image('crosshairs', 'assets/crosshair_red_small.png');
    this.game.load.image('text_go', 'assets/text_go.png');
    this.game.load.image('text_ready', 'assets/text_ready.png');

    this.game.load.spritesheet('target', 'assets/target.png',128.66,128);

    this.game.load.audio('gunshot','assets/gunshot.wav');
    this.game.load.audio('ding','assets/ding.wav');
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
