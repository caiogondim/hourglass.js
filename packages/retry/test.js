import { jest } from '@jest/globals'
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

it('retries if thunk throws error', async () => {
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

  const backoff = async () => {}
  await expect(retry(createThrowUntilN(3), { backoff })).resolves.toEqual(
    'lorem'
  )
})

it('retries up to `maxAttempts`', async () => {
  const backoff = async () => {}
  await expect(
    retry(createThrowUntilN(3), { maxAttempts: 2, backoff })
  ).rejects.toThrow(Error)
})

it('retries in case `shouldRetry` returns true', async () => {
  function createNumberGenerator() {
    let number = 0
    return async () => {
      number += 1
      return number
    }
  }
  const numberGenerator = createNumberGenerator()

  /**
   * @param {number} number
   * @returns {boolean}
   */
  function shouldRetry(number) {
    return number < 2
  }

  const backoff = async () => {}
  await expect(retry(numberGenerator, { shouldRetry, backoff })).resolves.toBe(
    2
  )
})

it('executes `onRetry` on each retry', async () => {
  const maxAttempts = 3
  const onRetry = jest.fn(() => {})
  const backoff = async () => {}

  const throwUntil3 = createThrowUntilN(maxAttempts)
  await retry(throwUntil3, { maxAttempts, onRetry, backoff })
  expect(onRetry).toHaveBeenCalledTimes(maxAttempts - 1)
})

it('backs off between each retry', async () => {
  //
  // Given
  //

  const maxAttempts = 3
  const throwUntil3 = createThrowUntilN(3)

  // A backoff function that sleeps for 10 ms
  async function backoff() {
    await sleep(10)
  }

  //
  // When
  //

  // `retry` runs with `maxAttempts` set to `3`
  const before = Date.now()
  await retry(throwUntil3, { backoff, maxAttempts })

  //
  // Then
  //

  // The delta of time from before running `retry` and after it's finished should be the number of `maxAttempts` minus 1, since the backoff function only runs in-between `onRetry` executions.
  const delta = Date.now() - before
  expect(delta).toBeGreaterThanOrEqual(20)
  expect(delta).toBeLessThan(50)
})

it('returns the returned value by `asyncThunk` argument', async () => {
  //
  // Given
  //

  const asyncThunkOutput = 123
  const asyncThunk = async () => asyncThunkOutput
  const shouldRetry = () => true

  // We are using `maxAttempts === 1` here to exercise a particular code path
  const maxAttempts = 1

  //
  // When
  //

  const output = await retry(asyncThunk, { maxAttempts, shouldRetry })

  //
  // Then
  //

  expect(output).toBe(asyncThunkOutput)
})
