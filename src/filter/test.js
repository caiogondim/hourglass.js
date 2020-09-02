const filter = require('.')

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

it('filters values from generator passed as argument', () => {
  const oddNumberGenerator = filter(createNumbersGenerator({ max: 10 }), (n) =>
    Boolean(n % 2)
  )
  const generatedValues = []

  for (let val of oddNumberGenerator) {
    generatedValues.push(val)
  }

  expect(generatedValues).toEqual([1, 3, 5, 7, 9])
})
