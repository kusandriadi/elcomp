<script>
    import { onMount, createEventDispatcher } from 'svelte';
    export let score;
    const dispatch = createEventDispatcher();
    let synth;

    onMount(() => {
        if (window.Tone) {
            synth = new window.Tone.Synth().toDestination();
            playTone('finished');
            setTimeout(() => playSound(getMotivationalMessage()), 500);
        }
    });

    function playSound(text) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
        utterance.lang = 'id-ID';
        window.speechSynthesis.speak(utterance);
    }

    function playTone(note) {
        if (synth && note === 'finished') {
            const now = window.Tone.now();
            synth.triggerAttackRelease('C4', '8n', now);
            synth.triggerAttackRelease('E4', '8n', now + 0.1);
            synth.triggerAttackRelease('G4', '8n', now + 0.2);
            synth.triggerAttackRelease('C5', '8n', now + 0.3);
        }
    }

    function getMotivationalMessage() {
        const finalScore = score * 10;
        const messages = [
            `Hebat, kamu dapat ${finalScore} poin! Terus berlatih ya!`,
            `Luar biasa! Skor kamu ${finalScore}. Coba lagi yuk!`,
            `Keren! Kamu berhasil mengumpulkan ${finalScore} poin. Semangat!`,
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function goBack() {
        dispatch('switch', { screen: 'setup' });
    }

    function playAgain() {
        dispatch('switch', { screen: 'typing-game' });
    }
</script>

<div class="card text-center">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Permainan Selesai!</h2>
    <p class="text-lg text-gray-700 mb-6">Skor akhir kamu adalah:</p>
    <p class="text-6xl font-bold text-green-600 mb-8">{score * 10}</p>
    <div class="flex flex-col items-center">
        <button on:click={playAgain} class="btn-primary mb-4 w-full max-w-xs">Main Lagi</button>
        <button on:click={goBack} class="text-gray-600 hover:text-gray-800 font-semibold mt-2">Kembali</button>
    </div>
</div>