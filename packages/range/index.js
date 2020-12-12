const enumerate = require('@hourglass/enumerate')

async function* range(begin, end, gen) {
  if (!Number.isInteger(begin)) {
    throw new TypeError('begin must be an integer number')
  }

  if (!Number.isInteger(end)) {
    throw new TypeError('end must be an integer number')
  }

  if (begin > end) {
    throw new RangeError('end must be greater than begin')
  }

  for await (let [index, value] of enumerate(gen)) {
    if (index < begin) {
      continue
    }
    if (index >= end) {
      return
    }
    yield value
  }
}

module.exports = range
