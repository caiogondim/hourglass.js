const map = require('.')
const take = require('../take')
const { async: createNumbersGenerator } = require('../_shared/create-numbers-generator')

it('maps over values from generator passed as argument', async () => {
  const evenNumbersGenerator = map(
    take(createNumbersGenerator(), 5),
    (n) => n * 2
  )
  const generatedValues = []
  for await (let val of evenNumbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([2, 4, 6, 8, 10])
})
