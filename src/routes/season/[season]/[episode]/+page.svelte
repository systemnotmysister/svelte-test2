<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { getContextClient, queryStore } from "@urql/svelte";
  import {
    GetEpisodeDocument,
    type Episode,
    type GetEpisodeQuery,
    type GetEpisodeQueryVariables,
  } from "$lib/graphql/generated/graphql";

  let loading = true;
  let error: string | null = null;

  const season = page.params.season;
  const episodeNum = page.params.episode;

  if (!season || !episodeNum) {
    error = "Episode not found";
    loading = false;
  }

  const formattedEpisode = `S${season.padStart(2, "0")}E${episodeNum.padStart(2, "0")}`;

  const store = queryStore<GetEpisodeQuery, GetEpisodeQueryVariables>({
    client: getContextClient(),
    query: GetEpisodeDocument,
    variables: {
      episode: formattedEpisode,
    },
  });
</script>

{#if error}
  <p>{error}</p>
{:else if $store.data?.episodes?.results?.[0]}
  <h1>
    {$store.data?.episodes?.results?.[0].name} ({$store.data?.episodes
      ?.results?.[0].episode})
  </h1>
  <ul>
    {#each $store.data?.episodes?.results?.[0].characters as character}
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
