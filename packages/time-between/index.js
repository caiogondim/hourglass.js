const sleep = require('@hourglass/sleep')

async function* timeBetween(ms, gen) {
  let lastCall = Date.now()
  for await (let value of gen) {
    const timeSinceLastCall = Date.now() - lastCall
    if (timeSinceLastCall <= ms) {
      await sleep(ms - timeSinceLastCall)
    }
    yield value
    lastCall = Date.now()
  }
}

function composable(ms) {
  return async function* composableTimeBetween(gen) {
    yield* timeBetween(ms, gen)
  }
}

function main(ms, gen) {
  if (!gen) {
    return composable(ms)
  } else {
    return timeBetween(ms, gen)
  }
}

module.exports = main
