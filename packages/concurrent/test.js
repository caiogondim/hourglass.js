import { sleep } from '@hourglass/sleep'
import { defer } from '@hourglass/defer'
import { concurrent } from '.'

it('returns results in correct order', async () => {
  let count = 1
  async function foo() {
    const countSnapshot = count
    count += 1
    await sleep(0, { jitter: 10 })
    return countSnapshot
  }

  for (let index = 0; index < 10; index += 1) {
    const countSnapshot = count
    const results = await concurrent([foo, foo, foo])
    expect(results).toEqual([
      countSnapshot,
      countSnapshot + 1,
      countSnapshot + 2,
    ])
  }
})

it.todo(
  'has a `pending` property on promise with number of yet to be fulfilled thunks'
)

it('has a `pending` property on promise that is read-only', () => {
  const promise = concurrent([() => {}])
  expect(() => (promise.pending = 4)).toThrow(
    new TypeError(`"pending" is read-only`)
  )
})

it.todo('has a `fulfilled` property on promise with number of fulfilled thunks')

it('has a `fulfilled` property on promise that is read-only', () => {
  const promise = concurrent([() => {}])
  expect(() => (promise.fulfilled = 4)).toThrow(
    new TypeError(`"fulfilled" is read-only`)
  )
})

it.skip('throws error on first rejected promise', async () => {
  const [promise, , reject] = defer()

  jest.useFakeTimers()

  try {
    const promise = concurrent([
      () => sleep(10),
      async () => {
        await sleep(5)
        throw new Error()
      },
    ])

    jest.advanceTimersByTime(10)
    await Promise.resolve()
    await Promise.resolve()
    await Promise.resolve()

    await expect(promise).rejects.toThrow(Error)
  } catch {
    console.log('adasd')
  }

  jest.clearAllTimers()
})

it.skip('implements a concurrency limiter', async () => {
  useFakeTimers()

  const promise = concurrent(
    [
      () => sleep(10),
      () => sleep(10),
      () => sleep(10),
      () => sleep(10),
      () => sleep(10),
    ],
    { limit: 3 }
  )
  expect(promise.pending).toEqual(5)
  expect(promise.fulfilled).toBe(0)

  // We need to force new iterations on the event loop in order to resolve
  // all previous promises that finished running
  jest.advanceTimersByTime(10)
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()

  expect(promise.pending).toBe(2)
  expect(promise.fulfilled).toBe(3)

  // We need to force new iterations on the event loop in order to resolve
  // all previous promises that finished running
  jest.advanceTimersByTime(10)
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()

  expect(promise.pending).toBe(0)
  expect(promise.fulfilled).toBe(5)

  jest.clearAllTimers()
})
