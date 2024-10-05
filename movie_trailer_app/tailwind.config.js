module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Make sure to include the correct paths to your files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1B263B',
        },
        secondary: {
          dark: '#2C3E50',
        },
        accent: {
          red: '#E74C3C',
          cyan: '#00A8E8',
        },
        highlight: {
          yellow: '#F1C40F',
          orange: '#F39C12',
        },
        text: {
          light: '#ECF0F1',
          white: '#FFFFFF',
        },
        background: {
          dark: '#0D1117',
          slate: '#34495E',
        },
      },
    },
  },
  plugins: [],
};
