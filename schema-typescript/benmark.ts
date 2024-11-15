import { TypeOf, v } from "suretype";
import * as st from "simple-runtypes";
import mz, { Infer } from "myzod";
import * as vlb from "valibot";
import { Type, type Static } from "@sinclair/typebox";
import * as ct from "computed-types";
import { s, InferType } from "@sapphire/shapeshift";

const suretype = v.object({
  firstName: v.string().required(),
  lastName: v.string(),
  age: v.number().gte(21),
});

type SureType = TypeOf<typeof suretype>;

//----------

const simpleRuntypes = st.record({
  firstName: st.string(),
  lastName: st.optional(st.string()),
  age: st.number(),
});

type SimpleRuntypes = ReturnType<typeof simpleRuntypes>;

//------------

const myzod = mz.object({
  firstName: mz.string(),
  lastName: mz.string().optional(),
  age: mz.number(),
});

type MyZod = Infer<typeof myzod>;

//--------

const valibot = vlb.object({
  firstName: vlb.string(),
  lastName: vlb.optional(vlb.string()),
  age: vlb.number(),
});

type Valibot = vlb.InferOutput<typeof valibot>;

//-----------

const typebox = Type.Object({
  firstName: Type.String(),
  lastName: Type.Optional(Type.String()),
  age: Type.Number(),
});

type TypeBox = Static<typeof typebox>;

//-----------

const computedStyle = ct.Schema({
  firstName: ct.string,
  lastName: ct.string.optional(),
  age: ct.number,
});

type ComputedStyle = ct.Type<typeof computedStyle>;

//------------

const shapeshift = s.object({
  firstName: s.string(),
  lastName: s.string().optional(),
  age: s.number(),
});

type ShapeShift = InferType<typeof shapeshift>;
