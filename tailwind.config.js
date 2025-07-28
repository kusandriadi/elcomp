/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.svelte", // Secara spesifik menunjuk ke App.svelte di root
    "./training/**/*.svelte" // Memindai semua file .svelte di dalam folder training
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