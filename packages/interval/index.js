import { sleep } from '@hourglass/sleep'

/**
 * @param {number} ms
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* interval(ms, gen) {
  for await (let value of gen) {
    yield value
    await sleep(ms)
  }
}

export { interval }
