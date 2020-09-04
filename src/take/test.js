const take = require('.')
const compose = require('../compose')
const {
  async: createNumbersGenerator,
} = require('../_shared/create-numbers-generator')

it('takes the first N values from a generator', async () => {
  const numbersGenerator = take(5, createNumbersGenerator())
  const generatedValues = []
  for await (let val of numbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([1, 2, 3, 4, 5])
})

it('is composable', async () => {
  const composed = compose(createNumbersGenerator, take(5))
  const generatedValues = []
  for await (let val of composed) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([1, 2, 3, 4, 5])
})
