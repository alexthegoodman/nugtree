// import { Resolvers } from '#graphql/resolver'
// import { schema } from '#graphql/schema'
// import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from "@as-integrations/h3";

import { server } from "~/api/server";

// const resolvers: Resolvers = {
//    Query: {
//       // Typed resolvers
//    },
// }

// const apollo = new ApolloServer({typeDefs: schema, resolvers})

export default startServerAndCreateH3Handler(server, {
  // Optional: Specify context
  //    context: (event) => {...},
});
