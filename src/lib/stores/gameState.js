import {writable} from 'svelte/store';

function Player(name) {
  this.name = name ? name : 'player';
  this.health = 10;
  this.money = 0;
  this.vp = 0;
  this.cards = [];
}

function createGame() {
  const { subscribe, set, update } = writable({
      playerInTokyoIndex: -1,
      players: []
    }
  );


  return {
		subscribe,
    set,
		addPlayer: () => update((game) => {
      game.players[game.players.length] = new Player(`Player ${game.players.length + 1}`);
      return game;
    })
	};
}

export const gameState = createGame();
