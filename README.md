# King of Tokyo - Virtual Game Board v1.0
- [Repository](https://github.com/browsertherapy/king-of-tokyo-sveltekit)
- [Live Demo](https://king-of-tokyo.vercel.app/)
    - [Stand-alone Dice Roller](https://king-of-tokyo.vercel.app/dice-roller)
- [Project Board](https://github.com/orgs/browsertherapy/projects/4)

## Usage
This game board is meant to be used over screen share software. All players will share their screen during their turn and the game host will update and screenshare the main game board at the end of each turn.

**Video: Example Game Play**
Coming soon

### Game Setup
1. Connect with players over video conferencing software of your choice (i.e. Zoom, Google Meet, etc).
2. Choose one player to host the [full game board](https://king-of-tokyo.vercel.app/);
3. All other players load the [dice roller](https://king-of-tokyo.vercel.app/dice-roller);
4. Game host: 
    - Choose number of players;
    - Set player names;
    - Optional: Randomize player order.

### Game Play
Starting with Player 1:
1. Share screen
2. Roll dice
3. Resolve dice
4. Game Host
    1. Share screen so others can see game status and cards
    2. Update counters for players, if needed
    3. Move current player in Tokyo, if Tokyo Monster leaves
    3. Buy cards for current player, if needed
5. Next player: go to Step 1, share screen and repeat!

## Attributions
- Game Rules
  - [King of Tokyo](https://boardgamegeek.com/boardgame/70323/king-tokyo)
- Dice
  - [Font Awesome](https://fontawesome.com)
- Cards
  - Shuffling with [theFisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    - Stack Overflow: [How to randomize (shuffle) a JavaScript array](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    - [Cool visualization](https://bost.ocks.org/mike/shuffle/)