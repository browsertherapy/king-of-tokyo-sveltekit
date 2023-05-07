<script>
  import PowerCard from '$lib/components/PowerCard.svelte'
  
  export let player;
  export let playerIndex;
  const deck = 'player';

</script>

<ul class="player-cards">
  {#each player.cards as card, index}
    <li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div>
        <PowerCard 
          card={player.cards[index]} 
          cardIndex={index}
          {playerIndex}
          {deck}
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
