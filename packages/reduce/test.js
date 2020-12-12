const reduce = require('.')
const createNumbersGenerator = require('../../shared/create-numbers-generator')
const take = require('../take')
const compose = require('../compose')

it('consumes the whole generator, applys the `reducer` function for each value, returns "reduced" value', async () => {
  const composed = compose(createNumbersGenerator(), take(5))
  const reduced = await reduce(
    composed,
    (accumulator = 0, current) => accumulator + current
  )
  expect(reduced).toBe(10)
})

it('accepts a third optional argument `initialValue` that server as the initial value for `accumulator`', async () => {
  const composed = compose(createNumbersGenerator(), take(5))
  const reduced = await reduce(
    composed,
    (accumulator, current) => accumulator + current,
    10
  )
  expect(reduced).toBe(20)
})
