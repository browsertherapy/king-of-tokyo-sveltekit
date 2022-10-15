<script>
  import { onMount } from 'svelte';
	import { roll,reduceRollResults } from '$lib/game/game-kit.js';
	import { dieFaces, dice } from '$lib/game/game.js';

  let rollBtn;
  let resolveBtn
  let resetBtn;

  let rollPile;
  let keepPile;
  let resolvePile;

  let rollState = 'initial'; // initial|rolling|resolved

  // const toggleKeep = event => {
  //   const dieId = parseInt(event.target.getAttribute('data-id'));
  //   const die = $dice.find(item => item.id === dieId);
  //   die.keep = !die.keep;  
  //   dice = dice;
  // }


  const resolveDice = () => {

    // Remove click handlers from pile Dice
    const pileDice = document.querySelectorAll('button.die');

    pileDice.forEach((item) => {
      item.setAttribute('disabled', '');
    })

    // Reduce the results of the dice
    const rollResults = reduceRollResults($dice);

    // Take reduced dice results and output to the page
    let keptValuesDisplay = '';
    for(let faceValue in rollResults){
        keptValuesDisplay += `<li><button data-keep="">${faceValue} ${rollResults[faceValue]}</button></li>` 
    }
    resolvePile.innerHTML = keptValuesDisplay; 
    rollState = 'resolved';

  }

  const resetDice = () => {
    dice.forEach((die) => {
      die.value = '';
      die.keep = false;
    });
    
    rollCount = 0;

    rollState = 'initial';

    rollPile.innerHTML = '';
    keepPile.innerHTML = '';
    resolvePile.innerHTML = '';
  }


	onMount(async () => {
  
    // Dice
    // TODO: Move renderPiles to game.js file?

  
  
    let rollCount = 0;

    // TODO: move to template
    rollBtn.addEventListener('click', () => {

      rollState = 'rolling';

      if (rollCount < 3) {
        $dice.forEach((die, index) => {
          if (!die.keep) {
            $dice[index].value = roll(dieFaces).label;
          }
        })
    
        rollCount++;

        if (rollCount === 3) {
          resolveDice();
        }

      } else {
        resolveDice();
      }

    })

    // TODO: move to template
    resetBtn.addEventListener('click', resetDice);
    resolveBtn.addEventListener('click', resolveDice);

  }); 
  $: resolveDisabled = rollState==='initial' || rollState==='resolved';
  $: rollDisabled = rollState==='resolved';

</script>

<div class="dice">
	<section class="roll-nav">
		<ul>
			<li><button bind:this={rollBtn} class="roll-dice" disabled={rollDisabled}>Roll Dice</button></li>
			<li><button bind:this={resolveBtn} class="resolve-dice" disabled={resolveDisabled}>Resolve</button></li>
			<li><button bind:this={resetBtn} class="reset-dice">Reset</button></li>
		</ul>
	</section>
	<section class="dice-piles">
    <ul bind:this={keepPile} class="keep-pile">
      {#each $dice as die, index}
        {#if die.keep}
          <li><button on:click={() => $dice[index].keep = !die.keep} class="die {die.value}" aria-label={die.value}></button></li>
        {/if}
      {/each}
		</ul>
		<ul bind:this={rollPile} class="roll-pile">
      {#each $dice as die, index}
        {#if !die.keep}
          <li><button on:click={() => $dice[index].keep = !die.keep} class="die {die.value}" aria-label={die.value}></button></li>
        {/if}
      {/each}
		</ul>
	</section>
	<section bind:this={resolvePile} class="resolve-pile">
		<ul>
		</ul>
	</section>
</div>