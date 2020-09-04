const delay = require('.')
const take = require('../take')
const compose = require('../compose')
const {
  async: createNumbersGenerator,
} = require('../_shared/create-numbers-generator')

it('delays generator', async () => {
  const composed = compose(createNumbersGenerator, take(5), async function* (
    gen
  ) {
    yield* delay(10, gen)
  })
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([1, 2, 3, 4, 5])
})

it('is composable', async () => {
  const composed = compose(createNumbersGenerator, take(5), delay(10))
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([1, 2, 3, 4, 5])
})
