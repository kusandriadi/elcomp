<script>
    import { onMount, onDestroy } from 'svelte';

    let screen = 'setup'; // 'setup', 'learn-letters', 'learn-reading', 'typing-game'
    let currentMode = '';

    // State untuk "Mengenal Huruf"
    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let currentLetter = 'a';

    // State untuk "Belajar Membaca"
    let readingLevel = 'level1';
    let readingWords = {
        level1: ["ba", "bi", "bu", "be", "bo", "ca", "ci", "cu", "ce", "co", "da", "di", "du", "de", "do"],
        level2: ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"],
        level3: ["sekolah", "bermain", "belajar", "membaca", "menulis", "berhitung", "selamat pagi", "terima kasih"]
    };
    let currentWord = '';

    // State untuk "Game Mengetik"
    let typingWord = '';
    let userInput = '';
    let typingScore = 0;
    let typingTimer = 10;
    let typingInterval;
    let isTypingCorrect = null;

    onMount(() => {
        // Hentikan suara apa pun yang mungkin masih berjalan saat komponen dimuat
        window.speechSynthesis.cancel();
    });

    onDestroy(() => {
        clearInterval(typingInterval);
        // Hentikan suara saat meninggalkan halaman
        window.speechSynthesis.cancel();
    });

    // PERBAIKAN: Fungsi ini sekarang selalu menggunakan SpeechSynthesis
    function playSound(text) {
        if (!text) return;

        // Selalu batalkan suara yang sedang berjalan
        window.speechSynthesis.cancel();

        // Gunakan Speech Synthesis untuk semua teks, baik huruf maupun kata
        const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
        utterance.lang = 'id-ID'; // Set bahasa ke Indonesia
        window.speechSynthesis.speak(utterance);
    }

    function changeLetter(dir) {
        let currentIndex = letters.indexOf(currentLetter);
        let newIndex = currentIndex + dir;
        if (newIndex < 0) newIndex = letters.length - 1;
        if (newIndex >= letters.length) newIndex = 0;
        currentLetter = letters[newIndex];
    }

    function startReading() {
        nextWord();
    }

    function nextWord() {
        const words = readingWords[readingLevel];
        currentWord = words[Math.floor(Math.random() * words.length)];
        playSound(currentWord);
    }

    function startTypingGame() {
        typingScore = 0;
        isTypingCorrect = null;
        userInput = '';
        nextTypingWord();
        startGameTimer();
    }

    function nextTypingWord() {
        const words = readingWords.level2;
        typingWord = words[Math.floor(Math.random() * words.length)];
    }

    function checkTyping() {
        if (userInput.toLowerCase() === typingWord.toLowerCase()) {
            typingScore++;
            isTypingCorrect = true;
            playSound('Benar');
            setTimeout(() => {
                userInput = '';
                nextTypingWord();
                isTypingCorrect = null;
            }, 500);
        } else {
            isTypingCorrect = false;
        }
    }

    function startGameTimer() {
        typingTimer = 10;
        clearInterval(typingInterval);
        typingInterval = setInterval(() => {
            typingTimer--;
            if (typingTimer <= 0) {
                clearInterval(typingInterval);
                screen = 'typing-score';
            }
        }, 1000);
    }

    function startMode(mode) {
        currentMode = mode;
        screen = mode;
        if (mode === 'learn-reading') {
            startReading();
        } else if (mode === 'typing-game') {
            startTypingGame();
        } else if (mode === 'learn-letters') {
            currentLetter = 'a';
        }
    }

    function backToSetup() {
        screen = 'setup';
        currentMode = '';
    }

</script>

<svelte:head>
    <title>Ayo Belajar Membaca!</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen p-4 font-poppins">
    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ayo Belajar Membaca!</h1>
            <p class="text-base text-gray-600 mb-8">Pilih latihan yang kamu suka di bawah ini.</p>
            <div class="space-y-4">
                <button on:click={() => startMode('learn-letters')} class="btn-primary w-full text-lg">
                    📚 Mengenal Huruf
                </button>
                <button on:click={() => startMode('learn-reading')} class="btn-primary w-full text-lg">
                    📖 Belajar Membaca
                </button>
                <button on:click={() => startMode('typing-game')} class="btn-primary w-full text-lg">
                    ⌨️ Game Mengetik
                </button>
            </div>
        </div>

    {:else if screen === 'learn-letters'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Mengenal Huruf</h2>

            <div class="bg-sky-200 w-64 h-48 mx-auto flex items-center justify-center rounded-3xl mb-4">
                <span class="text-8xl font-bold text-sky-800">{currentLetter.toUpperCase()}{currentLetter.toLowerCase()}</span>
            </div>

            <button on:click={() => playSound(currentLetter)} class="bg-green-500 text-white w-20 h-20 rounded-full hover:bg-green-600 transition shadow-md flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
            </button>

            <div class="flex justify-center gap-4">
                <button on:click={() => changeLetter(-1)} class="bg-blue-500 text-white font-bold text-3xl w-16 h-16 rounded-full hover:bg-blue-600 transition shadow-md">←</button>
                <button on:click={() => changeLetter(1)} class="bg-blue-500 text-white font-bold text-3xl w-16 h-16 rounded-full hover:bg-blue-600 transition shadow-md">→</button>
            </div>
            <button on:click={backToSetup} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold">Kembali</button>
        </div>

    {:else if screen === 'learn-reading'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Belajar Membaca</h2>
            <select bind:value={readingLevel} on:change={startReading} class="form-select mb-6 w-full max-w-xs mx-auto">
                <option value="level1">Level 1: Suku Kata</option>
                <option value="level2">Level 2: Kata Pendek</option>
                <option value="level3">Level 3: Kalimat</option>
            </select>
            <div on:click={() => playSound(currentWord)} class="bg-green-200 p-8 rounded-3xl cursor-pointer mb-6">
                <p class="text-5xl font-bold text-green-800">{currentWord}</p>
            </div>
            <button on:click={nextWord} class="btn-primary">Kata Berikutnya →</button>
            <button on:click={backToSetup} class="mt-6 text-gray-600 hover:text-gray-800 font-semibold block w-full">Kembali</button>
        </div>

    {:else if screen === 'typing-game'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Game Mengetik</h2>
            <p class="text-gray-600 mb-4">Waktu: <span class="font-bold">{typingTimer}</span> | Skor: <span class="font-bold text-green-600">{typingScore}</span></p>
            <p class="question-display mb-4">{typingWord}</p>
            <input type="text" bind:value={userInput} on:input={checkTyping}
                   class="input-field mb-4"
                   class:input-correct={isTypingCorrect === true}
                   class:input-incorrect={isTypingCorrect === false}
                   placeholder="Ketik di sini..."
                   autocomplete="off">
            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold mt-4">Keluar dari Game</button>
        </div>

    {:else if screen === 'typing-score'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Waktu Habis!</h2>
            <p class="text-lg text-gray-700 mb-6">Skor akhir kamu adalah:</p>
            <p class="text-6xl font-bold text-green-600 mb-8">{typingScore}</p>
            <button on:click={() => startMode('typing-game')} class="btn-primary mb-4">Main Lagi</button>
            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold">Kembali ke Menu</button>
        </div>

    {/if}
</div>