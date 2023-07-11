/**
 * @template T
 * @param {AsyncIterable<T>} gen
 * @param {(arg0: T) => boolean} predicate
 * @yields {T}
 */
async function* filter(gen, predicate) {
  for await (let value of gen) {
    if (!predicate(value)) continue
    yield value
  }
}

export { filter }
