
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Play extends Phaser.State {
        private tilesprite;
        private rope: Phaser.Rope;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        private currentX = 0;
        public physicGroupBlocks: Phaser.Group;

        game: Phaser.Game;


        preload() {
            this.game.load.image('sprite', 'assets/corde.png');
            this.game.load.image("wall", "Assets/background_.jpg"); 
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.spritesheet("block", "Assets/block.png", 32, 32); 
        }
        create() {


            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 400;
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');

            this.pumpkin = new Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
            
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.physicGroupBlocks = this.game.add.physicsGroup(<any>false);


            for (var i = 0; i < 30; i++) {
                this.physicGroupBlocks.create(i * 32, 0, "block");
            }


        }
        update() {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;
        }
        
    }
}
