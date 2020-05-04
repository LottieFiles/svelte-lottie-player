import { withKnobs, boolean, text, color, number, select } from '@storybook/addon-knobs';

import LottiePlayer from './Wrapper.svelte';
import { PlayMode, PlayerRender, ControlsLayoutOptions } from '../components/utils';

export default {
  title: 'LottiePlayer',
  decorators: [withKnobs],
};

export const Basic = () => ({
  Component: LottiePlayer,
  props: {
    src: text('Lottie URL/JSON', 'https://assets2.lottiefiles.com/packages/lf20_wxUJzo.json'),
    renderer: select('Renderer', PlayerRender),
    autoplay: boolean('Auto Play', false),
    loop: boolean('Loop', true),
    mode: select('Playback mode', PlayMode),
    hover: boolean('Play on hover', false),
    background: color('Background', '#ffffff'),
    defaultFrame: number('Default Frame', 100),
    speed: number('Speed', 1),
    height: number('Height', ''),
    width: number('Width', 500),
    controls: boolean('Show Controls', true),
    controlsLayout: text('Controls Layout', ControlsLayoutOptions.join(',')),
    style: text('Styles', ''),
  }
});
