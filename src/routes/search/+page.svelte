<script lang="ts">
  import { debounce } from 'lodash-es';
  import { page } from '$app/stores'; // Для получения параметров URL
  import { goto } from '$app/navigation'; // Для навигации
  import { queryStore, getContextClient, setContextClient } from '@urql/svelte';
  import { client } from '$lib/graphqlClient';

  // GraphQL запросы
  import {
    GetSearchResultsDocument,
    type GetSearchResultsQuery,
    type GetSearchResultsQueryVariables,
  } from '$lib/graphql/generated/graphql';

  // Устанавливаем клиент GraphQL
  setContextClient(client);

  // Переменные состояния
  let search = $page.url.searchParams.get('q') || ''; // Инициализация строки поиска
  let isLoading = false;
  let characters: string | any[] = [];
  let episodes: string | any[] = [];

  // Хранилище для запросов
  let store = queryStore<GetSearchResultsQuery, GetSearchResultsQueryVariables>({
    client: getContextClient(),
    query: GetSearchResultsDocument,
    variables: { search },
  });

  // Функция для дебаунсинга поиска
  const debouncedSearch = debounce(async (value: string) => {
    if (value.trim() === '') {
      resetResults();
      return;
    }

    isLoading = true;

    // Выполняем GraphQL запрос с новой строкой поиска
    store.reexecute({ request: { variables: { search: value } } });

    // Обрабатываем ответ после запроса
    const data = $store.data;

    if (data) {
      characters = data.characters?.results || [];
      episodes = data.episodes?.results || [];
    }

    isLoading = false;
  }, 300); // Задержка 300 мс для дебаунса

  // Сброс результатов поиска
  const resetResults = () => {
    characters = [];
    episodes = [];
  };

  // Автоматическое обновление при изменении параметра поиска в URL
  $: if (search !== '') {
    debouncedSearch(search);
  }

  // Обработка ввода в поле поиска
  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    search = input.value;
  };

  // Обработка сабмита формы
  const handleSearch = () => {
    goto(`/search?q=${search}`);
  };
</script>

<div>
  <input
    type="text"
    bind:value={search}
    placeholder="Введите имя героя или эпизода..."
    on:input={handleInput}
  />
  <button on:click={handleSearch}>Поиск</button>
</div>

{#if isLoading}
  <p>Загрузка...</p>
{:else if characters.length || episodes.length}
  {#if characters.length}
    <h2>Герои:</h2>
    <ul>
      {#each characters as character}
        <li>
          <p>{character.name}</p>
        </li>
      {/each}
    </ul>
  {/if}

  {#if episodes.length}
    <h2>Эпизоды:</h2>
    <ul>
      {#each episodes as episode}
        <li>
          <p>{episode.name}</p>
        </li>
      {/each}
    </ul>
  {/if}
{:else}
  <p>Ничего не найдено</p>
{/if}

<style>
  input {
    margin-right: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>
