const crypto = require("crypto");
const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

// Dữ liệu cần mã hóa
const data = "Hello, World!";

// XOR Encoding/Decoding
function xorEncodeDecodeText(text, key) {
  const textBuffer = Buffer.from(text, "utf8");
  const result = Buffer.allocUnsafe(textBuffer.length);

  for (let i = 0; i < textBuffer.length; i++) {
    result[i] = textBuffer[i] ^ key[i % key.length];
  }

  return result;
}

const xorKey = Buffer.from("1", "utf8");

// Base16 Encoding/Decoding
function base16EncodeDecode(text) {
  const encoded = Buffer.from(text, "utf8").toString("hex");
  return Buffer.from(encoded, "hex").toString("utf8");
}

// Base64 Encoding/Decoding
function base64EncodeDecode(text) {
  const encoded = Buffer.from(text, "utf8").toString("base64");
  return Buffer.from(encoded, "base64").toString("utf8");
}

// Thêm các bài kiểm tra vào Suite
suite
  .add("XOR Encoding", function () {
    console.log(xorEncodeDecodeText(data, xorKey));
  })
  .add("XOR Decoding", function () {
    xorEncodeDecodeText(xorEncodeDecodeText(data, xorKey), xorKey);
  })
  .add("Base16 Encoding", function () {
    base16EncodeDecode(data);
  })
  .add("Base16 Decoding", function () {
    base16EncodeDecode(data);
  })
  .add("Base64 Encoding", function () {
    base64EncodeDecode(data);
  })
  .add("Base64 Decoding", function () {
    base64EncodeDecode(data);
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
