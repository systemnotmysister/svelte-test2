import { Client, fetchExchange, cacheExchange } from '@urql/core';

// Создаем клиента
export const client = new Client({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
