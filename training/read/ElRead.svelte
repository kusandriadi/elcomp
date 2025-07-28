<script>
    import { onMount } from 'svelte';

    // --- State Management ---
    let screen = 'setup'; // 'setup', 'learn', 'game', 'results'
    let currentMode = ''; // 'learn-letters', 'learn-reading', 'typing-game'
    let currentIndex = 0;
    let data = [];
    let gameQuestionCounter = 0;
    let gameCorrectAnswers = 0;
    let gameInputValue = '';
    let gameFeedback = '';
    let inputCorrect = false;
    let inputIncorrect = false;

    const GAME_MAX_QUESTIONS = 10;

    // --- Data ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(c => `${c}${c.toLowerCase()}`);
    const words = [
        'apel', 'ayam', 'air', 'awan', 'api', 'buku', 'bola', 'baju', 'bebek', 'bunga', 'cacing', 'cangkir', 'celana', 'cicak', 'cermin',
        'dasi', 'dadu', 'domba', 'duri', 'donat', 'ember', 'elang', 'es', 'ekor', 'emas', 'foto', 'fajar', 'film', 'fauna', 'feri',
        'gajah', 'garpu', 'gula', 'gigi', 'gunung', 'harimau', 'hujan', 'hati', 'hidung', 'hotel', 'ikan', 'ibu', 'istana', 'itik', 'ilmu',
        'jam', 'jari', 'jendela', 'jeruk', 'jerapah', 'kucing', 'kuda', 'kaki', 'kaca', 'kertas', 'lampu', 'lebah', 'lidah', 'layang', 'laut',
        'meja', 'mata', 'mobil', 'mulut', 'mangga', 'nanas', 'naga', 'nasi', 'nomor', 'net', 'obat', 'orang', 'otak', 'obeng', 'ombak',
        'pintu', 'pohon', 'pensil', 'pipi', 'piring', 'quran', 'raja', 'ratu', 'rumah', 'roti', 'rambut', 'susu', 'sepatu', 'sabun', 'sapi', 'sendok',
        'tangan', 'telinga', 'topi', 'tali', 'tomat', 'ular', 'ubi', 'unta', 'uang', 'udang', 'vas', 'video', 'vitamin', 'voli', 'wajah', 'waktu', 'wortel',
        'xilofon', 'yoyo', 'yoga', 'yak', 'zebra', 'zona', 'zero', 'zodiak', 'zakat'
    ];
    const letterPronunciations = {
        'A': 'a', 'B': 'be', 'C': 'ce', 'D': 'de', 'E': 'e', 'F': 'ef', 'G': 'ge',
        'H': 'ha', 'I': 'i', 'J': 'je', 'K': 'ka', 'L': 'el', 'M': 'em', 'N': 'en',
        'O': 'o', 'P': 'pe', 'Q': 'ki', 'R': 'er', 'S': 'es', 'T': 'te',
        'U': 'u', 'V': 'fe', 'W': 'we', 'X': 'eks', 'Y': 'ye', 'Z': 'zet'
    };

    // --- Audio ---
    let speechSynth;
    let utterance;
    let dingSynth;

    onMount(() => {
        if ('speechSynthesis' in window) {
            speechSynth = window.speechSynthesis;
            utterance = new SpeechSynthesisUtterance();
            utterance.lang = 'id-ID';
            utterance.rate = 0.9;
        }
    });

    async function initAudio() {
        if (typeof Tone !== 'undefined' && Tone.context.state !== 'running') {
            await Tone.start();
            dingSynth = new Tone.Synth().toDestination();
        }
    }

    function speak(text) {
        if (speechSynth && text) {
            utterance.text = text;
            speechSynth.speak(utterance);
        }
    }

    // --- Functions ---
    function shuffleArray(array) {
        return [...array].sort(() => 0.5 - Math.random());
    }

    function handleModeSelect(mode) {
        initAudio();
        currentMode = mode;
        currentIndex = 0;

        if (mode === 'learn-letters') {
            data = shuffleArray(letters);
        } else if (mode === 'learn-reading') {
            data = shuffleArray(words);
        } else if (mode === 'typing-game') {
            data = shuffleArray(words);
            gameQuestionCounter = 0;
            gameCorrectAnswers = 0;
            nextGameQuestion();
            screen = 'game';
            return;
        }
        screen = 'learn';
    }

    function nextItem() {
        if (currentIndex < data.length - 1) {
            currentIndex++;
        }
    }

    function prevItem() {
        if (currentIndex > 0) {
            currentIndex--;
        }
    }

    function handleSound() {
        if (currentMode === 'learn-reading') {
            speak(data[currentIndex]);
        } else if (currentMode === 'learn-letters') {
            const letterPair = data[currentIndex];
            const upperCaseLetter = letterPair.charAt(0);
            const pronunciation = letterPronunciations[upperCaseLetter];
            if (pronunciation) {
                speak(pronunciation);
            }
        }
    }

    function nextGameQuestion() {
        if (gameQuestionCounter >= GAME_MAX_QUESTIONS) {
            screen = 'results';
            return;
        }
        gameQuestionCounter++;
        gameInputValue = '';
        gameFeedback = '';
        inputCorrect = false;
        inputIncorrect = false;
    }

    function checkGameAnswer() {
        const userAnswer = gameInputValue.toLowerCase().trim();
        const correctAnswer = data[gameQuestionCounter - 1].toLowerCase();

        if (userAnswer === correctAnswer) {
            gameCorrectAnswers++;
            if (dingSynth) dingSynth.triggerAttackRelease("G5", "8n");
            gameFeedback = 'Benar! Hebat!';
            inputCorrect = true;
            setTimeout(nextGameQuestion, 1000);
        } else {
            gameFeedback = 'Coba lagi!';
            inputIncorrect = true;
        }
    }

    function resetGame() {
        screen = 'setup';
    }

    function clearFeedback() {
        inputIncorrect = false;
        gameFeedback = '';
    }

