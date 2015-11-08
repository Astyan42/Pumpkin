var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Phaser/phaser.d.ts"/>
var Pumpkin;
(function (Pumpkin) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.score = 0;
            this.scoreString = "{s} points !";
            this.counterBlockPosition = 0;
            /**
             * Speed in pixel/framerate
             */
            this.speed = 2;
            this.emptyBlock = 0;
            this.nextBlockPosition = 32;
            this.updateTicks = 0;
            this.numberOfEmptyBlocksInARow = 0;
        }
        Play.prototype.preload = function () {
            this.game.load.image('rope', 'Assets/corde2.png');
            this.game.load.image("wall", "Assets/texture_bg.png");
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("block", "Assets/caillou.png");
            this.game.load.image("grapin", "Assets/grapin.png");
            this.game.load.spritesheet('light', 'Assets/lumiere.png', 406, 424, 2);
        };
        Play.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.setBoundsToWorld(false, false, false, false);
            this.game.physics.p2.gravity.y = 800;
            this.game.physics.p2.restitution = 0.8;
            this.ropeCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.blockCollisionGroup = this.game.physics.p2.createCollisionGroup();
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');
            this.pumpkin = new Pumpkin.Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
            //todo remove debug
            this.pumpkin.body.data.gravityScale = 0;
            this.blocks = this.game.add.group();
            this.blocks.enableBody = true;
            this.blocks.physicsBodyType = Phaser.Physics.P2JS;
            for (var i = 0; i < 30; i++) {
                var block = this.blocks.create(i * 32, 0, "block");
                var body = block.body;
                body.kinematic = true;
                body.setRectangle(block.width, block.height);
                body.setCollisionGroup(this.blockCollisionGroup);
                body.collides(this.ropeCollisionGroup);
                body.data.gravityScale = 0;
                block.anchor.set(0, 0);
            }
            this.ropeStopGrowing = false;
            this.ropeHead = this.game.add.sprite(this.pumpkin.x, this.pumpkin.y, "grapin");
            this.ropeHead.anchor.setTo(0, 0.5);
            this.game.physics.p2.enable(this.ropeHead);
            this.ropeHead.body.setRectangle(this.ropeHead.width, this.ropeHead.height);
            this.ropeHead.body.data.gravityScale = 0;
            this.ropeHead.body.fixedRotation = true;
            this.ropeHead.body.collideWorldBounds = false;
            this.ropeHead.body.setCollisionGroup(this.ropeCollisionGroup);
            this.ropeHead.body.collides(this.blockCollisionGroup, this.fixRope, this);
            this.game.physics.p2.updateBoundsCollisionGroup();
            this.ropeHead.alive = false;
            this.ropeHead.visible = false;
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.scoreText = this.game.add.text(this.game.world.width - 150, this.game.world.height - 42, this.scoreString.replace("{s}", "0"), { fontSize: '22px', fill: '#fff' });
        };
        Play.prototype.update = function () {
            this.updateTicks++;
            this.background.tilePosition.x -= this.speed;
            this.blocks.position.x -= this.speed;
            this.nextBlockPosition -= this.speed;
            if (this.spaceKey.isDown && !this.spaceKey.downDuration()) {
                this.shootRope();
            }
            if (this.nextBlockPosition <= 0) {
                this.nextBlockPosition = 32;
                if (Math.random() > 0.66 || this.numberOfEmptyBlocksInARow == 4) {
                    var block = this.blocks.create(this.blocks.length * 32 + this.nextBlockPosition + this.emptyBlock, 0, "block");
                    var body = block.body;
                    body.setRectangle(block.width, block.height);
                    body.kinematic = true;
                    body.setCollisionGroup(this.blockCollisionGroup);
                    body.collides([this.ropeCollisionGroup]);
                    body.data.gravityScale = 0;
                    block.anchor.set(0, 0);
                    block.events.onOutOfBounds.add(function () {
                        block.destroy();
                    }, this);
                    this.numberOfEmptyBlocksInARow = 0;
                    this.score += 10;
                }
                else {
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
        };
        // Launch a projectile that must have a velocity.
        // Width is not enough to fire collision event
        Play.prototype.shootRope = function () {
            this.ropeHead.visible = true;
            this.ropeHead.body.x = this.pumpkin.x;
            this.ropeHead.body.y = this.pumpkin.y;
            this.ropeHead.rotation = this.game.physics.arcade.angleToPointer(this.ropeHead);
            this.game.physics.arcade.moveToPointer(this.ropeHead, 600);
            this.pumpkin.bringToTop();
        };
        Play.prototype.fixRope = function (body1, body2) {
            this.ropeStopGrowing = true;
            this.ropeHead.body.setZeroVelocity();
        };
        return Play;
    })(Phaser.State);
    Pumpkin.Play = Play;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=Play.js.map