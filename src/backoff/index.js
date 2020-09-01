const sleep = require('../sleep')

/**
 * @param {Object} options
 * @param {number} [options.max]
 * @param {number} [options.initial]
 * @returns {function(): Promise<void>}
 */
function createBackoff({ max = 30000, initial = 1000 } = {}) {
  let cur = initial
  return async () => {
    await sleep(cur)
    cur = Math.min(cur * 2, max)
  }
}

module.exports = { createBackoff }
