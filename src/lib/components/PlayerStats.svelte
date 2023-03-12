<script>
  import Counter from '$lib/components/Counter.svelte';

  export let player;

</script>

<section class="player-stats">
  <Counter icon='heart' bind:count={player.health} max={12} />
  <Counter icon='star' bind:count={player.vp} max={20} />
  <Counter icon='bolt' bind:count={player.money} />
</section>

<style>
  .player-stats {
    width: min-content;
    margin: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .2em;
  }
</style>
