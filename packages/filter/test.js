import { take } from '../take'
import { consume } from '../consume'
import { filter } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0

  for (;;) {
    await nextTick
    yield index
    index += 1
  }
}

it('filters values from generator passed as argument', async () => {
  const oddNumberGenerator = filter(take(10, createNumbersGenerator()), (n) =>
    Boolean(n % 2)
  )
  const output = await consume(oddNumberGenerator)

  expect(output).toEqual([1, 3, 5, 7, 9])
})
