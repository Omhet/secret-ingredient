import * as PIXI from 'pixi.js';

export default class MouseManager extends PIXI.utils.EventEmitter {
  isEnabled = false;
  private isDown = false;

  constructor() {
    super();
  }

  enable() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      this._enableEvents();
    }
  }

  _enableEvents() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this), true);
    window.addEventListener('touchstart', this.onMouseDown.bind(this), true);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), true);
    window.addEventListener('touchend', this.onMouseUp.bind(this), true);
  }

  disable() {
    if (this.isEnabled) {
      this.isEnabled = false;
      this._disableEvents();
    }
  }

  _disableEvents() {
    window.removeEventListener('mousedown', this.onMouseDown, true);
    window.removeEventListener('mouseup', this.onMouseUp, true);
  }

  onMouseDown(evt: any) {
    evt.preventDefault();

    if (!this.isDown) {
      this.isDown = true;
    }
  }

  onMouseUp(evt: any) {
    evt.preventDefault();

    if (this.isDown) {
      this.isDown = false;
    }
  }

  update() {
    if (this.isDown) {
      this.emit('down');
      this.isDown = false;
    }
  }
}
