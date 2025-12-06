/**
 * @param {number} n
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* chunks(n, gen) {
  let accumulator = []
  for await (const value of gen) {
    accumulator.push(value)
    if (accumulator.length === n) {
      yield accumulator
      accumulator = []
    }
  }

  if (accumulator.length > 0) {
    yield accumulator
  }
}

export { chunks }
