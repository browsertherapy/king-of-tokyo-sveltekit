<script>
  export let text = '';

  const map = {
    '[health]': '<span class="symbol health"><i class="fa-solid fa-heart"></i></span>',
    '[heart]': '<span class="symbol health die"><i class="fa-solid fa-heart"></i></span>', // die
    '[attack]': '<span class="symbol attack die"><i class="fa-solid fa-paw"></i></span>',
    '[vp]': '<span class="symbol vp"><i class="fa-solid fa-star"></i></span>',
    '[energy]': '<span class="symbol energy die"><i class="fa-solid fa-bolt"></i></span>',
    '[money]': '<span class="symbol money"><i class="fa-solid fa-bolt"></i></span>',
    '[1]': '<span class="symbol die one"><i class="fa-solid fa-dice-one"></i></span>',
    '[2]': '<span class="symbol die two"><i class="fa-solid fa-dice-two"></i></span>',
    '[3]': '<span class="symbol die three"><i class="fa-solid fa-dice-three"></i></span>'
  }

  function iconReplace(input) {
    for (let key in map) {
      input = input.replaceAll(key, map[key]);
    }
    return input;
  }

  $: render = iconReplace(text);
</script>

{@html render}

<style global>
  .symbol {
    display: inline-grid;
    place-items: center;
    margin: 0 0.1em;
  }
  span.die {
    background: #999;
    height: 1.5em;
    width: 1.5em;
    border-radius: 0.2em;
  }

  span.health {
    color: red;
  }
  span.attack {
    color: yellow;
  }
  span.vp {
    color: lightblue;
  }
  span.energy {
    color: lightgreen;
  }
  span.money {
    color: lightgreen;
  }
</style>
