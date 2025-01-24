<script lang="ts">
  import { page } from "$app/stores";
  import { setContextClient, getContextClient, queryStore } from "@urql/svelte";
  import { client } from "$lib/graphqlClient";
  import { error } from "@sveltejs/kit";
  import {
    GetEpisodeDocument,
    type GetEpisodeQuery,
    type GetEpisodeQueryVariables,
  } from "$lib/graphql/generated/graphql";

  setContextClient(client);

  let currentSeason: string = "";
  let seasons: string[] = [];
  let currentSeasonEpisodes: { name: string; episode: string }[] = [];

  // Инициализируем queryStore для загрузки эпизодов
  let store = queryStore<GetEpisodeQuery, GetEpisodeQueryVariables>({
    client: getContextClient(),
    query: GetEpisodeDocument,
    variables: {
      episode: "",
    },
  });

  $: if ($store.data?.episodes?.results) {
  const episodes = $store.data.episodes.results;

  console.log("Loaded episodes:", episodes);

  if (!$store.data?.episodes?.results || $store.data.episodes.results.length === 0) {
  console.error("No episodes found");
  throw error(404, "No episodes found");
}
  // Формируем список сезонов
  seasons = episodes.reduce<string[]>((acc, episode) => {
    const seasonMatch = episode?.episode?.match(/S(\d+)E/);
    if (seasonMatch) {
      const seasonNumber = seasonMatch[1].padStart(2, "0");
      if (!acc.includes(seasonNumber)) {
        acc.push(seasonNumber);
      }
    }
    return acc;
  }, []);

  console.log("Extracted seasons:", seasons);
  currentSeason = ($page.params.season || "").padStart(2, "0");

  console.log("Current season from params:", $page.params.season);

  // Устанавливаем текущий сезон
  currentSeason = $page.params.season || "";

  if (!currentSeason || !seasons.includes(currentSeason)) {
    console.error("Season not found:", currentSeason);
    currentSeasonEpisodes = [];
    throw error(404, "Season not found");
  }

  // Фильтруем эпизоды для текущего сезона
  currentSeasonEpisodes = episodes
    .filter(
      (episode) =>
        episode?.episode?.startsWith(`S${currentSeason}`) &&
        episode?.name &&
        episode?.episode
    )
    .map((episode) => ({
      name: episode?.name as string,
      episode: episode?.episode as string,
    }));

  console.log("Episodes for current season:", currentSeasonEpisodes);
}
</script>

<div class="div">
  {#if seasons.length > 0}
    <h2>Available Seasons</h2>
    <ul>
      {#each seasons as season}
        <li>
          <a href={`/season/${season}`}>Season {season}</a>
        </li>
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
          <a href={`/season/${episode.episode.slice(1, 3)}/${episode.episode.slice(4, 6)}`}>
            {episode.name} ({episode.episode})
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No episodes found for this season.</p>
  {/if}
</div>