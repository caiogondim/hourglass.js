import { jest, it, beforeEach, afterEach } from '@jest/globals'
import { sleep } from '.'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

it('returns a promise that is resolved after X miliseconds', async () => {
  //
  // Arrange
  //

  const function_ = jest.fn()

  //
  // Act
  //

  await Promise.all([
    (async () => {
      await sleep(500)
      function_()
    })(),
    (async () => {
      jest.advanceTimersByTime(500)
    })(),
  ])

  //
  // Assert
  //

  expect(function_).toBeCalled()
})

it('adds jitter to base time', async () => {
  //
  // Arrange
  //

  const originalMathRandom = Math.random
  Math.random = jest.fn(() => 0.5)

  const function_ = jest.fn()

  //
  // Act
  //

  await Promise.all([
    (async () => {
      await sleep(1000, { jitter: 500 })
      function_()
    })(),
    (async () => {
      // This is base time, which is 1000, plus 250 since Math.random is
      // mocked to return 0.5 and jitter is 500
      // 1000 + (500 / 2) = 1250
      jest.advanceTimersByTime(1250)
    })(),
  ])

  //
  // Assert
  //
  try {
    expect(function_).toBeCalled()
    expect(Math.random).toBeCalled()
  } catch (error) {
    Math.random = originalMathRandom
    throw error
  }
})

it('throws an error if jitter is less than 0', async () => {
  const thunk = async () => {
    await sleep(0, { jitter: -5 })
  }

  await expect(thunk).rejects.toThrow(TypeError)
})
