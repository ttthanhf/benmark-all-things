const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const longStr = 'a'.repeat(100000);

// Thêm các test case vào suite
suite
    .add('Concatenation', function () {
        let result = '';
        for (let i = 0; i < 1000; i++) {
            result += longStr;
        }
    })
    .add('Array Join', function () {
        const parts = [];
        for (let i = 0; i < 1000; i++) {
            parts.push(longStr);
        }
        const result = parts.join('');
    })
    .add('String Concat', function () {
        let result = '';
        for (let i = 0; i < 1000; i++) {
            result = result.concat(longStr);
        }
    })
    .add('Template Literal', function () {
        let result = '';
        for (let i = 0; i < 1000; i++) {
            result = `${result}${longStr}`;
        }
    })
    // Thêm các tùy chọn cho quá trình benchmark
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // Chạy benchmark
    .run({ 'async': true });