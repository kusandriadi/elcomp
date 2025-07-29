<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import Addition from './operation/Addition.svelte';

    export let level;
    export let operation;
    export let useTimer = true; // Prop baru untuk mengontrol timer

    const dispatch = createEventDispatcher();

    let score = 0;
    let questionNumber = 1;
    const totalQuestions = 10;
    let timer = 20;
    let countdown;
    let question = { text: '', answer: 0 };
    let userAnswer = '';
    let isCorrect = null;
    let synth;

    // PERUBAHAN 1: Deklarasikan variabel untuk elemen input
    let inputElement;

    // Referensi ke komponen Addition
    let additionComponent;

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
        generateQuestion();
        if (useTimer) {
            startQuestionTimer();
        }
        // Fokus saat komponen pertama kali dimuat
        inputElement?.focus();
    });

    onDestroy(() => {
        if (synth) synth.dispose();
        clearInterval(countdown);
    });

    function playTone(note) {
        if (synth) {
            const now = window.Tone.now();
            if (note === 'correct') synth.triggerAttackRelease('C5', '16n', now);
            else if (note === 'incorrect') synth.triggerAttackRelease('G#2', '16n', now);
        }
    }

    function generateQuestion() {
        let a, b, c, answer, text;

        let maxNum, maxMult, maxDiv;
        switch (level) {
            case 'tk': maxNum = 10; maxMult = 3; maxDiv = 3; break;
            case '1': maxNum = 20; maxMult = 5; maxDiv = 5; break;
            case '2': maxNum = 50; maxMult = 10; maxDiv = 10; break;
            case '3': maxNum = 100; maxMult = 12; maxDiv = 12; break;
            case '4': maxNum = 200; maxMult = 15; maxDiv = 15; break;
        }

        let currentOp = operation;

        // Operasi Penjumlahan - Menggunakan komponen Addition
        if (currentOp === 'penjumlahan') {
            question = additionComponent.generateAdditionQuestion();
            return;
        }

        // Operasi Persen
        if (currentOp === 'persen') {
            const scenarios = ['basic', 'of', 'increase', 'decrease'];
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

            switch (scenario) {
                case 'basic':
                    a = [10, 20, 25, 50, 75].filter(() => Math.random() > 0.5)[0] || 25;
                    b = Math.floor(Math.random() * 100) + 1;
                    answer = Math.round((a / 100) * b * 100) / 100; // Allow decimal answer
                    text = `${a}% dari ${b}`;
                    break;
                case 'of':
                    a = Math.floor(Math.random() * 99) + 1;
                    b = Math.floor(Math.random() * 80) + 20;
                    answer = Math.round((a / 100) * b * 100) / 100; // Allow decimal answer
                    text = `${a}% dari ${b}`;
                    break;
                case 'increase':
                    a = Math.floor(Math.random() * 50) + 10;
                    b = Math.floor(Math.random() * 30) + 10;
                    answer = Math.round(a * (1 + b/100) * 100) / 100; // Allow decimal answer
                    text = `${a} naik ${b}%`;
                    break;
                case 'decrease':
                    a = Math.floor(Math.random() * 50) + 30;
                    b = Math.floor(Math.random() * 25) + 10;
                    answer = Math.round(a * (1 - b/100) * 100) / 100; // Allow decimal answer
                    text = `${a} turun ${b}%`;
                    break;
            }
            question = { text: `${text} = ?`, answer: answer };
            return;
        }

        // Operasi Pecahan
        if (currentOp === 'pecahan') {
            const scenarios = ['add', 'subtract', 'multiply', 'convert', 'decimal'];
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

            switch (scenario) {
                case 'add':
                    const denom = [2, 3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 7)];
                    a = Math.floor(Math.random() * (denom - 1)) + 1;
                    b = Math.floor(Math.random() * (denom - a)) + 1;
                    answer = Math.round(((a + b) / denom) * 1000) / 1000; // Convert to decimal
                    text = `${a}/${denom} + ${b}/${denom}`;
                    question = { text: `${text} = ? (dalam desimal)`, answer: answer };
                    return;
                case 'subtract':
                    const denom2 = [2, 3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 7)];
                    a = Math.floor(Math.random() * (denom2 - 2)) + 3;
                    b = Math.floor(Math.random() * (a - 1)) + 1;
                    answer = Math.round(((a - b) / denom2) * 1000) / 1000; // Convert to decimal
                    text = `${a}/${denom2} - ${b}/${denom2}`;
                    question = { text: `${text} = ? (dalam desimal)`, answer: answer };
                    return;
                case 'multiply':
                    a = Math.floor(Math.random() * 5) + 1;
                    const denom3 = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                    b = Math.floor(Math.random() * 4) + 1;
                    answer = Math.round((a * b / denom3) * 1000) / 1000; // Convert to decimal
                    text = `${a} × ${b}/${denom3}`;
                    question = { text: `${text} = ? (dalam desimal)`, answer: answer };
                    return;
                case 'convert':
                    const whole = Math.floor(Math.random() * 5) + 1;
                    const denom4 = [2, 4, 5, 8, 10][Math.floor(Math.random() * 5)];
                    const numerator = Math.floor(Math.random() * denom4) + 1;
                    answer = Math.round((whole + numerator / denom4) * 1000) / 1000; // Convert to decimal
                    text = `${whole} ${numerator}/${denom4}`;
                    question = { text: `${text} = ? (dalam desimal)`, answer: answer };
                    return;
                case 'decimal':
                    const denom5 = [2, 4, 5, 8, 10][Math.floor(Math.random() * 5)];
                    const num5 = Math.floor(Math.random() * denom5) + 1;
                    answer = Math.round((num5 / denom5) * 1000) / 1000;
                    text = `${num5}/${denom5}`;
                    question = { text: `${text} = ? (dalam desimal)`, answer: answer };
                    return;
            }
        }

        // Operasi Desimal
        if (currentOp === 'desimal') {
            const scenarios = ['add', 'subtract', 'multiply', 'divide'];
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

            switch (scenario) {
                case 'add':
                    a = Math.round((Math.random() * 50 + 1) * 100) / 100; // Up to 2 decimal places
                    b = Math.round((Math.random() * 50 + 1) * 100) / 100;
                    answer = Math.round((a + b) * 100) / 100;
                    text = `${a} + ${b}`;
                    break;
                case 'subtract':
                    a = Math.round((Math.random() * 80 + 20) * 100) / 100;
                    b = Math.round((Math.random() * (a - 5)) * 100) / 100;
                    answer = Math.round((a - b) * 100) / 100;
                    text = `${a} - ${b}`;
                    break;
                case 'multiply':
                    a = Math.round((Math.random() * 9 + 1) * 100) / 100;
                    b = Math.round((Math.random() * 9 + 1) * 100) / 100;
                    answer = Math.round((a * b) * 100) / 100;
                    text = `${a} × ${b}`;
                    break;
                case 'divide':
                    b = Math.round((Math.random() * 8 + 2) * 100) / 100;
                    a = Math.round((b * (Math.random() * 8 + 2)) * 100) / 100;
                    answer = Math.round((a / b) * 100) / 100;
                    text = `${a} ÷ ${b}`;
                    break;
            }
            question = { text: `${text} = ?`, answer: answer };
            return;
        }

        if (currentOp === 'campuran') {
            const templates = ['(a+b)*c', 'a*(b+c)', '(a*b)+c', 'a+(b*c)', '(a-b)*c', 'a*(b-c)', 'c*(a-b)', '(a*b)-c', 'a-(b*c)'];
            if (level === '4') {
                templates.push('a/(b-c)', '(a+b)/c');
            }
            const template = templates[Math.floor(Math.random() * templates.length)];

            a = Math.floor(Math.random() * maxMult) + 1;
            b = Math.floor(Math.random() * maxMult) + 1;
            c = Math.floor(Math.random() * maxMult) + (level === '3' ? 1 : 2);

            switch (template) {
                case '(a+b)*c': answer = (a+b)*c; text = `(${a} + ${b}) × ${c}`; break;
                case 'a*(b+c)': answer = a*(b+c); text = `${a} × (${b} + ${c})`; break;
                case '(a*b)+c': answer = (a*b)+c; text = `(${a} × ${b}) + ${c})`; break;
                case 'a+(b*c)': answer = a+(b*c); text = `${a} + (${b} × ${c})`; break;
                case '(a-b)*c': if (a <= b) { [a, b] = [b, a]; if (a===b) a++; } answer = (a-b)*c; text = `(${a} − ${b}) × ${c}`; break;
                case 'a*(b-c)': if (b <= c) { [b, c] = [c, b]; if (b===c) b++; } answer = a*(b-c); text = `${a} × (${b} − ${c})`; break;
                case 'c*(a-b)': if (a <= b) { [a, b] = [b, a]; if (a===b) a++; } answer = c*(a-b); text = `${c} × (${a} − ${b})`; break;
                case '(a*b)-c': if ((a*b) <= c) { a = c + 1; b = 1; } answer = (a*b)-c; text = `(${a} × ${b}) − ${c}`; break;
                case 'a-(b*c)': if (a <= (b*c)) { a = (b*c) + Math.floor(Math.random()*5)+1; } answer = a-(b*c); text = `${a} − (${b} × ${c})`; break;
                case 'a/(b-c)': if (b <= c) { [b, c] = [c, b]; if (b===c) b++; } let subResult = b-c; a = subResult * (Math.floor(Math.random()*5)+1); answer = a / subResult; text = `${a} ÷ (${b} − ${c})`; break;
                case '(a+b)/c': let addResult = a+b; c = [2,3,4,5].filter(n => addResult % n === 0)[0] || 2; if (!c || addResult % c !== 0) { a=6; b=4; c=2; } answer = (a+b)/c; text = `(${a} + ${b}) ÷ ${c}`; break;
            }
            question = { text: `${text} = ?`, answer: answer };
            return;
        }

        let symbol;
        switch (currentOp) {
            case 'pengurangan': a = Math.floor(Math.random() * maxNum) + 1; b = Math.floor(Math.random() * a); answer = a - b; symbol = '−'; break;
            case 'perkalian': a = Math.floor(Math.random() * maxMult) + 1; b = Math.floor(Math.random() * maxMult) + (level === 'tk' ? 0 : 1); answer = a * b; symbol = '×'; break;
            case 'pembagian': b = Math.floor(Math.random() * (maxDiv - 1)) + 2; let temp = Math.floor(Math.random() * maxDiv) + 1; a = b * temp; answer = temp; symbol = '÷'; break;
            default:
                // Fallback untuk penjumlahan jika komponen Addition tidak tersedia
                a = Math.floor(Math.random() * maxNum) + 1;
                b = Math.floor(Math.random() * maxNum) + 1;
                answer = a + b;
                symbol = '+';
                break;
        }
        question = { text: `${a} ${symbol} ${b} = ?`, answer: answer };
    }

    function submitAnswer() {
        if (userAnswer === '') return;

        let userNum;
        let isAnswerCorrect = false;

        // Handle different input types based on operation
        if (operation === 'desimal' || operation === 'pecahan' || operation === 'persen') {
            // Allow decimal input for these operations
            userNum = parseFloat(userAnswer);
            // Use tolerance for decimal comparison
            isAnswerCorrect = Math.abs(userNum - question.answer) < 0.01;
        } else {
            // Integer operations
            userNum = parseInt(userAnswer);
            isAnswerCorrect = userNum === question.answer;
        }

        if (isAnswerCorrect) {
            isCorrect = true;
            playTone('correct');
            score++;
        } else {
            isCorrect = false;
            playTone('incorrect');
        }
        moveToNextQuestion();
    }

    function moveToNextQuestion() {
        clearInterval(countdown);
        if (questionNumber >= totalQuestions) {
            setTimeout(() => dispatch('switch', { screen: 'score', score: score, totalQuestions: totalQuestions }), 500);
        } else {
            setTimeout(() => {
                questionNumber++;
                userAnswer = '';
                isCorrect = null;
                generateQuestion();
                if (useTimer) {
                    startQuestionTimer();
                }
                // PERUBAHAN 2: Fokus dipanggil secara eksplisit di sini
                inputElement?.focus();
            }, 500);
        }
    }

    function startQuestionTimer() {
        timer = 20;
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            if (timer <= 0) {
                playTone('incorrect');
                moveToNextQuestion();
            }
        }, 1000);
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }
</script>

