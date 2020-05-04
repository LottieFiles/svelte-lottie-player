<script>
  import LottiePlayer from "../components/LottiePlayer.svelte";

  export let src;
  export let autoplay;
  export let loop;
  export let controls;
  export let renderer;
  export let background;
  export let defaultFrame;
  export let hover;
  export let speed;
  export let mode;
  export let width;
  export let height;
  export let style;
  export let controlsLayout;

  let parsedControlsLayout;

  $: parsedControlsLayout = controlsLayout.split(",");
</script>

<style>
  :global(body) {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 13px;
  }
</style>

<h1>Lottie Player</h1>
<p>Load and play lottie animations</p>

<LottiePlayer
  {src}
  {autoplay}
  {loop}
  {controls}
  {renderer}
  {background}
  {defaultFrame}
  {hover}
  {speed}
  {mode}
  {height}
  {width}
  {style}
  controlsLayout={parsedControlsLayout} />

<p>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type
  specimen book. It has survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. It was popularised in
  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
  and more recently with desktop publishing software like Aldus PageMaker
  including versions of Lorem Ipsum.
</p>
