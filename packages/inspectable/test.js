const inspectable = require('.')
const defer = require('../defer')

it('does not change the original promise and returns a new promise', async () => {
  const [promise] = defer()
  expect(promise).toBe(promise)
  expect(inspectable(promise)).not.toBe(promise)
})

describe('inspect()', () => {
  it("returns `{ state: 'pending', value }` when promise is still pending", async () => {
    const [promise] = defer()
    const inspectablePromise = inspectable(promise)
    expect(inspectablePromise.inspect().state).toBe('pending')
  })

  it("returns `{ state: 'fulfilled', value }` when promise is fulfilled", async () => {
    const [promise, resolve] = defer()
    const inspectablePromise = inspectable(promise)
    await resolve()
    expect(inspectablePromise.inspect().state).toBe('fulfilled')
  })

  it("returns `{ state: 'rejected', reason }` when promise is fulfilled", async () => {
    const [promise, , reject] = defer()
    promise.catch(() => {})

    const inspectablePromise = inspectable(promise)
    inspectablePromise.catch(() => {})

    await reject()
    expect(inspectablePromise.inspect().state).toBe('rejected')
  })
})
