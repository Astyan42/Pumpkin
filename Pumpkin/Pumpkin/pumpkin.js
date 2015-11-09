var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pumpkin;
(function (Pumpkin_1) {
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
            this.body.setCircle(20);
            this.body.collideWorldBounds = false;
            var light = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'light');
            light.anchor.setTo(0.5, 0.5);
            light.width = 150;
            light.height = 150;
            light.alpha = 0.3;
            var anim = light.animations.add('glow');
            anim.play(10, true);
            this.body.mass = 200;
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(function () {
                _this.game.state.start("Gameover", true, false, _this.game.state.getCurrentState().score);
            }, this);
        }
        return Pumpkin;
    })(Phaser.Sprite);
    Pumpkin_1.Pumpkin = Pumpkin;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=pumpkin.js.map