<script>
    import MathGame from './components/MathGame.svelte';
    import TrainingScore from '../TrainingScore.svelte';

    let screen = 'setup'; // setup, game, score
    let operation = 'penjumlahan';
    let level = 'tk';
    let useTimer = true; // Pilihan untuk menggunakan timer

    let finalScore = 0;
    let totalQuestions = 10;

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

    const allOperations = [
        { value: 'penjumlahan', label: 'Penjumlahan (+)' },
        { value: 'pengurangan', label: 'Pengurangan (-)' },
        { value: 'perkalian', label: 'Perkalian (x)' },
        { value: 'pembagian', label: 'Pembagian (÷)' },
        { value: 'campuran', label: 'Campuran' }
    ];
    let availableOperations = [];

    $: {
        if (level === 'tk') availableOperations = allOperations.slice(0, 2);
        else if (level === '1') availableOperations = allOperations.slice(0, 3);
        else if (level === '2') availableOperations = allOperations.slice(0, 4);
        else availableOperations = allOperations.slice(0, 5);
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
                        <option value="tk">TK</option>
                        <option value="1">Kelas 1</option>
                        <option value="2">Kelas 2</option>
                        <option value="3">Kelas 3</option>
                        <option value="4">Kelas 4</option>
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