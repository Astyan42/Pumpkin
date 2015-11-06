module Pumpkin {
    export class GameOver extends Phaser.State {


        public background: Phaser.TileSprite;
        public tryAgain: Phaser.TileSprite;

        preload() {

            this.game.load.image('gameoverbg', 'assets/gameover.png');
            this.game.load.image('tryagainbtn', 'assets/tryagain.png');
        }

        create() {
            this.input.onDown.addOnce(this.startGame, this);
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'gameoverbg');
            this.tryAgain = this.game.add.tileSprite(400, 400, 300, 100, "tryagainbtn");
        }

        startGame() {
            this.game.state.start("Play", true, false);
        }

    }
}
