<script>
    export let level;

    export function generatePercentageQuestion() {
        // Gunakan persentase yang mudah dan bilangan bulat kecil
        const easyPercentages = [10, 20, 25, 50, 75];
        const smallNumbers = [10, 20, 40, 50, 100];

        const scenario = Math.random() > 0.5 ? 'basic' : 'simple';

        let a, b, answer, text;

        switch (scenario) {
            case 'basic':
                // Gunakan persentase mudah dengan angka kecil
                a = easyPercentages[Math.floor(Math.random() * easyPercentages.length)];
                b = smallNumbers[Math.floor(Math.random() * smallNumbers.length)];
                answer = (a / 100) * b;
                text = `${a}% dari ${b}`;
                break;
            case 'simple':
                // Persentase sederhana dengan angka yang lebih kecil
                a = [10, 20, 50][Math.floor(Math.random() * 3)];
                b = [10, 20, 30, 40, 50][Math.floor(Math.random() * 5)];
                answer = (a / 100) * b;
                text = `${a}% dari ${b}`;
                break;
        }

        // Pastikan jawaban adalah bilangan bulat atau maksimal 1 desimal
        answer = Math.round(answer * 10) / 10;

        return { text: `${text} = ?`, answer: answer };
    }
</script>