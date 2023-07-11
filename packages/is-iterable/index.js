/**
 * @param {any} x
 * @returns {object is Iterable<any>}
 */
function isIterable(x) {
  if (!x) {
    return false
  }
  return typeof x[Symbol.iterator] === 'function'
}

export { isIterable }
