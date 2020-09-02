/**
 * @template T
 * @param {IterableIterator<T>} gen
 * @param {function(any): any} fn
 * @returns {IterableIterator<ReturnType<T>>}
 */
function* map(gen, fn) {
  for (let val of gen) {
    yield fn(val)
  }
}

module.exports = map
