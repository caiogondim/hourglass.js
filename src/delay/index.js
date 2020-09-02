const sleep = require('../sleep')

async function* delay(gen, ms) {
  for await (let val of gen) {
    await sleep(ms)
    yield val
  }
}

module.exports = delay
