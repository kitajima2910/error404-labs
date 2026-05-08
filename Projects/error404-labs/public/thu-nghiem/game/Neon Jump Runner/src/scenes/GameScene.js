class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Người chạy nhảy', {
            fontSize: '32px',
            color: '#000000'
        }).setOrigin(0.5);
    }
}

export default GameScene;