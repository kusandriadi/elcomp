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
  <div class="flex items-center justify-center min-h-screen bg-pattern p-4" style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);">
    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-float"></div>
    <div class="absolute top-40 right-20 w-12 h-12 bg-pink-400 rounded-full opacity-30 animate-float" style="animation-delay: 1s;"></div>
    <div class="absolute bottom-32 left-1/4 w-8 h-8 bg-blue-400 rounded-full opacity-30 animate-float" style="animation-delay: 2s;"></div>
    <div class="absolute bottom-20 right-1/3 w-20 h-20 bg-green-400 rounded-full opacity-30 animate-float" style="animation-delay: 0.5s;"></div>
    
    <main class="w-full max-w-sm sm:max-w-xl card animate-bounce-in relative z-10">
      <!-- Fun Header with Emoji -->
      <div class="mb-8">
        <div class="text-6xl mb-4 animate-float">🎮</div>
        <h1 class="text-3xl sm:text-5xl font-bold mb-3 text-gray-800" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
          Selamat Datang di ElCompia!
        </h1>
        <p class="text-lg sm:text-xl text-gray-700 font-medium" style="font-family: 'Poppins', sans-serif;">
          Platform Berpikir Komputasi untuk Anak 🌟
        </p>
      </div>

      <!-- Menu Buttons with Fun Icons -->
      <div class="space-y-5 sm:space-y-6">
        <button on:click={() => startAndNavigate('reading')} class="btn-link w-full group">
          <div class="flex items-center justify-center gap-4">
            <div class="text-3xl group-hover:animate-bounce">📚</div>
            <span class="text-lg sm:text-2xl font-bold">Membaca & Menulis</span>
            <div class="text-2xl group-hover:animate-bounce" style="animation-delay: 0.1s;">✨</div>
          </div>
        </button>

        <button on:click={() => startAndNavigate('math')} class="btn-link w-full group" style="background: var(--success-gradient);">
          <div class="flex items-center justify-center gap-4">
            <div class="text-3xl group-hover:animate-bounce">🔢</div>
            <span class="text-lg sm:text-2xl font-bold">Matematika</span>
            <div class="text-2xl group-hover:animate-bounce" style="animation-delay: 0.1s;">🚀</div>
          </div>
        </button>

        <button on:click={() => startAndNavigate('logic')} class="btn-link w-full group" style="background: var(--purple-gradient);">
          <div class="flex items-center justify-center gap-4">
            <div class="text-3xl group-hover:animate-bounce">🧩</div>
            <span class="text-lg sm:text-2xl font-bold">Logika</span>
            <div class="text-2xl group-hover:animate-bounce" style="animation-delay: 0.1s;">💡</div>
          </div>
        </button>
      </div>

      <!-- Fun Footer -->
      <div class="mt-8 text-sm text-gray-600 font-medium">
        Mari belajar sambil bermain! 🎯
      </div>
    </main>
  </div>

{:else if currentPage === 'reading'}
  <div class="min-h-screen bg-pattern" style="background: var(--reading-bg);">
    <!-- Floating Home Button - Modern Design -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="text-white font-bold p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center animate-float"
              style="background: var(--primary-gradient); border: 3px solid rgba(255, 255, 255, 0.3);"
              title="🏠 Kembali ke Menu Utama"
      >
        <div class="text-2xl">🏠</div>
      </button>
    </div>
    <ElRead />
  </div>

{:else if currentPage === 'math'}
  <div class="min-h-screen bg-pattern" style="background: var(--math-bg);">
    <!-- Floating Home Button - Modern Design -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="text-white font-bold p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center animate-float"
              style="background: var(--success-gradient); border: 3px solid rgba(255, 255, 255, 0.3);"
              title="🏠 Kembali ke Menu Utama"
      >
        <div class="text-2xl">🏠</div>
      </button>
    </div>
    <ElMath />
  </div>

{:else if currentPage === 'logic'}
  <div class="flex items-center justify-center min-h-screen bg-pattern p-4" style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);">
    <!-- Floating Home Button - Modern Design -->
    <div class="fixed bottom-6 right-6 z-50">
      <button
              on:click={() => navigateTo('home')}
              class="text-white font-bold p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center animate-float"
              style="background: var(--purple-gradient); border: 3px solid rgba(255, 255, 255, 0.3);"
              title="🏠 Kembali ke Menu Utama"
      >
        <div class="text-2xl">🏠</div>
      </button>
    </div>
    
    <div class="card text-center animate-bounce-in">
      <div class="text-6xl mb-6 animate-float">🧩</div>
      <h2 class="text-3xl font-bold mb-4 text-gray-800" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
        Latihan Logika
      </h2>
      <p class="text-lg text-gray-700 mb-8 font-medium">
        Fitur seru ini sedang dikembangkan... 🚧✨
      </p>
      <div class="text-4xl animate-bounce">🔜</div>
    </div>
  </div>
{/if}