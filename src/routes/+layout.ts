import { client } from '$lib/graphqlClient';

const query = () => `
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

export const load = async () => {
  try {
    const result = await client.query(query(), {}).toPromise();

    if (result.error) {
      throw new Error(result.error.message);
    }

    const episodes = result.data?.episodes?.results || [];

    const seasons = episodes.reduce((acc: string[], episode: { episode: string }) => {
      const seasonMatch = episode.episode.match(/S(\d+)E/);
      if (seasonMatch) {
        const seasonNumber = seasonMatch[1].padStart(2, '0');
        if (!acc.includes(seasonNumber)) {
          acc.push(seasonNumber);
        }
      }
      return acc;
    }, []);

    return {
      seasons,
      episodes,
    };
  } catch (error) {
    console.error('Error during GraphQL request:', error);
    return {
      status: 500,
      error: 'Failed to load episodes',
    };
  }
};
