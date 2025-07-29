<script>
    export let level;

    export function generateMultiplicationQuestion() {
        let a, b, maxMult;

        // Set maximum multiplier based on level
        switch (level) {
            case 'tk': maxMult = 3; break;
            case '1': maxMult = 5; break;
            case '2': maxMult = 10; break;
            case '3': maxMult = 12; break;
            case '4': maxMult = 15; break;
        }

        a = Math.floor(Math.random() * maxMult) + 1;
        b = Math.floor(Math.random() * maxMult) + (level === 'tk' ? 0 : 1);

        const answer = a * b;
        const text = `${a} × ${b} = ?`;

        return { text, answer };
    }
</script>