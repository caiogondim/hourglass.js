/**
 * @param {any} x
 * @returns {boolean}
 */
function isPromise(x) {
  return (
    Boolean(x) &&
    (typeof x === 'object' || typeof x === 'function') &&
    typeof x.then === 'function'
  )
}

export { isPromise }
