class GameBackground extends Phaser.Scene {
	constructor() {
		super("GameBackground");
	}

	preload() { }

	create() { 

        this.add.line(400, 250, 0, 0, 0, 500, Colors.whiteColor, 5).setLineWidth(5, 5);
        this.add.circle(400, 250, 50).setStrokeStyle(5, Colors.whiteColor, 1);
    }
}