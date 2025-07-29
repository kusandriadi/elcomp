<script>
    export let level;

    export function generatePercentageQuestion() {
        // Gunakan persentase yang sangat mudah dan bilangan sangat kecil
        const veryEasyPercentages = [10, 20, 50];
        const verySmallNumbers = [4, 5, 6, 8, 10, 12];

        const scenario = Math.random() > 0.5 ? 'basic' : 'simple';

        let a, b, answer, text;

        switch (scenario) {
            case 'basic':
                // Gunakan persentase mudah dengan angka sangat kecil
                a = veryEasyPercentages[Math.floor(Math.random() * veryEasyPercentages.length)];
                b = verySmallNumbers[Math.floor(Math.random() * verySmallNumbers.length)];
                answer = (a / 100) * b;
                text = `${a}% dari ${b}`;
                break;
            case 'simple':
                // Persentase sederhana dengan angka yang sangat kecil
                a = [10, 20, 50][Math.floor(Math.random() * 3)];
                b = [4, 5, 6, 8, 10][Math.floor(Math.random() * 5)];
                answer = (a / 100) * b;
                text = `${a}% dari ${b}`;
                break;
        }

        // Pastikan jawaban adalah bilangan bulat atau maksimal 1 desimal
        answer = Math.round(answer * 10) / 10;

        return { text: `${text} = ?`, answer: answer };
    }
</script>