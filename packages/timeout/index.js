import { sleep } from '../sleep'
import { isPromise } from '../is-promise'

class TimeoutError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message)
  }
}

/**
 * @template T
 * @param {Promise<T>} promise
 * @param {number} ms
 * @return {Promise<T>}
 */
async function timeout(promise, ms) {
  if (!isPromise(promise)) {
    throw new TypeError('First argument must be a promise')
  }

  if (typeof ms !== 'number') {
    throw new TypeError('Second argument must be a number')
  }

  async function createTimeoutPromise() {
    await sleep(ms)
    throw new TimeoutError(`Timeout after`)
  }

  return /** @type {T} */ (
    await Promise.race([promise, createTimeoutPromise()])
  )
}

export { timeout, TimeoutError }
