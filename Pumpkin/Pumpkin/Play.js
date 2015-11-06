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
            this.currentX = 0;
            this.counterBlockPosition = 0;
        }
        Play.prototype.preload = function () {
            this.game.load.image('rope', 'Assets/corde.png');
            this.game.load.image("wall", "Assets/background_.jpg");
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("block", "Assets/block.png");
        };
        Play.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.gravity.y = 800;
            this.game.physics.p2.restitution = 0.8;
            this.ropeCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.blockCollisionGroup = this.game.physics.p2.createCollisionGroup();
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');
            this.pumpkin = new Pumpkin.Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
<<<<<<< HEAD
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.pumpkin.body.data.gravityScale = 0;
            this.blocks = this.game.add.group();
            this.blocks.enableBody = true;
            this.blocks.physicsBodyType = Phaser.Physics.P2JS;
            for (var i = 0; i < 30; i++) {
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
            this.rope.body.collides(this.blockCollisionGroup, this.fixRope, this);
=======
            this.rope = this.game.add.tileSprite(this.pumpkin.x, this.pumpkin.y, 0, 83, "rope");
            this.rope.anchor.set(0, 0.5);
>>>>>>> origin/master
            this.rope.alive = false;
            this.rope.visible = false;
            this.rope.body.dynamic = true;
            this.ropeStopGrowing = false;
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        };
        Play.prototype.update = function () {
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
            this.blocks.position.x -= 2;
        };
        // Launch a projectile that must have a velocity.
        // Width is not enough to fire collision event
        Play.prototype.shootRope = function () {
            this.rope.width = 0;
            this.rope.alive = true;
            this.rope.visible = true;
            this.rope.rotation = this.game.physics.arcade.angleToPointer(this.rope);
            this.pumpkin.bringToTop();
        };
        Play.prototype.fixRope = function (body1, body2) {
            this.ropeStopGrowing = true;
        };
        return Play;
    })(Phaser.State);
    Pumpkin.Play = Play;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=Play.js.map