var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PumpkinNinja;
(function (PumpkinNinja) {
    var Pumpkin = (function (_super) {
        __extends(Pumpkin, _super);
        function Pumpkin(game, x, y) {
            var _this = this;
            _super.call(this, game, x, y, "pumpkin", 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this);
            this.width = 100;
            this.height = 88;
            this.body.setCircle(40);
            this.body.fixedRotation = true;
            this.body.collideWorldBounds = false;
            this.light = this.game.add.sprite(this.x - this.width * 1.3, this.y - this.game.world.height / 2 - this.height / 1.2, 'light');
            this.light.width = 150;
            this.light.height = 150;
            this.light.alpha = 0.3;
            this.addChild(this.light);
            var anim = this.light.animations.add('glow');
            anim.play(10, true);
            this.body.mass = 4;
            this.body.data.gravityScale = 1;
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(function () {
                _this.game.state.start("Gameover", true, false, _this.game.state.getCurrentState().score);
            }, this);
        }
        return Pumpkin;
    })(Phaser.Sprite);
    PumpkinNinja.Pumpkin = Pumpkin;
})(PumpkinNinja || (PumpkinNinja = {}));
//# sourceMappingURL=pumpkin.js.map