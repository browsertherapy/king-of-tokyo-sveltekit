<script>
  export let card;
  export let onClick = null;

  const meClicky = (e) => onClick(e);

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article data-id="{card.label}" class="card" aria-label="{card.label}" on:click={meClicky}>
  <header>
    <h3>{card.label}</h3>
    <p class="price">{card.cost}</p>
  </header>
  <p class="description">{card.description}</p>
  <p class="card-type">{card.type}</p>
</article>
