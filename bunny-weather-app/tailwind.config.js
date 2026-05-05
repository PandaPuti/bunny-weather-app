// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        sway: 'sway 3s ease-in-out infinite',
      }
    },
  },
}