function xorEncodeDecodeText(string, key) {
  const bufferKey = Buffer.from(key);
  const textBuffer = Buffer.from(string, "utf8");
  const result = Buffer.allocUnsafe(textBuffer.length);
  for (let i = 0; i < textBuffer.length; i++) {
    result[i] = textBuffer[i] ^ bufferKey[i % bufferKey.length];
  }
  return result;
}
const data = "Hello, World!";
const encode = xorEncodeDecodeText(data, "123");
console.log(encode.toString("base64"));
const decode = xorEncodeDecodeText(encode, "123");
console.log(decode.toString());
