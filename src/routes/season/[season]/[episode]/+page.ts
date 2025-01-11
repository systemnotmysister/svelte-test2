import { client } from '$lib/graphqlClient';

// Запрос на получение всех эпизодов
const query = (season: any) => `
  query {
    episodes(page: 1) {
      results {
        id
        name
        episode
      }
    }
  }
`;
export const load = async ({ params }) => {
  const season = params.season || '1'; // Используем параметр сезона из URL
  console.log(`Loading episodes for season: ${season}`);

  try {
    // Запрос к API с учётом сезона
     const result = await client.query(query(season), {}).toPromise();

    if (result.error) {
      console.error(`Error fetching episodes for season ${season}:`, result.error);
      return { status: 500, error: result.error };
    }

    const episodes = result.data?.episodes?.results || [];

    console.log(`Fetched episodes: ${episodes.length}`);

    // Группируем эпизоды по сезонам
    const seasons = episodes.reduce((acc: { [key: string]: any[] }, episode: { episode: string }) => {
      const seasonNumber = episode.episode.match(/S(\d+)E/)?.[1];  // Используем optional chaining
      if (seasonNumber) {
        if (!acc[seasonNumber]) {
          acc[seasonNumber] = [];
        }
        acc[seasonNumber].push(episode);
      }
      return acc;
    }, {});

    console.log(`Seasons grouped: ${Object.keys(seasons).length}`);

    // Получаем эпизоды для текущего сезона
    const currentSeasonEpisodes = seasons[season] || [];  // Защищаем от undefined

    console.log(`Episodes for season ${season}: ${currentSeasonEpisodes.length}`);

    return {
      seasons: Object.keys(seasons),
      currentSeasonEpisodes,
      season,
    };
  } catch (error) {
    console.error('Error during GraphQL request:', error);
    return { status: 500, error: 'Error during request' };
  }
};