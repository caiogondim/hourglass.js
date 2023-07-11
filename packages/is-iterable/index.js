/**
 * @param {Object} x
 * @returns {object is Iterable<any>}
 */
function isIterable(x) {
  if (!x) {
    return false
  }
  // @ts-expect-error
  return typeof x[Symbol.iterator] === 'function'
}

export { isIterable }
