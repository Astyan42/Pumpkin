/// <reference path="Phaser/phaser.d.ts"/>
/// <reference path="Boot.ts"/>
/// <reference path="Preloader.ts"/>
/// <reference path="Menu.ts"/>
/// <reference path="Play.ts"/>

module Pumpkin {
    export class Game extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, "");
            this.state.add("Boot", Boot, false);
            this.state.add("Preloader", Preloader, false);
            this.state.add("Gameover", GameOver, false);
            this.state.add("Menu", Menu, false);
            this.state.add("Play", Play, false);
            this.state.start("Boot");
        }

    }
}

window.onload = () => {
    new Pumpkin.Game();
};
