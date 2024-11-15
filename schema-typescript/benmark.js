"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var suretype_1 = require("suretype");
var st = require("simple-runtypes");
var suretype = suretype_1.v.object({
    firstName: suretype_1.v.string().required(),
    lastName: suretype_1.v.string(),
    age: suretype_1.v.number().gte(21),
});
console.log(suretype);
//----------
var simpleRuntypes = st.record({
    firstName: st.string(),
    lastName: st.optional(st.string()),
    age: st.number(),
});
console.log(simpleRuntypes);
