import { Application } from 'pixi.js';
import { pixiGame } from './pixiGame';

export const createPixiApp = () => {
  const app = new Application({
    width: innerWidth,
    height: innerHeight,
    resolution: window.devicePixelRatio || 1,
    backgroundAlpha: 0,
  });

  pixiGame(app);

  return app;
};
