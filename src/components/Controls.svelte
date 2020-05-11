<style>
  .lottie-player-controls {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
      sans-serif !important;
  }

  .lottie-player-controls > div {
    margin-left: 4px;
  }

  .spacer {
    flex-grow: 1;
    width: 14px;
  }

  .btn {
    cursor: pointer;
    fill: #999;
    width: 14px;
  }

  .btn:hover {
    fill: #222;
  }

  .btn.active {
    fill: #555;
  }

  .progress {
    -webkit-appearance: none;
    -moz-apperance: none;
    width: 100%;
    margin: 0 10px;
    height: 4px;
    border-radius: 3px;
    cursor: pointer;
  }
  .progress:focus {
    outline: none;
    border: none;
  }
  .progress::-moz-range-track {
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
  }
  .progress::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    height: 13px;
    width: 13px;
    border: 0;
    border-radius: 50%;
    background: #0fccce;
    cursor: pointer;
  }
  .progress::-moz-range-thumb {
    -moz-appearance: none !important;
    height: 13px;
    width: 13px;
    border: 0;
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
    font-size: 0.7rem;
    padding: 0;
    font-family: inherit;
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
      <div class="btn" on:click="{togglePlay}" class:active="{isPlaying || isPaused}">
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
      </div>
    {:else if item === 'stop'}
      <div class="btn" on:click="{stop}" class:active="{isStopped}">
        <svg {...ICON_SIZE}>
          <path
            d="M2 3.667A1.67 1.67 0 0 1 3.667 2h16.666A1.67 1.67 0 0 1 22 3.667v16.666A1.67 1.67 0 0 1 20.333
            22H3.667A1.67 1.67 0 0 1 2 20.333z"
          ></path>
        </svg>
      </div>
    {:else if item === 'progress'}
      <input
        class=" progress"
        type="range"
        min="0"
        step="1"
        max="100"
        bind:value="{progress}"
        on:input="{onHandleSeekChange}"
        on:mousedown="{freeze}"
        on:mouseup="{play}"
        style={`
          background-image: -webkit-gradient(linear, left top, right top, color-stop(${progress}%, rgba(15, 204, 206, 0.4)), color-stop(${progress}%, #DAE1E7));
          background-image: -moz-linear-gradient(left center, rgba(15, 204, 206, 0.4) 0%, rgba(15, 204, 206, 0.4) ${progress}%, #DAE1E7 ${progress}%, #DAE1E7 100%);
        `}
      />
    {:else if item === 'loop'}
      <div class="btn" on:click="{toggleLooping}" class:active="{loop}">
        <svg {...ICON_SIZE}>
          <path
            d="M12.5 16.8137h-.13v1.8939h4.9696c3.6455 0 6.6113-2.9658 6.6113-6.6116
            0-3.64549-2.9658-6.61131-6.6113-6.61131-.5231 0-.947.42391-.947.94696 0 .52304.4239.94696.947.94696 2.6011 0
            4.7174 2.11634 4.7174 4.71739 0 2.6014-2.1166 4.7177-4.7174 4.7177H12.5zM13.6025
            5.61469v-.13H7.48137C3.83582 5.48469.87 8.45051.87 12.096c0 3.6509 3.17269 6.6117 6.81304 6.6117.52304 0
            .94696-.424.94696-.947 0-.5231-.42392-.947-.94696-.947-2.60804 0-4.91907-2.1231-4.91907-4.7176 0-2.60115
            2.11634-4.71744 4.7174-4.71744h6.12113V5.61469z"
            stroke="#8795A1"
            stroke-width=".26"
          ></path>
          <path
            d="M11.1482
            2.20355h0l-.001-.00116c-.3412-.40061-.9405-.44558-1.33668-.0996h-.00001c-.39526.34519-.43936.94795-.09898
            1.34767l2.51487 3.03683-2.51894 3.06468c-.33872.40088-.29282 1.00363.10347
            1.34723l.08517-.0982-.08517.0982c.17853.1549.39807.2308.61647.2308.2671 0 .5328-.114.72-.3347h0l.0011-.0014
            3.0435-3.68655.0006-.00068c.3035-.35872.3025-.88754-.0019-1.24526l-3.0425-3.65786zM13.9453
            21.7965h0l.001.0011c.3413.4006.9407.4456 1.337.0996h0c.3953-.3452.4395-.9479.099-1.3477l-2.5154-3.0368
            2.5195-3.0647c.3388-.4008.2929-1.0036-.1035-1.3472l-.0852.0982.0852-.0982c-.1786-.1549-.3981-.2308-.6166-.2308-.2671
            0-.5329.114-.7202.3347h0l-.0011.0014-3.0442
            3.6865c-.0001.0003-.0003.0005-.0005.0007-.3036.3587-.3027.8876.0019 1.2453l3.0431 3.6579z"
            fill="#8795A1"
            stroke="#8795A1"
            stroke-width=".26"
          ></path>
        </svg>
      </div>
    {:else if item === 'background'}
      <div class="">
        <Popover color="#fff">
          <div class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                d="M12 3.1L6.1 8.6a7.6 7.6 0 00-2.2 4 7.2 7.2 0 00.4 4.4 7.9 7.9 0 003 3.5 8.7 8.7 0 004.7 1.3c1.6 0
                3.2-.5 4.6-1.3s2.4-2 3-3.5a7.2 7.2 0 00.5-4.5 7.6 7.6 0 00-2.2-4L12 3.2zM12 0l7.5 7a9.8 9.8 0 013 5.1
                9.3 9.3 0 01-.6 5.8c-.9 1.8-2.2 3.3-4 4.4A11.2 11.2 0 0112 24a11.2 11.2 0
                01-6-1.7c-1.7-1-3-2.6-3.9-4.4a9.3 9.3 0 01-.6-5.8c.4-2 1.5-3.7 3-5L12 0zM6 14h12c0 1.5-.7 3-1.8 4s-2.6
                1.6-4.2 1.6S9 19 7.8 18s-1.7-2.5-1.7-4z"
              ></path>
            </svg>
          </div>
          <div slot="content" class="popover popover-background">
            <ColorPicker color="{background}" on:color="{onSelectBackground}" />
          </div>
        </Popover>
      </div>
    {:else if item === 'snapshot'}
      <div
        class=""
        on:mouseout="{() => currentState === PlayerState.Frozen && play()}"
        on:mouseover="{() => currentState !== PlayerState.Paused && freeze()}"
      >
        <Popover color="#fff" on:mousewheel="{e => seek(frame + (e.deltaY > 0 ? -1 : 1))}">
          <div class="btn" slot="target">
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
          </div>
          <div slot="content" class="popover popover-snapshot">
            <h5>Frame {formattedFrame}</h5>
            <a href="#downloadsvg" on:click="{() => snapshot(true)}">Download SVG</a>
            <a href="#downloadsvg" on:click="{() => snapshot(true)}">Download PNG</a>
            <i class="note">Scroll with mousewheel to find exact frame</i>
          </div>
        </Popover>
      </div>
    {:else if item === 'zoom'}
      <div class="btn" on:click="{onToggleZoom}">
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
      </div>
    {:else if item === 'info'}
      <div class="">
        <Popover color="#fff">
          <div class="btn" slot="target">
            <svg {...ICON_SIZE}>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.15 0h17.7A3.12 3.12 0 0124 3.1v17.8c0 1.71-1.4 3.1-3.15 3.1H3.15A3.12 3.12 0 010 20.9V3.1C0 1.39
                1.4 0 3.15 0zm0 2.05c-.6 0-1.07.47-1.07 1.05v17.8c0 .58.48 1.05 1.07 1.05h17.7c.6 0 1.07-.47
                1.07-1.05V3.1c0-.58-.48-1.05-1.07-1.05H3.15z"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 10c.55 0 1 .42 1 .94v6.12c0 .52-.45.94-1 .94s-1-.42-1-.94v-6.12c0-.52.45-.94 1-.94zM12 6a1 1 0
                011 1v.42a1 1 0 11-2 0V7a1 1 0 011-1z"
              ></path>
            </svg>
          </div>
          <div slot="content" class="popover popover-info">
            <Info {animationData} />
          </div>
        </Popover>
      </div>
    {:else if item === 'frame'}
      <div class="">
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
      <div class="btn" on:click="{onNextFrame}">
        <svg {...ICON_SIZE}>
          <path
            d="M2 19.513a1.429 1.429 0 0 0 2.148 1.234l12.88-7.513a1.429 1.429 0 0 0 0-2.468L4.147 3.253A1.429 1.429 0 0
            0 2 4.487z"
          ></path>
          <rect height="17.143" rx="1.429" transform="matrix(1 0 0 -1 16.286 20.571)" width="5.714"></rect>
        </svg>
      </div>
    {:else if item === 'previousFrame'}
      <div class="btn" on:click="{oPreviousFrame}">
        <svg {...ICON_SIZE}>
          <path d="M22 4.5a1.4 1.4 0 00-2.1-1.2l-13 7.5a1.4 1.4 0 000 2.4l13 7.5a1.4 1.4 0 002.1-1.2z"></path>
          <rect height="17.1" rx="1.4" transform="matrix(-1 0 0 1 7.7 3.4)" width="5.7"></rect>
        </svg>
      </div>
    {:else if item === 'spacer'}
      <div class="spacer"></div>
    {/if}
  {/each}
</div>
