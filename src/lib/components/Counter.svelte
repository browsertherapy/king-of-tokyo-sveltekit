<script lang="ts">
  export let count: number;
  export let max: number | null = null;
  export let icon = '';
  export let card = false;
  export let player = false;

  const decrementCounter = () => {
    if (count > 0) {
      count--;
    }
  }
  
  const incrementCounter = () => {
    if (!max || count < max) {
      count++;
    }
  }
</script>

<div class="counter" class:card-counter={card} class:player-counter={player}>
  <button on:click={decrementCounter} aria-label="Decrease the counter by one">
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5"/>
    </svg>
  </button>

  <i class="icon fa-solid fa-{icon}"></i>

  <div class="value">{count}</div>

  <button on:click={incrementCounter} aria-label="Increase the counter by one">
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1"/>
    </svg>
  </button>
</div>

<style>
  .counter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 5px;
    max-width: 7ch;
    margin: auto;

    border: 1px solid #ddd;
    border-radius: 30px;
    padding: 0 11px;

    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
  }

  .card-counter {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  .player-counter {
    border: 0;
    box-shadow: none;
    padding: 0;
    gap: 0;
  }

  button {
    padding: 0;
    border: 0;
    margin: 0;
    background-color: transparent;
    touch-action: manipulation;
    cursor: pointer;
    font-size: 0.8em;
  }

  button svg {
    width: 0.5em;
  }

  path {
    vector-effect: non-scaling-stroke;
    stroke-width: 2px;
    stroke: #888;
  }

  .value {
    font-size: 0.8em;
    min-width: 25px;
    text-align: center;
  }

  .icon {
    font-size: .7em;
  }

  .fa-heart {
    color: red;
  }

  .fa-star {
    color: lightblue;
  }

  .fa-bolt {
    color: rgb(1, 185, 1);
  }
</style>
