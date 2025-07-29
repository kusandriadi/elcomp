<script>
    export let level;

    export function generateSubtractionQuestion() {
        let maxNum;
        switch (level) {
            case 'tk': maxNum = 10; break;
            case '1': maxNum = 20; break;
            case '2': maxNum = 50; break;
            case '3': maxNum = 100; break;
            case '4': maxNum = 200; break;
            default: maxNum = 50; break;
        }

        const a = Math.floor(Math.random() * maxNum) + 1;
        const b = Math.floor(Math.random() * a); // Pastikan b <= a untuk menghindari hasil negatif
        const answer = a - b;
        const text = `${a} − ${b} = ?`;

        return { text, answer };
    }

</script>