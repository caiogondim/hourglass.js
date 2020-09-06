const flatMap = require('.')
const take = require('../take')
const createNumbersGenerator = require('../_shared/create-numbers-generator')
const compose = require('../compose')

it('flats generated value if it is an array', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(2),
    flatMap((n) => [n + 100, n + 101, n + 102])
  )
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([101, 102, 103, 102, 103, 104])
})

it('flats generated value if it is an iterable', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(2),
    flatMap((n) => new Set([n + 100, n + 101, n + 102]))
  )
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([101, 102, 103, 102, 103, 104])
})

it('works as map in case generated value is not an iterable', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(5),
    flatMap((n) => n * 2)
  )
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([2, 4, 6, 8, 10])
})

it('is composable', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(2),
    flatMap((n) => [n + 100, n + 101, n + 102])
  )
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([101, 102, 103, 102, 103, 104])
})
