async function* filter(predicate, gen) {
  for await (let value of gen) {
    if (!predicate(value)) continue
    yield value
  }
}

function composable(predicate) {
  return async function* composableFilter(gen) {
    yield* filter(predicate, gen)
  }
}

function main(predicate, gen) {
  if (!gen) {
    return composable(predicate)
  } else {
    return filter(predicate, gen)
  }
}

module.exports = main
