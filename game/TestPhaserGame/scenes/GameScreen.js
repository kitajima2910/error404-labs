class GameScreen extends Phaser.Scene {
	/** @type {Phaser.Physics.Arcade.Body} */

	init() {
		this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);

		this.leftScore = 0;
		this.rightScore = 0;
	}

	preload() { }

	create() {
		/** @type {Phaser.Physics.Arcade.Body} */

		this.scene.run(SceneKeys.GameBackground);
		this.scene.sendToBack(SceneKeys.GameBackground);

		this.physics.world.setBounds(-100, 0, 1000, 500);

		// this.add.text(400, 250, "Game");
		this.ball = this.add.circle(400, 250, 10, Colors.ballColor, 1);
		this.physics.add.existing(this.ball);
		this.ball.body.setBounce(1, 1);

		this.ball.body.setCollideWorldBounds(true, 1, 1);

		this.resetBall();

		this.paddleLeft = this.add.rectangle(30, 250, 20, 100, Colors.paddleColor, 1);
		this.physics.add.existing(this.paddleLeft, true);
		this.physics.add.collider(this.paddleLeft, this.ball);

		this.paddleRight = this.add.rectangle(770, 250, 20, 100, Colors.paddleColor, 1);
		this.physics.add.existing(this.paddleRight, true);
		this.physics.add.collider(this.paddleRight, this.ball);

		this.cursors = this.input.keyboard.createCursorKeys();

		const scoreStyle = {
			fontSize: 48,
			fontFamily: '"Press Start 2P"',
		}

		this.leftScoreLabel = this.add.text(300, 50, this.leftScore, scoreStyle).setOrigin(0.5, 0.5);

		this.rightScoreLabel = this.add.text(500, 450, this.rightScore, scoreStyle).setOrigin(0.5, 0.5);
	}

	incrementLeftScore() {
		this.leftScore++;
		this.leftScoreLabel.text = this.leftScore;
	}

	incrementRightScore() {
		this.rightScore++;
		this.rightScoreLabel.text = this.rightScore;
	}

	resetBall() {
		this.ball.setPosition(400, 250);

		const angle = Phaser.Math.Between(0, 360);
		const vec = this.physics.velocityFromAngle(angle, 200);

		this.ball.body.setVelocity(vec.x, vec.y);
	}

	update() {
		this.handlePlayerInput();
		this.updateAI();
		this.checkScore();
	}

	updateAI() {
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

	checkScore() {
		if (this.ball.x < -30) {
			this.incrementRightScore();
			// console.log("aaaaaaaa");
			this.resetBall();
		} else if (this.ball.x > 830) {
			this.incrementLeftScore();
			// console.log("bbbbbbbb");
			this.resetBall();
		}
	}

	handlePlayerInput() {
		/** @type {Phaser.Physics.Arcade.Body} */
		const body = this.paddleLeft.body;

		if (this.cursors.up.isDown) {
			// console.log("up pressed");
			this.paddleLeft.y += -10;
			body.updateFromGameObject();

		} else if (this.cursors.down.isDown) {
			// console.log("down pressed");
			this.paddleLeft.y += 10;
			body.updateFromGameObject();

		} else {
			// body.setVelocityY(0);
		}
	}
}
