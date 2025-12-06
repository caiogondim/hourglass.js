/**
 * @param {any} x
 * @returns {boolean}
 */
function isAsyncGeneratorFunction(x) {
  return Boolean(
    x &&
      typeof x === 'function' &&
      x.constructor.name === 'AsyncGeneratorFunction'
  )
}

export { isAsyncGeneratorFunction }
