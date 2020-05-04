<script>
  import { createEventDispatcher } from "svelte";

  import ColorPicker from "./ColorPicker.svelte";
  import Info from "./Info.svelte";
  import Popover from "./Popover.svelte";
  import { ControlsLayoutOptions, PlayerState } from "./utils";

  // Define icon size
  const ICON_SIZE = { width: 24, height: 24 };

  // Create event dispatcher
  const dispatch = createEventDispatcher();

  export let animationData;
  export let background;
  export let currentState;
  export let frame;
  export let freeze;
  export let instance;
  export let layout = ControlsLayoutOptions;
  export let loop;
  export let play;
  export let progress;
  export let seek;
  export let snapshot;
  export let stop;
  export let toggleZoom;
  export let toggleLooping;
  export let togglePlay;
  export let totalFrames = 0;

  let isZoomed = false;

  $: isPlaying = currentState === PlayerState.Playing;
  $: isPaused = currentState === PlayerState.Paused;
  $: isStopped = currentState === PlayerState.Stopped;
  $: formattedFrame = Math.round(frame);

  const onHandleSeekChange = e => {
    if (!instance || isNaN(e.target.value)) {
      return;
    }

    const frame = (e.target.value / 100) * totalFrames;

    seek(frame);
  };

  const onSelectBackground = e => {
    dispatch("background", {
      color: e.detail.hex
    });
  };

  const onToggleZoom = () => {
    isZoomed = !isZoomed;
    toggleZoom();
  };

  const onNextFrame = () => {
    const nextFrame = frame + 1;
    if (nextFrame <= totalFrames) {
      seek(nextFrame);
    }
  };

  const oPreviousFrame = () => {
    const prevFrame = frame - 1;
    if (prevFrame >= 0) {
      seek(prevFrame);
    }
  };
</script>

<style>
  .lottie-player-controls {
    align-items: center;
    background-color: transparent;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 8px;
  }

  .control + .control {
    margin-left: 3px;
  }

  .btn {
    background: none;
    border: 0;
    cursor: pointer;
    display: flex;
    fill: #999;
    height: 24px;
    outline: none;
    padding: 0;
    width: 24px;
  }

  .spacer {
    flex-grow: 1;
    width: 24px;
  }

  .btn:hover {
    fill: #222;
  }

  .btn.active {
    fill: #555;
  }

  .btn.disabled {
    display: none;
  }

  .control.progress {
    -webkit-appearance: none;
    width: 95%;
    outline: none;
    border: none;
    margin: 0 10px;
  }
  .progress::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #ccc;
    border-radius: 3px;
  }
  .progress::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: rgba(0, 107, 120, 0.8);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
  .progress:focus::-webkit-slider-controls-runnable-track {
    background: #999;
  }
  .progress::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #ccc;
    border-radius: 3px;
  }
  .progress::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: rgba(0, 107, 120, 0.8);
    cursor: pointer;
  }
  .progress::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  .progress::-ms-fill-lower {
    background: #ccc;
    border-radius: 3px;
  }
  .progress::-ms-fill-upper {
    background: #ccc;
    border-radius: 3px;
  }
  .progress::-ms-thumb {
    border: 0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: rgba(0, 107, 120, 0.8);
    cursor: pointer;
  }
  .progress:focus::-ms-fill-lower {
    background: #ccc;
  }
  .progress:focus::-ms-fill-upper {
    background: #ccc;
  }

  .popover {
    padding: 10px;
    background: #fff;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 0.75rem;
    border-radius: 5px;
  }

  .popover-snapshot {
    width: 150px;
  }
  .popover-snapshot h5 {
    margin: 5px 0 10px 0;
    font-size: 0.75rem;
  }
  .popover-snapshot a {
    display: block;
    text-decoration: none;
  }
  .popover-snapshot a:before {
    content: "⥼";
    margin-right: 5px;
  }
  .popover-snapshot .note {
    display: block;
    margin-top: 10px;
    color: #999;
  }

  .popover-info {
    width: 250px;
  }

  .frame-number {
    outline: none;
    border: 1px #ccc solid;
    border-radius: 3px;
    width: 40px;
    text-align: center;
    color: #999;
  }

  .popover-background {
    width: 350px;
  }
</style>

