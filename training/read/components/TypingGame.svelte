<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import QuestionTimer from '../../QuestionTimer.svelte';
    import NextQuestion from '../../NextQuestion.svelte';

    const dispatch = createEventDispatcher();

    let typingWord = '';
    let userInput = '';
    let typingScore = 0;
    let isTypingCorrect = null;
    let synth;
    let questionNumber = 1;
    const totalQuestions = 10;
    let isGameOver = false;

    // References to components
    let questionTimer;
    let nextQuestionComponent;
    let inputElement;

    let words = ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"];
    let shuffledWords = [];
    let wordIndex = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
        shuffledWords = shuffle([...words]);
        nextTypingWord();
        questionTimer?.startQuestionTimer();
        inputElement?.focus();

        // Register callbacks with NextQuestion component
        nextQuestionComponent?.registerCallbacks({
            resetAnswer: () => {
                userInput = '';
                isTypingCorrect = null;
            },
            nextWord: nextTypingWord
        });
    });

    onDestroy(() => {
        if (synth) {
            synth.dispose();
        }
    });

    function playTone(note) {
        if (synth) {
            const now = window.Tone.now();
            if (note === 'correct') synth.triggerAttackRelease('C5', '16n', now);
            else if (note === 'incorrect') synth.triggerAttackRelease('G#2', '16n', now);
        }
    }

    function nextTypingWord() {
        if (wordIndex >= shuffledWords.length) {
            wordIndex = 0;
            shuffledWords = shuffle([...words]);
        }
        typingWord = shuffledWords[wordIndex];
        wordIndex++;
    }

    function submitAnswer() {
        if (!userInput) return;
        if (userInput.toLowerCase() === typingWord.toLowerCase()) {
            isTypingCorrect = true;
            playTone('correct');
            typingScore++;
        } else {
            isTypingCorrect = false;
            playTone('incorrect');
        }
        nextQuestionComponent?.moveToNextQuestion();
    }

    function handleTimerTimeout() {
        playTone('incorrect');
        nextQuestionComponent?.moveToNextQuestion();
    }

    function handleNextQuestion(event) {
        questionNumber = event.detail.questionNumber;
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }
</script>

<!-- NextQuestion component - handles question navigation logic -->
<NextQuestion
        bind:this={nextQuestionComponent}
        bind:questionNumber
        {totalQuestions}
        score={typingScore}
        {questionTimer}
        useTimer={true}
        {inputElement}
        gameType="typing"
        {isGameOver}
        on:switch={(e) => dispatch('switch', e.detail)}
        on:nextQuestion={handleNextQuestion} />

<div class="card card-lg text-center animate-bounce-in">
    <!-- Fun Header -->
    <div class="flex justify-between items-center mb-8 bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded-2xl">
        <div class="flex items-center gap-2">
            <div class="text-2xl">⌨️</div>
            <div class="text-lg font-bold text-gray-800" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
                Kata: <span class="text-2xl">{questionNumber}</span> / {totalQuestions}
            </div>
        </div>
        <div class="flex items-center gap-2">
            <div class="text-2xl">🏆</div>
            <div class="score-display text-xl">
                {typingScore * 10}
            </div>
        </div>
    </div>

    <div class="mb-8">
        <QuestionTimer
                bind:this={questionTimer}
                duration={20}
                on:timeout={handleTimerTimeout} />
    </div>

    <!-- Word Display with Fun Background -->
    <div class="mb-8 p-8 rounded-3xl" style="background: var(--fun-gradient);">
        <div class="text-xl mb-4 font-bold" style="font-family: 'Fredoka', 'Poppins', sans-serif; color: #6b7280;">
            Ketik kata ini: 👇
        </div>
        <p class="question-display text-6xl font-bold" style="font-family: 'Fredoka', 'Poppins', sans-serif;">{typingWord}</p>
    </div>

    <!-- Modern Typing Form -->
    <form on:submit|preventDefault={submitAnswer} class="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <input type="text" bind:this={inputElement} bind:value={userInput}
               class="input-field flex-grow text-4xl"
               class:input-correct={isTypingCorrect === true}
               class:input-incorrect={isTypingCorrect === false}
               placeholder="Ketik di sini... ✨"
               autocomplete="off">
        <button type="submit" class="btn-success flex items-center gap-2 px-8 py-4">
            <div class="text-xl">⚡</div>
            <span>Kirim!</span>
        </button>
    </form>

    <!-- Fun Back Button -->
    <button on:click={goBack} class="btn-secondary flex items-center gap-2 mx-auto">
        <div class="text-xl">🔙</div>
        <span>Kembali</span>
    </button>
</div>