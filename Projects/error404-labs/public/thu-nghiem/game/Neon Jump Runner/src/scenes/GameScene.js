// Phaser loaded globally from CDN

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Placeholder: Set up game world
        console.log('GameScene: Game world initialized.');
        // Placeholder transition to UI scene
        this.scene.launch('UIScene');
    }

    update() {
        // Placeholder: Game loop logic here in the future
    }
}

export default GameScene;