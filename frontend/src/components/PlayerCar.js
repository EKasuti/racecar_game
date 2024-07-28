import Phaser from 'phaser';

class PlayerCar {
    constructor(scene, x, y, playerId, checkLap, isBot, fieldDimensions) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.playerId = playerId;
        this.checkLap = checkLap;
        this.isBot = isBot;
        this.fieldDimensions = fieldDimensions;

        this.speed = 0;
        this.maxSpeed = 3;
        this.acceleration = 0.1;
        this.deceleration = 0.05;

        this.lapCount = 0;

        this.sprite = scene.physics.add.sprite(x, y, 'car');
        this.sprite.setScale(0.3); // Much bigger car
        this.sprite.setOrigin(0.5, 0.5);
        this.sprite.angle = 90; // Face right

        this.carWidth = this.sprite.displayWidth;
        this.carHeight = this.sprite.displayHeight;

        if (!isBot) {
            this.cursors = scene.input.keyboard.createCursorKeys();
        }
    }

    update() {
        if (this.isBot) {
            this.updateBot();
        } else {
            this.updatePlayer();
        }

        this.constrainToTrack();
        this.checkLap(this.playerId, this.x, this.y);
    }

    updatePlayer() {
        if (this.cursors.right.isDown) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        } else if (this.cursors.left.isDown) {
            this.speed = Math.max(this.speed - this.acceleration, -this.maxSpeed / 2);
        } else {
            if (this.speed > 0) {
                this.speed = Math.max(this.speed - this.deceleration, 0);
            } else if (this.speed < 0) {
                this.speed = Math.min(this.speed + this.deceleration, 0);
            }
        }

        this.x += this.speed;
        this.sprite.setPosition(this.x, this.y);
    }

    updateBot() {
        this.speed = this.maxSpeed / 2;
        this.x += this.speed;
        this.sprite.setPosition(this.x, this.y);
    }

    constrainToTrack() {
        const { fieldWidth } = this.fieldDimensions;
        
        if (this.x > fieldWidth + this.carWidth / 2) {
            this.x = -this.carWidth / 2;
        } else if (this.x < -this.carWidth / 2) {
            this.x = fieldWidth + this.carWidth / 2;
        }
        
        this.sprite.setPosition(this.x, this.y);
    }

    destroy() {
        this.sprite.destroy();
    }
}

export default PlayerCar;