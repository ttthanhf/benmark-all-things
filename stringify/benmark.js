const Benchmark = require("benchmark");
const fastJsonStringify = require("fast-json-stringify");
const { sjs, attr } = require("slow-json-stringify");
const compileJsonStringify = require("compile-json-stringify");
const stringify2 = require("json.stringify2");
const { createStringify } = require("./libs/tiny-json");
const { createStringifyCustom } = require("./my-libs/tiny-json-custom");
const fastStableStringify = require("fast-stable-stringify");
const fastJsonStableStringify = require("fast-json-stable-stringify");
const safeStableStringify = require("safe-stable-stringify");
const fastSafeStringify = require("fast-safe-stringify");
const stringify2SwitchCase = require("./my-libs/stringify2switchcase");

const data1 = {
  schema: {
    same: {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
        isStudent: { type: "boolean" },
      },
    },
    sjs: {
      name: attr("string"),
      age: attr("number"),
      isStudent: attr("boolean"),
    },
  },
  data: {
    name: "John Doe",
    age: 25,
    isStudent: true,
  },
};

const data2 = {
  schema: {
    same: {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
        isStudent: { type: "boolean" },
        address: {
          type: "object",
          properties: {
            street: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            zipCode: { type: "string" },
          },
        },
        phoneNumbers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              number: { type: "string" },
            },
          },
        },
        education: {
          type: "array",
          items: {
            type: "object",
            properties: {
              degree: { type: "string" },
              institution: { type: "string" },
              graduationYear: { type: "number" },
            },
          },
        },
      },
      required: [
        "name",
        "age",
        "isStudent",
        "address",
        "phoneNumbers",
        "education",
      ],
    },
    sjs: {
      name: attr("string"),
      age: attr("number"),
      isStudent: attr("boolean"),
      address: {
        street: attr("string"),
        city: attr("string"),
        state: attr("string"),
        zipCode: attr("string"),
      },
      phoneNumbers: attr("array", {
        type: attr("string"),
        number: attr("string"),
      }),
      education: attr("array", {
        degree: attr("string"),
        institution: attr("string"),
        graduationYear: attr("number"),
      }),
    },
  },
  data: {
    name: "John Doe",
    age: 30,
    isStudent: false,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    phoneNumbers: [
      {
        type: "home",
        number: "555-555-5555",
      },
      {
        type: "work",
        number: "555-555-5556",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science",
        institution: "Awesome University",
        graduationYear: 2015,
      },
      {
        degree: "Master of Business Administration",
        institution: "Great College",
        graduationYear: 2018,
      },
    ],
  },
};

const data3 = {
  schema: {
    same: {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "number" },
        isStudent: { type: "boolean" },
        address: {
          type: "object",
          properties: {
            street: { type: "string" },
            city: { type: "string" },
            state: { type: "string" },
            zipCode: { type: "string" },
          },
        },
        phoneNumbers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              number: { type: "string" },
            },
          },
        },
        education: {
          type: "array",
          items: {
            type: "object",
            properties: {
              degree: { type: "string" },
              institution: { type: "string" },
              graduationYear: { type: "number" },
            },
          },
        },
      },
    },
    sjs: {
      name: attr("string"),
      age: attr("number"),
      isStudent: attr("boolean"),
      address: {
        street: attr("string"),
        city: attr("string"),
        state: attr("string"),
        zipCode: attr("string"),
      },
      phoneNumbers: attr("array", {
        type: attr("string"),
        number: attr("string"),
      }),
      education: attr("array", {
        degree: attr("string"),
        institution: attr("string"),
        graduationYear: attr("number"),
      }),
    },
  },
  data: {
    name: "John Doe",
    age: 30,
    isStudent: false,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
    },
    phoneNumbers: [
      {
        type: "home",
        number: "555-555-5555",
      },
      {
        type: "work",
        number: "555-555-5556",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science",
        institution: "Awesome University",
        graduationYear: 2015,
      },
      {
        degree: "Master of Business Administration",
        institution: "Great College",
        graduationYear: 2018,
      },
    ],
  },
};

const sameSchema = data1.schema.same;
const sjsSchema = data1.schema.sjs;
const data = data1.data;

// const fastStringify = fastJsonStringify(sameSchema);
// const tinyStringify = createStringify(sameSchema)
// const tinyCustomStringify = createStringifyCustom(sameSchema);
// const compileStringify = compileJsonStringify(sameSchema);

// const slowStringify = sjs(sjsSchema);

// console.log(tinyStringify(data))
// console.log(tinyCustomStringify(data))
// console.log(stringify2(data))
// console.log(fastStringify(data))
// console.log(slowStringify(data))
// console.log(compileStringify(data))
// console.log(JSON.stringify(data))

// console.log(JSON.stringify(data) == tinyStringify(data))
// console.log(JSON.stringify(data) == tinyCustomStringify(data))
// console.log(JSON.stringify(data) == stringify2(data))
// console.log(JSON.stringify(data) == fastStringify(data))
// console.log(JSON.stringify(data) == slowStringify(data))
// console.log(JSON.stringify(data) == compileStringify(data))
// console.log(JSON.stringify(data) == JSON.stringify(data))
const suite = new Benchmark.Suite();

// Thêm các trường hợp cần benchmark
suite
  // .add("fast-safe-stringify", () => {
  //   fastSafeStringify(data);
  // })
  // .add("safe-stable-stringify", () => {
  //   safeStableStringify(data);
  // })
  // .add("fast-json-stable-stringify", () => {
  //   fastJsonStableStringify(data);
  // })
  // .add("fast-stable-stringify", () => {
  //   fastStableStringify(data);
  // })
  // .add("tiny-json", () => {
  //   tinyStringify(data);
  // })
  // .add("tiny-json-custom", () => {
  //   tinyCustomStringify(data);
  // })
  // .add("compile-json-stringify", () => {
  //   compileStringify(data);
  // })
  // .add("fast-json-stringify", () => {
  //   fastStringify(data);
  // })
  // .add("slow-json-stringify", () => {
  //   slowStringify(data);
  // })
  .add("JSON.stringify2", () => {
    stringify2(data);
  })
  .add("JSON.stringify2SwitchCase", () => {
    stringify2SwitchCase(data);
  })
  // .add("JSON.stringify", () => {
  //   JSON.stringify(data);
  // })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
