const enumerate = require('../enumerate')

async function* skip(n, gen) {
  for await (let [index, value] of enumerate(gen)) {
    if (index < n) {
      continue
    }
    yield value
  }
}

function composable(n) {
  return async function* composableSkip(gen) {
    yield* skip(n, gen)
  }
}

function main(n, gen) {
  if (!gen) {
    return composable(n)
  } else {
    return skip(n, gen)
  }
}

module.exports = main
