<script>
    import { onMount } from 'svelte';

    // --- DOM Elements ---
    // In Svelte, we bind directly to variables, so we don't need to query the DOM as much.

    // --- Game State & Config ---
    let screen = 'setup'; // 'setup', 'game', 'results', 'multiplicationTable', 'divisionTable'
    let currentGrade = 'tk';
    let currentOperation = 'addition';
    let correctAnswer = 0;
    let synth;
    let questionCounter = 0;
    let correctAnswersCounter = 0;
    let timerInterval;
    const MAX_QUESTIONS = 10;
    let answerInputValue = '';
    let feedbackMessage = '';
    let inputCorrect = false;
    let inputIncorrect = false;
    let levelInfoText = '';
    let questionText = '';

    const settings = {
        'tk': { max: 10, ops: ['addition', 'subtraction'] },
        '1': { max: 20, multMax: 2, ops: ['addition', 'subtraction', 'story_problem', 'pattern_recognition'] },
        '2': { max: 50, multMax: 5, ops: ['addition', 'subtraction', 'multiplication', 'division', 'mixed', 'complex_mixed', 'story_problem', 'pattern_recognition'] },
        '3': { max: 100, multMax: 10, ops: ['addition', 'subtraction', 'multiplication', 'division', 'mixed', 'complex_mixed', 'story_problem', 'pattern_recognition'] },
        '4': { max: 250, multMax: 12, ops: ['addition', 'subtraction', 'multiplication', 'division', 'mixed', 'complex_mixed', 'story_problem', 'pattern_recognition'] }
    };

    const operationLabels = {
        addition: 'Penambahan (+)',
        subtraction: 'Pengurangan (-)',
        multiplication: 'Perkalian (×)',
        division: 'Pembagian (÷)',
        mixed: 'Semua Operasi Hitungan',
        complex_mixed: 'Operasi Campuran',
        story_problem: 'Soal Cerita',
        pattern_recognition: 'Pengenalan Pola'
    };

    let availableOps = settings[currentGrade].ops;

    // --- Utility ---
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pickRandom = (arr) => arr[getRandomInt(0, arr.length - 1)];

    // --- Audio Initialization ---
    async function initAudio() {
        if (typeof Tone !== 'undefined' && Tone.context.state !== 'running') {
            await Tone.start();
            synth = new Tone.Synth().toDestination();
        }
    }

    // --- Timer Logic ---
    let timerDots = [];
    function startTimer() {
        clearInterval(timerInterval);
        timerDots = [];
        if (currentGrade === 'tk') return;

        const timeLimit = 25;
        timerDots = Array(timeLimit).fill(true);

        timerInterval = setInterval(() => {
            const lastTrueIndex = timerDots.lastIndexOf(true);
            if (lastTrueIndex !== -1) {
                timerDots[lastTrueIndex] = false;
            } else {
                clearInterval(timerInterval);
                generateQuestion();
            }
        }, 1000);
    }

    // --- Question Banks ---
    const storyProblemBank = [
        (grade) => {
            if (grade > 2) return null;
            const names = ["Adi", "Bela", "Ciko", "Dina"];
            const items = ["apel", "buku", "permen", "stiker"];
            const num1 = getRandomInt(grade, grade * 4);
            const num2 = getRandomInt(grade, grade * 3);
            return {
                question: `${pickRandom(names)} punya ${num1} ${pickRandom(items)}. Ia diberi lagi ${num2} oleh ibunya. Berapa jumlahnya sekarang?`,
                answer: num1 + num2
            };
        },
        (grade) => {
            if (grade < 3) return null;
            const num1 = getRandomInt(10, 20);
            const num2 = getRandomInt(5, 15);
            const num3 = getRandomInt(2, 10);
            return {
                question: `Di toko ada ${num1} kotak pensil. Datang lagi ${num2} kotak. Jika ${num3} kotak laku, berapa sisa kotak pensil?`,
                answer: (num1 + num2) - num3
            };
        }
    ];

    const patternBank = [
        (grade) => { // Penambahan
            const start = getRandomInt(1, grade * 3);
            const step = getRandomInt(1, grade + 2);
            const sequence = [start, start + step, start + (step * 2)];
            return {
                question: `Lanjutkan pola: ${sequence.join(', ')}, ...?`,
                answer: start + (step * 3)
            };
        },
        (grade) => { // Pengurangan
            const step = getRandomInt(1, grade + 2);
            const start = getRandomInt(step * 4, grade * 5 + step * 4);
            const sequence = [start, start - step, start - (step * 2)];
            return {
                question: `Lanjutkan pola: ${sequence.join(', ')}, ...?`,
                answer: start - (step * 3)
            };
        },
        (grade) => { // Perkalian
            if (grade < 2) return null;
            const base = getRandomInt(2, grade + 1);
            const sequence = [base, base * 2, base * 3];
            return {
                question: `Lanjutkan pola: ${sequence.join(', ')}, ...?`,
                answer: base * 4
            };
        }
    ];

    // --- Core Game Logic ---
    function generateQuestion() {
        clearInterval(timerInterval);
        if (questionCounter >= MAX_QUESTIONS) {
            screen = 'results';
            return;
        }
        questionCounter++;

        answerInputValue = '';
        inputCorrect = false;
        inputIncorrect = false;
        feedbackMessage = '';

        const level = settings[currentGrade];
        let operation = currentOperation;
        if (operation === 'mixed') {
            const availableOps = level.ops.filter(op => !['mixed', 'complex_mixed', 'story_problem', 'pattern_recognition'].includes(op));
            operation = pickRandom(availableOps);
        }

        let questionData;
        switch (operation) {
            case 'pattern_recognition':
                const availablePatterns = patternBank.filter(gen => gen(parseInt(currentGrade)) !== null);
                questionData = pickRandom(availablePatterns)(parseInt(currentGrade));
                questionText = questionData.question;
                correctAnswer = questionData.answer;
                break;
            case 'story_problem':
                const availableGenerators = storyProblemBank.filter(gen => gen(parseInt(currentGrade)) !== null);
                questionData = pickRandom(availableGenerators)(parseInt(currentGrade));
                questionText = questionData.question;
                correctAnswer = questionData.answer;
                break;
            // Other cases...
            default:
                let num1, num2, opSymbol;
                if(operation === 'addition') {
                    opSymbol = '+'; num1 = getRandomInt(1, level.max); num2 = getRandomInt(1, level.max); correctAnswer = num1 + num2;
                } else if (operation === 'subtraction') {
                    opSymbol = '-'; num1 = getRandomInt(1, level.max); num2 = getRandomInt(1, num1); correctAnswer = num1 - num2;
                } else if (operation === 'multiplication') {
                    opSymbol = '×'; num1 = getRandomInt(1, level.multMax); num2 = getRandomInt(1, 10); correctAnswer = num1 * num2;
                } else { // division
                    opSymbol = '÷'; const divisor = getRandomInt(2, level.multMax); const result = getRandomInt(2, 10); num1 = divisor * result; num2 = divisor; correctAnswer = result;
                }
                questionText = `${num1} ${opSymbol} ${num2}`;
                break;
        }
        startTimer();
    }

    function checkAnswer() {
        if (answerInputValue === '' || answerInputValue === '-') {
            feedbackMessage = 'Silakan masukkan jawabanmu.';
            return;
        }
        const userAnswer = parseInt(answerInputValue, 10);
        clearInterval(timerInterval);

        if (userAnswer === correctAnswer) {
            correctAnswersCounter++;
            if (synth) synth.triggerAttackRelease("G5", "8n");
            feedbackMessage = 'Benar! Hebat!';
            inputCorrect = true;
            setTimeout(generateQuestion, 1500);
        } else {
            feedbackMessage = `Jawaban yang benar adalah ${correctAnswer}`;
            inputIncorrect = true;
            setTimeout(generateQuestion, 1500);
        }
    }

    function startGame() {
        initAudio();
        questionCounter = 0;
        correctAnswersCounter = 0;

        const gradeOption = document.querySelector(`#grade-select option[value="${currentGrade}"]`);
        const opOption = document.querySelector(`#operation-select option[value="${currentOperation}"]`);
        levelInfoText = `<strong>Kelas:</strong> ${gradeOption.textContent}<br><strong>Latihan:</strong> ${opOption.textContent}`;

        screen = 'game';
        generateQuestion();
    }

    function handleGradeChange(event) {
        currentGrade = event.target.value;
        availableOps = settings[currentGrade].ops;
        currentOperation = availableOps[0]; // Reset to first available option
    }

