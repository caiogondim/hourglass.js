const sleep = require('../sleep')
const queued = require('.')

function createAsyncCounter() {
  let count = 0
  return async () => {
    await sleep(100)
    count += 1
    return count
  }
}

it('returns the same value as non-decorated function', async () => {
  const counter = createAsyncCounter()
  const queuedCounter = queued(createAsyncCounter())

  expect(
    await Promise.all([counter(), counter(), counter(), counter(), counter()])
  ).toEqual([1, 2, 3, 4, 5])

  expect(
    await Promise.all([
      queuedCounter(),
      queuedCounter(),
      queuedCounter(),
      queuedCounter(),
      queuedCounter(),
    ])
  ).toEqual([1, 2, 3, 4, 5])
})

it('enqueues calls so they run in series', async () => {
  const counter = createAsyncCounter()
  const before1 = Date.now()
  await Promise.all([counter(), counter(), counter(), counter(), counter()])
  const now1 = Date.now()

  expect(now1 - before1).toBeGreaterThanOrEqual(90)
  expect(now1 - before1).toBeLessThan(110)

  const queuedCounter = queued(createAsyncCounter())
  const before2 = Date.now()
  await Promise.all([
    queuedCounter(),
    queuedCounter(),
    queuedCounter(),
    queuedCounter(),
    queuedCounter(),
  ])
  const now2 = Date.now()
  expect(now2 - before2).toBeGreaterThanOrEqual(475)
  expect(now2 - before2).toBeLessThan(525)
})

it('throws an error if argument is not a function', async () => {
  expect(() => queued('lorem')).toThrow(TypeError)
  expect(() => queued({})).toThrow(TypeError)
  expect(() => queued(1)).toThrow(TypeError)
  expect(() => queued(() => {})).not.toThrow(TypeError)
})

it('doesnt catch errors throwed by decorated function', async () => {
  async function throwAsyncError() {
    await sleep(100)
    throw new Error('foo')
  }
  const queuedThrowAsyncError = queued(throwAsyncError)
  await expect(queuedThrowAsyncError()).rejects.toThrow(Error)
})
