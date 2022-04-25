import { Application } from 'pixi.js';
import { pixiGame } from './pixiGame';

const SCALE_FACTOR = 3;

export const createPixiApp = () => {
  const app = new Application({
    width: document.documentElement.clientWidth * SCALE_FACTOR,
    height: document.documentElement.clientHeight * SCALE_FACTOR,
    resolution: 1,
    backgroundAlpha: 0,
  });

  const disableContextMenu = (e: Event) => {
    e.preventDefault();
  };

  app.view.addEventListener('contextmenu', disableContextMenu);

  const removeEventListeners = () => {
    app.view.removeEventListener('contextmenu', disableContextMenu);
  };

  const game = pixiGame(app);

  return {
    app,
    game,
    removeEventListeners,
  };
};
