var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", { preload: this.preload, create: this.create, update: this.update });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image("pumpkin", "Assets/pumpkin.png");
        this.game.load.image("wall", "Assets/wall.png");
    };
    SimpleGame.prototype.create = function () {
        // create background first
        this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');
        this.pumpkin = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "pumpkin");
        this.pumpkin.anchor.setTo(0.5, 0.5);
        this.pumpkin.width = 100;
        this.pumpkin.height = 70;
    };
    SimpleGame.prototype.update = function () {
        // background http://examples.phaser.io/_site/view_full.html?d=games&f=invaders.js&t=invaders
        this.background.tilePosition.x -= 2;
    };
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map