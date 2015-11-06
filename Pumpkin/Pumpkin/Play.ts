
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Play extends Phaser.State {
        private tilesprite;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        private currentX = 0;
        public physicGroupBlocks: Phaser.Group;
        public blocks: Phaser.Group;
        private rope: Phaser.TileSprite;
        private spaceKey: Phaser.Key;
        private ropeCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private blockCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private ropeStopGrowing:boolean;


        game: Phaser.Game;
        
        private score = 0;
        private scoreText: Phaser.Text;
        private scoreString = "{s} points !";

        preload() {
            this.game.load.image('rope', 'assets/corde.png');

            this.game.load.image("wall", "Assets/background_.jpg"); 
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("block", "Assets/block.png");
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
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
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


            this.rope = this.game.add.tileSprite(this.pumpkin.x, this.pumpkin.y, 0, 10, "rope");
            this.game.physics.p2.enable(this.rope);
            this.rope.anchor.set(0, 0);
            this.rope.body.setRectangle(this.rope.width, this.rope.height);
            this.rope.body.data.gravityScale = 0;
            this.rope.body.fixedRotation = true;
            this.rope.body.setCollisionGroup(this.ropeCollisionGroup);
            this.rope.body.collides(this.blockCollisionGroup, this.fixRope,this);
            this.rope.alive = false;
            this.rope.visible = false;
            this.rope.body.dynamic = true;
            this.ropeStopGrowing = false;

            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.physicGroupBlocks = this.game.add.physicsGroup(<any>false);

            this.scoreText = this.game.add.text(16, 42, this.scoreString.replace("{s}", "0"), { fontSize: '22px', fill: '#fff' });

            for (var i = 0; i < 30; i++) {
                var bloc: Phaser.Sprite = this.physicGroupBlocks.create(i * 32, 0, "block");
            }

        }


        private counterBlockPosition: number = 0;
        /**
         * Speed in pixel/framerate
         */
        private speed: number = 2;

        private nbBlock = 0;

        update() {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= this.speed;

            if (this.rope && this.rope.alive && !this.ropeStopGrowing) {
                this.rope.width += 10;
                this.rope.body.setRectangle(this.rope.width, this.rope.height);
                this.rope.body.setCollisionGroup(this.ropeCollisionGroup);
                this.rope.x = this.pumpkin.x;
                this.rope.y = this.pumpkin.y;
            }

            if (this.spaceKey.isDown && !this.spaceKey.downDuration()) {
                this.shootRope();
            }


            this.counterBlockPosition += this.speed;

            if (this.counterBlockPosition >= 32) {
                if (Math.round(Math.random())) {
                    var block = this.blocks.create(this.blocks.children.length * 32 + this.nbBlock * 32, 0, "block");
                    block.body.setRectangle(block.width, block.height);
                    block.body.setCollisionGroup(this.blockCollisionGroup);
                    block.body.data.gravityScale = 0;
                    block.anchor.set(0, 0);
                    this.score += 10;
                } else {
                    this.nbBlock++;
                    //this.physicGroupBlocks.create(this.physicGroupBlocks.children.length * 32, 0, "");
                    this.score += 20;
                }
                this.scoreText.text = this.scoreString.replace("{s}", this.score.toString());
                this.counterBlockPosition = 0;
            }

            // level 1 : > 1000 => increase speed
            //if (this.score > 300 && this.speed < 4) {
            //    this.speed = 4;
            //}

            this.physicGroupBlocks.position.x -= this.speed;
            this.blocks.position.x -= 2;
            this.physicGroupBlocks.position.x -= 2;


        }

        // Launch a projectile that must have a velocity.
        // Width is not enough to fire collision event
        shootRope() {

            this.rope.width = 0;
            this.rope.alive = true;
            this.rope.visible = true;
            this.rope.rotation = this.game.physics.arcade.angleToPointer(this.rope);
            this.pumpkin.bringToTop();
        }

        fixRope(body1,body2) {
            this.ropeStopGrowing = true;
        }
        
    }
}
