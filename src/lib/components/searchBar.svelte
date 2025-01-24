<script lang="ts">

  export let value: string = "";
  export let oninput: (event: Event) => void = () => {};
</script>

<form action="/search" method="get">
  <input
    type="text"
    name="q"
    placeholder="Search"
    aria-label="Search"
    bind:value
    on:input={oninput}
    {...$$restProps}
  />

  <button type="submit">send</button>
</form>

<style>
  form {
    width: 20%;
  }
</style>