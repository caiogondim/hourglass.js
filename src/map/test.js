const map = require('.')
const take = require('../take')
const compose = require('../compose')
const {
  async: createNumbersGenerator,
} = require('../_shared/create-numbers-generator')

it('maps over values from generator passed as argument', async () => {
  const evenNumbersGenerator = map(
    (n) => n * 2,
    take(5, createNumbersGenerator())
  )
  const generatedValues = []
  for await (let val of evenNumbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([2, 4, 6, 8, 10])
})

it('is composable', async () => {
  const evenNumbersGenerator = compose(
    createNumbersGenerator,
    map((n) => n * 2),
    take(5)
  )
  const generatedValues = []
  for await (let val of evenNumbersGenerator) {
    generatedValues.push(val)
  }
  expect(generatedValues).toEqual([2, 4, 6, 8, 10])
})
