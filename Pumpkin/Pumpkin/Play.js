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
        }
        Play.prototype.preload = function () {
            this.game.load.image('sprite', 'assets/corde.png');
            this.game.load.image("wall", "Assets/background_.jpg");
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.spritesheet("block", "Assets/block.png", 32, 32);
        };
        Play.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 400;
            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');
            this.pumpkin = new Pumpkin.Pumpkin(this.game, this.game.world.centerX, this.game.world.centerY);
            this.pumpkin.width = 100;
            this.pumpkin.height = 70;
            this.physicGroupBlocks = this.game.add.physicsGroup(false);
            for (var i = 0; i < 30; i++) {
                this.physicGroupBlocks.create(i * 32, 0, "block");
            }
        };
        Play.prototype.update = function () {
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;
        };
        return Play;
    })(Phaser.State);
    Pumpkin.Play = Play;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=Play.js.map