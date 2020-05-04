const path = require('path');

module.exports = {
  stories: ['../src/stories/**/*.stories.*'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-backgrounds',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: [/\.stories\.js$/, /index\.js$/],
      loaders: [require.resolve('@storybook/source-loader')],
      include: [path.resolve(__dirname, '../src')],
      enforce: 'pre',
    });
    return config;
  },
};
