const defer = require('./')

it('returns a promise and a resolve function that resolves the returned promise', async () => {
  const [promise, resolve] = defer()
  let counter = 0
  async function count() {
    await promise
    counter += 1
  }

  const countPromise = count()
  expect(counter).toBe(0)

  resolve()
  await countPromise
  expect(counter).toBe(1)
})

it('returns a promise and a reject function that rejects the returned promise', async () => {
  const [promise, , reject] = defer()
  reject(new Error('lorem ipsum'))
  await expect(promise).rejects.toThrow('lorem ipsum')
})
