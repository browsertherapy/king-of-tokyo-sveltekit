import {writable} from 'svelte/store';
import {powerCards} from '../game/game';
import {shuffle} from '../game/game-kit';
import type { Player, Game } from '../game/game-types'

function createPlayer(name: string = 'Player'): Player {
  return {
    name,
    health: 10,
    money: 0,
    vp: 0,
    cards: [],
  }
}

function createGame() {
  const { subscribe, set, update } = writable<Game>({
      decks: {
        shuffled: shuffle(powerCards.filter((item) => item.status === 'active')),
        faceUp: [],
        discard: []
      },
      playerInTokyoIndex: -1,
      players: []
    }
  );

  return {
		subscribe,
    set,
		setPlayers: (numPlayers: number) => {
      update(game => {
        for (let i = 1; i <= numPlayers; i++) {
          game.players[game.players.length] = createPlayer(`Player ${i}`);
        }
        return game;
      })
    },
    dealFaceUpCard: (position: number) => {
      // Dealing to an explicit position in the decl for cleaner animations
      update(game => {
        const dealtCard = game.decks.shuffled.pop();
          if (typeof dealtCard != 'undefined') { // Stop undefined cards from entering the faceUp array
            dealtCard.id = game.decks.shuffled.length;
            game.decks.faceUp.splice(position, 0, dealtCard);
          }
        return game;
      })
    },    
    dealNewFaceUpDeck: () => {
      // Deal three new cards
      update(game => {
        for (let i = 0; i < 3; i++) {
          const dealtCard = game.decks.shuffled.pop();
          if (typeof dealtCard != 'undefined') { // Stop undefined cards from entering the faceUp array
            dealtCard.id = game.decks.shuffled.length;
            game.decks.faceUp.push(dealtCard);
          }
        }
        return game;
      })
    },
    buyKeepCard: (currentCardIndex: number, playerIndex: number) => {
      update(game => {
        const boughtCard = game.decks.faceUp.splice(currentCardIndex, 1)[0]; // splice returns an array of one
        game.players[playerIndex].cards.push(boughtCard);

        return game;
      })
    },
    buyDiscardCard: (currentCardIndex: number) => {
      update(game => {
        const boughtCard = game.decks.faceUp.splice(currentCardIndex, 1)[0]; // splice returns an array of one
        game.decks.discard.push(boughtCard);

        return game;
      })
    },
    sweepFaceUpCards: () => {
      update((game) => {
        while(game.decks.faceUp.length) {
          // Using a while loop to create cleaner Sweep animations in Svelte
          game.decks.discard.push(game.decks.faceUp.splice(game.decks.faceUp.length - 1, 1)[0]);
        }
        return game;
      })
    },
    transferPlayerCard: (currentPlayerIndex: number, currentCardIndex: number, newPlayerIndex: number) => {
      update(game => {
        // Remove card from current Player deck
        const movedCard = game.players[currentPlayerIndex].cards.splice(currentCardIndex, 1)[0];

        // Push the card onto the new Player deck
        game.players[newPlayerIndex].cards.push(movedCard);

        return game;
      })
    },
    discardPlayerCard: (currentPlayerIndex: number, currentCardIndex: number) => {
      update(game => {
        // Remove card from current Player deck
        const discardedCard = game.players[currentPlayerIndex].cards.splice(currentCardIndex, 1)[0];

        // Push the card onto the Discard deck
        game.decks.discard.push(discardedCard);

        return game;
      })
    },
    discardFaceUpCard: (currentCardIndex: number) => {
      update(game => {
        // Remove card from current Player deck
        const discardedCard = game.decks.faceUp.splice(currentCardIndex, 1)[0];

        // Push the card onto the Discard deck
        game.decks.discard.push(discardedCard);

        return game;
      })
    }
	};
}

export const gameState = createGame();
