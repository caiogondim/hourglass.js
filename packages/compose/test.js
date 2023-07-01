import { map } from '../map'
import { filter } from '../filter'
import { consume } from '../consume'
import { take } from '../take'
import { compose } from '.'

async function* generateNumbers() {
  let currentNumber = 0
  const nextTick = Promise.resolve()
  for (;;) {
    await nextTick
    yield currentNumber
    currentNumber += 1
  }
}

it('composes generators', async () => {
  const composed = compose(
    (x) => take(5, x),
    (x) => filter(x, (y) => y % 2),
    (x) => map((y) => y * 2, x)
  )

  const output = await consume(composed(generateNumbers()))
  expect(output).toMatchInlineSnapshot(`
    [
      1,
      3,
    ]
  `)
})

// const {map} = require('../map')
// const {take} = require('../take')
// const {delay} = require('../delay')
// const {consume} = require('../consume')
// const {createNumbersGenerator} = require('../../shared/create-numbers-generator')
// const {createFibonacciGenerator} = require('../../shared/create-fibonacci-generator')
// const {toAsyncGenerator} = require('../to-async-generator')
// const {compose} = require('.')

// it.todo('')

// it('composes generators', async () => {
//   const composed = compose(
//     createNumbersGenerator(),
//     delay(1),
//     map((x) => x * 2),
//     take(5)
//   )
//   const output = await consume(composed)
//   expect(output).toEqual([0, 2, 4, 6, 8])
// })

// it('throws error if any of the passed arguments are not an async generator function', async () => {
//   const gens = [createNumbersGenerator, () => {}]
//   const composed = compose(...gens)
//   expect(() => composed.next()).rejects.toThrow(TypeError)
// })

// it('throws error if less than 2 generators are passed as argument', async () => {
//   const gens = [createNumbersGenerator]
//   const composed = compose(...gens)
//   expect(() => composed.next()).rejects.toThrow(TypeError)
// })

// it('accepts a generator as first argument', async () => {
//   const composed = compose(
//     createNumbersGenerator(), // returns a generator instance
//     delay(1),
//     map((x) => x * 2),
//     take(5)
//   )
//   const output = await consume(composed)
//   expect(output).toEqual([0, 2, 4, 6, 8])
// })

// it('accepts an AsyncGeneratorFunction as first argument', async () => {
//   const composed = compose(
//     toAsyncGenerator(createNumbersGenerator),
//     delay(1),
//     map((x) => x * 2),
//     take(5)
//   )
//   const output = await consume(composed)
//   expect(output).toEqual([0, 2, 4, 6, 8])
// })

// it('accepts a GeneratorFunction as first argument', async () => {
//   const composed = compose(
//     createFibonacciGenerator,
//     delay(1),
//     map((x) => x * 2),
//     take(5)
//   )
//   const output = await consume(composed)
//   expect(output).toEqual([2, 2, 4, 6, 10])
// })
