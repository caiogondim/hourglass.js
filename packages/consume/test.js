import { take } from '../take'
import { consume } from '.'

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

it('consumes the whole generator and returns an array with all generated values', async () => {
  const firstFiveFibonacciNumbers = take(5, createFibonacciGenerator())
  const result = await consume(firstFiveFibonacciNumbers)
  expect(result).toEqual([1, 1, 2, 3, 5])
})
