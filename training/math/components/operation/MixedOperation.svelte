<script>
    export let level;

    export function generateMixedQuestion() {
        let maxMult;
        switch (level) {
            case 'tk': maxMult = 3; break;
            case '1': maxMult = 5; break;
            case '2': maxMult = 10; break;
            case '3': maxMult = 12; break;
            case '4': maxMult = 15; break;
        }

        const templates = ['(a+b)*c', 'a*(b+c)', '(a*b)+c', 'a+(b*c)', '(a-b)*c', 'a*(b-c)', 'c*(a-b)', '(a*b)-c', 'a-(b*c)'];
        if (level === '4') {
            templates.push('a/(b-c)', '(a+b)/c');
        }
        const template = templates[Math.floor(Math.random() * templates.length)];

        let a = Math.floor(Math.random() * maxMult) + 1;
        let b = Math.floor(Math.random() * maxMult) + 1;
        let c = Math.floor(Math.random() * maxMult) + (level === '3' ? 1 : 2);
        let answer, text;

        switch (template) {
            case '(a+b)*c':
                answer = (a+b)*c;
                text = `(${a} + ${b}) × ${c}`;
                break;
            case 'a*(b+c)':
                answer = a*(b+c);
                text = `${a} × (${b} + ${c})`;
                break;
            case '(a*b)+c':
                answer = (a*b)+c;
                text = `(${a} × ${b}) + ${c}`;
                break;
            case 'a+(b*c)':
                answer = a+(b*c);
                text = `${a} + (${b} × ${c})`;
                break;
            case '(a-b)*c':
                if (a <= b) { [a, b] = [b, a]; if (a===b) a++; }
                answer = (a-b)*c;
                text = `(${a} − ${b}) × ${c}`;
                break;
            case 'a*(b-c)':
                if (b <= c) { [b, c] = [c, b]; if (b===c) b++; }
                answer = a*(b-c);
                text = `${a} × (${b} − ${c})`;
                break;
            case 'c*(a-b)':
                if (a <= b) { [a, b] = [b, a]; if (a===b) a++; }
                answer = c*(a-b);
                text = `${c} × (${a} − ${b})`;
                break;
            case '(a*b)-c':
                if ((a*b) <= c) { a = c + 1; b = 1; }
                answer = (a*b)-c;
                text = `(${a} × ${b}) − ${c}`;
                break;
            case 'a-(b*c)':
                if (a <= (b*c)) { a = (b*c) + Math.floor(Math.random()*5)+1; }
                answer = a-(b*c);
                text = `${a} − (${b} × ${c})`;
                break;
            case 'a/(b-c)':
                if (b <= c) { [b, c] = [c, b]; if (b===c) b++; }
                let subResult = b-c;
                a = subResult * (Math.floor(Math.random()*5)+1);
                answer = a / subResult;
                text = `${a} ÷ (${b} − ${c})`;
                break;
            case '(a+b)/c':
                let addResult = a+b;
                c = [2,3,4,5].filter(n => addResult % n === 0)[0] || 2;
                if (!c || addResult % c !== 0) { a=6; b=4; c=2; }
                answer = (a+b)/c;
                text = `(${a} + ${b}) ÷ ${c}`;
                break;
        }

        return { text: `${text} = ?`, answer: answer };
    }
</script>