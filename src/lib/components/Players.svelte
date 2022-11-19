<script>
  import {gameState} from '../stores/gameState.js';

  import PlayerStats from '$lib/components/PlayerStats.svelte';
  import PlayerCards from '$lib/components/PlayerCards.svelte';

  export let players;

  function tokyoChanged(index) {
    $gameState.playerInTokyoIndex = index;
  }
</script>

<div class="players">
  <h2>Players</h2>
  <section class="player-decks">
    {#each players as player, index}
      <div class="player" class:in-tokyo={index === $gameState.playerInTokyoIndex}>
        <h4><input bind:value={player.name}/></h4>
        <label class="tokyo-select"><input type="radio" name="in-tokyo" on:change={() => tokyoChanged(index)}/> <i class="fa-solid fa-crown"></i></label>
        <PlayerStats/>
        <PlayerCards cards={player.cards}/>
      </div>
    {/each}
  </section>
</div>

<style>
  .players {
    --text-color: black;
    --icon-color: grey;

    --bg: transparent;

    margin-top: 1em;
  }
  .in-tokyo {
    --text-color: white;
    --bg: black;
    --icon-color: gold;
  }

  h4 {
    background-color: var(--bg);
  }
  h4 input {
    border: none;
    font-family: var(--header-font);
    font-size: 1em;
    text-align: center;
    color: var(--text-color);
    background-color: transparent;
  }

  .player {
    position: relative;
  }
  .player-decks {
    display: flex;
    flex-wrap: wrap;
  }

  .player-decks > div {
    flex: 1 1 20ch;
  }

  .player-decks ul {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  label {
    color: var(--icon-color);
  }

  .tokyo-select {
    position: absolute;
    top: -.23em;
    right: 10px;
    cursor: pointer;
  }
  .tokyo-select input {
    display: none;
  }
/* 
  .in-tokyo .tokyo-select {
    display: none;
  } */


</style>
