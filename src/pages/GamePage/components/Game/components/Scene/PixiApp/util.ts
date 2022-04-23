import { Sprite } from 'pixi.js';
import { Food, FoodItem } from './types';

export const checkHit = (zone: Sprite, food: Food, worldHeight: number) => {
  for (const foodItem of food) {
    if (foodItem) {
      const hitFoodItem = checkFoodHit(foodItem, zone, worldHeight);
      if (hitFoodItem !== undefined) {
        return hitFoodItem;
      }
    }
  }

  return undefined;
};

export const checkFoodHit = (foodItem: FoodItem, zone: Sprite, worldHeight: number) => {
  const foodItemRect = foodItem.sprite.getBounds();
  const zoneRect = zone.getBounds();

  if (foodItemRect.bottom > zoneRect.top && foodItemRect.top < worldHeight) {
    return foodItem;
  }
};
