<script>
  import PowerCard from '$lib/components/PowerCard.svelte'

  export let cards;
  const handleClick = (index) => {
    cards[index].status = 'open';
  }

</script>

<ul class="player-cards">
  {#each cards as card, index}
    <li>
      <PowerCard bind:card={cards[index]} onClick={() => handleClick(index)}/>
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