<div class="lottie-player-controls">
  {#each layout as item}
    {#if item === 'playpause'}
      <button
        class="control btn"
        on:click={togglePlay}
        class:active={isPlaying || isPaused}>
        {#if isPlaying}
          <svg {...ICON_SIZE}>
            <path
              d="M14.016 5.016H18v13.969h-3.984V5.016zM6
              18.984V5.015h3.984v13.969H6z" />
          </svg>
        {:else}
          <svg {...ICON_SIZE}>
            <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
          </svg>
        {/if}
      </button>
    {:else if item === 'stop'}
      <button class="control btn" on:click={stop} class:active={isStopped}>
        <svg {...ICON_SIZE}>
          <path d="M6 6h12v12H6V6z" />
        </svg>
      </button>
    {:else if item === 'progress'}
      <input
        class="control progress"
        type="range"
        min="0"
        step="1"
        max="100"
        bind:value={progress}
        on:input={onHandleSeekChange}
        on:mousedown={freeze}
        on:mouseup={play} />
    {:else if item === 'loop'}
      <button class="control btn" on:click={toggleLooping} class:active={loop}>
        <svg {...ICON_SIZE}>
          <path
            d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984
            3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984
            3.984-3.984 3.984v-3H6.984z" />
        </svg>
      </button>
    {:else if item === 'background'}
      <div class="control">
        <Popover color="#fff">
          <button class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                d="M12 3.1L7.05 8.05a7 7 0 1 0 9.9 0L12 3.1zm0-2.828l6.364
                6.364a9 9 0 1 1-12.728 0L12 .272zM7 13h10a5 5 0 0 1-10 0z" />
            </svg>
          </button>
          <div slot="content" class="popover popover-background">
            <ColorPicker color={background} on:color={onSelectBackground} />
          </div>
        </Popover>
      </div>
    {:else if item === 'snapshot'}
      <div class="control" on:mouseout={play} on:mouseover={freeze}>
        <Popover
          color="#fff"
          on:mousewheel={e => seek(frame + (e.deltaY > 0 ? -1 : 1))}>
          <button class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                d="M11.993 14.407l-1.552 1.552a4 4 0 1
                1-1.418-1.41l1.555-1.556-4.185-4.185 1.415-1.415 4.185 4.185
                4.189-4.189 1.414 1.414-4.19 4.19 1.562 1.56a4 4 0 1 1-1.414
                1.414l-1.561-1.56zM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0
                1 0 0-4 2 2 0 0 0 0 4zm2-7V5H5v8H3V4a1 1 0 0 1 1-1h16a1 1 0 0 1
                1 1v9h-2z" />
            </svg>
          </button>
          <div slot="content" class="popover popover-snapshot">
            <h5>Frame {formattedFrame}</h5>
            <a href="#downloadsvg" on:click={() => snapshot(true)}>
              Download SVG
            </a>
            <a href="#downloadsvg" on:click={() => snapshot(true)}>
              Download PNG
            </a>
            <i class="note">Scroll with mousewheel to find exact frame</i>
          </div>
        </Popover>
      </div>
    {:else if item === 'zoom'}
      <button class="control btn" on:click={onToggleZoom}>
        {#if isZoomed}
          <svg {...ICON_SIZE}>
            <path
              d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8
              15v6H6v-4H2v-2h6z" />
          </svg>
        {:else}
          <svg {...ICON_SIZE}>
            <path
              d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16
              16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z" />
          </svg>
        {/if}
      </button>
    {:else if item === 'info'}
      <div class="control">
        <Popover color="#fff">
          <button class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                d="M15 4H5v16h14V8h-4V4zM3 2.992C3 2.444 3.447 2 3.999 2H16l5
                5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992zM11
                11h2v6h-2v-6zm0-4h2v2h-2V7z" />
            </svg>
          </button>
          <div slot="content" class="popover popover-info">
            <Info {animationData} />
          </div>
        </Popover>
      </div>
    {:else if item === 'frame'}
      <div class="control">
        <input
          class="frame-number"
          type="text"
          bind:value={formattedFrame}
          on:mouseout={play}
          on:mouseover={freeze}
          on:input={e => seek(e.target.value)}
          on:mousewheel={e => seek(frame + (e.deltaY > 0 ? -1 : 1))} />
      </div>
    {:else if item === 'nextFrame'}
      <button class="control btn" on:click={onNextFrame}>
        <svg {...ICON_SIZE}>
          <path
            d="M12 13.333l-9.223 6.149A.5.5 0 0 1 2 19.066V4.934a.5.5 0 0 1
            .777-.416L12 10.667V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0
            1 0 .832l-10.599 7.066a.5.5 0 0 1-.777-.416v-5.733z" />
        </svg>
      </button>
    {:else if item === 'previousFrame'}
      <button class="control btn" on:click={oPreviousFrame}>
        <svg {...ICON_SIZE}>
          <path
            d="M12 10.667l9.223-6.149a.5.5 0 0 1 .777.416v14.132a.5.5 0 0
            1-.777.416L12 13.333v5.733a.5.5 0 0 1-.777.416L.624 12.416a.5.5 0 0
            1 0-.832l10.599-7.066a.5.5 0 0 1 .777.416v5.733z" />
        </svg>
      </button>
    {:else if item === 'spacer'}
      <span class="control spacer" />
    {/if}
  {/each}
</div>
