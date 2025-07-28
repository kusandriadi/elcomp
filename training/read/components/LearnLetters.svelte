<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let currentLetter = letters[Math.floor(Math.random() * letters.length)];

    function playSound(text) {
        if (!text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
        utterance.lang = 'id-ID';
        window.speechSynthesis.speak(utterance);
    }

    function changeLetter() {
        let newLetter = currentLetter;
        while (newLetter === currentLetter) {
            newLetter = letters[Math.floor(Math.random() * letters.length)];
        }
        currentLetter = newLetter;
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }
</script>

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

    <button on:click={goBack} class="mt-8 text-gray-600 hover:text-gray-800 font-semibold">Kembali</button>
</div>