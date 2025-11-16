/**
 * @template T
 * @param {AsyncIterable<T>} gen
 * @returns {AsyncGenerator<[number, T]>}
 */
async function* enumerate(gen) {
  let count = 0
  for await (let value of gen) {
    yield [count, value]
    count += 1
  }
}

export { enumerate }
