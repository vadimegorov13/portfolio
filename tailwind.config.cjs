/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '480px',
      smd: '670px',
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
        secondary: '#6366f1',
        border: '#606060',
      },
      animation: {
        text: 'text 2s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
    fontFamily: {
      fira: ['Fira Code'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
