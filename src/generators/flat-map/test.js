const flatMap = require('.')
const consume = require('../consume')
const take = require('../take')
const createNumbersGenerator = require('../../_shared/create-numbers-generator')
const compose = require('../compose')

it('flats generated value if it is an array', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(2),
    flatMap((n) => [n, n + 1, n + 2])
  )
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 1, 2, 3])
})

it('flats generated value if it is an iterable', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(2),
    flatMap((n) => new Set([n + 100, n + 101, n + 102]))
  )
  const output = await consume(composed)
  expect(output).toEqual([100, 101, 102, 101, 102, 103])
})

it('works as map in case generated value is not an iterable', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(5),
    flatMap((n) => n * 3)
  )
  const output = await consume(composed)
  expect(output).toEqual([0, 3, 6, 9, 12])
})

it('is composable', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(2),
    flatMap((n) => [n + 100, n + 101, n + 102])
  )
  const output = await consume(composed)
  expect(output).toEqual([100, 101, 102, 101, 102, 103])
})
