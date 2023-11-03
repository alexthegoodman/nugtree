import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";

import type { Context } from "../../context";

export const GetStrainByIdQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getStrainById", {
      type: "Strain",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { id },
        { prisma, mixpanel, headers, currentUser }: Context,
        x
      ) => {
        const strain = await prisma.strain.findFirst({
          where: {
            id,
          },
        });

        return strain;
      },
    });
  },
});
