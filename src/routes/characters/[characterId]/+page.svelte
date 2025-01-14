<script lang="ts">
  import { client } from '$lib/graphqlClient';
  import { page } from '$app/state';

  interface Episode {
    id: string;
    name: string;
    episode: string;
  }

  interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    episode: Episode[];
  }

  let character: Character | null = null;

  // Запрос для получения героя и эпизодов
  const query = `
    query($id: ID!) {
      character(id: $id) {
        id
        name
        status
        species
        gender
        image
        episode {
          id
          name
          episode
        }
      }
    }
  `;

  const fetchCharacter = async (id: number) => {
    try {
      const { data } = await client.query(query, { id }).toPromise();
      if (data && data.character) {
        character = data.character;
      } else {
        console.error('Нет данных о персонаже');
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  $: {
    const characterId = page.params.characterId;
    if (characterId) {
      fetchCharacter(parseInt(characterId));
    }
  }
</script>

<h1>{character ? character.name : 'Загрузка...'}</h1>

{#if character}
  <div>
    <img src={character.image} alt={character.name} />
    <p>Age: {character.status}</p>
    <p>Species: {character.species}</p>
    <p>Gender: {character.gender}</p>

    <h2>Took part in:</h2>
    <ul>
      {#each character.episode as episode}
        <li>
          <a href={`/season/${episode.episode.slice(1, 3)}/${episode.episode.slice(4, 6)}`}>
            {episode.name} ({episode.episode})
          </a>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p>No character data</p>
{/if}
