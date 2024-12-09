import { useState, useEffect } from 'react';
import { FoodItem } from '../types/food';
import { Food } from '../config/foods';

const STORAGE_KEY = 'fitScore_selectedFoods';

export const useSelectedFoods = () => {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    const savedFoods = localStorage.getItem(STORAGE_KEY);
    if (savedFoods) {
      setSelectedFoods(JSON.parse(savedFoods));
    }
  }, []);

  const saveSelectedFoods = (foods: FoodItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
    setSelectedFoods(foods);
  };

  const addFoodItem = (foodToAdd: { food: Food, fraction: number }) => {
    const existingIndex = selectedFoods.findIndex(item => 
      item.food.name === foodToAdd.food.name && 
      item.fraction === 1
    );

    if (existingIndex >= 0 && selectedFoods[existingIndex].fraction === 1) {
      const newFoods = [...selectedFoods];
      newFoods[existingIndex] = {
        ...newFoods[existingIndex],
        quantity: newFoods[existingIndex].quantity + 1
      };
      saveSelectedFoods(newFoods);
    } else {
      const newFoodItem: FoodItem = {
        ...foodToAdd,
        quantity: 1
      };
      saveSelectedFoods([...selectedFoods, newFoodItem]);
    }
  };

  const removeFoodItem = (index: number) => {
    const newFoods = [...selectedFoods];
    const item = newFoods[index];
    
    if (item.quantity > 1) {
      // If there are multiple items, decrease quantity by 1
      newFoods[index] = {
        ...item,
        quantity: item.quantity - 1,
        fraction: 1 // Reset to whole number when decreasing quantity
      };
    } else {
      // If only one item remains, remove it completely
      newFoods.splice(index, 1);
    }
    
    saveSelectedFoods(newFoods);
  };

  const updateFoodFraction = (index: number, fraction: number) => {
    const newFoods = [...selectedFoods];
    newFoods[index] = {
      ...newFoods[index],
      fraction: fraction
    };
    saveSelectedFoods(newFoods);
  };

  const resetFoods = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSelectedFoods([]);
  };

  return {
    selectedFoods,
    addFoodItem,
    removeFoodItem,
    updateFoodFraction,
    resetFoods
  };
};