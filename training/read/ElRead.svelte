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
    let typingTimer = 20; // PERUBAHAN: Countdown diubah menjadi 20 detik
    let typingInterval;
    let isTypingCorrect = null;
    let synth;

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
        window.speechSynthesis.cancel();
    });

    onDestroy(() => {
        if (synth) {
            synth.dispose();
        }
        clearInterval(typingInterval);
        window.speechSynthesis.cancel();
    });

    function playSound(text) {
        if (!text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
        utterance.lang = 'id-ID';
        window.speechSynthesis.speak(utterance);
    }

    function playTone(note) {
        if (synth) {
            const now = window.Tone.now();
            if (note === 'correct') {
                synth.triggerAttackRelease('C5', '16n', now);
            } else if (note === 'incorrect') {
                synth.triggerAttackRelease('G#2', '16n', now);
            } else if (note === 'finished') {
                synth.triggerAttackRelease('C4', '8n', now);
                synth.triggerAttackRelease('E4', '8n', now + 0.1);
                synth.triggerAttackRelease('G4', '8n', now + 0.2);
                synth.triggerAttackRelease('C5', '8n', now + 0.3);
            }
        }
    }

    function changeLetter() {
        let newLetter = currentLetter;
        while (newLetter === currentLetter) {
            newLetter = letters[Math.floor(Math.random() * letters.length)];
        }
        currentLetter = newLetter;
    }

    function nextWord() {
        const words = readingWords[readingLevel];
        let newWord = currentWord;
        while (newWord === currentWord) {
            newWord = words[Math.floor(Math.random() * words.length)];
        }
        currentWord = newWord;
    }

    function onLevelChange() {
        nextWord();
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
        // PERBAIKAN: Logika pengecekan diperbaiki untuk mencegah nada ganda
        if (userInput.toLowerCase() === typingWord.toLowerCase()) {
            isTypingCorrect = true;
            playTone('correct');
            typingScore++;
            setTimeout(() => {
                userInput = '';
                nextTypingWord();
                isTypingCorrect = null;
            }, 300);
        } else {
            isTypingCorrect = false;
            if (userInput.length === typingWord.length) {
                playTone('incorrect');
            }
        }
    }

    function startGameTimer() {
        typingTimer = 20; // PERUBAHAN: Countdown diubah menjadi 20 detik
        clearInterval(typingInterval);
        typingInterval = setInterval(() => {
            typingTimer--;
            if (typingTimer <= 0) {
                clearInterval(typingInterval);
                screen = 'typing-score';
                playTone('finished');
                setTimeout(() => {
                    playSound(getMotivationalMessage());
                }, 500);
            }
        }, 1000);
    }

    function getMotivationalMessage() {
        const messages = [
            `Hebat, kamu dapat ${typingScore} poin! Terus berlatih ya!`,
            `Luar biasa! Skor kamu ${typingScore}. Coba lagi yuk!`,
            `Keren! Kamu berhasil mengumpulkan ${typingScore} poin. Semangat!`,
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function startMode(mode) {
        currentMode = mode;
        screen = mode;
        if (mode === 'learn-reading') {
            nextWord();
        } else if (mode === 'typing-game') {
            startTypingGame();
        } else if (mode === 'learn-letters') {
            changeLetter();
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

            <div class="relative bg-sky-200 w-64 h-48 mx-auto flex items-center justify-center rounded-3xl mb-6">
                <span class="text-8xl font-bold text-sky-800">{currentLetter.toUpperCase()}{currentLetter.toLowerCase()}</span>

                <button on:click={() => playSound(currentLetter)} class="absolute bottom-3 right-3 bg-green-500 text-white w-14 h-14 rounded-full hover:bg-green-600 transition shadow-md flex items-center justify-center transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                </button>
            </div>

            <div class="flex justify-center gap-4">
                <button on:click={changeLetter} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">←</button>
                <button on:click={changeLetter} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">→</button>
            </div>

            <button on:click={backToSetup} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold">Kembali</button>
        </div>

    {:else if screen === 'learn-reading'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Belajar Membaca</h2>
            <select bind:value={readingLevel} on:change={onLevelChange} class="form-select mb-6 w-full max-w-xs mx-auto">
                <option value="level1">Level 1: Suku Kata</option>
                <option value="level2">Level 2: Kata Pendek</option>
                <option value="level3">Level 3: Kalimat</option>
            </select>

            <div class="relative bg-green-200 p-8 rounded-3xl mb-6">
                <p class="text-5xl font-bold text-green-800">{currentWord}</p>
                <button on:click={() => playSound(currentWord)} class="absolute bottom-3 right-3 bg-green-500 text-white w-14 h-14 rounded-full hover:bg-green-600 transition shadow-md flex items-center justify-center transform hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                </button>
            </div>

            <div class="flex justify-center gap-4">
                <button on:click={nextWord} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">←</button>
                <button on:click={nextWord} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">→</button>
            </div>

            <button on:click={backToSetup} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold block w-full">Kembali</button>
        </div>

    {:else if screen === 'typing-game'}
        <div class="card text-center">
            <div class="flex justify-between items-center mb-6">
                <div class="timer-container">
                    {#each {length: 20} as _, i}
                        <div class="timer-dot" class:active={i < typingTimer} class:inactive={i >= typingTimer}></div>
                    {/each}
                </div>
                <div class="text-lg">Skor: <span class="font-bold text-green-600">{typingScore}</span></div>
            </div>

            <p class="question-display mb-4">{typingWord}</p>
            <input type="text" bind:value={userInput} on:input={checkTyping}
                   class="input-field mb-4"
                   class:input-correct={isTypingCorrect === true}
                   class:input-incorrect={isTypingCorrect === false}
                   placeholder="Ketik di sini..."
                   autocomplete="off">
            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold mt-4">Kembali</button>
        </div>

    {:else if screen === 'typing-score'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Permainan Selesai!</h2>
            <p class="text-lg text-gray-700 mb-6">Skor akhir kamu adalah:</p>
            <p class="text-6xl font-bold text-green-600 mb-8">{typingScore}</p>
            <button on:click={() => startMode('typing-game')} class="btn-primary mb-4">Main Lagi</button>
            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold mt-4">Kembali</button>
        </div>

    {/if}
</div>