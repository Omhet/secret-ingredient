/* eslint-disable @typescript-eslint/ban-ts-comment */
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { decreaseBlastCount, decreaseNoteCount, increaseHitCount } from '@store/game';
import { Application, ParticleContainer, Sprite, Texture } from 'pixi.js';
import { createNotRepeatingRandomArrayItemFn, getRandomAngle, getRandomArrayItem } from '../../../utils';
import KeyboardManager from './input/KeyboardManager';
import MouseManager from './input/MouseManager';
import { createParticlesEmitter } from './particles/particleEmitter';
import { CreateFoodItemProps, Food, FoodItem } from './types';
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

  const foodTextures = images.food.map((img) => {
    return Texture.from(img);
  });
  let food: Food = [];

  const { zone, table } = createZone();

  const particlesContainer = new ParticleContainer();
  const particlesEmitter = createParticlesEmitter(
    particlesContainer,
    images.particles.map((img) => img.src)
  );
  particlesEmitter.autoUpdate = true;
  particlesContainer.position.set(300, 300);
  app.stage.addChild(particlesContainer);

  levelDataManager.playLevelMusic();

  function removeFoodItem(foodItem: FoodItem) {
    app.stage.removeChild(foodItem.sprite);
    food = food.filter((item) => item.beat !== foodItem.beat);
    decreaseNoteCount();
  }

  // Tap
  function handleTap() {
    particlesEmitter.emit = true;
    particlesEmitter.resetPositionTracking();

    const foodItem = checkHit(zone, food, app.screen.height);
    if (foodItem) {
      removeFoodItem(foodItem);
      increaseHitCount();
    }

    decreaseBlastCount();
  }

  keyboardManager.on('pressed', handleTap);
  mouseManager.on('down', handleTap);

  // Game Loop
  app.ticker.add(gameLoop);

  const minZoneScale = 3;
  const maxZoneScale = 3.06;
  const minFoodScale = 0.18;
  const maxFoodScale = 0.21;

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

    table.scale.set(getScaledBeatAnimationValue(beatAnimationValue, minZoneScale, maxZoneScale));
    zone.scale.set(getScaledBeatAnimationValue(beatAnimationValue, minZoneScale, maxZoneScale));

    // Move food
    const foodDist = (beatSize * bps) / app.ticker.FPS;
    for (let i = 0; i < food.length; i++) {
      const foodItem = food[i];
      foodItem.sprite.x += foodDist * foodItem.vx;
      foodItem.sprite.y += foodDist * foodItem.vy;

      foodItem.sprite.scale.set(getScaledBeatAnimationValue(beatAnimationValue, minFoodScale, maxFoodScale));

      foodItem.sprite.angle += elapsed / 20000;

      if (foodItem.sprite.y > app.screen.height) {
        removeFoodItem(foodItem);
      }
    }
  }

  function createZone() {
    const zoneImg = levelDataManager.getCurrentLevelData().images.zone;
    zoneImg.width /= 5;
    zoneImg.height /= 6;
    const tableImg = levelDataManager.getCurrentLevelData().images.table;
    tableImg.width /= 6;
    tableImg.height /= 6;

    const zone = Sprite.from(zoneImg);
    zone.anchor.set(0.5, 1);
    const table = Sprite.from(tableImg);
    table.anchor.set(0.5, 1);

    const x = app.screen.width / 2;
    const y = app.screen.height + zoneImg.height * 0.2;

    zone.position.x = x;
    zone.position.y = y;
    table.position.x = x;
    table.position.y = y;

    app.stage.addChild(zone);
    app.stage.addChild(table);

    return { zone, table };
  }

  const zoneRect = zone.getBounds();
  const zoneWidth = zoneRect.width;
  const zoneHeight = zoneRect.height;
  const getRandomTargetX = createNotRepeatingRandomArrayItemFn([
    zoneRect.left + zoneWidth * 0.2,
    zoneRect.left + zoneWidth * 0.45,
    zoneRect.left + zoneWidth * 0.8,
  ]);
  const targetY = zoneRect.top + zoneHeight * 0.1;

  function spawnFood(beat: number) {
    const angle = getRandomAngle() * (Math.PI / 180);
    const dist = beatSize * 8;

    const targetX = getRandomTargetX();

    const x = dist * Math.cos(angle) + targetX;
    const y = dist * Math.sin(angle) + targetY;

    const dx = targetX - x;
    const dy = targetY - y;
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

  return {
    mouseManager,
    keyboardManager,
  };
};

function createFoodSprite({ texture, size, x, y }: CreateFoodItemProps) {
  const sprite = Sprite.from(texture);
  sprite.anchor.set(0.5);
  sprite.x = x;
  sprite.y = y;
  sprite.width = size;
  sprite.height = size;
  sprite.angle = Math.random() * 360;

  return sprite;
}

function getBeatAnimationValue(elapsed: number, bps: number) {
  return Math.abs(Math.sin((elapsed / 1000) * (Math.PI / 2) * bps));
}

function getScaledBeatAnimationValue(animValue: number, min = 1, max = 1) {
  return animValue * (max - min) + min;
}
