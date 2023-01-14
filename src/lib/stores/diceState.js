import {writable} from 'svelte/store';

export const roller = writable({
  remaining: 3,
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

