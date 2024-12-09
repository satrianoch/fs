import React from 'react';
import { ChevronRight } from 'lucide-react';
import { FOOD_CATEGORIES, type Food } from '../config/foods';

interface FoodSelectorProps {
  show: boolean;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSelectFood: (food: Food) => void;
  onClose: () => void;
  themeColor: string;
}

export const FoodSelector: React.FC<FoodSelectorProps> = ({
  show,
  selectedCategory,
  onSelectCategory,
  onSelectFood,
  onClose,
  themeColor
}) => {
  if (!show) return null;

  const formatFoodName = (food: Food) => {
    if (food.portion) {
      return `${food.name} (${food.portion})`;
    }
    return food.name;
  };

  if (!selectedCategory) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className={`text-sm text-${themeColor}-500 hover:text-${themeColor}-600 transition-colors`}
          >
            ← Annuler
          </button>
        </div>
        {FOOD_CATEGORIES.filter(category => category.name !== "Autre").map((category, index) => (
          <div
            key={index}
            onClick={() => onSelectCategory(category.name)}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors flex justify-between items-center"
          >
            <p className="text-gray-800 dark:text-white font-medium">
              {category.name}
            </p>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`mb-2 text-sm text-${themeColor}-500 hover:text-${themeColor}-600 transition-colors`}
      >
        ← Retour aux catégories
      </button>
      {FOOD_CATEGORIES.find(c => c.name === selectedCategory)?.foods.map((food, index) => (
        <div
          key={index}
          onClick={() => {
            onSelectFood(food);
            onSelectCategory(null);
          }}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
        >
          <p className="text-gray-800 dark:text-white font-medium">
            {formatFoodName(food)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {food.calories} kcal
          </p>
        </div>
      ))}
    </div>
  );
};