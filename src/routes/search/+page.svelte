<script lang="ts">
  import { onMount } from "svelte";
  import { goto, replaceState } from "$app/navigation";
  import { queryStore } from "@urql/svelte";
  import { client } from "../../lib/graphqlClient"
  import {
    GetSearchResultsDocument,
    type GetSearchResultsQuery,
    type GetSearchResultsQueryVariables,
  } from "$lib/graphql/generated/graphql";
  import SearchBar from "$lib/components/searchBar.svelte";
  
  let value = $state()
  let isLoading = $state<boolean>(false);
  let characters = $state<any[]>([]);
  let episodes = $state<any[]>([]);
  let searchQuery = $state<string>("");
  let timeoutId: NodeJS.Timeout | null = null;
  const fetchData = async (query: string) => {
    if (query.length < 3) {
      characters = [];
      episodes = [];
      isLoading = false;
      return;
    }

    isLoading = true;

    let store = queryStore<
      GetSearchResultsQuery,
      GetSearchResultsQueryVariables
    >({
      client,
      query: GetSearchResultsDocument,
      variables: { search: query },
    });

    store.subscribe((res) => {
      if (res?.data) {
        characters = res.data.characters?.results || [];
        episodes = res.data.episodes?.results || [];
      } else {
        characters = [];
        episodes = [];
      }
      isLoading = false;
    });
  };

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
      replaceState(newUrl, {});

      fetchData(searchQuery);
    }, 300);
  };

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q") || "";
    searchQuery = query;
    if (query) {
      fetchData(query);
    }
  });
</script>

<main>
  <SearchBar bind:value={searchQuery}  oninput={handleInput} />

  <h1>Результаты поиска для "{searchQuery}"</h1>

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
  </main>