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
  <title>🎮 ElCompia - Elementary Computational Thinking Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

{#if currentPage === 'home'}
  <div class="flex items-center justify-center min-h-screen bg-pattern p-3 sm:p-4" style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);">
    <!-- Subtle Background Elements - No Animation -->
    <div class="absolute top-20 left-5 sm:left-10 w-8 sm:w-12 h-8 sm:h-12 bg-yellow-400 rounded-full opacity-20"></div>
    <div class="absolute top-32 right-5 sm:right-20 w-6 sm:w-10 h-6 sm:h-10 bg-pink-400 rounded-full opacity-20"></div>
    <div class="absolute bottom-32 left-1/4 w-4 sm:w-6 h-4 sm:h-6 bg-blue-400 rounded-full opacity-20"></div>
    <div class="absolute bottom-20 right-1/3 w-10 sm:w-16 h-10 sm:h-16 bg-green-400 rounded-full opacity-20"></div>
    
    <main class="w-full max-w-sm sm:max-w-md md:max-w-lg card animate-fade-in relative z-10">
      <!-- Header -->
      <div class="mb-6 sm:mb-8">
        <div class="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎮</div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-800" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
          Selamat Datang di ElCompia!
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-gray-700 font-medium" style="font-family: 'Poppins', sans-serif;">
          Platform Berpikir Komputasi untuk Anak 🌟
        </p>
      </div>

      <!-- Menu Buttons - Mobile Optimized -->
      <div class="space-y-3 sm:space-y-4 md:space-y-5">
        <button on:click={() => startAndNavigate('reading')} class="btn-link w-full">
          <div class="flex items-center justify-center gap-3 sm:gap-4">
            <div class="text-2xl sm:text-3xl">📚</div>
            <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Membaca & Menulis</span>
            <div class="text-xl sm:text-2xl">✨</div>
          </div>
        </button>

        <button on:click={() => startAndNavigate('math')} class="btn-link w-full" style="background: var(--success-gradient);">
          <div class="flex items-center justify-center gap-3 sm:gap-4">
            <div class="text-2xl sm:text-3xl">🔢</div>
            <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Matematika</span>
            <div class="text-xl sm:text-2xl">🚀</div>
          </div>
        </button>

        <button on:click={() => startAndNavigate('logic')} class="btn-link w-full" style="background: var(--purple-gradient);">
          <div class="flex items-center justify-center gap-3 sm:gap-4">
            <div class="text-2xl sm:text-3xl">🧩</div>
            <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Logika</span>
            <div class="text-xl sm:text-2xl">💡</div>
          </div>
        </button>
      </div>

      <!-- Footer -->
      <div class="mt-6 sm:mt-8 text-xs sm:text-sm md:text-base text-gray-600 font-medium">
        Mari belajar sambil bermain! 🎯
      </div>
    </main>
  </div>

{:else if currentPage === 'reading'}
  <div class="min-h-screen bg-pattern" style="background: var(--reading-bg);">
    <!-- Home Button - Mobile Optimized -->
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="text-white font-bold p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl flex items-center justify-center"
              style="background: var(--primary-gradient); border: 2px solid rgba(255, 255, 255, 0.3); min-width: 3rem; min-height: 3rem;"
              title="🏠 Kembali ke Menu Utama"
      >
        <div class="text-xl sm:text-2xl">🏠</div>
      </button>
    </div>
    <ElRead />
  </div>

{:else if currentPage === 'math'}
  <div class="min-h-screen bg-pattern" style="background: var(--math-bg);">
    <!-- Home Button - Mobile Optimized -->
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="text-white font-bold p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl flex items-center justify-center"
              style="background: var(--success-gradient); border: 2px solid rgba(255, 255, 255, 0.3); min-width: 3rem; min-height: 3rem;"
              title="🏠 Kembali ke Menu Utama"
      >
        <div class="text-xl sm:text-2xl">🏠</div>
      </button>
    </div>
    <ElMath />
  </div>

{:else if currentPage === 'logic'}
  <div class="flex items-center justify-center min-h-screen bg-pattern p-3 sm:p-4" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
    <!-- Home Button - Mobile Optimized -->
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="text-white font-bold p-3 sm:p-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl flex items-center justify-center"
              style="background: var(--purple-gradient); border: 2px solid rgba(255, 255, 255, 0.3); min-width: 3rem; min-height: 3rem;"
              title="🏠 Kembali ke Menu Utama"
      >
        <div class="text-xl sm:text-2xl">🏠</div>
      </button>
    </div>
    
    <div class="card text-center animate-fade-in">
      <div class="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🧩</div>
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-800" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
        Latihan Logika
      </h2>
      <p class="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 font-medium">
        Fitur seru ini sedang dikembangkan... 🚧✨
      </p>
      <div class="text-2xl sm:text-3xl md:text-4xl animate-gentle-pulse">🔜</div>
    </div>
  </div>
{/if}