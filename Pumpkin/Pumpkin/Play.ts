/**
* Created by aksharpatel on 27/03/15.
*/
/// <reference path="Phaser/phaser.d.ts"/>
module Castlevania {
    export class Play extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
        }
    }
}
