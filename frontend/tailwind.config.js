/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4FD1C5',
          DEFAULT: '#319795',
          dark: '#2C7A7B',
        },
        secondary: {
          light: '#9F7AEA',
          DEFAULT: '#805AD5',
          dark: '#6B46C1',
        },
        background: '#F7FAFC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        hover: '0 10px 15px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: []
}

