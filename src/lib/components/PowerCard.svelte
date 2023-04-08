<script>
  import {gameState} from '../stores/gameState.js';
  import IconText from './IconText.svelte';
  import Counter from '$lib/components/Counter.svelte';
  import CardMenu from '$lib/components/CardMenu.svelte'

  // TODO: Refactor card to use locations (deck, playerIndex, cardIndex)
  export let card;
  export let deck;
  export let playerIndex = null;
  export let cardIndex = null;

  let menuOpen = false;

  const buyFaceUpCard = cardIndex => {
    if (card.type === 'keep') {
      // Remove clicked card from FaceUp deck and push to Player X deck
      let toPlayer = prompt('Which player?');

      if (toPlayer !== null) {
        toPlayer = parseInt(toPlayer); 
        // TODO: Refactor into a isValidPlayerNumber() function or just learn TypeScript
        while (isNaN(toPlayer) || toPlayer < 1 || toPlayer > $gameState.players.length) {
          toPlayer = prompt(`Please choose a number between 1 and ${$gameState.players.length}.`);
          if (toPlayer === null) break;
          toPlayer = parseInt(toPlayer);
        }

        if (!isNaN(toPlayer) && toPlayer !== null) {
          toPlayer--;
          gameState.buyKeepCard(cardIndex, toPlayer);
          gameState.dealFaceUpCard(1);
        }
      }
    } else if (card.type === 'discard') {
      // Move clicked card to Discards
      gameState.buyDiscardCard(cardIndex)
      gameState.dealFaceUpCard(1);
    }
  }

  const handleClick = (index) => {

    if (deck === 'faceUp') {
      buyFaceUpCard(index)
    } else if (deck === 'player') {
      menuOpen = true;
    } else {
      // Discard; do nothing
    }
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
  <article 
    data-id="{card.label}" 
    class="card" 
    aria-label="{card.label}" 
    on:click={() => handleClick(cardIndex)} 
  >
    <header>
      <h3>{card.label}</h3>
      <p class="price">{card.cost}</p>
    </header>
    <p class="description"><IconText text={card.description} /></p>
    <p class="card-type">{card.type}</p>
  </article>
  {#if typeof card.counter !== 'undefined'}
  <Counter icon='arrows-rotate' bind:count={card.counter} max={card.counterMax} card={true}/>
  {/if}
  {#if deck === 'player' && menuOpen === true}
  <CardMenu {cardIndex} {playerIndex} bind:menuOpen={menuOpen} />
  {/if}
<style>
  article.card {
    grid-column: 1 / -1;
    grid-row: 1 / -1;

    display: flex;
    flex-direction: column;

    margin: auto;
    padding: 1.5rem;
    max-width: 30ch;
    min-width: 20ch;

    font-size: 20px;

    height: 100%;

    background: #e8e8e8;

    border-radius: 1rem;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.08),
    0px 2px 2px rgba(0,0,0,0.08),
    0px 4px 4px rgba(0,0,0,0.08),
    0px 8px 8px rgba(0,0,0,0.08);
  }

  article.card header {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 1rem;
  }

  article.card h3 {
    flex: auto;
    font-size: 2rem;
  }

  article.card .price {
    display: flex;
    align-items: center;

    font-family: 'Bangers', sans-serif;
    font-size: 2.5rem;
    line-height: 1.3;

    padding: 1rem;
    margin: 0;

    background-color: black;
    color: white;
    border-radius: 50%;
  }

  article.card .price::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f0e7";

    margin-left: .4rem;
    margin-bottom: 0.25rem;

    color: greenyellow;
    font-size: 2rem;
  }

  article.card .card-type {
    font-family: 'Bangers', sans-serif;
    font-size: 1.2rem;
    line-height: 1.3;
    text-align: center;
    letter-spacing: .1rem;

    width: min-content;
    margin: auto;
    margin-bottom: 0;
    padding: .25rem 1rem;

    background-color: black;
    color: white;
    border-radius: .5rem;
  }

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
    display: none;
  }

  article.card-menu.open {
    display: flex;
  }

  span {
    z-index: -1;
  }

</style>
