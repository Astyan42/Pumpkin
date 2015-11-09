var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Phaser/phaser.d.ts"/>
var PumpkinNinja;
(function (PumpkinNinja) {
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
    PumpkinNinja.Preloader = Preloader;
})(PumpkinNinja || (PumpkinNinja = {}));
//# sourceMappingURL=Preloader.js.map