<script>
	import PowerCard from '$lib/components/PowerCard.svelte'
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import DiceRoller from '$lib/components/DiceRoller.svelte';
	import { onMount } from 'svelte';

	import { shuffle } from '$lib/game/game-kit.js';
	import { cards } from '$lib/game/game.js';
	import { Player } from "$lib/game/players.js";

	let players = [];
	let faceUp = [];
	let discard = [];
	let buyFaceUpCard;
	let sweepFaceUpCards;

	const init = () => {

		// Player Setup
		// Prompt for players
		const numPlayers = prompt("How many players?");

		for (let i = 1; i <= numPlayers; i++) {
			players.push(new Player(`Player ${i}`));
		};

		players = players;

		buyFaceUpCard = event => {
			const activeCardIndex = faceUp.findIndex((card) => card.label == event.currentTarget.getAttribute('data-id'));
			const activeCard = faceUp[activeCardIndex];

			if (activeCard.type === 'keep') {
				// Remove clicked card from FaceUp deck and push to Player X deck 
				let toPlayer = parseInt(prompt("Which player?"));
				toPlayer--;

				const boughtCard = faceUp.splice(activeCardIndex, 1)[0]; // splice returns an array of one
				players[toPlayer].cards.push(boughtCard);

				dealFaceUpCard(1);
			} else if (activeCard.type === 'discard') {
				// Move clicked card to Discards
				const boughtCard = faceUp.splice(activeCardIndex, 1)[0]; // splice returns an array of one
				discard.push(boughtCard);
				dealFaceUpCard(1);
			}

			players = players;
			faceUp = faceUp;
			discard = discard;
		}
		
		sweepFaceUpCards = () => {
			discard = discard.concat(faceUp);
			faceUp = [];

			dealFaceUpCard(3);

			faceUp = faceUp;
			discard = discard;

		}

		// Cards
		const shuffledDeck = shuffle(cards.filter((item) => item.status === 'active'));

		const dealFaceUpCard = (numCards) => {
			// TODO: Check for the end of the deck; reshuffle discards? Check rules
			for (let i = 0; i < numCards; i++) {
				faceUp.push(shuffledDeck.pop());
			}
		}
		
		dealFaceUpCard(3);

		faceUp = faceUp;
		discard = discard;
	}

	onMount(async () => {
		init(); 
	}); 
</script>


<DiceRoller />
<div class="cards">
	<section class="face-up-deck">
		<!-- Centre things -->
		<h2>Power Cards <button class="sweep-cards" on:click={sweepFaceUpCards}>Sweep Cards</button></h2>
		<ul>
			{#each faceUp as card}
				<li>
					<PowerCard {card} onClick={buyFaceUpCard} />
				</li>
			{/each}
		</ul>
	</section>
	<section class="discard-deck">
		<h2>Discards</h2>
		<ul>
			<li>
				{#if discard.length > 0}
				<PowerCard card={discard[discard.length - 1]} />
				{/if}
			</li>
		</ul>
	</section>
</div>
<div class="players">
	<h2>Players</h2>
	<section class="player-decks">
		{#each players as player}
			<div>
				<h4>{player.name}</h4>
				<PlayerStats />
				<ul>
					{#each player.cards as card}
						<li>
							<PowerCard {card} />
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</section>
</div>
