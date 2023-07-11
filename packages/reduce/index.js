// TODO: pass index

/**
 * @template T 
 * @param {AsyncIterable<T>} gen
 * @param {(accumulator: T, value: T) => Promise<T>} reducer
 * @param {T} initialValue
 * @returns {Promise<T>}
 */
async function reduce(gen, reducer, initialValue) {
  let accumulator = initialValue
  for await (let value of gen) {
    accumulator = await reducer(accumulator, value)
  }
  return accumulator
}

export { reduce }
