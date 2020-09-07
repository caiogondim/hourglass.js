async function* skipWhile(predicate, gen) {
  for await (let value of gen) {
    if (predicate(value)) {
      continue
    }
    yield value
  }
}

function composable(predicate) {
  return async function* composableSkipWhile(gen) {
    yield* skipWhile(predicate, gen)
  }
}

function main(predicate, gen) {
  if(!gen) {
    return composable(predicate)
  } else {
    return skipWhile(predicate, gen)
  }
}

module.exports = main