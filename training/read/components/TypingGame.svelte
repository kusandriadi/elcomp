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

    let words = [];
    let shuffledWords = [];
    let wordIndex = 0;

    onMount(async () => {
        // Import backend services
        const { getTypingWords, initializeTypingGame } = await import('../../../backend/read/index.js');
        
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
        
        words = getTypingWords();
        const gameState = initializeTypingGame(words, totalQuestions);
        shuffledWords = gameState.shuffledWords;
        wordIndex = gameState.wordIndex;
        typingWord = gameState.currentWord;
        typingScore = gameState.score;
        
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

    async function submitAnswer() {
        if (!userInput) return;
        
        // Import backend service for checking answer
        const { checkTypingAnswer } = await import('../../../backend/read/index.js');
        
        const result = checkTypingAnswer(userInput, typingWord, typingScore);
        isTypingCorrect = result.isCorrect;
        typingScore = result.newScore;
        
        if (result.isCorrect) {
            playTone('correct');
        } else {
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

<div class="card card-lg text-center animate-fade-in">
    <!-- Header - Mobile Optimized -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 bg-gradient-to-r from-pink-50 to-blue-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl gap-2 sm:gap-0">
        <div class="flex items-center gap-2">
            <div class="text-xl sm:text-2xl flex items-center">⌨️</div>
            <div class="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center" style="font-family: 'Fredoka', 'Poppins', sans-serif;">
                Kata: <span class="text-lg sm:text-xl md:text-2xl ml-1">{questionNumber}</span> / {totalQuestions}
            </div>
        </div>
        <div class="flex items-center gap-2">
            <div class="text-xl sm:text-2xl flex items-center">🏆</div>
            <div class="score-display text-base sm:text-lg md:text-xl flex items-center">
                {typingScore * 10} poin
            </div>
        </div>
    </div>

    <div class="mb-4 sm:mb-6">
        <QuestionTimer
                bind:this={questionTimer}
                duration={20}
                on:timeout={handleTimerTimeout} />
    </div>

    <!-- Word Display - Mobile Responsive -->
    <div class="mb-4 sm:mb-6 md:mb-8 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl" style="background: var(--fun-gradient);">
        <div class="text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-4 font-bold" style="font-family: 'Fredoka', 'Poppins', sans-serif; color: #6b7280;">
            Ketik kata ini: 👇
        </div>
        <p class="question-display font-bold" style="font-family: 'Fredoka', 'Poppins', sans-serif;">{typingWord}</p>
    </div>

    <!-- Typing Form - Mobile Optimized -->
    <form on:submit|preventDefault={submitAnswer} class="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <input type="text" bind:this={inputElement} bind:value={userInput}
               class="input-field w-full"
               class:input-correct={isTypingCorrect === true}
               class:input-incorrect={isTypingCorrect === false}
               placeholder="Ketik di sini... ✨"
               autocomplete="off">
        <button type="submit" class="btn-success flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto mx-auto">
            <div class="text-lg sm:text-xl">⚡</div>
            <span class="text-base sm:text-lg">Kirim!</span>
        </button>
    </form>

    <!-- Back Button - Mobile Optimized -->
    <button on:click={goBack} class="btn-secondary flex items-center justify-center gap-2 mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <div class="text-lg sm:text-xl">🔙</div>
        <span class="text-sm sm:text-base">Kembali</span>
    </button>
</div>