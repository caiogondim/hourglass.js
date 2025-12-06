/**
 * @param {Function} callback
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* tap(callback, gen) {
  for await (let value of gen) {
    callback(value)
    yield value
  }
}

export { tap }
