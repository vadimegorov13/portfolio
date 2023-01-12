/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: '#282C33',
        primary: '#F74080',
        border: '#606060',
      },
    },
    fontFamily: {
      fira: ['Fira Code'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
