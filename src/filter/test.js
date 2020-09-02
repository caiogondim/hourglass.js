const filter = require('.')
const take = require('../take')
const createNumbersGenerator = require('../_shared/create-numbers-generator')

it('filters values from generator passed as argument', () => {
  const oddNumberGenerator = filter(take(createNumbersGenerator(), 10), (n) =>
    Boolean(n % 2)
  )
  const generatedValues = []

  for (let val of oddNumberGenerator) {
    generatedValues.push(val)
  }

  expect(generatedValues).toEqual([1, 3, 5, 7, 9])
})
