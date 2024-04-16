const Benchmark = require('benchmark');
const jsonc = require('jsonc');
const ujson = require('ujson');
const fastJsonParse = require('fast-json-parse')

const data = JSON.stringify({
    thisisme: {
        hello: "asdas"
    }
})

console.log(JSON.parse(data))
console.log(jsonc.parse(data))
console.log(fastJsonParse(data))


const suite = new Benchmark.Suite();
suite
    .add('JSONparse', () => {
        JSON.parse(data);
    })
    .add('JSON.c', () => {
        jsonc.parse(data);
    })
    .add('ujson', () => {
        ujson.parse(data);
    })
    .add('fastJsonParse', () => {
        fastJsonParse(data);
    })
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ 'async': true });