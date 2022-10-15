<script>
	import { roll,reduceRollResults } from '$lib/game/game-kit.js';
	import { dieFaces, dice } from '$lib/game/game.js';
  
  let rollBtn;
  let resolveBtn
  let resetBtn;
  
  let rollPile;
  let keepPile;
  let resolvePile;
  
  let rollState = 'initial'; // initial|rolling|resolved
  let rollCount = 0;

  let rollResults = [];

  const resolveDice = () => {

    // Reduce the results of the dice
    rollResults = reduceRollResults($dice);
 
    rollState = 'resolved';

  }

  const resetDice = () => {
    $dice.forEach((die, index) => {
      $dice[index].value = '';
      $dice[index].keep = false;
    });
    
    rollCount = 0;
    rollResults = [];
    rollState = 'initial';
  }

  const rollDice = () => {

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

  };

  $: resolveDisabled = rollState!=='rolling';
  $: rollDisabled = rollState==='resolved';
  $: resetDisabled = rollState==='initial';

</script>

<div class="dice">
	<section class="roll-nav">
		<ul>
			<li><button bind:this={rollBtn} on:click={rollDice} class="roll-dice" disabled={rollDisabled}>Roll Dice</button></li>
			<li><button bind:this={resolveBtn} on:click={resolveDice} class="resolve-dice" disabled={resolveDisabled}>Resolve</button></li>
			<li><button bind:this={resetBtn} on:click={resetDice} class="reset-dice" disabled={resetDisabled}>Reset</button></li>
		</ul>
	</section>
	<section class="dice-piles">
    <ul bind:this={keepPile} class="keep-pile">
      {#each $dice as die, index}
        {#if die.keep}
          <li><button on:click={() => $dice[index].keep = !die.keep} class="die {die.value}" aria-label={die.value} disabled={resolveDisabled}></button></li>
        {/if}
      {/each}
		</ul>
		<ul bind:this={rollPile} class="roll-pile">
      {#each $dice as die, index}
        {#if !die.keep}
          <li><button on:click={() => $dice[index].keep = !die.keep} class="die {die.value}" aria-label={die.value} disabled={resolveDisabled}></button></li>
        {/if}
      {/each}
		</ul>
	</section>
	<section bind:this={resolvePile} class="resolve-pile">
		<ul>
      {#each Object.entries(rollResults) as [key, value]}
        <li><button disabled>{key}: {value}</button></li>
      {/each}
		</ul>
	</section>
</div>