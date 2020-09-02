const take = require('.')
const {
  async: createNumbersGenerator,
} = require('../_shared/create-numbers-generator')

it('takes the first N values from a generator', async () => {
  const numbersGenerator = take(createNumbersGenerator(), 5)
  const generatedValues = []
  for await (let val of numbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([1, 2, 3, 4, 5])
})
