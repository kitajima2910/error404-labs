class TitleScreen extends Phaser.Scene {
  preload() {}

  create() {
    const title = this.add.text(400, 150, "Old School Tennis", {
      fontSize: 30,
      fontFamily: '"Press Start 2P"',
    });
    title.setOrigin(0.5, 0.5);

    this.add.text(170, 250, "Press any key to start (Space)", {
      fontSize: 15,
      fontFamily: '"Press Start 2P"',
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(SceneKeys.GameScreen);
      //   console.log("Space pressed");
    });
  }
}
