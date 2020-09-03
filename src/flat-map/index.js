const isIterable = require('../_shared/is-iterable')

async function* flatMap(gen, fn) {
  for await (let val of gen) {
    let output = await fn(val)
    if (!isIterable(output)) {
      output = [output]
    }
    for (let outputItem of [...output]) {
      yield outputItem
    }
  }
}

module.exports = flatMap
