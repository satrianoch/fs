/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Progress bar colors
    {
      pattern: /bg-(red|blue|green|purple|orange|pink|yellow|cyan|indigo|neutral|slate)-(100|400|500|600|900)/,
    },
    // Text colors
    {
      pattern: /text-(red|blue|green|purple|orange|pink|yellow|cyan|indigo|neutral|slate)-(400|500|600)/,
    },
    // Border colors
    {
      pattern: /border-(red|blue|green|purple|orange|pink|yellow|cyan|indigo|neutral|slate)-(500|600)/,
    },
    // Ring colors
    {
      pattern: /ring-(red|blue|green|purple|orange|pink|yellow|cyan|indigo|neutral|slate)-500/,
    },
    // Hover colors
    {
      pattern: /hover:(bg|border|text)-(red|blue|green|purple|orange|pink|yellow|cyan|indigo|neutral|slate)-(500|600)/,
    },
    // Accent colors
    {
      pattern: /accent-(red|blue|green|purple|orange|pink|yellow|cyan|indigo|neutral|slate)-500/,
    }
  ]
};