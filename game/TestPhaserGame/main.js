const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: Colors.blackColor,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true,
        },
    },
};

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.TitleScreen, TitleScreen);
game.scene.add(SceneKeys.GameScreen, GameScreen);
game.scene.add(SceneKeys.GameBackground, GameBackground);
game.scene.add(SceneKeys.GameOver, GameOver);

game.scene.start(SceneKeys.TitleScreen);
// game.scene.start(SceneKeys.GameScreen);
