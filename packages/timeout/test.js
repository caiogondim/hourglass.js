const { timeout } = require('.')

it('throws an error if first argument is not a promise', async () => {
  await expect(() => timeout('foo', 1000)).rejects.toThrow(
    new TypeError('First argument must be a promise')
  )
})

it('throws an error if second argument is not a number', async () => {
  const dummyPromise = new Promise(() => {})
  await expect(() => timeout(dummyPromise, 'foo')).rejects.toThrow(
    new TypeError('Second argument must be a number')
  )
})
