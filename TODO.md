# Today

- jest in series
- remove composable interface
- yarn workspace
- lerna?
- rename: create-number-generator -> create-async-number-generator
- eslint
- speed up tests (reduce timers)
- publish only src files, not test files

# Someday

- Add toBeNear Jest matcher
  - https://github.com/jest-community/jest-extended/pull/183
  - use on backoff test
  - use on sleep test
- rename generatedValues to output
- ?export { composable } from generators for better use with compose
- create async and sync versions of generators
  - default is async `import map from 'hourglass/map`
  - create a sync.js file to be imported as `import map from 'hourglass/map/sync'`
- refactor parameters order
  - generators should be moved to last parameter so ir can be ommited while using with compose
