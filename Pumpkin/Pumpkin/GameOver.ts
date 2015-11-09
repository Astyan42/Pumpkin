module Pumpkin {
    export class GameOver extends Phaser.State {


        private background: Phaser.Sprite;
        private tryAgain: Phaser.TileSprite;
        private score: number;
        private scoreText: Phaser.Text;

        init(score: number) {
            this.score = score;
        }

        preload() {

            this.game.load.image('gameoverbg', 'assets/gameover.jpg');
            this.game.load.image('tryagainbtn', 'assets/tryagain.png');
        }

        create() {
            this.game.stage.backgroundColor = 0x0b101c;
            this.input.onDown.addOnce(this.startGame, this);
            this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "gameoverbg");
            this.background.anchor.setTo(0.5, 0.5);
            //this.tryAgain = this.game.add.tileSprite(400, 400, 300, 100, "tryagainbtn");
            this.scoreText = this.game.add.text(0,0, this.score + " Points",
                { font: "Homemade Apple", fontSize: '30px', fill: '#414807', boundsAlignH: "center", boundsAlignV: "middle" });
            this.scoreText.setTextBounds(430, 410, 200, 100);

            this.game.add.text(0, 0, "Credits : \n - @Astyan42 \n - @amaury_bzc \n- @fan_jiyong ", { font: "Homemade Apple", fontSize: '17px', fill: '#414807', boundsAlignH: "center", boundsAlignV: "middle" })
                .setTextBounds(51, 350, 100, 200);
             
        }

        startGame() {
            this.game.state.start("Play", true, false);
        }

    }
}
