import {writable} from 'svelte/store';
import {powerCards} from '../game/game.js';
import {shuffle} from '../game/game-kit.js';

function Player(name) {
  this.name = name ? name : 'player';
  this.health = 10;
  this.money = 0;
  this.vp = 0;
  this.cards = [];
}

function createGame() {
  const { subscribe, set, update } = writable({
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
		setPlayers: (numPlayers) => {
      update(game => {
        for (let i = 1; i <= numPlayers; i++) {
          game.players[game.players.length] = new Player(`Player ${i}`);
        }
        return game;
      })
    },
    dealFaceUpCard: (position) => {
      // Dealing to an explicit position in the decl for cleaner animations
      update(game => {
          if (game.decks.shuffled.length > 0) { // Stop undefined cards from entering the faceUp array
            const dealtCard = game.decks.shuffled.pop();
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
          if (game.decks.shuffled.length > 0) { // Stop undefined cards from entering the faceUp array
            const dealtCard = game.decks.shuffled.pop();
            dealtCard.id = game.decks.shuffled.length;
            game.decks.faceUp.push(dealtCard);
          }
        }
        return game;
      })
    },
    buyKeepCard: (currentCardIndex, playerIndex) => {
      update(game => {
        const boughtCard = game.decks.faceUp.splice(currentCardIndex, 1)[0]; // splice returns an array of one
        game.players[playerIndex].cards.push(boughtCard);

        return game;
      })
    },
    buyDiscardCard: (currentCardIndex) => {
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
    transferPlayerCard: (currentPlayerIndex, currentCardIndex, newPlayerIndex) => {
      update(game => {
        // Remove card from current Player deck
        const movedCard = game.players[currentPlayerIndex].cards.splice(currentCardIndex, 1)[0];

        // Push the card onto the new Player deck
        game.players[newPlayerIndex].cards.push(movedCard);

        return game;
      })
    },
    discardPlayerCard: (currentPlayerIndex, currentCardIndex) => {
      update(game => {
        // Remove card from current Player deck
        const discardedCard = game.players[currentPlayerIndex].cards.splice(currentCardIndex, 1)[0];

        // Push the card onto the Discard deck
        game.decks.discard.push(discardedCard);

        return game;
      })
    },
    discardFaceUpCard: (currentCardIndex) => {
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
