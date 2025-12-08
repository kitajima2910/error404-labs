class GameScreen extends Phaser.Scene {
	preload() { }

	create() {
		// this.add.text(400, 250, "Game");
		const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
		this.physics.add.existing(ball);
		ball.body.setBounce(1, 1);

		ball.body.setVelocity(-200, 0);
		ball.body.setCollideWorldBounds(true, 1, 1);

		this.paddleLeft = this.add.rectangle(30, 250, 20, 100, 0xffffff, 1);
		this.physics.add.existing(this.paddleLeft, true);
		this.physics.add.collider(this.paddleLeft, ball);

		// this.paddleRight = this.add.rectangle(770, 250, 20, 100, 0xffffff, 1);
		// this.physics.add.existing(this.paddleRight, true);
		// this.physics.add.collider(this.paddleRight, ball);

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		/** @type {Phaser.Physics.Arcade.Body} */
		const body = this.paddleLeft.body;

		if (this.cursors.up.isDown) {
			console.log("up pressed");
			this.paddleLeft.y += -10;
			body.updateFromGameObject();

		} else if (this.cursors.down.isDown) {
			console.log("down pressed");
			this.paddleLeft.y += 10;
			body.updateFromGameObject();

		} else {
			// body.setVelocityY(0);
		}
	}
}
