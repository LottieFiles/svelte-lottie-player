// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.svelte$": "svelte-jester"
  },
  moduleFileExtensions: [
    'js',
    'svelte'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ]
};