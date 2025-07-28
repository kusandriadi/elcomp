<script>
    import { onMount, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let readingLevel = 'level1';
    let readingWords = {
        level1: ["ba", "bi", "bu", "be", "bo", "ca", "ci", "cu", "ce", "co", "da", "di", "du", "de", "do"],
        level2: ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"],
        level3: ["sekolah", "bermain", "belajar", "membaca", "menulis", "berhitung", "selamat pagi", "terima kasih"]
    };

    let shuffledWords = {};
    let wordIndices = {};
    let currentWord = '';

    // Fungsi untuk mengocok array (Fisher-Yates shuffle)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Menginisialisasi semua daftar kata yang sudah diacak
    onMount(() => {
        for (const level in readingWords) {
            shuffledWords[level] = shuffle([...readingWords[level]]);
            wordIndices[level] = 0;
        }
        currentWord = shuffledWords[readingLevel][0];
    });

    function playSound(text) {
        if (!text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
        utterance.lang = 'id-ID';
        window.speechSynthesis.speak(utterance);
    }

    // PERUBAHAN: Logika sekarang mengambil kata dari daftar yang sudah diacak
    function nextWord() {
        let currentIndex = wordIndices[readingLevel];
        currentIndex++;

        // Jika sudah sampai akhir, kocok lagi dan mulai dari awal
        if (currentIndex >= shuffledWords[readingLevel].length) {
            currentIndex = 0;
            shuffledWords[readingLevel] = shuffle([...readingWords[readingLevel]]);
        }

        wordIndices[readingLevel] = currentIndex;
        currentWord = shuffledWords[readingLevel][currentIndex];
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }
</script>

<div class="card text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Belajar Membaca</h2>
    <select bind:value={readingLevel} on:change={nextWord} class="form-select mb-6 w-full max-w-xs mx-auto">
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

    <button on:click={goBack} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold block w-full">Kembali</button>
</div>