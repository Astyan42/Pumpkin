var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by aksharpatel on 27/03/15.
*/
/// <reference path="Phaser/phaser.d.ts"/>
var Castlevania;
(function (Castlevania) {
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
    Castlevania.Menu = Menu;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Menu.js.map