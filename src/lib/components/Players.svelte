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
        <h4>{player.name}</h4>
        <PlayerStats/>
        <PlayerCards cards={player.cards}/>
      </div>
    {/each}
  </section>
</div>
