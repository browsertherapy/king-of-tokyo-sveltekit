import {writable} from 'svelte/store';

const dieTemplate = {
        id: null,
        value: '',
        keep: false,
      }

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
    },
    {
      id: 1,
      value: '',
      keep: false,
    },
    {
      id: 2,
      value: '',
      keep: false,
    },
    {
      id: 3,
      value: '',
      keep: false,
    },
    {
      id: 4,
      value: '',
      keep: false,
    },
    {
      id: 5,
      value: '',
      keep: false,
    }
  ]
});

  return {
		subscribe,
    set,
		addDie: () => update((roller) => {
      if (roller.dice.length < roller.maxDiceNum) {
        dieTemplate.id = roller.dice.length;
        roller.dice = [...roller.dice, dieTemplate];
      }
      return roller;
    }),
    removeDie: () => update((roller) => {
      if (roller.dice.length > 0) {
        dieTemplate.id = roller.dice.length;
        roller.dice.splice(roller.dice.length - 1, 1);
      }
      return roller;
    })
	};
}

export const roller = createRoller();

