// Based on https://hunterloftis.github.io/awaiting/#callback

/**
 * @param {Function} gen
 * @param {Function} callback_
 * @returns {Promise<void>}
 */
async function callback(gen, callback_) {
  for await (const value of gen()) {
    callback_(value)
  }
}

export { callback }
