var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Phaser/phaser.d.ts"/>
var Pumpkin;
(function (Pumpkin) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        Menu.prototype.create = function () {
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