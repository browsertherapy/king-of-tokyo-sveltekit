export type dieFace =
  {
    label: 'heal' | 'attack' | 'money' | 'one' | 'two' | 'three'
  }

export type Roller = {
  remaining: number,
  defaultDiceNum: number,
  maxDiceNum: number,
  dice: RollerSlot[]
}

export type RollerSlot = {
  id: number,
  value: string,
  keep: boolean,
  extra: boolean,
  reRoll: boolean
}

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
