/* eslint-disable @typescript-eslint/ban-ts-comment */
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Application, Container, Sprite, Texture } from 'pixi.js';
import KeyboardManager from './input/KeyboardManager';
import MouseManager from './input/MouseManager';
import { CreateFoodItemProps, Food } from './types';
import { checkHit } from './util';

export const pixiGame = (app: Application) => {
  const keyboardManager = new KeyboardManager();
  keyboardManager.enable();
  const mouseManager = new MouseManager();
  mouseManager.enable();

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
    console.log('tap');

    const foodItem = checkHit({ x: zone.x, y: zone.y }, food);
    if (foodItem) {
      console.log('hit', foodItem.beat);
      app.stage.removeChild(foodItem.sprite);
      food = food.filter((item) => item.beat !== foodItem.beat);
    }
  }

  keyboardManager.on('pressed', handleTap);
  mouseManager.on('down', handleTap);
  // document.addEventListener(
  //   'click',
  //   (evt) => {
  //     evt.preventDefault();
  //     handleTap();
  //   },
  //   true
  // );

  // Game Loop
  app.ticker.add(gameLoop);

  function gameLoop() {
    keyboardManager.update();
    mouseManager.update();

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
    const foodDist = (beatSize * bps) / app.ticker.FPS;
    for (let i = 0; i < food.length; i++) {
      const foodItem = food[i];
      foodItem.sprite.y += foodDist;
    }

    // const foodItem = checkHit({ x: zone.x, y: zone.y }, food);
    // if (foodItem) {
    //   console.log('hit', foodItem.beat);
    //   app.stage.removeChild(foodItem.sprite);
    //   food = food.filter((item) => item.beat !== foodItem.beat);
    // }
  }

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
