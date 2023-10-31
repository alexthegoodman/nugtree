import { objectType } from "nexus";

export const CategoryType = objectType({
  name: "Category",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });
    t.field("description", { type: "String" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
