// // src/routes/search/+server.ts
// import { GetSearchResultsDocument } from '$lib/graphql/generated/graphql';
// import { client } from '$lib/graphqlClient'; // Включаем клиент

// export async function load({ params }) {
//   // Пример обработки запроса на сервере
//   const response = await client.query(GetSearchResultsDocument, {
//     search: params.search || '',
//   }).toPromise();

//   return {
//     props: {
//       results: response.data || {},
//       error: response.error || null,
//     },
//   };
// }
