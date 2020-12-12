const skip = require('.')
const take = require('../take')
const compose = require('../compose')
const consume = require('../consume')
const createFibonacciGenerator = require('../../shared/create-fibonacci-generator')

it('skips first `n` values of a generator', async () => {
  const composed = take(5, skip(3, createFibonacciGenerator()))
  const output = await consume(composed)
  expect(output).toEqual([3, 5, 8, 13, 21])
})

it('is composable', async () => {
  const composed = compose(createFibonacciGenerator(), skip(3), take(5))
  const output = await consume(composed)
  expect(output).toEqual([3, 5, 8, 13, 21])
})
