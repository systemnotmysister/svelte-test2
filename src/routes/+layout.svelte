<script lang="ts">
  import { client } from '$lib/graphqlClient';
  import { gql } from '@urql/core';
  import { onMount } from 'svelte';

  // Данные для навигации
  export let characters: { id: number; name: string }[] = [];
  let episodes = [];
  let seasons: any[] = [];

  // GraphQL-запрос для получения эпизодов
  const query = gql`
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

  // Загружаем данные о сезонах и эпизодах на клиенте
  onMount(async () => {
    try {
      const result = await client.query(query,{}).toPromise();

      if (result.error) {
        throw new Error(result.error.message);
      }

      episodes = result.data?.episodes?.results || [];

      // Парсинг сезонов из эпизодов
      seasons = episodes.reduce((acc: string[], episode: { episode: string }) => {
        const seasonMatch = episode.episode.match(/S(\d+)E/);
        if (seasonMatch) {
          const seasonNumber = seasonMatch[1].padStart(2, '0');
          if (!acc.includes(seasonNumber)) {
            acc.push(seasonNumber);
          }
        }
        return acc;
      }, []);
    } catch (error) {
      console.error('Error during GraphQL request:', error);
    }
  });
</script>

<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/characters">Characters</a></li>
        <li><a href={`/season/[season]`}>Season </a></li>
    </ul>
  </nav>

  <!-- Поле поиска -->
  <input
    type="search"
    name="search"
    placeholder="Search"
    aria-label="Search"
  />
</header>

<!-- Таблица персонажей -->
{#if characters.length > 0}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#each characters as character}
        <tr>
          <td>{character.id}</td>
          <td><a href={`/character/${character.id}`}>{character.name}</a></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<main>
  <slot></slot>
</main>

<footer>
  <p>© 2025 Rick & Morty Catalog</p>
</footer>

<style>
header {
  background: var(--primary);
  padding: 1rem;
  margin-left: 10%
}
footer {
    background: var(--secondary);
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }


  nav a {
    /* text-decoration: none; */
    margin-right: 1rem;
    color: var(--primary-text);
    margin-left: 15%
  }



  main {
    padding: 3rem;
    /* margin: 0 auto; */
    width: 100%
  }

  input {
    width: 25%;
    padding: 2rem;
  }

main {
  flex: 1; 
  padding: 4rem;
    margin-top: -3%;
    width: 100%
}

footer {
  background: var(--secondary);
  padding: 1rem;
  text-align: center;
  position: relative;
}
</style>