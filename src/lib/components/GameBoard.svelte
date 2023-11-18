<script>
  import {gameState} from '../stores/gameState.ts';
  import DiceRoller from '$lib/components/DiceRoller.svelte';
  import DiscardDeck from './DiscardDeck.svelte';
  import Players from '$lib/components/Players.svelte';
  import FaceUpDeck from '$lib/components/FaceUpDeck.svelte';

</script>

<DiceRoller/>
<div class="cards">
  <FaceUpDeck bind:faceUp={$gameState.decks.faceUp}/>
  <DiscardDeck bind:discard={$gameState.decks.discard}/>
</div>
<Players bind:players={$gameState.players} bind:playerInTokyoIndex={$gameState.playerInTokyoIndex}/>

<style>
  .cards {
    display: grid;
    gap: .75em;
    justify-items: center;
    align-items: stretch;

    max-width: 1400px;
    margin: 0 auto;
  }
  @media (min-width: 1400px) {
    .cards {
      grid-template-columns: 3fr 1fr;
    }
  }
</style>
