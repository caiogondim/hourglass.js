/**
 * @template T
 * @param {number} n
 * @param {AsyncIterable<T>} gen
 * @yield {T}
 */
async function* take(n, gen) {
  let index = 0
  for await (const value of gen) {
    if (index >= n) return
    yield value
    index += 1
  }
}

export { take }
