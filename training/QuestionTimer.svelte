
<script>
    import { createEventDispatcher, onDestroy } from 'svelte';

    const dispatch = createEventDispatcher();

    export let duration = 20; // Timer duration in seconds
    export let autoStart = false; // Whether to start automatically

    let timer = duration;
    let countdown;
    let isActive = false;

    export function startQuestionTimer() {
        timer = duration;
        clearInterval(countdown);
        isActive = true;
        countdown = setInterval(() => {
            timer--;
            if (timer <= 0) {
                isActive = false;
                dispatch('timeout');
            }
        }, 1000);
    }

    export function stopTimer() {
        clearInterval(countdown);
        isActive = false;
    }

    export function resetTimer() {
        clearInterval(countdown);
        timer = duration;
        isActive = false;
    }

    onDestroy(() => {
        clearInterval(countdown);
    });

    // Auto start if requested
    if (autoStart) {
        startQuestionTimer();
    }
</script>

<div class="timer-container mb-6">
    {#each {length: duration} as _, i}
        <div class="timer-dot" class:active={i < timer} class:inactive={i >= timer}></div>
    {/each}
</div>

<style>
    .timer-container {
        display: flex;
        justify-content: center;
        gap: 4px;
        flex-wrap: wrap;
    }

    .timer-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }

    .timer-dot.active {
        background-color: #10b981; /* green-500 */
    }

    .timer-dot.inactive {
        background-color: #d1d5db; /* gray-300 */
    }
</style>