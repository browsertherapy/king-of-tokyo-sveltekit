<script>
  import {shuffle} from '$lib/game/game-kit';

  import PlayerStats from '$lib/components/PlayerStats.svelte';
  import PlayerCards from '$lib/components/PlayerCards.svelte';
  import Counter from '$lib/components/Counter.svelte';

  export let playerInTokyoIndex;
  export let players;

  const tokyoChanged = index => {
    playerInTokyoIndex = index;
  }

  const randomizePlayers = (e) => {
    players = shuffle(players);
    e.target.disabled = true;
  }

  const blurNameInput = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  }

  const selectNameInputText = (e) => {
    e.target.select();
  }

</script>

<div class="players">
  <h2>Players
    <button class="randomize-players" on:click={randomizePlayers}>Randomize</button>
  </h2>
  <section class="player-decks">
    {#each players as player, index}
      <div class="player" class:in-tokyo={index === playerInTokyoIndex}>
        <div>
          <Counter icon='person-falling-burst' count={0} player={true} />
        </div>  
        <h4><input bind:value={players[index].name} on:keydown={blurNameInput} on:focus={selectNameInputText}/></h4>
        <label class="tokyo-select"><input type="radio" name="in-tokyo" on:change={() => tokyoChanged(index)}/> <i class="fa-solid fa-crown"></i></label>
        <PlayerStats bind:player={players[index]} />
        <PlayerCards bind:player={players[index]} playerIndex={index} />
      </div>
    {/each}
  </section>
</div>

<style>
  
  h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .players {
    --text-color: black;
    --icon-color: grey;

    --bg: transparent;

    margin-top: 1em;
  }

  h4 {
    background-color: var(--bg);
    padding: 0.5rem;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }

  h4 input {
    border: none;
    font-family: var(--header-font);
    font-size: 1em;
    text-align: center;
    color: var(--text-color);
    background-color: transparent;
    width: 12ch;
  }
  
  .in-tokyo {
    --text-color: white;
    --bg: black;
    --icon-color: gold;
  }

  .in-tokyo .counter {
    color: white;
  }

  .player {
    position: relative;
  }

  .player-decks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .player-decks > div {
    flex: 1 1 20ch;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
    border: 1px solid #ddd;
    border-radius: 15px;

    max-width: 25ch;
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
    top: 0;
    right: 10px;
    cursor: pointer;
  }
  .tokyo-select input {
    display: none;
  }

  .player > div {
    position: absolute;
    top: 4px;
    left: 10px;
  }
  .player.in-tokyo > div {
    color: white;
  }
/* 
  .in-tokyo .tokyo-select {
    display: none;
  } */


</style>
