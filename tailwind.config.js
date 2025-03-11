/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00C2C2',
        secondary: '#01292D',
        background: '#FFFFFF',
        text: {
          primary: '#01292D',
          secondary: '#667085',
        }
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    }
  },
  plugins: [],
} 