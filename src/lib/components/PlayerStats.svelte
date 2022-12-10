<script>
  import Counter from '$lib/components/Counter.svelte';
</script>

<section class="player-stats">
  <Counter icon='heart' count={10} max={12} />
  <Counter icon='star' max={20} />
  <Counter icon='bolt-lightning'/>
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
