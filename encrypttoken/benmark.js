const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const fastjwt = require("fast-jwt");
const jwt = require("jsonwebtoken");
const { V4, V3, V1 } = require("paseto");
const crypto = require("crypto");

const payload = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
};

const SECRET_KEY = crypto.randomBytes(32);
let { privateKeyPaseto, publicKeyPaseto, privateKeyJWT, publicKeyJWT } = "";

(async () => {
  crypto.generateKeyPair(
    "ed25519",
    {
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    },
    (err, puk, prk) => {
      privateKeyPaseto = prk;
      publicKeyPaseto = puk;
      crypto.generateKeyPair(
        "ec",
        {
          namedCurve: "P-384",
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        },
        (err, puk, prk) => {
          privateKeyJWT = prk;
          publicKeyJWT = puk;
          privateKeyPaseto = privateKeyJWT;
          publicKeyPaseto = publicKeyJWT;
          run();
        }
      );
    }
  );
})();

function run() {
  suite
    .add("JWT Sign HS256", function () {
      jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
    })
    .add("JWT Verify HS256", function () {
      const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256" });
      jwt.verify(token, SECRET_KEY);
    })
    .add("Fast JWT Sign HS256", function () {
      const signSync = fastjwt.createSigner({
        key: SECRET_KEY,
        algorithm: "HS256",
      });
      signSync(payload);
    })
    .add("Fast JWT Verify HS256", function () {
      const signSync = fastjwt.createSigner({
        key: SECRET_KEY,
        algorithm: "HS256",
      });
      const token = signSync(payload);
      const verifySync = fastjwt.createVerifier({
        key: SECRET_KEY,
        algorithm: "HS256",
      });
      verifySync(token);
    })
    // .add("JWT Sign HS384", function () {
    //   jwt.sign(payload, SECRET_KEY, { algorithm: "HS384" });
    // })
    // .add("JWT Verify HS384", function () {
    //   const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS384" });
    //   jwt.verify(token, SECRET_KEY);
    // })
    // .add("JWT Sign ES384", function () {
    //   jwt.sign(payload, privateKeyJWT, { algorithm: "ES384" });
    // })
    // .add("JWT Verify ES384", function () {
    //   const token = jwt.sign(payload, privateKeyJWT, { algorithm: "ES384" });
    //   jwt.verify(token, publicKeyJWT, { algorithms: "ES384" });
    // })
    // .add("PASETO PUBLIC v3 Sign", {
    //   defer: true,
    //   fn: function (deferred) {
    //     V3.sign(payload, privateKeyPaseto).then(() => deferred.resolve());
    //   },
    // })
    // .add("PASETO PUBLIC v3 Verify", {
    //   defer: true,
    //   fn: function (deferred) {
    //     V3.sign(payload, privateKeyPaseto)
    //       .then((token) => V3.verify(token, publicKeyPaseto))
    //       .then(() => deferred.resolve());
    //   },
    // })
    // .add("PASETO LOCAL v3 Sign", {
    //   defer: true,
    //   fn: function (deferred) {
    //     V3.encrypt(payload, SECRET_KEY).then(() => deferred.resolve());
    //   },
    // })
    // .add("PASETO LOCAL v3 Verify", {
    //   defer: true,
    //   fn: function (deferred) {
    //     V3.encrypt(payload, SECRET_KEY)
    //       .then((token) => V3.decrypt(token, SECRET_KEY))
    //       .then(() => deferred.resolve());
    //   },
    // })
    .add("PASETO LOCAL v1 Encrypt", {
      defer: true,
      fn: function (deferred) {
        V1.encrypt(payload, SECRET_KEY).then(() => deferred.resolve());
      },
    })
    .add("PASETO LOCAL v1 Decrypt", {
      defer: true,
      fn: function (deferred) {
        V1.encrypt(payload, SECRET_KEY)
          .then((token) => V1.decrypt(token, SECRET_KEY))
          .then(() => deferred.resolve());
      },
    })
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    .run({ async: true });
}
