// Phaser loaded globally from CDN

class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: false });
    }

    create() {
        // Set up HUD elements
        this.scoreText = this.add.text(10, 10, 'SCORE: 0', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        });

        this.bestText = this.add.text(10, 40, 'BEST: 0', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        });

        // Listen for score updates
        this.game.events.on('scoreUpdate', (score) => {
            this.scoreText.setText('SCORE: ' + Math.floor(score));
        });

        this.game.events.on('bestUpdate', (best) => {
            this.bestText.setText('BEST: ' + Math.floor(best));
        });

        console.log('UIScene: UI initialized.');
    }

    update() {
        // Placeholder: UI update logic here in the future
    }
}

export default UIScene;