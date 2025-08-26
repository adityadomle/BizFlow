/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontfamily:{  poppins: ['Poppins', 'sans-serif'],},
    },
  },
  plugins: [],
}
