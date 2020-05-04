export const PlayerRender = {
  SVG: 'svg',
  Canvas: 'canvas'
}

// Define valid player states
export const PlayerState = {
  Loading: 'loading',
  Playing: 'playing',
  Paused: 'paused',
  Stopped: 'stopped',
  Frozen: 'frozen',
  Error: 'error',
};

// Define play modes
export const PlayMode = {
  Normal: 'normal',
  Bounce: 'bounce',
};

// Define player events
export const PlayerEvents = {
  Load: 'load',
  Error: 'error',
  Ready: 'ready',
  Play: 'play',
  Pause: 'pause',
  Stop: 'stop',
  Freeze: 'freeze',
  Loop: 'loop',
  Complete: 'complete',
  Frame: 'frame',
};

// Define controls layout options
export const ControlsLayoutOptions = [
  "previousFrame",
  "playpause",
  "stop",
  "nextFrame",
  "progress",
  "frame",
  "loop",
  "spacer",
  "background",
  "snapshot",
  "info",
  "zoom"
];

/**
 * Parse a resource into a JSON object or a URL string
 */
export const parseSrc = src => {
  if (typeof src === 'object') {
    return src;
  }

  try {
    return JSON.parse(src);
  } catch (e) {
    // Try construct an absolute URL from the src URL
    const srcUrl = new URL(src, window.location.href);

    return srcUrl.toString();
  }
};

/**
 * Trigger the download of the given data URI as a file
 *
 * @param {string} dataUri
 * @param {string} name
 */
export const triggerDownload = (dataUri, filename) => {
  const element = document.createElement('a');
  element.href = dataUri;
  element.download = filename;
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
