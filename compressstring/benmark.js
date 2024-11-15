const fs = require("fs");
const zlib = require("zlib");
const pako = require("pako");
const LZString = require("lz-string");
const snappy = require("snappy");
const lz4 = require("lz4");
const SnappyJS = require("snappyjs");

function measureTime(func) {
  const start = process.hrtime();
  func();
  const end = process.hrtime(start);
  return end[0] * 1000 + end[1] / 1000000;
}

function compareStrings(str1, str2) {
  return str1 === str2;
}

function formatBytes(bytes, fixed) {
  if (bytes === 0) return "0 B";

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return `${(bytes / Math.pow(1024, i)).toFixed(fixed)} ${sizes[i]}`;
}

async function measurePerformance(algorithm, data) {
  let compressed, decompressed;
  let compressionTime, decompressionTime, compressionRatio, isMatch;

  compressionTime = measureTime(() => {
    switch (algorithm) {
      case "zlib deflateSync":
        compressed = zlib.deflateSync(data);
        break;
      case "zlib gzipSync":
        compressed = zlib.gzipSync(data);
        break;
      case "zlib brotliCompressSync":
        compressed = zlib.brotliCompressSync(data);
        break;
      case "pako":
        compressed = pako.deflate(data);
        break;
      case "lz-string":
        compressed = LZString.compress(data);
        break;
      case "snappy":
        compressed = snappy.compressSync(data);
        break;
      case "snappyJS":
        compressed = SnappyJS.compress(Buffer.from(data, "utf8"));
        break;
      case "lz4":
        const inputBuffer = Buffer.from(data, "utf8");
        const outputBuffer = Buffer.alloc(lz4.encodeBound(inputBuffer.length));
        const compressedSize = lz4.encodeBlock(inputBuffer, outputBuffer);
        compressed = outputBuffer.slice(0, compressedSize);
        break;
    }
  });
  decompressionTime = measureTime(() => {
    switch (algorithm) {
      case "zlib deflateSync":
        decompressed = zlib.inflateSync(compressed).toString("utf8");
        break;
      case "zlib gzipSync":
        decompressed = zlib.gunzipSync(compressed).toString();
        break;
      case "zlib brotliCompressSync":
        decompressed = zlib.brotliDecompressSync(compressed).toString();
        break;
      case "pako":
        decompressed = pako.inflate(compressed, { to: "string" });
        break;
      case "lz-string":
        decompressed = LZString.decompress(compressed);
        break;
      case "snappy":
        decompressed = snappy.uncompressSync(compressed, { asBuffer: false });
        break;
      case "snappyJS":
        decompressed = SnappyJS.uncompress(compressed).toString();
        break;
      case "lz4":
        const decompressedBuffer = Buffer.alloc(data.length);
        lz4.decodeBlock(compressed, decompressedBuffer);
        decompressed = decompressedBuffer.toString("utf8");
        break;
    }
  });

  compressionRatio =
    (Buffer.byteLength(compressed, "utf8") / Buffer.byteLength(data, "utf8")) *
    100;

  isMatch = compareStrings(data, decompressed);

  const fixed = 3;
  const efficient =
    1 / Buffer.byteLength(compressed, "utf8") +
    1 / decompressionTime.toFixed(fixed) +
    1 / compressionTime.toFixed(fixed);

  return {
    Algorithm: algorithm,
    CompressionTime: Number(compressionTime.toFixed(fixed)),
    DecompressionTime: Number(decompressionTime.toFixed(fixed)),
    DeltaTime: Number(
      ((Number(decompressionTime) + Number(compressionTime)) / 2).toFixed(fixed)
    ),
    "Efficient(h)":
      Buffer.byteLength(compressed, "utf8") < Buffer.byteLength(data, "utf8")
        ? Number(efficient.toFixed(fixed))
        : -1,
    "CompressionRatio(%)(l)": Number(compressionRatio.toFixed(fixed)),
    CompressedSize: isMatch
      ? formatBytes(Buffer.byteLength(compressed, "utf8"), fixed)
      : formatBytes(Buffer.byteLength(decompressed, "utf8"), fixed),
    Original: formatBytes(Buffer.byteLength(data, "utf8"), fixed),
    Base64Size: formatBytes(
      Buffer.byteLength(compressed.toString("base64"), "utf8")
    ),
    IsMatch: isMatch,
  };
}

async function main() {
  const data = fs.readFileSync("./test.txt", "utf8");
  const results = [];

  // results.push(await measurePerformance("zlib deflateSync", data));
  results.push(await measurePerformance("zlib gzipSync", data));
  // results.push(await measurePerformance("zlib brotliCompressSync", data));
  // results.push(await measurePerformance("pako", data));
  // results.push(await measurePerformance("lz-string", data));
  results.push(await measurePerformance("snappy", data));
  // results.push(await measurePerformance("snappyJS", data));
  // results.push(await measurePerformance("lz4", data));

  console.table(results);
}

main().catch(console.error);
