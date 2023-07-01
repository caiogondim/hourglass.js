import { sleep } from '../sleep'
import { take } from '../take'
import { consume } from '../consume'
import { fromCallback, finalizationToken } from '.'

/**
 * @param {number[]} input
 * @param {Function} callback
 * @returns {() => Promise<void>}
 */
function createGenerate(input, callback) {
  return async function generate() {
    for (let value of input) {
      await sleep(1)
      callback(value)
    }
  }
}

it('returns a generator and callback that generates on generator every value passed as argument', async () => {
  const input = [1, 2, 3, 4, 5, 6]
  /** @type {number[]} */
  const output = []
  const { generator, callback } = fromCallback()

  const generate = createGenerate(input, callback)

  async function consume() {
    const composed = take(5, generator)
    for await (let value of composed) {
      output.push(value)
    }
  }

  await Promise.all([consume(), generate()])

  expect(output).toEqual([1, 2, 3, 4, 5])
})

it('works with a generator faster than consumer', async () => {
  const input = [1, 2, 3, 4, 5, 6]
  /** @type {number[]} */
  const output = []
  const { generator, callback } = fromCallback()

  const generate = createGenerate(input, callback)

  async function consume() {
    const composed = take(5, generator)
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
  /** @type {number[]} */
  const output = []
  const { generator, callback } = fromCallback()

  async function generate() {
    for (let value of input) {
      await sleep(2)
      callback(value)
    }
  }

  async function consume() {
    const composed = take(5, generator)
    for await (let value of composed) {
      await sleep(1)
      output.push(value)
    }
  }

  await Promise.all([consume(), generate()])

  expect(output).toEqual([1, 2, 3, 4, 5])
})

it('can be finalized', async () => {
  const { generator, callback } = fromCallback()
  async function generate() {
    for (let value of [1, 2, 3]) {
      await sleep(1)
      callback(value)
    }
    callback(finalizationToken)
  }
  await generate()

  const values = await consume(generator)
  expect(values).toEqual([1, 2, 3])
})
