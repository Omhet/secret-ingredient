/* eslint-disable @typescript-eslint/ban-ts-comment */
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Application, Container, Sprite, Texture } from 'pixi.js';

export const pixiGame = (app: Application) => {
  const {
    images,
    markup: { bps, notes: markupNotes },
  } = levelDataManager.getCurrentLevelData();
  const music = levelDataManager.getLevelMusic();
  const notes = markupNotes.map((beat) => ({ beat, isSpawned: false }));

  const beatSize = app.screen.height / 4;
  const unitSize = beatSize / 2;

  const foodTextures = images.food.map((img) => Texture.from(img));
  let food: Array<ReturnType<typeof createFoodSprite>> = [];

  const zone = createZone(beatSize);
  app.stage.addChild(zone);
  zone.position.x = app.screen.width / 2;
  zone.position.y = app.screen.height;

  levelDataManager.playLevelMusic();
  app.ticker.add(() => {
    const foodDist = (beatSize * bps) / app.ticker.FPS;

    const currentBeat = bps * music.currentTime;

    // Spawn food on time
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.beat <= currentBeat && !note.isSpawned) {
        spawnFood();
        note.isSpawned = true;
      }
    }

    // Move food
    food = food.filter((foodSprite) => {
      foodSprite.y += foodDist;

      if (foodSprite.y > app.screen.height) {
        foodSprite.destroy({ texture: false, baseTexture: false });
        return false;
      }

      return true;
    });
  });

  function spawnFood() {
    const foodSprite = createFoodSprite({
      texture: foodTextures[0],
      size: unitSize,
      x: app.screen.width / 2,
      y: -unitSize,
    });
    app.stage.addChild(foodSprite);
    food.push(foodSprite);
  }

  document.addEventListener('click', handleTap);
  function handleTap() {
    // TODO
  }
};

type FoodSprite = {
  texture: Texture;
  size: number;
  x: number;
  y: number;
};
function createFoodSprite({ texture, size, x, y }: FoodSprite) {
  const sprite = Sprite.from(texture);
  sprite.anchor.set(0.5, 0);
  sprite.x = x;
  sprite.y = y;
  sprite.width = size;
  sprite.height = size;

  return sprite;
}

function createZone(size: number) {
  const zone = new Container();

  const zoneInner = Sprite.from('/pics/zone_inner.png');
  const zoneInnerSize = size;
  zoneInner.width = zoneInnerSize;
  zoneInner.height = zoneInnerSize;
  zoneInner.anchor.set(0.5);
  const zoneOuter = Sprite.from('/pics/zone_outer.png');
  const zoneOuterSize = size * 2;
  zoneOuter.width = zoneOuterSize;
  zoneOuter.height = zoneOuterSize;
  zoneOuter.anchor.set(0.5);
  zone.addChild(zoneOuter);
  zone.addChild(zoneInner);

  return zone;
}
