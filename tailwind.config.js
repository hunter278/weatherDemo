/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      spacing: {
        '10px': '10px',
      },
      padding: {
        '30px': '30px',
        '20px': '20px',
      },
      margin: {
        '45%': '45%',
      },
      outline: {
        none: '0', 
      },
      width:{
        110:'34rem'
      }
    },
  },
  variants: {
    outline: ['focus'], 
  },
  plugins: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
}

