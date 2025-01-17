<script lang="ts">
  import { page } from "$app/stores";
  import {
    GetCharacterDocument,
    type GetCharacterQuery,
    type GetCharacterQueryVariables,
  } from "$lib/graphql/generated/graphql";
  import { getContextClient, queryStore } from "@urql/svelte";

  const characterId = $page.params.characterId;

  const store = queryStore<GetCharacterQuery, GetCharacterQueryVariables>({
    client: getContextClient(),
    query: GetCharacterDocument,
    variables: {
      id: characterId,
    },
  });
</script>

{#if $store.data?.character}
  <div>

    <div class="ep1">
      <img src={$store.data.character.image} alt={$store.data.character.name} />
      <p>Status: {$store.data.character.status}</p>
      <p>Species: {$store.data.character.species}</p>
      <p>Gender: {$store.data.character.gender}</p>
    </div>   
   
   <div class="ep2">
   
    <h2>Episodes:</h2>
    <ul>
      {#each $store.data.character.episode as episode (episode?.id)}
        <li>
          <a
            href={`/season/${episode?.episode?.slice(1, 3)}/${episode?.episode?.slice(4, 6)}`}
          >
            {episode?.name || "Без названия"} ({episode?.episode ||
              "Неизвестный эпизод"})
          </a>
        </li>
      {/each}
    </ul>
  </div>
  </div>
{:else}
  <p>Нет данных о персонаже</p>
{/if}



<style>
  div {
  display: flex;
  flex-flow: wrap;
  width: 100%;
  justify-content: center

  }
  li {
    width: 22%;
    display: flex;
  }
  h1{
    margin-left: 7%;
    margin-bottom: 4%;
  }
</style>