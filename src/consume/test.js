const consume = require('.')
const createFibonacciGenerator = require('../_shared/create-fibonacci-generator')
const compose = require('../compose')
const take = require('../take')

it('consumes the whole generator and returns an array with all generated values', async () => {
  const composed = compose(createFibonacciGenerator, take(5))
  const result = await consume(composed)
  expect(result).toEqual([1, 1, 2, 3, 5])
})
