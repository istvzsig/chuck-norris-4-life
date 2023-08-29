class Controller {
  constructor() {
    this.currentKey = {};
    this.dir = 0;
    window.addEventListener('keydown', event => {
      if(event.key === 'a') {
        this.dir = -1;
      }
      if(event.key === 'd') {
        this.dir = 1;
      }
      this.currentKey[event.key] = true;
    });
    window.addEventListener('keyup', event => {
      this.currentKey[event.key] = false;
    });
  }
}

export default Controller;
