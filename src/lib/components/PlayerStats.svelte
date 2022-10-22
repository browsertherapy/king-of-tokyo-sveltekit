<script>
	import Counter from '$lib/components/Counter.svelte';
</script>

<section class="player-stats">
  <Counter icon='heart' count={10}/>
  <Counter icon='star' />
  <Counter icon='bolt-lightning' />
</section>

<style>
  .player-stats {
    width: min-content;
    margin: auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: .5em;
  }
</style>