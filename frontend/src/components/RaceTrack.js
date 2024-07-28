import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import PlayerCar from './PlayerCar';

const RaceTrack = ({ account }) => {
    const gameRef = useRef(null);
    const [gameState, setGameState] = useState('waiting');
    const [winner, setWinner] = useState(null);
    const gameStateRef = useRef('waiting');
    const sceneRef = useRef(null);
    const playersRef = useRef([]);
    const carsRef = useRef([]);

    const trackWidth = 50;
    const fieldWidth = 1000;
    const fieldHeight = 600;
    const innerTrackWidth = fieldWidth - 2 * trackWidth;
    const innerTrackHeight = fieldHeight - 2 * trackWidth;

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: fieldWidth,
            height: fieldHeight,
            parent: gameRef.current,
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            }
        };

        const game = new Phaser.Game(config);
        let spaceKey;

        function preload() {
            this.load.image('car', 'assets/car.png');
        }

        function create() {
            drawTrack(this);
            spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            sceneRef.current = this;
            this.gameState = gameStateRef.current;

            addPlayer(account, false);
            addPlayer('bot', true);
        }

        function update() {
            this.gameState = gameStateRef.current;
            
            if (gameStateRef.current === 'waiting' && Phaser.Input.Keyboard.JustDown(spaceKey)) {
                startRace();
            }

            if (gameStateRef.current === 'racing') {
                carsRef.current.forEach(car => car.update());
            }
        }

        return () => {
            carsRef.current.forEach(car => car.destroy());
            game.destroy(true);
        };
    }, [account]);

    const drawTrack = (scene) => {
        const graphics = scene.add.graphics();

        // Outer rectangle (gray)
        graphics.fillStyle(0x808080);
        graphics.fillRect(0, 0, fieldWidth, fieldHeight);

        // Inner rectangle (green)
        graphics.fillStyle(0x2ecc71);
        graphics.fillRect(trackWidth, trackWidth, innerTrackWidth, innerTrackHeight);

        // Start/finish line
        const startLineWidth = 10;
        const startLineHeight = trackWidth;
        const startLineX = fieldWidth / 2;
        const startLineY = fieldHeight - trackWidth / 2;

        graphics.fillStyle(0xffffff);
        graphics.fillRect(startLineX - startLineWidth / 2, startLineY - startLineHeight / 2, startLineWidth, startLineHeight);
    };

    const addPlayer = (playerAccount, isBot = false) => {
        const startLineX = fieldWidth / 2;
        const startLineY = fieldHeight - trackWidth / 2;

        const newPlayerId = playersRef.current.length + 1;
        const newPlayer = {
            id: newPlayerId,
            account: playerAccount,
            x: startLineX + (isBot ? 40 : -40),
            y: startLineY,
            isBot: isBot,
        };

        playersRef.current.push(newPlayer);

        if (sceneRef.current) {
            const car = new PlayerCar(sceneRef.current, newPlayer.x, newPlayer.y, newPlayer.id, checkLap, isBot, {
                trackWidth,
                fieldWidth,
                fieldHeight,
                innerTrackWidth,
                innerTrackHeight,
            });
            carsRef.current.push(car);
        }
    };

    const startRace = () => {
        gameStateRef.current = 'racing';
        setGameState('racing');
        if (sceneRef.current) {
            sceneRef.current.gameState = 'racing';
        }
        console.log('Race started!');
    };

    const checkLap = (playerId, playerX, playerY) => {
        const startLineX = fieldWidth / 2;
        const startLineWidth = 10;

        if (playerX > startLineX - startLineWidth / 2 && playerX < startLineX + startLineWidth / 2 && playerY > fieldHeight - trackWidth - 5) {
            const car = carsRef.current.find(c => c.playerId === playerId);
            if (car) {
                car.lapCount++;
                console.log(`Player ${playerId} completed lap ${car.lapCount}`);
                if (car.lapCount >= 3) {
                    endRace(playerId);
                }
            }
        }
    };

    const endRace = (winnerId) => {
        if (gameStateRef.current === 'racing') {
            gameStateRef.current = 'finished';
            setGameState('finished');
            if (sceneRef.current) {
                sceneRef.current.gameState = 'finished';
            }
            const winnerPlayer = playersRef.current.find(p => p.id === winnerId);
            if (winnerPlayer) {
                setWinner(winnerPlayer.isBot ? 'Bot' : 'Player');
                console.log(`Race ended. Winner: ${winnerPlayer.isBot ? 'Bot' : 'Player'}`);
            } else {
                console.error('Winner not found');
            }
        }
    };

    return (
        <div>
            <div ref={gameRef} />
            {gameState === 'waiting' && <div>Press spacebar to start the race</div>}
            {gameState === 'racing' && <div>Race in progress</div>}
            {gameState === 'finished' && winner && <div>The winner is: {winner}</div>}
        </div>
    );
};

export default RaceTrack;