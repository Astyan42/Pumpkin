
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Play extends Phaser.State {
        private tilesprite;
        private rope: Phaser.Rope;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        private currentX = 0;

        game: Phaser.Game;


        preload() {
            this.game.load.image('sprite', 'assets/corde.png');
            this.game.load.image("wall", "Assets/background_.jpg"); 
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
        }
        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');

            this.pumpkin = new Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
            
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
        }
        update() {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;
        }
        
    }
}
