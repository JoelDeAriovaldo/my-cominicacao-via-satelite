/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'orbit': 'orbit 8s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'translateX(-50%) rotate(0deg) translateY(-16px)' },
          '100%': { transform: 'translateX(-50%) rotate(360deg) translateY(-16px)' },
        }
      }
    },
  },
  plugins: [],
}