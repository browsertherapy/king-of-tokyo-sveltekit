<script>
  import PowerCard from '$lib/components/PowerCard.svelte'
  import PlayerCardMenu from '$lib/components/PlayerCardMenu.svelte'

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
      <div on:click={() => handleClick(index)}>
        <PowerCard bind:card={player.cards[index]} />
        {#if player.cards[index].status === 'open'}
        <PlayerCardMenu cardIndex={index} {playerIndex} bind:player />
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
    position: relative;
  }

</style>
