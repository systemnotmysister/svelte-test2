<script lang="ts">
  import { client } from '$lib/graphqlClient';
  import { onMount } from 'svelte';

  let characters: { id: string; name: string }[] = [];

  const query = `
    query {
      characters(page: 9) {
        results {
          id
          name
        }
      }
    }
  `;

  onMount(async () => {
    const response = await client.query(query, {}).toPromise();
    if (response.error) {
      console.error(response.error);
    } else {
      characters = response.data.characters.results;
    }
  });
</script>

<h1>Characters</h1>

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
        <td>{character.name}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #eaeaea;
}
</style>
