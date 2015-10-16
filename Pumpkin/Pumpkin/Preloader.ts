/**
 * Created by aksharpatel on 27/03/15.
 */
/// <reference path="Phaser/phaser.d.ts"/>
module Castlevania {
    export class Preloader extends Phaser.State {

        create() {
            this.startMainMenu();
        }

        public startMainMenu() {
            this.game.state.start("Menu", true, false);
        }
    }
}
 