/**
 * @param {Function} genFunction
 * @returns {Function}
 */
function toAsyncGenerator(genFunction) {
  return async function* () {
    for await (const value of genFunction()) {
      yield value
    }
  }
}

export { toAsyncGenerator }
