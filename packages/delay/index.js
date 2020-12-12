const sleep = require('@hourglass/sleep')

async function* delay(ms, gen) {
  for await (let value of gen) {
    await sleep(ms)
    yield value
  }
}

function composable(ms) {
  return async function* composableDelay(gen) {
    yield* delay(ms, gen)
  }
}

function main(ms, gen) {
  if (!gen) {
    return composable(ms)
  } else {
    return delay(ms, gen)
  }
}

module.exports = main
