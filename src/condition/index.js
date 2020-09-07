const sleep = require('../sleep')

async function condition(predicate, { interval = 1000 } = {}) {
  for (;;) {
    if (await predicate()) {
      return
    }
    await sleep(interval)
  }
}

module.exports = condition
