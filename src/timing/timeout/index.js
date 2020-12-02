const sleep = require('../sleep')
const isPromise = require('../../_shared/is-promise')

class TimeoutError extends Error {
  constructor(message) {
    super(message)
  }
}

async function timeout(promise, ms) {
  if (!isPromise(promise)) {
    throw new TypeError('First argument must be a promise')
  }

  if (typeof ms !== 'number') {
    throw new TypeError('Second argument must be a number')
  }

  async function createTimeoutPromise() {
    await sleep(ms)
    throw new TimeoutError(`Timeout after`)
  }

  const [output] = await Promise.race([promise, createTimeoutPromise()])

  return output
}

module.exports = {
  timeout,
  TimeoutError,
}
