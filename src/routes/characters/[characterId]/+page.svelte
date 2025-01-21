<script lang="ts">
  import { page } from "$app/stores";
  import {
    GetCharacterDocument,
    type GetCharacterQuery,
    type GetCharacterQueryVariables,
  } from "$lib/graphql/generated/graphql";
  import { getContextClient, queryStore } from "@urql/svelte";
  import { client } from "$lib/graphqlClient";

  import { setContextClient } from "@urql/svelte";
  setContextClient(client);

  $: characterId = $page.params.characterId;

  // Создаем store для запроса
  let store = queryStore<GetCharacterQuery, GetCharacterQueryVariables>({
    client: getContextClient(),
    query: GetCharacterDocument,
    variables: { id: "" }, // Инициализируем с пустым id
  });

  $: if (characterId) {
    store = queryStore<GetCharacterQuery, GetCharacterQueryVariables>({
      client: getContextClient(),
      query: GetCharacterDocument,
      variables: { id: characterId },
    });
    console.log(GetCharacterDocument)
  }
</script>

{#if $store.fetching}
  <p>Загрузка данных персонажа...</p>
{:else if $store.error}
  <p>Ошибка: {$store.error.message}</p>
{:else if $store.data?.character}
  <div>
    <img src={$store.data.character.image} alt={$store.data.character.name} />
    <p>Статус: {$store.data.character.status}</p>
    <p>Вид: {$store.data.character.species}</p>
    <p>Пол: {$store.data.character.gender}</p>

    <h2>Эпизоды:</h2>
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
{:else}
  <p>Нет данных о персонаже</p>
{/if}

<style>
/* div {
  margin-left: 10%;
} */
</style>