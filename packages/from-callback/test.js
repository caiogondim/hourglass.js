const sleep = require('../sleep')
const compose = require('../compose')
const take = require('../take')
const fromCallback = require('.')

function createGenerate(input, callback) {
  return async function generate() {
    for (let value of input) {
      await sleep(1)
      callback(value)
    }
  }
}

it('returns a generator and callback that generates on generator every value passed as arguments', async () => {
  const input = [1, 2, 3, 4, 5, 6]
  const output = []
  const [gen, callback] = fromCallback()

  const generate = createGenerate(input, callback)

  async function consume() {
    const composed = compose(gen, take(5))
    for await (let value of composed) {
      output.push(value)
    }
  }

  await Promise.all([consume(), generate()])

  expect(output).toEqual([1, 2, 3, 4, 5])
})

it('works with a generator faster than consumer', async () => {
  const input = [1, 2, 3, 4, 5, 6]
  const output = []
  const [gen, callback] = fromCallback()

  const generate = createGenerate(input, callback)

  async function consume() {
    const composed = compose(gen, take(5))
    for await (let value of composed) {
      await sleep(2)
      output.push(value)
    }
  }

  await Promise.all([consume(), generate()])

  expect(output).toEqual([1, 2, 3, 4, 5])
})

it('works with a generator slower than consumer', async () => {
  const input = [1, 2, 3, 4, 5, 6]
  const output = []
  const [gen, callback] = fromCallback()

  async function generate() {
    for (let value of input) {
      await sleep(2)
      callback(value)
    }
  }

  async function consume() {
    const composed = compose(gen, take(5))
    for await (let value of composed) {
      await sleep(1)
      output.push(value)
    }
  }

  await Promise.all([consume(), generate()])

  expect(output).toEqual([1, 2, 3, 4, 5])
})
