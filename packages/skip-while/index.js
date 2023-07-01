async function* skipWhile(predicate, gen) {
  for await (let value of gen) {
    if (predicate(value)) {
      continue
    }
    yield value
  }
}

export { skipWhile }
