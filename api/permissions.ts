// import { ApolloError } from "apollo-server";
import { shield, allow, deny, rule, and, or, not } from "graphql-shield";

const isAdmin = rule()(async (parent, args, ctx, info) => {
  const allowed = ctx.currentUser.role === "ADMIN";
  return allowed;
});

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const allowed =
    ctx.currentUser !== null && typeof ctx.currentUser !== "undefined";
  return allowed;
});

export const permissions = shield(
  {
    Query: {
      "*": isAuthenticated,
      authenticate: not(isAuthenticated),
      getCategories: not(isAuthenticated),
      getStrains: not(isAuthenticated),
      getStrainById: not(isAuthenticated),
    },
    Mutation: {
      "*": isAuthenticated,
      registerUser: not(isAuthenticated),
      createCategory: not(isAuthenticated), // TODO: and(isAuthenticated, isAdmin),
      createStrain: not(isAuthenticated), // TODO: and(isAuthenticated, isAdmin),
      updateStrainById: not(isAuthenticated), // TODO: and(isAuthenticated, isAdmin),
    },
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      // if (thrownThing instanceof ApolloError) {
      //   return thrownThing;
      // } else
      if (thrownThing instanceof Error) {
        console.error(thrownThing);
        // return new ApolloError(thrownThing.message, "ERR_INTERNAL_SERVER");
        return new Error(thrownThing.message);
      } else {
        console.error("The resolver threw something that is not an error.");
        if (thrownThing === null) {
          thrownThing = "NOT AUTHORIZED!";
        }
        console.error(thrownThing);
        // return new ApolloError(thrownThing as string, "ERR_INTERNAL_SERVER");
        return new Error(thrownThing as string);
      }
    },
  }
);
