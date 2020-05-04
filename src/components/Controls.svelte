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
    margin-left: 4px;
  }

  .btn {
    background: none;
    border: 0;
    cursor: pointer;
    display: flex;
    fill: #999;
    height: 14px;
    outline: none;
    padding: 0;
    width: 14px;
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
    height: 3px;
    cursor: pointer;
    background: #ccc;
    border-radius: 3px;
  }
  .progress::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #0fccce;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
  }
  .progress:focus::-webkit-slider-controls-runnable-track {
    background: #999;
  }
  .progress::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: #ccc;
    border-radius: 3px;
  }
  .progress::-moz-range-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #0fccce;
    cursor: pointer;
  }
  .progress::-ms-track {
    width: 100%;
    height: 3px;
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
    background: #0fccce;
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
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
      sans-serif;
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
    content: '⥼';
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
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
      sans-serif;
    font-size: 0.7rem;
    height: 14px;
    padding: 0px;
  }

  .popover-background {
    width: 350px;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';

  import ColorPicker from './ColorPicker.svelte';
  import Info from './Info.svelte';
  import Popover from './Popover.svelte';
  import { ControlsLayoutOptions, PlayerState } from './utils';

  // Define icon size
  const ICON_SIZE = { width: 14, height: 14, viewBox: '0 0 24 24' };

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
    dispatch('background', {
      color: e.detail.hex,
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

<div class="lottie-player-controls">
  {#each layout as item}
    {#if item === 'playpause'}
      <button class="control btn" on:click="{togglePlay}" class:active="{isPlaying || isPaused}">
        {#if isPlaying}
          <svg {...ICON_SIZE}>
            <rect height="22.9" rx="1.9" width="7.6" x="14" y=".5"></rect>
            <rect height="22.9" rx="1.9" width="7.6" x="2" y=".5"></rect>
          </svg>
        {:else}
          <svg {...ICON_SIZE}>
            <path d="M2 3.4C2 1.9 3.5 1 4.8 1.8l16.5 9.6c1.2.7 1.2 2.5 0 3.2L4.8 24.2C3.5 25 2 24.1 2 22.6V3.4z"></path>
          </svg>
        {/if}
      </button>
    {:else if item === 'stop'}
      <button class="control btn" on:click="{stop}" class:active="{isStopped}">
        <svg {...ICON_SIZE}>
          <path
            d="M2 3.667A1.67 1.67 0 0 1 3.667 2h16.666A1.67 1.67 0 0 1 22 3.667v16.666A1.67 1.67 0 0 1 20.333
            22H3.667A1.67 1.67 0 0 1 2 20.333z"
          ></path>
        </svg>
      </button>
    {:else if item === 'progress'}
      <input
        class="control progress"
        type="range"
        min="0"
        step="1"
        max="100"
        bind:value="{progress}"
        on:input="{onHandleSeekChange}"
        on:mousedown="{freeze}"
        on:mouseup="{play}"
      />
    {:else if item === 'loop'}
      <button class="control btn" on:click="{toggleLooping}" class:active="{loop}">
        <svg {...ICON_SIZE}>
          <path
            d="M22 4.8L17.6.3a1 1 0 00-1.5 0c-.4.4-.5 1.2-.1 1.6l3.3 3.6-3.2 3.4c-.4.4-.4 1.4 0 1.8a1 1 0 001.5 0L22
            6.2a1 1 0 000-1.4z"
          ></path>
          <path
            d="M3.8 4.5h17.5v2.2H5v6.9c0 .6-.6 1-1.1 1-.6 0-1.2-.4-1.2-1V5.5c0-.6.6-1 1.2-1zm-.9 15l4.5 4.4c.4.4 1 .4
            1.4 0 .4-.4.6-1.3.2-1.7l-3.4-3.5 3.2-3.4c.4-.4.4-1.4 0-1.8a1 1 0 00-1.4 0L2.9 18a1 1 0 000 1.5z"
          ></path>
          <path d="M21.2 19.7H3.6v-2.2h16.5v-6.9c0-.6.5-1 1-1 .7 0 1.2.4 1.2 1v8c0 .6-.5 1.1-1.1 1.1z"></path>
        </svg>
      </button>
    {:else if item === 'background'}
      <div class="control">
        <Popover color="#fff">
          <button class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                d="M12 3.1L6.1 8.6a7.6 7.6 0 00-2.2 4 7.2 7.2 0 00.4 4.4 7.9 7.9 0 003 3.5 8.7 8.7 0 004.7 1.3c1.6 0
                3.2-.5 4.6-1.3s2.4-2 3-3.5a7.2 7.2 0 00.5-4.5 7.6 7.6 0 00-2.2-4L12 3.2zM12 0l7.5 7a9.8 9.8 0 013 5.1
                9.3 9.3 0 01-.6 5.8c-.9 1.8-2.2 3.3-4 4.4A11.2 11.2 0 0112 24a11.2 11.2 0
                01-6-1.7c-1.7-1-3-2.6-3.9-4.4a9.3 9.3 0 01-.6-5.8c.4-2 1.5-3.7 3-5L12 0zM6 14h12c0 1.5-.7 3-1.8 4s-2.6
                1.6-4.2 1.6S9 19 7.8 18s-1.7-2.5-1.7-4z"
              ></path>
            </svg>
          </button>
          <div slot="content" class="popover popover-background">
            <ColorPicker color="{background}" on:color="{onSelectBackground}" />
          </div>
        </Popover>
      </div>
    {:else if item === 'snapshot'}
      <div
        class="control"
        on:mouseout="{() => currentState === PlayerState.Frozen && play()}"
        on:mouseover="{() => currentState !== PlayerState.Paused && freeze()}"
      >
        <Popover color="#fff" on:mousewheel="{e => seek(frame + (e.deltaY > 0 ? -1 : 1))}">
          <button class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                clip-rule="evenodd"
                d="M0 3.01A2.983 2.983 0 012.983.027H16.99a2.983 2.983 0 012.983 2.983v14.008a2.982 2.982 0 01-2.983
                2.983H2.983A2.983 2.983 0 010 17.018zm2.983-.941a.941.941 0 00-.942.94v14.01c0
                .52.422.94.942.94H16.99a.94.94 0 00.941-.94V3.008a.941.941 0 00-.94-.94H2.981z"
                fill-rule="evenodd"
              ></path>
              <path d="M12.229 7.945l-2.07 4.598-2.586-2.605-2.414 2.758v2.146h9.656V11.93z"></path>
              <circle cx="7.444" cy="6.513" r="2.032"></circle>
              <path
                d="M9.561 23.916h11.25a2.929 2.929 0 002.926-2.927V9.954a1.06 1.06 0 10-2.122 0v11.035a.805.805 0
                01-.803.804H9.562a1.061 1.061 0 100 2.123z"
                stroke="#8795a1"
                stroke-width=".215"
              ></path>
            </svg>
          </button>
          <div slot="content" class="popover popover-snapshot">
            <h5>Frame {formattedFrame}</h5>
            <a href="#downloadsvg" on:click="{() => snapshot(true)}">Download SVG</a>
            <a href="#downloadsvg" on:click="{() => snapshot(true)}">Download PNG</a>
            <i class="note">Scroll with mousewheel to find exact frame</i>
          </div>
        </Popover>
      </div>
    {:else if item === 'zoom'}
      <button class="control btn" on:click="{onToggleZoom}">
        {#if isZoomed}
          <svg {...ICON_SIZE}>
            <path
              d="M7 22a1 1 0 102 0v-4a3 3 0 00-3-3H2a1 1 0 100 2h4a1 1 0 011 1v4zm8 0a1 1 0 102 0v-4a1 1 0 011-1h4a1 1 0
              100-2h-4a3 3 0 00-3 3v4zM2 9h4a3 3 0 003-3V2a1 1 0 10-2 0v4a1 1 0 01-1 1H2a1 1 0 100 2zm16 0h4a1 1 0
              100-2h-4a1 1 0 01-1-1V2a1 1 0 10-2 0v4a3 3 0 003 3z"
              stroke-width=".2"
            ></path>
          </svg>
        {:else}
          <svg {...ICON_SIZE}>
            <path
              d="M21 8a1 1 0 102 0V4a3 3 0 00-3-3h-4a1 1 0 100 2h4a1 1 0 011 1v4zM1 8a1 1 0 102 0V4a1 1 0 011-1h4a1 1 0
              100-2H4a3 3 0 00-3 3v4zm15 15h4a3 3 0 003-3v-4a1 1 0 10-2 0v4a1 1 0 01-1 1h-4a1 1 0 100 2zM4 23h4a1 1 0
              100-2H4a1 1 0 01-1-1v-4a1 1 0 10-2 0v4a3 3 0 003 3z"
              stroke-width=".2"
            ></path>
          </svg>
        {/if}
      </button>
    {:else if item === 'info'}
      <div class="control">
        <Popover color="#fff">
          <button class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <rect
                x="1.05"
                y="1.05"
                width="22"
                height="22"
                rx="2.12"
                style="fill:none;stroke:#8795a1;stroke-width:2.0999999046325684px"
              ></rect>
              <path
                d="M12.05,12.05v7m0-12h0"
                style="fill:none;stroke:#8795a1;stroke-linecap:round;stroke-linejoin:bevel;stroke-width:2px"
              ></path>
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
          bind:value="{formattedFrame}"
          on:mouseout="{() => currentState === PlayerState.Frozen && play()}"
          on:mouseover="{() => currentState !== PlayerState.Paused && freeze()}"
          on:input="{e => seek(e.target.value)}"
          on:mousewheel="{e => seek(frame + (e.deltaY > 0 ? -1 : 1))}"
        />
      </div>
    {:else if item === 'nextFrame'}
      <button class="control btn" on:click="{onNextFrame}">
        <svg {...ICON_SIZE}>
          <path
            d="M2 19.513a1.429 1.429 0 0 0 2.148 1.234l12.88-7.513a1.429 1.429 0 0 0 0-2.468L4.147 3.253A1.429 1.429 0 0
            0 2 4.487z"
          ></path>
          <rect height="17.143" rx="1.429" transform="matrix(1 0 0 -1 16.286 20.571)" width="5.714"></rect>
        </svg>
      </button>
    {:else if item === 'previousFrame'}
      <button class="control btn" on:click="{oPreviousFrame}">
        <svg {...ICON_SIZE}>
          <path d="M22 4.5a1.4 1.4 0 00-2.1-1.2l-13 7.5a1.4 1.4 0 000 2.4l13 7.5a1.4 1.4 0 002.1-1.2z"></path>
          <rect height="17.1" rx="1.4" transform="matrix(-1 0 0 1 7.7 3.4)" width="5.7"></rect>
        </svg>
      </button>
    {:else if item === 'spacer'}
      <span class="control spacer"></span>
    {/if}
  {/each}
</div>
