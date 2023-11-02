import { extendType, nonNull, nullable, stringArg } from "nexus";
import type { Context } from "../../context";

export const CreateStrainMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createStrain", {
      type: "Strain",
      args: {
        name: nonNull(stringArg()),
        notes: nullable(stringArg()),
        categoryId: nullable(stringArg()),
        femaleParentId: nullable(stringArg()),
        maleParentId: nullable(stringArg()),
      },
      resolve: async (
        _,
        { name, notes, categoryId, femaleParentId, maleParentId },
        { prisma, currentUser }: Context,
        x
      ) => {
        let saveData = {
          name,
          notes,
        } as any;

        if (categoryId) {
          saveData = {
            ...saveData,
            category: {
              connect: {
                id: categoryId,
              },
            },
          };
        }

        if (femaleParentId) {
          saveData = {
            ...saveData,
            femaleParent: {
              connect: {
                id: femaleParentId,
              },
            },
          };
        }

        if (maleParentId) {
          saveData = {
            ...saveData,
            maleParent: {
              connect: {
                id: maleParentId,
              },
            },
          };
        }

        const strain = await prisma.strain.create({
          data: saveData,
        });

        console.info("created strain", strain);

        return strain;
      },
    });
  },
});
