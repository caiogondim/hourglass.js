/**
 * @param {number} ms
 * @param {{
 *  jitter?: number
 * }} options
 * @returns {Promise<undefined>}
 */
async function sleep(ms, options = {}) {
  const { jitter = 0 } = options

  if (jitter < 0) {
    throw new TypeError('jitter must be greater than or equal to 0')
  }
  const random = Math.random() * jitter
  return new Promise((resolve) => {
    setTimeout(resolve, ms + random)
  })
}

export { sleep }
