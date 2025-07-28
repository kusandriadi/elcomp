<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    export let level;
    export let operation;

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
    let useTimer = level !== 'tk' && level !== '1';

    // PERUBAHAN 1: Deklarasikan variabel untuk elemen input
    let inputElement;

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
                case '(a*b)+c': answer = (a*b)+c; text = `(${a} × ${b}) + ${c}`; break;
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
            default: a = Math.floor(Math.random() * maxNum) + 1; b = Math.floor(Math.random() * maxNum) + 1; answer = a + b; symbol = '+'; break;
        }
        question = { text: `${a} ${symbol} ${b} = ?`, answer: answer };
    }

    function submitAnswer() {
        if (userAnswer === '') return;
        if (parseInt(userAnswer) === question.answer) {
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
        <input type="number" bind:this={inputElement} bind:value={userAnswer}
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