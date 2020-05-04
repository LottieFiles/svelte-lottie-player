# Svelte Lottie Player

![npm (scoped)](https://img.shields.io/npm/v/@lottiefiles/svelte-lottie-player?style=flat-square)
![NPM](https://img.shields.io/npm/l/@lottiefiles/svelte-lottie-player?style=flat-square)
![David](https://img.shields.io/david/LottieFiles/svelte-lottie-player?style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@lottiefiles/svelte-lottie-player?style=flat-square)

> Lottie player component for use with Svelte.

This provides a Lottie player using the lottie-web library, adding a control toolbar, render graph and other handy
configs for viewing Lottie animations.

![Screenshot](assets/screenshot1.png?raw=true)

## Features

- Configuration of lottie-web via props
- Control toolbar with play, pause, stop, progress track with seeker, looping
- Render graph for viewing frame render times

## Table of Contents

- [Getting started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)

## Demos

- [Component Storybook](https://lottiefiles.github.io/svelte-lottie-player/)
- [Basic usage on Svelte REPL](https://svelte.dev/repl/c7c774dba1464389af5d738a9e486658)

## Installation

With `yarn`:

```bash
yarn add @lottiefiles/svelte-lottie-player
```

With `npm`:

```bash
npm install --save @lottiefiles/svelte-lottie-player
```

## Usage

Basic steps for use in a Svelte project:

```html
<!-- App.svelte -->
<script>
  import { LottiePlayer } from '@lottiefiles/svelte-lottie-player';

  let controlsLayout = [
    'previousFrame',
    'playpause',
    'stop',
    'nextFrame',
    'progress',
    'frame',
    'loop',
    'spacer',
    'background',
    'snapshot',
    'zoom',
    'info',
  ];
</script>

<LottiePlayer
  src="https://assets2.lottiefiles.com/packages/lf20_wxUJzo.json"
  autoplay="{true}"
  loop="{true}"
  controls="{true}"
  renderer="svg"
  background="transparent"
  height="{600}"
  width="{600}"
  controlsLayout="{controlsLayout}"
/>
```

[examples-folder-url]: https://github.com/LottieFiles/svelte-lottie-player/tree/master/examples
[examples-basic]: https://github.com/LottieFiles/svelte-lottie-player/tree/master/examples/basic
