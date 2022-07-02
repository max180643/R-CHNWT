module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#ff571c',
        'main-hover': '#ed5019',
        'secondary': '#172e41'
      },
      boxShadow: {
        'input': '0 0 5px #ff571c',
      },
      keyframes: {
        toggleIn: {
          '0%': { opacity: 0, right: '-16rem' },
          '100%': { opacity: 1, right: '0px' }
        },
        toggleOut: {
          '0%': { opacity: 1, right: '0px' },
          '100%': { opacity: 0, right: '-16rem' }
        },
      },
      animation: {
        'toggleIn': 'toggleIn 0.3s cubic-bezier(0, 0, 0.2, 1)',
        'toggleOut': 'toggleOut 0.3s cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
