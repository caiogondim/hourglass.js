import { it, expect, jest } from '@jest/globals'
import { createBackoff } from '.'

jest.setTimeout(30_000)

function useFakeTimers() {
  jest.useFakeTimers()
}

function clearFakeTimers() {
  jest.clearAllTimers()
}

beforeEach(() => {
  useFakeTimers()
})

afterEach(() => {
  clearFakeTimers()
})

it('increments the previous back off time by multiplying by 2', async () => {
  //
  // Given
  //

  const backoff = createBackoff()
  const spy = jest.fn()

  //
  // When
  //

  let sleep = 1000
  for (let index = 1; index <= 3; index += 1) {
    await Promise.allSettled([
      backoff(),
      (async () => {
        await Promise.resolve()
        jest.advanceTimersByTime(sleep)
      })(),
    ])
    spy()
    sleep = sleep * 2
  }

  //
  // Then
  //

  expect(spy).toHaveBeenCalledTimes(3)
})

it.skip('never backs off for more than `max` ms', async () => {
  const acceptanceRange = 1000
  const backoff = createBackoff({ max: 2000 })

  let before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(1000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(1000 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(2000 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(2000 - acceptanceRange)
  expect(Date.now() - before).toBeLessThan(2000 + acceptanceRange)
})

it.skip('accepts `initial` as the initial back off time', async () => {
  const acceptanceRange = 10
  const backoff = createBackoff({ initial: 10 })

  let before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(10 - acceptanceRange)
  expect(Date.now() - before).toBeLessThanOrEqual(10 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(20 - acceptanceRange)
  expect(Date.now() - before).toBeLessThanOrEqual(20 + acceptanceRange)

  before = Date.now()
  await backoff()
  expect(Date.now() - before).toBeGreaterThanOrEqual(40 - acceptanceRange)
  expect(Date.now() - before).toBeLessThanOrEqual(40 + acceptanceRange)
})

it.skip('adds jitter to time if `jitter` is passed', async () => {
  useFakeTimers()

  const originalMathRandom = Math.random.bind(Math)
  Math.random = jest.fn(() => 0.5)

  const backoff = createBackoff({ jitter: 500 })
  const function_ = jest.fn()

  await Promise.all([
    (async () => {
      await backoff()
      function_()
    })(),
    (async () => {
      // First call to backoff should generate 1000ms of sleep,
      // plus 250 from jitter (500 * 0.5)
      jest.advanceTimersByTime(1250)
    })(),
  ])
  expect(function_).toBeCalled()

  await Promise.all([
    (async () => {
      await backoff()
      function_()
    })(),
    (async () => {
      // Second call to backoff should generate 2000ms of sleep,
      // plus 250 from jitter (500 * 0.5)
      jest.advanceTimersByTime(2250)
    })(),
  ])
  expect(function_).toHaveBeenCalledTimes(2)

  await Promise.all([
    (async () => {
      await backoff()
      function_()
    })(),
    (async () => {
      // Second call to backoff should generate 4000ms of sleep,
      // plus 250 from jitter (500 * 0.5)
      jest.advanceTimersByTime(4250)
    })(),
  ])
  expect(function_).toHaveBeenCalledTimes(3)
  expect(Math.random).toHaveBeenCalledTimes(3)

  clearFakeTimers()
  Math.random = originalMathRandom
})
