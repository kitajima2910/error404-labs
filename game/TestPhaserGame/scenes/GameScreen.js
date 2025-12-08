class GameScreen extends Phaser.Scene {
	/** @type {Phaser.Physics.Arcade.Body} */

	init() {
		this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
	}

	preload() { }

	create() {
		/** @type {Phaser.Physics.Arcade.Body} */
		// this.add.text(400, 250, "Game");
		this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
		this.physics.add.existing(this.ball);
		this.ball.body.setBounce(1, 1);

		this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
		this.ball.body.setCollideWorldBounds(true, 1, 1);

		this.paddleLeft = this.add.rectangle(30, 250, 20, 100, 0xffffff, 1);
		this.physics.add.existing(this.paddleLeft, true);
		this.physics.add.collider(this.paddleLeft, this.ball);

		this.paddleRight = this.add.rectangle(770, 250, 20, 100, 0xffffff, 1);
		this.physics.add.existing(this.paddleRight, true);
		this.physics.add.collider(this.paddleRight, this.ball);

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

		const diff = this.ball.y - this.paddleRight.y;
		// console.log(diff);

		if (Math.abs(diff) < 10) {
			return;
		}

		const aiSpeed = 2;

		if (diff < 0) {
			this.paddleRightVelocity.y = -aiSpeed;
			if (this.paddleRightVelocity.y < -10) {
				this.paddleRightVelocity.y = -10;
			}
		} else if (diff > 0) {
			this.paddleRightVelocity.y = aiSpeed;
			if (this.paddleRightVelocity.y > 10) {
				this.paddleRightVelocity.y = 10;
			}
		}

		this.paddleRight.y += this.paddleRightVelocity.y;
		this.paddleRight.body.updateFromGameObject();
	}
}
