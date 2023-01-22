<script>
  import {gameState} from '../stores/gameState.js';

  export let player;
  export let cardIndex;
  export let playerIndex;

  const closeMenu = () => {
    $gameState.players[playerIndex].cards[cardIndex].status = 'active';

    const currentCard = $gameState.players[playerIndex].cards.splice(cardIndex, 1)[0];
    $gameState.players[playerIndex].cards.splice(cardIndex, 0, currentCard);

    console.log($gameState.players[playerIndex].cards[cardIndex].status);
  }

  const discardCard = () => {
    player.cards[cardIndex].status = 'active';

    const currentCard = player.cards.splice(cardIndex, 1)[0];

    $gameState.decks.discard = [...$gameState.decks.discard, currentCard];
    console.log($gameState.decks.discard);
  }
</script>

<article class="card-menu">
  <button on:click={discardCard}>Discard</button>
  <button>Move</button>
  <button on:click={closeMenu}>Close</button>
</article>

<style>

  article.card-menu {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #e8e8e8;
    border-radius: 1rem;

  }

  article.card-menu {
    display: flex;
  }

  /* article.card-menu {
    display: none;
  } */
</style>
