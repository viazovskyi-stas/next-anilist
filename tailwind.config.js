/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        secondary: '#ccc',
        primary: '#1976d2',
        grey: '#757575'
      }
    }
  },
  plugins: []
};
