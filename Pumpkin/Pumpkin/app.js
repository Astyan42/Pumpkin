/// <reference path="Phaser/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preloader.ts"/>
/// <reference path="Menu.ts"/>
/// <reference path="Play.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pumpkin;
(function (Pumpkin) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, "");
            this.state.add("Boot", Pumpkin.Boot, false);
            this.state.add("Preloader", Pumpkin.Preloader, false);
            this.state.add("Gameover", Pumpkin.GameOver, false);
            this.state.add("Menu", Pumpkin.Menu, false);
            this.state.add("Play", Pumpkin.Play, false);
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    Pumpkin.Game = Game;
})(Pumpkin || (Pumpkin = {}));
window.onload = function () {
    new Pumpkin.Game();
};
//# sourceMappingURL=app.js.map