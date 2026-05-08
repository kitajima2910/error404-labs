// Phaser loaded globally from CDN

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Game constants
        const WORLD_WIDTH = 2000;
        const WORLD_HEIGHT = 600;
        const GROUND_HEIGHT = 50;
        const PLAYER_SIZE = 32;
        const PLAYER_SPEED = 200;
        const JUMP_FORCE = 400;

        // Set world bounds
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        // Create ground
        this.ground = this.add.graphics();
        this.ground.fillStyle(0x00ffff); // Neon cyan
        this.ground.fillRect(0, WORLD_HEIGHT - GROUND_HEIGHT, WORLD_WIDTH, GROUND_HEIGHT);

        // Create ground physics body
        this.groundBody = this.physics.add.staticGroup();
        this.groundBody.create(WORLD_WIDTH / 2, WORLD_HEIGHT - GROUND_HEIGHT / 2, null).setScale(WORLD_WIDTH, GROUND_HEIGHT).refreshBody();

        // Create player (neon rectangle)
        this.player = this.add.graphics();
        this.player.fillStyle(0xff00ff); // Neon magenta
        this.player.fillRect(-PLAYER_SIZE / 2, -PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE);

        // Create player physics body
        this.playerBody = this.physics.add.sprite(100, WORLD_HEIGHT - GROUND_HEIGHT - PLAYER_SIZE, null);
        this.playerBody.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE);
        this.playerBody.setCollideWorldBounds(false); // Allow falling off screen
        this.playerBody.body.setGravityY(0); // Override default gravity for now

        // Add player graphics to physics body
        this.playerBody.setData('graphics', this.player);

        // Enable collisions
        this.physics.add.collider(this.playerBody, this.groundBody);

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Camera follow player
        this.cameras.main.startFollow(this.playerBody, false, 0.5, 0.5);

        // Placeholder transition to UI scene
        this.scene.launch('UIScene');

        console.log('GameScene: Game world initialized.');
    }

    update() {
        // Auto-run player to the right
        this.playerBody.setVelocityX(200);

        // Jump logic (only when on ground)
        if ((this.cursors.up.isDown || this.spaceKey.isDown) && this.playerBody.body.touching.down) {
            this.playerBody.setVelocityY(-400);
        }

        // Update player graphics position
        if (this.playerBody.getData('graphics')) {
            this.playerBody.getData('graphics').setPosition(this.playerBody.x, this.playerBody.y);
        }

        // Check if player fell below screen
        if (this.playerBody.y > this.sys.game.config.height) {
            console.log('GAME OVER');
            // Temporary: reset position (for testing)
            this.playerBody.setPosition(100, 500);
            this.playerBody.setVelocity(200, 0);
        }
    }
}

export default GameScene;