import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/lib/graphql/queries/**/*.ts", "src/**/*.gql"],
  generates: {
    "src/lib/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
    },
  },
};
export default config;