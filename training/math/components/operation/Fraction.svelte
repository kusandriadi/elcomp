<script>
    export let level;

    export function generateFractionQuestion() {
        const scenarios = ['add', 'subtract', 'multiply', 'convert', 'decimal'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let a, b, answer, text;

        switch (scenario) {
            case 'add':
                const denom = [2, 3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 7)];
                a = Math.floor(Math.random() * (denom - 1)) + 1;
                b = Math.floor(Math.random() * (denom - a)) + 1;
                answer = Math.round(((a + b) / denom) * 1000) / 1000; // Convert to decimal
                text = `${a}/${denom} + ${b}/${denom}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
            case 'subtract':
                const denom2 = [2, 3, 4, 5, 6, 8, 10][Math.floor(Math.random() * 7)];
                a = Math.floor(Math.random() * (denom2 - 2)) + 3;
                b = Math.floor(Math.random() * (a - 1)) + 1;
                answer = Math.round(((a - b) / denom2) * 1000) / 1000; // Convert to decimal
                text = `${a}/${denom2} - ${b}/${denom2}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
            case 'multiply':
                a = Math.floor(Math.random() * 5) + 1;
                const denom3 = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
                b = Math.floor(Math.random() * 4) + 1;
                answer = Math.round((a * b / denom3) * 1000) / 1000; // Convert to decimal
                text = `${a} × ${b}/${denom3}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
            case 'convert':
                const whole = Math.floor(Math.random() * 5) + 1;
                const denom4 = [2, 4, 5, 8, 10][Math.floor(Math.random() * 5)];
                const numerator = Math.floor(Math.random() * denom4) + 1;
                answer = Math.round((whole + numerator / denom4) * 1000) / 1000; // Convert to decimal
                text = `${whole} ${numerator}/${denom4}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
            case 'decimal':
                const denom5 = [2, 4, 5, 8, 10][Math.floor(Math.random() * 5)];
                const num5 = Math.floor(Math.random() * denom5) + 1;
                answer = Math.round((num5 / denom5) * 1000) / 1000;
                text = `${num5}/${denom5}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
        }
    }
</script>