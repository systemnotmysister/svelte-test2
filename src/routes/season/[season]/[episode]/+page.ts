import { client } from "$lib/graphqlClient";

// Запрос для получения данных эпизода
const getEpisodeQuery = (id: string) => `
  query {
    episode(id: "${id}") {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
      }
    }
  }
`;

export const load = async ({ params }) => {
  const { season, episode } = params;

  // Здесь будем искать эпизод по уникальному ID
  const episodeId = `${season}${episode}`;

  try {
    const result = await client.query(getEpisodeQuery(episodeId), {}).toPromise();

    if (result.error) {
      console.error(`Error fetching episode ${episodeId}:`, result.error);
      return { status: 500, error: result.error };
    }

    const episodeData = result.data?.episode;

    if (!episodeData) {
      return { status: 404, error: 'Episode not found' };
    }

    return {
      episode: episodeData,
    };
  } catch (error) {
    console.error('Error during GraphQL request:', error);
    return { status: 500, error: 'Error during request' };
  }
};
