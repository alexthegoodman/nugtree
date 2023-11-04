import { extendType, list, nonNull, nullable, stringArg } from "nexus";
import type { Context } from "../../context";

export const UpdateStrainByIdMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateStrainById", {
      type: "Strain",
      args: {
        id: nonNull(stringArg()),
        name: nullable(stringArg()),
        notes: nullable(stringArg()),
        categoryId: nullable(stringArg()),
        femaleParentId: nullable(stringArg()),
        maleParentId: nullable(stringArg()),
        additionalParentIds: nullable(list(stringArg())),
      },
      resolve: async (
        _,
        {
          id,
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
        let saveData = {} as any;

        if (name) {
          saveData = {
            ...saveData,
            name,
          };
        }

        if (notes) {
          saveData = {
            ...saveData,
            notes,
          };
        }

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

        const strain = await prisma.strain.update({
          where: {
            id,
          },
          data: saveData,
        });

        console.info("updated strain", strain);

        return strain;
      },
    });
  },
});
