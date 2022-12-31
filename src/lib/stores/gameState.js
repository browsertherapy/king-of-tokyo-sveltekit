import {writable} from 'svelte/store';

export const gameState = writable({
  playerInTokyoIndex: -1,
  players: []
});
