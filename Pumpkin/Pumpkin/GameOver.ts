module Pumpkin {
    export class GameOver extends Phaser.State {


        private background: Phaser.TileSprite;
        private tryAgain: Phaser.TileSprite;
        private score: number;
        private scoreText: Phaser.Text;

        init(score: number) {
            this.score = score;
        }

        preload() {

            this.game.load.image('gameoverbg', 'assets/gameover.png');
            this.game.load.image('tryagainbtn', 'assets/tryagain.png');
        }

        create() {
            this.input.onDown.addOnce(this.startGame, this);
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'gameoverbg');
            this.tryAgain = this.game.add.tileSprite(400, 400, 300, 100, "tryagainbtn");
            this.scoreText = this.game.add.text(0,0, "Your score : " + this.score,
                { fontFamily: "serif", fontSize: '30px', fill: '#0ff', boundsAlignH: "center", boundsAlignV: "middle" });
            this.scoreText.setTextBounds(0, this.game.height/2, 800, 100);
        }

        startGame() {
            this.game.state.start("Play", true, false);
        }

    }
}
