<script>
    export const level = 1; // Default level for external reference

    export function generateFractionQuestion() {
        const scenarios = ['simple_decimal', 'easy_add', 'basic_convert'];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        let answer, text;

        switch (scenario) {
            case 'simple_decimal':
                // Pecahan paling sederhana ke desimal
                const verySimpleFractions = [
                    { num: 1, den: 2, result: 0.5 },
                    { num: 1, den: 4, result: 0.25 },
                    { num: 3, den: 4, result: 0.75 },
                    { num: 1, den: 5, result: 0.2 },
                    { num: 2, den: 5, result: 0.4 },
                    { num: 1, den: 10, result: 0.1 },
                    { num: 2, den: 10, result: 0.2 },
                    { num: 3, den: 10, result: 0.3 }
                ];
                const fraction = verySimpleFractions[Math.floor(Math.random() * verySimpleFractions.length)];
                answer = fraction.result;
                text = `${fraction.num}/${fraction.den}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };

            case 'easy_add':
                // Penjumlahan pecahan dengan penyebut sama, angka kecil
                const denominator = [2, 4, 5][Math.floor(Math.random() * 3)];
                let num1, num2;

                if (denominator === 2) {
                    num1 = 1;
                    num2 = 1;
                } else if (denominator === 4) {
                    num1 = [1, 2][Math.floor(Math.random() * 2)];
                    num2 = [1, 2][Math.floor(Math.random() * 2)];
                } else { // denominator === 5
                    num1 = [1, 2][Math.floor(Math.random() * 2)];
                    num2 = [1, 2][Math.floor(Math.random() * 2)];
                }

                answer = Math.round(((num1 + num2) / denominator) * 100) / 100;
                text = `${num1}/${denominator} + ${num2}/${denominator}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };

            case 'basic_convert':
                // Pecahan campuran sangat sederhana
                const whole = 1; // Hanya bilangan bulat 1
                const veryEasyFractions = [
                    { num: 1, den: 2, val: 0.5 },
                    { num: 1, den: 4, val: 0.25 },
                    { num: 1, den: 5, val: 0.2 }
                ];
                const frac = veryEasyFractions[Math.floor(Math.random() * veryEasyFractions.length)];
                answer = whole + frac.val;
                text = `${whole} ${frac.num}/${frac.den}`;
                return { text: `${text} = ? (dalam desimal)`, answer: answer };
        }
    }
</script>