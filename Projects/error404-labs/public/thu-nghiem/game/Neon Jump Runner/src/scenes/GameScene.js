class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Empty preload
    }

    create() {
        this.createGround();
        this.createPlayer();
        this.setupInput();
    }

    createGround() {
        this.groundRects = [];
        const groundHeight = 50;
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const groundY = height - groundHeight / 2;
        for (let i = 0; i < 3; i++) {
            const rect = this.add.rectangle(i * width + width / 2, groundY, width, groundHeight, 0x8B4513);
            this.physics.add.existing(rect, true); // true for static
            this.groundRects.push(rect);
        }
    }

    createPlayer() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const playerRect = this.add.rectangle(100, height - 150, 50, 50, 0x0000ff);
        this.player = this.physics.add.existing(playerRect, false);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundRects);
    }

    setupInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.on('pointerdown', () => this.jump());
    }

    jump() {
        if (this.player.body.touching.down) {
            this.player.setVelocityY(-400);
        }
    }

    update() {
        // Scroll ground
        const width = this.sys.game.config.width;
        this.groundRects.forEach(rect => {
            rect.x -= 2;
            if (rect.x + rect.width / 2 < 0) {
                rect.x += width * 3;
            }
        });

        // Handle jump input
        if (this.cursors.up.isDown || this.spaceKey.isDown) {
            this.jump();
        }
    }
}

export default GameScene;