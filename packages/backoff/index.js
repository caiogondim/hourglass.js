const sleep = require('@hourglass/sleep')

/**
 * @param {Object} options
 * @param {number} [options.max]
 * @param {number} [options.initial]
 * @param {number} [options.jitter]
 * @returns {function(): Promise<void>}
 */
function createBackoff({ max = 30000, initial = 1000, jitter = 0 } = {}) {
  let current = initial
  return async () => {
    await sleep(current, { jitter })
    current = Math.min(current * 2, max)
  }
}

module.exports = { createBackoff }
