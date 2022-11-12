<script>
  export let count = 0;
  export let icon = '';
</script>

<div class="counter">
  <button on:click={() => (count -= 1)} aria-label="Decrease the counter by one">
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5"/>
    </svg>
  </button>

  <i class="icon fa-solid fa-{icon}"></i>

  <div class="value">{count}</div>

  <button on:click={() => (count += 1)} aria-label="Increase the counter by one">
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

    border: 1px solid #ddd;
    border-radius: 30px;
    padding: 0 11px;

    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.08);
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
    stroke: #444;
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

  .fa-bolt-lightning {
    color: rgb(1, 185, 1);
  }
</style>
