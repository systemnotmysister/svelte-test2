// import { client } from '$lib/graphqlClient';

// export async function _fetchCharacters() {
//      const  query = `
//     query {
//       characters(page: 10) {
//         results {
//           id
//           name
//         }
//       }
//     }
//   `;
  

//   const { data, error } = await client.query(query, {}).toPromise();

//   if (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch characters' }), {
//       status: 500
//     });
//   }
// // 
//   return new Response(JSON.stringify(data.characters.results), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
