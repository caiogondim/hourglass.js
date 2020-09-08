async function* onReturn(callback, gen) {
  yield* gen
  await callback()
}

function composable(callback) {
  return async function* composableOnReturn(gen) {
    yield* onReturn(callback, gen)
  }
}

function main(callback, gen) {
  if (!gen) {
    return composable(callback)
  } else {
    return onReturn(callback, gen)
  }
}

module.exports = main
