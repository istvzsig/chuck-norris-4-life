import Player from './player/Player.js';
import { loadImage } from './loaders.js';

class Game {
  constructor() {
    this.gameCanvas = document.getElementById('game');
    this.gameCanvas.width = window.innerWidth;
    this.gameCanvas.height = window.innerHeight;
    this.gameCanvasContext = this.gameCanvas.getContext('2d');
  }
  start() {
    loadImage('./frontend/img/cn.png')
    .then(spriteImage => {
      const player = new Player("Silent Bob", this.gameCanvasContext, spriteImage);
      [player].forEach(entity => entity.update());
    });
  }
}

export default Game;
