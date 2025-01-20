<script lang="ts">
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';

  let search = writable(''); // Реактивное хранилище для поискового запроса

  // Функция для обработки ввода в поле поиска
  function handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    search.set(input.value);
  }

  // Функция для отправки запроса при нажатии Enter или на кнопке Submit
  function handleSubmit() {
    const input = $search; // Получаем текущее значение из хранилища
    if (input) {
      goto(`/search?q=${input}`);  // Навигация с параметром поиска
    }
  }

  // Функция для обработки нажатия клавиши Enter
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSubmit(); // Отправить запрос, если нажата клавиша Enter
    }
  }
</script>

<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/">Characters</a></li>
      <li><a href={`/season/01`}>Season</a></li>
    </ul>
  </nav>

  <input
    type="search"
    name="search"
    placeholder="Search"
    aria-label="Search"
    bind:value={$search}
    on:input={handleSearch}     
    on:keypress={handleKeyPress} 
  />

  <button on:click={handleSubmit}>Search</button>  <!-- Кнопка для отправки запроса -->
</header>

<main>
  <slot></slot>  <!-- Контент для страницы будет отображаться здесь -->
</main>

<footer>
  <p>© 2025 Rick & Morty Catalog</p>
</footer>
<style>
header {
  background: var(--primary);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-left: 9%;
    margin-top: 3%;
    margin-bottom: 4%;
    justify-content: flex-end;
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
    display: flex;
    margin: 0px 9% auto;
    width: 84%;
    flex-wrap: wrap;
    flex-direction: column
  }

  input {
    width: 300px;
    padding: 2rem;
  }

/* main {
  flex: 1; 
  padding: 2rem;
      margin-top: -10%;
    width: 100%
} */

footer {
  background: var(--secondary);
  padding: 1rem;
  text-align: center;
  position: relative;
}
</style>