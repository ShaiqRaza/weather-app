/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  safelist: [
    
  ],
  theme: {
    extend: {},
    screens:{
      'xsss': '300px',
      'xss': '400px',
      'xs': '480px', // Custom breakpoint for xs
      'sm': '576px',
      'md': '770px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1430px',
      '3xl': '1600px',
      '4xl': '1800px',
      '5xl': '2000px',
  }
  },
  plugins: [],
}

