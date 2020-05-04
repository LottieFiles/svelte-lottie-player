import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProduction = !process.env.ROLLUP_WATCH;
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default {
  input: 'src/components/index.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      name,
    },
    {
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      name,
    },
  ],
  plugins: [
    // Strip assert and console.log statements
    strip(),

    svelte({
      // Enable run-time checks when not in production
      dev: !isProduction,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: importee => {
        return importee === 'svelte' || importee.startsWith('svelte/');
      },
    }),
    commonjs(),

    // In production mode, minify
    isProduction && terser(),
  ],

  watch: {
    clearScreen: true,
  },
};
