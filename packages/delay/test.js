import { take } from '@hourglass/take'
import { consume } from '@hourglass/consume'
import { delay } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

it('delays generator', async () => {
  const output = await consume(delay(10, take(5, createNumbersGenerator())))
  expect(output).toEqual([0, 1, 2, 3, 4])
})
