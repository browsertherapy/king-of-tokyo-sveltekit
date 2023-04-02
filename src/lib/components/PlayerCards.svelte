<script>
  import PowerCard from '$lib/components/PowerCard.svelte'
  import CardMenu from '$lib/components/CardMenu.svelte'
  
  export let player;
  export let playerIndex;
  
  const handleClick = (index) => {
    player.cards[index].status = 'open';
  }

</script>

<ul class="player-cards">
  {#each player.cards as card, index}
    <li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div>
        <PowerCard bind:card={player.cards[index]} on:click={() => handleClick(index)} />
        {#if player.cards[index].status === 'open'}
        <CardMenu cardIndex={index} {playerIndex} />
        {/if}
      </div>
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

  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

</style>
