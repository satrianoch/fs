import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_COLORS } from '../config/colors';

interface ThemeColorState {
  color: string;
  savedColor: string;
  setColor: (color: string) => void;
}

export const useThemeColor = create<ThemeColorState>()(
  persist(
    (set) => ({
      color: THEME_COLORS.default,
      savedColor: THEME_COLORS.default,
      setColor: (color: string) => set((state) => ({
        color,
        savedColor: color === 'green' && state.color !== 'green' ? state.savedColor : color
      }))
    }),
    {
      name: 'theme-color-storage'
    }
  )
);