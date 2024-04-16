const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

// Tạo một mảng lớn với 1 triệu phần tử
const array = Array.from({ length: 10 }, (_, i) => i);

// Thêm các test case vào suite
suite
    .add('for...in', function () {
        let sum = 0;
        for (let i in array) {
            sum += array[i];
        }
    })
    .add('forEach', function () {
        let sum = 0;
        array.forEach(function (value) {
            sum += value;
        });
    })
    .add('for', function () {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
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