/**
 * @template T
 * @param {IterableIterator<T>} gen
 * @param {number} n
 * @yields {T}
 */
function* take(gen, n) {
  let count = 0
  for (let val of gen) {
    if (count >= n) return
    yield val
    count += 1
  }
}

module.exports = take
