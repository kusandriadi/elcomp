<script>
    import LearnLetters from './components/LearnLetters.svelte';
    import LearnReading from './components/LearnReading.svelte';
    import TypingGame from './components/TypingGame.svelte';
    import TrainingScore from '../TrainingScore.svelte';
    import { readingNavigation } from '../utils/navigation.js';
    import { GAME_CONSTANTS } from '../utils/constants.js';

    let screen = 'setup';
    let finalScore = 0;
    const totalQuestions = GAME_CONSTANTS.TOTAL_QUESTIONS;

    function handleSwitch(event) {
        // PERUBAHAN: Logika untuk 'Main Lagi'
        if (event.detail.screen === 'game') {
            screen = 'typing-game';
            return;
        }
        screen = event.detail.screen;
        if (event.detail.score !== undefined) {
            finalScore = event.detail.score;
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen p-4 font-poppins">
    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ayo Belajar Membaca!</h1>
            <p class="text-base text-gray-600 mb-8">Pilih latihan yang kamu suka di bawah ini.</p>
            <div class="space-y-4">
                <button on:click={readingNavigation.toLetter} class="btn-primary w-full text-lg">
                    📚 Mengenal Huruf
                </button>
                <button on:click={readingNavigation.toWord} class="btn-primary w-full text-lg">
                    📖 Belajar Membaca
                </button>
                <button on:click={readingNavigation.toTyping} class="btn-primary w-full text-lg">
                    ⌨️ Game Mengetik
                </button>
            </div>
        </div>
    {/if}

    {#if screen === 'learn-letters'}
        <LearnLetters on:switch={handleSwitch} />
    {/if}

    {#if screen === 'learn-reading'}
        <LearnReading on:switch={handleSwitch} />
    {/if}

    {#if screen === 'typing-game'}
        <TypingGame on:switch={handleSwitch} />
    {/if}

    {#if screen === 'training-score'}
        <TrainingScore score={finalScore} {totalQuestions} on:switch={handleSwitch} />
    {/if}
</div>