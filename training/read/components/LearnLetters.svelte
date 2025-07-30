<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { getLettersData, initializeLetterGame, playSound, getNextItem } from '../../../backend/read/index.js';
    import AudioButton from '../../components/AudioButton.svelte';
    
    const dispatch = createEventDispatcher();

    let letters = [];
    let shuffledLetters = [];
    let currentIndex = 0;
    let currentLetter = '';

    onMount(() => {
        letters = getLettersData();
        const gameState = initializeLetterGame(letters);
        shuffledLetters = gameState.shuffledLetters;
        currentIndex = gameState.currentIndex;
        currentLetter = gameState.currentLetter;
    });

    // Get next letter using backend service
    function changeLetter() {
        const nextItem = getNextItem(letters, shuffledLetters, currentIndex);
        currentLetter = nextItem.item;
        shuffledLetters = nextItem.newShuffledItems;
        currentIndex = nextItem.newIndex;
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }
</script>

<div class="card text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Mengenal Huruf</h2>

    <div class="relative bg-sky-200 w-64 h-48 mx-auto flex items-center justify-center rounded-3xl mb-6">
        <span class="text-8xl font-bold text-sky-800">{currentLetter.toUpperCase()}{currentLetter.toLowerCase()}</span>
        <AudioButton text={currentLetter} onClick={playSound} />
    </div>

    <div class="flex justify-center gap-4">
        <button on:click={changeLetter} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">←</button>
        <button on:click={changeLetter} class="bg-blue-500 text-white font-bold text-3xl w-24 h-16 rounded-2xl hover:bg-blue-600 transition shadow-md">→</button>
    </div>

    <button on:click={goBack} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold">Kembali</button>
</div>