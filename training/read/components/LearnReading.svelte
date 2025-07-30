<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { getReadingWords, initializeReadingGame, playSound } from '../../../backend/read/index.js';
    
    const dispatch = createEventDispatcher();

    let readingLevel = 'level1';
    let readingWords = {};
    let shuffledWords = {};
    let wordIndices = {};
    let currentWord = '';

    onMount(() => {
        readingWords = getReadingWords();
        const gameState = initializeReadingGame(readingWords, readingLevel);
        shuffledWords = gameState.shuffledWords;
        wordIndices = gameState.wordIndices;
        currentWord = gameState.currentWord;
    });

    function nextWord() {
        let currentIndex = wordIndices[readingLevel];
        currentIndex++;

        if (currentIndex >= shuffledWords[readingLevel].length) {
            currentIndex = 0;
            // Re-shuffle words for current level
            const words = [...readingWords[readingLevel]];
            for (let i = words.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [words[i], words[j]] = [words[j], words[i]];
            }
            shuffledWords[readingLevel] = words;
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

    <div class="relative bg-green-200 p-4 rounded-3xl mb-6 flex items-center justify-center" style="min-height: 150px;">
        <p class="text-5xl font-bold text-green-800 break-words px-4">{currentWord}</p>
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