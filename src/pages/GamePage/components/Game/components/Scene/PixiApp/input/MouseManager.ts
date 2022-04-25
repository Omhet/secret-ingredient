import * as PIXI from 'pixi.js';

export default class MouseManager extends PIXI.utils.EventEmitter {
  isEnabled = false;
  private isDown = false;
  onDownCallback: (evt: any) => void;
  onUpCallback: (evt: any) => void;

  constructor() {
    super();
    this.onDownCallback = this.onMouseDown.bind(this);
    this.onUpCallback = this.onMouseUp.bind(this);
  }

  enable() {
    if (!this.isEnabled) {
      this.isEnabled = true;
      this._enableEvents();
    }
  }

  _enableEvents() {
    window.addEventListener('mousedown', this.onDownCallback);
    window.addEventListener('mouseup', this.onUpCallback);
    window.addEventListener('touchstart', this.onDownCallback);
    window.addEventListener('touchend', this.onUpCallback);
  }

  disable() {
    if (this.isEnabled) {
      this.isEnabled = false;
      this._disableEvents();
    }
  }

  _disableEvents() {
    window.removeEventListener('mousedown', this.onDownCallback);
    window.removeEventListener('mouseup', this.onUpCallback);
    window.removeEventListener('touchstart', this.onDownCallback);
    window.removeEventListener('touchend', this.onUpCallback);
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
