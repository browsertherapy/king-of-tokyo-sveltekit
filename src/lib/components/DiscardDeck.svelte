<script>
  import PowerCard from './PowerCard.svelte';

  export let card;
</script>

<section class="discard-deck">
  <h2>Discards</h2>
  <ul>
    <li>
      {#if card}
        <PowerCard {card}/>
      {/if}
    </li>
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

</style>
