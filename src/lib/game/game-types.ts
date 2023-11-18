export type Card = {
  id?: number,
  label: string,
  status: 'active' | 'inactive',
  type: 'keep' | 'discard',
  cost: number,
  description: string,
  counter?: number,
  counterDefault?: number,
  counterMax?: number
}

export type Player = {
  name: string;
  health: number;
  money: number;
  vp: number;
  cards: Card[];
}

export type Game = {
  decks: {
      shuffled: Card[];
      faceUp: Card[];
      discard: Card[];
  };
  playerInTokyoIndex: number;
  players: Player[];
}
