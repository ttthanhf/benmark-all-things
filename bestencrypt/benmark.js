const crypto = require("crypto");
const Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

// Dữ liệu và khóa mẫu
const data = Buffer.from(
  "Đây là dữ liệu mẫu để mã hóa và giải mã".repeat(1000)
);
const key256 = crypto.randomBytes(32);
const nonce = crypto.randomBytes(12);

// Hàm mã hóa
function encrypt(algorithm, key, nonce, data) {
  const cipher = crypto.createCipheriv(algorithm, key, nonce);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  let tag;
  if (algorithm.includes("gcm") || algorithm.includes("ocb")) {
    tag = cipher.getAuthTag();
  }

  return { encrypted, tag };
}

// Hàm giải mã
function decrypt(algorithm, key, nonce, encryptedData, tag) {
  const decipher = crypto.createDecipheriv(algorithm, key, nonce);
  if (tag) decipher.setAuthTag(tag);
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted;
}

// Benchmark AES-256-GCM
suite
  .add("AES-256-GCM Encrypt", function () {
    encrypt("aes-256-gcm", key256, nonce, data);
  })
  .add("AES-256-GCM Decrypt", function () {
    const { encrypted, tag } = encrypt("aes-256-gcm", key256, nonce, data);
    decrypt("aes-256-gcm", key256, nonce, encrypted, tag);
  })

  // Benchmark AES-256-OCB
  .add("AES-256-OCB Encrypt", function () {
    encrypt("aes-256-ocb", key256, nonce, data);
  })
  .add("AES-256-OCB Decrypt", function () {
    const { encrypted, tag } = encrypt("aes-256-ocb", key256, nonce, data);
    decrypt("aes-256-ocb", key256, nonce, encrypted, tag);
  })

  // Chạy benchmark và in kết quả
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Benchmark hoàn thành");
    console.log("Nhanh nhất là " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
