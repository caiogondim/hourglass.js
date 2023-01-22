import { take } from '../take'
import { map } from '.'

async function* createNumbersGenerator() {
  const nextTick = Promise.resolve()
  let index = 0
  for (;;) {
    yield index
    index += 1
    await nextTick
  }
}

it('maps over values from generator passed as argument', async () => {
  //
  // Arrange
  //

  const evenNumbersGenerator = map(async (n) => {
    await Promise.resolve()
    return n * 2
  }, take(5, createNumbersGenerator()))

  //
  // Act
  //

  const output = []
  for await (const currentNumber of evenNumbersGenerator) {
    output.push(currentNumber)
  }

  //
  // Assert
  //

  expect(output).toEqual([0, 2, 4, 6, 8])
})
