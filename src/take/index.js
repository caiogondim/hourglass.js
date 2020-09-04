async function* take(n, gen) {
  let count = 0
  for await (let val of gen) {
    if (count >= n) return
    yield val
    count += 1
  }
}

function composable(n) {
  return async function* composableTake(gen) {
    yield* take(n, gen)
  }
}

function main(n, gen) {
  if (!gen) {
    return composable(n)
  } else {
    return take(n, gen)
  }
}

module.exports = main
