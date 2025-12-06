import { jest } from '@jest/globals'
import { compose } from '@hourglass/compose'
import { take } from '@hourglass/take'
import { consume } from '@hourglass/consume'
import { tap } from '.'

async function* createNumbersGenerator() {
  let index = 0
  while (true) {
    yield index
    index += 1
  }
}

it('callback is called for every generated value by generator', async () => {
  const callback = jest.fn(() => {})
  const composed = tap(callback, take(5, createNumbersGenerator()))
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
  expect(callback).toHaveBeenCalledTimes(5)
})

it('callback is called with generated value as argument', async () => {
  const callback = jest.fn(() => {})
  const composed = tap(callback, take(5, createNumbersGenerator()))
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
  expect(callback.mock.calls).toEqual([[0], [1], [2], [3], [4]])
})

it('does not transform generated values', async () => {
  const tapped = compose(
    createNumbersGenerator,
    (gen) => take(5, gen),
    (gen) => tap(() => {}, gen)
  )
  const untapped = compose(createNumbersGenerator, (gen) => take(5, gen))

  expect(await consume(tapped())).toEqual(await consume(untapped()))
})
