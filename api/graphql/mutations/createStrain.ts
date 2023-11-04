import { extendType, list, nonNull, nullable, stringArg } from "nexus";
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
        additionalParentIds: nullable(list(stringArg())),
      },
      resolve: async (
        _,
        {
          name,
          notes,
          categoryId,
          femaleParentId,
          maleParentId,
          additionalParentIds,
        },
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

        if (additionalParentIds) {
          saveData = {
            ...saveData,
            additionalParents: {
              connect: additionalParentIds.map((id) => ({
                id,
              })),
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
