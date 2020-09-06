const filter = require('.')
const take = require('../take')
const compose = require('../compose')
const createNumbersGenerator = require('../_shared/create-numbers-generator')

it('filters values from generator passed as argument', async () => {
  const oddNumberGenerator = compose(
    createNumbersGenerator,
    take(10),
    filter((n) => Boolean(n % 2))
  )
  const output = []

  for await (let val of oddNumberGenerator) {
    output.push(val)
  }

  expect(output).toEqual([1, 3, 5, 7, 9])
})

it('is composable', async () => {
  const oddNumberGenerator = compose(
    createNumbersGenerator,
    take(10),
    filter((n) => Boolean(n % 2))
  )
  const output = []

  for await (let val of oddNumberGenerator) {
    output.push(val)
  }

  expect(output).toEqual([1, 3, 5, 7, 9])
})
