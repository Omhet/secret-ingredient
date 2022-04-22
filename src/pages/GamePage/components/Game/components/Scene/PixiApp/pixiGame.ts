/* eslint-disable @typescript-eslint/ban-ts-comment */
import { levelDataManager } from '@lib/levels/LevelDataManager';
import keyboard from 'pixi-keyboard/src/main';
import { Application, Container, Sprite, Texture } from 'pixi.js';
// import Keyboard from 'pixi.js-keyboard';
import { CreateFoodItemProps, Food } from './types';
import { checkHit } from './util';

export const pixiGame = (app: Application) => {
  const keyboardManager = new keyboard.KeyboardManager();
  keyboardManager.enable();

  const {
    images,
    markup: { bps, notes: markupNotes },
  } = levelDataManager.getCurrentLevelData();
  const music = levelDataManager.getLevelMusic();
  const notes = markupNotes.map((beat) => ({ beat, isSpawned: false }));

  const beatSize = app.screen.height / 4;
  const unitSize = beatSize / 2;

  const foodTextures = images.food.map((img) => Texture.from(img));
  let food: Food = [];

  const zone = createZone(beatSize);
  app.stage.addChild(zone);
  zone.position.x = app.screen.width / 2;
  zone.position.y = app.screen.height;

  levelDataManager.playLevelMusic();

  function handleTap() {
    const foodItem = checkHit({ x: zone.x, y: zone.y }, food);
    if (foodItem) {
      foodItem.alive = false;
      foodItem.sprite.visible = false;
    }
  }
  keyboardManager.on('down', handleTap);

  // Game Loop
  app.ticker.add((delta) => {
    const foodDist = (beatSize * bps) / app.ticker.FPS;

    const currentBeat = bps * music.currentTime;

    // Spawn food on time
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.beat <= currentBeat && !note.isSpawned) {
        spawnFood(note.beat);
        note.isSpawned = true;
      }
    }

    // Move food
    food = food.filter((foodItem) => {
      foodItem.sprite.y += foodDist;

      if (!foodItem.alive || foodItem.sprite.y > app.screen.height) {
        foodItem.sprite.destroy();
        return false;
      }

      return true;
    });

    keyboardManager.update(delta);
  });

  function spawnFood(beat: number) {
    const foodSprite = createFoodSprite({
      texture: foodTextures[0],
      size: unitSize,
      x: app.screen.width / 2,
      y: -unitSize,
      beat,
    });
    app.stage.addChild(foodSprite.sprite);
    food.push(foodSprite);
  }
};

function createFoodSprite({ texture, size, x, y, beat }: CreateFoodItemProps) {
  const sprite = Sprite.from(texture);
  sprite.anchor.set(0.5, 0);
  sprite.x = x;
  sprite.y = y;
  sprite.width = size;
  sprite.height = size;

  return {
    sprite,
    beat,
    alive: true,
  };
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
