import { Sprite, Texture } from 'pixi.js';

export type FoodItem = {
  alive: boolean;
  sprite: Sprite;
  beat: number;
};

export type CreateFoodItemProps = {
  beat: number;
  texture: Texture;
  size: number;
  x: number;
  y: number;
};

export type Food = Array<FoodItem>;
