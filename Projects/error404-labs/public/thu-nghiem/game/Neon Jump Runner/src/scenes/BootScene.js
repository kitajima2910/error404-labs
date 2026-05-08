class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Minimal preload
    }

    create() {
        this.scene.start('GameScene');
    }
}

export default BootScene;