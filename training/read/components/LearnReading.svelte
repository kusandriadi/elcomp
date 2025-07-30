<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { getReadingWords, initializeReadingGame, playSound, shuffle } from '../../../backend/read/index.js';
    import AudioButton from '../../components/AudioButton.svelte';
    import { READING_LEVELS } from '../../utils/constants.js';
    
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
            // Re-shuffle words for current level using backend utility
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
        {#each READING_LEVELS as level}
            <option value={level.value}>{level.label}</option>
        {/each}
    </select>

    <div class="relative bg-green-200 p-4 rounded-3xl mb-6 flex items-center justify-center" style="min-height: 150px;">
        <p class="text-5xl font-bold text-green-800 break-words px-4">{currentWord}</p>
        <AudioButton text={currentWord} onClick={playSound} />
    </div>

    <div class="flex justify-center gap-4">
        <button on:click={nextWord} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">←</button>
        <button on:click={nextWord} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">→</button>
    </div>

    <button on:click={goBack} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold block w-full">Kembali</button>
</div>