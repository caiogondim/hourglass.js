import { sleep } from '@hourglass/sleep'

/**
 * @param {number} ms
 * @param {AsyncIterable} gen
 * @returns {AsyncGenerator}
 */
async function* timeBetween(ms, gen) {
  let lastCall = Date.now()
  for await (let value of gen) {
    const timeSinceLastCall = Date.now() - lastCall
    if (timeSinceLastCall <= ms) {
      await sleep(ms - timeSinceLastCall)
    }
    yield value
    lastCall = Date.now()
  }
}

export { timeBetween }
