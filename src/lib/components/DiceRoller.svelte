<script>
  import { roll, reduceRollResults } from '$lib/game/game-kit.js';
  import { dieFaces } from '$lib/game/game.js';
  import { roller } from '$lib/stores/diceState.js';

  export let fullScreen = false;

  let rollBtn;
  let resolveBtn
  let resetBtn;

  let keepPile = [];
  let rollPile = [];

  let rollState = 'initial'; // initial|rolling|resolved

  let rollResults = []; // Raw reduced results of a dice roll
  let displayRollResults = []; // Reduced roll results after 3-of-a-kind logic is taken into account

  const rollResultsMap = {
    'health': '<span class="health"><i class="fa-solid fa-heart"></i></span>',
    'damage': '<span class="damage"><i class="fa-solid fa-paw"></i></span>',
    'vp': '<span class="vp"><i class="fa-solid fa-star"></i></span>',
    'money': '<span class="money"><i class="fa-solid fa-bolt"></i></span>'
  }
  const rollDice = () => {
    
    rollState = 'rolling';
    
    if ($roller.remaining <= 3) {
      // TODO: Move to custom store
      $roller.dice.forEach((die, index) => {
        if (!die.keep) {
          $roller.dice[index].value = roll(dieFaces).label;
        }
      })
      
      $roller.remaining--;
      
      if ($roller.remaining === 0) {
        rollState = 'resolved';
      }
      
    } else {
      rollState = 'resolved';
    }
    
  };

  const addRoll = () => {
    $roller.remaining++;
    rollState = 'rolling';

    // TODO: Move to custom store
    $roller.dice.forEach((die, index) => {
      $roller.dice[index].reRoll = false;
    });
  }

  const resolveDice = () => {
    rollState = 'resolved';
    // TODO: Move to custom store
    $roller.remaining = 0;
  }

  const resetDice = () => {
    // TODO: Move to custom store
    $roller.dice.forEach((die, index) => {
      $roller.dice[index].value = '';
      $roller.dice[index].keep = false;
      $roller.dice[index].reRoll = false;
    });
    
    $roller.remaining = 3;
    rollResults = [];
    displayRollResults = [];
    rollState = 'initial';
  }
  
  
  const handleDieClick = (die) => {
    // Dice are disabled on resolve unless the Re-roll menu is open
    if (rollState == 'resolved' && $roller.dice[die].reRoll === false) return;
    
    if (rollState == 'initial') {
      // Initial state allows user to add and remove dice before rolling
      roller.removeDie();
    } else {
      if ($roller.dice[die].reRoll) {
        // User can re-roll a single die
        $roller.dice[die].value = roll(dieFaces).label;
        $roller.dice[die].reRoll = false;
      } else {
        // Clicking a die moves it from one pile (keep or roll piles) to the other
        $roller.dice[die].keep = !$roller.dice[die].keep;
      }
    }
  }

  const toggleReRoll = (die) => {
    if (!$roller.dice[die].reRoll) {
        $roller.dice[die].reRoll = true;
    } else {
      $roller.dice[die].reRoll = false;
    }
  }

  $: resolveDisabled = rollState !== 'rolling';
  $: rollDisabled = rollState === 'resolved';
  $: resetDisabled = rollState === 'initial';
  $: reRollDisabled = rollState === 'initial';

  $: keepPile = $roller.dice.filter(die => die.keep);
  $: rollPile = $roller.dice.filter(die => !die.keep);
  
  // TODO: Code spike - how best to move 3-of-a-kind logic to a generic game-kit method? Move results icons to a new component?
  $: if ($roller.remaining <= 3) {
    rollResults = reduceRollResults($roller.dice);
    displayRollResults = [];

    for (const key in rollResults) {
      if (key === 'money') {
        for (let i = 0; i < rollResults[key]; i++) {
          displayRollResults = [...displayRollResults, rollResultsMap['money']];
        }
      }
      if (key === 'heal') {
        for (let i = 0; i < rollResults[key]; i++) {
          displayRollResults = [...displayRollResults, rollResultsMap['health']];
        }
      }
      if (key === 'attack') {
        for (let i = 0; i < rollResults[key]; i++) {
          displayRollResults = [...displayRollResults, rollResultsMap['damage']];
        }
      }
      if (['one', 'two', 'three'].includes(key)) {
        rollResults[key] = rollResults[key] - 2;
        if (rollResults[key] > 0) {
          for (let i = 0; i < rollResults[key]; i++) {
            if (key === 'three') {
              displayRollResults = [...displayRollResults, rollResultsMap['vp'], rollResultsMap['vp'], rollResultsMap['vp']];
            } else if (key === 'two') {
              displayRollResults = [...displayRollResults, rollResultsMap['vp'], rollResultsMap['vp']];
            } else {
              console.log('one');
              displayRollResults = [...displayRollResults, rollResultsMap['vp']];
            }
          }
        }
      }
    }

  }

