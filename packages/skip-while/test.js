import { take } from '../take'
import { consume } from '../consume'
import { skipWhile } from '.'

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

it('skips generated values while predicate returns `true`', async () => {
  const composed = take(
    5,
    skipWhile((n) => n < 3, createFibonacciGenerator())
  )
  const output = await consume(composed)
  expect(output).toEqual([3, 5, 8, 13, 21])
})
