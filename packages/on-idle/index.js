/**
 * @param {number} ms
 * @param {Function} callback
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* onIdle(ms, callback, gen) {
  let timeout
  let callbackReturn

  for await (let value of gen) {
    if (callbackReturn !== undefined) {
      yield callbackReturn
      callbackReturn = undefined
    }

    clearTimeout(timeout)
    timeout = setTimeout(async () => {
      callbackReturn = await callback()
    }, ms)

    yield value
  }
}

export { onIdle }
