<!-- src/routes/season/+page.svelte -->
<script lang="ts">
  export let seasons: Record<number, Array<{ id: number; name: string; episode: string }>> = {};
</script>

<h1>Seasons</h1>

<ul>
  {#each Object.keys(seasons).map(Number) as season}
    <li>
      <h2>Season {season}</h2>
      <ul>
        {#each seasons[season] as episode}
          <li>
            <a href={`/season/${season}/${episode.id}`}>
              {episode.name} - {episode.episode}
            </a>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
