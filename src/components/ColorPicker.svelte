<script>
  import { createEventDispatcher } from "svelte";

  // Create event dispatcher
  const dispatch = createEventDispatcher();

  export let color;

  let red = 0;
  let green = 0;
  let blue = 0;
  let rgba = null;
  let hex = null;

  const parseColor = input => {
    if (typeof input !== "string") {
      return;
    }

    let colorComponents = [];

    if (input[0] === "#") {
      colorComponents =
        input.length === 4
          ? [input.slice(1, 2), input.slice(2, 3), input.slice(3, 4)].map(n =>
              parseInt(`${n}${n}`, 16)
            )
          : [input.slice(1, 3), input.slice(3, 5), input.slice(5, 7)].map(n =>
              parseInt(n, 16)
            );
    } else if (input.startsWith("rgb")) {
      colorComponents = input.match(/\d+/g).map(n => parseInt(n));
    }

    if (colorComponents.length) {
      red = colorComponents[0];
      green = colorComponents[1];
      blue = colorComponents[2];
    }
  };

  $: parseColor(color);

  $: {
    dispatch("color", {
      hex,
      rgb
    });
  }

  $: rgb = `rgb(${red}, ${green}, ${blue})`;

  $: hex =
    "#" +
    (red | (1 << 8)).toString(16).slice(1) +
    (green | (1 << 8)).toString(16).slice(1) +
    (blue | (1 << 8)).toString(16).slice(1);
</script>

<style>
  .text-input {
    border: 1px #ccc solid;
    border-radius: 5px;
    padding: 3px;
    width: 60px;
    margin: 0;
  }

  .color-picker {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 90px;
  }

  .color-selectors {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .color-component {
    display: flex;
    flex-direction: row;
    font-size: 12px;
    align-items: center;
    justify-content: center;
  }

  .color-component strong {
    width: 40px;
  }

  .color-component input[type="range"] {
    margin: 0 0 0 10px;
  }

  .color-component input[type="number"] {
    width: 50px;
    margin: 0 0 0 10px;
  }

  .color-preview {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .preview {
    height: 60px;
    width: 60px;
  }
</style>

<div class="color-picker">
  <div class="color-selectors">
    <div class="color-component">
      <strong>Red</strong>
      <input type="range" min="0" max="255" bind:value={red} />
      <input class="text-input" type="number" bind:value={red} />
    </div>
    <div class="color-component">
      <strong>Green</strong>
      <input type="range" min="0" max="255" bind:value={green} />
      <input class="text-input" type="number" bind:value={green} />
    </div>
    <div class="color-component">
      <strong>Blue</strong>
      <input type="range" min="0" max="255" bind:value={blue} />
      <input class="text-input" type="number" bind:value={blue} />
    </div>
  </div>
  <div class="color-preview">
    <div class="preview" style="background: {rgb}" />
    <div>
      <input
        class="text-input"
        type="text"
        value={hex}
        on:change={e => parseColor(e.target.value)} />
    </div>
  </div>
</div>
