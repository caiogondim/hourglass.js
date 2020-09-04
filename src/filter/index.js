async function* filter(predicate, gen) {
  for await (let val of gen) {
    if (!predicate(val)) continue
    yield val
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
