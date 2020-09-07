async function* takeWhile(predicate, gen) {
  for await (let value of gen) {
    if (predicate(value)) {
      yield value
    } else {
      break
    }
  }
}

function composable(predicate) {
  return async function* composableTakeWhile(gen) {
    yield* takeWhile(predicate, gen)
  }
}

function main(predicate, gen) {
  if (!gen) {
    return composable(predicate)
  } else {
    return takeWhile(predicate, gen)
  }
}

module.exports = main
