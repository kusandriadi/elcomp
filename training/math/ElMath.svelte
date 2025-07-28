<script>
    import { onMount, onDestroy } from 'svelte';

    let screen = 'setup'; // 'setup', 'game', 'score'
    let operation = 'penjumlahan';
    let level = 'tk';
    let score = 0;
    let timer = 30;
    let countdown;
    let question = { a: 0, b: 0, answer: 0, symbol: '+' };
    let userAnswer = '';
    let isCorrect = null;
    let synth;

    const allOperations = [
        { value: 'penjumlahan', label: 'Penjumlahan (+)' },
        { value: 'pengurangan', label: 'Pengurangan (-)' },
        { value: 'perkalian', label: 'Perkalian (x)' },
        { value: 'pembagian', label: 'Pembagian (÷)' },
        { value: 'campuran', label: 'Operasi Campuran Acak' }
    ];
    let availableOperations = [];

    $: {
        if (level === 'tk') {
            availableOperations = allOperations.slice(0, 2);
        } else if (level === '1') {
            availableOperations = allOperations.slice(0, 3);
        } else if (level === '2') {
            availableOperations = allOperations.slice(0, 4);
        } else {
            availableOperations = allOperations.slice(0, 5);
        }
        if (!availableOperations.find(op => op.value === operation)) {
            operation = availableOperations[0].value;
        }
    }

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
    });

    onDestroy(() => {
        if (synth) {
            synth.dispose();
        }
        clearInterval(countdown);
    });

    function playTone(note) {
        if (synth) {
            synth.triggerAttackRelease(note, '16n');
        }
    }

    function generateQuestion() {
        let a, b, answer, symbol;

        let maxNum, maxMult, maxDiv;
        switch (level) {
            case 'tk': maxNum = 10; maxMult = 3; maxDiv = 3; break;
            case '1': maxNum = 20; maxMult = 5; maxDiv = 5; break;
            case '2': maxNum = 50; maxMult = 10; maxDiv = 10; break;
            case '3': maxNum = 100; maxMult = 12; maxDiv = 12; break;
            case '4': maxNum = 200; maxMult = 15; maxDiv = 15; break;
        }

        let currentOp = operation;
        if (currentOp === 'campuran') {
            const availableOps = availableOperations.slice(0, 4).map(op => op.value);
            currentOp = availableOps[Math.floor(Math.random() * availableOps.length)];
        }

        switch (currentOp) {
            case 'pengurangan':
                a = Math.floor(Math.random() * maxNum) + 1;
                b = Math.floor(Math.random() * a);
                answer = a - b;
                symbol = '−';
                break;
            case 'perkalian':
                a = Math.floor(Math.random() * maxMult) + 1;
                b = Math.floor(Math.random() * maxMult) + (level === 'tk' ? 0 : 1);
                answer = a * b;
                symbol = '×';
                break;
            case 'pembagian':
                b = Math.floor(Math.random() * (maxDiv - 1)) + 2;
                let tempAnswer = Math.floor(Math.random() * maxDiv) + 1;
                a = b * tempAnswer;
                answer = tempAnswer;
                symbol = '÷';
                break;
            default: // Penjumlahan
                a = Math.floor(Math.random() * maxNum) + 1;
                b = Math.floor(Math.random() * maxNum) + 1;
                answer = a + b;
                symbol = '+';
                break;
        }
        question = { a, b, answer, symbol };
    }

    function checkAnswer() {
        if (parseInt(userAnswer) === question.answer) {
            score++;
            isCorrect = true;
            playTone('C5');
            setTimeout(() => {
                userAnswer = '';
                isCorrect = null;
                generateQuestion();
            }, 300);
        } else {
            isCorrect = false;
        }
    }

    function startTimer() {
        timer = 30;
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            if (timer <= 0) {
                clearInterval(countdown);
                screen = 'score';
            }
        }, 1000);
    }

    function startGame() {
        score = 0;
        userAnswer = '';
        isCorrect = null;
        generateQuestion();
        startTimer();
        screen = 'game';
    }

    function backToSetup() {
        screen = 'setup';
        clearInterval(countdown);
    }

</script>

<div class="flex items-center justify-center min-h-screen p-4 font-poppins">

    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Latihan Matematika</h1>
            <p class="text-base text-gray-600 mb-8">Pilih jenis latihan dan tingkat kesulitan.</p>

            <div class="space-y-5 mb-8 max-w-xs mx-auto text-left">
                <div>
                    <label for="level-select" class="block text-base font-bold text-gray-700 mb-2">Tingkat</label>
                    <select id="level-select" bind:value={level} class="form-select w-full">
                        <option value="tk">TK (Angka 1-10)</option>
                        <option value="1">Kelas 1 (Angka 1-20)</option>
                        <option value="2">Kelas 2 (Angka 1-50)</option>
                        <option value="3">Kelas 3 (Angka 1-100)</option>
                        <option value="4">Kelas 4 (Angka 1-200)</option>
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
            </div>

            <button on:click={startGame} class="btn-primary w-full max-w-xs mx-auto text-lg">Mulai Berlatih!</button>
        </div>

    {:else if screen === 'game'}
        <div class="card text-center">
            <div class="flex justify-between items-center mb-6">
                <div class="text-lg">Skor: <span class="font-bold text-green-600">{score}</span></div>
                <div class="text-lg">Waktu: <span class="font-bold text-red-500">{timer}</span></div>
            </div>

            <div class="question-display">
                {question.a} {question.symbol} {question.b} = ?
            </div>

            <form on:submit|preventDefault={() => {}}>
                <input type="number" bind:value={userAnswer} on:input={checkAnswer}
                       class="input-field mb-4"
                       class:input-correct={isCorrect === true}
                       class:input-incorrect={isCorrect === false}
                       placeholder="Jawabanmu"
                       autocomplete="off">
            </form>

            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold mt-4">Berhenti Berlatih</button>
        </div>

    {:else if screen === 'score'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Waktu Habis!</h2>
            <p class="text-lg text-gray-700 mb-6">Skor akhir kamu:</p>
            <p class="text-6xl font-bold text-green-600 mb-8">{score}</p>
            <button on:click={startGame} class="btn-primary mb-4">Coba Lagi</button>
            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold">Kembali ke Menu</button>
        </div>
    {/if}

</div>