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
            _super.call(this, game, x, y, 'pumpkin', 0);
            this.anchor.setTo(0.5, 0.5);
            game.add.existing(this);
            game.physics.p2.enable(this);
            this.body.setCircle(20);
            this.body.collideWorldBounds = false;
        }
        return Pumpkin;
    })(Phaser.Sprite);
    Pumpkin_1.Pumpkin = Pumpkin;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=pumpkin.js.map
