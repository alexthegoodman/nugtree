import { extendType, nonNull, nullable, stringArg } from "nexus";
import type { Context } from "../../context";

export const CreateCategoryMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createCategory", {
      type: "Category",
      args: {
        name: nonNull(stringArg()),
        description: nullable(stringArg()),
      },
      resolve: async (
        _,
        { name, description },
        { prisma, currentUser }: Context,
        x
      ) => {
        const category = await prisma.category.create({
          data: {
            name,
            description,
          },
        });

        console.info("created category", category);

        return category;
      },
    });
  },
});
