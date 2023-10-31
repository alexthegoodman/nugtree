import { extendType, nonNull, stringArg } from "nexus";

import type { Context } from "../../context";

export const GetCategoriesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getCategories", {
      type: "Category",
      args: {},
      resolve: async (
        _,
        {},
        { prisma, mixpanel, req, currentUser }: Context,
        x
      ) => {
        const categories = await prisma.category.findMany();
        return categories;
      },
    });
  },
});
