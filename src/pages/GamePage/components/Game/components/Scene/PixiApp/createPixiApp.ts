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

  window.addEventListener('resize', function () {
    app.renderer.resize(
      document.documentElement.clientWidth * SCALE_FACTOR,
      document.documentElement.clientHeight * SCALE_FACTOR
    );
  });

  app.view.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  const game = pixiGame(app);

  return {
    app,
    game,
  };
};
