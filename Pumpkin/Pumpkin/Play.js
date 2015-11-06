var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Phaser/phaser.d.ts"/>
var Pumpkin;
(function (Pumpkin) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.currentX = 0;
            this.score = 0;
            this.scoreString = "{s} points !";
            this.counterBlockPosition = 0;
            /**
             * Speed in pixel/framerate
             */
            this.speed = 2;
            this.nbBlock = 0;
        }
        Play.prototype.preload = function () {
            this.game.load.image('rope', 'assets/corde.png');
            this.game.load.image("wall", "Assets/background_.jpg");
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("block", "Assets/block.png");
        };
        Play.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 400;
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');
            this.pumpkin = new Pumpkin.Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
            this.rope = this.game.add.tileSprite(this.pumpkin.x, this.pumpkin.y, 0, 10, "rope");
            this.rope.alive = false;
            this.rope.visible = false;
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.physicGroupBlocks = this.game.add.physicsGroup(false);
            this.scoreText = this.game.add.text(16, 42, this.scoreString.replace("{s}", "0"), { fontSize: '22px', fill: '#fff' });
            for (var i = 0; i < 30; i++) {
                var bloc = this.physicGroupBlocks.create(i * 32, 0, "block");
            }
        };
        Play.prototype.update = function () {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= this.speed;
            if (this.rope && this.rope.alive) {
                this.rope.width += 25;
                this.rope.x = this.pumpkin.x;
                this.rope.y = this.pumpkin.y;
            }
            if (this.spaceKey.isDown && !this.spaceKey.downDuration()) {
                this.shootRope();
            }
            this.counterBlockPosition += this.speed;
            if (this.counterBlockPosition >= 32) {
                if (Math.round(Math.random())) {
                    this.physicGroupBlocks.create(this.physicGroupBlocks.children.length * 32 + this.nbBlock * 32, 0, "block");
                    this.score += 10;
                }
                else {
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
        };
        Play.prototype.shootRope = function () {
            this.rope.width = 0;
            this.rope.alive = true;
            this.rope.visible = true;
            this.rope.rotation = this.game.physics.arcade.angleToPointer(this.rope);
            this.pumpkin.bringToTop();
        };
        return Play;
    })(Phaser.State);
    Pumpkin.Play = Play;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=Play.js.map