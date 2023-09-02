declare module '@lottiefiles/svelte-lottie-player' {
  import type { SvelteComponentTyped } from 'svelte'

  export class LottiePlayer extends SvelteComponentTyped<{
    autoplay?: boolean
    background: string
    controls: boolean
    controlsLayout?: string[]
    count?: number
    defaultFrame?: number
    direction?: number
    height: number
    hover?: boolean
    loop?: boolean
    mode?: 'normal' | 'bounce'
    onToggleZoom?: (isZoomed: boolean) => void
    renderer?: 'svg' | 'canvas'
    speed?: number
    src?: string
    style?: string
    width: number
  }> { }
}
