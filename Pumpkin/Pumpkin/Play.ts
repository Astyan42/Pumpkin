
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Play extends Phaser.State {
        private tilesprite;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        public lightAnimation:Phaser.Sprite;

        public blocks: Phaser.Group;
        private rope: Phaser.Rope;
        
        private ropeHead: Phaser.Sprite;
        private ropeStopGrowing: boolean;


        private ropeCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private blockCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        
        private spaceKey:Phaser.Key;
        game: Phaser.Game;


        preload() {
            this.game.load.image('rope', 'Assets/corde2.png');
            this.game.load.image("wall", "Assets/texture_bg.png"); 
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("block", "Assets/caillou.png");
            this.game.load.image("grapin", "Assets/grapin.png");
            this.game.load.spritesheet('light', 'Assets/lumiere.png', 406, 424, 2);
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.gravity.y = 800;
            this.game.physics.p2.restitution = 0.8;

            this.ropeCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.blockCollisionGroup = this.game.physics.p2.createCollisionGroup();


            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');

            this.pumpkin = new Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
            
            //todo remove debug
            this.pumpkin.body.data.gravityScale = 0;

            

            this.blocks = this.game.add.group();
            this.blocks.enableBody = true;
            this.blocks.physicsBodyType = Phaser.Physics.P2JS;
            for (let i = 0; i < 30; i++) {
                var block = this.blocks.create(i * 32, 0, "block");
                block.body.setRectangle(block.width, block.height);
                block.body.kinematic = true;
                block.body.setCollisionGroup([this.blockCollisionGroup]);
                block.body.collides([this.ropeCollisionGroup]);
                block.body.data.gravityScale = 0;
                block.anchor.set(0, 0);
            }

            var points = [];
            var length = 150 / 20;

            for (let i = 0; i < 20; i++) {
                points.push(new Phaser.Point(i * length, 0));
            }
            this.rope = this.game.add.rope(this.pumpkin.x, this.pumpkin.y, 'rope', null, points);

            var count = 0;
            this.rope.updateAnimation = () => {
                count += 0.1;

                for (let i = 0; i < points.length; i++) {
                    points[i].y = Math.sin(i * 0.5 + count) * 20;
                }
            };
            
            this.rope.alive = false;
            this.rope.visible = false;
            this.ropeStopGrowing = false;

            this.ropeHead = this.game.add.sprite(this.pumpkin.x, this.pumpkin.y, "grapin");
            this.ropeHead.visible = false;
            this.ropeHead.anchor.setTo(0, 0.5);
            this.game.physics.arcade.enable(this.ropeHead);
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);


        }


        private counterBlockPosition: number = 0;

        update() {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;

            if (this.spaceKey.isDown && !this.spaceKey.downDuration()) {
                this.shootRope();
            }
            

            //this.game.debug.spriteInfo(this.ropeHead,32,32);
            //this.game.debug.spriteBounds(this.ropeHead);
            if (this.rope && this.rope.alive && !this.ropeStopGrowing) {
                this.rope.width = Math.ceil(Phaser.Math.distance(this.ropeHead.x,this.ropeHead.y,this.pumpkin.x,this.pumpkin.y));
                this.rope.x = this.pumpkin.x;
                this.rope.y = this.pumpkin.y;
                this.rope.rotation = this.game.physics.arcade.angleToXY(this.pumpkin, this.ropeHead.x, this.ropeHead.y);
            }

            

            this.counterBlockPosition += 2;

            if (this.counterBlockPosition >= 32) {
                var block = this.blocks.create(this.blocks.children.length * 32, 0, "block");
                block.body.setRectangle(block.width, block.height);
                block.body.setCollisionGroup(this.blockCollisionGroup);
                block.body.data.gravityScale = 0;
                block.anchor.set(0, 0);
                this.counterBlockPosition = 0;
            }

            this.blocks.position.x -= 2;
        }

        // Launch a projectile that must have a velocity.
        // Width is not enough to fire collision event
        shootRope() { 
            this.rope.width = 0;
            this.rope.alive = true;
            this.rope.visible = true;
            this.ropeHead.visible = true;
            this.ropeHead.x = this.pumpkin.x;
            this.ropeHead.y = this.pumpkin.y;
            this.ropeHead.rotation = this.game.physics.arcade.angleToPointer(this.ropeHead);
            this.game.physics.arcade.moveToPointer(this.ropeHead,600);
            //this.game.physics.arcade.accelerateToXY(this.ropeHead,this.impactX, this.impactY, 1000);
            this.pumpkin.bringToTop();
        }

        fixRope(body1,body2) {
            this.ropeStopGrowing = true;
        }

        
    }
}
