const sleep = require('../sleep')

async function condition(predicate, { interval = 1000 } = {}) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (await predicate()) {
      return
    }
    await sleep(interval)
  }
}

module.exports = condition
