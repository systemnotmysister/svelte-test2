// src/lib/graphqlClient.ts
import { Client, fetchExchange, cacheExchange } from '@urql/core';

export const client = new Client({
  url: 'http://127.0.0.1:8787/api/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
