const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

// Tạo một đối tượng lớn với 1 triệu phần tử
const properties = {};
for (let i = 0; i < 10; i++) {
    properties[`key_${i}`] = i;
}

const keys = Object.keys(properties);
const cur = 'path';
let fullPath, exp;

// Thêm các test case vào suite
suite
    .add('for...in', function () {
        exp = '';
        for (const key in properties) {
            fullPath = `${cur}.${key}`;
            exp += genStringify(key, properties[key]);
        }
    })
    .add('for index', function () {
        exp = '';
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            fullPath = `${cur}.${key}`;
            exp += genStringify(key, properties[key]);
        }
    })
    .add('forEach', function () {
        exp = '';
        keys.forEach(function (key) {
            fullPath = `${cur}.${key}`;
            exp += genStringify(key, properties[key]);
        });
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

// Hàm giả lập genStringify
function genStringify(key, value) {
    return `${key}:${value}`;
}