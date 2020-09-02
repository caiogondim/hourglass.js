const compose = require('./')
const map = require('../map')
const take = require('../take')
const delay = require('../delay')
const { async: createNumbersGenerator } = require('../_shared/create-numbers-generator')

it('composes generators', async () => {
  const composed = compose(
    createNumbersGenerator,
    async function* (gen) {
      yield* delay(gen, 10)
    },
    async function* (gen) {
      yield* map(gen, (x) => x * 2)
    },
    async function* (gen) {
      yield* take(gen, 5)
    }
  )
  const output = []
  for await (let val of composed) {
    output.push(val)
  }
  expect(output).toEqual([2, 4, 6, 8, 10])
})

it('throws error if any of the passed arguments are not an async generator function', async () => {
  const gens = [createNumbersGenerator, () => {}]
  const composed = compose(...gens)
  expect(() => composed.next()).rejects.toThrow(TypeError)
})

it('throws error if less than 2 generators are passed as argument', async () => {
  const gens = [createNumbersGenerator]
  const composed = compose(...gens)
  expect(() => composed.next()).rejects.toThrow(TypeError)
})
