<script>
    export let level;

    export function generateFractionQuestion() {
        const scenarios = ['simple_decimal', 'easy_add', 'basic_convert'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let answer, text;

        switch (scenario) {
            case 'simple_decimal':
                // Pecahan sederhana ke desimal
                const simpleFractions = [
                    { num: 1, den: 2, result: 0.5 },
                    { num: 1, den: 4, result: 0.25 },
                    { num: 3, den: 4, result: 0.75 },
                    { num: 1, den: 5, result: 0.2 },
                    { num: 2, den: 5, result: 0.4 },
                    { num: 3, den: 5, result: 0.6 },
                    { num: 4, den: 5, result: 0.8 },
                    { num: 1, den: 10, result: 0.1 },
                    { num: 3, den: 10, result: 0.3 }
                ];
                const fraction = simpleFractions[Math.floor(Math.random() * simpleFractions.length)];
                answer = fraction.result;
                text = `${fraction.num}/${fraction.den}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };

            case 'easy_add':
                // Penjumlahan pecahan dengan penyebut sama
                const denominator = [2, 4, 5, 10][Math.floor(Math.random() * 4)];
                const num1 = Math.floor(Math.random() * (denominator - 1)) + 1;
                const num2 = Math.floor(Math.random() * (denominator - num1)) + 1;
                answer = Math.round(((num1 + num2) / denominator) * 100) / 100;
                text = `${num1}/${denominator} + ${num2}/${denominator}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };

            case 'basic_convert':
                // Pecahan campuran sederhana
                const whole = [1, 2][Math.floor(Math.random() * 2)];
                const easyFractions = [
                    { num: 1, den: 2, val: 0.5 },
                    { num: 1, den: 4, val: 0.25 },
                    { num: 3, den: 4, val: 0.75 },
                    { num: 1, den: 5, val: 0.2 }
                ];
                const frac = easyFractions[Math.floor(Math.random() * easyFractions.length)];
                answer = whole + frac.val;
                text = `${whole} ${frac.num}/${frac.den}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
        }
    }
</script>