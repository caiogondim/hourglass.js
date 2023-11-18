/**
 * @template T
 * @param {(arg0: T) => boolean} predicate
 * @param {AsyncIterable<T>} gen
 * @yields {T}
 */
async function* dropWhile(predicate, gen) {
  for await (const value of gen) {
    if (predicate(value)) {
      continue
    }
    yield value
  }
}

export { dropWhile }
