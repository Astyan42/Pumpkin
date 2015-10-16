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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.create = function () {
            this.startMainMenu();
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start("Menu", true, false);
        };
        return Preloader;
    })(Phaser.State);
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Preloader.js.map