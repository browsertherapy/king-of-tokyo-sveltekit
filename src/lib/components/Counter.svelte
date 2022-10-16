<script>
	import { spring } from 'svelte/motion';

	export let count = 0;
	export let icon = '';

	// const displayed_count = spring();
	// $: displayed_count.set(count);
	// $: offset = modulo($displayed_count, 1);

	// function modulo(n, m) {
	// 	// handle negative numbers
	// 	return ((n % m) + m) % m;
	// }
</script>

<div class="counter">
	<button on:click={() => (count -= 1)} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5" />
		</svg>
	</button>
	
	<i class="icon fa-solid fa-{icon}"></i>
	
	<div class="counter-viewport">
		<strong>{count}</strong>
	</div>

	<button on:click={() => (count += 1)} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button>
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem auto;
		justify-content: center;
		align-items: center;
	}

	.counter button {
		width: 1rem;
		padding: 0;
		/* display: flex; */
		/* align-items: center;
		justify-content: center; */
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		cursor: pointer;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}


	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		/* width: min-content; */
		height: 2em;
		/* overflow: hidden; */
		text-align: center;
		/* position: relative; */
	}

	.counter-viewport strong {
		/* position: absolute; */
		display: flex;
		padding: .5rem;
		/* width: 100%; */
		/* height: 100%; */
		font-weight: 400;
		color: var(--color-theme-1);
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		/* position: absolute; */
		/* width: 100%; */
		/* height: 100%; */
	}

	.hidden {
		top: -100%;
		user-select: none;
	}

	
	.icon {
		font-size: 2rem;
	}
	
	.fa-heart {
		color: red;
	}

	.fa-star {
		color: lightblue;
	}

	.fa-bolt-lightning {
		color: rgb(1, 185, 1);
	}
</style>
