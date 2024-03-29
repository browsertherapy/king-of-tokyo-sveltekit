<script lang="ts">
  import IconText from './IconText.svelte';
  import Counter from '$lib/components/Counter.svelte';
  import CardMenu from '$lib/components/CardMenu.svelte'
  import type { Card } from '../game/game-types'

  export let card: Card;
  export let deck: 'discard' | 'faceUp' | 'player';
  export let playerIndex: number | null = null;
  export let cardIndex: number;
  
  let menuOpen = false;

  const handleClick = () => {
    if (deck !== 'discard') {
      menuOpen = true;
    } else {
      // Discard; do nothing
    }
  }

  // Commented to fix menu bug when upgrading Svelte 3.55 -> 3.59
  // $: card, menuOpen = false; // Close menu if card changes

</script>

  <button 
    data-id="{card.label}" 
    class="card" 
    aria-label="{card.label}" 
    on:click={() => handleClick()} 
  >
    <header>
      <h3>{card.label}</h3>
      <p class="price">{card.cost}</p>
    </header>
    <p class="description"><IconText text={card.description} /></p>
    <p class="card-type">{card.type}</p>
  </button>

  {#if typeof card.counter !== 'undefined'}
  <Counter icon='arrows-rotate' bind:count={card.counter} max={card.counterMax} card={true}/>
  {/if}

  {#if deck !== 'discard' && menuOpen === true}
  <CardMenu {cardIndex} {playerIndex} {deck} bind:menuOpen={menuOpen} />
  {/if}

<style>
  button.card {
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

    border: none;
    border-radius: 1rem;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.08),
    0px 2px 2px rgba(0,0,0,0.08),
    0px 4px 4px rgba(0,0,0,0.08),
    0px 8px 8px rgba(0,0,0,0.08);
  }

  button.card header {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 1rem;
  }

  button.card h3 {
    flex: auto;
    font-size: 2rem;
  }

  button.card .price {
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

  button.card .price::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f0e7";

    margin-left: .4rem;
    margin-bottom: 0.25rem;

    color: greenyellow;
    font-size: 2rem;
  }

  button.card .card-type {
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

</style>
