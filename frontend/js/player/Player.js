import Timer from '../Timer.js';
import Nameplate from '../Nameplate.js';
import Controller from '../controller/Controller.js';

const SPEED = 5;
const ANIMATION_SEQUENCE_RATE = 5;

class Player {
  constructor(name, context, image) {
    this.context = context;
    this.name = name;
    this.nameplate = new Nameplate(this);
    this.timer = new Timer(1/60);
    this.controller = new Controller(this, ['keydown', 'keyup']);
    this.tiles = [];
    this.image = image;
    this.orientation = 'E'; // face right
    this.size = { w: 70, h: 120 };
    this.pos = {
      x: Math.floor(this.context.canvas.width / 2 - this.size.w / 2),
      y: Math.floor(this.context.canvas.height / 2 - this.size.h / 2)
    };
    this.speed = SPEED;
    this.spriteSourceX = 0;
    this.spriteSourceY = 0;
    this.walkDistance = 0;
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
    let walkDistance = Math.floor(this.walkDistance / ANIMATION_SEQUENCE_RATE);
    let currentFrame = walkDistance % sequence.length;
    currentFrame = currentFrame % sequence.length;
    this.spriteSourceX = sequence[currentFrame];
  }
  control() {

    this.setPositionToIdle();
    this.handleKeyboardKeys();
    this.handleKeyboardEvents();
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
  clearBackground(buffer) {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    buffer.getContext('2d').clearRect(0, 0, this.size.w, this.size.h);
  }
  draw() {
    const buffer = this.tiles[this.orientation !== "E" ? 1 : 0];
    const bufferContext = buffer.getContext('2d', { aplha: false });
    this.clearBackground(buffer);
    bufferContext.drawImage(
      this.image,
      this.spriteSourceX * this.size.w, this.size.h * this.spriteSourceY,
      this.size.w, this.size.h,
      0, 0,
      this.size.w, this.size.h
      );
      this.context.drawImage(buffer, this.pos.x, this.pos.y);
      this.control();
  }
  drawName() {
    this.nameplate.draw();
  }
  handleKeyboardEvents() {
    this.controller.handleKeyboardEvents();
  }
  handleKeyboardKeys() {
    let currentKey = this.controller.currentKey;
    if(currentKey['d'] === 'pressed') {
      return (
        this.walkDistance += 1,
        this.pos.x = this.pos.x + this.speed * this.controller.dir,
        this.animate()
      );
    }
    if(currentKey['a'] === 'pressed') {
      return (
        this.walkDistance += 1,
        this.pos.x = this.pos.x + this.speed * this.controller.dir,
        this.animate()
      );
    }

  }
  setPositionToIdle() {
    if(this.controller.currentEventName == 'keyup' && this.orientation == 'W') {
      this.controller.dir = 0;
      this.walkDistance = 0;
      this.spriteSourceX = 0;
    }
    if(this.controller.currentEventName == 'keyup' && this.orientation == 'E') {
      this.controller.dir = 0;
      this.walkDistance = 0;
      this.spriteSourceX = 0;
    }
    // console.log({orientation: this.orientation, controller_dir: this.controller.dir})
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
