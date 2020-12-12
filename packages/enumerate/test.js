const enumerate = require('.')
const createNumbersGenerator = require('../../shared/create-numbers-generator')
const take = require('../take')
const map = require('../map')
const compose = require('../compose')

it('returns current iteration count and val from generator', async () => {
  const gen = take(3, enumerate(map((n) => n * 2, createNumbersGenerator())))
  const output = []

  for await (let [i, value] of gen) {
    output.push([i, value])
  }

  expect(output).toEqual([
    [0, 0],
    [1, 2],
    [2, 4],
  ])
})

it('is composable', async () => {
  const gen = compose(
    createNumbersGenerator,
    map((n) => n * 2),
    enumerate,
    take(3)
  )
  const output = []

  for await (let [i, value] of gen) {
    output.push([i, value])
  }

  expect(output).toEqual([
    [0, 0],
    [1, 2],
    [2, 4],
  ])
})
