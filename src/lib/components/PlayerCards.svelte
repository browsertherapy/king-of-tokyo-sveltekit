<script>
  import PowerCard from '$lib/components/PowerCard.svelte'
  import { send, receive } from "$lib/game/card-transition.js"
  import { flip } from 'svelte/animate';

  export let player;
  export let playerIndex;
  const deck = 'player';

</script>

<ul class="player-cards">
  {#each player.cards as card, index (card.id)}
    <li
      in:receive={{ key: card.id }}
      out:send={{ key: card.id }}
      animate:flip={{ duration: 200 }}
    >
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
