<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let typingWord = '';
    let userInput = '';
    let typingScore = 0;
    let isTypingCorrect = null;
    let synth;
    let questionNumber = 1;
    const totalQuestions = 10;
    let typingTimer = 20;
    let typingInterval;
    let readingWords = {
        level2: ["baca", "budi", "bola", "dasi", "dadu", "sapi", "kuda", "meja", "roti", "susu"]
    };

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
        }
        startQuestionTimer();
        nextTypingWord();
    });

    onDestroy(() => {
        if (synth) {
            synth.dispose();
        }
        clearInterval(typingInterval);
    });

    function playTone(note) {
        if (synth) {
            const now = window.Tone.now();
            if (note === 'correct') synth.triggerAttackRelease('C5', '16n', now);
            else if (note === 'incorrect') synth.triggerAttackRelease('G#2', '16n', now);
        }
    }

    function nextTypingWord() {
        typingWord = readingWords.level2[Math.floor(Math.random() * readingWords.level2.length)];
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
        moveToNextQuestion();
    }

    function moveToNextQuestion() {
        clearInterval(typingInterval);
        if (questionNumber >= totalQuestions) {
            setTimeout(() => dispatch('switch', { screen: 'typing-score', score: typingScore }), 500);
        } else {
            setTimeout(() => {
                questionNumber++;
                userInput = '';
                nextTypingWord();
                isTypingCorrect = null;
                startQuestionTimer();
            }, 500);
        }
    }

    function startQuestionTimer() {
        typingTimer = 20;
        clearInterval(typingInterval);
        typingInterval = setInterval(() => {
            typingTimer--;
            if (typingTimer <= 0) {
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
        <div class="text-lg">Skor: <span class="font-bold text-green-600">{typingScore * 10}</span></div>
    </div>

    <div class="timer-container mb-6">
        {#each {length: 20} as _, i}
            <div class="timer-dot" class:active={i < typingTimer} class:inactive={i >= typingTimer}></div>
        {/each}
    </div>

    <p class="question-display mb-4">{typingWord}</p>

    <form on:submit|preventDefault={submitAnswer} class="flex items-center gap-2">
        <input type="text" bind:value={userInput}
               class="input-field flex-grow"
               class:input-correct={isTypingCorrect === true}
               class:input-incorrect={isTypingCorrect === false}
               placeholder="Ketik di sini..."
               autocomplete="off">
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-xl flex items-center justify-center transition shadow-md transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        </button>
    </form>

    <button on:click={goBack} class="text-gray-600 hover:text-gray-800 font-semibold mt-6">Kembali</button>
</div>