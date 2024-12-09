import React, { useState } from 'react';
import { Food } from '../config/foods';
import { X } from 'lucide-react';
import { isThemeColor, getThemeColor } from '../config/colors';
import { useThemeColor } from '../hooks/useThemeColor';

interface CustomFoodEntryProps {
  onAdd: (food: Food) => void;
  onClose: () => void;
  themeColor: string;
}

const CustomFoodEntry: React.FC<CustomFoodEntryProps> = ({ onAdd, onClose, themeColor }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [portion, setPortion] = useState('');
  const setThemeColor = useThemeColor(state => state.setColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && calories) {
      // Check if this is a special color command
      if (isThemeColor(name) && parseInt(calories) === 666) {
        setThemeColor(getThemeColor(name));
        onClose();
        return;
      }

      onAdd({
        name,
        calories: parseInt(calories),
        portion
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Ajouter un aliment
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nom de l'aliment
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-${themeColor}-500`}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calories
            </label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-${themeColor}-500`}
              min="1"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Portion (optionnel)
            </label>
            <input
              type="text"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-${themeColor}-500`}
            />
          </div>
          
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-${themeColor}-500 text-white rounded-lg hover:bg-${themeColor}-600 transition-colors`}
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomFoodEntry;