<!-- +layout.svelte -->
  <script lang="ts">
    export let characters: { id: number; name: string }[] = [];
    export const season: { id: number; name: string }[] = [];

  </script>

  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/characters">Characters</a></li>
        <li><a href="/season/1">Season </a></li>
      </ul>
    </nav>

    <!-- Таблица отображает данные из пропсов -->
    <input
      type="search"
      name="search"
      placeholder="Search"
      aria-label="Search"
    />
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
  </header>

  <main>
    <slot></slot>
  </main>

  <footer>
    <p>© 2025 Rick & Morty Catalog</p>
  </footer>
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

  /* Здесь можно добавить стили для шапки, навигации и футера */
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

  /* nav ul {
    list-style-type: none;
    padding: 0;
  } */

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
    width: 15%;
    padding: 1rem;
  }

main {
  flex: 1; /* Главная часть страницы будет занимать всё доступное пространство */
}

footer {
  background: var(--secondary);
  padding: 1rem;
  text-align: center;
  position: relative;
}
</style>
