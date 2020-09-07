const take = require('.')
const compose = require('../compose')
const consume = require('../consume')
const createNumbersGenerator = require('../_shared/create-numbers-generator')

it('takes the first N values from a generator', async () => {
  const numbersGenerator = take(5, createNumbersGenerator())
  const output = await consume(numbersGenerator)
  expect(output).toEqual([0, 1, 2, 3, 4])
})

it('is composable', async () => {
  const composed = compose(createNumbersGenerator, take(5))
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
})
