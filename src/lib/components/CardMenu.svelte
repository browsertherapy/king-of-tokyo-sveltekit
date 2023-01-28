<script>
  import {gameState} from '../stores/gameState.js';

  export let player;
  export let cardIndex;

  const close = () => {
    player.cards[cardIndex].status = 'active';
  }

  const discard = () => {
    player.cards[cardIndex].status = 'active';

    const currentCard = player.cards.splice(cardIndex, 1)[0];

    $gameState.decks.discard = [...$gameState.decks.discard, currentCard];
  }

</script>

<article class="card-menu">
  <button on:click={discard}>Discard</button>
  <button>Move</button>
  <button on:click={close}>Close</button>
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

</style>
