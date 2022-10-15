<script>
	import Counter from '$lib/components/Counter.svelte';
</script>

<section class="player-stats">
  <Counter type='health' count={10}/>
  <Counter type='vp' />
  <Counter type='energy' />
</section>

