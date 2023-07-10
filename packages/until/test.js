import { jest } from '@jest/globals'
import { until, TimeoutError } from '.'

function createAsyncCounter() {
  const count = { value: 0 }
  const counter = jest.fn(async function counter() {
    await Promise.resolve()
    count.value = count.value + 1
    return count.value
  })

  return [count, counter]
}

it('resolves returned promise when thunk returns an expected value', async () => {
  const [count, counter] = createAsyncCounter()

  await until(counter, 3)

  expect(counter).toBeCalledTimes(3)
  expect(count.value).toEqual(3)
})

it('re-evaluates thunk based on interval argument', async () => {
  const [count, counter] = createAsyncCounter()
  const interval = 100
  const timeout = interval * 3
  await until(counter, 3, { interval, timeout })

  expect(counter).toBeCalledTimes(3)
  expect(count.value).toEqual(3)
})

it('rejects promise if thunk does not return an expected value before the timeout argument', async () => {
  expect.assertions(2)
  const [, counter] = createAsyncCounter()

  const interval = 100
  const timeout = interval / 2
  try {
    await until(counter, 3, { interval, timeout })
  } catch (error) {
    expect(error).toBeInstanceOf(TimeoutError)
    expect(error.message).toMatchInlineSnapshot(`"50 ms have passed"`)
  }
})

it('throws an error in case timeout argument is less than 1', async () => {
  expect.assertions(2)
  const [, counter] = createAsyncCounter()
  const timeout = 0
  try {
    await until(counter, 3, { timeout })
  } catch (error) {
    expect(error).toBeInstanceOf(TypeError)
    expect(error.message).toMatchInlineSnapshot(
      `"timeout needs to be greater than 0"`
    )
  }
})

it('stops executing `thunk` once `timeout` is reached', async () => {
  const [, counter] = createAsyncCounter()
  const timeout = 5
  const interval = 10
  try {
    await until(counter, 3, { interval, timeout })
    // eslint-disable-next-line no-empty
  } catch {}
  expect(counter).toHaveBeenCalledTimes(1)
})
