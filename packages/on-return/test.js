import { jest } from '@jest/globals'
import { consume } from '@hourglass/consume'
import { take } from '@hourglass/take'
import { onReturn } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

it('executes `callback` after generator is finished', async () => {
  const callback = jest.fn(() => {})
  const composed = onReturn(callback, take(5, createNumbersGenerator()))
  await consume(composed)
  expect(callback).toHaveBeenCalled()
})
