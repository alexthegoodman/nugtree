import { makeSchema, asNexusMethod } from "nexus";
import { join } from "path";
import { DateTimeResolver, JSONResolver } from "graphql-scalars";
import { applyMiddleware } from "graphql-middleware";

const jsonScalar = asNexusMethod(JSONResolver, "json");
const dateTimeScalar = asNexusMethod(DateTimeResolver, "date");

import * as types from "./graphql";
import { permissions } from "./permissions";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

export const schema = makeSchema({
  types: [types, jsonScalar, dateTimeScalar],
  outputs: {
    typegen: join(__dirname, "../../", "nexus-typegen.ts"),
    schema: join(__dirname, "../../server/", "schema.graphql"),
  },
});

export const protectedSchema = applyMiddleware(schema, permissions);
