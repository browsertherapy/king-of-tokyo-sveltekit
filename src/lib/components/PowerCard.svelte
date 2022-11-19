<script>
  export let card;
  export let onClick = null;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article data-id="{card.label}" class="card" aria-label="{card.label}" on:click={onClick}>
  <header>
    <h3>{card.label}</h3>
    <p class="price">{card.cost}</p>
  </header>
  <p class="description">{card.description}</p>
  <p class="card-type">{card.type}</p>
</article>

<style>
  article.card {
    display: flex;
    flex-direction: column;

    padding: 1.5rem;
    max-width: 30ch;
    min-width: 20ch;

    font-size: 20px;

    height: 100%;

    background: lightgrey;
    /* aspect-ratio: .75; */
    border-radius: 1rem;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.08),
    0px 2px 2px rgba(0,0,0,0.08),
    0px 4px 4px rgba(0,0,0,0.08),
    0px 8px 8px rgba(0,0,0,0.08);
  }

  article.card header {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    gap: 1rem;
  }

  article.card h3 {
    flex: auto;
    font-size: 2rem;
  }

  article.card .price {
    display: flex;
    align-items: center;

    font-family: 'Bangers', sans-serif;
    font-size: 2.5rem;
    line-height: 1.3;

    padding: 1rem;
    margin: 0;

    background-color: black;
    color: white;
    border-radius: 50%;
  }

  article.card .price::after {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f0e7";

    margin-left: .4rem;
    margin-bottom: 0.25rem;

    color: greenyellow;
    font-size: 2rem;
  }

  article.card .card-type {
    font-family: 'Bangers', sans-serif;
    font-size: 1.2rem;
    line-height: 1.3;
    text-align: center;
    letter-spacing: .1rem;

    width: min-content;
    margin: auto;
    margin-bottom: 0;
    padding: .25rem 1rem;

    background-color: black;
    color: white;
    border-radius: .5rem;
  }
</style>
