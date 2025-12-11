const config = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("TitleScreen", TitleScreen);
game.scene.add("GameScreen", GameScreen);
game.scene.add("GameBackground", GameBackground);

// game.scene.start("TitleScreen");
game.scene.start("GameScreen");
