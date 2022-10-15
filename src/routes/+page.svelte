<script>
	import Counter from '$lib/components/Counter.svelte';
	import PlayerStats from '$lib/components/PlayerStats.svelte';
	import DiceRoller from '$lib/components/DiceRoller.svelte';
	import { onMount } from 'svelte';

	import {shuffle} from '$lib/game/game-kit.js';
	import {cards} from '$lib/game/game.js';
	import { Player } from "$lib/game/players.js";

	let players = [];

	const init = () => {

		const faceUpDeck = document.querySelector('.face-up-deck ul');
		const sweepBtn = document.querySelector('.sweep-cards');
		const discardDeck = document.querySelector('.discard-deck ul');
		const playerDecks = document.querySelector('.player-decks');

		// Player Setup
		// Prompt for players
		const numPlayers = prompt("How many players?");

		for (let i = 1; i <= numPlayers; i++) {
			players.push(new Player(`Player ${i}`));
		};
		
		players = players;

		// Render Deck Function
		const renderFaceUpDeck = () => {
			let faceUpListItems = '';

			faceUp.forEach((item, index) => {
					faceUpListItems += `<li><article data-id="${index}" class="card" aria-label="${item.label}">
						<header>
							<h3>${item.label}</h3>
							<p class="price">${item.cost}</p>
						</header>
						<p class="description">${item.description}</p>
						<p class="card-type">${item.type}</p>
					</article></li>`;
			})
			
			faceUpDeck.innerHTML = faceUpListItems;

			faceUpDeck.querySelectorAll('article').forEach(function(item){
				item.addEventListener('click', buyFaceUpCard);
			});
		}

		const renderDiscardDeck = () => {
			let discardListItems = '';
			console.log(discard);

			if(discard.length > 0) {
				discardListItems = `<li><article data-id="${discard[discard.length-1].label}" class="card" aria-label="${discard[discard.length-1].label}">
					<header>
						<h3>${discard[discard.length-1].label}</h3>
						<p class="price">${discard[discard.length-1].cost}</p>
					</header>
					<p class="description">${discard[discard.length-1].description}</p>
					<p class="card-type">${discard[discard.length-1].type}</p>
				</article></li>`;
			}
			
			discardDeck.innerHTML = discardListItems;

		}

		const renderPlayerDecks = () => {
			// let playerDeckList = '';
			// players.forEach((player) => {
			// 	let playerDeckItemList = '';
			// 	player.cards.forEach((card) => {
			// 		playerDeckItemList += `<li><article data-id="${card.label}" class="card" aria-label="${card.label}">
			// 				<header>
			// 					<h3>${card.label}</h3>
			// 					<p class="price">${card.cost}</p>
			// 				</header>
			// 				<p class="description">${card.description}</p>
			// 				<p class="card-type">${card.type}</p>
			// 			</article></li>`;
			// 		console.log(card)
			// 	})
			// 	playerDeckList += `<div><h4>${player.name}</h4><ul>${playerDeckItemList}</ul></div>`;
			// })
			// playerDecks.innerHTML = playerDeckList;

		}

		const buyFaceUpCard = event => {

			const activeCard = faceUp[parseInt(event.currentTarget.getAttribute('data-id'))];

			if (activeCard.type === 'keep') {
				let toPlayer = parseInt(prompt("Which player?"));
				toPlayer--;
				players[toPlayer].cards.push(faceUp.splice(parseInt(event.currentTarget.getAttribute('data-id')), 1)[0]);
				addToFaceUp(1);
				console.log(players);
			} else if (activeCard.type === 'discard') {
				discard.push(faceUp.splice(parseInt(event.currentTarget.getAttribute('data-id')), 1)[0]);
				addToFaceUp(1);
			}

			players = players;
			
			renderDiscardDeck();
			renderFaceUpDeck();
			renderPlayerDecks();
		}
		
		const sweepFaceUpCards = () => {
			discard = discard.concat(faceUp);
			faceUp = [];
			console.log(discard);

			addToFaceUp(3);
			renderDiscardDeck();
			renderFaceUpDeck();

		}

		// Cards
		let faceUp = [];
		let discard = [];
		const shuffledDeck = shuffle(cards.filter((item) => item.status === 'active'));

		const addToFaceUp = (numCards) => {
			// TODO: Check for the end of the deck; reshuffle discards? Check rules
			for (let i = 0; i < numCards; i++) {
				faceUp.push(shuffledDeck.pop());
			}
		}

		sweepBtn.addEventListener('click', sweepFaceUpCards);
		
		addToFaceUp(3);
		console.log(faceUp);
		renderFaceUpDeck();
		renderDiscardDeck();
		renderPlayerDecks();
	}

	onMount(async () => {
		init(); 
	}); 
</script>

<svelte:head>
	<title>King of Tokyo</title>
	<meta name="description" content="King of Tokyo board game." />
</svelte:head>

<DiceRoller />
<div class="cards">
	<section class="face-up-deck">
		<!-- Centre things -->
		<h2>Power Cards <button class="sweep-cards">Sweep Cards</button></h2>
		<ul>
		</ul>
	</section>
	<section class="discard-deck">
		<h2>Discards</h2>
		<ul>
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
							<article data-id="{card.label}" class="card" aria-label="{card.label}">
								<header>
									<h3>{card.label}</h3>
									<p class="price">{card.cost}</p>
								</header>
								<p class="description">{card.description}</p>
								<p class="card-type">{card.type}</p>
							</article>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</section>
</div>

<Counter />

<style>

</style>
