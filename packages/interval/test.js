import { take } from '@hourglass/take'
import { consume } from '@hourglass/consume'
import { interval } from '.'

function* createFibonacciGenerator() {
  let a = 1
  let b = 1
  while (true) {
    yield a
    ;[a, b] = [b, a + b]
  }
}

it('consumes generator every `ms` miliseconds', async () => {
  const composed = take(4, interval(10, createFibonacciGenerator()))
  const past = Date.now()
  const output = await consume(composed)

  expect(output).toEqual([1, 1, 2, 3])
  expect(Date.now() - past).toBeGreaterThanOrEqual(40)
})
