import { it } from '@jest/globals'
import { take } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('takes the first N values from a generator', async () => {
  const numbersGenerator = take(5, createNumbersGenerator())
  const output = []
  for await (const currentNumber of numbersGenerator) {
    output.push(currentNumber)
  }
  expect(output).toEqual([0, 1, 2, 3, 4])
})
