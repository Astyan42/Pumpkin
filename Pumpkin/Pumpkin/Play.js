var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Phaser/phaser.d.ts"/>
var Castlevania;
(function (Castlevania) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.currentX = 0;
        }
        Play.prototype.preload = function () {
            this.game.load.image('sprite', 'assets/corde.png');
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("wall", "Assets/wall.png");
        };
        Play.prototype.create = function () {
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
        };
        Play.prototype.update = function () {
            //this.tilesprite.width = this.currentX;
            //this.rope.points.push(new Phaser.Point(this.currentX,200));
            this.currentX += 5;
            // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
            this.background.tilePosition.x -= 2;
        };
        return Play;
    })(Phaser.State);
    Castlevania.Play = Play;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Play.js.map