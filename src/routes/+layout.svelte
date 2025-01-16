<script lang="ts">
  import { client } from '$lib/graphqlClient';
  import {  Client, gql  } from '@urql/core';
  import { onMount } from 'svelte';
  import { setContextClient } from "@urql/svelte";
  setContextClient(client)

  // Данные для навигации
  export let characters: { id: number; name: string }[] = [];

</script>

<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href={`/characters/${characters}`}>Characters</a></li>
      <!-- {#each seasons as season} -->
        <li><a href={`/season/[season]`}>Season </a></li>
      <!-- {/each} -->
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
  margin-left: 2%
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
    width: 1000px
  }

  input {
    width: 32%;
    padding: 1rem;
  }

main {
  flex: 1; 
}

footer {
  background: var(--secondary);
  padding: 1rem;
  text-align: center;
  position: relative;
}
</style>