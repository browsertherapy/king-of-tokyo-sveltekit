<script>
  import PlayerStats from '$lib/components/PlayerStats.svelte';
  import PlayerCards from '$lib/components/PlayerCards.svelte';

  export let players;
</script>

<div class="players">
  <h2>Players</h2>
  <section class="player-decks">
    {#each players as player}
      <div>
        <h4><input bind:value={player.name}/></h4>
        <PlayerStats/>
        <PlayerCards cards={player.cards}/>
      </div>
    {/each}
  </section>
</div>

<style>
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

  input {
    border: none;
    font-family: var(--header-font);
    font-size: 1em;
    text-align: center;
  }
</style>
