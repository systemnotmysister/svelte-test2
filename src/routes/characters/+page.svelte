
  <script lang="ts">
    import { client } from '$lib/graphqlClient';
    
    // Типы данных
    interface Character {
      id: number;
      name: string;
    }
    
    let characters: Character[] = [];
    
    const query = `
      query {
        characters(page: 10) {
          results {
            id
            name
          }
        }
      }
    `;
    
    const fetchCharacters = async () => {
      try {
        const { data } = await client.query(query, {}).toPromise();
        characters = data.characters.results;  
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    
    fetchCharacters();  
  </script>
  
  <h1>Character List</h1>
  
  <ul>
    {#each characters as character}
      <li>
        <a href={`/characters/${character.id}`}>
          {character.name}
        </a>
      </li>
    {/each}
  </ul>
