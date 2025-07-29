<script>
    export let level;

    function generateDecimalQuestion() {
        const scenarios = ['add', 'subtract', 'multiply'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let a, b, answer, text;

        switch (scenario) {
            case 'add':
                // Gunakan angka desimal sederhana (1 digit desimal)
                a = Math.round((Math.random() * 9 + 1) * 10) / 10; // 1.0 - 9.9
                b = Math.round((Math.random() * 9 + 1) * 10) / 10; // 1.0 - 9.9
                answer = Math.round((a + b) * 10) / 10;
                text = `${a} + ${b}`;
                break;
            case 'subtract':
                // Pastikan a > b untuk hasil positif
                a = Math.round((Math.random() * 15 + 5) * 10) / 10; // 5.0 - 19.9
                b = Math.round((Math.random() * (a - 1)) * 10) / 10;
                answer = Math.round((a - b) * 10) / 10;
                text = `${a} - ${b}`;
                break;
            case 'multiply':
                // Gunakan angka kecil untuk perkalian
                a = Math.round((Math.random() * 4 + 1) * 10) / 10; // 1.0 - 4.9
                b = [2, 3, 4, 5][Math.floor(Math.random() * 4)]; // Bilangan bulat kecil
                answer = Math.round((a * b) * 10) / 10;
                text = `${a} × ${b}`;
                break;
        }

        return { text: `${text} = ?`, answer: answer };
    }

    // Export fungsi agar bisa dipanggil dari komponen parent
    export { generateDecimalQuestion };
</script>