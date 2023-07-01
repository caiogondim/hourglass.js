import { consume } from '../consume'
import { takeWhile } from '.'

async function* createFibonacciGenerator() {
  const nextTick = Promise.resolve()
  let a = 0
  let b = 1

  for (;;) {
    yield b
    let temporary = a
    a = b
    b = temporary + b
    await nextTick
  }
}

it('takes generated values while predicate returns `true`', async () => {
  const composed = takeWhile((n) => n < 10, createFibonacciGenerator())
  const output = await consume(composed)
  expect(output).toEqual([1, 1, 2, 3, 5, 8])
})
