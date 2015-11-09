var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PumpkinNinja;
(function (PumpkinNinja) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.init = function (score) {
            this.score = score;
        };
        GameOver.prototype.preload = function () {
            this.game.load.image('gameoverbg', 'assets/gameover.jpg');
            this.game.load.image('tryagainbtn', 'assets/tryagain.png');
        };
        GameOver.prototype.create = function () {
            this.game.stage.backgroundColor = 0x0b101c;
            this.input.onDown.addOnce(this.startGame, this);
            this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "gameoverbg");
            this.background.anchor.setTo(0.5, 0.5);
            //this.tryAgain = this.game.add.tileSprite(400, 400, 300, 100, "tryagainbtn");
            this.scoreText = this.game.add.text(0, 0, this.score + " Points", { font: "Homemade Apple", fontSize: '30px', fill: '#414807', boundsAlignH: "center", boundsAlignV: "middle" });
            this.scoreText.setTextBounds(430, 410, 200, 100);
            this.game.add.text(0, 0, "Credits : \n - @Astyan42 \n - @amaury_bzc \n- @fan_jiyong ", { font: "Homemade Apple", fontSize: '17px', fill: '#414807', boundsAlignH: "center", boundsAlignV: "middle" })
                .setTextBounds(51, 350, 100, 200);
        };
        GameOver.prototype.startGame = function () {
            this.game.state.start("Play", true, false);
        };
        return GameOver;
    })(Phaser.State);
    PumpkinNinja.GameOver = GameOver;
})(PumpkinNinja || (PumpkinNinja = {}));
//# sourceMappingURL=GameOver.js.map