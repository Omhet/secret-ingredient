import { Position } from '@app-types/game';
import { Food, FoodItem } from './types';

export const checkHit = (zonePosition: Position, food: Food) => {
  for (const foodItem of food) {
    if (foodItem) {
      const hitFoodItem = checkFoodHit(foodItem, zonePosition);
      if (hitFoodItem !== undefined) {
        return hitFoodItem;
      }
    }
  }

  return undefined;
};

const HIT_PERCENT_BOTTOM = 0;
const HIT_PERCENT_TOP = 0;
export const checkFoodHit = (foodItem: FoodItem, zonePosition: Position) => {
  const size = foodItem.sprite.height;
  const diff = Math.sqrt(
    Math.pow(zonePosition.x - foodItem.sprite.x, 2) + Math.pow(zonePosition.y - foodItem.sprite.y, 2)
  );

  const percent = (diff / size) * 100;
  if (percent >= HIT_PERCENT_BOTTOM && percent <= 100 - HIT_PERCENT_TOP) {
    return foodItem;
  }
};
