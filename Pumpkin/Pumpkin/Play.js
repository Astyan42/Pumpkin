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
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
        }
        Play.prototype.preload = function () {
            this.game.load.image('sprite', 'assets/corde.png');
        };
        Play.prototype.create = function () {
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.tilesprite = this.game.add.tileSprite(0, 0, 20, 20, "sprite");
        };
        Play.prototype.update = function () {
            this.tilesprite.width = this.tilesprite.width + 25;
        };
        return Play;
    })(Phaser.State);
    Castlevania.Play = Play;
})(Castlevania || (Castlevania = {}));
//# sourceMappingURL=Play.js.map