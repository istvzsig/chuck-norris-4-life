const KEY_A = 'a';
const KEY_D = 'd';

class Controller {
  constructor(entity, keyboardEvents = []) {
    this.keyboardEvents = keyboardEvents;
    this.entity = entity;
    this.currentKey = {};
    this.dir = 0;
  }
  handleKeyboardEvents() {
    this.keyboardEvents.forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.currentEventName = eventName;
        if(eventName == 'keydown') {
          switch(event.key) {
            case KEY_D: // right
              this.toggleProp('dir', 1, 'E'); break;
            case KEY_A: // left
              this.toggleProp('dir', -1, 'W'); break;
          }
          return this.currentKey[event.key] = 'pressed';
        }
        return this.currentKey[event.key] = false;
      });
    });
  }
  toggleProp(prop, value, orientation) {
    this.entity.orientation = orientation;
    this[prop] = value;
  }
}

export default Controller;
