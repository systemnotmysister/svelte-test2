<!-- <script lang="ts">
    import { client } from '$lib/graphqlClient';
    import { SEARCH_QUERY } from '$lib/graphql/queries';
    import type { PageLoad } from './$types';
  
    export const load: PageLoad = async ({ url }) => {
      const searchQuery = url.searchParams.get('name') ?? '';
      if (searchQuery.length < 3) {
        throw new Error('Search query must be at least 3 characters.');
      }
  
      const { data, error } = await client.query(SEARCH_QUERY, { name: searchQuery }).toPromise();
      if (error) {
        throw new Error(error.message);
      }
  
      if (!data.characters.results.length && !data.episodes.results.length) {
        throw { status: 404, message: 'No results found.' };
      }
  
      return { data };
    };
  </script>
  
  <h1>Search Results</h1>
  
  {#if data}
    <section>
      <h2>Characters</h2>
      {#each data.characters.results as character}
        <div>
          <img src={character.image} alt={character.name} />
          <p>{character.name}</p>
          <p>Status: {character.status}</p>
        </div>
      {/each}
  
      <h2>Episodes</h2>
      {#each data.episodes.results as episode}
        <div>
          <p>{episode.name} ({episode.episode})</p>
        </div>
      {/each}
    </section>
  {:else}
    <p>No results found.</p>
  {/if}
   -->