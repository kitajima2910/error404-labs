// Phaser loaded globally from CDN

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Game constants
        const WORLD_HEIGHT = 600;
        const PLAYER_SIZE = 32;
        const PLAYER_SPEED = 200;
        const JUMP_FORCE = 400;

        // Platform generation constants
        this.PLATFORM_HEIGHT = 50;
        this.PLATFORM_MIN_WIDTH = 150;
        this.PLATFORM_MAX_WIDTH = 350;
        this.GAP_MIN = 50;
        this.GAP_MAX = 120;
        this.PLAYER_START_X = 100;
        this.PLATFORM_Y = WORLD_HEIGHT - this.PLATFORM_HEIGHT;

        // Hazard constants
        this.HAZARD_SPAWN_CHANCE = 0.3;
        this.HAZARD_WIDTH = 20;
        this.HAZARD_HEIGHT = 30;
        this.HAZARD_MARGIN = 50;
        this.MIN_PLATFORM_FOR_HAZARD = 200;

        // Game over flags
        this.gameOverTriggered = false;
        this.isGameOver = false;

        // Score tracking
        this.score = 0;
        this.bestScore = 0;

        // Set world bounds (large X for endless)
        this.physics.world.setBounds(0, 0, 1000000, WORLD_HEIGHT);

        // Initialize platform system
        this.platforms = this.physics.add.staticGroup();
        this.platformList = [];

        // Initialize hazard system
        this.hazards = this.physics.add.staticGroup();

        // Add initial platforms
        this.addInitialPlatforms();

        // Create player (neon rectangle)
        this.player = this.add.graphics();
        this.player.fillStyle(0xff00ff); // Neon magenta
        this.player.fillRect(-PLAYER_SIZE / 2, -PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE);

        // Create player physics body
        this.playerBody = this.physics.add.sprite(this.PLAYER_START_X, this.PLATFORM_Y - PLAYER_SIZE, null);
        this.playerBody.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE);
        this.playerBody.setCollideWorldBounds(false); // Allow falling off screen
        this.playerBody.setGravityY(300); // Standard gravity for jump feel

        // Add player graphics to physics body
        this.playerBody.setData('graphics', this.player);

        // Enable collisions
        this.physics.add.collider(this.playerBody, this.platforms);
        this.physics.add.collider(this.playerBody, this.hazards, this.onHazardCollision, null, this);

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Camera follow player
        this.cameras.main.startFollow(this.playerBody, false, 0.5, 0.5);

        // Placeholder transition to UI scene
        this.scene.launch('UIScene');

        console.log('GameScene: Game world initialized.');
    }

    addPlatform(x, width) {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x00ffff); // Neon cyan
        graphics.fillRect(x, this.PLATFORM_Y, width, this.PLATFORM_HEIGHT);

        const body = this.platforms.create(x + width / 2, this.PLATFORM_Y + this.PLATFORM_HEIGHT / 2, null);
        body.setDisplaySize(width, this.PLATFORM_HEIGHT);
        body.refreshBody();
        body.setData('graphics', graphics);

        // Add hazard if eligible
        if (width >= this.MIN_PLATFORM_FOR_HAZARD && Math.random() < this.HAZARD_SPAWN_CHANCE && x > 400) { // Not on first platform
            this.addHazard(x, width);
        }

        this.platformList.push({ x, width, body, graphics });
    }

    addHazard(platformX, platformWidth) {
        const hazardX = platformX + this.HAZARD_MARGIN + Phaser.Math.Between(0, platformWidth - 2 * this.HAZARD_MARGIN - this.HAZARD_WIDTH);

        const graphics = this.add.graphics();
        graphics.fillStyle(0xff0000); // Neon red
        graphics.fillRect(hazardX, this.PLATFORM_Y - this.HAZARD_HEIGHT, this.HAZARD_WIDTH, this.HAZARD_HEIGHT);

        const body = this.hazards.create(hazardX + this.HAZARD_WIDTH / 2, this.PLATFORM_Y - this.HAZARD_HEIGHT / 2, null);
        body.setDisplaySize(this.HAZARD_WIDTH, this.HAZARD_HEIGHT);
        body.refreshBody();
        body.setData('graphics', graphics);
    }

    addInitialPlatforms() {
        let currentX = 0;

        // First platform where player starts (generous size)
        this.addPlatform(currentX, 400);

        // Add several platforms ahead
        for (let i = 0; i < 10; i++) {
            const lastPlatform = this.platformList[this.platformList.length - 1];
            const width = Phaser.Math.Between(this.PLATFORM_MIN_WIDTH, this.PLATFORM_MAX_WIDTH);
            const gap = Phaser.Math.Between(this.GAP_MIN, this.GAP_MAX);
            const newX = lastPlatform.x + lastPlatform.width + gap;
            this.addPlatform(newX, width);
        }
    }

    updatePlatforms() {
        if (this.isGameOver) return;

        const cam = this.cameras.main;
        const removeMargin = cam.scrollX - 200;

        // Remove platforms far behind camera
        this.platformList = this.platformList.filter(platform => {
            if (platform.x + platform.width < removeMargin) {
                platform.graphics.destroy();
                platform.body.destroy();
                return false;
            }
            return true;
        });

        // Add new platforms ahead
        const addThreshold = cam.scrollX + cam.width + 500;
        let lastPlatform = this.platformList[this.platformList.length - 1];

        while (lastPlatform && lastPlatform.x + lastPlatform.width < addThreshold) {
            const width = Phaser.Math.Between(this.PLATFORM_MIN_WIDTH, this.PLATFORM_MAX_WIDTH);
            const gap = Phaser.Math.Between(this.GAP_MIN, this.GAP_MAX);
            const newX = lastPlatform.x + lastPlatform.width + gap;
            this.addPlatform(newX, width);
            lastPlatform = this.platformList[this.platformList.length - 1];
        }
    }

    onHazardCollision(player, hazard) {
        this.gameOver();
    }

    gameOver() {
        if (this.gameOverTriggered) return;
        this.gameOverTriggered = true;
        this.isGameOver = true;

        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.game.events.emit('bestUpdate', this.bestScore);
        }

        // Stop player movement
        this.playerBody.setVelocity(0, 0);
        this.playerBody.setGravityY(0);

        // Freeze gameplay (stop spawning)
        // Hazards are already static

        // Visual feedback
        this.cameras.main.shake(200, 0.01);
        this.player.fillStyle(0xff0000); // Tint red

        console.log('GAME OVER');
    }

    update() {
        // Update platform generation
        this.updatePlatforms();

        // Score progression (only if not game over)
        if (!this.isGameOver) {
            this.score += this.game.loop.delta * 0.1;
            this.game.events.emit('scoreUpdate', this.score);
        }

        // Auto-run player to the right (only if not game over)
        if (!this.isGameOver) {
            this.playerBody.setVelocityX(200);
        }

        // Jump logic (only when on ground and not game over)
        if (!this.isGameOver && (this.cursors.up.isDown || this.spaceKey.isDown) && this.playerBody.body.touching.down) {
            this.playerBody.setVelocityY(-400);
        }

        // Update player graphics position
        if (this.playerBody.getData('graphics')) {
            this.playerBody.getData('graphics').setPosition(this.playerBody.x, this.playerBody.y);
        }

        // Check if player fell below screen
        if (this.playerBody.y > this.sys.game.config.height) {
            this.gameOver();
        }
    }
}

export default GameScene;