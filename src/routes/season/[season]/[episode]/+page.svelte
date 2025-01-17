<script lang="ts">
  import { page } from "$app/stores";
  import { setContextClient, getContextClient, queryStore } from "@urql/svelte";
  import { client } from "$lib/graphqlClient";
  import {
    GetEpisodeDocument,
    type GetEpisodeQuery,
    type GetEpisodeQueryVariables,
  } from "$lib/graphql/generated/graphql";

  setContextClient(client);

  $: season = $page.params.season;
  $: episodeNum = $page.params.episode;

  // Формируем эпизод в формате "S01E01"
  const getFormattedEpisode = (season: string | undefined, episodeNum: string | undefined) => {
    if (!season || !episodeNum) return null;
    return `S${season.padStart(2, "0")}E${episodeNum.padStart(2, "0")}`;
  };

  $: formattedEpisode = getFormattedEpisode(season, episodeNum);

  // Инициализируем хранилище для запроса с правильными переменными
  let store = queryStore<GetEpisodeQuery, GetEpisodeQueryVariables>({
    client: getContextClient(),
    query: GetEpisodeDocument,
    variables: { episode: formattedEpisode || "" },
  });

  // Обновляем запрос при изменении `formattedEpisode`
  $: if (formattedEpisode) {
    store = queryStore<GetEpisodeQuery, GetEpisodeQueryVariables>({
      client: getContextClient(),
      query: GetEpisodeDocument,
      variables: { episode: formattedEpisode },
    });
  }
</script>

{#if $store.fetching}
  <p>Loading episode data...</p>
{:else if $store.error}
  <p>Error: {$store.error.message}</p>
{:else if $store.data?.episodes?.results?.[0]}
  <h1>
    {$store.data.episodes.results[0].name} ({$store.data.episodes.results[0].episode})
  </h1>
  <ul>
    {#each $store.data.episodes.results[0].characters as character}
      <li>
        <a href={`/characters/${character?.id}`}>
          <img src={character?.image} alt={character?.name} />
          <p>{character?.name}</p>
        </a>
      </li>
    {/each}
  </ul>
{:else}
  <p>Episode not found.</p>
{/if}
