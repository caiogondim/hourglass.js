const sleep = require('@hourglass/sleep')

async function* interval(ms, gen) {
  for await (let value of gen) {
    yield value
    await sleep(ms)
  }
}

function composable(ms) {
  return async function* composableInterval(gen) {
    yield* interval(ms, gen)
  }
}

function main(ms, gen) {
  if (!gen) {
    return composable(ms)
  } else {
    return interval(ms, gen)
  }
}

module.exports = main
