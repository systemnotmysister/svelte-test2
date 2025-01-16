<script lang="ts">
  export let seasons: string[] = [];
  export let currentSeasonEpisodes: any[] = [];
  export let season: string = '1';
</script>

<h1>Season {season}</h1>

{#if currentSeasonEpisodes && currentSeasonEpisodes.length > 0}
  <ul>
    {#each seasons as season}
    <li><a href={`/season/${season}`}>Season {season}</a></li>
  {/each}
  </ul>
{:else}
  <p>Choose season.</p>
{/if}

<h2>Other Seasons</h2>
<ul>
 {#each seasons as season}
        <li><a href={`/season/${season}`}>Season {season}</a></li>
      {/each}
</ul>
