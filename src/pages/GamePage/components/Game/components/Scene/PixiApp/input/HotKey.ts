import Key from './Key';
import KeyboardManager from './KeyboardManager';

export default class HotKey {
  isPressed = false;
  isDown = false;
  isReleased = false;

  ctrl = false;
  shift = false;
  alt = false;

  constructor(public key: Key, public manager: KeyboardManager) {}

  update() {
    this.isDown = this.manager.isDown(this.key);
    this.isPressed = this.manager.isPressed(this.key);
    this.isReleased = this.manager.isReleased(this.key);
    this.ctrl = this.manager.isDown(Key.CTRL);
    this.shift = this.manager.isDown(Key.SHIFT);
    this.alt = this.manager.isDown(Key.ALT);
  }

  remove() {
    this.manager.removeHotKey(this.key);
  }
}
