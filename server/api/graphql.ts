// import { Resolvers } from '#graphql/resolver'
// import { schema } from '#graphql/schema'
// import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from "@as-integrations/h3";

import { context } from "../../api/context";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

import { server } from "~/api/server";

// const resolvers: Resolvers = {
//    Query: {
//       // Typed resolvers
//    },
// }

// const apollo = new ApolloServer({typeDefs: schema, resolvers})

export default startServerAndCreateH3Handler(server, {
  // Optional: Specify context
  //  context: (event) => {...},
  context: async ({ event }) => {
    // console.info("conteext event", event);
    const headers = event._headers;
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
    let currentUser;

    try {
      // const tokenHeader = req.header(tokenHeaderKey);
      if (!headers) {
        throw new Error("No headers");
      }

      const tokenHeader = headers.get(tokenHeaderKey);
      const token = tokenHeader?.split("Bearer ")[1] as string;

      const verified = jwt.verify(token, jwtSecretKey);

      if (verified && typeof verified !== "string") {
        currentUser = await prisma.user.findFirst({
          where: {
            id: verified.userId,
          },
        });

        console.info("Verified Token", verified, "currentUser", currentUser);
      } else {
        console.warn("Token Not Verified 1");
      }
    } catch (error) {
      // ex. if token is not provided
      console.warn("Token Not Verified 2");
    }

    return { headers, currentUser, ...context };
  },
});
