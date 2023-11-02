import { objectType } from "nexus";
import type { Context } from "~/api/context";

export const StrainType = objectType({
  name: "Strain",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("name", { type: "String" });
    t.field("notes", { type: "String" });
    t.field("links", { type: "JSON" });

    t.field("category", {
      type: "Category",
      resolve: async (strain, __, context: Context) => {
        return await context.prisma.category.findFirst({
          where: {
            strains: {
              some: {
                id: strain.id as string,
              },
            },
          },
        });
      },
    });
    t.field("femaleParent", {
      type: "Strain",
      resolve: async (strain, __, context: Context) => {
        return await context.prisma.strain.findFirst({
          where: {
            childrenAsFemale: {
              some: {
                id: strain.id as string,
              },
            },
          },
        });
      },
    });
    t.field("maleParent", {
      type: "Strain",
      resolve: async (strain, __, context: Context) => {
        return await context.prisma.strain.findFirst({
          where: {
            childrenAsMale: {
              some: {
                id: strain.id as string,
              },
            },
          },
        });
      },
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
