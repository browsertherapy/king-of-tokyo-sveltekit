<script>
  import {gameState} from '../stores/gameState.js';

  // TODO: Uncouple UI state from game logic. For example, does card.status need to be bound to $gameState?
  export let playerIndex;
  export let cardIndex;

  let menu = 'player';

  const close = () => {
    $gameState.players[playerIndex].cards[cardIndex].status = 'active';
  }

  const discard = () => {
    $gameState.players[playerIndex].cards[cardIndex].status = 'active';

    const currentCard = $gameState.players[playerIndex].cards.splice(cardIndex, 1)[0];

    $gameState.decks.discard = [...$gameState.decks.discard, currentCard];
  }

  const showMoveMenu = () => {
    menu = 'move';
  }
  const moveCard = (index) => {
    // Remove card from current location and add it to the new location all in one line
    $gameState.players[index].cards = [...$gameState.players[index].cards, $gameState.players[playerIndex].cards.splice(cardIndex, 1)[0]];

    // Reset the card and player indexes to reflect the new card location
    cardIndex = $gameState.players[index].cards.length - 1;
    playerIndex = index;
    
    // Reset any card counters for new player
    if (typeof $gameState.players[playerIndex].cards[cardIndex].counter !== 'undefined') {
      $gameState.players[playerIndex].cards[cardIndex].counter = $gameState.players[playerIndex].cards[cardIndex].counterDefault;
    }

    close();
  }
</script>

{#if menu === 'move'}
<article class="card-menu">
  {#each $gameState.players as player, index}
  <button on:click={() => moveCard(index)} disabled={playerIndex === index}>{player.name}</button>
  {/each}
  <button on:click={close}>Close</button>
</article>
{:else}
<article class="card-menu">
  <button on:click={discard}>Discard</button>
  <button on:click={showMoveMenu}>Move</button>
  <button on:click={close}>Close</button>
</article>
{/if}

<style>

  article.card-menu {
    grid-column: 1 / -1;
    grid-row: 1 / -1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #e8e8e8;
    border-radius: 1rem;

    z-index: 10;
  }

  article.card-menu {
    display: flex;
  }

</style>
