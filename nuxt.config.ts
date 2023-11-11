// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-graphql-server", "@nuxtjs/apollo", "@pinia/nuxt"],
  graphqlServer: {
    url: "/api/graphql",
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3000/api/graphql",
      },
    },
  },
});
