<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let questionNumber;
    export let totalQuestions;
    export let score;
    export let questionTimer = null;
    export let useTimer = true;
    export let inputElement = null;
    export let gameType = 'math'; // 'math' or 'typing'
    export let isGameOver = false;

    // Reset functions - will be called by parent components
    let resetQuestionCallback = null;
    let resetAnswerCallback = null;
    let generateQuestionCallback = null;
    let nextWordCallback = null;

    // Register callbacks from parent components
    export function registerCallbacks(callbacks) {
        resetQuestionCallback = callbacks.resetQuestion;
        resetAnswerCallback = callbacks.resetAnswer;
        generateQuestionCallback = callbacks.generateQuestion;
        nextWordCallback = callbacks.nextWord;
    }

    export function moveToNextQuestion() {
        if (isGameOver) return;

        // Stop timer
        questionTimer?.stopTimer();

        if (questionNumber >= totalQuestions) {
            // Game finished
            isGameOver = true;
            const screenName = gameType === 'typing' ? 'training-score' : 'score';
            setTimeout(() => dispatch('switch', {
                screen: screenName,
                score: score,
                totalQuestions: totalQuestions
            }), 500);
        } else {
            // Move to next question
            setTimeout(() => {
                questionNumber++;

                // Reset answer/question state
                if (resetAnswerCallback) resetAnswerCallback();
                if (resetQuestionCallback) resetQuestionCallback();

                // Generate new question/word
                if (gameType === 'typing' && nextWordCallback) {
                    nextWordCallback();
                } else if (gameType === 'math' && generateQuestionCallback) {
                    generateQuestionCallback();
                }

                // Restart timer if enabled
                if (useTimer) {
                    questionTimer?.startQuestionTimer();
                }

                // Focus input
                inputElement?.focus();

                // Dispatch next question event
                dispatch('nextQuestion', { questionNumber });
            }, 500);
        }
    }
</script>