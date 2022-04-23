import * as PIXI from 'pixi.js';
import HotKey from './HotKey';
import Key from './Key';

export default class KeyboardManager extends PIXI.utils.EventEmitter {
  isEnabled = false;
  private pressedKeys: boolean[] = [];
  private releasedKeys: boolean[] = [];
  private downKeys: { [key: number]: number } = {};

  private hotKeys: HotKey[] = [];
  private preventDefaultKeys: boolean[] = [];
  onDownCallback: (evt: any) => void;
  onUpCallback: (evt: any) => void;

  constructor() {
    super();
    this.onDownCallback = this._onKeyDown.bind(this);
    this.onUpCallback = this._onKeyUp.bind(this);
  }

  enable() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      this._enableEvents();
    }
  }

  _enableEvents() {
    window.addEventListener('keydown', this.onDownCallback, true);
    window.addEventListener('keyup', this.onUpCallback, true);
  }

  disable() {
    if (this.isEnabled) {
      this.isEnabled = false;
      this._disableEvents();
    }
  }

  _disableEvents() {
    window.removeEventListener('keydown', this.onDownCallback, true);
    window.removeEventListener('keyup', this.onUpCallback, true);
  }

  setPreventDefault(key: any, value = true) {
    if (_isArray(key)) {
      for (let i = 0; i < key.length; i++) {
        this.preventDefaultKeys[key[i]] = value;
      }
    } else {
      this.preventDefaultKeys[key] = value;
    }
  }

  _onKeyDown(evt: any) {
    const key = evt.which || evt.keyCode;
    if (this.preventDefaultKeys[key]) {
      evt.preventDefault();
    }

    if (!this.isDown(key)) {
      this.downKeys[key] = 0;
      this.pressedKeys[key] = true;
      this.emit('pressed', key);
    }
  }

  _onKeyUp(evt: any) {
    const key = evt.which || evt.keyCode;
    if (this.preventDefaultKeys[key]) {
      evt.preventDefault();
    }

    if (this.isDown(key)) {
      this.pressedKeys[key] = false;
      this.releasedKeys[key] = true;

      delete this.downKeys[key];
      this.emit('released', key);
    }
  }

  downTime(key: Key): number {
    return this.downKeys[key] || 0;
  }

  isDown(key: Key): boolean {
    return this.downKeys.hasOwnProperty(key);
  }

  isPressed(key: Key): boolean {
    return !!this.pressedKeys[key];
  }

  isReleased(key: Key): boolean {
    return !!this.releasedKeys[key];
  }

  update(delta = 0) {
    this.hotKeys.forEach((key) => key.update());

    for (const key in this.downKeys) {
      if (!this.downKeys.hasOwnProperty(key)) {
        continue;
      }

      this.downKeys[key] += delta;
      this.emit('down', key);
    }

    this.pressedKeys.length = 0;
    this.releasedKeys.length = 0;
  }

  getHotKey(key: Key) {
    const hotKey = this.hotKeys[key] || new HotKey(key, this);
    this.hotKeys[key] = hotKey;
    return hotKey;
  }

  removeHotKey(key: Key) {
    if (this.hotKeys[key]) {
      delete this.hotKeys[key];
    }
  }
}

function _isArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
