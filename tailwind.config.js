/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{svelte,js,ts}", // Memindai file di root
    "./**/*.{svelte,js,ts}" // Memindai file di semua subdirektori
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