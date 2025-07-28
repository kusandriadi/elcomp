<script>
  // Tidak ada logika JavaScript yang dibutuhkan untuk halaman statis ini.
</script>

<svelte:head>
  <!-- Menambahkan elemen ke <head> dokumen HTML -->
  <title>Arena Cerdas - Belajar Membaca, Matematika, dan Logika</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex items-center justify-center min-h-screen bg-sky-100 p-4 font-poppins">
  <main class="w-full max-w-sm sm:max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center">
    <h1 class="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Selamat Datang di Arena Cerdas!</h1>
    <p class="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10">Tempat seru untuk belajar membaca, matematika, dan berpikir logis.</p>

    <div class="space-y-4 sm:space-y-6">
      <!-- Tautan ke Aplikasi Membaca -->
      <a href="elread.html" class="btn-link bg-blue-500 hover:bg-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <span class="text-base sm:text-xl">Belajar Membaca & Menulis</span>
      </a>

      <!-- Tautan ke Aplikasi Matematika -->
      <a href="elmath.html" class="btn-link bg-green-600 hover:bg-green-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20V4"></path>
          <path d="M4 12h16"></path>
          <path d="m18 8-8 8"></path>
          <path d="m18 16-8-8"></path>
        </svg>
        <span class="text-base sm:text-xl">Matematika & Logika</span>
      </a>
    </div>
  </main>
</div>

<style>
  /* Styling ini memerlukan setup Tailwind CSS di proyek Svelte Anda.
     Anda bisa meletakkannya di file CSS global seperti app.css */
  :global(body) {
    font-family: 'Poppins', sans-serif;
  }

  .btn-link {
    @apply flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md;
  }
  .btn-link:hover {
    @apply -translate-y-1 shadow-lg;
  }
</style>
