var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pumpkin;
(function (Pumpkin_1) {
    var Pumpkin = (function (_super) {
        __extends(Pumpkin, _super);
        function Pumpkin(game, x, y) {
            _super.call(this, game, x, y, 'pumpkin', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
        }
        Pumpkin.prototype.update = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.shootRope();
            }
            if (this.rope && this.rope.alive) {
                this.rope.width += 25;
            }
        };
        Pumpkin.prototype.shootRope = function () {
            if (this.rope) {
                this.rope.destroy();
            }
            this.rope = this.game.add.tileSprite(this.x, this.y, 0, 10, "sprite");
            this.rope.width = 0;
            this.rope.alive = true;
            this.rope.rotation = this.game.physics.arcade.angleToPointer(this.rope);
            this.bringToTop();
        };
        return Pumpkin;
    })(Phaser.Sprite);
    Pumpkin_1.Pumpkin = Pumpkin;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=pumpkin.js.map