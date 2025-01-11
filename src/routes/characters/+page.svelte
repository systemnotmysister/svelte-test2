
  <script lang="ts">
    import { client } from '$lib/graphqlClient';
    
    // Типы данных
    interface Character {
      id: number;
      name: string;
    }
    
    let characters: Character[] = [];
    
    // Запрос для получения списка персонажей
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
    
    // Функция для получения данных всех персонажей
    const fetchCharacters = async () => {
      try {
        const { data } = await client.query(query, {}).toPromise();
        characters = data.characters.results;  // Получаем результат из "results"
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    
    fetchCharacters();  // Вызовем функцию для загрузки списка персонажей
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
  
  <!-- <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#each characters as character}
        <tr>
          <td> <a href={`/characters/${character.id}`}> {character.id} </a></td>
          <td>   {character.name}</td>
        </tr>
      {/each}
    </tbody>
  </table> -->