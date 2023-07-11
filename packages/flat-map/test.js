import { consume } from '../consume'
import { take } from '../take'
import { flatMap } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0

  for (;;) {
    await nextTick
    yield index
    index += 1
  }
}

it('flats generated value if it is an array', async () => {
  //
  // Given
  //

  const composed = flatMap(
    (n) => Promise.resolve([n, n + 1, n + 2]),
    take(2, createNumbersGenerator())
  )

  //
  // When
  //

  const output = await consume(composed)

  //
  // Then
  //

  expect(output).toEqual([0, 1, 2, 1, 2, 3])
})

it('flats generated value if it is an iterable', async () => {
  //
  // Given
  //

  const composed = flatMap(
    (n) => Promise.resolve(new Set([n + 100, n + 101, n + 102])),
    take(2, createNumbersGenerator())
  )

  //
  // When
  //

  const output = await consume(composed)

  //
  // Then
  //

  expect(output).toEqual([100, 101, 102, 101, 102, 103])
})

it('works as map in case generated value is not an iterable', async () => {
  //
  // Given
  //

  const composed = flatMap(
    (n) => Promise.resolve(n * 3),
    take(5, createNumbersGenerator())
  )

  //
  // When
  //

  const output = await consume(composed)

  //
  // Then
  //

  expect(output).toEqual([0, 3, 6, 9, 12])
})
