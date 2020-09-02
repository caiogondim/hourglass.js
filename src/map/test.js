const map = require('.')

/**
 *
 * @param {Object} options
 * @param {number} options.max
 * @returns {IterableIterator<number>}
 */
function* createNumbersGenerator({ max }) {
  let x = 1
  while (true) {
    yield x
    if (x >= max) {
      return
    }
    x += 1
  }
}

it('maps over values from generator passed as argument', async () => {
  const evenNumbersGenerator = map(
    createNumbersGenerator({ max: 5 }),
    (n) => n * 2
  )
  const generatedValues = []
  for (let val of evenNumbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([2, 4, 6, 8, 10])
})
