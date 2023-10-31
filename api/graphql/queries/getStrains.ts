import { extendType, nonNull, stringArg } from "nexus";

import type { Context } from "../../context";

export const GetStrainsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getStrains", {
      type: "Strain",
      args: {},
      resolve: async (
        _,
        {},
        { prisma, mixpanel, req, currentUser }: Context,
        x
      ) => {
        const strains = await prisma.strain.findMany();
        return strains;
      },
    });
  },
});
