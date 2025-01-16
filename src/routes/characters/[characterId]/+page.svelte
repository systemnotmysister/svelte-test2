<script lang="ts">
  import { page } from '$app/state'; // Для получения параметров из URL
  import { useQuery } from 'urql';
  import { GetCharacterDocument } from '$lib/graphql/generated/graphql'; // Импортируем документ запроса
  import type { GetCharacterQuery, GetCharacterQueryVariables } from '$lib/graphql/generated/graphql'; // Импортируем типы

  // Получаем параметр characterId из URL
  const characterId = page.params.characterId;

  // Используем сгенерированный хук для выполнения GraphQL-запроса
  const [{ data, fetching, error }] = useQuery<GetCharacterQuery, GetCharacterQueryVariables>({
    query: GetCharacterDocument,
    variables: { id: characterId }, // Указываем ID персонажа
  });
</script>

<h1>{fetching ? 'Загрузка...' : data?.character?.name || 'Персонаж не найден'}</h1>

{#if data?.character}
  <div>
    <img src={data.character.image} alt={data.character.name} />
    <p>Status: {data.character.status}</p>
    <p>Species: {data.character.species}</p>
    <p>Gender: {data.character.gender}</p>

    <h2>Episodes:</h2>
    <ul>
      {#each data.character.episode as episode (episode?.id)}
        <li>
          <a href={`/season/${episode?.episode?.slice(1, 3)}/${episode?.episode?.slice(4, 6)}`}>
            {episode?.name || 'Без названия'} ({episode?.episode || 'Неизвестный эпизод'})         
         </a>
        </li>
      {/each}
    </ul>
  </div>
{:else if error}
  <p>Ошибка: {error.message}</p>
{:else}
  <p>Нет данных о персонаже</p>
{/if}

