import React, { useState, useEffect } from 'react';
import { evaluateExpression } from '../utils/calculator';

interface ExerciseInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  points: number;
  unit: string;
}

const ExerciseInput: React.FC<ExerciseInputProps> = ({
  label,
  value,
  onChange,
  points,
  unit
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Ne met à jour l'input que si la valeur n'est pas 0 et que l'input est vide
    if (value === 0) {
      setInputValue('');
    } else if (!inputValue && value > 0) {
      setInputValue(value.toString());
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue.trim() === '') {
      onChange(0);
      return;
    }

    const calculatedValue = evaluateExpression(newValue);
    onChange(calculatedValue);
  };

  const calculatedPoints = Math.floor(value * points);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <label className="text-gray-600 dark:text-gray-300 font-medium">{label}</label>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {calculatedPoints > 0 ? `${calculatedPoints} points` : ''}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors text-gray-800 dark:text-white"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{unit}</span>
      </div>
    </div>
  );
};

export default ExerciseInput;