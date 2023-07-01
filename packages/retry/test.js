import { sleep } from '../sleep'
import { retry } from '.'

/**
 * @param {number} n
 * @returns {function(): Promise<string>}
 */
function createThrowUntilN(n) {
  let callCount = 0
  return async () => {
    callCount += 1
    if (callCount < n) {
      throw new Error('error')
    } else {
      return 'lorem'
    }
  }
}

it.skip('retries if thunk throws error', async () => {
  //
  // Test behavior without `retry`
  //

  const throwUntil3 = createThrowUntilN(3)
  await expect(throwUntil3()).rejects.toThrow(Error)
  await expect(throwUntil3()).rejects.toThrow(Error)
  await expect(throwUntil3()).resolves.toEqual('lorem')

  //
  // Test behavior with `retry`
  //

  await expect(retry(createThrowUntilN(3))).resolves.toEqual('lorem')
})

it.skip('retries up to `maxAttempts`', async () => {
  await expect(retry(createThrowUntilN(3), { maxAttempts: 2 })).rejects.toThrow(
    Error
  )
})

it.skip('retries in case `shouldRetry` returns true', async () => {
   
  function createNumberGenerator() {
    let number = 0
    return async () => {
      number += 1
      await sleep(100)
      return number
    }
  }
  const numberGenerator = createNumberGenerator()

  /**
   * @param {number} num
   * @returns {boolean}
   */
   
  function shouldRetry(number) {
    return number < 2
  }

  await expect(retry(numberGenerator, { shouldRetry })).resolves.toBe(2)
})

it.skip('executes `onRetry` on each retry', async () => {
  const maxAttempts = 3
  let onRetryCalls = 0
  function onRetry() {
    onRetryCalls += 1
  }
  const throwUntil3 = createThrowUntilN(3)
  await retry(throwUntil3, { maxAttempts, onRetry })
  expect(onRetryCalls).toBe(maxAttempts - 1)
})

it.skip('backs off between each retry', async () => {
  const maxAttempts = 3
  const throwUntil3 = createThrowUntilN(3)

   
  async function backoff() {
    await sleep(100)
  }

  const before = Date.now()
  await retry(throwUntil3, { backoff, maxAttempts })
  const delta = Date.now() - before
  expect(delta).toBeGreaterThanOrEqual(200)
  expect(delta).toBeLessThan(220)
})
