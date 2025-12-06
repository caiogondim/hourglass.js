import { sleep } from '@hourglass/sleep'

/**
 * @param {number} ms
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* delay(ms, gen) {
  for await (let value of gen) {
    await sleep(ms)
    yield value
  }
}

export { delay }
