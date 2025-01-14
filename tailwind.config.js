/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chalkboard: ['"Schoolbell"', 'cursive'],
      },
      colors: {
        chalk: '#ffffff', // Blanco para el texto
        board: {
          DEFAULT: '#2c3e50', // Fondo oscuro tipo pizarra
          dark: '#1a252f', // Bordes más oscuros
        },
      },
      animation: {
        typing: 'typing 3s steps(30, end), blink 0.5s step-end infinite',
      },
      keyframes: {
        typing: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
};

