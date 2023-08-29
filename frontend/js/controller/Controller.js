const KEY_DOWN = 'keydown';
const KEY_UP = 'keyup';
const KEY_A = 'a';
const KEY_D = 'd';
const KEY_W = 'w';
const KEY_S = 's';

class Controller {
  constructor() {
    this.currentKey = {};
    this.dir = 0;
    [KEY_DOWN, KEY_UP].forEach(eventName => {
      window.addEventListener(eventName, event => {
        if(eventName == KEY_DOWN) {
          switch(event.key) {
            case KEY_D:
            case KEY_S:
              this.dir = 1; break;
            case KEY_A:
            case KEY_W:
              this.dir = -1; break;
          }
          return this.currentKey[event.key] = true;
        }
        return this.currentKey[event.key] = false;
      });

    });
  }
}

export default Controller;
