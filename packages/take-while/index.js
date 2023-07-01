/**
 * @template T
 * @param {(arg0: T) => boolean} predicate
 * @param {AsyncIterable<T>} gen
 * @yields {T}
 */
async function* takeWhile(predicate, gen) {
  for await (let value of gen) {
    if (predicate(value)) {
      yield value
    } else {
      break
    }
  }
}

export { takeWhile }
