<script>
  export let animationData;

  let author;
  let frameRate;
  let generator;
  let keywords;
  let numAssets;
  let numFonts;
  let numFrames;
  let numLayers;
  let themeColor;
  let version;
  let hasMeta = false;

  $: {
    if (animationData) {
      frameRate = animationData.fr;
      numAssets = animationData.assets ? animationData.assets.length : 0;
      numFonts = animationData.fonts ? animationData.fonts.length : 0;
      numFrames = animationData.op - animationData.ip;
      numLayers = animationData.layers ? animationData.layers.length : 0;
      version = animationData.v;

      if (animationData.meta) {
        hasMeta = true;
        author = animationData.meta.a;
        generator = animationData.meta.g;
        keywords = animationData.meta.k;
        themeColor = animationData.meta.tc;
      }
    }
  }
</script>

<style>
  h4 {
    font-size: 0.85rem;
    padding: 5px;
    margin: 0;
  }
  .property {
    display: flex;
    flex-direction: row;
    font-size: 0.75rem;
    align-items: center;
    justify-content: space-between;
    padding: 3px 5px;
  }

  .label {
    display: block;
    color: #999;
  }

  .value {
    display: block;
    color: #666;
  }
</style>

<h4>Info</h4>

{#if version}
  <div class="property">
    <span class="label">Lottie Version</span>
    <span class="value">{version}</span>
  </div>
{/if}

{#if numFrames}
  <div class="property">
    <span class="label">Frames</span>
    <span class="value">{numFrames}</span>
  </div>
{/if}

{#if frameRate}
  <div class="property">
    <span class="label">Frame Rate</span>
    <span class="value">{frameRate}</span>
  </div>
{/if}

{#if numLayers}
  <div class="property">
    <span class="label">Layers</span>
    <span class="value">{numLayers}</span>
  </div>
{/if}

{#if numAssets}
  <div class="property">
    <span class="label">Assets</span>
    <span class="value">{numAssets}</span>
  </div>
{/if}

{#if numFonts}
  <div class="property">
    <span class="label">Fonts</span>
    <span class="value">{numFonts}</span>
  </div>
{/if}

{#if hasMeta}
  <hr />

  {#if generator}
    <div class="property">
      <span class="label">Generator</span>
      <span class="value">{generator}</span>
    </div>
  {/if}

  {#if author}
    <div class="property">
      <span class="label">Author</span>
      <span class="value">{author}</span>
    </div>
  {/if}

  {#if keywords}
    <div class="property">
      <span class="label">Keywords</span>
      <span class="value">{keywords}</span>
    </div>
  {/if}

  {#if themeColor}
    <div class="property">
      <span class="label">Theme Color</span>
      <span class="value">{themeColor}</span>
    </div>
  {/if}
{/if}
