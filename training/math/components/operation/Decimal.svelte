<script>
    export let level;

    function generateDecimalQuestion() {
        const scenarios = ['add', 'subtract', 'multiply', 'divide'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let a, b, answer, text;

        switch (scenario) {
            case 'add':
                a = Math.round((Math.random() * 50 + 1) * 100) / 100; // Up to 2 decimal places
                b = Math.round((Math.random() * 50 + 1) * 100) / 100;
                answer = Math.round((a + b) * 100) / 100;
                text = `${a} + ${b}`;
                break;
            case 'subtract':
                a = Math.round((Math.random() * 80 + 20) * 100) / 100;
                b = Math.round((Math.random() * (a - 5)) * 100) / 100;
                answer = Math.round((a - b) * 100) / 100;
                text = `${a} - ${b}`;
                break;
            case 'multiply':
                a = Math.round((Math.random() * 9 + 1) * 100) / 100;
                b = Math.round((Math.random() * 9 + 1) * 100) / 100;
                answer = Math.round((a * b) * 100) / 100;
                text = `${a} × ${b}`;
                break;
            case 'divide':
                b = Math.round((Math.random() * 8 + 2) * 100) / 100;
                a = Math.round((b * (Math.random() * 8 + 2)) * 100) / 100;
                answer = Math.round((a / b) * 100) / 100;
                text = `${a} ÷ ${b}`;
                break;
        }

        return { text: `${text} = ?`, answer: answer };
    }

    // Export fungsi agar bisa dipanggil dari komponen parent
    export { generateDecimalQuestion };
</script>