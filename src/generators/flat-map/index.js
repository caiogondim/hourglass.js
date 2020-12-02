const isIterable = require('../../_shared/is-iterable')

async function* flatMap(mapper, gen) {
  for await (let value of gen) {
    let output = await mapper(value)
    if (!isIterable(output)) {
      output = [output]
    }
    for (let outputItem of output) {
      yield outputItem
    }
  }
}

function composable(mapper) {
  return async function* composableFlatMap(gen) {
    yield* flatMap(mapper, gen)
  }
}

function main(mapper, gen) {
  if (!gen) {
    return composable(mapper)
  } else {
    return flatMap(mapper, gen)
  }
}

module.exports = main
