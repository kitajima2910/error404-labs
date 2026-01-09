class GameOver extends Phaser.Scene {
    constructor() {
        super(SceneKeys.GameOver);
    }

    create(data) {
        // this.add.text(400, 250, "Game Over");
        console.dir(data);

        let titleText = "Tro Choi Ket Thuc";
        if (data.leftScore > data.rightScore) {
            titleText = "Ban Thang!";
        }

        this.add
            .text(400, 200, titleText, {
                fontSize: 30,
                fontFamily: PressStart2P,
            })
            .setOrigin(0.5, 0.5);

        this.add
            .text(400, 300, "Nhan Phim 'Space' De Tiep Tuc", {
                fontSize: 20,
                fontFamily: PressStart2P,
            })
            .setOrigin(0.5, 0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start(SceneKeys.TitleScreen);
        });
    }
}
