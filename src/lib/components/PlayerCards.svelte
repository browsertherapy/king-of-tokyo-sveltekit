<script>
  import PowerCard from '$lib/components/PowerCard.svelte'
  
  export let player;
  export let playerIndex;
  
  const location = {
    deck: 'player',
    playerIndex
  }

</script>

<ul class="player-cards">
  {#each player.cards as card, index}
    <li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div>
        <!-- Move CardMenu into PowerCard component -->
        <PowerCard 
          card={player.cards[index]} 
          {...location}
          cardIndex={index}
        />
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
