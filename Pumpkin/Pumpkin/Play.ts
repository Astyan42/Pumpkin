/**
* Created by aksharpatel on 27/03/15.
*/
/// <reference path="Phaser/phaser.d.ts"/>
module Castlevania {
    export class Play extends Phaser.State {
        private tilesprite;

        preload() {
            this.game.load.image('sprite', 'assets/corde.png');
        }
        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.tilesprite=this.game.add.tileSprite(0, 0, 20, 20, "sprite");
        }
        update() {
            this.tilesprite.width = this.tilesprite.width + 25;
        }
        
    }
}
