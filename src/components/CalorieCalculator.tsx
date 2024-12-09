import React, { useState } from 'react';
import { Pizza, Plus, X } from 'lucide-react';
import { FOOD_CATEGORIES, type Food } from '../config/foods';
import { FRACTIONS } from '../config/fractions';
import { FoodSelector } from './FoodSelector';
import { useSelectedFoods } from '../hooks/useSelectedFoods';
import { CALORIE_CONFIG } from '../config/calories';
import { useLongPress } from '../hooks/useLongPress';
import CustomFoodEntry from './CustomFoodEntry';
import { useThemeColor } from '../hooks/useThemeColor';

const CalorieCalculator: React.FC = () => {
  const { selectedFoods, addFoodItem, removeFoodItem, updateFoodFraction, resetFoods } = useSelectedFoods();
  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [showCustomEntry, setShowCustomEntry] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const themeColor = useThemeColor(state => state.color);

  const { handlers } = useLongPress({
    onLongPress: () => setShowCustomEntry(true),
    ms: 1000
  });

  const calculateCalories = (food: Food, fraction: number, quantity: number): number => {
    return Math.ceil(food.calories * (fraction + (quantity - 1)));
  };

  const formatQuantityAndFraction = (quantity: number, fraction: number): string => {
    if (quantity === 1) {
      if (fraction === 1) return '1';
      const fractionLabel = FRACTIONS.find(f => Math.abs(f.value - fraction) < 0.01)?.label || '';
      return fractionLabel;
    } else {
      if (fraction === 1) return quantity.toString();
      const fractionLabel = FRACTIONS.find(f => Math.abs(f.value - fraction) < 0.01)?.label || '';
      return `${quantity - 1} ${fractionLabel}`;
    }
  };

  const formatFoodName = (food: Food) => {
    return food.portion ? `${food.name} (${food.portion})` : food.name;
  };

  const handleAddFood = (food: Food) => {
    addFoodItem({ food, fraction: 1 });
    setSelectedCategory(null);
    setShowFoodSelector(false);
  };

  const calculateTotalCalories = (): number => {
    return selectedFoods.reduce((total, item) => {
      return total + calculateCalories(item.food, item.fraction, item.quantity);
    }, 0);
  };

  const handleReset = () => {
    resetFoods();
    setShowFoodSelector(false);
    setSelectedCategory(null);
  };

  const handleQuickAdd = (item: { food: Food, fraction: number }) => {
    addFoodItem(item);
  };

  const totalCalories = calculateTotalCalories();
  const isOverGoal = totalCalories > CALORIE_CONFIG.dailyGoal;
  const remainingCalories = Math.max(0, CALORIE_CONFIG.dailyGoal - totalCalories);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center select-none">
        <Pizza className={`w-6 h-6 mr-2 text-${themeColor}-500 dark:text-${themeColor}-400`} />
        Votre Alimentation
      </h2>

      <div className="space-y-4">
        {selectedFoods.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-800 dark:text-white font-medium">
                  {formatFoodName(item.food)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {calculateCalories(item.food, item.fraction, item.quantity)} kcal
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickAdd(item)}
                  className={`p-1 text-gray-500 hover:text-${themeColor}-500 transition-colors`}
                  title="Ajouter"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeFoodItem(index)}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  title="Supprimer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max={FRACTIONS.length - 1}
                value={FRACTIONS.findIndex(f => Math.abs(f.value - item.fraction) < 0.01)}
                onChange={(e) => updateFoodFraction(index, FRACTIONS[parseInt(e.target.value)].value)}
                className={`flex-1 accent-${themeColor}-500`}
                step="1"
              />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[40px] text-center">
                {formatQuantityAndFraction(item.quantity, item.fraction)}
              </span>
            </div>
          </div>
        ))}

        <FoodSelector
          show={showFoodSelector}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectFood={handleAddFood}
          onClose={() => setShowFoodSelector(false)}
          themeColor={themeColor}
        />

        {showCustomEntry && (
          <CustomFoodEntry
            onAdd={handleAddFood}
            onClose={() => setShowCustomEntry(false)}
            themeColor={themeColor}
          />
        )}

        {!showFoodSelector && (
          <button
            {...handlers}
            onClick={() => setShowFoodSelector(true)}
            className={`w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-${themeColor}-500 hover:text-${themeColor}-500 transition-colors flex items-center justify-center gap-2`}
          >
            <Plus className="w-5 h-5" />
            Ajouter un aliment
          </button>
        )}

        {selectedFoods.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className={`text-lg font-medium ${isOverGoal ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  Total : {totalCalories} kcal
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Reste : {remainingCalories} kcal
                </div>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;