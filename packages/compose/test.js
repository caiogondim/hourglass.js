const compose = require('.')
const map = require('../map')
const take = require('../take')
const delay = require('../delay')
const consume = require('../consume')
const createNumbersGenerator = require('../../shared/create-numbers-generator')
const createFibonacciGenerator = require('../../shared/create-fibonacci-generator')
const toAsyncGenerator = require('../to-async-generator')

it('composes generators', async () => {
  const composed = compose(
    createNumbersGenerator,
    delay(1),
    map((x) => x * 2),
    take(5)
  )
  const output = await consume(composed)
  expect(output).toEqual([0, 2, 4, 6, 8])
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

it('accepts a generator as first argument', async () => {
  const composed = compose(
    createNumbersGenerator(), // returns a generator instance
    delay(1),
    map((x) => x * 2),
    take(5)
  )
  const output = await consume(composed)
  expect(output).toEqual([0, 2, 4, 6, 8])
})

it('accepts an AsyncGeneratorFunction as first argument', async () => {
  const composed = compose(
    toAsyncGenerator(createNumbersGenerator),
    delay(1),
    map((x) => x * 2),
    take(5)
  )
  const output = await consume(composed)
  expect(output).toEqual([0, 2, 4, 6, 8])
})

it('accepts a GeneratorFunction as first argument', async () => {
  const composed = compose(
    createFibonacciGenerator,
    delay(1),
    map((x) => x * 2),
    take(5)
  )
  const output = await consume(composed)
  expect(output).toEqual([2, 2, 4, 6, 10])
})
