var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Phaser/phaser.d.ts"/>
var Pumpkin;
(function (Pumpkin) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.preload = function () {
            this.game.load.image('splash', 'Assets/splash.png');
        };
        Menu.prototype.create = function () {
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "splash");
            background.anchor.setTo(0.5, 0.5);
            background.scale.setTo(0.5, 0.5);
            this.input.onDown.addOnce(this.startGame, this);
        };
        Menu.prototype.startGame = function () {
            this.game.state.start("Play", true, false);
        };
        return Menu;
    })(Phaser.State);
    Pumpkin.Menu = Menu;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=Menu.js.map