import { defer } from '@hourglass/defer'

class TimeoutError extends Error {}

/**
 * @param  {function(): Promise<any>} thunk
 * @param  {any} expected
 * @param  {Object} options
 * @param  {number} [options.timeout]
 * @param  {number} [options.interval]
 * @return {Promise<void>}
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
    const thunkOutput = await thunk()

    if (thunkOutput === expected) {
      clearTimeout(timeoutReference)
      resolve()
    } else {
      onIntervalTimeoutReference = setTimeout(onInterval, interval)
    }
  }
  let onIntervalTimeoutReference = setTimeout(onInterval, 0)

  return promise
}

export { until, TimeoutError }
