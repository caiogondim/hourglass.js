import { take } from '@hourglass/take'
import { consume } from '@hourglass/consume'
import { chunks } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

it('groups generated values into chunks', async () => {
  const composed = chunks(3, take(10, createNumbersGenerator()))
  const values = await consume(composed)
  expect(values).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
})
