<script>
    let screen = 'setup'; // 'setup', 'learn-letters', 'learn-reading', 'typing-game'
    let currentMode = '';

    function startMode(mode) {
        currentMode = mode;
        screen = mode;
    }

    function backToSetup() {
        screen = 'setup';
        currentMode = '';
    }
</script>

<svelte:head>
    <title>Ayo Belajar Membaca!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="flex items-center justify-center min-h-screen p-4 bg-sky-100">
    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ayo Belajar Membaca!</h1>
            <p class="text-base text-gray-600 mb-8">Pilih latihan yang kamu suka di bawah ini.</p>

            <div class="space-y-4">
                <button on:click={() => startMode('learn-letters')} class="btn-primary w-full text-lg">
                    📚 Mengenal Huruf
                </button>
                <button on:click={() => startMode('learn-reading')} class="btn-primary w-full text-lg">
                    📖 Belajar Membaca
                </button>
                <button on:click={() => startMode('typing-game')} class="btn-primary w-full text-lg">
                    ⌨️ Game Mengetik
                </button>
            </div>
        </div>
    {/if}

    {#if screen === 'learn-letters'}
        <div class="bg-white p-6 rounded-3xl shadow-2xl text-center max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Mengenal Huruf</h2>
            <p class="text-gray-600 mb-6">Fitur ini sedang dikembangkan...</p>
            <button on:click={backToSetup} class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">← Kembali</button>
        </div>
    {/if}

    {#if screen === 'learn-reading'}
        <div class="bg-white p-6 rounded-3xl shadow-2xl text-center max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Belajar Membaca</h2>
            <p class="text-gray-600 mb-6">Fitur ini sedang dikembangkan...</p>
            <button on:click={backToSetup} class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">← Kembali</button>
        </div>
    {/if}

    {#if screen === 'typing-game'}
        <div class="bg-white p-6 rounded-3xl shadow-2xl text-center max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Game Mengetik</h2>
            <p class="text-gray-600 mb-6">Fitur ini sedang dikembangkan...</p>
            <button on:click={backToSetup} class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">← Kembali</button>
        </div>
    {/if}
</div>