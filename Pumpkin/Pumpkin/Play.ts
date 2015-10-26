
/// <reference path="Phaser/phaser.d.ts"/>
module Castlevania {
    export class Play extends Phaser.State {
        private tilesprite;
        private rope: Phaser.Rope;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        private currentX = 0;

        game: Phaser.Game;


        preload() {
            this.game.load.image('sprite', 'assets/corde.png');
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("wall", "Assets/wall.png"); 
        }
        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');

            this.pumpkin = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "pumpkin");
            this.pumpkin.anchor.setTo(0.5, 0.5);
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            //this.tilesprite = this.game.add.tileSprite(0, 390, 20, 20, "sprite");
            var points = [new Phaser.Point(0, 200), new Phaser.Point(5, 200)];
            this.rope = this.game.add.rope(0, 200, "sprite", null, points);
            this.rope.updateAnimation = function () {
                var newPoint = new Phaser.Point(this.points[this.points.length - 1].x + 5, 200);
                this.points.push(newPoint);
            };
        }
        update() {
            //this.tilesprite.width = this.currentX;
            //this.rope.points.push(new Phaser.Point(this.currentX,200));
            this.currentX += 5;
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;
        }
        
    }
}
