/**
 * @param {any} x
 * @returns {boolean}
 */
function isGeneratorFunction(x) {
  return Boolean(
    x && typeof x === 'function' && x.constructor.name === 'GeneratorFunction'
  )
}

export { isGeneratorFunction }
