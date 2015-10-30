module Pumpkin {
    export class Pumpkin extends Phaser.Sprite {
        
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pumpkin', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.mass = 200;
        }
    }
}