</script>

<svelte:head>
    <title>Ayo Belajar Membaca!</title>
    <!-- Path to Tone.js relative to the new folder structure -->
    <script src="../../asset/Tone.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex items-center justify-center min-h-screen p-4">

    {#if screen === 'setup'}
        <div class="card text-center w-full max-w-sm sm:max-w-md">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ayo Belajar Membaca!</h1>
            <p class="text-base text-gray-700 mb-8">Pilih latihan yang kamu suka di bawah ini.</p>
            <div class="space-y-4">
                <button on:click={() => handleModeSelect('learn-letters')} class="btn-primary w-full text-lg">Mengenal Huruf</button>
                <button on:click={() => handleModeSelect('learn-reading')} class="btn-primary w-full text-lg">Belajar Membaca</button>
                <button on:click={() => handleModeSelect('typing-game')} class="btn-primary w-full text-lg">Game Mengetik</button>
            </div>
            <!-- Path to index.html relative to the new folder structure -->
            <a href="../../backup/index.html" class="inline-block mt-8 text-sm font-semibold text-gray-700 hover:text-gray-900">← Kembali ke Menu Utama</a>
        </div>
    {/if}

    {#if screen === 'learn'}
        <div class="card card-lg text-center w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-8">
                {currentMode === 'learn-letters' ? 'Mengenal Huruf' : 'Belajar Membaca'}
            </h2>
            <div class="flex items-center justify-center space-x-4 mb-8">
                <div class="display-text">{data[currentIndex]}</div>
                <button on:click={handleSound} class="btn-sound">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                </button>
            </div>
            <div class="flex justify-between items-center">
                <button on:click={prevItem} disabled={currentIndex === 0} class="btn-secondary">← Sebelumnya</button>
                <span class="text-gray-600 font-semibold">{currentIndex + 1} / {data.length}</span>
                <button on:click={nextItem} disabled={currentIndex === data.length - 1} class="btn-secondary">Berikutnya →</button>
            </div>
            <button on:click={() => screen = 'setup'} class="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-800">← Kembali ke Menu</button>
        </div>
    {/if}

    {#if screen === 'game'}
        <div class="card card-lg text-center w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Game Mengetik</h2>
            <p class="text-gray-700 mb-8">Soal {gameQuestionCounter} / {GAME_MAX_QUESTIONS}</p>
            <div class="bg-gray-50 p-4 rounded-lg mb-6 min-h-[100px] flex items-center justify-center">
                <p class="game-word">{data[gameQuestionCounter - 1]}</p>
            </div>
            <div class="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 mb-6">
                <input type="text" bind:value={gameInputValue} on:input={clearFeedback} on:keydown={(e) => e.key === 'Enter' && checkGameAnswer()}
                       class="answer-input p-2"
                       class:correct={inputCorrect}
                       class:incorrect={inputIncorrect}
                       autofocus>
            </div>
            <p class="feedback-message font-semibold" class:text-green-600={inputCorrect} class:text-red-600={inputIncorrect}>{gameFeedback}</p>
            <button on:click={() => screen = 'setup'} class="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-800">← Kembali ke Menu</button>
        </div>
    {/if}

    {#if screen === 'results'}
        <div class="card text-center w-full max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Latihan Selesai!</h2>
            <p class="text-gray-700 mb-2">Skor Kamu:</p>
            <p class="text-6xl font-bold text-blue-600 mb-6">{gameCorrectAnswers * 10}</p>
            <p class="text-lg text-gray-700 mb-8">
                {#if gameCorrectAnswers * 10 >= 85}
                    Luar biasa! Kamu adalah pembaca dan penulis yang hebat!
                {:else if gameCorrectAnswers * 10 < 50}
                    Jangan menyerah! Setiap latihan membuatmu selangkah lebih maju.
                {:else}
                    Kerja bagus! Teruslah berlatih, kamu makin hebat setiap hari!
                {/if}
            </p>
            <button on:click={resetGame} class="btn-primary w-full">Coba Latihan Lain</button>
        </div>
    {/if}

</div>

<style>
    :global(body) {
        @apply font-['Poppins',_sans-serif] bg-sky-100;
    }
    .card {
        @apply bg-white rounded-2xl shadow-xl p-6 sm:p-8;
    }
    .btn-primary {
        @apply bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition hover:bg-blue-600 hover:-translate-y-0.5;
    }
    .btn-secondary {
        @apply bg-gray-200 text-gray-700 font-semibold py-3 px-5 rounded-xl transition hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base;
    }
    .btn-sound {
        @apply bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center transition hover:bg-orange-600 flex-shrink-0;
    }
    .display-text {
        @apply font-bold text-gray-800;
        /* UPDATED: Adjusted clamp for better mobile view */
        font-size: clamp(3.5rem, 22vw, 8rem);
    }
    .game-word {
        @apply font-bold text-gray-800;
        font-size: clamp(2.5rem, 15vw, 5rem);
    }
    .answer-input {
        @apply text-center rounded-xl border-2 border-gray-400 transition w-full max-w-xs;
        font-size: clamp(1.5rem, 7vw, 2.5rem);
    }
    .answer-input:focus {
        @apply outline-none border-blue-500 ring-4 ring-blue-500/20;
    }
    .correct {
        @apply bg-green-100 border-green-500 text-green-800;
    }
    .incorrect {
        @apply bg-red-100 border-red-500 text-red-800;
    }
    .feedback-message {
        @apply min-h-[1.5rem];
    }
</style>
