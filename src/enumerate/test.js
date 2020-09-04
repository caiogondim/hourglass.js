const enumerate = require('.')
const {
  async: createNumbersGenerator,
} = require('../_shared/create-numbers-generator')
const take = require('../take')
const map = require('../map')
const compose = require('../compose')

it('returns current iteration count and val from generator', async () => {
  const gen = take(3, enumerate(map((n) => n * 2, createNumbersGenerator())))
  const output = []

  for await (let [i, val] of gen) {
    output.push([i, val])
  }

  expect(output).toEqual([
    [0, 2],
    [1, 4],
    [2, 6],
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

  for await (let [i, val] of gen) {
    output.push([i, val])
  }

  expect(output).toEqual([
    [0, 2],
    [1, 4],
    [2, 6],
  ])
})
