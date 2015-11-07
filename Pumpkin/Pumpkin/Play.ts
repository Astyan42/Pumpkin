
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
        
        public score = 0;
        private scoreText: Phaser.Text;
        private scoreString = "{s} points !";

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
            for (var i = 0; i < 30; i++) {
                var block: Phaser.Sprite = this.blocks.create(i * 32, 0, "block");
                var body: Phaser.Physics.P2.Body = block.body;
                body.setRectangle(block.width, block.height);
                body.kinematic = true;
                body.setCollisionGroup(this.blockCollisionGroup);
                body.collides([this.ropeCollisionGroup]);
                body.data.gravityScale = 0;
                block.anchor.set(0, 0);
            }

            var points = [];
            var length = 150 / 20;

            for (var i = 0; i < 20; i++) {
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
            
            
            this.game.physics.p2.enable(this.rope);
            this.rope.body.setRectangle(this.rope.width, this.rope.height);
            this.rope.body.data.gravityScale = 0;
            this.rope.body.fixedRotation = true;
            this.rope.body.setCollisionGroup(this.ropeCollisionGroup);
            this.rope.body.collides(this.blockCollisionGroup, this.fixRope,this);
            this.rope.alive = false;
            this.rope.visible = false;
            this.ropeStopGrowing = false;

            this.ropeHead = this.game.add.sprite(this.pumpkin.x, this.pumpkin.y, "grapin");
            this.ropeHead.visible = false;
            this.ropeHead.anchor.setTo(0, 0.5);
            this.game.physics.arcade.enable(this.ropeHead);
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.scoreText = this.game.add.text(
                this.game.world.width - 150, this.game.world.height - 42, this.scoreString.replace("{s}", "0"), { fontSize: '22px', fill: '#fff' });
        }


        private counterBlockPosition: number = 0;
        /**
         * Speed in pixel/framerate
         */
        private speed: number = 2;

        private emptyBlock = 0;
        private nextBlockPosition = 32;
        private updateTicks = 0;
        private numberOfEmptyBlocksInARow = 0;

        update() {
            this.updateTicks ++;
            this.background.tilePosition.x -= this.speed;
            this.blocks.position.x -= this.speed;
            this.nextBlockPosition -= this.speed;

            if (this.spaceKey.isDown && !this.spaceKey.downDuration()) {
                this.shootRope();
            }
            
            
            if (this.rope && this.rope.alive && !this.ropeStopGrowing) {
                this.rope.width = Math.ceil(Phaser.Math.distance(this.ropeHead.x,this.ropeHead.y,this.pumpkin.x,this.pumpkin.y));
                this.rope.x = this.pumpkin.x;
                this.rope.y = this.pumpkin.y;
                this.rope.rotation = this.game.physics.arcade.angleToXY(this.pumpkin, this.ropeHead.x, this.ropeHead.y);
            }

            
            if (this.nextBlockPosition <= 0) {
                this.nextBlockPosition = 32;
                if (Math.random() > 0.66 || this.numberOfEmptyBlocksInARow == 4) {
                    var block: Phaser.Sprite = this.blocks.create(this.blocks.length * 32 + this.nextBlockPosition + this.emptyBlock, 0, "block");
                    block.body.setRectangle(block.width, block.height);
                    block.body.setCollisionGroup(this.blockCollisionGroup);
                    block.body.data.gravityScale = 0;
                    block.anchor.set(0, 0);
                    block.events.onOutOfBounds.add(() => {
                        block.destroy();
                    }, this);
                    
                    this.numberOfEmptyBlocksInARow = 0;
                    this.score += 10;
                } else {
                    this.numberOfEmptyBlocksInARow++;
                    this.score += 20;
                    this.emptyBlock += 32;
                }
            }
            this.scoreText.text = this.scoreString.replace("{s}", this.score.toString());
                
            
            // level 1 : > 1000 => increase speed
            //if (this.score > 300 && this.speed < 4) {
            //    this.speed = 4;
            //}
            
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
