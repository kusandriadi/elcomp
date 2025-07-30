<script>
  import { onMount } from 'svelte';
  import ElRead from './training/read/ElRead.svelte';
  import ElMath from './training/math/ElMath.svelte';
  import LearnLetters from './training/read/components/LearnLetters.svelte';
  import LearnReading from './training/read/components/LearnReading.svelte';
  import TypingGame from './training/read/components/TypingGame.svelte';
  import HomeButton from './components/HomeButton.svelte';

  let currentPage = 'home';
  
  // Route configuration
  const routes = {
    'home': '/elcomp',
    'math': '/elcomp/math',
    'reading': '/elcomp/read',
    'read-letter': '/elcomp/read/letter',
    'read-word': '/elcomp/read/word',
    'read-typing': '/elcomp/read/typing',
    'logic': '/elcomp/logic'
  };

  // Function to get current page from URL
  function getPageFromURL() {
    const path = window.location.pathname;
    return Object.keys(routes).find(page => routes[page] === path) || 'home';
  }

  // Function to update URL and page
  function navigateTo(page) {
    currentPage = page;
    const path = routes[page] || routes.home;
    window.history.pushState({ page }, '', path);
  }

  // Function to handle browser back/forward buttons
  function handlePopState(event) {
    if (event.state && event.state.page) {
      currentPage = event.state.page;
    } else {
      currentPage = getPageFromURL();
    }
  }

  // Initialize routing on component mount
  onMount(() => {
    // Set initial page based on current URL
    currentPage = getPageFromURL();
    
    // Listen for browser back/forward button clicks
    window.addEventListener('popstate', handlePopState);
    
    // Set initial state
    window.history.replaceState({ page: currentPage }, '', window.location.pathname);
    
    // Cleanup listener on component destroy
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  });

  // Fungsi untuk memulai audio konteks dan navigasi
  async function startAndNavigate(page) {
    if (window.Tone && window.Tone.context.state !== 'running') {
      await window.Tone.start();
    }
    navigateTo(page);
  }
</script>

<svelte:head>
  {#if currentPage === 'math'}
    <title>🔢 Matematika - ElCompia</title>
  {:else if currentPage === 'reading'}
    <title>📚 Membaca & Menulis - ElCompia</title>
  {:else if currentPage === 'read-letter'}
    <title>📚 Mengenal Huruf - ElCompia</title>
  {:else if currentPage === 'read-word'}
    <title>📖 Belajar Membaca - ElCompia</title>
  {:else if currentPage === 'read-typing'}
    <title>⌨️ Game Mengetik - ElCompia</title>
  {:else if currentPage === 'logic'}
    <title>🧩 Logika - ElCompia</title>
  {:else}
    <title>🎮 ElCompia - Elementary Computational Thinking Platform</title>
  {/if}
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
    <HomeButton onClick={() => navigateTo('home')} />
    <ElRead />
  </div>

{:else if currentPage === 'math'}
  <div class="min-h-screen bg-pattern" style="background: var(--math-bg);">
    <HomeButton gradient="var(--success-gradient)" onClick={() => navigateTo('home')} />
    <ElMath />
  </div>

{:else if currentPage === 'logic'}
  <div class="flex items-center justify-center min-h-screen bg-pattern p-3 sm:p-4" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
    <HomeButton gradient="var(--purple-gradient)" onClick={() => navigateTo('home')} />
    
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

{:else if currentPage === 'read-letter'}
  <div class="min-h-screen bg-pattern" style="background: var(--reading-bg);">
    <HomeButton onClick={() => navigateTo('home')} />
    <div class="flex items-center justify-center min-h-screen p-3 sm:p-4">
      <LearnLetters on:switch={(e) => { if (e.detail.screen === 'setup') navigateTo('reading'); }} />
    </div>
  </div>

{:else if currentPage === 'read-word'}
  <div class="min-h-screen bg-pattern" style="background: var(--reading-bg);">
    <HomeButton onClick={() => navigateTo('home')} />
    <div class="flex items-center justify-center min-h-screen p-3 sm:p-4">
      <LearnReading on:switch={(e) => { if (e.detail.screen === 'setup') navigateTo('reading'); }} />
    </div>
  </div>

{:else if currentPage === 'read-typing'}
  <div class="min-h-screen bg-pattern" style="background: var(--reading-bg);">
    <HomeButton onClick={() => navigateTo('home')} />
    <div class="flex items-center justify-center min-h-screen p-3 sm:p-4">
      <TypingGame on:switch={(e) => { if (e.detail.screen === 'setup') navigateTo('reading'); }} />
    </div>
  </div>
{/if}