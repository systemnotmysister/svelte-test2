<script lang="ts">
    export let seasons: string[] = [];
    export let currentSeasonEpisodes: any[] = [];
    export let season: string = '1';
  
    console.log('Seasons:', seasons);  // Отладка
    console.log('Current season episodes:', currentSeasonEpisodes);  // Отладка
  </script>
  
  <h1>Season {season}</h1>
  
  {#if currentSeasonEpisodes && currentSeasonEpisodes.length > 0}
    <ul>
      {#each currentSeasonEpisodes as episode}
        <li>{episode.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No episodes available for this season.</p>
  {/if}
  
  <h2>Other Seasons</h2>
  <ul>
    {#each seasons as otherSeason}
      <li><a href={`/season/${otherSeason}`}>Season {otherSeason}</a></li>
    {/each}
  </ul>
  