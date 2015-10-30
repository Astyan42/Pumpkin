
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Menu extends Phaser.State {

        create() {
            this.input.onDown.addOnce(this.startGame, this);
        }
        
        startGame() {
            this.game.state.start("Play", true, false);
        }
    }
}
