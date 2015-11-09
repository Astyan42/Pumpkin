var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Phaser/phaser.d.ts"/>
var PumpkinNinja;
(function (PumpkinNinja) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
            this.timer = 0;
        }
        Menu.prototype.preload = function () {
            this.game.load.image('splash', 'Assets/splash.png');
        };
        Menu.prototype.create = function () {
            this.game.stage.backgroundColor = 0x0b101c;
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "splash");
            background.anchor.setTo(0.5, 0.5);
            background.scale.setTo(0.5, 0.5);
            this.game.input.onDown;
            this.input.onDown.addOnce(this.startGame, this);
            this.instructionText = this.game.add.text(0, 0, "Touch any key", { font: "Homemade Apple", fontSize: '30px', fill: '#414807', boundsAlignH: "center", boundsAlignV: "middle" });
            this.instructionText.setTextBounds(0, this.game.height - 100, 800, 100);
        };
        Menu.prototype.startGame = function () {
            this.game.state.start("Play", true, false);
        };
        Menu.prototype.update = function () {
            this.timer += this.game.time.elapsed; //this is in ms, not seconds.
            if (this.timer >= 666) {
                this.timer -= 666;
                this.instructionText.visible = !this.instructionText.visible;
            }
        };
        return Menu;
    })(Phaser.State);
    PumpkinNinja.Menu = Menu;
})(PumpkinNinja || (PumpkinNinja = {}));
//# sourceMappingURL=Menu.js.map