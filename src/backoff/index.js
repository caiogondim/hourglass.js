const sleep = require('../sleep')

/**
 * @param {Object} options
 * @param {number} [options.max]
 * @param {number} [options.initial]
 * @returns {function(): Promise<void>}
 */
function createBackoff({ max = 30000, initial = 1000 } = {}) {
  let current = initial
  return async () => {
    await sleep(current)
    current = Math.min(current * 2, max)
  }
}

module.exports = { createBackoff }
