import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";

import type { Context } from "../../context";

export const GetStrainsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getStrains", {
      type: "Strain",
      args: {
        query: nullable(stringArg()),
        page: nullable(intArg()),
        limit: nullable(intArg()),
      },
      resolve: async (
        _,
        { query, page = 1, limit = 10 },
        { prisma, mixpanel, headers, currentUser }: Context,
        x
      ) => {
        let whereData = {} as any;

        if (query) {
          whereData = {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                notes: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          };
        }

        let addtData = {} as any;

        if (page && limit) {
          addtData = {
            ...addtData,
            skip: (page - 1) * limit,
            take: limit,
          };
        }

        const strains = await prisma.strain.findMany({
          where: whereData,
          ...addtData,
        });

        return strains;
      },
    });
  },
});
