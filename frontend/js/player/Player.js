import Timer from '../Timer.js';
import Nameplate from '../Nameplate.js';
import Controller from '../controller/Controller.js';

class Player {
  constructor(name, context, image) {
    this.context = context;
    this.name = name;
    this.nameplate = new Nameplate(this);
    this.timer = new Timer(1/60);
    this.controller = new Controller(this);
    this.tiles = [];
    this.image = image;
    this.orientation = 'E'; // face right
    this.size = { w: 70, h: 120 };
    this.pos = {
      x: Math.floor(this.context.canvas.width / 2 - this.size.w / 2),
      y: Math.floor(this.context.canvas.height / 2 - this.size.h / 2)
    };
    this.speed = 5;
    this.spriteSourceX = 0;
    this.spriteSourceY = 0;
    this.createOffCanvasBuffers();
  }
  update(time=0) {
    this.timer.totalTime += (time - this.timer.lastTime) / 1000; // seconds
    while(this.timer.totalTime > this.timer.deltaTime) {
      this.draw();
      this.timer.totalTime -= this.timer.deltaTime;
    }
    this.timer.lastTime = time;
    requestAnimationFrame(this.update.bind(this));
  }
  animate() {
    const sequence = [10, 11, 12];
  }
  createOffCanvasBuffers() {
    [false, true].map(flip => {
      const buffer = document.createElement('canvas');
      const bufferContext = buffer.getContext('2d');
      buffer.width = this.size.w;
      buffer.height = this.size.h;
      if(flip) {
        bufferContext.scale(-1, 1);
        bufferContext.translate(-this.size.w, 0);
      }
      this.tiles.push(buffer);
    });
  }
  draw() {
    const buffer = this.tiles[this.orientation !== "E" ? 1 : 0]
    const bufferContext = buffer.getContext('2d', { aplha: false });
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    bufferContext.drawImage(
        this.image,
        this.spriteSourceX * this.size.w, this.size.h * this.spriteSourceY,
        this.size.w, this.size.h,
        0, 0,
        this.size.w, this.size.h
      );
      this.move();
      this.context.drawImage(buffer, this.pos.x, this.pos.y);
  }
  drawName() {
    this.nameplate.draw();
  }
  clearBackground() {
    const canvas = this.context.canvas;
    canvas.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(this.clearBackground.bind(this));
  }
  move() {
    let currentKey = this.controller.currentKey;
    this.toggleControllerDir();

    if(currentKey['d'] && this.controller.dir > 0) {
      // this.spriteSourceX = 10;
      this.pos.x = this.pos.x + this.speed * this.controller.dir;
    }
    if(currentKey['a'] && this.controller.dir < 0) {
      this.pos.x = this.pos.x + this.speed * this.controller.dir;
    }
  }
  toggleControllerDir() {
    if(this.controller.currentEventName == 'keyup' && this.orientation == 'W') {
      this.controller.dir = 0;
    }
    if(this.controller.currentEventName == 'keyup' && this.orientation == 'E') {
      this.controller.dir = 0;
    }
    console.log({orientation: this.orientation, controller_dir: this.controller.dir})
  }
}

export default Player;
