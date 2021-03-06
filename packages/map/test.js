const map = require('.')
const take = require('../take')
const compose = require('../compose')
const consume = require('../consume')
const createNumbersGenerator = require('../../shared/create-numbers-generator')

it('maps over values from generator passed as argument', async () => {
  const evenNumbersGenerator = map(
    (n) => n * 2,
    take(5, createNumbersGenerator())
  )
  const output = await consume(evenNumbersGenerator)
  expect(output).toEqual([0, 2, 4, 6, 8])
})

it('is composable', async () => {
  const evenNumbersGenerator = compose(
    createNumbersGenerator,
    map((n) => n * 2),
    take(5)
  )
  const output = await consume(evenNumbersGenerator)
  expect(output).toEqual([0, 2, 4, 6, 8])
})
