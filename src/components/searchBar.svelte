<!-- <script lang="ts">
    import { formEnhance } from '$app/forms';
  
    let query = '';
    let loading = false;
  
    function validateInput() {
      return query.length >= 3;
    }
  </script>
  
  <form
    on:submit|preventDefault
    use:formEnhance={{
      pending: () => (loading = true),
      after: () => (loading = false),
    }}
    method="get"
    action="/search"
  >
    <input
      type="text"
      bind:value={query}
      placeholder="Search characters or episodes..."
      required
      minlength="3"
      class={validateInput() ? 'valid' : 'invalid'}
    />
    <button type="submit" {disabled}={loading}>
      {loading ? 'Searching...' : 'Search'}
    </button>
  </form>
  
  <style>
    .invalid {
      border-color: red;
    }
    .valid {
      border-color: green;
    }
  </style>
   -->