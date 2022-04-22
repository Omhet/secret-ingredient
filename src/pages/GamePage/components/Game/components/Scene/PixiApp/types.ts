import { Sprite, Texture } from 'pixi.js';

export type FoodItem = {
  sprite: Sprite;
  beat: number;
  vx: number;
  vy: number;
};

export type CreateFoodItemProps = {
  texture: Texture;
  size: number;
  x: number;
  y: number;
};

export type Food = Array<FoodItem>;
