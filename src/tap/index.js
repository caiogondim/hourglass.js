async function* tap(callback, gen) {
  for await (let value of gen) {
    callback()
    yield value
  }
}

function composable(callback) {
  return async function* composableTap(gen) {
    yield* tap(callback, gen)
  }
}

function main(callback, gen) {
  if (!gen) {
    return composable(callback)
  } else {
    return tap(callback, gen)
  }
}

module.exports = main
