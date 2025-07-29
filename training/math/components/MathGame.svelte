
<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import Addition from './operation/Addition.svelte';
    import Substraction from './operation/Substraction.svelte';
    import Multiplication from './operation/Multiplication.svelte';
    import Division from './operation/Division.svelte';
    import MixedOperation from './operation/MixedOperation.svelte';
    import Decimal from './operation/Decimal.svelte';
    import Percentage from './operation/Percentage.svelte';
    import Fraction from './operation/Fraction.svelte';
    import QuestionTimer from '../../QuestionTimer.svelte';
    import NextQuestion from '../../NextQuestion.svelte';

    export let level;
    export let operation;
    export let useTimer = true;

    const dispatch = createEventDispatcher();

    let score = 0;
    let questionNumber = 1;
    const totalQuestions = 10;
    let question = { text: '', answer: 0 };
    let userAnswer = '';
    let isCorrect = null;
    let synth;

    // References to components
    let inputElement;
    let questionTimer;
    let nextQuestionComponent;

    let additionComponent;
    let substractionComponent;
    let multiplicationComponent;
    let divisionComponent;
    let mixedOperationComponent;
    let decimalComponent;
    let percentageComponent;
    let fractionComponent;

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
        generateQuestion();
        if (useTimer) {
            questionTimer?.startQuestionTimer();
        }
        inputElement?.focus();

        // Register callbacks with NextQuestion component
        nextQuestionComponent?.registerCallbacks({
            resetAnswer: () => {
                userAnswer = '';
                isCorrect = null;
            },
            generateQuestion: generateQuestion
        });
    });

    onDestroy(() => {
        if (synth) synth.dispose();
    });

    function playTone(note) {
        if (synth) {
            const now = window.Tone.now();
            if (note === 'correct') synth.triggerAttackRelease('C5', '16n', now);
            else if (note === 'incorrect') synth.triggerAttackRelease('G#2', '16n', now);
        }
    }

    function handleTimerTimeout() {
        playTone('incorrect');
        nextQuestionComponent?.moveToNextQuestion();
    }

    function generateQuestion() {
        const operationMap = {
            'penjumlahan': () => additionComponent.generateAdditionQuestion(),
            'pengurangan': () => substractionComponent.generateSubtractionQuestion(),
            'perkalian': () => multiplicationComponent.generateMultiplicationQuestion(),
            'pembagian': () => divisionComponent.generateDivisionQuestion(),
            'campuran': () => mixedOperationComponent.generateMixedQuestion(),
            'desimal': () => decimalComponent.generateDecimalQuestion(),
            'persen': () => percentageComponent.generatePercentageQuestion(),
            'pecahan': () => fractionComponent.generateFractionQuestion()
        };

        if (operationMap[operation]) {
            question = operationMap[operation]();
            return;
        }
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
        nextQuestionComponent?.moveToNextQuestion();
    }

    function handleNextQuestion(event) {
        questionNumber = event.detail.questionNumber;
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }
</script>

<!-- Operation components -->
<Addition bind:this={additionComponent} {level} />
<Substraction bind:this={substractionComponent} {level} />
<Multiplication bind:this={multiplicationComponent} {level} />
<Division bind:this={divisionComponent} {level} />
<MixedOperation bind:this={mixedOperationComponent} {level} />
<Decimal bind:this={decimalComponent} {level} />
<Percentage bind:this={percentageComponent} {level} />
<Fraction bind:this={fractionComponent} {level} />

<!-- NextQuestion component - handles question navigation logic -->
<NextQuestion
        bind:this={nextQuestionComponent}
        bind:questionNumber
        {totalQuestions}
        {score}
        {questionTimer}
        {useTimer}
        {inputElement}
        gameType="math"
        isGameOver={false}
        on:switch={(e) => dispatch('switch', e.detail)}
        on:nextQuestion={handleNextQuestion} />

<div class="card text-center">
    <div class="flex justify-between items-center mb-4">
        <div class="text-lg">Soal: <span class="font-bold">{questionNumber} / {totalQuestions}</span></div>
        <div class="text-lg">Skor: <span class="font-bold text-green-600">{score * (100 / totalQuestions)}</span></div>
    </div>

    {#if useTimer}
        <QuestionTimer
                bind:this={questionTimer}
                duration={20}
                on:timeout={handleTimerTimeout} />
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