<!-- Komponen Addition (tersembunyi, hanya untuk logic) -->
<Addition bind:this={additionComponent} {level} />

<div class="card text-center">
    <div class="flex justify-between items-center mb-4">
        <div class="text-lg">Soal: <span class="font-bold">{questionNumber} / {totalQuestions}</span></div>
        <div class="text-lg">Skor: <span class="font-bold text-green-600">{score * (100 / totalQuestions)}</span></div>
    </div>

    {#if useTimer}
        <div class="timer-container mb-6">
            {#each {length: 20} as _, i}
                <div class="timer-dot" class:active={i < timer} class:inactive={i >= timer}></div>
            {/each}
        </div>
    {/if}

    <p class="question-display mb-4">{question.text}</p>

    <form on:submit|preventDefault={submitAnswer} class="flex items-center gap-2">
        <input
                type="number"
                step={['desimal', 'pecahan', 'persen'].includes(operation) ? '0.01' : '1'}
                bind:this={inputElement}
                bind:value={userAnswer}
                class="input-field flex-grow"
                class:input-correct={isCorrect === true}
                class:input-incorrect={isCorrect === false}
                placeholder="Jawabanmu"
                autocomplete="off">
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-xl flex items-center justify-center transition shadow-md transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        </button>
    </form>

    <button on:click={goBack} class="text-gray-600 hover:text-gray-800 font-semibold mt-6">Kembali</button>
</div>