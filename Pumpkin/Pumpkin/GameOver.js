var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pumpkin;
(function (Pumpkin) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
        }
        GameOver.prototype.preload = function () {
            this.game.load.image('gameoverbg', 'assets/gameover.png');
            this.game.load.image('tryagainbtn', 'assets/tryagain.png');
        };
        GameOver.prototype.create = function () {
            this.input.onDown.addOnce(this.startGame, this);
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'gameoverbg');
            this.tryAgain = this.game.add.tileSprite(400, 400, 300, 100, "tryagainbtn");
        };
        GameOver.prototype.startGame = function () {
            this.game.state.start("Play", true, false);
        };
        return GameOver;
    })(Phaser.State);
    Pumpkin.GameOver = GameOver;
})(Pumpkin || (Pumpkin = {}));
//# sourceMappingURL=GameOver.js.map