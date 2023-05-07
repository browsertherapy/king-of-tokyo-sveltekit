<script>
  import {gameState} from '../stores/gameState.js';

  export let playerIndex = null;
  export let cardIndex;
  export let menuOpen = true;
  export let deck;

  let menu;

  if (deck === 'player') {
    menu = 'player';
  } else if (deck === 'faceUp' && $gameState.decks.faceUp[cardIndex].type === 'keep') {
    menu = 'move';
  } else if (deck === 'faceUp' && $gameState.decks.faceUp[cardIndex].type === 'discard') {
    menu = 'discard';
  } else {
    menu = null;
  }

  console.log(deck, menu);

  const close = () => menuOpen = false;

  const discard = () => {
    if (deck === 'faceUp') {
      gameState.discardFaceUpCard(cardIndex);
      gameState.dealFaceUpCard(1);
    } else if (deck === 'player') {
      gameState.discardPlayerCard(playerIndex, cardIndex);
    }
    close();
  }

  const showMoveMenu = () => menu = 'move';

  const showDiscardMenu = () => menu = 'discard';

  const moveCard = (index) => {
    if (deck === 'faceUp') {
      gameState.buyKeepCard(cardIndex, index);
      gameState.dealFaceUpCard(1);
      close();
    } else if (deck === 'player') {
      // Reset any card counters for new player
      // TODO: Move to card reset() method?
      if (typeof $gameState.players[playerIndex].cards[cardIndex].counter !== 'undefined') {
        $gameState.players[playerIndex].cards[cardIndex].counter = $gameState.players[playerIndex].cards[cardIndex].counterDefault;
      }
  
      gameState.transferPlayerCard(playerIndex, cardIndex, index);
      close();
    }
  }
</script>

{#if menu === 'move'}
<article class="card-menu">
  {#each $gameState.players as player, index}
  <button 
    on:click={() => moveCard(index)} 
    disabled={playerIndex === index}
  >{player.name}</button>
  {/each}
  <button on:click={close}>Close</button>
</article>

{:else if menu === 'player'}

<article class="card-menu">
  <button on:click={showMoveMenu}>Move</button>
  <button on:click={showDiscardMenu}>Discard</button>
  <button on:click={close}>Close</button>
</article>

{:else if menu === 'discard'}

<article class="card-menu">
  <button on:click={discard}>{menu === 'FaceUp' ? 'Buy Card?' : 'Discard Card?'}</button>
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
