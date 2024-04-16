const crypto = require('crypto');
const Benchmark = require('benchmark');

// Dữ liệu mẫu để mã hóa
const data = Buffer.from('Đây là dữ liệu mẫu để mã hóa Đây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóaĐây là dữ liệu mẫu để mã hóa');

// Các hàm mã hóa cho từng thuật toán
function encryptChacha20() {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('chacha20', key, iv, { authTagLength: 16 });
    cipher.update(data);
    ;
}

function encryptChacha20Poly1305() {
    const key = crypto.randomBytes(32);
    const nonce = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('chacha20-poly1305', key, nonce);
    cipher.setAAD(Buffer.alloc(0));
    cipher.update(data);
    cipher.final();
}

function encryptAES128GCM() {
    const key = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-gcm', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES192GCM() {
    const key = crypto.randomBytes(24);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-192-gcm', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES256GCM() {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES128CCM(data) {
    const key = crypto.randomBytes(16);
    const nonce = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-128-ccm', key, nonce, { authTagLength: 16 });
    cipher.setAAD(Buffer.alloc(0));
    cipher.update(data);
    const encrypted = Buffer.concat([cipher.final(), cipher.getAuthTag()]);

    return { key, nonce, encrypted };
}

function encryptAES192CCM(data) {
    const key = crypto.randomBytes(24);
    const nonce = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-192-ccm', key, nonce, { authTagLength: 16 });
    cipher.setAAD(Buffer.alloc(0));
    cipher.update(data);
    const encrypted = Buffer.concat([cipher.final(), cipher.getAuthTag()]);

    return { key, nonce, encrypted };
}

function encryptAES256CCM(data) {
    const key = crypto.randomBytes(32);
    const nonce = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-ccm', key, nonce, { authTagLength: 16 });
    cipher.setAAD(Buffer.alloc(0));
    cipher.update(data);
    const encrypted = Buffer.concat([cipher.final(), cipher.getAuthTag()]);

    return { key, nonce, encrypted };
}

function encryptAES128CTR() {
    const key = crypto.randomBytes(16);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-ctr', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES192CTR() {
    const key = crypto.randomBytes(24);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-192-ctr', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES256CTR() {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES128XTS() {
    const key = Buffer.concat([crypto.randomBytes(16), crypto.randomBytes(16)]); // Khóa dài 32 byte
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-xts', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES256XTS() {
    const key = Buffer.concat([crypto.randomBytes(32), crypto.randomBytes(32)]); // Khóa dài 64 byte
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-xts', key, iv);
    cipher.update(data);
    cipher.final();
}

function encryptAES128ECB() {
    const key = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    cipher.update(data);
    cipher.final('hex')
}

function encryptAES256ECB() {
    const key = crypto.randomBytes(32);
    const cipher = crypto.createCipheriv('aes-256-ecb', key, null);
    cipher.update(data);
    cipher.final('hex')
}

function encryptAES192ECB() {
    const key = crypto.randomBytes(24);
    const cipher = crypto.createCipheriv('aes-192-ecb', key, null);
    cipher.update(data);
    cipher.final('hex')
}

const suite = new Benchmark.Suite();

// suite.add('chacha20 encryption', encryptChacha20);
// suite.add('chacha20-poly1305 encryption', encryptChacha20Poly1305);
// suite.add('aes-128-gcm encryption', encryptAES128GCM);
// suite.add('aes-192-gcm encryption', encryptAES192GCM);
// suite.add('aes-256-gcm encryption', encryptAES256GCM);
// suite.add('aes-128-ccm encryption', encryptAES128CCM);
// suite.add('aes-192-ccm encryption', encryptAES192CCM);
// suite.add('aes-256-ccm encryption', encryptAES256CCM);
suite.add('aes-128-ctr encryption', encryptAES128CTR);
suite.add('aes-192-ctr encryption', encryptAES192CTR);
suite.add('aes-256-ctr encryption', encryptAES256CTR);
// suite.add('aes-128-xts encryption', encryptAES128XTS);
// suite.add('aes-256-xts encryption', encryptAES256XTS);
suite.add('aes-128-ecb encryption', encryptAES128ECB);
suite.add('aes-192-ecb encryption', encryptAES192ECB);
suite.add('aes-256-ecb encryption', encryptAES256ECB);

suite
    .on('cycle', event => {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ 'async': true });