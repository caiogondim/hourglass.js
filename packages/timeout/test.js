import { sleep } from '../sleep'
import { timeout, TimeoutError } from '.'

it('throws an error if first argument is not a promise', async () => {
  // @ts-expect-error
  await expect(() => timeout('foo', 1000)).rejects.toThrow(
    new TypeError('First argument must be a promise')
  )
})

it('throws an error if second argument is not a number', async () => {
  const dummyPromise = new Promise(() => {})
  // @ts-expect-error
  await expect(() => timeout(dummyPromise, 'foo')).rejects.toThrow(
    new TypeError('Second argument must be a number')
  )
})

it('returns the value of the promise passed as argument in case it resolves before the timeout time', async () => {
  const asyncThunk = async () => {
    await sleep(1)
    return 3
  }
  const output = await timeout(asyncThunk(), 100)
  expect(output).toEqual(3)
})

it(`throws an error in case the promise passed as argument doesn't resolve before the timeout time`, async () => {
  const asyncThunk = async () => {
    await sleep(100)
    return 2
  }
  await expect(() => timeout(asyncThunk(), 1)).rejects.toThrow(TimeoutError)
})
