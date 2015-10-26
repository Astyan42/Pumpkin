module Pumpkin {
    export class Pumpkin extends Phaser.Sprite {

        rope:Phaser.TileSprite;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'pumpkin', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
        }

        update() {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.shootRope();
            }
            if (this.rope && this.rope.alive) {
                this.rope.width += 25;
            }
        }

        shootRope() {
            if (this.rope) {
                this.rope.destroy();
            }
            this.rope = this.game.add.tileSprite(this.x, this.y, 0, 10, "sprite");
            this.rope.width = 0;
            this.rope.alive = true;
            this.rope.rotation = this.game.physics.arcade.angleToPointer(this.rope);
            this.bringToTop();
        }
    }
}