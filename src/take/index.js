/**
 * @template T
 * @param {IterableIterator<T>} gen
 * @param {number} n
 * @yields {T}
 */
async function* take(gen, n) {
  let count = 0
  for await (let val of gen) {
    if (count >= n) return
    yield val
    count += 1
  }
}

module.exports = take
