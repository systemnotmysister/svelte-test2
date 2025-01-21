<script lang="ts">
  import { page } from '$app/stores';
  import { queryStore, getContextClient, setContextClient } from '@urql/svelte';
  import { client } from '$lib/graphqlClient';
  import {
    GetSearchResultsDocument,
    type GetSearchResultsQuery,
    type GetSearchResultsQueryVariables,
  } from '$lib/graphql/generated/graphql';

  setContextClient(client);

  let searchParam = $page.url.searchParams.get('q') || '';

  let store = queryStore<GetSearchResultsQuery, GetSearchResultsQueryVariables>({
    client: getContextClient(),
    query: GetSearchResultsDocument,
    variables: { search: searchParam },
  });

  let characters: string | any[] = [];
  let episodes: string | any[] = [];

  $: {
    const data = $store.data;
    if (data) {
      characters = data.characters?.results || [];
      episodes = data.episodes?.results || [];
    }
  }
</script>

<h1>Результаты поиска для "{searchParam}"</h1>

{#if characters.length || episodes.length}
  {#if characters.length}
    <h2>Персонажи</h2>
    <ul>
      {#each characters as character}
        <li>
          <a href={`/characters/${character.id}`}>{character.name}</a>
        </li>
      {/each}
    </ul>
  {/if}

  {#if episodes.length}
    <h2>Эпизоды</h2>
    <ul>
      {#each episodes as episode}
        <li>
          <a
            href={`/season/${episode.episode.slice(1, 3)}/${episode.episode.slice(4, 6)}`}
          >
            {episode.name}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
{:else}
  <p>Ничего не найдено</p>
{/if}
