/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.svelte", // Ini adalah cara paling bersih untuk memindai semua file Svelte
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}