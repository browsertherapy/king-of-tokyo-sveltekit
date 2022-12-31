<script>
  import {gameState} from '../stores/gameState.js';
  import DiceRoller from '$lib/components/DiceRoller.svelte';
  import {onMount} from 'svelte';
  import {Player} from '$lib/game/players.js';
  import DiscardDeck from './DiscardDeck.svelte';
  import Players from '$lib/components/Players.svelte';
  import FaceUpDeck from '$lib/components/FaceUpDeck.svelte';

  let players = [];
  let discard = [];

  onMount(async () => {
    // Player Setup
    // Prompt for players
    let numPlayers = prompt('How many players (2-4)?');

    while (numPlayers < 2 || numPlayers > 4) {
      numPlayers = prompt('Please choose a number from 2-4.');
    }
    
    for (let i = 1; i <= numPlayers; i++) {
      players.push(new Player(`Player ${i}`));
    }

    $gameState.players = players;
  });
</script>


<DiceRoller/>
<div class="cards">
  <FaceUpDeck bind:discard bind:players={$gameState.players}/>
  <DiscardDeck card={discard[discard.length - 1]}/>
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
