import Timer from './Timer.js';
import Nameplate from './Nameplate.js';
import Controller from './Controller.js';

class Player {
  constructor(name, context, image) {
    this.context = context;
    this.name = name;
    this.nameplate = new Nameplate(this);
    this.timer = new Timer(1/60);
    this.controller = new Controller();
    this.tile = new Map();
    this.image = image;
    this.size = {
      w: 70,
      h: 120,
    }
    this.pos = {
      x: this.context.canvas.width / 2 - this.size.w / 2,
      y: this.context.canvas.height / 2 - this.size.h / 2
    };
    this.speed = 10;
  }
  update(time=0) {
    this.timer.totalTime += (time - this.timer.lastTime) / 1000; // seconds
    while(this.timer.totalTime > this.timer.deltaTime) {
      this.draw();
      this.drawName();
      this.move();
      this.timer.totalTime -= this.timer.deltaTime;
    }
    this.timer.lastTime = time;
    requestAnimationFrame(this.update.bind(this));
  }
  draw() {
    const buffer = this.setBuffer();
    this.clearBackground();
    buffer
      .getContext('2d', { aplha: false })
      .drawImage(
        this.image,
        0, 0,
        this.size.w, this.size.h,
        0, 0,
        this.size.w, this.size.h
      );
      this.context.drawImage(buffer, this.pos.x, this.pos.y);
  }
  drawName() {
    this.nameplate.draw();
  }
  move() {
    if(this.controller.currentKey['d'] && this.controller.dir > 0) {
      this.pos.x = Math.round(this.pos.x + this.speed * this.controller.dir);
    }
    if(this.controller.currentKey['a'] && this.controller.dir < 0) {
      this.pos.x = Math.round(this.pos.x + this.speed * this.controller.dir)
    }
  }
  clearBackground() {
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }
  setBuffer() {
    const buffer = document.createElement('canvas');
    const bufferContext = buffer.getContext('2d');
    if(this.controller.dir < 0) {
      bufferContext.scale(-1, 1);
      bufferContext.translate(-this.size.w, 0);
    }
    return buffer;
  }
}

export default Player;
