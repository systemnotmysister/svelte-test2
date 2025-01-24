// src/lib/graphqlClient.ts
import { Client, fetchExchange, cacheExchange } from '@urql/core';

export const client = new Client({
  url: 'https://svelte-test2-worker.coldcatdev.workers.dev/api/graphql',  exchanges: [cacheExchange, fetchExchange],
});
