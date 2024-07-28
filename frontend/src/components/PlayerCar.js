import Phaser from 'phaser';

class PlayerCar {
    constructor(scene, x, y, playerId, checkLap, isBot, fieldDimensions, imageKey) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.playerId = playerId;
        this.checkLap = checkLap;
        this.isBot = isBot;
        this.fieldDimensions = fieldDimensions;

        this.speed = 0;
        this.maxSpeed = 0.02;
        this.acceleration = 0.001;
        this.deceleration = 0.0005;

        this.lapCount = 0;
        this.angle = Math.PI; // Start at the left side
        this.lastAngle = this.angle;

        this.sprite = scene.physics.add.sprite(x, y, imageKey);
        this.sprite.setDisplaySize(50, 30);
        this.sprite.setOrigin(0.5, 0.5);

        this.carWidth = this.sprite.displayWidth;
        this.carHeight = this.sprite.displayHeight;

        if (!isBot) {
            this.cursors = scene.input.keyboard.createCursorKeys();
        }

        this.spacebarPressed = false;
        this.scene.input.keyboard.on('keydown-SPACE', () => {
            this.spacebarPressed = true;
        });
        this.scene.input.keyboard.on('keyup-SPACE', () => {
            this.spacebarPressed = false;
        });
    }

    update() {
        if (this.spacebarPressed) {
            this.handleSpacebarMovement();
        } else if (this.isBot) {
            this.updateBot();
        } else {
            this.updatePlayer();
        }

        this.moveInCircle();
        this.checkLapCompletion();
    }

    handleSpacebarMovement() {
        this.speed = this.maxSpeed;
    }

    updatePlayer() {
        if (this.cursors.right.isDown) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        } else if (this.cursors.left.isDown) {
            this.speed = Math.max(this.speed - this.acceleration, 0);
        } else {
            if (this.speed > 0) {
                this.speed = Math.max(this.speed - this.deceleration, 0);
            }
        }
    }

    updateBot() {
        this.speed = this.maxSpeed / 2;
    }

    moveInCircle() {
        const { fieldWidth, fieldHeight } = this.fieldDimensions;
        const centerX = fieldWidth / 2;
        const centerY = fieldHeight / 2;
        const radius = Math.min(fieldWidth, fieldHeight) / 2 - this.carWidth;

        this.lastAngle = this.angle;
        this.angle -= this.speed;
        if (this.angle < 0) this.angle += Math.PI * 2;

        this.x = centerX + radius * Math.cos(this.angle);
        this.y = centerY + radius * Math.sin(this.angle);

        this.sprite.setPosition(this.x, this.y);
        this.sprite.setRotation(this.angle + Math.PI / 2);
    }

    checkLapCompletion() {
        // Check if the car has crossed the starting line (angle 0 or 2π)
        if (this.lastAngle < Math.PI && this.angle > Math.PI) {
            this.lapCount++;
            this.checkLap(this.playerId, this.lapCount);
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}

export default PlayerCar;