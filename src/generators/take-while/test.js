const takeWhile = require('.')
const consume = require('../consume')
const compose = require('../compose')
const createFibonacciGenerator = require('../../_shared/create-fibonacci-generator')

it('takes generated values while predicate returns `true`', async () => {
  const composed = takeWhile((n) => n < 10, createFibonacciGenerator())
  const output = await consume(composed)
  expect(output).toEqual([1, 1, 2, 3, 5, 8])
})

it('is composable', async () => {
  const composed = compose(
    createFibonacciGenerator(),
    takeWhile((n) => n < 10)
  )
  const output = await consume(composed)
  expect(output).toEqual([1, 1, 2, 3, 5, 8])
})
