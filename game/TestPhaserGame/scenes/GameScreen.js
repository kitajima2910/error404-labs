class GameScreen extends Phaser.Scene {
  preload() {}

  create() {
    // this.add.text(400, 250, "Game");
    const ball = this.add.circle(400, 250, 10, 0xffffff, 1);
    this.physics.add.existing(ball);
    ball.body.setBounce(1, 1);

    ball.body.setVelocity(-200, 0);
    ball.body.setCollideWorldBounds(true, 1, 1);

    const paddleLeft = this.add.rectangle(30, 250, 20, 100, 0xffffff, 1);
    this.physics.add.existing(paddleLeft, true);
    this.physics.add.collider(paddleLeft, ball);

    const paddleRight = this.add.rectangle(770, 250, 20, 100, 0xffffff, 1);
    this.physics.add.existing(paddleRight, true);
    this.physics.add.collider(paddleRight, ball);
  }
}
