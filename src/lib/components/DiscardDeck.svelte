<script lang="ts">
  import PowerCard from './PowerCard.svelte';
  import { receive } from "$lib/game/card-transition"
  import type { Card } from '../game/game-types'

  export let discard: Card[];
  const deck = 'discard';

</script>

<section class="discard-deck">
  <h2>Discards</h2>
  <ul>
    {#each discard as card, index (card.id)}
    <li
      in:receive|global={{ key: card.id }}
    >
        <PowerCard cardIndex={index} {card} {deck}/>
      </li>
    {/each}
  </ul>
</section>

<style>
  .discard-deck {
    display: flex;
    flex-direction: column;
    justify-items: stretch;
  }
  
  ul, li {
    height: 100%;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  li {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    opacity: 0;
  }

  li:last-child {
    opacity: 1;
  }

</style>
