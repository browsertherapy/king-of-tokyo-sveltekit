import {writable} from 'svelte/store';

function createRoller() {
  const { subscribe, set, update } = writable({
  remaining: 3,
  defaultDiceNum: 6,
  maxDiceNum: 8,
  dice: [
    {
      id: 0,
      value: '',
      keep: false,
      extra: false,
      reRoll: false
    },
    {
      id: 1,
      value: '',
      keep: false,
      extra: false,
      reRoll: false
    },
    {
      id: 2,
      value: '',
      keep: false,
      extra: false,
      reRoll: false
    },
    {
      id: 3,
      value: '',
      keep: false,
      extra: false,
      reRoll: false
    },
    {
      id: 4,
      value: '',
      keep: false,
      extra: false,
      reRoll: false
    },
    {
      id: 5,
      value: '',
      keep: false,
      extra: false,
      reRoll: false
    }
  ]
});

  return {
		subscribe,
    set,
		addDie: () => update((roller) => {
      if (roller.dice.length < roller.maxDiceNum) {
        const newDie = {
          id: roller.dice.length,
          value: '',
          keep: false,
          extra: false,
          reRoll: false
        }
        if (roller.dice.length >= roller.defaultDiceNum) {
          newDie.extra = true;
        }
        roller.dice = [...roller.dice, newDie];
      }
      return roller;
    }),
    removeDie: () => update((roller) => {
      if (roller.dice.length > 0) {
        roller.dice.splice(roller.dice.length - 1, 1);
      }
      return roller;
    })
	};
}

export const roller = createRoller();

