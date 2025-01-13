<script lang="ts">
  import { client } from '$lib/graphqlClient';
  import { page } from '$app/state';
  import { onMount } from 'svelte';

  interface Character {
    id: string;
    name: string;
    image: string;
  }

  interface Episode {
    id: string;
    name: string;
    episode: string;
    characters: Character[];
  }

  let episode: Episode | null = null;
  let loading: boolean = true;
  let error: string | null = null;

  const episodeQuery = `
    query ($episode: String!) {
      episodes(filter: { episode: $episode }) {
        results {
          id
          name
          episode
          characters {
            id
            name
            image
          }
        }
      }
    }
  `;

  const loadEpisode = async () => {
  const episodeId = page.params.episode;  // Получаем параметр эпизода из URL
  if (!episodeId) {
    error = 'Episode not found';
    loading = false;
    return;
  }

  // Формируем правильный шаблон эпизода
  const formattedEpisodeId = episodeId.padStart(2, '0'); // Добавляем ведущий ноль, если эпизод < 10
  const episodeQueryString = `S${page.params.season}E${formattedEpisodeId}`;

  try {
    const response = await client.query(episodeQuery, { episode: episodeQueryString }).toPromise();
    if (response.error) {
      error = response.error.message;
    } else {
      episode = response.data?.episodes?.results[0] || null;
    }
  } catch (err) {
    error = 'Error fetching episode data';
  } finally {
    loading = false;
  }
};

  onMount(() => {
    loadEpisode();
  });
</script>

{#if loading}
  <p>Loading episode data...</p>
{:else if error}
  <p>{error}</p>
{:else if episode}
  <h1>{episode.name} ({episode.episode})</h1>
  <ul>
    {#each episode.characters as character}
      <li>
        <img src={character.image} alt={character.name} />
        <p>{character.name}</p>
      </li>
    {/each}
  </ul>
{:else}
  <p>Episode not found.</p>
{/if}
