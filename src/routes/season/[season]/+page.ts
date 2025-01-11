import { client } from '$lib/graphqlClient';

// Запрос с использованием сезона
const query = () => `
query {
  episodes(page:1) {
    results {
      id
      name
      episode
    }
  }
}
`;

export const load = async ({ params }) => {
  // Получаем параметр сезона из URL и форматируем его
  const season = params.season?.padStart(2, '0') || '01'; // Форматируем сезон с ведущим нулём
  console.log(`Loading episodes for season: ${season}`);

  try {
    // Запрос к API на все эпизоды
    const result = await client.query(query(), {}).toPromise();

    if (result.error) {
      console.error(`Error fetching episodes:`, result.error);
      return { status: 500, error: result.error };
    }

    const episodes = result.data?.episodes?.results || [];

    console.log(`Fetched episodes: ${episodes.length}`);

    // Группируем эпизоды по сезонам
    const seasons = episodes.reduce((acc: { [key: string]: any[] }, episode: { episode: string }) => {
      const seasonNumber = episode.episode.match(/S(\d+)E/)?.[1];
      const formattedSeasonNumber = seasonNumber?.padStart(2, '0');
      if (formattedSeasonNumber) {
        if (!acc[formattedSeasonNumber]) {
          acc[formattedSeasonNumber] = [];
        }
        acc[formattedSeasonNumber].push(episode);
      }
      return acc;
    }, {});

    console.log(`Seasons grouped: ${Object.keys(seasons).length}`);
    console.log('Seasons:', Object.keys(seasons)); // Отладка для проверки сезонов

    const formattedSeason = season.padStart(2, '0');
    const currentSeasonEpisodes = seasons[formattedSeason] || [];
    console.log('Current season episodes:', currentSeasonEpisodes);

    console.log(`Episodes for season ${formattedSeason}: ${currentSeasonEpisodes.length}`);

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
