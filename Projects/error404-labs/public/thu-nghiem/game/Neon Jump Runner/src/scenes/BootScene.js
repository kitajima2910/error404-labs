// Phaser loaded globally from CDN

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Placeholder: Load assets here in the future
        console.log('BootScene: Preloading assets...');
    }

    create() {
        // Placeholder: Initialize game setup
        console.log('BootScene: Starting game...');
        this.scene.start('GameScene');
    }
}

export default BootScene;