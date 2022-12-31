<script>
  import PowerCard from '$lib/components/PowerCard.svelte';
  import {onMount} from 'svelte';

  export let decks;
  export let players;

  const buyFaceUpCard = event => {
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
    
          const boughtCard = decks.faceUp.splice(activeCardIndex, 1)[0]; // splice returns an array of one
          players[toPlayer].cards[players[toPlayer].cards.length] = boughtCard;
    
          dealFaceUpCard(1);
        }
      }
    } else if (activeCard.type === 'discard') {
      // Move clicked card to Discards
      const boughtCard = decks.faceUp.splice(activeCardIndex, 1)[0]; // splice returns an array of one
      decks.discard.push(boughtCard);
      dealFaceUpCard(1);
    }
  }

  const sweepFaceUpCards = () => {
    decks.discard = decks.discard.concat(decks.faceUp);
    decks.faceUp = [];

    dealFaceUpCard(3);
  }

  const dealFaceUpCard = (numCards) => {
    // TODO: Check for the end of the deck; reshuffle discards? Check rules
    for (let i = 0; i < numCards; i++) {
      decks.faceUp[decks.faceUp.length] = decks.shuffled.pop();
    }
  }

  onMount(() => {
    dealFaceUpCard(3);
  });
</script>

<section class="face-up-deck">
  <!-- Centre things -->
  <h2>Power Cards
    <button class="sweep-cards" on:click={sweepFaceUpCards}>Sweep Cards</button>
  </h2>
  <ul>
    {#each decks.faceUp as card}
      <li>
        <PowerCard {card} onClick={buyFaceUpCard}/>
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
    /* TODO: Make responsive on mobile (either flex or media query) */
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    place-items: stretch;
    gap: 1rem;

    list-style: none;
    padding-left: 0;
  }
</style>
