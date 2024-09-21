/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      boxShadow: {
        'fr-lg': '0 0 10px 1px rgba(0, 0, 0, 0.07)',
        'fr-xl': '0 0 20px 2px rgba(0, 0, 0, 0.1)',
        'fr-2xl': '0 0 30px 4px rgba(0, 0, 0, 0.2)'
      }
    },
  },
  plugins: [],
}

