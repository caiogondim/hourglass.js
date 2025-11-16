/**
 * @template T
  * @param {AsyncIterable<T>} gen
  * @param {(arg0: T) => boolean} predicate
  */
async function every(gen, predicate) {
  for await (const value of gen) {
    if (!predicate(value)) {
      return false
    }
  }
  return true
}

export { every }
