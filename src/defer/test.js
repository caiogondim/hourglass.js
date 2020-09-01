const defer = require('./')

it('', async () => {
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

it('asd', async () => {
  const [promise, _, reject] = defer()
  async function foo() {
    await promise
  }
  const fooPromise = foo
  reject(new Error('lorem ipsum'))
  await expect(promise).rejects.toThrow('lorem ipsum')
})
