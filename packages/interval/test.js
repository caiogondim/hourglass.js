const interval = require('.')
const take = require('../take')
const consume = require('../consume')
const compose = require('../compose')
const createFibonacciGenerator = require('../../shared/create-fibonacci-generator')

it('consumes generator every `ms` miliseconds', async () => {
  const composed = take(4, interval(10, createFibonacciGenerator()))
  const past = Date.now()
  const output = await consume(composed)

  expect(output).toEqual([1, 1, 2, 3])
  expect(Date.now() - past).toBeGreaterThanOrEqual(40)
})

it('is composable', async () => {
  const composed = compose(createFibonacciGenerator(), interval(10), take(4))
  const past = Date.now()
  const output = await consume(composed)

  expect(output).toEqual([1, 1, 2, 3])
  expect(Date.now() - past).toBeGreaterThanOrEqual(40)
})
