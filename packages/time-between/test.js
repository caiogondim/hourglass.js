// import { jest } from '@jest/globals'
import { take } from '@hourglass/take'
import { compose } from '@hourglass/compose'
import { timeBetween } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

it('sleeps between each item generated', async () => {
  const timeBetweenMs = 10
  const takeNumber = 3
  const output = []
  const past = Date.now()

  for await (let value of timeBetween(timeBetweenMs, take(takeNumber, createNumbersGenerator()))) {
    output.push(value)
  }

  expect(output).toEqual([0, 1, 2])
  expect(Date.now() - past).toBeGreaterThanOrEqual(timeBetweenMs * (takeNumber - 1))
})
