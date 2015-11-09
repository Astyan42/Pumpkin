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
            this.body.setCircle(40);
            this.body.fixedRotation = true;
            this.light = this.game.add.sprite(this.x, this.y, 'light');
            this.light.width = 150;
            this.light.height = 150;
            this.light.alpha = 0.3;
            this.addChild(this.light);
            var anim = this.light.animations.add('glow');
            anim.play(10, true);
            
            this.body.mass = 4;
            this.body.data.gravityScale = 1;
            this.checkWorldBounds = true;

            this.events.onOutOfBounds.add(() => {
                this.game.state.start("Gameover", true, false, (<Play>this.game.state.getCurrentState()).score);
            }, this);
        }
    }
}