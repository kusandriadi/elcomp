<script>
    export let level;

    export function generatePercentageQuestion() {
        const scenarios = ['basic', 'of', 'increase', 'decrease'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let a, b, answer, text;

        switch (scenario) {
            case 'basic':
                a = [10, 20, 25, 50, 75].filter(() => Math.random() > 0.5)[0] || 25;
                b = Math.floor(Math.random() * 100) + 1;
                answer = Math.round((a / 100) * b * 100) / 100; // Allow decimal answer
                text = `${a}% dari ${b}`;
                break;
            case 'of':
                a = Math.floor(Math.random() * 99) + 1;
                b = Math.floor(Math.random() * 80) + 20;
                answer = Math.round((a / 100) * b * 100) / 100; // Allow decimal answer
                text = `${a}% dari ${b}`;
                break;
            case 'increase':
                a = Math.floor(Math.random() * 50) + 10;
                b = Math.floor(Math.random() * 30) + 10;
                answer = Math.round(a * (1 + b/100) * 100) / 100; // Allow decimal answer
                text = `${a} naik ${b}%`;
                break;
            case 'decrease':
                a = Math.floor(Math.random() * 50) + 30;
                b = Math.floor(Math.random() * 25) + 10;
                answer = Math.round(a * (1 - b/100) * 100) / 100; // Allow decimal answer
                text = `${a} turun ${b}%`;
                break;
        }
        
        return { text: `${text} = ?`, answer: answer };
    }
</script>