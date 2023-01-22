import { take } from '../take'
import { consume } from '../consume'
import { skip } from '.'

async function* createFibonacciGenerator() {
  let a = 0
  let b = 1
  const nextTick = Promise.resolve()

  for (;;) {
    yield b
    let temporary = a
    a = b
    b = temporary + b
    await nextTick
  }
}

it('skips first `n` values of a generator', async () => {
  const composed = take(5, skip(3, createFibonacciGenerator()))
  const output = await consume(composed)
  expect(output).toEqual([3, 5, 8, 13, 21])
})
