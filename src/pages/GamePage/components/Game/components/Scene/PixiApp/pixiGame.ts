import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Application, Sprite } from 'pixi.js';

export const pixiGame = (app: Application) => {
  const currentLevelData = levelDataManager.getCurrentLevelData();

  const sprite = Sprite.from(currentLevelData.images.food[0]);
  app.stage.addChild(sprite);

  let elapsed = 0.0;
  app.ticker.add((delta) => {
    elapsed += delta;
    sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
  });
};
