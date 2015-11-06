
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Menu extends Phaser.State {

        preload() {
            this.game.load.image('splash', 'Assets/splash.png');
        }

        create() {
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "splash");
            background.anchor.setTo(0.5, 0.5);
            background.scale.setTo(0.5,0.5);
            this.input.onDown.addOnce(this.startGame, this);
        }
        
        startGame() {
            this.game.state.start("Play", true, false);
        }
    }
}
