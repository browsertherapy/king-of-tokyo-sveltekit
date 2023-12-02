<script lang="ts">
  export let text = '';

  const map: Record<string, string> = {
    '[health]': '<span class="symbol health"><i class="fa-solid fa-heart"></i></span>',
    '[heart]': '<span class="symbol heart die"><i class="fa-solid fa-heart"></i></span>',
    '[attack]': '<span class="symbol attack die"><i class="fa-solid fa-paw"></i></span>',
    '[vp]': '<span class="symbol vp"><i class="fa-solid fa-star"></i></span>',
    '[energy]': '<span class="symbol energy die"><i class="fa-solid fa-bolt"></i></span>',
    '[money]': '<span class="symbol money"><i class="fa-solid fa-bolt"></i></span>',
    '[1]': '<span class="symbol die one"><i class="fa-solid fa-dice-one"></i></span>',
    '[2]': '<span class="symbol die two"><i class="fa-solid fa-dice-two"></i></span>',
    '[3]': '<span class="symbol die three"><i class="fa-solid fa-dice-three"></i></span>',
    '[0 health]': '<span class="symbol death"><i class="fa-solid fa-skull"></i></span>'
  }
  // TODO: Ask Lakin about how to turn this into a Union Type
  function iconReplace(input: string) {
    for (let key in map) {
      input = input.replaceAll(key, map[key]);
    }
    return input;
  }

  $: render = iconReplace(text);
</script>

{@html render}
