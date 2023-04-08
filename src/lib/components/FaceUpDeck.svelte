<script>
  import {gameState} from '../stores/gameState.js';
  import PowerCard from '$lib/components/PowerCard.svelte';
  import {onMount} from 'svelte';

  export let decks;
  export let players;

  const buyFaceUpCard = event => {
    // Find current card object
    const activeCardIndex = decks.faceUp.findIndex((card) => card.label == event.currentTarget.getAttribute('data-id'));
    const activeCard = decks.faceUp[activeCardIndex];

    if (activeCard.type === 'keep') {
      // Remove clicked card from FaceUp deck and push to Player X deck
      let toPlayer = prompt('Which player?');

      if (toPlayer !== null) {
        toPlayer = parseInt(toPlayer); 
        // TODO: Refactor into a isValidPlayerNumber() function or just learn TypeScript
        while (isNaN(toPlayer) || toPlayer < 1 || toPlayer > players.length) {
          toPlayer = prompt(`Please choose a number between 1 and ${players.length}.`);
          if (toPlayer === null) break;
          toPlayer = parseInt(toPlayer);
        }

        if (!isNaN(toPlayer) && toPlayer !== null) {
          toPlayer--;
          gameState.buyKeepCard(activeCardIndex, toPlayer);
          gameState.dealFaceUpCard(1);
        }
      }
    } else if (activeCard.type === 'discard') {
      // Move clicked card to Discards
      gameState.buyDiscardCard(activeCardIndex)
      gameState.dealFaceUpCard(1);
    }
  }

  const sweep = () => {
    gameState.sweepFaceUpCards();
    gameState.dealFaceUpCard(3);
  }

  onMount(() => {
    gameState.dealFaceUpCard(3);
  });
</script>

<section class="face-up-deck">
  <!-- Centre things -->
  <h2>Power Cards
    <button class="sweep-cards" on:click={sweep}>Sweep Cards</button>
  </h2>
  <ul>
    {#each decks.faceUp as card}
      <li>
        <PowerCard {card} on:click={buyFaceUpCard}/>
      </li>
    {/each}
  </ul>
</section>

<style>

  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    place-items: stretch;
    gap: 1rem;

    list-style: none;
    padding-left: 0;
  }

  ul li {
    display: flex;
    flex-direction: column;
  }

  @media screen and (orientation: portrait) {
    ul {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
    }
  }

</style>
