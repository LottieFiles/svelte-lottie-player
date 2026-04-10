declare module '@lottiefiles/svelte-lottie-player' {
  import type { AnimationItem } from 'lottie-web';
  import type { SvelteComponentTyped } from 'svelte';

  export class LottiePlayer extends SvelteComponentTyped<{
    /** Autoplay animation on load */
    autoplay?: boolean;
    /** Background color */
    background: string;
    /** Show controls */
    controls: boolean;
    /** Controls layout */
    controlsLayout?: string[];
    /** Number of times to loop animation */
    count?: number;
    /** Default frame to show if autoplay is disabled */
    defaultFrame?: number;
    /** Direction of animation */
    direction?: number;
    /** Player height */
    height: number;
    /** Whether to play on mouse hover */
    hover?: boolean;
    /** Whether to loop animation */
    loop?: boolean;
    /** Play mode */
    mode?: 'normal' | 'bounce';
    /** Callback for when zoom is triggered */
    onToggleZoom?: (isZoomed: boolean) => void;
    /** Renderer to use in lottie-web */
    renderer?: 'svg' | 'canvas';
    /** Playback speed */
    speed?: number;
    /** Lottie file as either a URL or JSON content */
    src?: string;
    /** Styling for the Player's wrapper element */
    style?: string;
    /** Player width */
    width: number;
  }> {
    /**
     * Configure and initialize lottie-web player instance.
     */
    load(srcValue: string | Record<string, any> | URL): void;
    /**
     * Returns the lottie-web instance used in the component.
     */
    getLottie(): AnimationItem;
    /**
     * Returns the lottie-web version and this player's version
     */
    getVersions(): { lottieWebVersion: string; svelteLottiePlayerVersion: string };
    /**
     * Pause animation play.
     */
    pause(): void;
    /**
     * Start playing animation.
     */
    play(): void;
    /**
     * Stops animation play.
     */
    stop(): void;
    /**
     * Freeze animation play.
     * This internal state pauses animation and is used to differentiate between
     * user requested pauses and component instigated pauses.
     */
    freeze(): void;
    /**
     * Resize animation.
     */
    resize(): void;
    /**
     * Seek to a given frame.
     * @param frame Frame number or Percent string to seek to.
     */
    seek(frame: number | string): void;
    /**
     * Snapshot the current frame as SVG.
     * @param download If 'download' argument is boolean true, then a download is triggered in browser.
     */
    snapshot(download?: boolean): void;
    /**
     * Sets background color.
     */
    setBackground(color: string): void;
    /**
     * Sets the looping of the animation.
     * @param value Whether to enable looping. Boolean true enables looping.
     */
    setLooping(value: boolean): void;
    /**
     * Sets the speed of the animation.
     * @param value The speed of the animation. 1 is normal speed.
     */
    setSpeed(value: number): void;
    /**
     * Animation play direction.
     * @param value Direction values.
     */
    setDirection(value: number): void;
    /**
     * Toggle playing state.
     */
    togglePlay(): void;
    /**
     * Toggle zoom state.
     */
    toggleZoom(): void;
    /**
     * Toggles animation looping.
     */
    toggleLooping(): void;
  }
}
