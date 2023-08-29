const EVENT_KEY_DOWN = 'keydown';
const EVENT_KEY_UP = 'keyup';
const KEY_A = 'a';
const KEY_D = 'd';
const KEY_W = 'w';
const KEY_S = 's';

class Controller {
  constructor(entity) {
    this.entity = entity;
    this.currentKey = {};
    this.dir = 0;
    this.handleKeyboardEvents([EVENT_KEY_DOWN, EVENT_KEY_UP]);
  }
  handleKeyboardEvents(keyboardEvents) {
    keyboardEvents.forEach(eventName => {
      window.addEventListener(eventName, event => {
        this.currentEventName = eventName;
        if(eventName == EVENT_KEY_DOWN) {
          switch(event.key) {
            case KEY_D:
            // case KEY_S:
              this.toggleProp('dir', 1, 'E'); break;
            case KEY_A:
            // case KEY_W:
              this.toggleProp('dir', -1, 'W'); break;
          }
          return this.currentKey[event.key] = true;
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
