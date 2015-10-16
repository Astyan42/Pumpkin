/**
 * Created by aksharpatel on 27/03/15.
 */
/// <reference path="Phaser/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preloader.ts"/>
/// <reference path="Menu.ts"/>
/// <reference path="Play.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Castlevania;
(function (Castlevania) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, "");
            this.state.add("Boot", Castlevania.Boot, false);
            this.state.add("Preloader", Castlevania.Preloader, false);
            this.state.add("Menu", Castlevania.Menu, false);
            this.state.add("Play", Castlevania.Play, false);
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    Castlevania.Game = Game;
})(Castlevania || (Castlevania = {}));
window.onload = function () {
    new Castlevania.Game();
};
//# sourceMappingURL=app.js.map