// import { client } from "$lib/graphqlClient";

// const getEpisodeQuery = `
//   query ($episode: String!) {
//     episodes(filter: { episode: $episode }) {
//       results {
//         id
//         name
//         episode
//         air_date
//         characters {
//           id
//           name
//           image
//         }
//       }
//     }
//   }
// `;

// export const load = async ({ params }) => {
//   const { season, episode } = params;
  
//   const formattedEpisode = `S${season.padStart(2, '0')}E${episode.padStart(2, '0')}`;

//   try {
//     const result = await client.query(getEpisodeQuery, { episode: formattedEpisode }).toPromise();

//     if (result.error) {
//       console.error(`Error fetching episode ${formattedEpisode}:`, result.error);
//       return { status: 500, error: result.error };
//     }

//     const episodeData = result.data?.episodes?.results[0];

//     if (!episodeData) {
//       return { status: 404, error: 'Episode not found' };
//     }

//     return {
//       episode: episodeData,
//     };
//   } catch (error) {
//     console.error('Error during GraphQL request:', error);
//     return { status: 500, error: 'Error during request' };
//   }
// };
