<script lang="ts">
  import { gameState } from "../stores/gameState";
  import { send, receive } from "$lib/game/card-transition"
  import { flip } from 'svelte/animate';
  import PowerCard from "$lib/components/PowerCard.svelte";
  import type { Card } from '../game/game-types'

  export let faceUp: Card[];
  
  const deck = "faceUp";

  const sweep = () => {
    gameState.sweepFaceUpCards();
    gameState.dealNewFaceUpDeck();
  };

  gameState.dealNewFaceUpDeck();
</script>

<section class="face-up-deck">
  <!-- Centre things -->
  <h2>
    Power Cards
    <button class="sweep-cards" on:click={sweep}>Sweep Cards</button>
  </h2>
  <ul>
    {#each faceUp as card, index (card.id)}
    <li
      in:receive={{ key: card.id }}
      out:send={{ key: card.id }}
      animate:flip={{ duration: 200 }}
    >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div>
          <PowerCard {card} {deck} cardIndex={index}/>
        </div>
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

  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }

  @media screen and (orientation: portrait) {
    ul {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
    }
  }
</style>
