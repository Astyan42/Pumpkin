
/// <reference path="Phaser/phaser.d.ts"/>
module PumpkinNinja {
    export class Menu extends Phaser.State {

        private instructionText: Phaser.Text;

        preload() {
            this.game.load.image('splash', 'Assets/splash.png');
        }

        create() {

            this.game.stage.backgroundColor = 0x0b101c;
            var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "splash");
            background.anchor.setTo(0.5, 0.5);
            background.scale.setTo(0.5, 0.5);
            this.game.input.onDown
            this.input.onDown.addOnce(this.startGame, this);

            this.instructionText = this.game.add.text(0, 0, "Touch any key",
                { font: "Homemade Apple", fontSize: '30px', fill: '#414807', boundsAlignH: "center", boundsAlignV: "middle" });
            this.instructionText.setTextBounds(0, this.game.height-100, 800, 100);
        }
        
        startGame() {
            this.game.state.start("Play", true, false);
        }

        private timer = 0;

        update() {
            this.timer += this.game.time.elapsed; //this is in ms, not seconds.
            if (this.timer >= 666) { // EVIL WAS HERE
                this.timer -= 666;
                this.instructionText.visible = !this.instructionText.visible;
            }
        }
    }
}
