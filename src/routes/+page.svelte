<script>
  import {gameState} from '$lib/stores/gameState.js';
  import GameBoard from '$lib/components/GameBoard.svelte';
</script>

<svelte:head>
  <title>King of Tokyo</title>
  <meta name="description" content="King of Tokyo board game."/>
</svelte:head>

{#if $gameState.players.length}
<GameBoard/>
{:else}
<article class="set-players">
  <h1>How many players?</h1>
  <button on:click={() => {gameState.setPlayers(2)}}>2 Players</button>
  <button on:click={() => {gameState.setPlayers(3)}}>3 Players</button>
  <button on:click={() => {gameState.setPlayers(4)}}>4 Players</button>
</article>
{/if}

<style>
  .set-players {
    width: max-content;
    margin: auto;
    text-align: center;
  }
</style>