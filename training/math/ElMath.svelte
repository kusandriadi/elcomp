<script>
    import MathGame from './components/MathGame.svelte';
    import TrainingScore from '../TrainingScore.svelte';
    import { getOperationsForLevel } from '../../backend/math/index.js';
    import { GAME_CONSTANTS, MATH_LEVELS } from '../utils/constants.js';

    let screen = 'setup'; // setup, game, score
    let operation = 'penjumlahan';
    let level = 'tk';
    let useTimer = true; // Pilihan untuk menggunakan timer

    let finalScore = 0;
    let totalQuestions = GAME_CONSTANTS.TOTAL_QUESTIONS;

    function handleSwitch(event) {
        // PERUBAHAN: Logika untuk 'Main Lagi'
        if (event.detail.screen === 'game') {
            screen = 'game'; // Cukup set ke 'game' karena sudah di dalam Math
            return;
        }
        screen = event.detail.screen;
        if (event.detail.score !== undefined) {
            finalScore = event.detail.score;
        }
    }

    let availableOperations = [];

    $: {
        availableOperations = getOperationsForLevel(level);
        if (!availableOperations.find(op => op.value === operation)) {
            operation = availableOperations[0].value;
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen p-4 font-poppins">

    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Latihan Matematika</h1>
            <p class="text-base text-gray-600 mb-8">Pilih Tingkat dan Jenis Latihan yang kamu inginkan</p>

            <div class="space-y-5 mb-8 max-w-xs mx-auto text-left">
                <div>
                    <label for="level-select" class="block text-base font-bold text-gray-700 mb-2">Tingkat</label>
                    <select id="level-select" bind:value={level} class="form-select w-full">
                        {#each MATH_LEVELS as mathLevel}
                            <option value={mathLevel.value}>{mathLevel.label}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <label for="operation-select" class="block text-base font-bold text-gray-700 mb-2">Operasi</label>
                    <select id="operation-select" bind:value={operation} class="form-select w-full">
                        {#each availableOperations as op}
                            <option value={op.value}>{op.label}</option>
                        {/each}
                    </select>
                </div>
                <div class="flex items-center gap-3">
                    <input
                            type="checkbox"
                            id="timer-checkbox"
                            bind:checked={useTimer}
                            class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <label for="timer-checkbox" class="text-base font-bold text-gray-700 cursor-pointer">
                        Gunakan Timer
                    </label>
                </div>
            </div>

            <button on:click={() => screen = 'game'} class="btn-primary w-full max-w-xs mx-auto text-lg">Mulai Berlatih!</button>
        </div>

    {:else if screen === 'game'}
        <MathGame {level} {operation} {useTimer} on:switch={handleSwitch} />

    {:else if screen === 'score'}
        <TrainingScore score={finalScore} {totalQuestions} on:switch={handleSwitch} />
    {/if}

</div>