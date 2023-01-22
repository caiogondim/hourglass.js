const {compose} = require('../../packages/compose')
const {take} = require('../../packages/take')
const {createFibonacciGenerator} = require('.')

it.skip('creates a generators that generates the fibonacci sequence', async () => {
  const composed = compose(createFibonacciGenerator, take(10))
  const output = []
  for await (let value of composed) {
    output.push(value)
  }
  expect(output).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
})
