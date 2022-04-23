import { Application } from 'pixi.js';
import { pixiGame } from './pixiGame';

export const createPixiApp = () => {
  const app = new Application({
    width: innerWidth * 3,
    height: innerHeight * 3,
    resolution: 1,
    backgroundAlpha: 0,
  });

  const game = pixiGame(app);

  return {
    app,
    game,
  };
};