</script>

<div class="dice" class:full-screen={fullScreen}>
  <section class="roll-nav">
    <ul>
      <li>
        <button bind:this={rollBtn} on:click={rollDice} class="roll-dice" disabled={rollDisabled}>Roll Dice: {$roller.remaining}</button><button on:click={addRoll} class="add-roll" disabled={!rollDisabled}>+</button>
      </li>
      <li>
        <button bind:this={resolveBtn} on:click={resolveDice} class="resolve-dice" disabled={resolveDisabled}>Resolve
        </button>
      </li>
      <li>
        <button bind:this={resetBtn} on:click={resetDice} class="reset-dice" disabled={resetDisabled}>Reset</button>
      </li>
    </ul>
  </section>
  <section class="dice-piles">
    {#if keepPile.length}
      <ul class="keep-pile">
        {#each keepPile as die}
          <li>
            <button on:click={() => handleDieClick(die.id)} class="die {die.value} {(die.extra) ? 'extra' : ''}" class:disabled ={rollDisabled} class:reroll = {die.reRoll} aria-label={die.value}></button>
            {#if !reRollDisabled}
            <button on:click={() => toggleReRoll(die.id)} 
              class="toggle-reroll {(die.reRoll) ? 'close-button' : 'open-button'}"
            >
            </button>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
    {#if rollPile.length}
      <ul class="roll-pile">
        {#each rollPile as die}
          <li>
            <button 
              on:click={() => handleDieClick(die.id)} 
              class="die {rollDisabled} {die.value || 'empty'} {(die.extra) ? 'extra' : ''}" 
              class:disabled={rollDisabled} 
              class:reroll = {die.reRoll} 
              aria-label={die.value}
            ></button>
            {#if !reRollDisabled}
            <button on:click={() => toggleReRoll(die.id)} 
              class="toggle-reroll {(die.reRoll) ? 'close-button' : 'open-button'}"
            >
            </button>
            {/if}
          </li>
        {/each}
        {#if rollPile.length < $roller.maxDiceNum && resetDisabled}
          <li class="add-die">
            <button on:click={roller.addDie}></button>
          </li>
        {/if}
      </ul>
    {/if}
  </section>
  <section class="resolve-pile">
    <ul>
      {#each displayRollResults as result}
        <li>
          {@html result}
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  :root {
    --dice-font-size: 65%;
    --direction: column;
    --roller-width: min-content;
    --grid-areas: 
      'resolve piles'
      'nav     piles';
  }

  .full-screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .dice {
    display: grid;
    grid-auto-columns: 1fr;
    grid-template-areas: 
      var(--grid-areas);
  }

  .roll-nav {
    padding: 1rem 0;
    grid-area: nav;
    height: min-content;
  }
  .roll-nav ul {
    display: flex;
    flex-direction: var(--direction);
    justify-content: center;
    padding-left: 0;
    margin: 0;
  }

  .roll-nav button {
    border-radius: 0.5rem 0.5rem;
    border: 1px solid #aaa;
  }
  button.roll-dice {
    border-radius: 0.5rem 0 0 0.5rem;
    border: 1px solid #aaa;
    margin-right: 0;
  }

  button.add-roll {
    border-radius: 0 0.5rem 0.5rem 0;
    border: 1px solid #aaa;
    border-left: 0;
    margin-left: 0;
  }

  .resolve-pile {
    grid-area: resolve;
  }
  .resolve-pile ul {
    display: flex;
    flex-direction: var(--direction);
    justify-content: center;
    list-style: none;
    gap: 0.5rem;
  }

  .dice {
    margin-bottom: 5rem;
  }

  /* TODO: Figure out how to display dice on mobile */
  .dice-piles {
    grid-area: piles;

    display: flex;
    flex-direction: var(--direction);
    justify-content: center;
    align-items: center;
  }

  .roll-pile, .keep-pile {
    display: flex;
    flex-direction: var(--direction);
    gap: 0.5em;
    align-items: center;

    margin: 0;
    padding: 0.5em;
  }

  .roll-pile {
    position: relative;
  }

  .keep-pile {
    box-shadow: inset 0 0 5px rgba(0,0,0,0.6);
    background-color: hsl(0deg, 0%, 93%);
    border-radius: 1em;
    width: var(--roller-width);
  }

  .roll-pile li, .keep-pile li {
    position: relative;
  }

  .die {
    display: grid;
    place-items: center;
    width: 3em;
    height: 3em;
    font-size: var(--dice-font-size);

    margin: 0;
    padding: 0;

    color: hsl(60deg, 90%, 55%);
    border-radius: 0.2em;
    background-color: hsl(250deg, 10%, 40%);
    box-shadow: 0px 1px 1px rgba(0,0,0,0.08),
    0px 2px 2px rgba(0,0,0,0.08),
    0px 4px 4px rgba(0,0,0,0.08),
    0px 8px 8px rgba(0,0,0,0.08);
    border: none;
  }

  .die.extra {
    background-color: hsl(60deg, 90%, 55%);
    color: hsl(250deg, 10%, 40%);
  }

  .roll-pile > .add-die {
    position: absolute;
    bottom: .45em;
    left: -2em;
  }

  .add-die button {
    display: grid;
    place-items: center;
    width: 3em;
    height: 3em;
    font-size: var(--dice-font-size);
    border-radius: 0.2em;

    margin: 0;
    padding: 0;

    background: transparent;
    border: 4px dashed #ddd;
  }

  .die::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 1.75em;
  }

  .die:hover {
    cursor: pointer;
    color: hsl(60deg, 100%, 55%);
    background-color: hsl(250deg, 20%, 40%);
  }

  /* TODO: Refactor using custom SVGs */
  button.die.empty:hover::before {
    content: "\58";
    color: #aaa;
  }
  
  button.die.one::before {
    content: "\f525";
  }

  button.die.two::before {
    content: "\f528";
  }

  button.die.three::before {
    content: "\f527";
  }

  button.die.attack::before {
    content: "\f1b0";
  }

  button.die.heal::before {
    content: "\f004";
  }

  button.die.money::before {
    content: "\f0e7";
  }


  .die.disabled {
    opacity: .75;
  }

  .die.disabled:hover {
    color: hsl(60deg, 90%, 55%);
    background-color: hsl(250deg, 10%, 40%);
  }
  
  .die.extra:hover {
    background-color: hsl(60deg, 100%, 55%);
    color: hsl(250deg, 20%, 40%);
  }
  .die.disabled.extra:hover {
    background-color: hsl(60deg, 90%, 55%);
    color: hsl(250deg, 10%, 40%);
  }

  .die.reroll::after {
    content: 'Re-Roll';

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.5rem;
    padding: 0 0.5rem;
    width: max-content;
    background-color: hsl(250deg, 10%, 0%, 0.75);
    color: white;

    border-radius: 50px;
  }

  .die + .toggle-reroll {
    position: absolute;
    top: -30px;
    right: -30px;
    
    display: grid;
    justify-content: start;
    align-content: end;

    background: transparent;
    border: transparent;
  }

  .die + .toggle-reroll::before {
    padding-top: 1.20rem;
    padding-right: .9rem;
    cursor: pointer;
    color: #777;
  }

  .die + .close-button::before {
    content: "\f00d";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    color: #ccc;
  }
  .die + .open-button::before {
    content: "\f141";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
  }

  @media screen and (orientation: landscape) {
    :root {
      --direction: row;
      --grid-areas: 
        'nav'
        'piles'
        'resolve';
      --dice-font-size: 100%;

    }
    .dice {
      grid-auto-rows: min-content;
    }
    .roll-pile > .add-die {
      right: -3em;
      bottom: initial;
      left: initial;
    }

    .die + .toggle-reroll {
      top: -25px;
      right: -25px;
    }
  }

</style>
