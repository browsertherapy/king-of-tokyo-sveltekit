<script>
  import PowerCard from '$lib/components/PowerCard.svelte'

  export let cards;
</script>

<ul class="player-cards">
  {#each cards as card}
    <li>
      <PowerCard {card}/>
    </li>
  {/each}
</ul>

<style>
  .player-cards {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    /*justify-content: center;*/
    align-items: center;
    margin-top: .5em;
  }
</style>
