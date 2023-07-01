import { sleep } from '@hourglass/sleep'
import { defer} from '@hourglass/defer'

class TimeoutError extends Error {}

/**
 * @param  {function(): Promise<any>} thunk
 * @param  {any} expected
 * @param  {Object} options
 * @param  {number} [options.timeout]
 * @param  {number} [options.interval]
 * @return {Promise<void>}
 */
async function until(thunk, expected, { timeout = 30_000, interval = 5000 } = {}) {
  const [promise, resolve, reject] = defer()
  let wasResolved = false
  let timeoutReference = setTimeout(() => {
    if (!wasResolved) {
      wasResolved = true
      reject(new TimeoutError())
    }
  }, timeout)

  setTimeout(async () => {
    for (;;) {
      if (wasResolved) {
        break
      }

      const thunkOutput = await thunk()

      if (thunkOutput === expected) {
        wasResolved = true
        clearTimeout(timeoutReference)
        resolve()
        break
      }

      await sleep(interval)
    }  
  }, 0)
  

  return promise
}

export { until, TimeoutError }
