import { jest} from '@jest/globals'
import { until, TimeoutError } from '.'

function createAsyncCounter() {
  const count = { value: 0}
  const counter = jest.fn(async function counter() {
    await Promise.resolve()
    count.value = count.value + 1
    return count.value
  })

  return [count, counter]
}

it('resolves returned promise when thunk returns an expected value', async () => {
  const [count, counter] = createAsyncCounter()

  await until(counter, 3, { interval: 0 })

  expect(counter).toBeCalledTimes(3)
  expect(count.value).toEqual(3)
})

it('re-evaluates thunk based on interval argument', async () => {
  const [count, counter] = createAsyncCounter()
  const interval = 100
  const timeout = interval * 3
  await until(counter, 3, {interval, timeout})

  expect(counter).toBeCalledTimes(3)
  expect(count.value).toEqual(3)
})

it('rejects promise if thunk does not return an expected value before the timeout argument', async () => {
  const [, counter] = createAsyncCounter()

  const interval = 100
  const timeout = interval / 2
  try {
    await until(counter, 3, {interval, timeout})
  } catch (error) {
    expect(error).toBeInstanceOf(TimeoutError)
  }
})
