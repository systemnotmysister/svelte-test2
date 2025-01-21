<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  export let placeholder = 'Search...';

  let searchQuery = get(page).url.searchParams.get('q') || '';

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (searchQuery.trim()) {
      goto(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }
</script>

<form on:submit={handleSubmit} class="search-form">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder={placeholder}
    class="search-input"
  />
  <button type="submit" class="search-button">Search</button>
</form>

<style>
  .search-form {
    display: flex;
    gap: 0.5rem;
  }
  .search-input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
  }
  .search-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
