
/// <reference path="Phaser/phaser.d.ts"/>
module Pumpkin {
    export class Play extends Phaser.State {
        private tilesprite;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        private currentX = 0;
        public blocks: Phaser.Group;
        private rope: Phaser.TileSprite;
<<<<<<< HEAD
        private spaceKey: Phaser.Key;
        private ropeCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private blockCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private ropeStopGrowing:boolean;

=======
        private shoot: Phaser.Sprite;
        private spaceKey:Phaser.Key;
>>>>>>> origin/master
        game: Phaser.Game;


        preload() {
<<<<<<< HEAD
            this.game.load.image('rope', 'assets/corde.png');
=======
            this.game.load.image('rope', 'Assets/corde.png');
>>>>>>> origin/master
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


<<<<<<< HEAD
            this.rope = this.game.add.tileSprite(this.pumpkin.x, this.pumpkin.y, 0, 10, "rope");
            this.game.physics.p2.enable(this.rope);
            this.rope.anchor.set(0, 0);
            this.rope.body.setRectangle(this.rope.width, this.rope.height);
            this.rope.body.data.gravityScale = 0;
            this.rope.body.fixedRotation = true;
            this.rope.body.setCollisionGroup(this.ropeCollisionGroup);
            this.rope.body.collides(this.blockCollisionGroup, this.fixRope,this);
=======
            this.rope = this.game.add.tileSprite(this.pumpkin.x, this.pumpkin.y, 0, 83, "rope");
            this.rope.anchor.set(0,0.5);
>>>>>>> origin/master
            this.rope.alive = false;
            this.rope.visible = false;
            this.rope.body.dynamic = true;
            this.ropeStopGrowing = false;

            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);


        }


        private counterBlockPosition: number = 0;

        update() {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;

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

            this.counterBlockPosition += 2;

            if (this.counterBlockPosition >= 32) {
                var block = this.blocks.create(this.blocks.children.length * 32, 0, "block");
                block.body.setRectangle(block.width, block.height);
                block.body.setCollisionGroup(this.blockCollisionGroup);
                block.body.data.gravityScale = 0;
                block.anchor.set(0, 0);
                this.counterBlockPosition = 0;
            }

<<<<<<< HEAD
            this.blocks.position.x -= 2;
=======
            this.physicGroupBlocks.position.x -= 2;
>>>>>>> origin/master

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
