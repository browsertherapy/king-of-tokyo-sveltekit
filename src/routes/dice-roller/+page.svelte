<script>
	import { onMount } from 'svelte';

	import {roll, reduceRollResults} from '$lib/game/game-kit.js';
	import {dieFaces, dice} from '$lib/game/game.js';

	const init = () => {
		
		// DOM Setup
		const rollBtn = document.querySelector('.roll-dice');
		const resolveBtn = document.querySelector('.resolve-dice');
		const resetBtn = document.querySelector('.reset-dice');

		const rollPile = document.querySelector('.roll-pile');
		const keepPile = document.querySelector('.keep-pile');
		const resolvePile = document.querySelector('.resolve-pile ul');

		// Dice
		// TODO: Move renderPiles to game.js file?
		const renderPiles = () => {
			let keepListItems = '';
			let rollListItems = '';

			// TODO: Remove repetition in the next 15 lines or so 
			dice.forEach((item) => {
				if (item.keep) {
					keepListItems += `<li><button data-id="${item.id}" class="die ${item.value}" aria-label="${item.value}"></button></li>`;
				} else {
					rollListItems += `<li><button data-id="${item.id}" class="die ${item.value}" aria-label="${item.value}"></button></li>`;      
				}
			})
			
			rollPile.innerHTML = rollListItems;
			keepPile.innerHTML = keepListItems;
			rollPile.querySelectorAll('button').forEach(function(item){
				item.addEventListener('click', toggleKeep);
			});

			keepPile.querySelectorAll('button').forEach(function(item){
				item.addEventListener('click', toggleKeep);
			});
		}

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

		const toggleKeep = event => {
			const dieId = parseInt(event.target.getAttribute('data-id'));
			const die = dice.find(item => item.id === dieId);
			die.keep = !die.keep;  
			renderPiles();
		}

		const resolveDice = () => {

			// Remove click handlers from pile Dice
			const pileDice = document.querySelectorAll('button.die');

			pileDice.forEach((item) => {
				item.removeEventListener('click', toggleKeep);
				item.setAttribute('disabled', '');
			})

			// Disable rolling
			rollBtn.disabled = true;

			// Reduce the results of the dice
			const rollResults = reduceRollResults(dice);
			console.log(rollResults);

			// Take reduced dice results and output to the page
			let keptValuesDisplay = '';
			for(let faceValue in rollResults){
					keptValuesDisplay += `<li><button data-keep="">${faceValue} ${rollResults[faceValue]}</button></li>` 
			}
			resolvePile.innerHTML = keptValuesDisplay; 

			resolveBtn.disabled = true;

		}

		const resetDice = () => {
			dice.forEach((die) => {
				die.value = '';
				die.keep = false;
			});

			rollCount = 0;

			resolveBtn.disabled = true;
			rollBtn.disabled = false;
			rollPile.innerHTML = '';
			keepPile.innerHTML = '';
			resolvePile.innerHTML = '';
		}

		let rollCount = 0;

		resolveBtn.disabled = true; // disable by default


		rollBtn.addEventListener('click', () => {
			resolveBtn.disabled = false; // enable resolve after first roll

			if (rollCount < 3) {
				dice.forEach((die) => {
					if (!die.keep) {
						die.value = roll(dieFaces).label;
					}
				})
		
				rollCount++;

				renderPiles();

				if (rollCount === 3) {
					resolveDice();
				}

			} else {
				resolveDice();
			}

		})

		resetBtn.addEventListener('click', resetDice);
		resolveBtn.addEventListener('click', resolveDice);
	}

	onMount(async () => {
		init(); 
	}); 
</script>

<svelte:head>
	<title>KoT Dice Roller</title>
	<meta name="description" content="King of Tokyo board game." />
</svelte:head>

<div class="dice">
	<section class="roll-nav">
		<ul>
			<li><button class="roll-dice">Roll Dice</button></li>
			<li><button class="resolve-dice">Resolve</button></li>
			<li><button class="reset-dice">Reset</button></li>
		</ul>
	</section>
	<section class="dice-piles">
		<ul class="keep-pile">
		</ul>
		<ul class="roll-pile">
		</ul>
	</section>
	<section class="resolve-pile">
		<ul>
		</ul>
	</section>
</div>

<style>

</style>
