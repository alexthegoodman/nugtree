import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["**/*.vue", "**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
