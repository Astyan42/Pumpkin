
/// <reference path="Phaser/phaser.d.ts"/>
module PumpkinNinja {
    export class Preloader extends Phaser.State {

        create() {
            this.startMainMenu();
        }

        public startMainMenu() {
            this.game.state.start("Menu", true, false);
        }
    }
}
 