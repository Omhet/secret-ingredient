import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Application, Container, Sprite, Texture } from 'pixi.js';

export const pixiGame = (app: Application) => {
  const { images } = levelDataManager.getCurrentLevelData();

  const beatSize = app.screen.height / 4;
  const unitSize = beatSize / 2;

  const foodTextures = images.food.map((img) => Texture.from(img));
  const food: Array<ReturnType<typeof createFoodSprite>> = [];

  document.addEventListener('click', handleTap);
  function handleTap() {
    console.log('tap');
    const foodSprite = createFoodSprite(foodTextures[0], unitSize);
    app.stage.addChild(foodSprite);
    food.push(foodSprite);
  }

  const zone = new Container();
  zone.position.x = app.screen.width / 2;
  zone.position.y = app.screen.height;
  const zoneInner = Sprite.from('/pics/zone_inner.png');
  const zoneInnerSize = beatSize;
  zoneInner.width = zoneInnerSize;
  zoneInner.height = zoneInnerSize;
  zoneInner.anchor.set(0.5);
  const zoneOuter = Sprite.from('/pics/zone_outer.png');
  const zoneOuterSize = beatSize * 2;
  zoneOuter.width = zoneOuterSize;
  zoneOuter.height = zoneOuterSize;
  zoneOuter.anchor.set(0.5);
  zone.addChild(zoneOuter);
  zone.addChild(zoneInner);
  app.stage.addChild(zone);

  app.ticker.add((delta) => {
    for (let i = 0; i < food.length; i++) {
      const foodSprite = food[i];
      foodSprite.y += delta * 10;
    }
  });
};

function createFoodSprite(texture: Texture, size: number) {
  const sprite = Sprite.from(texture);
  sprite.width = size;
  sprite.height = size;

  return sprite;
}
