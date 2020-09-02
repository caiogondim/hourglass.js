const delay = require('.')
const take = require('../take')
const compose = require('../compose')
const { async: createNumbersGenerator } = require('../_shared/create-numbers-generator')

it('delay generator', async () => {
  const composed = compose(
    createNumbersGenerator,
    async function* (gen) {
      yield* take(gen, 5)
    },
    async function* (gen) {
      yield* delay(gen, 10)
    }
  )
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([1, 2, 3, 4, 5])
})
