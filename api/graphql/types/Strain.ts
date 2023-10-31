import { objectType } from "nexus";

export const StrainType = objectType({
  name: "Strain",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });
    t.field("notes", { type: "String" });
    t.field("links", { type: "JSON" });
    t.field("category", { type: "Category" });

    t.field("femaleParent", { type: "Strain" });
    t.field("maleParent", { type: "Strain" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
