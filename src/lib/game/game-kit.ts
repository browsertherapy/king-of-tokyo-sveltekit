import type { RollerSlot, dieFace } from '$lib/game/game-types';

const isFairDie = (dieFace: number) => {
  const validFaces = [2, 4, 6, 8, 10, 12, 20];
  return validFaces.includes(dieFace);
}

export const roll = (die: /* number | */ Array<dieFace>) => {
  // TODO: Why doesn't the isInteger() check remove 
  // "Argument of type 'T[]' is not assignable to parameter of type 'number'."

  // if (Number.isInteger(die) && isFairDie(die)) return Math.ceil(Math.random() * die);
  if (Array.isArray(die) && isFairDie(die.length)) return die[Math.floor(Math.random() * die.length)];
  return {label: 'Invalid'};
}

// Takes array of dice and returns a reduced count of each die face
export const reduceRollResults = (resultsArray: RollerSlot[]) => {

  // TODO: Can the `acc` be converted to a Union Type?
  const rollResults = resultsArray.reduce((acc: Record<string, number>, curr) => {

    if (typeof acc[curr.value] == 'undefined') {
      acc[curr.value] = 1;
    } else {
      acc[curr.value] += 1;
    }
    return acc;
  }, {});

  return rollResults;
}

// Shuffles an array using Fisher–Yates algorithm
export const shuffle = <T>(array: Array<T>) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
