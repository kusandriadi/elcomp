<script>
    let screen = 'setup'; // 'setup', 'game', 'score'
    let operation = 'penjumlahan'; // 'penjumlahan', 'pengurangan', 'perkalian', 'pembagian'
    let score = 0;
    let timer = 30;
    let countdown;
    let question = { a: 0, b: 0, answer: 0 };
    let userAnswer = '';
    let isCorrect = null;

    function generateQuestion() {
        let a, b, answer;
        const maxNum = 10;

        switch (operation) {
            case 'pengurangan':
                a = Math.floor(Math.random() * maxNum) + 1;
                b = Math.floor(Math.random() * a); // Pastikan hasil tidak negatif
                answer = a - b;
                break;
            case 'perkalian':
                a = Math.floor(Math.random() * maxNum) + 1;
                b = Math.floor(Math.random() * 5) + 1; // Angka perkalian lebih kecil
                answer = a * b;
                break;
            case 'pembagian':
                b = Math.floor(Math.random() * 5) + 1;
                answer = Math.floor(Math.random() * 5) + 1;
                a = b * answer; // Pastikan hasil pembagian bulat
                break;
            default: // Penjumlahan
                a = Math.floor(Math.random() * maxNum) + 1;
                b = Math.floor(Math.random() * maxNum) + 1;
                answer = a + b;
                break;
        }
        question = { a, b, answer };
    }

    function checkAnswer() {
        if (parseInt(userAnswer) === question.answer) {
            score++;
            isCorrect = true;
            // Clear input dan beri soal baru setelah sedikit jeda
            setTimeout(() => {
                userAnswer = '';
                isCorrect = null;
                generateQuestion();
            }, 300);
        } else {
            isCorrect = false;
        }
    }

    function startTimer() {
        timer = 30;
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            if (timer <= 0) {
                clearInterval(countdown);
                screen = 'score'; // Pindah ke layar skor saat waktu habis
            }
        }, 1000);
    }

    function startGame() {
        score = 0;
        userAnswer = '';
        isCorrect = null;
        generateQuestion();
        startTimer();
        screen = 'game';
    }

    function backToSetup() {
        screen = 'setup';
        clearInterval(countdown);
    }

    function getOperationSymbol() {
        switch (operation) {
            case 'penjumlahan': return '+';
            case 'pengurangan': return '−';
            case 'perkalian': return '×';
            case 'pembagian': return '÷';
        }
    }

</script>

<div class="flex items-center justify-center min-h-screen p-4 font-poppins">

    {#if screen === 'setup'}
        <div class="card text-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Latihan Matematika & Logika</h1>
            <p class="text-base text-gray-600 mb-8">Pilih jenis operasi hitung di bawah ini.</p>
            <select bind:value={operation} class="form-select mb-6 w-full max-w-xs mx-auto">
                <option value="penjumlahan">Penjumlahan (+)</option>
                <option value="pengurangan">Pengurangan (-)</option>
                <option value="perkalian">Perkalian (x)</option>
                <option value="pembagian">Pembagian (:)</option>
            </select>
            <button on:click={startGame} class="btn-primary w-full max-w-xs mx-auto text-lg">Mulai Bermain!</button>
        </div>

    {:else if screen === 'game'}
        <div class="card text-center">
            <div class="flex justify-between items-center mb-6">
                <div class="text-lg">Skor: <span class="font-bold text-green-600">{score}</span></div>
                <div class="text-lg">Waktu: <span class="font-bold text-red-500">{timer}</span></div>
            </div>

            <div class="question-display">
                {question.a} {getOperationSymbol()} {question.b} = ?
            </div>

            <input type="number" bind:value={userAnswer} on:input={checkAnswer}
                   class="input-field mb-4"
                   class:input-correct={isCorrect === true}
                   class:input-incorrect={isCorrect === false}
                   placeholder="Jawabanmu"
                   autocomplete="off">

            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold mt-4">Berhenti Bermain</button>
        </div>

    {:else if screen === 'score'}
        <div class="card text-center">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Waktu Habis!</h2>
            <p class="text-lg text-gray-700 mb-6">Skor akhir kamu:</p>
            <p class="text-6xl font-bold text-green-600 mb-8">{score}</p>
            <button on:click={startGame} class="btn-primary mb-4">Coba Lagi</button>
            <button on:click={backToSetup} class="text-gray-600 hover:text-gray-800 font-semibold">Kembali ke Menu</button>
        </div>
    {/if}

</div>