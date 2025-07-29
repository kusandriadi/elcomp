<script>
  import ElRead from './training/read/ElRead.svelte';
  import ElMath from './training/math/ElMath.svelte';

  let currentPage = 'home';
  // 'home', 'reading', 'math', 'logic'

  function navigateTo(page) {
    currentPage = page;
  }

  // Fungsi untuk memulai audio konteks dan navigasi
  async function startAndNavigate(page) {
    if (window.Tone && window.Tone.context.state !== 'running') {
      await window.Tone.start();
    }
    navigateTo(page);
  }
</script>

<svelte:head>
  <title>ElCompia - Elementary Computational Thinking Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

{#if currentPage === 'home'}
  <div class="flex items-center justify-center min-h-screen bg-sky-100 p-4 font-poppins">
    <main class="w-full max-w-sm sm:max-w-xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center">
      <h1 class="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Welcome to ElCompia!</h1>
      <p class="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10">Elementary Computational Thinking Platform.</p>

      <div class="space-y-4 sm:space-y-6">
        <button on:click={() => startAndNavigate('reading')} class="btn-link bg-blue-500 hover:bg-blue-600 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span class="text-base sm:text-xl">Membaca & Menulis</span>
        </button>

        <button on:click={() => startAndNavigate('math')} class="btn-link bg-green-600 hover:bg-green-700 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20V4"></path>
            <path d="M4 12h16"></path>
          </svg>
          <span class="text-base sm:text-xl">Matematika</span>
        </button>

        <button on:click={() => startAndNavigate('logic')} class="btn-link bg-purple-600 hover:bg-purple-700 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
            <path d="M12 2a7 7 0 0 0-7 7c0 3.04 1.63 5.5 4 6.58V20h6v-4.42c2.37-1.08 4-3.54 4-6.58a7 7 0 0 0-7-7Z"></path>
          </svg>
          <span class="text-base sm:text-xl">Logika</span>
        </button>
      </div>
    </main>
  </div>

{:else if currentPage === 'reading'}
  <div class="min-h-screen bg-sky-100">
    <!-- Floating Home Button - Bottom Right (Thumb Zone) -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
              title="Kembali ke Menu Utama"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
    </div>
    <ElRead />
  </div>

{:else if currentPage === 'math'}
  <div class="min-h-screen bg-sky-100">
    <!-- Floating Home Button - Bottom Right (Thumb Zone) -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
              title="Kembali ke Menu Utama"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
    </div>
    <ElMath />
  </div>

{:else if currentPage === 'logic'}
  <div class="flex items-center justify-center min-h-screen bg-sky-100 p-4 font-poppins">
    <!-- Floating Home Button - Bottom Right (Thumb Zone) -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
              title="Kembali ke Menu Utama"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
    </div>
    <div class="card text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Latihan Logika</h2>
      <p class="text-gray-600 mb-6">Fitur ini sedang dikembangkan...</p>
    </div>
  </div>
{/if}