<script>
  import ElRead from './training/read/ElRead.svelte';
  import ElMath from './training/math/ElMath.svelte';

  let currentPage = 'home'; // 'home', 'reading', 'math'

  function navigateTo(page) {
    currentPage = page;
  }
</script>

<svelte:head>
  <title>Arena Cerdas - Belajar Membaca, Matematika, dan Logika</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

{#if currentPage === 'home'}
  <div class="flex items-center justify-center min-h-screen bg-sky-100 p-4 font-poppins">
    <main class="w-full max-w-sm sm:max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center">
      <h1 class="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Selamat Datang di Arena Cerdas!</h1>
      <p class="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10">Tempat seru untuk belajar membaca, matematika, dan berpikir logis.</p>

      <div class="space-y-4 sm:space-y-6">
        <!-- Tautan ke Aplikasi Membaca -->
        <button on:click={() => navigateTo('reading')} class="btn-link bg-blue-500 hover:bg-blue-600 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span class="text-base sm:text-xl">Belajar Membaca & Menulis</span>
        </button>

        <!-- Tautan ke Aplikasi Matematika -->
        <button on:click={() => navigateTo('math')} class="btn-link bg-green-600 hover:bg-green-700 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20V4"></path>
            <path d="M4 12h16"></path>
            <path d="m18 8-8 8"></path>
            <path d="m18 16-8-8"></path>
          </svg>
          <span class="text-base sm:text-xl">Matematika & Logika</span>
        </button>
      </div>
    </main>
  </div>

{:else if currentPage === 'reading'}
  <div class="min-h-screen bg-sky-100">
    <!-- Back button -->
    <div class="p-4">
      <button on:click={() => navigateTo('home')} class="text-blue-600 hover:text-blue-800 font-semibold">
        ← Kembali ke Menu Utama
      </button>
    </div>
    <ElRead />
  </div>

{:else if currentPage === 'math'}
  <div class="min-h-screen bg-sky-100">
    <!-- Back button -->
    <div class="p-4">
      <button on:click={() => navigateTo('home')} class="text-blue-600 hover:text-blue-800 font-semibold">
        ← Kembali ke Menu Utama
      </button>
    </div>
    <ElMath />
  </div>
{/if}