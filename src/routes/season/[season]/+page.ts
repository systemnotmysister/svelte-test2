// export const load = async ({ parent, params }) => {
    
//   const { seasons , episodes } = await parent();  

//   const currentSeason = params.season?.padStart(2, '0');

//   if (!currentSeason) {
//     return {
//       error: 'Season not found',
//       status: 404,
//     };
//   }

//   const currentSeasonEpisodes = episodes
//     ? episodes.filter((episode: { episode: string; }) => episode.episode.startsWith(`S${currentSeason}`))
//     : [];

//   return {
//     seasons,
//     currentSeasonEpisodes,
//   };
// };
