/**
 * @template T
 * @param {IterableIterator<T>} gen
 * @param {function(any): boolean} predicate
 */
function* filter(gen, predicate) {
  for (let val of gen) {
    if (!predicate(val)) continue
    yield val
  }
}

module.exports = filter
