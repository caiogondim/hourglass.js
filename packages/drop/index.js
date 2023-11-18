/**
 * @template T
  * @param {number} n
  * @param {AsyncIterable<T>} gen
  * @yield {T}
  */
async function* drop(n, gen) {
  let index = 0

  for await (const value of gen) {
    index += 1
    if (index <= n) {
      continue
    }
    yield value
  }
}

export { drop }
