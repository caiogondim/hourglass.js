const map = require('.')
const take = require('../take')
const compose = require('../compose')
const consume = require('../consume')
const createNumbersGenerator = require('../_shared/create-numbers-generator')

it('maps over values from generator passed as argument', async () => {
  const evenNumbersGenerator = map(
    (n) => n * 2,
    take(5, createNumbersGenerator())
  )
  const output = await consume(evenNumbersGenerator)
  expect(output).toEqual([2, 4, 6, 8, 10])
})

it('is composable', async () => {
  const evenNumbersGenerator = compose(
    createNumbersGenerator,
    map((n) => n * 2),
    take(5)
  )
  const output = await consume(evenNumbersGenerator)
  expect(output).toEqual([2, 4, 6, 8, 10])
})
