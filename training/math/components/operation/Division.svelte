<script>
    export let level;

    export function generateDivisionQuestion() {
        let maxDiv;
        switch (level) {
            case 'tk': maxDiv = 3; break;
            case '1': maxDiv = 5; break;
            case '2': maxDiv = 10; break;
            case '3': maxDiv = 12; break;
            case '4': maxDiv = 15; break;
        }

        // Generate division problem
        let b = Math.floor(Math.random() * (maxDiv - 1)) + 2; // divisor (2 to maxDiv)
        let temp = Math.floor(Math.random() * maxDiv) + 1; // quotient (1 to maxDiv)
        let a = b * temp; // dividend (ensures clean division)
        let answer = temp; // the quotient is the answer

        return {
            text: `${a} ÷ ${b} = ?`,
            answer: answer
        };
    }
</script>