</script>

<svelte:head>
    <title>Ayo Belajar Berhitung!</title>
    <script src="asset/Tone.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex items-center justify-center min-h-screen p-4">
    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
            <p class="text-base text-gray-700 mb-8">Pilih jenjang kelas dan latihan yang kamu mau.</p>
            <div class="space-y-6">
                <div>
                    <label for="grade-select" class="block text-left font-semibold text-gray-700 mb-2">Pilih Kelas:</label>
                    <select id="grade-select" class="form-select w-full" bind:value={currentGrade} on:change={handleGradeChange}>
                        <option value="tk">TK Besar</option>
                        <option value="1">Kelas 1 SD</option>
                        <option value="2">Kelas 2 SD</option>
                        <option value="3">Kelas 3 SD</option>
                        <option value="4">Kelas 4 SD</option>
                    </select>
                </div>
                <div>
                    <label for="operation-select" class="block text-left font-semibold text-gray-700 mb-2">Pilihan Latihan:</label>
                    <select id="operation-select" class="form-select w-full" bind:value={currentOperation}>
                        {#each availableOps as op}
                            <option value={op}>{operationLabels[op]}</option>
                        {/each}
                    </select>
                </div>
            </div>
            <button on:click={startGame} class="btn-primary w-full mt-10">Mulai Belajar</button>
            <div class="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button on:click={() => screen = 'multiplicationTable'} class="text-sm font-semibold text-blue-600 hover:text-blue-800">Tabel Perkalian</button>
                <button on:click={() => screen = 'divisionTable'} class="text-sm font-semibold text-blue-600 hover:text-blue-800">Tabel Pembagian</button>
            </div>
            <a href="index.html" class="inline-block mt-6 text-sm font-semibold text-gray-700 hover:text-gray-900">← Kembali ke Menu Utama</a>
        </div>
    {/if}

    {#if screen === 'game'}
        <div class="card card-lg text-center">
            <div class="flex justify-between items-center mb-4">
                <div class="text-left text-sm text-gray-500">{@html levelInfoText}</div>
                <div class="text-right text-sm font-semibold text-gray-700">
                    <span>Soal {questionCounter}/{MAX_QUESTIONS}</span>
                </div>
            </div>
            <div class="flex justify-center flex-wrap space-x-1 sm:space-x-2 mb-6" style="min-height: 16px;">
                {#each timerDots as active}
                    <div class="w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 mb-2" class:bg-blue-400={active} class:bg-gray-200={!active}></div>
                {/each}
            </div>
            <div class="bg-gray-50 p-4 rounded-lg mb-6 min-h-[100px] flex items-center justify-center">
        <span class:question-display={!['story_problem', 'pattern_recognition'].includes(currentOperation)}
              class:question-text-story={['story_problem', 'pattern_recognition'].includes(currentOperation)}>
          {@html questionText}
            {#if !['story_problem', 'pattern_recognition'].includes(currentOperation)}
            <span class="question-display">=</span>
          {/if}
        </span>
            </div>
            <div class="flex items-center justify-center space-x-2 sm:space-x-4 mb-6">
                {#if ['story_problem', 'pattern_recognition'].includes(currentOperation)}
                    <span class="text-xl sm:text-2xl font-bold">Jawaban:</span>
                {/if}
                <input type="text" class="answer-input p-2" bind:value={answerInputValue}
                       class:correct={inputCorrect} class:incorrect={inputIncorrect}
                       on:keydown={(e) => e.key === 'Enter' && checkAnswer()} autofocus>
                <button on:click={checkAnswer} class="btn-submit">✓</button>
            </div>
            <p class="feedback-message font-semibold" class:text-green-600={inputCorrect} class:text-red-600={inputIncorrect}>{feedbackMessage}</p>
            <button on:click={() => screen = 'setup'} class="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-800">← Kembali ke Menu Latihan</button>
        </div>
    {/if}

    {#if screen === 'results'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Latihan Selesai!</h2>
            <p class="text-gray-700 mb-2">Skor Kamu:</p>
            <p class="text-6xl font-bold text-blue-600 mb-6">{correctAnswersCounter * 10}</p>
            <p class="text-lg text-gray-700 mb-8">
                {#if correctAnswersCounter * 10 >= 85}
                    Luar biasa! Kamu adalah juara matematika!
                {:else if correctAnswersCounter * 10 < 50}
                    Jangan menyerah! Setiap latihan membuatmu selangkah lebih maju.
                {:else}
                    Kerja bagus! Teruslah berlatih, kamu makin hebat setiap hari!
                {/if}
            </p>
            <button on:click={() => screen = 'setup'} class="btn-primary w-full">Mulai Latihan Baru</button>
        </div>
    {/if}

</div>

<style>
    :global(body) {
        @apply font-['Poppins',_sans-serif] bg-sky-100;
    }
    .form-select {
        @apply appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-blue-500;
    }
    .btn-primary {
        @apply bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition hover:bg-blue-600 hover:-translate-y-0.5;
    }
    .btn-secondary {
        @apply bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl transition hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base;
    }
</style>
