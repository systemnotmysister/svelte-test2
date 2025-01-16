// src/lib/graphqlClient.ts
import { Client, fetchExchange, cacheExchange } from '@urql/core';

export const client = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
