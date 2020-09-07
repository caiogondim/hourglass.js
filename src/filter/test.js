const filter = require('.')
const take = require('../take')
const compose = require('../compose')
const consume = require('../consume')
const createNumbersGenerator = require('../_shared/create-numbers-generator')

it('filters values from generator passed as argument', async () => {
  const oddNumberGenerator = filter(
    (n) => Boolean(n % 2),
    take(10, createNumbersGenerator())
  )
  const output = await consume(oddNumberGenerator)

  expect(output).toEqual([1, 3, 5, 7, 9])
})

it('is composable', async () => {
  const oddNumberGenerator = compose(
    createNumbersGenerator,
    take(10),
    filter((n) => Boolean(n % 2))
  )
  const output = await consume(oddNumberGenerator)

  expect(output).toEqual([1, 3, 5, 7, 9])
})
