<script>
    export const level = 1; // Default level for external reference

    function generateDecimalQuestion() {
        const scenarios = ['add', 'subtract', 'multiply'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let a, b, answer, text;

        switch (scenario) {
            case 'add':
                // Gunakan angka desimal sangat sederhana
                a = Math.round((Math.random() * 3 + 1) * 10) / 10; // 1.0 - 3.9
                b = Math.round((Math.random() * 3 + 1) * 10) / 10; // 1.0 - 3.9
                answer = Math.round((a + b) * 10) / 10;
                text = `${a} + ${b}`;
                break;
            case 'subtract':
                // Pastikan a > b untuk hasil positif, angka kecil
                a = Math.round((Math.random() * 4 + 3) * 10) / 10; // 3.0 - 6.9
                b = Math.round((Math.random() * 2 + 1) * 10) / 10; // 1.0 - 2.9
                answer = Math.round((a - b) * 10) / 10;
                text = `${a} - ${b}`;
                break;
            case 'multiply':
                // Gunakan angka sangat kecil untuk perkalian
                a = Math.round((Math.random() * 2 + 1) * 10) / 10; // 1.0 - 2.9
                b = [2, 3][Math.floor(Math.random() * 2)]; // Hanya 2 atau 3
                answer = Math.round((a * b) * 10) / 10;
                text = `${a} × ${b}`;
                break;
        }

        return { text: `${text} = ?`, answer: answer };
    }

    // Export fungsi agar bisa dipanggil dari komponen parent
    export { generateDecimalQuestion };
</script>