const sleep = require('../sleep')
const compose = require('../compose')
const take = require('../take')
const fromCallback = require('.')

it('returns a generator and callback that generates on generator every value passed as arguments', async () => {
  const input = [1, 2, 3, 4, 5, 6]
  const output = []
  const [gen, callback] = fromCallback()

  async function generate() {
    for (let val of input) {
      await sleep(1)
      callback(val)
    }
  }

  async function consume() {
    const composed = compose(gen, take(5))
    for await (let val of composed) {
      output.push(val)
    }
  }

  await Promise.all([consume(), generate()])

  expect(output).toEqual([1, 2, 3, 4, 5])
})
