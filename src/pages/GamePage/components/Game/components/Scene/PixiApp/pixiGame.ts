/* eslint-disable @typescript-eslint/ban-ts-comment */
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Application, Sprite, Texture } from 'pixi.js';
import { getRandomAngle, getRandomArrayItem } from '../../../utils';
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

  const zone = createZone(unitSize);
  app.stage.addChild(zone);
  zone.position.x = app.screen.width / 2;
  zone.position.y = app.screen.height - unitSize;

  levelDataManager.playLevelMusic();

  function handleTap() {
    const foodItem = checkHit({ x: zone.x, y: zone.y }, food);
    if (foodItem) {
      app.stage.removeChild(foodItem.sprite);
      food = food.filter((item) => item.beat !== foodItem.beat);
    }
  }

  keyboardManager.on('pressed', handleTap);
  mouseManager.on('down', handleTap);

  // Game Loop
  app.ticker.add(gameLoop);

  let elapsed = 0.0;
  function gameLoop() {
    elapsed += app.ticker.elapsedMS;

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

    const beatAnimationValue = getBeatAnimationValue(elapsed, bps);

    zone.scale.set(getScaledBeatAnimationValue(beatAnimationValue, 1, 1.2));

    // Move food
    const foodDist = (beatSize * bps) / app.ticker.FPS;
    for (let i = 0; i < food.length; i++) {
      const foodItem = food[i];
      foodItem.sprite.x += foodDist * foodItem.vx;
      foodItem.sprite.y += foodDist * foodItem.vy;

      foodItem.sprite.scale.set(getScaledBeatAnimationValue(beatAnimationValue, 0.1, 0.12));
    }
  }

  function spawnFood(beat: number) {
    const angle = getRandomAngle() * (Math.PI / 180);
    const dist = beatSize * 4;
    const x = dist * Math.cos(angle) + zone.x;
    const y = dist * Math.sin(angle) + zone.y;

    const dx = zone.x - x;
    const dy = zone.y - y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const vx = dx / d;
    const vy = dy / d;

    const foodSprite = createFoodSprite({
      texture: getRandomArrayItem(foodTextures),
      size: unitSize,
      x,
      y,
    });
    app.stage.addChild(foodSprite);
    food.push({
      sprite: foodSprite,
      beat,
      vx,
      vy,
    });
  }
};

function createFoodSprite({ texture, size, x, y }: CreateFoodItemProps) {
  const sprite = Sprite.from(texture);
  sprite.anchor.set(0.5);
  sprite.x = x;
  sprite.y = y;
  sprite.width = size;
  sprite.height = size;

  return sprite;
}

function createZone(size: number) {
  const zone = Sprite.from('/pics/zone_outer.png');
  const zoneSize = size;
  zone.width = zoneSize;
  zone.height = zoneSize;
  zone.anchor.set(0.5);

  return zone;
}

function getBeatAnimationValue(elapsed: number, bps: number) {
  return Math.abs(Math.sin((elapsed / 1000) * (Math.PI / 2) * bps));
}

function getScaledBeatAnimationValue(animValue: number, min = 1, max = 1) {
  return animValue * (max - min) + min;
}
