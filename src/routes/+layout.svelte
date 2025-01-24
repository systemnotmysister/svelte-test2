<script>
  import { goto } from "$app/navigation";

  let searchParam = "";

  const handleSubmit = (
    /** @type {{ preventDefault: () => void; }} */ event
  ) => {
    event.preventDefault();
    if (searchParam.trim().length >= 3) {
      goto(`/search?q=${searchParam.trim()}`);
    }
  };
  
</script>

<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/">Characters</a></li>
      <li><a href={`/season/01`}>Season</a></li>
    </ul>
  </nav>
  
  <form on:submit={handleSubmit}>
    <input
      bind:value={searchParam}
      placeholder="Search"
      aria-label="Search"
      minlength="3"
      required
      type="search"
      name="search"
    />
    <button type="submit">&#x1F50E </button>
  </form>
</header>

<main>
  <slot></slot>
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
    position: relative;
    bottom: 0;
    width: 100%;
  }

  nav a {
    /* text-decoration: none; */
    margin-right: 1rem;
    color: var(--primary-text);
    margin-left: 15%;
  }
  button {
    width: 65px;
    margin-left: 1%;
    border-radius: 15px;
    height: 70px;
    background-color: white !important;
  }

  main {
    display: flex;
    margin: 0px 9% auto;
    width: 84%;
    flex-wrap: wrap;
    flex-direction: column;
  }

  input {
    width: 250px;
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
