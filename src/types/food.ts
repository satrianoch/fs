import { Food } from '../config/foods';

export interface FoodItem {
  food: Food;
  fraction: number;
  quantity: number;
}