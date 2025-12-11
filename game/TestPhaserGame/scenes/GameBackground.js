class GameBackground extends Phaser.Scene {
	constructor() {
		super("GameBackground");
	}

	preload() { }

	create() { 

        const whiteColor = 0xffffff;
        console.log("GameBackground");
        this.add.line(400, 250, 0, 0, 0, 500, whiteColor, 5).setLineWidth(5, 5);
        this.add.circle(400, 250, 50).setStrokeStyle(5, whiteColor, 1);

        
    }
}