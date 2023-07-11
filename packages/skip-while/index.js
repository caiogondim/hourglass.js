/**
 * @template T 
 * @param {(arg0: T) => boolean} predicate
 * @param {AsyncIterable<T>} gen
 * @yields {T}
 */
async function* skipWhile(predicate, gen) {
  for await (let value of gen) {
    if (predicate(value)) {
      continue
    }
    yield value
  }
}

export { skipWhile }
