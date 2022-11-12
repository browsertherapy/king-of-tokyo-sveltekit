<script>
	import DiceRoller from '$lib/components/DiceRoller.svelte';
	import {onMount} from 'svelte';
	import {Player} from '$lib/game/players.js';
	import DiscardDeck from './DiscardDeck.svelte';
	import Players from '$lib/components/Players.svelte';
	import FaceUpDeck from '$lib/components/FaceUpDeck.svelte';

	let players = [];
	let discard = [];

	onMount(async () => {
		// Player Setup
		// Prompt for players
		const numPlayers = prompt("How many players?");

		for (let i = 1; i <= numPlayers; i++) {
			players.push(new Player(`Player ${i}`));
		}
		;

		players = players;
	});
</script>


<DiceRoller/>
<div class="cards">
	<FaceUpDeck bind:players bind:discard/>
	<DiscardDeck card={discard[discard.length - 1]}/>
</div>
<Players {players}/>