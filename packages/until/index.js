import { defer } from '@hourglass/defer'

class TimeoutError extends Error {}

/**
 * @template T
 * @param  {() => Promise<T>} thunk
 * @param  {T} expected
 * @param  {Object} options
 * @param  {number} [options.timeout]
 * @param  {number} [options.interval]
 * @returns {Promise<undefined>}
 */
async function until(
  thunk,
  expected,
  { timeout = 10_000, interval = 1000 } = {}
) {
  if (timeout < 1) {
    throw new TypeError('timeout needs to be greater than 0')
  }

  const [promise, resolve, reject] = defer()
  let timeoutReference = setTimeout(() => {
    clearTimeout(onIntervalTimeoutReference)
    reject(new TimeoutError(`${timeout} ms have passed`))
  }, timeout)

  const onInterval = async () => {
    try {
      const thunkOutput = await thunk()
      if (thunkOutput === expected) {
        clearTimeout(timeoutReference)
        // eslint-disable-next-line unicorn/no-useless-undefined
        resolve(undefined)
      } else {
        onIntervalTimeoutReference = setTimeout(onInterval, interval)
      }
    } catch (error) {
      clearTimeout(timeoutReference)
      reject(error)
    }
  }
  let onIntervalTimeoutReference = setTimeout(onInterval, 0)

  return promise
}

export { until, TimeoutError }
