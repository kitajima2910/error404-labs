class TitleScreen extends Phaser.Scene {
  preload() {}

  create() {
    const title = this.add.text(400, 150, "Quan Vot Kieu Co Dien", {
      fontSize: 30,
      fontFamily: '"Press Start 2P"',
    });
    title.setOrigin(0.5, 0.5);

    this.add.text(170, 250, "Nhan Phim 'Space' De Bat Dau", {
      fontSize: 15,
      fontFamily: '"Press Start 2P"',
    });

    this.add.text(120, 350, "Dieu Khien - Phim Mui Ten Len/Xuong", {
      fontSize: 15,
      fontFamily: '"Press Start 2P"',
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(SceneKeys.GameScreen);
      //   console.log("Space pressed");
    });
  }
}
