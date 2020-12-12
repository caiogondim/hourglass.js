const delay = require('.')
const take = require('../take')
const compose = require('../compose')
const consume = require('../consume')
const createNumbersGenerator = require('../../shared/create-numbers-generator')

it('delays generator', async () => {
  const composed = compose(
    createNumbersGenerator,
    take(5),
    async function* (gen) {
      yield* delay(10, gen)
    }
  )
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
})

it('is composable', async () => {
  const composed = compose(createNumbersGenerator, take(5), delay(10))
  const output = await consume(composed)
  expect(output).toEqual([0, 1, 2, 3, 4])
})
