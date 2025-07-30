
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

<div class="card card-lg text-center animate-fade-in">
    <!-- Header - Mobile Optimized -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl gap-2 sm:gap-0">
        <div class="flex items-center gap-2">
            <div class="text-xl sm:text-2xl flex items-center">📝</div>
            <div class="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
                Soal: <span class="text-lg sm:text-xl md:text-2xl ml-1">{questionNumber}</span> / {totalQuestions}
            </div>
        </div>
        <div class="flex items-center gap-2">
            <div class="text-xl sm:text-2xl flex items-center">🌟</div>
            <div class="score-display text-base sm:text-lg md:text-xl flex items-center">
                {score * 10} poin
            </div>
        </div>
    </div>

    {#if useTimer}
        <div class="mb-4 sm:mb-6">
            <QuestionTimer
                    bind:this={questionTimer}
                    duration={20}
                    on:timeout={handleTimerTimeout} />
        </div>
    {/if}

    <!-- Question Display - Mobile Responsive -->
    <div class="mb-4 sm:mb-6 md:mb-8 p-4 sm:p-6 rounded-2xl sm:rounded-3xl" style="background: var(--fun-gradient);">
        <p class="question-display">{question.text}</p>
    </div>

    <!-- Answer Form - Mobile Optimized -->
    <form on:submit|preventDefault={submitAnswer} class="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <input
                type="number"
                step={['desimal', 'pecahan', 'persen'].includes(operation) ? '0.01' : '1'}
                bind:this={inputElement}
                bind:value={userAnswer}
                class="input-field w-full"
                class:input-correct={isCorrect === true}
                class:input-incorrect={isCorrect === false}
                placeholder="Masukkan jawabanmu... ✨"
                autocomplete="off">
        <button type="submit" class="btn-success flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto mx-auto">
            <div class="text-lg sm:text-xl">✅</div>
            <span class="text-base sm:text-lg">Cek Jawaban!</span>
        </button>
    </form>

    <!-- Back Button - Mobile Optimized -->
    <button on:click={goBack} class="btn-secondary flex items-center justify-center gap-2 mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <div class="text-lg sm:text-xl">🔙</div>
        <span class="text-sm sm:text-base">Kembali</span>
    </button>
</div>