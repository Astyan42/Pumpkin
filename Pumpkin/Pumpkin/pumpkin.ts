module Pumpkin {
    export class Pumpkin extends Phaser.Sprite {
        
        private light:Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "pumpkin", 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this);
            this.width = 100;
            this.height = 88;
            this.body.setCircle(20);
            this.body.collideWorldBounds = false;
            
            var light = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'light');
            light.anchor.setTo(0.5, 0.5);
            light.width = 150;
            light.height = 150;
            light.alpha = 0.3;
            var anim = light.animations.add('glow');
            anim.play(10, true);

        }
    }
}