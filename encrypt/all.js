const crypto = require('crypto');
const Benchmark = require('benchmark');

// Dữ liệu mẫu để mã hóa
const data = Buffer.from('a')
function encryptData(cipher, key, iv) {
    const encrypt = crypto.createCipheriv(cipher, key, iv);
    let encrypted = encrypt.update(data);
    encrypted = Buffer.concat([encrypted, encrypt.final()]);
    // return encrypted;

    const decipher = crypto.createDecipheriv(cipher, key, iv);
    let decrypted = decipher.update(encrypted);
    try {
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return {
            encryptedData: encrypted,
            decryptedData: decrypted
        };
    } catch (err) {
        return {
            encryptedData: encrypted,
            decryptedData: null
        };
    }
}

const suite = new Benchmark.Suite;
const ciphers = crypto.getCiphers();
for (const cipher of ciphers) {
    if (cipher.startsWith('aes-') && (cipher.endsWith('ecb') || cipher.endsWith('ctr')) && !cipher.includes('hmac') && !cipher.endsWith('ccm') && !cipher.endsWith('xts') && !cipher.endsWith('ocb')) {
        let bitlen = cipher.split('-')[1]
        let byteivlen = 16;
        let bytelen = null;

        if (bitlen == '256') {
            bytelen = 32;
        }
        else if (bitlen == '192') {
            bytelen = 24;
        }
        else if (bitlen == '128') {
            bytelen = 16;
        }

        let iv = crypto.randomBytes(byteivlen);
        if (cipher.endsWith('ecb')) {
            iv = null;
        }
        let key = crypto.randomBytes(bytelen);
        suite.add(cipher, function () {

            encryptData(cipher, key, iv);
        });
    }
}

suite
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });