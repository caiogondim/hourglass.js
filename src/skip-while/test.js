const skipWhile = require('.')
const take = require('../take')
const consume = require('../consume')
const compose = require('../compose')
const createFibonacciGenerator = require('../_shared/create-fibonacci-generator')

it('skips generated values while predicate returns `true`', async () => {
  const composed = take(
    5,
    skipWhile((n) => n < 3, createFibonacciGenerator())
  )
  const output = await consume(composed)
  expect(output).toEqual([3, 5, 8, 13, 21])
})

it('is composable', async () => {
  const composed = compose(
    createFibonacciGenerator(),
    skipWhile((n) => n < 3),
    take(5)
  )
  const output = await consume(composed)
  expect(output).toEqual([3, 5, 8, 13, 21])
})
