export const THEME_COLORS = {
  default: 'blue',
  rouge: 'red',
  bleu: 'blue',
  vert: 'green',
  violet: 'purple',
  orange: 'orange',
  rose: 'pink',
  jaune: 'yellow',
  cyan: 'cyan',
  indigo: 'indigo',
  noir: 'neutral',
  blanc: 'slate'
} as const;

export type ThemeColor = keyof typeof THEME_COLORS;

export const isThemeColor = (name: string): boolean => {
  return Object.keys(THEME_COLORS).some(
    color => color.toLowerCase() === name.toLowerCase()
  );
};

export const getThemeColor = (name: string): string => {
  const color = Object.entries(THEME_COLORS).find(
    ([key]) => key.toLowerCase() === name.toLowerCase()
  );
  return color ? color[1] : THEME_COLORS.default;
};