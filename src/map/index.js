async function* map(mapper, gen) {
  for await (let val of gen) {
    yield await mapper(val)
  }
}

function composable(mapper) {
  return async function* composableMap(gen) {
    yield* map(mapper, gen)
  }
}

function main(mapper, gen) {
  if (!gen) {
    return composable(mapper)
  } else {
    return map(mapper, gen)
  }
}

module.exports = main
