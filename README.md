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

- [Basic usage on Svelte REPL](https://svelte.dev/repl/c7c774dba1464389af5d738a9e486658)

## Installation

With `yarn`:

```bash
yarn add svelte-lottie-player
```

With `npm`:

```bash
npm install --save svelte-lottie-player
```

## Usage

Basic steps for use in a Svelte project:

```html
<!-- App.svelte -->
<script>
  import { LottiePlayer } from 'svelte-lottie-player';
</script>

<LottiePlayer
  src="https://assets2.lottiefiles.com/private_files/lf30_5P4pCA.json"
  autoplay="{true}"
  loop="{true}"
  bind:this="{lottie}"
  controls="{true}"
/>
```

[examples-folder-url]: https://github.com/LottieFiles/svelte-lottie-player/tree/master/examples
[examples-basic]: https://github.com/LottieFiles/svelte-lottie-player/tree/master/examples/basic
