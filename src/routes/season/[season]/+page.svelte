<script lang="ts">
  import { client } from "$lib/graphqlClient";
  import { onMount, afterUpdate } from "svelte";
  import { page } from "$app/state"; // Подключаем стор страницы
  import { setContextClient } from "@urql/svelte";
  setContextClient(client);
  interface Episode {
    id: string;
    name: string;
    episode: string;
  }

  let currentSeason: string = "";
  let seasons: string[] = [];
  let currentSeasonEpisodes: Episode[] = [];

  const query = `
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

  const loadEpisodes = async () => {
    try {
      const response = await client.query(query, {}).toPromise();
      if (response.error) {
        console.error("Error:", response.error);
        return;
      }

      const episodes: Episode[] = response.data?.episodes?.results || [];

      seasons = episodes.reduce((acc: string[], episode: Episode) => {
        const seasonMatch = episode.episode.match(/S(\d+)E/);
        if (seasonMatch) {
          const seasonNumber = seasonMatch[1].padStart(2, "0");
          if (!acc.includes(seasonNumber)) {
            acc.push(seasonNumber);
          }
        }
        return acc;
      }, []);

      currentSeason = page.params.season || "";

      if (!currentSeason || !seasons.includes(currentSeason)) {
        throw new Error("Season not found");
      }

      currentSeasonEpisodes = episodes.filter((episode) =>
        episode.episode.startsWith(`S${currentSeason}`)
      );
    } catch (err) {
      console.error("Error loading episodes:", err);
      currentSeasonEpisodes = [];
    }
  };

  onMount(() => {
    loadEpisodes();
  });

  afterUpdate(() => {
    const newSeason = page.params.seamainson;
    if (newSeason && newSeason !== currentSeason) {
      currentSeason = newSeason;
      loadEpisodes();
    }
  });
</script>

{#if seasons.length > 0}
  <h2>Available Seasons</h2>
  <ul>
    {#each seasons as season}
      <li><a href={`/season/${season}`}>Season {season}</a></li>
    {/each}
  </ul>
{:else}
  <p>No seasons available.</p>
{/if}

{#if currentSeasonEpisodes.length > 0}
  <h1>Episodes for Season {currentSeason}</h1>
  <ul>
    {#each currentSeasonEpisodes as episode}
      <li>
        <a
          href={`/season/${episode.episode.slice(1, 3)}/${episode.episode.slice(4, 6)}`}
        >
          {episode.name} ({episode.episode})
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p>Pick a season</p>
{/if}
