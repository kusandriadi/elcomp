<script>
    import { onMount } from 'svelte';

    let screen = 'setup'; // 'setup', 'learn-letters', 'learn-reading', 'typing-game'
    let currentMode = '';

    // State untuk "Mengenal Huruf"
    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let currentLetter = 'a';
    let synth;

    // State untuk "Belajar Membaca"
    let readingLevel = 'level1';
    let readingWords = {
        level1: ["ba", "bi", "bu", "be", "bo", "ca", "ci", "cu", "ce", "co", "da", "di", "du", "de", "do"],
        level2: ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"],
        level3: ["sekolah", "bermain", "belajar", "membaca", "menulis", "berhitung", "selamat pagi", "terima kasih"]
    };
    let currentWord = '';
    let readingFeedback = '';

    // State untuk "Game Mengetik"
    let typingWord = '';
    let userInput = '';
    let typingScore = 0;
    let typingTimer = 10;
    let typingInterval;
    let isTypingCorrect = null;

    onMount(() => {
        // Inisialisasi Tone.js synth jika belum ada
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
    });

    function playSound(text) {
        if (synth && text) {
            // Menggunakan speech synthesis jika Tone.js tidak bisa mengucapkan kata
            if (text.length > 1) {
                const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
                utterance.lang = 'id-ID';
                window.speechSynthesis.speak(utterance);
            } else {
                // Untuk satu huruf, Tone.js bisa digunakan
                synth.triggerAttackRelease(text.toUpperCase() + '4', '8n');
            }
        }
    }

    function changeLetter(dir) {
        let currentIndex = letters.indexOf(currentLetter);
        let newIndex = currentIndex + dir;
        if (newIndex < 0) newIndex = letters.length - 1;
        if (newIndex >= letters.length) newIndex = 0;
        currentLetter = letters[newIndex];
        playSound(currentLetter);
    }

    function startReading() {
        nextWord();
        readingFeedback = '';
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
        const words = readingWords.level2; // Menggunakan level 2 untuk mengetik
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
        clearInterval(typingInterval);
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
            <div on:click={() => playSound(currentLetter)} class="bg-sky-200 w-48 h-48 mx-auto flex items-center justify-center rounded-3xl cursor-pointer mb-6">
                <span class="text-8xl font-bold text-sky-800">{currentLetter.toUpperCase()}</span>
            </div>
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
                   placeholder="Ketik di sini...">
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