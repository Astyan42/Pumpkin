module Pumpkin {
    export class Pumpkin extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "pumpkin", 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this);
            this.body.setCircle(20);
            this.body.collideWorldBounds = false;
        }
    }
}