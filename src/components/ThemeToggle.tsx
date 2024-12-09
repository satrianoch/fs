import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLongPress } from '../hooks/useLongPress';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  onLongPress: () => void;
  onLongPressEnd: () => void;
  themeColor: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  isDark, 
  onToggle, 
  onLongPress,
  onLongPressEnd,
  themeColor
}) => {
  const { handlers } = useLongPress({
    onLongPress,
    onLongPressEnd,
    ms: 1000
  });

  return (
    <button
      onClick={onToggle}
      {...handlers}
      className={`fixed top-4 right-4 p-2 rounded-full bg-gray-700 dark:bg-gray-800 text-${themeColor}-400 dark:text-${themeColor}-400 hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;